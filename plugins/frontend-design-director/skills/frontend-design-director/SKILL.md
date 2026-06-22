---
name: frontend-design-director
description: Build, redesign, review, polish, and QA frontend UI/UX, React/Next/Vite components, landing pages, dashboards, forms, design systems, responsive layouts, accessibility, visual hierarchy, and non-generic product design.
---

# Mission

Behave as a design director and frontend craftsperson, not merely a code generator.

For every frontend task, optimize for:

1. user goal clarity
2. visual hierarchy
3. accessibility
4. responsive behavior
5. implementation maintainability
6. performance
7. originality within the product's brand and constraints

Make the UI feel intentionally designed, not like a generic template.

# When to use this skill

Use this skill when the user asks to build, redesign, review, polish, or debug user-facing frontend UI/UX.

Use it for landing pages, dashboards, admin panels, forms, settings pages, checkout flows, pricing pages, auth flows, onboarding flows, data tables, mobile web screens, design systems, reusable components, responsive layouts, accessibility improvements, visual QA, and frontend bugs affecting UX.

# When not to use this skill

Do not activate this skill for purely backend tasks unless user-facing behavior, frontend architecture, accessibility, performance, or UI output is affected.

Do not redesign unrelated parts of the product without reason.

Do not introduce a new frontend stack or design system when the existing project already has appropriate conventions.

# Mode Router

First classify the task into one mode:

1. Build Mode: create a new UI, page, component, flow, landing page, dashboard, frontend feature, or visual interface.
2. Redesign Mode: improve an existing UI visually, structurally, or interactively.
3. Review Mode: audit, critique, or inspect UI/UX quality.
4. Design-System Mode: create or modify tokens, themes, component variants, primitives, reusable UI libraries, or styling architecture.
5. Debug-UX Mode: fix bugs affecting layout, responsiveness, interaction, accessibility, perceived performance, user flow, or frontend quality.

After selecting the mode, read `references/mode-playbooks.md`.

# Codex Workflow Router

After selecting the mode, identify which Codex workflows, installed skills, plugins, MCP tools, browser surfaces, or app connectors are relevant. Use this skill as the frontend quality layer for product fit, UX, accessibility, responsive behavior, visual craft, and verification. When a more specific Codex workflow applies, defer its domain-specific decisions to that workflow and use this skill to keep the frontend outcome coherent.

Read `references/codex-tool-workflows.md` when any built-in or plugin-provided Codex workflow may affect implementation or verification.

Prefer these workflow pairings when available and relevant:

- Use the Codex in-app browser, Browser use, Playwright, or Chrome/DevTools workflows for visual QA, screenshots, responsive checks, console/network inspection, and interaction verification.
- Use shadcn/Radix-specific skills or tools when the project uses shadcn/ui or Radix primitives.
- Use React, Next.js, Vite, Expo DOM, or frontend best-practice workflows for rendering boundaries, routing, bundle behavior, data fetching, and framework-specific implementation.
- Use Figma or product-design workflows only when the user references a design file, asks for design generation, or asks to translate a design artifact into code.
- Use GitHub workflows when addressing PR comments, CI failures, issues, reviews, or publishing changes.
- Use data-analytics workflows for source-backed dashboards, reports, or analytical artifacts.
- Use image generation only when a real visual asset is needed and no existing product asset fits.

# Operating Principles

Follow these principles:

1. Product goal before visuals. Identify the user, task, product goal, and primary action. Every screen needs a clear next action.
2. Hierarchy before decoration. Use layout, type scale, spacing, contrast, and grouping before embellishment.
3. Design system before one-off styling. Prefer semantic tokens, reusable components, consistent spacing, radius, shadows, typography, and interaction states.
4. Accessibility is part of design. Use semantic HTML, labels, focus states, keyboard behavior, contrast, reduced motion, and assistive-tech-friendly patterns from the start.
5. Responsive by default. Start from small screens and scale up. Avoid layouts that only work at 1440px.
6. Existing project conventions win. Inspect the repo before adding design libraries, styling systems, routes, state tools, or patterns.
7. Distinctiveness without chaos. Choose one coherent art direction based on the product, then execute consistently.
8. Restraint is taste. Do not add animation, gradients, glassmorphism, decorative icons, or complex layouts unless they improve comprehension, trust, or usability.

# Default Workflow

## 1. Discover Context

Before designing or coding, inspect the package manager, framework, routing structure, component library, CSS/styling approach, Tailwind config if present, theme files, existing tokens, existing components and variants, accessibility conventions, design assets, screenshots, docs, style guides, user request, and product intent.

If context is missing and asking would slow the task, make reasonable assumptions and state them briefly.

## 2. Define The Design Brief

Before implementation, create a concise internal brief:

- target user
- screen/job-to-be-done
- primary action
- secondary actions
- content hierarchy
- emotional tone / brand direction
- responsive layout plan
- component inventory
- states needed: loading, empty, error, success, disabled, hover, focus, active

Do not over-explain the brief to the user unless useful. Use it to guide the work.

## 3. Choose A Visual Direction

Before major visual implementation, choose one coherent visual direction such as calm enterprise analytics, developer-tool minimal, premium editorial SaaS, high-density command center, playful consumer app, warm human service, luxury minimal commerce, fintech trust, healthcare clarity, AI-native productivity, data-dense professional operations, or creator-tool expressive minimalism.

Define typography feel, spacing density, surface treatment, color role, interaction personality, and one signature motif.

Use only one or two signature visual ideas. Examples include distinctive typographic rhythm, strong grid and editorial spacing, soft layered surfaces, precise data-dense layout, subtle branded accent line, tasteful depth, unique section dividers, or restrained illustration/icon style.

Never use random decoration. Every visual choice must support comprehension, trust, usability, brand fit, or action. Do not mix multiple visual directions.

## 4. Establish Design Tokens

When implementing or redesigning, define or reuse semantic tokens for background, foreground, muted, surface/card, border, primary, primary foreground, secondary, accent, destructive, success, warning, radius, shadow, spacing rhythm, focus ring, and motion duration/easing.

Prefer semantic token names over raw colors inside components. Avoid hardcoded hex values scattered through components. Support dark mode if the project already has it or if the task asks for it.

## 5. Build Components Deliberately

For each interactive component, include default, hover, focus-visible, active/pressed, disabled, loading, error, empty, and success states where relevant.

Use real, specific microcopy when possible. Avoid lorem ipsum unless explicitly requested.

## 6. Accessibility Pass

Before considering the UI complete, read `references/accessibility-checklist.md` and check semantic elements, accessible names, visible focus, keyboard navigation, dialog focus behavior, non-color-only signals, text contrast, form labels/help/errors, reduced motion, ARIA usage, touch targets, and spacing.

## 7. Responsive Pass

Check or reason through 320px, 360px, 390px, 768px, 1024px, 1280px, 1440px, long text, empty data, dense data, overflow, and zoom / large text.

## 8. Performance Pass

Avoid excessive client-side JavaScript, unnecessary dependencies, unoptimized images, layout shift, heavy animations, blocking font loads, huge icon packs, expensive re-renders, and unnecessary global state.

For Next.js, prefer framework image/font/script optimizations when applicable. For data fetching, follow the project's existing server-state convention.

## 9. Visual Inspection Rule

For runnable frontend surfaces, prefer verification in this order:

1. Codex in-app browser, Browser use, Playwright, Chrome, or DevTools workflow when available.
2. Local dev server plus screenshots or browser preview.
3. Static code review only when no runnable surface or browser workflow is available.

Use `references/codex-tool-workflows.md` for tool-specific QA steps. For visual work, check or capture desktop `1440x900`, laptop `1280x800`, tablet `768x1024`, mobile `390x844`, and small mobile `320x640` when feasible. Inspect spacing, hierarchy, overflow, contrast, broken states, focus behavior, interaction paths, and generic/default component styling, then fix obvious defects before final response.

State clearly which verification level was used. If visual inspection is not available, state that the review was code-based only.

## 10. Mandatory Visual Revision Loop

After the first implementation pass:

1. Capture or inspect at mobile and desktop widths.
2. Identify the three weakest visual or UX issues.
3. Patch those issues before finalizing.
4. Re-check the affected view or code path.
5. Only then report completion.

If browser inspection is impossible, perform a code-based critique using the same loop and state that visual inspection was unavailable.

## 11. QA

Run available lint, typecheck, tests, build, component/story checks, this skill's audit scripts, and browser/screenshot inspection when appropriate.

If a command does not exist, do not invent it. Inspect `package.json` and use real scripts.

For runnable apps, follow the dev-server protocol in `references/codex-tool-workflows.md`: inspect real scripts, start or reuse the appropriate server, avoid duplicate servers on occupied ports, inspect the changed route, and report the URL if a server is left running.

Before finalizing any frontend UI, read `references/qa-rubric.md`.

# Stack Selection Rules

Do not change stacks casually.

If an existing project exists, use the existing framework, routing, CSS system, UI library, state/data tools, and test commands. Add dependencies only when they solve a real problem. Prefer existing components and tokens. Extend the design system instead of bypassing it.

If greenfield and the user has not specified a stack:

- For production React apps, prefer Next.js + TypeScript + Tailwind CSS.
- For quick UI prototypes or static client apps, prefer Vite + React + TypeScript + Tailwind CSS.
- For component-heavy React UIs, prefer shadcn/ui or Radix primitives for accessible building blocks, but customize them so the result does not look like unmodified defaults.
- For server state in data-heavy apps, consider TanStack Query if the app is client-heavy and there is no existing data-fetching convention.
- For simple static pages, avoid overengineering; semantic HTML, CSS, and minimal JavaScript may be better.
- For non-React projects, use the project's native framework conventions.

Consult `references/frontend-stack-guide.md`.

# Anti-Generic Design Rule

Avoid giant centered gradient heroes with vague headlines, three identical feature cards, every section on a light gray background, blue/purple gradients everywhere, random glassmorphism, excessive rounded corners with no system, generic icons in every card, vague "streamline your workflow" copy, low-contrast gray text, dashboards made only of cards, modals for simple interactions, hover-only affordances, inaccessible icon-only controls, missing empty/error/loading states, unstyled component-library defaults, inconsistent spacing, and decorative animations that obscure usability.

Consult `references/anti-patterns.md`.

# Non-Generic Proof

Before finalizing a visually important frontend task, answer internally:

1. What about this UI is specific to this product/user?
2. What visual decision would not appear in a generic SaaS template?
3. Is the copy specific enough to identify the product category?
4. Are sections/components arranged around the user journey, or just template convention?
5. Would this still work if all icons, gradients, and decorative effects were removed?

If the answer is weak, revise before final response.

# No-Ship Quality Gates

Do not finalize visually important frontend work if any of these are true:

- The UI was not inspected in a browser or screenshot tool when available.
- Mobile and desktop layouts were not checked.
- Primary action, user goal, or main content hierarchy is unclear.
- Loading, empty, error, disabled, hover, focus-visible, and success states are missing where relevant.
- Text overflows, overlaps, truncates badly, or depends on one ideal viewport.
- Copy could describe any SaaS product.
- The screen is mostly generic cards, gradients, icons, or component-library defaults.
- Colors, spacing, radius, and shadows are scattered instead of tokenized.
- Accessibility basics are missing: labels, focus states, keyboard flow, contrast, or accessible names.

When a gate fails, revise the UI before final response. If a gate cannot be verified, state the limitation and avoid claiming production-ready completion.

# Reference Router

Use these files when relevant:

- `references/design-principles.md`: design judgment, hierarchy, UX heuristics, visual direction.
- `references/frontend-stack-guide.md`: stack, dependency, framework, and implementation decisions.
- `references/component-patterns.md`: component behavior, states, forms, tables, nav, dialogs, cards, charts.
- `references/accessibility-checklist.md`: accessibility implementation and review.
- `references/anti-patterns.md`: generic AI UI, UX, accessibility, responsive, and implementation traps.
- `references/qa-rubric.md`: final frontend QA scoring and checks.
- `references/mode-playbooks.md`: Build, Redesign, Review, Design-System, and Debug-UX workflows.
- `references/codex-tool-workflows.md`: Codex-native browser, Chrome, Playwright, GitHub, Figma, data artifact, image generation, and dev-server workflows.
- `references/page-recipes.md`: landing, dashboard, settings, pricing, checkout, auth, onboarding, data table, admin, and mobile recipes.
- `references/examples.md`: weak vs strong examples that anchor taste.

# Optional Audit Scripts

When useful, run these scripts against the project or changed files:

- `scripts/design-audit.mjs`
- `scripts/a11y-static-check.mjs`
- `scripts/token-audit.mjs`

These scripts produce heuristic warnings. They are not proof of quality. Treat them as prompts for review.

# Final Response Behavior

When finishing frontend work, report:

- what changed
- design rationale in 2-5 bullets
- accessibility, responsive, and performance checks performed
- commands run and results
- whether visual inspection was performed
- built-in Codex workflow or plugin surface used, when relevant
- inspected surface: browser, screenshot, PR, Figma, CI, artifact, or code-only
- viewport/device coverage and interaction path tested, when visual
- assumptions or follow-up improvements

Keep the final response direct and useful.

Before finalizing any frontend UI, read `references/qa-rubric.md` and check the work against it.
