# Mode Playbooks

# Build Mode

1. Inspect the repo stack and existing UI conventions.
2. Define the internal brief: user, task, primary action, hierarchy, tone, responsive plan, components, and states.
3. Choose one visual direction and one signature motif.
4. Reuse or define tokens before component styling.
5. Build with semantic HTML and accessible primitives.
6. Add relevant states.
7. Run responsive, accessibility, performance, and visual QA.

# Build Mode Checklist

- Discovery: package manager, framework, routing, styling system, component library, tokens, existing page patterns, data/loading conventions, test scripts, and preview path.
- Preserve: project stack, design-system conventions, route structure, data contracts, auth assumptions, analytics/test IDs, and existing accessibility primitives.
- Implement: primary user flow first, then secondary states, empty/error/loading states, responsive behavior, focus-visible states, and product-specific copy.
- Verify: lint/type/build/test where available, audit scripts when useful, browser or screenshot inspection at relevant breakpoints, and the primary interaction path.
- Final response: state what was built, reused conventions, states covered, commands run, visual inspection surface, viewport coverage, and remaining limitations.

# Redesign Mode

1. Identify the current screen's user goal and failure points.
2. Preserve working product behavior and existing conventions.
3. Improve hierarchy first, then spacing, typography, surfaces, color, and motion.
4. Replace generic copy and visuals with product-specific choices.
5. Keep interaction and data contracts intact.
6. Verify responsive, accessibility, and state coverage.

# Redesign Mode Checklist

- Discovery: current user goal, primary action, existing behavior, current responsive failures, state coverage, reusable components, tokens, and product vocabulary.
- Preserve: working interactions, navigation, data shape, component APIs, analytics/test IDs, form behavior, permission checks, and copy that carries product/legal meaning.
- Improve in order: hierarchy, grouping, density, typography, spacing, state visibility, accessibility, responsive behavior, then visual polish.
- Avoid: replacing the app's design system, changing unrelated routes, hiding data/actions that users rely on, or redesigning around ideal mock data only.
- Verify: compare before/after behavior, inspect changed breakpoints, exercise the main interaction, and run checks matching the changed surface.
- Final response: identify prior failure points, what changed, behavior preserved, accessibility/responsive improvements, and visual verification status.

# Review Mode

1. Inspect implementation and, when possible, run the UI.
2. Prioritize findings by user impact: blockers, accessibility, broken responsive behavior, unclear hierarchy, missing states, generic visuals, maintainability.
3. Cite concrete files/screens/behaviors.
4. Recommend specific fixes, not vague taste preferences.
5. State whether review was visual, code-based, or both.

# Review Mode Checklist

- If the user asks for a review, audit, critique, or suggestions, do not edit files unless they explicitly ask for implementation.
- Inspect code and rendered UI when available. If only code review is possible, state that limitation.
- Lead with findings ordered by severity. Do not bury blockers under summaries or compliments.
- Cite concrete file, route, viewport, state, or interaction evidence.
- For each finding, include the user impact and a specific fix.
- Separate objective defects from subjective polish recommendations.
- Final response: findings first, open questions/assumptions second, summary last.

# Review Severity

- `P0`: primary flow is unusable, page is blank, build/runtime crash blocks the surface, data loss risk, or destructive action can fire unintentionally.
- `P1`: accessibility blocker, mobile layout blocks the task, primary action/data is unavailable, severe overflow/overlap, broken form submission, or security/trust issue visible in UI.
- `P2`: confusing hierarchy, missing loading/empty/error/disabled state, weak keyboard support, unclear save/cancel behavior, poor responsive adaptation, or misleading/incomplete data context.
- `P3`: polish, copy specificity, visual consistency, minor spacing/alignment, token cleanup, or non-blocking generic design pattern.

# Design-System Mode

1. Inventory existing tokens, components, variants, and styling conventions.
2. Define semantic tokens before raw values.
3. Create variants for real product needs, not speculative completeness.
4. Ensure components include interaction states and accessibility contracts.
5. Document usage through component APIs, examples, or local patterns already used by the repo.
6. Avoid parallel design systems.

# Design-System Mode Checklist

- Discovery: current tokens, CSS variables, Tailwind config, theme files, component variants, primitive libraries, dark mode, density rules, and usage examples.
- Create or change tokens only when they represent semantic roles, repeated values, or shared component behavior.
- Keep variants tied to real product needs. Avoid speculative completeness.
- Preserve accessibility contracts for primitives, especially focus management, keyboard behavior, labels, and ARIA relationships.
- Document usage in the local style: component examples, variant names, prop contracts, or existing docs/story patterns.
- Verify with at least one real consumer component or screen when possible.

# Debug-UX Mode

1. Reproduce or reason through the UX bug.
2. Identify whether the cause is layout, state, CSS, accessibility, routing, data, performance, or browser behavior.
3. Fix the smallest surface that preserves conventions.
4. Test the affected breakpoints, states, and interaction path.
5. Run relevant project checks and visual inspection when possible.

# Debug-UX Mode Checklist

- Reproduce the reported route, viewport, state, and interaction when possible.
- Identify the defect class: layout, state, CSS, accessibility, routing, data, performance, hydration, browser-only behavior, or asset loading.
- Fix the smallest responsible surface while preserving current behavior and design-system conventions.
- Add or update a focused test when the repo has an appropriate test surface.
- Verify the exact failing state plus one adjacent breakpoint or state that could regress.
- Final response: reproduction path, root cause, fix, commands run, and visual/browser verification status.
