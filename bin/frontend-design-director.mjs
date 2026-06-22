#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = 'yappologistic/frontend-GOD';
const skillName = 'frontend-design-director';
const args = process.argv.slice(2);

main();

function main() {
  const options = parseArgs(args);

  if (options.help) {
    printHelp();
    return;
  }

  if (options.skillOnly) {
    installSkillOnly(options);
    return;
  }

  installPluginMarketplace(options);
}

function parseArgs(rawArgs) {
  const options = {
    help: false,
    dryRun: false,
    force: false,
    skillOnly: false,
    ref: null
  };

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === 'install') continue;
    if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--force') options.force = true;
    else if (arg === '--skill-only') options.skillOnly = true;
    else if (arg === '--ref') {
      if (!rawArgs[index + 1] || rawArgs[index + 1].startsWith('--')) {
        fail('--ref requires a value');
      }
      options.ref = rawArgs[index + 1];
      index += 1;
    } else {
      fail(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function printHelp() {
  console.log(`Frontend Design Director installer

Usage:
  npx github:yappologistic/frontend-GOD
  npx github:yappologistic/frontend-GOD --ref v0.1.1
  npx github:yappologistic/frontend-GOD --skill-only

After npm package publishing, these also work:
  npx frontend-design-director
  npx frontend-design-director --ref v0.1.1
  npx frontend-design-director --skill-only

Options:
  --ref <ref>     Pin the Codex marketplace source to a Git ref.
  --skill-only    Copy only the skill to ~/.agents/skills/frontend-design-director.
  --force         Replace an existing skill-only install.
  --dry-run       Print what would happen without changing anything.
  -h, --help      Show this help.

Default behavior uses the official Codex marketplace flow:
  codex plugin marketplace add ${repo}
`);
}

function installPluginMarketplace(options) {
  const commandArgs = ['plugin', 'marketplace', 'add', repo];
  if (options.ref) commandArgs.push('--ref', options.ref);

  console.log(`Installing Frontend Design Director through Codex marketplace.`);
  console.log(`Command: codex ${commandArgs.join(' ')}`);

  if (options.dryRun) {
    printRestartNote();
    return;
  }

  const result = spawnSync('codex', commandArgs, {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });

  if (result.error) {
    console.error(`\nCould not run the Codex CLI: ${result.error.message}`);
    console.error('Install Codex or use the fallback: npx github:yappologistic/frontend-GOD --skill-only');
    process.exit(1);
  }

  if (result.status !== 0) process.exit(result.status ?? 1);
  printRestartNote();
}

function installSkillOnly(options) {
  const source = path.join(packageRoot, 'skills', skillName);
  const destination = path.join(homeDir(), '.agents', 'skills', skillName);

  if (!fs.existsSync(path.join(source, 'SKILL.md'))) {
    fail(`Missing packaged skill at ${source}`);
  }

  console.log(`Installing Frontend Design Director as a skill-only copy.`);
  console.log(`Source: ${source}`);
  console.log(`Destination: ${destination}`);

  if (options.dryRun) {
    printRestartNote();
    return;
  }

  if (fs.existsSync(destination)) {
    if (!options.force) {
      fail(`Destination already exists. Re-run with --force to replace: ${destination}`);
    }
    fs.rmSync(destination, { recursive: true, force: true });
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(source, destination, { recursive: true });
  console.log(`Installed skill-only copy at ${destination}`);
  printRestartNote();
}

function homeDir() {
  return process.env.HOME || process.env.USERPROFILE || os.homedir();
}

function printRestartNote() {
  console.log('Restart Codex or start a new Codex thread if the skill/plugin does not appear immediately.');
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
