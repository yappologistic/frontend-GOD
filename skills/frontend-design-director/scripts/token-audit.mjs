#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { parseAuditArgs, shouldFail, warning, writeReport } from './audit-common.mjs';

const exts = new Set(['.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro', '.html', '.css', '.scss']);
const skipDirs = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', 'out', 'vendor']);
const skipFiles = /(?:package-lock|pnpm-lock|yarn\.lock|bun\.lockb)$/;
const args = process.argv.slice(2);
const options = parseAuditArgs(args, process.cwd());

if (options.help) {
  console.log(`Design Token Audit
Heuristic design-token audit. Manual review is still required.

Usage:
  node scripts/token-audit.mjs [target] [--json] [--min-severity low|medium|high] [--fail-on low|medium|high] [--fail-on-warning]`);
  process.exit(0);
}

const root = path.resolve(options.targetArg);
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

function add(rule, severity, rel, text, index, message) {
  warnings.push(warning(rule, severity, rel, index == null ? null : lineOf(text, index), message));
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
      add('raw-color', 'medium', rel, text, match.index, `Possible scattered raw color ${match[0]}. Prefer semantic tokens such as background, foreground, primary, muted, border, destructive.`);
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
    add('inline-theme-value', 'medium', rel, text, match.index, 'Inline style contains a literal theme value. Consider tokens or component variants.');
  }
}

if (radii.size > 5) warnings.push(warning('radius-inconsistency', 'medium', '(global)', null, `Many radius values found (${radii.size}). Consider consolidating tokens.`));
if (shadows.size > 5) warnings.push(warning('shadow-inconsistency', 'medium', '(global)', null, `Many shadow values found (${shadows.size}). Consider consolidating tokens.`));

for (const [value, count] of rawCounts.entries()) {
  if (count >= 4) warnings.push(warning('duplicate-theme-value', 'low', '(global)', null, `Repeated raw value "${value}" appears ${count} times. Consider centralizing it.`));
}

const top = [...rawCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
const topRawValues = top.map(([value, count]) => ({ value, count }));
writeReport({
  tool: 'token-audit',
  title: 'Design Token Audit',
  subtitle: 'Heuristic design-token audit. Manual review is still required.',
  scanned,
  warnings,
  options,
  extra: { topRawValues }
});
if (!options.json && top.length) {
  console.log('Top repeated raw values:');
  for (const [value, count] of top) console.log(`- ${value}: ${count}`);
}
process.exit(shouldFail(warnings, options.failOnSeverity) ? 1 : 0);
