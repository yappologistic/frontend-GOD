# Accessibility Checklist

# Semantics

- Use headings in logical order.
- Use `button` for actions and `a` for navigation.
- Use `label`, `fieldset`, `legend`, `table`, `th`, `nav`, `main`, `aside`, and `form` where appropriate.
- Use ARIA only when semantic HTML is insufficient.

# Names And Labels

- Ensure every control has an accessible name.
- Do not use placeholder-only labels.
- Give icon-only buttons `aria-label` or `aria-labelledby`.
- Give images meaningful `alt`, empty `alt=""` only for decorative images.

# Keyboard

- Ensure all interactive elements are keyboard reachable.
- Provide visible focus states.
- Avoid positive tabindex.
- Support Enter/Space for button-like behavior.
- Ensure menus, comboboxes, tabs, dialogs, and popovers follow expected keyboard patterns.

# Focus Management

- Dialogs should move focus inside, trap focus while open, close predictably, and return focus.
- Route/page changes should not strand focus.
- Avoid autofocus unless deliberately managed.

# Contrast And Color

- Check text and control contrast.
- Do not use color as the only signal.
- Pair color states with text, icons, borders, or patterns.

# Forms

- Associate errors with fields.
- Explain required formats.
- Preserve input after validation failure.
- Do not disable paste in password fields.
- Keep errors specific and recoverable.

# Motion And Media

- Respect `prefers-reduced-motion`.
- Avoid flashing.
- Provide controls for autoplaying media.

# Touch And Responsive

- Use adequate target sizes and spacing.
- Avoid hover-only controls.
- Ensure sticky elements do not cover content.
- Test zoom, long labels, and mobile keyboards.

# Review Output

State whether accessibility was checked through browser/assistive inspection, automated/static checks, or code review only.
