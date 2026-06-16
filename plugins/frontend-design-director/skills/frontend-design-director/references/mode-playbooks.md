# Mode Playbooks

# Build Mode

1. Inspect the repo stack and existing UI conventions.
2. Define the internal brief: user, task, primary action, hierarchy, tone, responsive plan, components, and states.
3. Choose one visual direction and one signature motif.
4. Reuse or define tokens before component styling.
5. Build with semantic HTML and accessible primitives.
6. Add relevant states.
7. Run responsive, accessibility, performance, and visual QA.

# Redesign Mode

1. Identify the current screen's user goal and failure points.
2. Preserve working product behavior and existing conventions.
3. Improve hierarchy first, then spacing, typography, surfaces, color, and motion.
4. Replace generic copy and visuals with product-specific choices.
5. Keep interaction and data contracts intact.
6. Verify responsive, accessibility, and state coverage.

# Review Mode

1. Inspect implementation and, when possible, run the UI.
2. Prioritize findings by user impact: blockers, accessibility, broken responsive behavior, unclear hierarchy, missing states, generic visuals, maintainability.
3. Cite concrete files/screens/behaviors.
4. Recommend specific fixes, not vague taste preferences.
5. State whether review was visual, code-based, or both.

# Design-System Mode

1. Inventory existing tokens, components, variants, and styling conventions.
2. Define semantic tokens before raw values.
3. Create variants for real product needs, not speculative completeness.
4. Ensure components include interaction states and accessibility contracts.
5. Document usage through component APIs, examples, or local patterns already used by the repo.
6. Avoid parallel design systems.

# Debug-UX Mode

1. Reproduce or reason through the UX bug.
2. Identify whether the cause is layout, state, CSS, accessibility, routing, data, performance, or browser behavior.
3. Fix the smallest surface that preserves conventions.
4. Test the affected breakpoints, states, and interaction path.
5. Run relevant project checks and visual inspection when possible.
