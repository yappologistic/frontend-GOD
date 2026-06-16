# Frontend Stack Guide

# First Inspect The Existing Project

Before adding or changing stack choices, inspect package manager, framework, routing, component library, styling system, tokens, scripts, tests, and existing components.

Prefer the repo's conventions. Do not add dependencies just to make a small UI change.

# Stack Defaults For Greenfield Work

- Production React app: Next.js + TypeScript + Tailwind CSS.
- Quick prototype: Vite + React + TypeScript + Tailwind CSS.
- Accessible component-heavy UI: Radix primitives or shadcn/ui when appropriate, customized with product tokens.
- Simple static page: semantic HTML, CSS, and minimal JavaScript.
- Non-React app: follow the project's native framework and ecosystem.

# Dependency Rules

Add a dependency only when it meaningfully improves accessibility, correctness, maintainability, or performance. Prefer built-in platform features and existing project dependencies for small needs.

Avoid heavy animation, chart, icon, and UI libraries when the project already has a usable option. Import icons individually. Avoid huge icon packs in client bundles.

# Styling Rules

Use semantic tokens and reusable component variants. Avoid scattered raw hex, repeated arbitrary Tailwind values, inline theme styles, and one-off spacing.

If Tailwind exists, use the existing config and token conventions. If CSS modules, styled-components, vanilla CSS, or CSS variables exist, follow that approach.

# React And Next.js Rules

Keep server/client boundaries intentional. Do not make static UI client-side without need. Use framework image, font, metadata, and script features when applicable.

Avoid unnecessary global state. Keep component state local unless shared behavior demands otherwise. Use existing server-state tools before adding another.

# Forms

Use semantic labels, help text, validation, error recovery, disabled/loading states, and password-manager-friendly inputs. Follow existing form libraries if present.

# Data Views

For tables, charts, feeds, and dashboards, design for loading, empty, partial, error, filtered-empty, dense data, and long text. Use virtualization only when volume requires it.

# Testing And QA

Use real package scripts from `package.json`. Prefer lint, typecheck, test, build, story/component checks, and browser inspection when available.
