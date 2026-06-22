# Workflow Handoff Contracts

Use this reference when frontend work overlaps with another Codex skill, plugin, MCP tool, app connector, browser surface, or workflow. Treat Frontend Design Director as the frontend quality layer, not the owner of every domain.

# Preflight Context Packet

Before handing work to another workflow, gather a compact packet. Keep it internal unless the user needs to see it.

```json
{
  "frontend_mode": "Build | Redesign | Review | Design-System | Debug-UX",
  "surface": "route/component/file/PR/comment/design",
  "framework": "Next.js | Vite | React | Expo DOM | other | unknown",
  "design_system": "shadcn/Radix | custom | component library | unknown",
  "primary_user_task": "what the user needs to accomplish",
  "primary_action": "main visible action or decision",
  "constraints": ["preserve API", "do not add dependencies", "match design artifact"],
  "companion_workflows": ["GitHub", "Figma", "Browser", "shadcn", "data-analytics"],
  "verification_needed": ["desktop", "mobile", "keyboard", "states", "data labels"]
}
```

Minimum packet fields:

- frontend mode
- affected surface
- existing framework/design system if known
- primary user task
- companion workflow ownership
- verification needed before final response

# Ownership Rule

Do not steal ownership from specialized workflows.

- GitHub workflows own PR comments, issue context, CI state, review mechanics, and publishing mechanics.
- Figma/product-design workflows own design-file access, design generation, design artifact interpretation, and selected visual direction.
- Data-analytics workflows own source-backed data access, methodology, metric definitions, dataset shape, artifact manifests, and chart provenance.
- shadcn/Radix workflows own installation, registry mechanics, primitive selection, generated component details, and Radix API conventions.
- React/Next/frontend architecture workflows own server/client boundaries, routing, rendering behavior, framework data loading, and framework-specific performance decisions.
- Browser, Chrome, DevTools, and Playwright workflows own live page control, screenshots, console/network inspection, DOM inspection, and repeatable browser automation.
- Image generation workflows own generated raster assets and image edits.
- Git publishing workflows own commit/push/release mechanics.

Frontend Design Director owns product fit, hierarchy, accessibility, responsive behavior, state coverage, copy specificity, visual craft, design-system fit, and final frontend QA.

# Return-To-Frontend QA Rule

After a companion workflow finishes, return to frontend QA before final response whenever the output affects user-facing UI.

Check:

- The primary user task and action are still clear.
- The changed surface follows existing tokens, components, layout density, and interaction patterns.
- Loading, empty, error, success, disabled, hover, focus-visible, and active states exist where relevant.
- Mobile and desktop layouts are checked or explicitly unverified.
- Accessibility basics are preserved: semantic controls, labels, focus behavior, keyboard flow, contrast, and reduced motion.
- Copy names concrete product objects, user roles, units, or outcomes when relevant.
- No specialized workflow output was blindly accepted if it creates frontend regressions.

Report the return QA surface: browser, screenshot, PR, Figma handoff, data artifact, code-only, or unavailable.

# Handoff Contracts

## Browser, Chrome, DevTools, And Playwright

Use when frontend quality depends on seeing the rendered UI, signed-in state, console/network behavior, computed styles, responsive screenshots, or interaction paths.

Pass:

- route or URL
- viewport targets
- primary interaction path
- states to trigger
- known auth/profile requirements

Return QA:

- Verify nonblank render, no obvious console-visible breakage when available, no overflow/overlap, visible focus states, touch target plausibility, and primary interaction completion.
- Patch visible issues and re-check the affected viewport or interaction.
- State viewports and interaction path tested.

## GitHub

Use when the task references PRs, review comments, CI failures, issues, releases, or publishing.

Pass:

- PR/issue/comment identifiers
- affected route/component/file
- frontend mode
- checks likely to map to CI or review expectations
- constraints such as preserving public APIs, analytics IDs, and test IDs

Return QA:

- Group comments by route/component when possible.
- Verify each frontend comment or CI failure against code, tests, browser, or screenshots.
- Report addressed comments, unresolved comments, and checks run.

## Figma And Product Design

Use when the user references a design file, design artifact, visual selection, screenshot-to-code task, or asks to generate a design.

Pass:

- design file/node/screenshot context
- implementation target route/component
- existing framework and design system
- responsive constraints
- fidelity requirements versus adaptation allowances

Return QA:

- Preserve design intent while adapting to semantic HTML, responsive behavior, project tokens, and accessible components.
- Do not stop at visual parity. Check mobile, states, focus behavior, and product-specific copy.
- Report where implementation intentionally adapted the design.

## shadcn And Radix

Use when the repo has `components.json`, `components/ui`, `@radix-ui/*`, shadcn registry patterns, or the user asks for shadcn/Radix work.

Pass:

- existing component paths
- registry/config files
- token and variant conventions
- primitive behavior needed
- accessibility-sensitive interactions such as dialogs, menus, popovers, tabs, selects, command menus, and tooltips

Return QA:

- Verify variants, composition, focus management, keyboard behavior, controlled/uncontrolled state, portal behavior, escape/close behavior, and accessible names.
- Customize density, layout, copy, and tokens so output does not look like unmodified defaults.

## React, Next.js, Vite, And Frontend Architecture

Use when implementation depends on routing, server/client boundaries, framework data loading, hydration, bundle behavior, or rendering performance.

Pass:

- framework and router
- affected route/component boundary
- state/data ownership
- build/test scripts
- performance or hydration concerns

Return QA:

- Verify the chosen implementation fits existing framework conventions.
- Check that frontend polish did not add unnecessary client JavaScript, global state, layout shift, or dependencies.
- Run real scripts and browser verification when available.

## Data Analytics And Dashboard Artifacts

Use when the UI depends on source-backed metrics, charts, reports, dashboards, or analytical methodology.

Pass:

- metric definitions needed by the UI
- dimensions, filters, and time grain
- required labels, units, denominators, and source context
- chart or table surface
- empty/loading/error needs

Return QA:

- Verify labels, units, time ranges, denominators, legends, tooltips, empty/error states, and responsive chart/table behavior.
- Do not change metric logic or provenance unless the data workflow owns that change.

## Image Generation

Use when a raster asset materially improves the UI and no existing product or brand asset fits.

Pass:

- asset purpose
- placement and dimensions
- brand/product constraints
- text-safety requirements
- fallback behavior if the image is unusable

Return QA:

- Verify the asset renders at intended sizes, does not destabilize layout, does not obscure text, and fits the product tone.

## Git Publishing

Use when the user asks to commit, push, publish, tag, or release.

Pass:

- changed files and user-facing behavior
- verification commands and results
- remaining uncommitted files if any
- desired version/tag/release target

Return QA:

- Before publishing, ensure frontend-relevant tests and docs are current.
- After publishing, report commit hash, remote/branch, and any verification gaps.

# Final Response Evidence

When another workflow was involved, include:

- companion workflow or plugin surface used
- what that workflow owned
- frontend QA surface used after handoff
- commands/checks run
- viewport or interaction coverage when visual
- unresolved limitations or unavailable tools
