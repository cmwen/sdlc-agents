# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-11-13

### 🚀 Major Changes - Custom Agents Refactor

This is a **breaking change** that migrates the project from custom prompts to VS Code custom agents.

#### Changed
- **File Format**: Migrated from `.prompt.md` to `.agent.md` format
- **Location**: Changed default installation path from `.github/prompts/` to `.github/agents/`
- **Structure**: Added YAML frontmatter with agent metadata, tools, and handoffs
- **Workflow**: Introduced seamless handoffs between agents with pre-filled prompts

#### Added
- **Handoffs**: Each agent now includes handoff buttons to transition to related agents
- **Tool Configuration**: Agents specify their allowed tools (fetch, search, codebase, etc.)
- **Agent Metadata**: Name, description, and argument hints in YAML frontmatter
- **Enhanced Documentation**: Updated all docs to reflect custom agents usage
- **VS Code Integration**: Full support for VS Code 1.106+ custom agents feature

#### Removed
- Old `.prompt.md` files (replaced by `.agent.md`)
- Old `.github/prompts/` directory structure
- Empty JSON placeholder files

### 📦 Migration Guide

#### For Existing Users

If you're upgrading from v1.x to v2.0:

1. **Backup your existing prompts** (if you customized them):
   ```bash
   cp -r .github/prompts .github/prompts.backup
   ```

2. **Remove old prompts**:
   ```bash
   rm -rf .github/prompts
   ```

3. **Install new custom agents**:
   ```bash
   npx @cmwen/sdlc-agents@latest init --force
   ```

4. **Update your workflow**:
   - Open VS Code with GitHub Copilot
   - Access agents via the agent dropdown in Copilot Chat
   - Use handoff buttons to transition between agents

#### Key Differences

| v1.x (Prompts) | v2.0 (Custom Agents) |
|----------------|----------------------|
| `.github/prompts/` | `.github/agents/` |
| `.prompt.md` | `.agent.md` |
| Manual switching | Handoff buttons |
| No tool restrictions | Scoped tools per agent |
| Plain markdown | YAML frontmatter + markdown |

### 🎯 Benefits of Custom Agents

1. **Seamless Workflow**: Click handoff buttons to transition between stages
2. **Context Preservation**: Handoffs carry context forward automatically
3. **Specialized Tools**: Each agent has access to only relevant tools
4. **Better UX**: Native VS Code integration with agent dropdown
5. **Pre-filled Prompts**: Handoffs suggest next steps automatically

### 📚 Updated Documentation

- README.md: Complete rewrite for custom agents
- USAGE.md: Added VS Code integration guide and troubleshooting
- All agent files: Added comprehensive YAML frontmatter

### 🐛 Bug Fixes

- Fixed TypeScript compilation issues in installer
- Corrected all export statements to use new function names
- Updated package.json files list to include agents directory

---

## [1.0.0] - 2024-09-07

### Initial Release

- Seven SDLC agents as custom prompts
- CLI tool for installation
- Documentation structure generation
- Traceability labels and workflow guidance
