# Frontend Design Director

Frontend Design Director is an open-source Codex plugin that packages the `$frontend-design-director` skill for building, redesigning, reviewing, and QA'ing polished, accessible, responsive, non-generic frontend UI/UX.

It is for developers, designers, product engineers, and teams that want Codex to treat frontend work as product design, not just component generation.

## What It Does

- Guides Codex through build, redesign, review, design-system, and UX-debugging modes.
- Pushes frontend work toward clear hierarchy, accessibility, responsive behavior, strong states, and maintainable implementation.
- Avoids generic AI-template visuals such as vague SaaS copy, default gradients, identical cards, low-contrast text, and missing loading/empty/error states.
- Adds no-ship gates, a mandatory visual revision loop, and a scored QA rubric for visually important frontend work.
- Bundles practical reference playbooks and dependency-free audit scripts.

## Installation

### Option A: GitHub Marketplace Source

Add the marketplace source:

```bash
codex plugin marketplace add yappologistic/frontend-GOD
```

Pin the initial stable release:

```bash
codex plugin marketplace add yappologistic/frontend-GOD --ref v0.1.1
```

If your Codex version requires sparse marketplace installation, include both the marketplace file and plugin package:

```bash
codex plugin marketplace add https://github.com/yappologistic/frontend-GOD.git --sparse .agents/plugins --sparse plugins/frontend-design-director
```

Restart Codex after adding or updating a marketplace if the plugin does not appear immediately.

### Option B: Local Plugin Development

```bash
git clone https://github.com/yappologistic/frontend-GOD.git
cd frontend-GOD
codex plugin marketplace add ./
codex plugin marketplace list
```

### Option C: Manual Skill-Only Install

Copy `skills/frontend-design-director/` into either:

```text
$HOME/.agents/skills/frontend-design-director/
```

or a project repo:

```text
.agents/skills/frontend-design-director/
```

Plugin distribution is preferred for public reuse. Direct skill folders are useful for local authoring and repo-scoped workflows.

## Quick Start

Invoke explicitly:

```text
$frontend-design-director
```

Example prompts:

```text
$frontend-design-director Redesign this dashboard so it feels like a polished, production-grade analytics product. Improve hierarchy, spacing, responsiveness, accessibility, loading/empty/error states, and avoid generic AI-template visuals.
```

```text
$frontend-design-director Review this frontend for UX, accessibility, responsive layout, design-system consistency, and generic AI-design anti-patterns.
```

```text
$frontend-design-director Build a production-quality settings page using the existing project stack and design conventions.
```

## Repository Structure

```text
.codex-plugin/plugin.json
.agents/plugins/marketplace.json
plugins/frontend-design-director/
skills/frontend-design-director/
docs/
scripts/validate-plugin.mjs
README.md
LICENSE
CONTRIBUTING.md
CODE_OF_CONDUCT.md
SECURITY.md
CHANGELOG.md
package.json
```

## Validate Locally

```bash
npm run validate
npm run check:scripts
```

The skill audit scripts can also be run against a frontend project:

```bash
npm run audit:design -- /path/to/frontend
npm run audit:a11y -- /path/to/frontend
npm run audit:tokens -- /path/to/frontend
```

The audit scripts are heuristic review prompts, not proof of quality. The design audit flags common AI-UI slop such as vague CTA copy, repeated large-radius cards, heavy shadows, gradient overuse, missing focus-style signals, missing reduced-motion accommodations, viewport-height risks, muted text overuse, and repeated default containers.

## Contributing

See `CONTRIBUTING.md` for contribution guidance. Improvements should make the skill more operational, not more verbose.

## Status

Official public Codex Plugin Directory self-serve publishing may not yet be generally available. For now, GitHub/marketplace installation is the recommended public distribution path.

## License

MIT.
