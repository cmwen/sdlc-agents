# SDLC Custom Agents Usage Guide

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
Initialize a new project with custom agent files and documentation structure.

```bash
sdlc-agents init
# Creates:
# ├── .github/agents/     (all 7 custom agent files)
# └── docs/              (complete documentation structure)
```

### `sdlc-agents install`
Install only the custom agent files (no documentation templates).

```bash
sdlc-agents install
# Creates only:
# └── .github/agents/     (all 7 custom agent files)
```

### `sdlc-agents list`
List all available custom agents with their handoffs.

```bash
sdlc-agents list
```

## Options

- `-p, --path <path>` - Specify installation path (default: `.github/agents`)
- `-f, --force` - Overwrite existing files
- `-V, --version` - Show version number
- `-h, --help` - Show help information

## Examples

```bash
# Initialize with custom path
sdlc-agents init -p custom/agents/

# Install only agents to custom location
sdlc-agents install -p .agents/

# Force overwrite existing files
sdlc-agents init --force

# Check what agents are available with handoffs
sdlc-agents list

# Using npx with scoped package
npx @cmwen/sdlc-agents init
```

## Using Custom Agents in VS Code

### Prerequisites
- VS Code 1.106 or later
- GitHub Copilot extension enabled

### Accessing Custom Agents

1. Open GitHub Copilot Chat in VS Code (`Cmd/Ctrl+Shift+I`)
2. Click the agent dropdown (shows current agent like `@workspace`)
3. Your custom agents will appear in the list:
   - Research
   - Vision
   - Product
   - Design
   - Execution
   - QA
   - Governance

### Using Handoffs

Custom agents include handoff buttons that appear after responses:

**Example Workflow:**
1. Start with **Vision** agent → Define project scope
2. Click "Create Product Backlog" handoff → Switches to **Product** agent
3. Define features and acceptance criteria
4. Click "Design Features" handoff → Switches to **Design** agent
5. Create architecture and technical design
6. Click "Start Implementation" handoff → Switches to **Execution** agent
7. Implement the features
8. Click "Test Implementation" handoff → Switches to **QA** agent
9. Create test plans and validate
10. Click "Sign Off" handoff → Switches to **Governance** agent

**Handoff Benefits:**
- Context is automatically carried forward
- Pre-filled prompts guide the next step
- Seamless workflow transitions
- No need to manually switch agents and re-explain context

## Next Steps After Installation

1. **Verify Installation**: Check that `.github/agents/` contains 7 `.agent.md` files
2. **Open in VS Code**: Open your project in VS Code with GitHub Copilot enabled
3. **Start with Vision**: Switch to Vision agent and edit `docs/vision.md` to define your project scope
4. **Use Handoffs**: Follow the handoff workflow to transition through stages
5. **Review Agent Files**: Check the installed `.agent.md` files to understand each agent's capabilities and tools

## Troubleshooting

**Q: I don't see my custom agents in the dropdown**
- Ensure your `.agent.md` files are in `.github/agents/` folder
- Restart VS Code to pick up new agents
- Check VS Code version is 1.106 or later

**Q: Handoff buttons don't appear**
- Ensure the agent has completed its response
- Check that the target agent exists in `.github/agents/`
- Verify the agent file has proper YAML frontmatter with handoffs defined

**Q: Tools aren't working**
- Verify the tools specified in the agent's YAML frontmatter exist
- Check GitHub Copilot extension is enabled and authenticated

For more information, visit: https://github.com/cmwen/sdlc-agents
