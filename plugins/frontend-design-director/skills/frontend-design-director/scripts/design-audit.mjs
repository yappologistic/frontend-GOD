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
  console.log(`Frontend Design Audit
Heuristic checks only. Manual design/accessibility QA is still required.

Usage:
  node scripts/design-audit.mjs [target] [--fail-on-warning]`);
  process.exit(0);
}

const root = path.resolve(targetArg);
const warnings = [];
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

function warn(rule, file, index, message) {
  warnings.push({ rule, file, line: index == null ? null : lineOf(file.text, index), message });
}

function isTokenFile(filePath) {
  return /(?:token|theme|tailwind\.config|variables|globals|palette|design-system)/i.test(filePath);
}

function hasVisibleText(inner) {
  return />\s*[A-Za-z0-9][^<]*</.test(`>${inner}<`) || /^[\s\w.,!?'"():;-]+$/.test(inner.replace(/<[^>]+>/g, '').trim());
}

for (const filePath of walk(root)) {
  const text = fs.readFileSync(filePath, 'utf8');
  const file = { path: filePath, text };
  scanned += 1;
  const rel = path.relative(root, filePath) || filePath;

  if (!isTokenFile(filePath)) {
    for (const match of text.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
      warn('hardcoded-color', file, match.index, `${rel}: Possible raw hex color in component. Prefer semantic tokens.`);
    }
  }

  const arbitrary = text.match(/(?:^|\s)[a-z0-9:-]+-\[[^\]]+\]/gi) || [];
  if (arbitrary.length >= 8) warn('tailwind-arbitrary-values', file, 0, `${rel}: Many arbitrary Tailwind values (${arbitrary.length}). Consider tokens or reusable variants.`);

  const pxValues = [...text.matchAll(/(?:width|min-width|max-width|padding|margin|gap|top|right|bottom|left)\s*:\s*(\d+)px/gi)];
  for (const match of pxValues) {
    const px = Number(match[1]);
    if (px > 320 || (px % 4 !== 0 && px > 12)) warn('magic-spacing-or-fixed-width', file, match.index, `${rel}: Check ${px}px value for responsive/token fit.`);
  }

  for (const match of text.matchAll(/<(div|span)\b(?=[^>]*\bonClick=)([^>]*)>/gi)) {
    const attrs = match[2];
    if (!/\b(role|tabIndex|tabindex|onKeyDown|onKeyUp|onKeyPress)\b/.test(attrs)) {
      warn('clickable-noninteractive', file, match.index, `${rel}: Possible clickable ${match[1]}. Prefer button/link or add keyboard behavior.`);
    }
  }

  for (const match of text.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const attrs = match[1];
    const inner = match[2].trim();
    if (!/\b(aria-label|aria-labelledby|title)=/.test(attrs) && !hasVisibleText(inner)) {
      warn('icon-only-button-name', file, match.index, `${rel}: Possible icon-only button without accessible name.`);
    }
  }

  for (const match of text.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/gi)) {
    warn('image-alt', file, match.index, `${rel}: Image appears to be missing alt text.`);
  }

  if (/(table|list|grid|map|fetch|query|useQuery|axios|loader)/i.test(text) && !/(loading|empty|error|no results|fallback|skeleton)/i.test(text)) {
    warn('missing-data-states', file, 0, `${rel}: Data UI may be missing loading/empty/error states.`);
  }

  const generic = /streamline your workflow|unlock insights|boost productivity|powerful platform|seamless experience|transform your business|all-in-one solution/ig;
  for (const match of text.matchAll(generic)) {
    warn('generic-ai-copy', file, match.index, `${rel}: Possible generic AI copy: "${match[0]}".`);
  }

  const cardBlocks = text.match(/<Card\b[\s\S]{0,800}?(?:<Icon\b|lucide|Icon)[\s\S]{0,800}?(?:title|Title)[\s\S]{0,800}?(?:description|Description)/g) || [];
  if (cardBlocks.length >= 3 && !/(invoice|patient|ledger|deploy|order|ticket|project|customer|account|workspace|report|analytics|payment|booking)/i.test(text)) {
    warn('card-sameness', file, 0, `${rel}: Several similar icon/title/description cards with little product-specific signal.`);
  }
}

console.log('Frontend Design Audit');
console.log('Heuristic checks only. Manual design/accessibility QA is still required.\n');
for (const w of warnings) {
  console.log(`[${w.rule}] ${w.message}${w.line ? ` (line ${w.line})` : ''}`);
}
console.log(`\nScanned ${scanned} files. Found ${warnings.length} warnings.`);
process.exit(failOnWarning && warnings.length ? 1 : 0);
