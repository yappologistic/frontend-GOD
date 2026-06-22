# Changelog

## Unreleased

- Make the npx installer rerunnable by updating existing marketplaces and adding a `--reinstall` path.
- Add an `npx frontend-design-director` installer with marketplace and skill-only install paths.
- Add mode-specific checklists and a `P0`-`P3` frontend review severity model.
- Add shadcn/Radix and Codex browser-comment workflow guidance.
- Add severity-aware JSON output, severity filtering, and fail thresholds to the audit scripts.
- Add a dependency-free audit output test harness.
- Add a Codex Workflow Router so the skill cooperates with built-in browser, Chrome, GitHub, Figma/product-design, data analytics, image generation, and companion frontend workflows.
- Add `references/codex-tool-workflows.md` with Codex-native visual QA, dev-server, specialized workflow, and unavailable-tool fallback guidance.
- Update docs to describe Codex-native workflow pairings and official Codex customization/plugin alignment.
- Add no-ship quality gates and a mandatory visual revision loop to the frontend design skill.
- Add scored QA pass criteria for visually important frontend work.
- Expand bad-vs-better examples for dashboards, forms, settings, landing pages, pricing, data tables, and mobile layouts.
- Expand the design audit script with additional generic-AI UI and UX heuristic warnings.
- Update docs to describe the stricter quality gates and audit behavior.

## 0.1.1

- Fix marketplace installation by adding the canonical `plugins/frontend-design-director/` package path.
- Update the marketplace entry to point at `./plugins/frontend-design-director`.
- Update validation and docs to catch installable package layout regressions.

## 0.1.0

- Initial public release.
- Package `frontend-design-director` as a Codex plugin.
- Include skill references, audit scripts, local marketplace metadata, validation script, and public repository documentation.
