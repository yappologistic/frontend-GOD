# Troubleshooting

# Skill Does Not Appear

Restart Codex after installing or updating the plugin. Start a new thread so skill metadata is reloaded.

# Plugin Does Not Appear

Run:

```bash
codex plugin marketplace list
```

Confirm the marketplace was added and points to this repository.

Then check whether the plugin is listed:

```bash
codex plugin list
```

The marketplace entry should point to `./plugins/frontend-design-director`. If it points to the repository root or `../..`, Codex may ignore it.

# Marketplace Not Found

Re-add the marketplace:

```bash
codex plugin marketplace add yappologistic/frontend-GOD
```

For local development:

```bash
codex plugin marketplace add ./
```

# Stale Cached Plugin

Restart Codex and reinstall from the marketplace if needed. Use a new thread after reinstalling.

# Node Scripts Do Not Run

Confirm Node.js is installed:

```bash
node --version
```

The scripts use only built-in Node modules and do not require `npm install`.

# Permission Issues

Check file permissions and whether the target directory is inside a protected location. On Windows, run from a normal writable workspace.

# Explicit Invocation For Testing

Implicit invocation depends on metadata and context. For testing, prefer:

```text
$frontend-design-director
```
