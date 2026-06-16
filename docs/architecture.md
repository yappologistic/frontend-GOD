# Architecture

# Plugin Wrapper

`.codex-plugin/plugin.json` defines plugin metadata, public presentation fields, and the relative `skills` directory used by Codex.

# Bundled Skill

`skills/frontend-design-director/` contains the actual Codex skill. It can also be copied directly into a user or repo skill directory for skill-only usage.

# References

`skills/frontend-design-director/references/` keeps detailed guidance outside `SKILL.md` so the core skill remains operational and not bloated.

# Audit Scripts

`skills/frontend-design-director/scripts/` contains dependency-free Node.js heuristic checks for design, accessibility, and token issues. They do not prove quality, but they surface review prompts.

# Marketplace File

`.agents/plugins/marketplace.json` provides a repo-local marketplace entry for installing or testing this plugin through Codex marketplace workflows.

# Why Package As A Plugin

Plugin packaging makes the skill easier to distribute publicly, version, document, validate, and install from GitHub while preserving direct skill-only installation for local workflows.
