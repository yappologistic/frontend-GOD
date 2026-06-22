#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const checks = [];

function check(name, fn) {
  try {
    const detail = fn();
    checks.push({ name, ok: true, detail });
  } catch (error) {
    checks.push({ name, ok: false, detail: error.message });
  }
}

function mustExist(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) throw new Error(`${rel} does not exist`);
  return full;
}

function readJson(rel) {
  const full = mustExist(rel);
  try {
    return JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (error) {
    throw new Error(`${rel} is not valid JSON: ${error.message}`);
  }
}

function hasYamlFrontMatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return false;
  return /^name:\s*\S+/m.test(match[1]) && /^description:\s*\S+/m.test(match[1]);
}

function nodeCheck(rel) {
  const result = spawnSync(process.execPath, ['--check', path.join(root, rel)], {
    encoding: 'utf8'
  });
  if (result.status !== 0) {
    throw new Error(`${rel} failed node --check\n${result.stderr || result.stdout}`);
  }
}

function listFilesRecursive(relDir) {
  const base = mustExist(relDir);
  const files = [];

  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile()) {
        files.push(path.relative(base, full).replaceAll(path.sep, '/'));
      }
    }
  }

  walk(base);
  return files.sort();
}

function compareDirectoryContents(leftRel, rightRel) {
  const leftFiles = listFilesRecursive(leftRel);
  const rightFiles = listFilesRecursive(rightRel);
  const leftSet = new Set(leftFiles);
  const rightSet = new Set(rightFiles);
  const missingFromRight = leftFiles.filter((file) => !rightSet.has(file));
  const missingFromLeft = rightFiles.filter((file) => !leftSet.has(file));

  if (missingFromRight.length || missingFromLeft.length) {
    throw new Error([
      `${leftRel} and ${rightRel} contain different files`,
      missingFromRight.length ? `missing from ${rightRel}: ${missingFromRight.join(', ')}` : null,
      missingFromLeft.length ? `missing from ${leftRel}: ${missingFromLeft.join(', ')}` : null
    ].filter(Boolean).join('\n'));
  }

  const changed = leftFiles.filter((file) => {
    const left = fs.readFileSync(path.join(root, leftRel, file));
    const right = fs.readFileSync(path.join(root, rightRel, file));
    return !left.equals(right);
  });

  if (changed.length) {
    throw new Error(`${leftRel} and ${rightRel} differ: ${changed.join(', ')}`);
  }

  return `${leftFiles.length} files match`;
}

const expectedReferences = [
  'design-principles.md',
  'frontend-stack-guide.md',
  'component-patterns.md',
  'accessibility-checklist.md',
  'anti-patterns.md',
  'qa-rubric.md',
  'mode-playbooks.md',
  'codex-tool-workflows.md',
  'page-recipes.md',
  'examples.md'
];

const expectedSkillScripts = [
  'audit-common.mjs',
  'design-audit.mjs',
  'a11y-static-check.mjs',
  'token-audit.mjs'
];

const expectedDocs = [
  'README.md',
  'docs/installation.md',
  'docs/usage.md',
  'docs/development.md',
  'docs/architecture.md',
  'docs/troubleshooting.md',
  'docs/releasing.md',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'SECURITY.md',
  'CHANGELOG.md',
  'LICENSE'
];

const expectedRepoScripts = [
  'scripts/validate-plugin.mjs',
  'scripts/audit-output.test.mjs'
];

let manifest;
let packagedManifest;

check('plugin manifest exists and parses', () => {
  manifest = readJson('.codex-plugin/plugin.json');
  return '.codex-plugin/plugin.json';
});

check('packaged plugin manifest exists and parses', () => {
  packagedManifest = readJson('plugins/frontend-design-director/.codex-plugin/plugin.json');
  return 'plugins/frontend-design-director/.codex-plugin/plugin.json';
});

check('plugin manifest required fields', () => {
  for (const field of ['name', 'version', 'description', 'skills']) {
    if (!manifest?.[field]) throw new Error(`manifest missing ${field}`);
  }
  if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(manifest.version)) {
    throw new Error(`manifest version is not semver-like: ${manifest.version}`);
  }
  return `${manifest.name}@${manifest.version}`;
});

check('packaged manifest matches root manifest', () => {
  for (const field of ['name', 'version', 'description', 'skills']) {
    if (packagedManifest?.[field] !== manifest?.[field]) {
      throw new Error(`packaged manifest ${field} does not match root manifest`);
    }
  }
  return `${packagedManifest.name}@${packagedManifest.version}`;
});

check('manifest skills path exists', () => {
  const rel = manifest.skills.replace(/^\.\//, '');
  const full = mustExist(rel);
  if (!fs.statSync(full).isDirectory()) throw new Error(`${manifest.skills} is not a directory`);
  return manifest.skills;
});

check('skill front matter exists', () => {
  const skillPath = mustExist('skills/frontend-design-director/SKILL.md');
  const text = fs.readFileSync(skillPath, 'utf8');
  if (!hasYamlFrontMatter(text)) throw new Error('SKILL.md missing YAML front matter with name and description');
  return 'skills/frontend-design-director/SKILL.md';
});

check('packaged skill matches root skill', () => {
  return compareDirectoryContents(
    'skills/frontend-design-director',
    'plugins/frontend-design-director/skills/frontend-design-director'
  );
});

check('expected reference files exist', () => {
  for (const file of expectedReferences) mustExist(`skills/frontend-design-director/references/${file}`);
  return `${expectedReferences.length} references`;
});

check('expected skill scripts exist', () => {
  for (const file of expectedSkillScripts) mustExist(`skills/frontend-design-director/scripts/${file}`);
  return `${expectedSkillScripts.length} scripts`;
});

check('skill scripts pass node --check', () => {
  for (const file of expectedSkillScripts) nodeCheck(`skills/frontend-design-director/scripts/${file}`);
  return `${expectedSkillScripts.length} scripts checked`;
});

check('marketplace file exists and parses', () => {
  const marketplace = readJson('.agents/plugins/marketplace.json');
  if (!marketplace.name) throw new Error('marketplace missing name');
  if (!Array.isArray(marketplace.plugins)) throw new Error('marketplace plugins must be an array');
  const entry = marketplace.plugins.find((plugin) => plugin.name === 'frontend-design-director');
  if (!entry) throw new Error('marketplace missing frontend-design-director entry');
  if (!entry.source?.path) throw new Error('marketplace entry missing source.path');
  if (entry.source.path !== './plugins/frontend-design-director') {
    throw new Error(`marketplace source.path should be ./plugins/frontend-design-director, got ${entry.source.path}`);
  }
  mustExist('plugins/frontend-design-director/.codex-plugin/plugin.json');
  return '.agents/plugins/marketplace.json';
});

check('README and docs files exist', () => {
  for (const file of expectedDocs) mustExist(file);
  return `${expectedDocs.length} docs/support files`;
});

check('repository validator passes node --check', () => {
  for (const script of expectedRepoScripts) nodeCheck(script);
  return `${expectedRepoScripts.length} repository scripts checked`;
});

console.log('Frontend Design Director Plugin Validation\n');
for (const result of checks) {
  const mark = result.ok ? 'PASS' : 'FAIL';
  console.log(`${mark} ${result.name}${result.detail ? ` - ${result.detail}` : ''}`);
}

const failures = checks.filter((result) => !result.ok);
console.log(`\n${checks.length - failures.length}/${checks.length} checks passed.`);

if (failures.length) process.exit(1);
