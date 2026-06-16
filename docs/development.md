# Development

# Editing The Skill

The editable skill mirror lives in:

```text
skills/frontend-design-director/
```

Edit `SKILL.md` for core operational behavior. Keep it concise and action-oriented.

After editing the root skill mirror, sync it into the installable plugin package:

```text
plugins/frontend-design-director/skills/frontend-design-director/
```

# References

Longer guidance belongs in:

```text
skills/frontend-design-director/references/
```

Use references for checklists, page recipes, examples, accessibility guidance, and detailed playbooks. Avoid duplicating the same guidance in `SKILL.md` and references.

# Helper Scripts

Skill-local audit scripts live in:

```text
skills/frontend-design-director/scripts/
```

They must stay dependency-free and should not modify user projects.

The design audit script is intentionally heuristic. Add checks only when they catch recurring frontend quality failures, such as vague copy, overused cards, missing focus styling signals, missing reduced-motion handling, token drift, or mobile layout risks. Keep warnings actionable and avoid checks that would flag the audit scripts themselves.

# Validation

Run:

```bash
npm run validate
npm run check:scripts
```

# Testing In A Sample Frontend Repo

From a frontend project, invoke:

```text
$frontend-design-director Review this frontend for UX, accessibility, responsive behavior, design-system consistency, and generic AI design patterns.
```

Then run the skill scripts against that project:

```bash
node /path/to/frontend-GOD/skills/frontend-design-director/scripts/design-audit.mjs .
node /path/to/frontend-GOD/skills/frontend-design-director/scripts/a11y-static-check.mjs .
node /path/to/frontend-GOD/skills/frontend-design-director/scripts/token-audit.mjs .
```

# Updating Examples

Examples should show bad vs better outcomes and explain why. Prefer concrete product domains over generic SaaS phrasing.

# Avoiding SKILL.md Bloat

Keep only core workflow, routing, and mandatory rules in `SKILL.md`. Put detailed page recipes, checklists, examples, and stack-specific guidance in reference files.
