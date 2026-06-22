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

function makeFakeCodex(scriptBody) {
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), 'frontend-design-director-codex-'));
  const logPath = path.join(binDir, 'codex.log');
  const fakePath = path.join(binDir, process.platform === 'win32' ? 'codex.cmd' : 'codex');
  if (process.platform === 'win32') {
    fs.writeFileSync(fakePath, `@echo off\r\nnode "${scriptBody}" %*\r\n`);
  } else {
    fs.writeFileSync(fakePath, `#!/usr/bin/env sh\nnode "${scriptBody}" "$@"\n`);
    fs.chmodSync(fakePath, 0o755);
  }
  return {
    binDir,
    logPath,
    env: {
      PATH: `${binDir}${path.delimiter}${process.env.PATH}`,
      CODEX_FAKE_LOG: logPath
    },
    cleanup: () => fs.rmSync(binDir, { recursive: true, force: true })
  };
}

const help = run(['--help']);
assert.equal(help.status, 0, help.stderr);
assert.match(help.stdout, /Usage:/);
assert.match(help.stdout, /--skill-only/);
assert.match(help.stdout, /--doctor/);

const pluginDryRun = run(['--dry-run']);
assert.equal(pluginDryRun.status, 0, pluginDryRun.stderr);
assert.match(pluginDryRun.stdout, /codex plugin marketplace add yappologistic\/frontend-GOD/);
assert.match(pluginDryRun.stdout, /Restart Codex/);

const reinstallDryRun = run(['--dry-run', '--reinstall']);
assert.equal(reinstallDryRun.status, 0, reinstallDryRun.stderr);
assert.match(reinstallDryRun.stdout, /codex plugin marketplace remove frontend-god/);
assert.match(reinstallDryRun.stdout, /codex plugin marketplace add yappologistic\/frontend-GOD/);

const pinnedDryRun = run(['--dry-run', '--ref', 'v0.1.4']);
assert.equal(pinnedDryRun.status, 0, pinnedDryRun.stderr);
assert.match(pinnedDryRun.stdout, /--ref v0\.1\.4/);

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

const fakeCodexScript = writeFakeCodexScript();
const fakeCodex = makeFakeCodex(fakeCodexScript);
const alreadyAdded = run([], fakeCodex.env);
assert.equal(alreadyAdded.status, 0, alreadyAdded.stderr);
assert.match(alreadyAdded.stdout, /already exists; updating existing marketplace/);
assert.match(fs.readFileSync(fakeCodex.logPath, 'utf8'), /plugin marketplace add yappologistic\/frontend-GOD/);
assert.match(fs.readFileSync(fakeCodex.logPath, 'utf8'), /plugin marketplace upgrade frontend-god/);

const doctorHome = fs.mkdtempSync(path.join(os.tmpdir(), 'frontend-design-director-doctor-'));
fs.mkdirSync(path.join(doctorHome, '.agents', 'skills', 'frontend-design-director'), { recursive: true });
fs.writeFileSync(path.join(doctorHome, '.agents', 'skills', 'frontend-design-director', 'SKILL.md'), '---\nname: frontend-design-director\n---\n');
fs.mkdirSync(path.join(doctorHome, '.codex'), { recursive: true });
fs.writeFileSync(path.join(doctorHome, '.codex', 'config.toml'), '# test config\n');
const doctor = run(['--doctor'], { ...fakeCodex.env, HOME: doctorHome, USERPROFILE: doctorHome });
assert.equal(doctor.status, 0, doctor.stderr);
assert.match(doctor.stdout, /Codex CLI: found/);
assert.match(doctor.stdout, /Marketplace frontend-god: added/);
assert.match(doctor.stdout, /Skill-only install: found/);
assert.match(doctor.stdout, /\.codex[\\/]config\.toml/);
assert.match(doctor.stdout, /Suggested next command:/);
fs.rmSync(doctorHome, { recursive: true, force: true });

fakeCodex.cleanup();
fs.rmSync(fakeCodexScript, { force: true });

fs.rmSync(tempHome, { recursive: true, force: true });
console.log('installer tests passed');

function writeFakeCodexScript() {
  const scriptPath = path.join(os.tmpdir(), `fake-codex-${process.pid}.mjs`);
  fs.writeFileSync(scriptPath, `
import fs from 'node:fs';
import process from 'node:process';

const args = process.argv.slice(2);
fs.appendFileSync(process.env.CODEX_FAKE_LOG, args.join(' ') + '\\n');
if (args.join(' ') === '--version') {
  console.log('codex 1.0.0-test');
  process.exit(0);
}
if (args.join(' ') === 'plugin marketplace list') {
  console.log('frontend-god  /tmp/frontend-GOD');
  process.exit(0);
}
if (args.join(' ') === 'plugin marketplace add yappologistic/frontend-GOD') {
  console.error("Error: marketplace 'frontend-god' is already added from a different source; remove it before adding this source");
  process.exit(1);
}
if (args.join(' ') === 'plugin marketplace upgrade frontend-god') {
  console.log('upgraded frontend-god');
  process.exit(0);
}
process.exit(0);
`);
  return scriptPath;
}
