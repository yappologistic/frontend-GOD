# Codex Tool Workflows

Use this reference when Codex-native tools, installed plugins, MCP servers, app connectors, browser surfaces, or companion skills can improve frontend implementation or verification. Tool availability varies by environment. If a named workflow is unavailable, do not claim it was used. Fall back to the next available verification method and report the limitation.

# Workflow Priority

For frontend quality work, prefer the narrowest workflow that can observe or affect the requested surface:

1. Existing project scripts and local app surface.
2. In-app browser or Browser use for local development servers, file-backed previews, and public unauthenticated pages.
3. Chrome extension or Chrome/DevTools workflows when the task needs signed-in browser state, browser extensions, existing Chrome profile context, console/network inspection, DOM state, computed styles, or performance profiling.
4. Playwright or browser automation tools for repeatable responsive screenshots, interaction checks, and regression-oriented verification.
5. Specialized plugin/app workflows for GitHub, Figma, product design, data analytics, image generation, documents, or other non-code surfaces.
6. Static code review only when the UI cannot be run or inspected.

# Do Not Override Specialized Workflows

When a more specific Codex skill or plugin applies, use this skill for frontend taste, UX, accessibility, responsive behavior, visual QA, and implementation fit. Defer domain-specific decisions to the specialized workflow:

- shadcn/Radix workflows own shadcn installation, primitive selection, component conventions, and registry details.
- React/Next/frontend architecture workflows own server/client boundaries, rendering, routing, framework performance, and framework-specific data loading.
- GitHub workflows own pull request comments, issue context, CI triage, review mechanics, and publishing flow.
- Figma/product-design workflows own design-file access, design generation, design handoff, and design artifact interpretation.
- Data analytics workflows own source-backed datasets, report/dashboard artifact manifests, analytical methodology, and chart/report data provenance.
- Image generation workflows own generated raster assets and image edits.

# Browser And Visual QA

Use browser-driven inspection when available for visually important frontend work. For local development servers, file-backed previews, and public pages that do not require sign-in, prefer the Codex in-app browser or Browser use. For signed-in pages, browser extensions, existing profile state, or authenticated internal tools, use Chrome workflows when available.

For runnable UI, inspect or capture:

- desktop: `1440x900`
- laptop: `1280x800`
- tablet: `768x1024`
- mobile: `390x844`
- small mobile: `320x640`

At each relevant viewport, check:

- route renders and is nonblank
- no horizontal overflow unless deliberately required for true tabular data
- no clipped, overlapping, or badly wrapped text
- primary action and primary object remain obvious
- sticky headers, footers, toolbars, and modals do not cover content
- images, video, canvas, icons, and charts render as intended
- loading, empty, error, success, disabled, hover, focus-visible, and active states exist where relevant
- touch targets and spacing work on mobile
- focus states are visible and keyboard flow is plausible or tested
- component-library defaults have been adapted to product tokens and context

After the first implementation pass, identify the three weakest visual or UX issues, patch them, and re-check the affected viewport or interaction path.

# Browser Use And Playwright

When Browser use or Playwright-like tools are available:

1. Start or reuse the app through the project's real scripts.
2. Open the changed route or component preview.
3. Capture desktop and mobile screenshots when possible.
4. Exercise the primary interaction path, such as opening a menu, submitting a form, changing filters, switching tabs, or triggering validation.
5. Verify changed routes are nonblank and free of obvious console-visible breakage when the tool exposes it.
6. Check overflow, overlap, focus visibility, keyboard/touch reachability, and responsive behavior.
7. Patch visible defects.
8. Re-run the screenshot or interaction check for the changed area.

# Chrome And DevTools

Use Chrome or DevTools workflows when the task needs signed-in browser state, an extension-enabled browser, profile-specific behavior, console/network inspection, applied style inspection, DOM state, performance profiling, or a real site that cannot run in the in-app browser.

When available and relevant:

- inspect console errors and warnings tied to the changed route
- inspect failed network requests for missing assets or data dependencies
- inspect computed styles for overflow, contrast, layout, sticky positioning, and z-index issues
- verify responsive emulation for the target breakpoints
- keep sensitive browser tasks narrow and report when signed-in or profile-dependent verification was used

# GitHub Workflows

Use GitHub workflows when the task references pull requests, review comments, CI failures, issues, releases, or publishing.

For frontend PR/comment work:

1. Fetch the relevant PR comments, issue context, CI failure, or review thread before editing.
2. Keep patches scoped to the requested frontend surface.
3. Preserve behavior, analytics/test IDs, route contracts, and public component APIs unless the comment requires changing them.
4. Run local checks that correspond to the CI failure or changed UI.
5. Report which comments or checks were addressed and what remains.

# Figma And Product Design Workflows

Use Figma or product-design workflows only when the user references a Figma file, asks for design generation, asks to inspect a design artifact, or asks to implement a selected visual design.

When translating design to code:

- preserve the design intent, hierarchy, and visual rhythm
- adapt to the project's existing framework, tokens, components, and accessibility requirements
- do not blindly recreate fixed pixels when responsive behavior, semantic HTML, or maintainable components require adaptation
- inspect the resulting UI in browser viewports rather than stopping at code parity

# Data Analytics And Dashboard Artifacts

Use data-analytics workflows when a dashboard, report, or chart must be source-backed. Let that workflow own data access, methodology, dataset shape, artifact manifests, and chart provenance. Use this skill to ensure the rendered frontend has clear hierarchy, units, labels, responsive behavior, accessible interactions, useful states, and visual craft.

# Image Generation

Use image generation only when a bitmap asset materially improves the frontend and no existing product asset fits. Prefer real product screenshots, existing brand assets, or user-provided imagery when those are more accurate. When generating assets, verify the resulting image renders correctly, has appropriate dimensions, and does not make text unreadable or layout unstable.

# Dev Server Protocol

For runnable frontend apps:

1. Inspect `package.json` and existing docs before choosing commands.
2. Use existing scripts and package manager conventions.
3. Start the dev server only when needed for verification.
4. Reuse an existing server when it is already serving the right app.
5. Avoid starting duplicate servers on occupied ports.
6. If the expected port is occupied by another app, choose an available port when the framework supports it and note the URL.
7. Use browser, Playwright, Chrome, screenshots, or the best available preview method to inspect the changed route.
8. Stop background servers started solely for verification unless the user needs the server left running.
9. If a server is left running for the user, report the URL.

# Final Response Evidence

When a Codex workflow or plugin surface was relevant, report:

- workflow/tool used
- surface inspected: browser, screenshot, PR, Figma, CI, artifact, or code-only
- viewport/device coverage for visual work
- primary interaction path tested
- commands run and result
- unresolved tool limitations or verification gaps
