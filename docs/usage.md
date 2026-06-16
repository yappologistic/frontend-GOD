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
- practical visual QA

# What The Skill Avoids

- generic gradient SaaS templates
- vague productivity copy
- unmodified component-library defaults
- dashboards made only of equal cards
- low-contrast muted text
- missing loading/empty/error states
- desktop-only layouts
- new dependencies that do not solve a real problem
