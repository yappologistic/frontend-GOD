# QA Rubric

Before finalizing frontend UI, check the work against this rubric.

# Pass Criteria

Score each category from 0-2:

- 0: missing or poor
- 1: acceptable but weak
- 2: production-quality

Categories: Product Fit, Hierarchy, States, Accessibility, Responsive, Visual Craft, Performance, and Verification.

Do not finalize below 12/16. Do not finalize with a 0 in Accessibility, Responsive, Hierarchy, or Verification.

# Review Severity Model

Use this severity model for Review Mode and frontend QA findings:

- `P0`: primary flow unusable, blank or crashing page, data loss risk, destructive action can fire accidentally, or user cannot complete the requested task.
- `P1`: accessibility blocker, mobile layout blocks task completion, primary action/data unavailable, severe overflow/overlap, broken form submission, or visible trust/security issue.
- `P2`: confusing hierarchy, missing critical state, weak keyboard support, unclear save/cancel behavior, poor responsive adaptation, misleading chart/data context, or generic UI that undermines comprehension.
- `P3`: visual polish, copy specificity, small spacing/alignment issue, token cleanup, component consistency, or non-blocking generic design pattern.

Findings should be ordered by severity and grounded in evidence from code, browser inspection, screenshots, comments, or commands.

# Product Fit

- The screen has a clear user, task, and primary action.
- Copy names concrete domain objects and outcomes.
- CTA labels describe the next product task instead of generic actions like "Get Started" or "Learn More".
- Marketing sections name the audience, product category, or user workflow clearly enough that the page could not belong to any random SaaS product.
- Dashboard metrics include useful labels, units, time ranges, denominators, or source context.
- Visual direction fits the product's trust level and usage context.
- The design contains at least one product-specific decision that is not generic SaaS decoration.

# Hierarchy

- The most important object/action is visually obvious.
- Related items are grouped.
- Secondary actions are not competing with primary actions.
- Dense views still support scanning and comparison.

# States

- Loading, empty, error, success, disabled, hover, focus-visible, and active states exist where relevant.
- Empty and error states provide recovery.
- Async actions show progress and do not cause duplicate submissions.

# Accessibility

- Semantic elements are used.
- Controls have accessible names.
- Forms have labels and useful errors.
- Focus states are visible.
- Keyboard flow works or has been reasoned through.
- Color is not the only signal.
- Motion respects reduced-motion preferences.

# Responsive

- Layout works at 320, 360, 390, 768, 1024, 1280, and 1440px by testing or reasoned review.
- Long text, dense data, empty data, and overflow are handled.
- Touch targets are usable.
- Sticky/fixed elements do not cover content.

# Visual Craft

- Spacing follows a rhythm.
- Type scale matches context.
- Radius, shadows, borders, and surfaces are consistent.
- Palette is not a default blue/purple gradient theme unless genuinely branded.
- Cards are used only where framing helps.
- Component-library defaults are customized.

# Performance

- No unnecessary dependencies were added.
- Images, fonts, scripts, and client-side JavaScript are appropriate.
- Animations are lightweight.
- Layout shift risks are addressed.

# Verification

- Real project commands were used where available.
- Browser/screenshot inspection was performed when possible.
- If visual inspection was not possible, final response states that clearly.
- Heuristic audit script warnings were reviewed when scripts were useful.
