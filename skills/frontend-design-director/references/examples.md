# Examples

Use these examples to distinguish generic output from product-specific design.

# Generic Vs Specific Marketing Copy

## Bad

"Boost productivity with our powerful platform. Streamline your workflow and unlock insights."

Why bad: could describe any SaaS product, has no user, no object, no proof, and a vague outcome.

## Better

"Close month-end books in 4 days instead of 12. Reconcile transactions, flag exceptions, and generate audit-ready reports from one finance workspace."

Why better: specific user context, concrete outcome, concrete product behavior, credible business value.

# Weak Vs Strong Dashboard Hierarchy

## Bad

Four equal KPI cards, three unlabeled charts, no time range, no explanation, no priority.

Why bad: user cannot tell what matters, data lacks context, and everything has equal weight.

## Better

One dominant exception summary, supporting KPIs, visible time range, trend context, prioritized work queue, and clear drill-down action.

Why better: user sees what requires attention, metrics have context, and layout supports action.

# Bad Vs Good Empty States

## Bad

"No data."

Why bad: does not explain what is empty, why, or what to do next.

## Better

"No invoices match these filters. Clear the filters or create a new invoice to start tracking payments."

Why better: explains the situation and gives recovery and creation actions.

# Bad Vs Good Form Errors

## Bad

"Invalid input."

Why bad: not specific, no recovery guidance, may blame the user.

## Better

"Enter a valid routing number. It should be 9 digits and appear on the bottom of the check."

Why better: identifies the field, explains the requirement, and gives a recovery hint.

# Generic Vs Distinctive Visual Direction

## Generic

Centered hero, blue/purple gradient blob, three cards with icons, vague CTA, gray text, rounded cards everywhere.

Why generic: no product-specific motif, no hierarchy beyond template convention, and style could belong to any SaaS.

## Better

For a finance reconciliation product: dense but calm layout, ledger-inspired grid lines, tabular numeric rhythm, restrained green accent for verified matches, exception queue as the hero object, and copy focused on closing books faster.

Why better: visual language fits the domain, motif supports comprehension, and hierarchy centers the real workflow.

# Unmodified Component-Library Output Vs Product-Specific Design

## Bad

Use default card, button, table, and dialog styling without adapting tokens, spacing, copy, or layout.

Why bad: looks like a starter template, lacks product personality, may not fit density needs, and has no visual ownership.

## Better

Use accessible primitives but customize semantic tokens, typography rhythm, density, states, content structure, product-specific empty/error/loading copy, and consistent variants.

Why better: keeps accessibility benefits, avoids generic defaults, and remains maintainable.

# Over-Designed Vs Restrained

## Bad

A settings page with animated gradient background, glass cards, floating icons, and large hero text.

Why bad: distracts from configuration, reduces readability, and mismatches task seriousness.

## Better

A quiet settings page with clear grouping, precise spacing, persistent labels, autosave state, and separated danger zone.

Why better: matches user intent, builds trust, and reduces mistakes.

# Dashboard Layouts

## Bad

Equal KPI cards, decorative charts, no date range, no exceptions, no explanation of what changed, and no obvious next action.

Why bad: the user has to interpret everything from scratch and cannot tell what deserves attention.

## Better

Lead with the highest-risk exception or most important trend, then show supporting KPIs, comparison period, confidence or data freshness, and a prioritized work queue.

Why better: the layout is organized around decisions, not dashboard decoration.

# Forms

## Bad

A long single-column form with placeholder-only labels, disabled submit button with no explanation, generic validation, and destructive cancel beside submit.

Why bad: users lose context, cannot recover from errors, and may abandon the task.

## Better

Group fields by decision, keep persistent labels, explain disabled requirements inline, validate near the field, preserve entered data, and separate destructive actions.

Why better: the form prevents mistakes and makes recovery obvious.

# Settings Pages

## Bad

Oversized page title, marketing copy, unrelated cards, hidden save behavior, no current status, and danger actions mixed with normal preferences.

Why bad: settings are repeat-use operational screens, not landing pages.

## Better

Use compact sections, current-state summaries, explicit save or autosave status, clear ownership labels, and an isolated danger zone with confirmation.

Why better: users can scan, change, verify, and safely leave.

# Landing Pages

## Bad

"Transform your workflow" headline, blue-purple gradient hero, three feature cards, generic screenshots, and repeated "Get started" CTAs.

Why bad: it has no audience, proof, product object, or distinctive reason to trust the offer.

## Better

Name the product category or offer in the headline, show the real product or outcome in the first viewport, support the claim with proof, and structure sections around the buyer's questions.

Why better: the page communicates what the product does, who it serves, and why it is credible.

# Pricing Pages

## Bad

Three identical price cards, vague plan names, hidden limits, unclear billing period, and a single highlighted plan with no rationale.

Why bad: users cannot compare tradeoffs or predict cost.

## Better

Show the billing period, plan fit, real limits, overage rules, included support, upgrade triggers, and a comparison table for details that affect purchase decisions.

Why better: pricing supports evaluation instead of forcing guesswork.

# Data Tables

## Bad

A wide table squeezed onto mobile, hover-only row actions, unlabeled numeric columns, no sorting state, and filters with no reset.

Why bad: scanning, comparison, and recovery all fail.

## Better

Use visible sort/filter state, sticky context where helpful, right-aligned numeric values with units, row actions available by keyboard and touch, and a mobile card or priority-column strategy.

Why better: the table preserves comparison on desktop and task completion on smaller screens.

# Mobile Layouts

## Bad

Desktop grids stacked blindly, tiny tap targets, sticky bars covering content, horizontal overflow, and buttons with clipped text.

Why bad: it assumes the desktop layout is the source of truth.

## Better

Prioritize the primary action and current status, use one-column task flow, keep controls at usable sizes, avoid covered content, and test long labels at 320px.

Why better: mobile becomes a designed experience rather than a collapsed desktop.
