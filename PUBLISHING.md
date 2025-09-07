# Publishing Guide

## Pre-publish Checklist

1. ✅ TypeScript builds without errors
2. ✅ CLI commands work correctly
3. ✅ Package.json has correct metadata
4. ✅ README.md is up to date
5. ✅ All prompt files are included
6. ✅ Documentation templates are working

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
