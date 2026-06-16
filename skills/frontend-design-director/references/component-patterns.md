# Component Patterns

# Universal Rules

Every interactive component should account for default, hover, focus-visible, active, disabled, loading, error, empty, and success states when relevant.

Use accessible primitives and semantic elements. Do not use clickable `div`s when `button` or `a` is correct.

# Buttons And Links

Buttons perform actions. Links navigate. Icon-only controls need accessible names and tooltips when the icon is not universally clear. Disabled buttons should not hide the reason an action is unavailable.

Use one primary action per region. Secondary actions should be visibly secondary.

# Forms

Use persistent labels, help text, validation messages near fields, fieldsets for related controls, and clear save/cancel/autosave behavior. Do not rely on placeholder-only labels.

Show loading, success, and recoverable failure. Preserve user input after errors.

# Navigation

Show current location. Keep labels specific. Use breadcrumbs for deep hierarchy. Mobile nav must keep primary tasks reachable and avoid covering content.

# Cards

Use cards for repeated items or distinct framed objects, not every section. A card needs a clear object, status, action, or comparison role. Avoid identical icon-title-description card grids unless the content truly benefits from it.

# Tables

Support scan, compare, sort, filter, select, act, paginate, and recover. Keep headers visible when useful. Show active filters and reset. Make row actions keyboard accessible and not hover-only.

For mobile, preserve comparison when comparison is central. Horizontal scroll may be better than turning real tables into unrelated cards.

# Dialogs And Modals

Use dialogs for focused decisions, interruptions, and confirmations, not routine page content. Provide title, description when useful, initial focus, focus trap, escape/close behavior, and return focus.

Destructive dialogs must name the object, consequence, and recovery if any.

# Empty States

Say what is empty, why if known, and the next action. Distinguish first-use empty from filtered-empty and permission-empty.

# Loading States

Use skeletons for stable layouts, spinners for short isolated actions, progress for longer processes, and optimistic feedback only when rollback is safe.

# Error States

Explain the problem, recovery action, whether work was saved, and how to retry. Avoid vague "Something went wrong" without context.

# Charts

Charts need titles, time ranges, units, labels, legends where needed, source/context when relevant, and clear empty/error/loading states. Do not decorate data; support decisions.

# Search And Filters

Show active query/filter state, result count, no-results recovery, reset, keyboard flow, and debounced feedback when needed.
