# SDLC Agents CLI Usage Guide

## Installation

### Global Installation (Recommended)
```bash
npm install -g @cmwen/sdlc-agents
```

### One-time Use with npx
```bash
npx @cmwen/sdlc-agents init
```

## Commands

### `sdlc-agents init`
Initialize a new project with both prompt files and documentation structure.

```bash
sdlc-agents init
# Creates:
# ├── .github/prompts/    (all 7 agent prompt files)
# └── docs/              (complete documentation structure)
```

### `sdlc-agents install`
Install only the prompt files (no documentation templates).

```bash
sdlc-agents install
# Creates only:
# └── .github/prompts/    (all 7 agent prompt files)
```

### `sdlc-agents list`
List all available agents and their descriptions.

```bash
sdlc-agents list
```

## Options

- `-p, --path <path>` - Specify installation path (default: `.github/prompts`)
- `-f, --force` - Overwrite existing files
- `-V, --version` - Show version number
- `-h, --help` - Show help information

## Examples

```bash
# Initialize with custom path
sdlc-agents init -p prompts/

# Install only prompts to custom location
sdlc-agents install -p .prompts/

# Force overwrite existing files
sdlc-agents init --force

# Check what agents are available
sdlc-agents list

# Using npx with scoped package
npx @cmwen/sdlc-agents init
```

## Next Steps After Installation

1. **Start with Vision**: Edit `docs/vision.md` to define your project scope
2. **Follow the Workflow**: Use the agents in sequence: Research → Vision → Product → Design → Execution → QA → Governance
3. **Read the Prompts**: Review the installed prompt files to understand each agent's capabilities
4. **Use with AI Tools**: Load these prompts into GitHub Copilot, Claude, Cursor, or your preferred AI coding assistant

For more information, visit: https://github.com/cmwen/sdlc-agents
