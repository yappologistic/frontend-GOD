# Architecture

# Plugin Wrapper

`plugins/frontend-design-director/.codex-plugin/plugin.json` is the installable plugin manifest used by the marketplace entry.

The root `.codex-plugin/plugin.json` mirrors the same metadata for repository-level validation and direct local experiments.

# Bundled Skill

`plugins/frontend-design-director/skills/frontend-design-director/` is the skill bundled with the installable plugin.

The root `skills/frontend-design-director/` mirrors the same skill for manual skill-only installation and easier editing.

Repository validation checks these two skill directories for identical file lists and file contents so the installable plugin cannot drift from the editable root skill.

# References

`skills/frontend-design-director/references/` keeps detailed guidance outside `SKILL.md` so the core skill remains operational and not bloated.

`references/codex-tool-workflows.md` is the Codex-native workflow guide. It documents how this skill cooperates with in-app browser, Browser use, Chrome, Playwright-style automation, GitHub, Figma/product-design, data analytics, image generation, and dev-server workflows.

# Audit Scripts

`skills/frontend-design-director/scripts/` contains dependency-free Node.js heuristic checks for design, accessibility, and token issues. They do not prove quality, but they surface review prompts.

# Marketplace File

`.agents/plugins/marketplace.json` provides a repo-local marketplace entry for installing or testing this plugin through Codex marketplace workflows. It points at `./plugins/frontend-design-director`, which is the canonical plugin package path Codex expects.

# Why Package As A Plugin

Plugin packaging makes the skill easier to distribute publicly, version, document, validate, and install from GitHub while preserving direct skill-only installation for local workflows.

This matches Codex's customization model: skills are the authoring format for reusable workflows, while plugins are the installable distribution unit that can bundle skills, app integrations, MCP configuration, and related assets.
