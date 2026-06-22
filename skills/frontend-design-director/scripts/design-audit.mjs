#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { parseAuditArgs, shouldFail, warning, writeReport } from './audit-common.mjs';

const exts = new Set(['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.vue', '.svelte', '.astro', '.html', '.css', '.scss']);
const skipDirs = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', 'out', 'vendor']);
const skipFiles = /(?:package-lock|pnpm-lock|yarn\.lock|bun\.lockb|design-audit\.mjs|a11y-static-check\.mjs|token-audit\.mjs|audit-common\.mjs)$/;
const args = process.argv.slice(2);
const options = parseAuditArgs(args, process.cwd());

if (options.help) {
  console.log(`Frontend Design Audit
Heuristic checks only. Manual design/accessibility QA is still required.

Usage:
  node scripts/design-audit.mjs [target] [--json] [--min-severity low|medium|high] [--fail-on low|medium|high] [--fail-on-warning]`);
  process.exit(0);
}

const root = path.resolve(options.targetArg);
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

function warn(rule, severity, file, index, message) {
  warnings.push(warning(rule, severity, path.relative(root, file.path) || file.path, index == null ? null : lineOf(file.text, index), message));
}

function isTokenFile(filePath) {
  return /(?:token|theme|tailwind\.config|variables|globals|palette|design-system)/i.test(filePath);
}

function hasVisibleText(inner) {
  return />\s*[A-Za-z0-9][^<]*</.test(`>${inner}<`) || /^[\s\w.,!?'"():;-]+$/.test(inner.replace(/<[^>]+>/g, '').trim());
}

function countMatches(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

for (const filePath of walk(root)) {
  const text = fs.readFileSync(filePath, 'utf8');
  const file = { path: filePath, text };
  scanned += 1;
  const rel = path.relative(root, filePath) || filePath;

  if (!isTokenFile(filePath)) {
    for (const match of text.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
      warn('hardcoded-color', 'medium', file, match.index, 'Possible raw hex color in component. Prefer semantic tokens.');
    }
  }

  const arbitrary = text.match(/(?:^|\s)[a-z0-9:-]+-\[[^\]]+\]/gi) || [];
  if (arbitrary.length >= 8) warn('tailwind-arbitrary-values', 'medium', file, 0, `Many arbitrary Tailwind values (${arbitrary.length}). Consider tokens or reusable variants.`);

  const pxValues = [...text.matchAll(/(?:width|min-width|max-width|padding|margin|gap|top|right|bottom|left)\s*:\s*(\d+)px/gi)];
  for (const match of pxValues) {
    const px = Number(match[1]);
    if (px > 320 || (px % 4 !== 0 && px > 12)) warn('magic-spacing-or-fixed-width', 'medium', file, match.index, `Check ${px}px value for responsive/token fit.`);
  }

  for (const match of text.matchAll(/<(div|span)\b(?=[^>]*\bonClick=)([^>]*)>/gi)) {
    const attrs = match[2];
    if (!/\b(role|tabIndex|tabindex|onKeyDown|onKeyUp|onKeyPress)\b/.test(attrs)) {
      warn('clickable-noninteractive', 'high', file, match.index, `Possible clickable ${match[1]}. Prefer button/link or add keyboard behavior.`);
    }
  }

  for (const match of text.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const attrs = match[1];
    const inner = match[2].trim();
    if (!/\b(aria-label|aria-labelledby|title)=/.test(attrs) && !hasVisibleText(inner)) {
      warn('icon-only-button-name', 'high', file, match.index, 'Possible icon-only button without accessible name.');
    }
  }

  for (const match of text.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/gi)) {
    warn('image-alt', 'high', file, match.index, 'Image appears to be missing alt text.');
  }

  if (/(table|list|grid|map|fetch|query|useQuery|axios|loader)/i.test(text) && !/(loading|empty|error|no results|fallback|skeleton)/i.test(text)) {
    warn('missing-data-states', 'medium', file, 0, 'Data UI may be missing loading/empty/error states.');
  }

  const generic = /streamline your workflow|unlock insights|boost productivity|powerful platform|seamless experience|transform your business|all-in-one solution/ig;
  for (const match of text.matchAll(generic)) {
    warn('generic-ai-copy', 'low', file, match.index, `Possible generic AI copy: "${match[0]}".`);
  }

  const vagueCta = />\s*(get started|learn more|explore|try it now|start now|see more)\s*</ig;
  const vagueCtaCount = countMatches(text, vagueCta);
  if (vagueCtaCount >= 2) {
    warn('vague-cta-copy', 'low', file, 0, `Several vague CTAs (${vagueCtaCount}). Prefer action copy tied to the product task.`);
  }

  const rounded2xlCount = countMatches(text, /\brounded-2xl\b/g);
  if (rounded2xlCount >= 6) {
    warn('repeated-large-radius', 'low', file, 0, `Many rounded-2xl utilities (${rounded2xlCount}). Check for generic card-heavy styling.`);
  }

  const shadowXlCount = countMatches(text, /\bshadow-xl\b/g);
  if (shadowXlCount >= 3) {
    warn('heavy-shadow-overuse', 'low', file, 0, `Multiple shadow-xl utilities (${shadowXlCount}). Use elevation deliberately and consistently.`);
  }

  const gradientCount = countMatches(text, /\bbg-gradient(?:-\w+)?\b/g);
  if (gradientCount >= 3) {
    warn('gradient-overuse', 'low', file, 0, `Multiple background gradients (${gradientCount}). Check for generic AI-style decoration.`);
  }

  const cardComponentCount = countMatches(text, /<Card\b/g);
  if (cardComponentCount >= 8) {
    warn('card-heavy-screen', 'low', file, 0, `Many Card components (${cardComponentCount}). Verify cards are not replacing real information architecture.`);
  }

  const cardBlocks = text.match(/<Card\b[\s\S]{0,800}?(?:<Icon\b|lucide|Icon)[\s\S]{0,800}?(?:title|Title)[\s\S]{0,800}?(?:description|Description)/g) || [];
  if (cardBlocks.length >= 3 && !/(invoice|patient|ledger|deploy|order|ticket|project|customer|account|workspace|report|analytics|payment|booking)/i.test(text)) {
    warn('card-sameness', 'low', file, 0, 'Several similar icon/title/description cards with little product-specific signal.');
  }

  if (/(<button\b|<a\b|<input\b|<select\b|<textarea\b|role=["'](?:button|link|menuitem|tab)["'])/i.test(text) && !/\bfocus-visible\b|\bfocus:/i.test(text)) {
    warn('missing-focus-styling-signal', 'medium', file, 0, 'Interactive UI detected without an obvious focus-visible/focus style signal.');
  }

  if (/(animate-|transition-|duration-|framer-motion|motion\.|@keyframes)/i.test(text) && !/(prefers-reduced-motion|motion-reduce|useReducedMotion|reducedMotion)/i.test(text)) {
    warn('missing-reduced-motion-signal', 'medium', file, 0, 'Motion or transitions detected without an obvious reduced-motion accommodation.');
  }

  if (/\b(?:h-screen|min-h-screen)\b|height\s*:\s*100vh/i.test(text) && text.length > 8000) {
    warn('viewport-height-content-risk', 'medium', file, 0, 'Fixed viewport-height utility appears in a content-heavy file. Check mobile overflow and covered content.');
  }

  const mutedTextCount = countMatches(text, /\btext-(?:gray|slate|zinc|neutral)-[45]00\b/g);
  if (mutedTextCount >= 10) {
    warn('muted-text-overuse', 'low', file, 0, `Many muted gray text utilities (${mutedTextCount}). Check contrast and hierarchy.`);
  }

  const defaultContainerCount = countMatches(text, /\bmax-w-7xl\b[\s\S]{0,80}\bmx-auto\b|\bmx-auto\b[\s\S]{0,80}\bmax-w-7xl\b/g);
  if (defaultContainerCount >= 3) {
    warn('repeated-default-container', 'low', file, 0, `Repeated max-w-7xl mx-auto containers (${defaultContainerCount}). Check for generic template structure.`);
  }
}

writeReport({
  tool: 'design-audit',
  title: 'Frontend Design Audit',
  subtitle: 'Heuristic checks only. Manual design/accessibility QA is still required.',
  scanned,
  warnings,
  options
});
process.exit(shouldFail(warnings, options.failOnSeverity) ? 1 : 0);
