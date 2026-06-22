#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = 'yappologistic/frontend-GOD';
const marketplaceName = 'frontend-god';
const skillName = 'frontend-design-director';
const args = process.argv.slice(2);

main();

function main() {
  const options = parseArgs(args);

  if (options.help) {
    printHelp();
    return;
  }

  if (options.doctor) {
    runDoctor();
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
    doctor: false,
    dryRun: false,
    force: false,
    reinstall: false,
    skillOnly: false,
    ref: null
  };

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === 'install') continue;
    if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg === '--doctor') options.doctor = true;
    else if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--force') options.force = true;
    else if (arg === '--reinstall') options.reinstall = true;
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
  npx github:yappologistic/frontend-GOD --ref v0.1.2
  npx github:yappologistic/frontend-GOD --skill-only
  npx github:yappologistic/frontend-GOD --doctor

After npm package publishing, these also work:
  npx frontend-design-director
  npx frontend-design-director --ref v0.1.2
  npx frontend-design-director --skill-only
  npx frontend-design-director --doctor

Options:
  --doctor        Check Codex CLI, marketplace, skill paths, and suggested next step.
  --ref <ref>     Pin the Codex marketplace source to a Git ref.
  --reinstall     Remove the existing marketplace entry before adding it again.
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
  if (options.reinstall) {
    console.log(`Reinstall requested; existing marketplace '${marketplaceName}' will be removed first.`);
    console.log(`Command: codex plugin marketplace remove ${marketplaceName}`);
  }
  console.log(`Command: codex ${commandArgs.join(' ')}`);

  if (options.dryRun) {
    printRestartNote();
    return;
  }

  if (options.reinstall) {
    const removeResult = runCodex(['plugin', 'marketplace', 'remove', marketplaceName]);
    if (removeResult.status !== 0) {
      console.warn(`Could not remove existing marketplace '${marketplaceName}'. Continuing with add.`);
      printCommandOutput(removeResult);
    }
  }

  const result = runCodex(commandArgs);
  if (result.error) {
    console.error(`\nCould not run the Codex CLI: ${result.error.message}`);
    console.error('Install Codex or use the fallback: npx github:yappologistic/frontend-GOD --skill-only');
    process.exit(1);
  }

  if (result.status !== 0) {
    const existingName = existingMarketplaceName(result.stderr);
    if (existingName) {
      console.log(`Marketplace '${existingName}' already exists; updating existing marketplace instead.`);
      const upgradeResult = runCodex(['plugin', 'marketplace', 'upgrade', existingName]);
      printCommandOutput(upgradeResult);
      if (upgradeResult.status !== 0) {
        console.error(`Could not update existing marketplace '${existingName}'.`);
        console.error(`To replace it with ${repo}, run: npx github:yappologistic/frontend-GOD --reinstall`);
        process.exit(upgradeResult.status ?? 1);
      }
      console.log(`Updated existing marketplace '${existingName}'.`);
      console.log(`To replace the existing marketplace source with ${repo}, run: npx github:yappologistic/frontend-GOD --reinstall`);
      printRestartNote();
      return;
    }

    printCommandOutput(result);
    process.exit(result.status ?? 1);
  }

  printCommandOutput(result);
  printRestartNote();
}

function runDoctor() {
  const codexConfig = path.join(homeDir(), '.codex', 'config.toml');
  const skillDestination = path.join(homeDir(), '.agents', 'skills', skillName);
  const skillFile = path.join(skillDestination, 'SKILL.md');

  console.log('Frontend Design Director doctor\n');
  console.log(`Codex config path: ${codexConfig}`);
  console.log(`User skill path: ${skillDestination}`);

  const versionResult = runCodex(['--version']);
  const codexFound = versionResult.status === 0;
  console.log(`Codex CLI: ${codexFound ? `found (${firstLine(versionResult.stdout) || 'version available'})` : 'not found or not runnable'}`);

  const marketplace = inspectMarketplace(codexFound);
  console.log(`Marketplace ${marketplaceName}: ${marketplace.status}`);
  if (marketplace.detail) console.log(`Marketplace detail: ${marketplace.detail}`);

  console.log(`Skill-only install: ${fs.existsSync(skillFile) ? `found (${skillFile})` : 'not found'}`);
  console.log(`Codex config: ${fs.existsSync(codexConfig) ? 'found' : 'not found'}`);

  console.log('\nSuggested next command:');
  console.log(suggestDoctorCommand({ codexFound, marketplace, skillFile }));
}

function inspectMarketplace(codexFound) {
  if (!codexFound) {
    return { status: 'unknown', detail: 'Codex CLI is unavailable.' };
  }

  const listResult = runCodex(['plugin', 'marketplace', 'list']);
  if (listResult.status !== 0) {
    return {
      status: 'unknown',
      detail: firstLine(listResult.stderr) || 'Could not list Codex marketplaces.'
    };
  }

  const output = `${listResult.stdout}\n${listResult.stderr}`;
  if (marketplaceIsListed(output)) {
    return { status: 'added', detail: firstMatchingLine(output, marketplaceName) || firstMatchingLine(output, 'frontend-GOD') };
  }

  return { status: 'not added', detail: 'No frontend-god marketplace entry was found.' };
}

function suggestDoctorCommand({ codexFound, marketplace, skillFile }) {
  if (!codexFound) {
    return 'Install Codex CLI, or run: npx github:yappologistic/frontend-GOD --skill-only';
  }

  if (marketplace.status === 'added') {
    return 'npx github:yappologistic/frontend-GOD';
  }

  if (fs.existsSync(skillFile)) {
    return 'npx github:yappologistic/frontend-GOD --skill-only --force';
  }

  return 'npx github:yappologistic/frontend-GOD';
}

function marketplaceIsListed(output) {
  return /frontend-god|frontend-GOD|yappologistic\/frontend-GOD|frontend-design-director/i.test(output);
}

function firstMatchingLine(output, pattern) {
  const regex = typeof pattern === 'string' ? new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') : pattern;
  return output.split(/\r?\n/).find((line) => regex.test(line))?.trim() || '';
}

function firstLine(text = '') {
  return text.split(/\r?\n/).find((line) => line.trim())?.trim() || '';
}

function runCodex(commandArgs) {
  return spawnSync('codex', commandArgs, {
    encoding: 'utf8',
    shell: process.platform === 'win32'
  });
}

function printCommandOutput(result) {
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
}

function existingMarketplaceName(stderr = '') {
  return stderr.match(/marketplace '([^']+)' is already added/i)?.[1] || null;
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
