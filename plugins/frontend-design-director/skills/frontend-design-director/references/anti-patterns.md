# Anti-Patterns

# Generic AI UI

Avoid:

- giant centered gradient hero with vague copy
- three identical feature cards after every hero
- blue/purple gradient as the default brand
- random glassmorphism
- generic icons in every card
- "streamline your workflow", "unlock insights", "boost productivity", "powerful platform", "seamless experience"
- component-library defaults with no product-specific tokens, density, or copy

# Weak UX

Avoid:

- no primary action
- equal visual weight for everything
- hidden state or status
- unclear save/cancel behavior
- destructive actions beside normal actions
- filters with no reset
- vague errors
- no empty/loading/error states
- hover-only row actions
- modals for simple inline actions

# Accessibility Failures

Avoid:

- clickable `div`s and `span`s
- icon-only buttons without names
- missing form labels
- low-contrast muted text
- positive tabindex
- focus styles removed
- color-only status
- dialogs without title/focus behavior
- images without `alt`

# Responsive Failures

Avoid:

- fixed widths over 320px without responsive constraints
- desktop-only grids
- text overflow in buttons/cards
- sticky headers/footers covering mobile content
- dense tables pretending to be mobile-friendly without scan strategy
- tiny tap targets

# Visual Taste Failures

Avoid:

- one-note palettes
- excessive radius/shadows
- cards inside cards
- decorative animation that delays the task
- oversized hero treatment for admin/settings pages
- dashboards that only decorate data instead of supporting decisions
- charts without labels, units, or time ranges

# Implementation Failures

Avoid:

- scattered hardcoded colors
- repeated arbitrary Tailwind values
- inline styles for theme values
- adding a new UI library for one component
- importing entire icon libraries
- unnecessary client components
- layout shift from missing image dimensions
