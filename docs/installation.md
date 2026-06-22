# Installation

# Option A: npx Installer From GitHub

Install with:

```bash
npx github:yappologistic/frontend-GOD
```

This runs the official Codex marketplace flow:

```bash
codex plugin marketplace add yappologistic/frontend-GOD
```

Pin a specific release:

```bash
npx github:yappologistic/frontend-GOD --ref v0.1.3
```

Install only the skill folder into the user-scoped skill location:

```bash
npx github:yappologistic/frontend-GOD --skill-only
```

Reinstall or replace an existing marketplace source:

```bash
npx github:yappologistic/frontend-GOD --reinstall
```

Troubleshoot local install state:

```bash
npx github:yappologistic/frontend-GOD --doctor
```

After the package is published to npm, `npx frontend-design-director` works as the shorter equivalent.

If the marketplace is already registered, the installer updates the existing marketplace. Use `--reinstall` when you want to remove the old marketplace source and add this GitHub source again. Use `--doctor` to check whether the Codex CLI is available, whether the marketplace is registered, whether a skill-only copy exists, and which command to run next. Use `--skill-only --force` to replace an existing skill-only install. Restart Codex or start a new Codex thread if the plugin/skill does not appear immediately.

# Option B: Install From GitHub Marketplace Source

Add it as a Codex plugin marketplace:

```bash
codex plugin marketplace add yappologistic/frontend-GOD
```

Pin the initial stable release:

```bash
codex plugin marketplace add yappologistic/frontend-GOD --ref v0.1.3
```

Use sparse marketplace installation if your Codex build needs explicit paths. Include both the marketplace file and plugin package:

```bash
codex plugin marketplace add https://github.com/yappologistic/frontend-GOD.git --sparse .agents/plugins --sparse plugins/frontend-design-director
```

Restart Codex after adding or updating a marketplace if the plugin does not appear immediately.

# Option C: Local Plugin Development Install

```bash
git clone https://github.com/yappologistic/frontend-GOD.git
cd frontend-GOD
codex plugin marketplace add ./
```

Inspect configured marketplaces:

```bash
codex plugin marketplace list
```

# Option D: Manual Skill-Only Install

Copy:

```text
skills/frontend-design-director/
```

into a user-scoped skill folder:

```text
$HOME/.agents/skills/frontend-design-director/
```

or into a project-scoped skill folder:

```text
.agents/skills/frontend-design-director/
```

Plugin distribution is preferred for public reuse. Direct skill folders are useful for local authoring and repo-scoped workflows.

Codex skills work across the CLI, IDE extension, and Codex app. Plugin installation is preferred when you want the skill to behave as a reusable Codex package and cooperate with other plugin-provided skills, apps, MCP servers, and browser workflows.
