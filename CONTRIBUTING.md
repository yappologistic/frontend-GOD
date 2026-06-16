# Contributing

# Philosophy

Contributions should make Codex more effective at real frontend work: clearer hierarchy, better accessibility, stronger responsive behavior, more maintainable implementation, and less generic visual output.

# Design-Principle Improvements

Propose rules that are operational. Prefer specific decision rules and examples over broad taste statements.

# Adding Examples

Add examples that compare weak and stronger output. Use concrete product domains and explain why the stronger version works.

# Improving Audit Scripts

Scripts must remain dependency-free, safe, and read-only. They should use cautious language such as "possible", "check", and "consider" because they are heuristic.

# Coding Style

- Use built-in Node modules only.
- Keep scripts understandable.
- Print clear warnings.
- Exit nonzero only for validation failures or `--fail-on-warning`.
- Do not send data over the network.

# Pull Request Checklist

- Run `npm run validate`.
- Run `npm run check:scripts`.
- Keep `SKILL.md` concise.
- Put detailed guidance in references.
- Update docs when paths, commands, or install behavior change.
- Update `CHANGELOG.md` for user-visible changes.
