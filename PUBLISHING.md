# Publishing Guide

## Version 2.0.0 - Custom Agents Refactor

**Major Changes:**
- Migrated from custom prompts (`.prompt.md`) to VS Code custom agents (`.agent.md`)
- Added handoffs for seamless workflow transitions between agents
- Updated all tooling to use `.github/agents/` instead of `.github/prompts/`
- Enhanced agent capabilities with specialized tools configuration
- Updated all documentation and examples

## Pre-publish Checklist

1. ✅ TypeScript builds without errors
2. ✅ CLI commands work correctly
3. ✅ Package.json has correct metadata and version bump
4. ✅ README.md is up to date with custom agents
5. ✅ All agent files are included in package
6. ✅ Documentation templates are working
7. ✅ USAGE.md reflects custom agents workflow
8. ✅ Test installation in clean directory works

## Publishing Steps

1. **Test the package locally:**
   ```bash
   npm link
   sdlc-agents --version
   sdlc-agents list
   ```

2. **Ensure you're logged into npm:**
   ```bash
   npm whoami
   # If not logged in:
   npm login
   ```

3. **Publish to npm:**
   ```bash
   npm publish --access public
   ```

4. **Test installation from npm:**
   ```bash
   npm unlink @cmwen/sdlc-agents  # Remove local link
   npm install -g @cmwen/sdlc-agents
   sdlc-agents --version
   ```

## Version Updates

For future updates:

```bash
# Patch version (bug fixes)
npm version patch

# Minor version (new features)
npm version minor

# Major version (breaking changes)
npm version major

# Then publish
npm publish
```

## Package Information

- **Name**: `@cmwen/sdlc-agents`
- **Binary**: `sdlc-agents`
- **Main**: `dist/index.js`
- **CLI**: `dist/cli.js`
- **Repository**: https://github.com/cmwen/sdlc-agents
