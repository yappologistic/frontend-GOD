# Good Frontend Design

Good frontend design is useful, clear, consistent, accessible, responsive, performant, emotionally appropriate, and maintainable.

# UX Heuristics Translated Into Frontend Behavior

- Visibility of system status: use loading states, progress, save states, current nav, active filters, optimistic/pending feedback, and clear completion feedback.
- Match the real world: use user-facing language, domain objects, familiar flows, realistic examples, and terms the audience would use.
- User control and freedom: provide undo, cancel, edit, back, close, reset filters, and safe destructive flows.
- Consistency and standards: keep component behavior, spacing, labels, icons, and keyboard patterns predictable.
- Error prevention: use constraints, previews, confirmation only for high-risk actions, input masks carefully, and disabled states with explanations.
- Recognition over recall: keep context visible with breadcrumbs, labels, selected states, table headers, and summaries.
- Flexibility and efficiency: support keyboard flow, bulk actions, saved filters, search, command patterns, and sensible defaults for repeat users.
- Minimalism: remove decorative elements that do not improve comprehension, trust, action, or brand fit.
- Error recovery: say what happened, why if known, what to do next, and whether user work was preserved.
- Help and documentation: embed concise hints where decisions happen instead of sending users elsewhere.

# Information Hierarchy

Make the primary action and primary object obvious within a few seconds. Use size, weight, contrast, position, whitespace, grouping, and order to express importance. Do not give every card, chart, and CTA the same visual weight.

For dashboards, lead with the exception, trend, decision, or work queue. For forms, lead with the user intent and required fields. For marketing pages, lead with a concrete promise and proof. For admin tools, lead with status, filters, and actions.

# Visual Direction

Choose one direction that fits the product:

- Enterprise operations: dense, calm, precise, low-drama.
- Developer tools: crisp, technical, fast, keyboard-friendly.
- Finance/health/legal: trustworthy, conservative, legible, controlled.
- Creator tools: expressive, tactile, flexible, visual.
- Consumer apps: warm, direct, forgiving, thumb-friendly.
- Luxury commerce: quiet, editorial, high contrast, restrained.

Anchor the direction with one signature motif. Do not mix unrelated motifs. Avoid decoration that cannot be explained in terms of comprehension, trust, usability, brand, or action.

# Layout And Spacing

Use a spacing rhythm rather than one-off margins. Increase density for repeat-work tools. Use generous spacing for marketing, onboarding, and reading. Group related controls tightly and separate unrelated groups clearly.

Prefer grids that support scanning. Align edges. Avoid floating islands with no relationship to each other. Keep cards for repeated items, panels, modals, or tools that truly need framing.

# Typography

Use type to clarify structure. Keep body copy readable. Do not use hero-scale type inside dense tools. Avoid negative letter spacing. Reserve all-caps for small metadata labels. Ensure line lengths are comfortable.

# Color

Use color semantically. Primary should mean action. Destructive should mean risk. Success and warning should have clear roles. Do not use color as the only state signal. Avoid low-contrast gray text and one-note palettes dominated by blue/purple gradients.

# Motion

Use motion to explain continuity, reveal state, or provide feedback. Respect `prefers-reduced-motion`. Avoid decorative motion that delays action or obscures content.

# Copy

Write specific UI copy tied to the product domain. Replace vague claims with concrete objects, actions, and outcomes. Empty, loading, and error states should explain what is happening and what the user can do next.
