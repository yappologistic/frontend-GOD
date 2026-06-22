#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'frontend-design-audit-'));

function writeFixture(rel, contents) {
  const full = path.join(fixtureRoot, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
  return full;
}

function runScript(script, args = []) {
  return spawnSync(process.execPath, [path.join(root, script), fixtureRoot, ...args], {
    cwd: root,
    encoding: 'utf8'
  });
}

function parseJsonOutput(result) {
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return JSON.parse(result.stdout);
}

writeFixture('App.tsx', `
export function App() {
  return (
    <main>
      <button><Icon /></button>
      <div onClick={() => alert("open")}>Open panel</div>
      <p>Boost productivity with our powerful platform.</p>
      <a>Get started</a>
      <a>Learn more</a>
      <section className="rounded-2xl rounded-2xl rounded-2xl rounded-2xl rounded-2xl rounded-2xl" />
      <div style={{ color: "#ff0000" }}>Warning</div>
    </main>
  );
}
`);

writeFixture('tokens.css', `
.theme {
  --brand: #ff0000;
}
`);

writeFixture('GenericProductPage.tsx', `
export function GenericProductPage() {
  return (
    <main>
      <section>
        <h1>Everything you need in one place</h1>
        <p>Built for modern teams that want to move faster and save time.</p>
        <a>Get Started</a>
      </section>
      <Card><Icon /><Title>Plan</Title><Description>Simple and powerful.</Description></Card>
      <Card><Icon /><Title>Track</Title><Description>Insights at a glance.</Description></Card>
      <Card><Icon /><Title>Grow</Title><Description>Make better decisions.</Description></Card>
    </main>
  );
}
`);

writeFixture('Dashboard.tsx', `
export function Dashboard() {
  return (
    <main>
      <h1>Analytics Dashboard</h1>
      <Metric label="Conversion" value="42" />
      <Chart title="Performance trend" />
    </main>
  );
}
`);

const designJson = parseJsonOutput(runScript('skills/frontend-design-director/scripts/design-audit.mjs', ['--json']));
assert.equal(designJson.tool, 'design-audit');
assert.equal(designJson.scanned, 4);
assert.ok(designJson.warningCount > 0);
assert.ok(designJson.warnings.every((warning) => ['high', 'medium', 'low'].includes(warning.severity)));
assert.ok(designJson.warnings.some((warning) => warning.rule === 'icon-only-button-name' && warning.severity === 'high'));
assert.ok(designJson.warnings.some((warning) => warning.rule === 'generic-ai-copy' && warning.severity === 'low'));
assert.ok(designJson.warnings.some((warning) => warning.rule === 'vague-cta-copy' && warning.severity === 'low'));
assert.ok(designJson.warnings.some((warning) => warning.rule === 'generic-section-copy' && warning.severity === 'low'));
assert.ok(designJson.warnings.some((warning) => warning.rule === 'missing-product-nouns' && warning.severity === 'low'));
assert.ok(designJson.warnings.some((warning) => warning.rule === 'missing-user-context' && warning.severity === 'low'));
assert.ok(designJson.warnings.some((warning) => warning.rule === 'repeated-feature-card-layout' && warning.severity === 'low'));
assert.ok(designJson.warnings.some((warning) => warning.rule === 'dashboard-missing-units' && warning.severity === 'medium'));

const mediumDesignJson = parseJsonOutput(runScript('skills/frontend-design-director/scripts/design-audit.mjs', ['--json', '--min-severity', 'medium']));
assert.ok(mediumDesignJson.warnings.every((warning) => ['high', 'medium'].includes(warning.severity)));
assert.ok(!mediumDesignJson.warnings.some((warning) => warning.severity === 'low'));

const failHigh = runScript('skills/frontend-design-director/scripts/design-audit.mjs', ['--fail-on', 'high']);
assert.equal(failHigh.status, 1);

const a11yJson = parseJsonOutput(runScript('skills/frontend-design-director/scripts/a11y-static-check.mjs', ['--json']));
assert.equal(a11yJson.tool, 'a11y-static-check');
assert.ok(a11yJson.warnings.some((warning) => warning.rule === 'button-name' && warning.severity === 'high'));
assert.ok(a11yJson.warnings.some((warning) => warning.rule === 'clickable-noninteractive' && warning.severity === 'high'));

const tokenJson = parseJsonOutput(runScript('skills/frontend-design-director/scripts/token-audit.mjs', ['--json']));
assert.equal(tokenJson.tool, 'token-audit');
assert.ok(Array.isArray(tokenJson.topRawValues));
assert.ok(tokenJson.warnings.some((warning) => warning.rule === 'raw-color' && warning.severity === 'medium'));

fs.rmSync(fixtureRoot, { recursive: true, force: true });
console.log('audit output tests passed');
