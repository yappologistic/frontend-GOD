#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const binPath = path.join(root, 'bin', 'frontend-design-director.mjs');

function run(args, env = {}) {
  return spawnSync(process.execPath, [binPath, ...args], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, ...env }
  });
}

const help = run(['--help']);
assert.equal(help.status, 0, help.stderr);
assert.match(help.stdout, /Usage:/);
assert.match(help.stdout, /--skill-only/);

const pluginDryRun = run(['--dry-run']);
assert.equal(pluginDryRun.status, 0, pluginDryRun.stderr);
assert.match(pluginDryRun.stdout, /codex plugin marketplace add yappologistic\/frontend-GOD/);
assert.match(pluginDryRun.stdout, /Restart Codex/);

const pinnedDryRun = run(['--dry-run', '--ref', 'v0.1.1']);
assert.equal(pinnedDryRun.status, 0, pinnedDryRun.stderr);
assert.match(pinnedDryRun.stdout, /--ref v0\.1\.1/);

const missingRef = run(['--ref']);
assert.equal(missingRef.status, 1);
assert.match(missingRef.stderr, /--ref requires a value/);

const tempHome = fs.mkdtempSync(path.join(os.tmpdir(), 'frontend-design-director-installer-'));
const skillDryRun = run(['--skill-only', '--dry-run'], { HOME: tempHome, USERPROFILE: tempHome });
assert.equal(skillDryRun.status, 0, skillDryRun.stderr);
assert.match(skillDryRun.stdout, /\.agents[\\/]skills[\\/]frontend-design-director/);
assert.equal(fs.existsSync(path.join(tempHome, '.agents', 'skills', 'frontend-design-director')), false);

const skillInstall = run(['--skill-only', '--force'], { HOME: tempHome, USERPROFILE: tempHome });
assert.equal(skillInstall.status, 0, skillInstall.stderr);
assert.equal(fs.existsSync(path.join(tempHome, '.agents', 'skills', 'frontend-design-director', 'SKILL.md')), true);
assert.match(skillInstall.stdout, /Installed skill-only copy/);

fs.rmSync(tempHome, { recursive: true, force: true });
console.log('installer tests passed');
