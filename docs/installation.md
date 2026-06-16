# Installation

# Option A: Install From GitHub Marketplace Source

After this repository is published, add it as a Codex plugin marketplace:

```bash
codex plugin marketplace add yappologistic/frontend-GOD
```

Pin the initial stable release:

```bash
codex plugin marketplace add yappologistic/frontend-GOD --ref v0.1.0
```

Use sparse marketplace installation if your Codex build needs the marketplace folder explicitly:

```bash
codex plugin marketplace add https://github.com/yappologistic/frontend-GOD.git --sparse .agents/plugins
```

Restart Codex after adding or updating a marketplace if the plugin does not appear immediately.

# Option B: Local Plugin Development Install

```bash
git clone https://github.com/yappologistic/frontend-GOD.git
cd frontend-GOD
codex plugin marketplace add ./
```

Inspect configured marketplaces:

```bash
codex plugin marketplace list
```

# Option C: Manual Skill-Only Install

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
