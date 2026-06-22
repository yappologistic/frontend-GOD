#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { parseAuditArgs, shouldFail, warning, writeReport } from './audit-common.mjs';

const exts = new Set(['.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro', '.html']);
const skipDirs = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', 'out', 'vendor']);
const skipFiles = /(?:package-lock|pnpm-lock|yarn\.lock|bun\.lockb)$/;
const args = process.argv.slice(2);
const options = parseAuditArgs(args, process.cwd());

if (options.help) {
  console.log(`Accessibility Static Check
Heuristic checks only. This does not prove accessibility.

Usage:
  node scripts/a11y-static-check.mjs [target] [--json] [--min-severity low|medium|high] [--fail-on low|medium|high] [--fail-on-warning]`);
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

function add(rule, severity, rel, text, index, message) {
  warnings.push(warning(rule, severity, rel, index == null ? null : lineOf(text, index), message));
}

function visibleButtonText(inner) {
  return inner.replace(/<[^>]+>/g, '').trim().length > 0;
}

for (const filePath of walk(root)) {
  const text = fs.readFileSync(filePath, 'utf8');
  scanned += 1;
  const rel = path.relative(root, filePath) || filePath;

  for (const match of text.matchAll(/<(input|select|textarea)\b([^>]*)>/gi)) {
    const attrs = match[2];
    const id = attrs.match(/\bid=["']([^"']+)["']/i)?.[1];
    const hasName = /\b(aria-label|aria-labelledby)=/.test(attrs);
    const hasNearbyLabel = id && new RegExp(`<label[^>]+for=["']${id}["']`, 'i').test(text);
    const wrapped = text.slice(Math.max(0, match.index - 120), match.index).includes('<label');
    if (!hasName && !hasNearbyLabel && !wrapped && !/\btype=["'](?:hidden|submit|button)["']/.test(attrs)) {
      add('input-label', 'high', rel, text, match.index, 'Input/select/textarea may not have an obvious label.');
    }
  }

  for (const match of text.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const attrs = match[1];
    if (!/\b(aria-label|aria-labelledby|title)=/.test(attrs) && !visibleButtonText(match[2])) {
      add('button-name', 'high', rel, text, match.index, 'Button may lack visible text or accessible name.');
    }
  }

  for (const match of text.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/gi)) {
    add('image-alt', 'high', rel, text, match.index, 'Image appears to be missing alt text.');
  }

  for (const match of text.matchAll(/<(div|span|li|section)\b(?=[^>]*\bonClick=)([^>]*)>/gi)) {
    const attrs = match[2];
    if (!/\b(role|tabIndex|tabindex|onKeyDown|onKeyUp|onKeyPress)\b/.test(attrs)) {
      add('clickable-noninteractive', 'high', rel, text, match.index, `Possible clickable ${match[1]} without keyboard behavior.`);
    }
  }

  for (const match of text.matchAll(/\btabIndex=\{?["']?([1-9]\d*)["']?\}?|\btabindex=["']([1-9]\d*)["']/gi)) {
    add('positive-tabindex', 'high', rel, text, match.index, 'Positive tabindex can create confusing keyboard order.');
  }

  for (const match of text.matchAll(/\bautoFocus\b|\bautofocus\b/gi)) {
    add('autofocus', 'medium', rel, text, match.index, 'Autofocus can disorient users unless deliberately managed.');
  }

  for (const match of text.matchAll(/<(div|span|li|section)\b(?=[^>]*\brole=["']button["'])[^>]*>/gi)) {
    add('role-button', 'medium', rel, text, match.index, 'Non-button uses role="button"; prefer button when possible.');
  }

  for (const match of text.matchAll(/<[^>]+aria-hidden=["']true["'][^>]*(?:onClick=|href=|tabIndex=|tabindex=)[^>]*>/gi)) {
    add('aria-hidden-interactive', 'high', rel, text, match.index, 'Interactive-looking element is aria-hidden.');
  }

  for (const match of text.matchAll(/\baria-label=["']\s*["']/gi)) {
    add('empty-aria-label', 'high', rel, text, match.index, 'Empty aria-label found.');
  }

  if (/(Dialog|Modal|role=["']dialog|aria-modal)/.test(text) && !/(DialogTitle|ModalTitle|aria-label|aria-labelledby|<h[1-6]\b)/.test(text)) {
    add('dialog-title', 'high', rel, text, 0, 'Dialog/modal pattern may be missing a title or accessible name.');
  }

  for (const match of text.matchAll(/red means|green means|shown in red|shown in green/gi)) {
    add('color-only-state', 'medium', rel, text, match.index, 'State appears to rely on color wording. Add text/icon/pattern cues.');
  }
}

writeReport({
  tool: 'a11y-static-check',
  title: 'Accessibility Static Check',
  subtitle: 'Heuristic checks only. This does not prove accessibility.',
  scanned,
  warnings,
  options
});
process.exit(shouldFail(warnings, options.failOnSeverity) ? 1 : 0);
