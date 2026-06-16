# Releasing

# Versioning

Use semantic versioning:

- patch for documentation, examples, and low-risk script improvements
- minor for new references, new audit checks, or expanded workflows
- major for breaking plugin structure or major skill behavior changes

# Release Checklist

1. Update `.codex-plugin/plugin.json` version.
2. Update `package.json` version.
3. Update `CHANGELOG.md`.
4. Run `npm run validate`.
5. Run `npm run check:scripts`.
6. Test install from a clean checkout.
7. Tag the release.
8. Push the tag.
9. Update marketplace ref if users should pin a new tag.

# Clean Checkout Verification

```bash
git clone https://github.com/yappologistic/frontend-GOD.git
cd frontend-GOD
npm run validate
codex plugin marketplace add ./
```
