# Usage

# Explicit Invocation

Use:

```text
$frontend-design-director
```

# Implicit Invocation

Codex may use the skill when a request involves frontend UI/UX, React, Next.js, Vite, landing pages, dashboards, forms, design systems, accessibility, responsive layouts, visual hierarchy, or visual QA.

Examples:

- "Redesign this dashboard so it feels production-grade."
- "Review this UI for accessibility and responsive issues."
- "Build a polished onboarding flow using the existing stack."
- "Fix the mobile layout and focus states on this form."

# Best Test Prompt

```text
$frontend-design-director Redesign this dashboard so it feels like a polished, production-grade analytics product. Improve hierarchy, spacing, responsiveness, accessibility, loading/empty/error states, and avoid generic AI-template visuals. Inspect the existing stack first and do not add unnecessary dependencies.
```

# Mode Examples

Build Mode:

```text
$frontend-design-director Build a production-quality settings page using the existing project stack and design conventions.
```

Redesign Mode:

```text
$frontend-design-director Redesign this pricing page to improve trust, plan comparison, accessibility, and mobile layout.
```

Review Mode:

```text
$frontend-design-director Review this frontend for UX, accessibility, responsive layout, design-system consistency, and generic AI-design anti-patterns.
```

Design-System Mode:

```text
$frontend-design-director Create semantic tokens and button/input variants that match the existing component architecture.
```

Debug-UX Mode:

```text
$frontend-design-director Fix the table overflow, hover-only actions, missing keyboard behavior, and broken mobile filters.
```

# What The Skill Should Improve

- product-specific visual direction
- clear hierarchy and primary actions
- accessible semantics and focus behavior
- responsive behavior across mobile, tablet, laptop, and desktop
- loading, empty, error, success, disabled, hover, focus, and active states
- design-system consistency
- practical visual QA through the best available Codex surface

# Codex Workflow Pairings

The skill should cooperate with built-in Codex workflows and installed plugins:

- Use the in-app browser or Browser use for local development servers, file-backed previews, public unauthenticated pages, screenshots, responsive checks, and interaction verification.
- Use Chrome workflows when the page needs signed-in browser state, extensions, an existing Chrome profile, console/network inspection, computed styles, or performance profiling.
- Use Playwright-style browser automation when repeatable screenshots or interaction checks are available.
- Use shadcn/Radix workflows when the project already uses shadcn/ui, Radix primitives, or a registry-based component setup.
- Use GitHub workflows for PR comments, CI failures, issues, reviews, or publishing.
- Use Figma/product-design workflows only when the user references a design artifact or asks for design generation or design-to-code work.
- Use data analytics workflows when dashboards or reports must be source-backed.
- Use image generation only when the frontend needs a real visual asset and no existing product asset fits.

When a more specific workflow applies, this skill should handle frontend quality while the specialized workflow owns its domain.

When the user leaves Codex browser comments on a rendered page, the skill should map each comment to the affected route, component, viewport, or interaction; patch the commented issue directly; re-check the route; and report which comments were addressed.

# Quality Gates

For visually important frontend work, the skill should not treat the job as complete until it has checked mobile and desktop behavior, inspected or critiqued the UI, revised the weakest issues, and passed the QA rubric. Preferred viewport targets are `1440x900`, `1280x800`, `768x1024`, `390x844`, and `320x640` when browser or screenshot verification is available. The rubric scores Product Fit, Hierarchy, States, Accessibility, Responsive, Visual Craft, Performance, and Verification from 0-2, with a minimum passing score of 12/16.

If visual inspection is not available, the final response should say the review was code-based only and avoid claiming browser-verified quality.

Review findings should use the `P0`-`P3` severity model in `references/qa-rubric.md` and `references/mode-playbooks.md`.

# Audit Script Options

The bundled audit scripts support both human-readable and JSON output:

```bash
npm run audit:design -- /path/to/frontend --json
npm run audit:a11y -- /path/to/frontend --min-severity medium
npm run audit:tokens -- /path/to/frontend --fail-on high
```

Use JSON output when Codex needs to parse and summarize warnings. Use `--fail-on high` or `--fail-on medium` for CI-like checks. Treat all warnings as heuristic prompts for review, not automatic proof of failure.

The design audit includes product-specificity checks for vague CTA labels, generic SaaS phrases, broad feature sections, missing product nouns, missing user-role context, repeated icon/title/description feature cards, and dashboard metrics without units or useful labels.

# What The Skill Avoids

- generic gradient SaaS templates
- vague productivity copy
- unmodified component-library defaults
- dashboards made only of equal cards
- low-contrast muted text
- missing loading/empty/error states
- desktop-only layouts
- new dependencies that do not solve a real problem
