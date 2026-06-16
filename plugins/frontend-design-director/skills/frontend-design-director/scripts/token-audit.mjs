#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const exts = new Set(['.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro', '.html', '.css', '.scss']);
const skipDirs = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', 'out', 'vendor']);
const skipFiles = /(?:package-lock|pnpm-lock|yarn\.lock|bun\.lockb)$/;
const args = process.argv.slice(2);
const failOnWarning = args.includes('--fail-on-warning');
const help = args.includes('--help') || args.includes('-h');
const targetArg = args.find((arg) => !arg.startsWith('--')) || process.cwd();

if (help) {
  console.log(`Design Token Audit
Heuristic design-token audit. Manual review is still required.

Usage:
  node scripts/token-audit.mjs [target] [--fail-on-warning]`);
  process.exit(0);
}

const root = path.resolve(targetArg);
const warnings = [];
const rawCounts = new Map();
const radii = new Set();
const shadows = new Set();
let scanned = 0;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) walk(path.join(dir, entry.name), files);
    } else if (!skipFiles.test(entry.name) && exts.has(path.extname(entry.name))) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

function lineOf(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function isTokenFile(filePath) {
  return /(?:token|theme|tailwind\.config|variables|globals|palette|design-system)/i.test(filePath);
}

function add(rule, rel, text, index, message) {
  warnings.push({ rule, rel, line: index == null ? null : lineOf(text, index), message });
}

function countRaw(value) {
  rawCounts.set(value, (rawCounts.get(value) || 0) + 1);
}

for (const filePath of walk(root)) {
  const text = fs.readFileSync(filePath, 'utf8');
  const rel = path.relative(root, filePath) || filePath;
  scanned += 1;

  const rawColor = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]+\)|hsla?\([^)]+\)/g;
  for (const match of text.matchAll(rawColor)) {
    countRaw(match[0]);
    if (!isTokenFile(filePath)) {
      add('raw-color', rel, text, match.index, `Possible scattered raw color ${match[0]}. Prefer semantic tokens such as background, foreground, primary, muted, border, destructive.`);
    }
  }

  for (const match of text.matchAll(/border-radius\s*:\s*([^;]+)|rounded-\[([^\]]+)\]/gi)) {
    const value = (match[1] || match[2] || '').trim();
    if (value) radii.add(value);
  }

  for (const match of text.matchAll(/box-shadow\s*:\s*([^;]+)|shadow-\[([^\]]+)\]/gi)) {
    const value = (match[1] || match[2] || '').trim();
    if (value) shadows.add(value);
  }

  for (const match of text.matchAll(/[a-z0-9:-]+-\[[^\]]+\]/gi)) {
    countRaw(match[0]);
  }

  const inlineTheme = /\bstyle=\{\{[^}]*\b(color|backgroundColor|borderColor|borderRadius|boxShadow|padding|margin)\s*:\s*['"`][^'"`]+['"`]/gi;
  for (const match of text.matchAll(inlineTheme)) {
    add('inline-theme-value', rel, text, match.index, 'Inline style contains a literal theme value. Consider tokens or component variants.');
  }
}

if (radii.size > 5) warnings.push({ rule: 'radius-inconsistency', rel: '(global)', line: null, message: `Many radius values found (${radii.size}). Consider consolidating tokens.` });
if (shadows.size > 5) warnings.push({ rule: 'shadow-inconsistency', rel: '(global)', line: null, message: `Many shadow values found (${shadows.size}). Consider consolidating tokens.` });

for (const [value, count] of rawCounts.entries()) {
  if (count >= 4) warnings.push({ rule: 'duplicate-theme-value', rel: '(global)', line: null, message: `Repeated raw value "${value}" appears ${count} times. Consider centralizing it.` });
}

console.log('Design Token Audit');
console.log('Heuristic design-token audit. Manual review is still required.\n');
for (const w of warnings) console.log(`[${w.rule}] ${w.rel}${w.line ? `:${w.line}` : ''} ${w.message}`);
const top = [...rawCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
console.log(`\nScanned ${scanned} files. Found ${warnings.length} warnings.`);
if (top.length) {
  console.log('Top repeated raw values:');
  for (const [value, count] of top) console.log(`- ${value}: ${count}`);
}
process.exit(failOnWarning && warnings.length ? 1 : 0);
