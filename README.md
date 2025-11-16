# Agentic SDLC with VS Code Custom Agents

This repository defines a lightweight, role-based Agentic SDLC where multiple specialized custom agents collaborate to deliver software with strong traceability and human oversight. Each agent is defined as a VS Code custom agent file (`.agent.md`) in `.github/agents/` and includes handoffs for seamless workflow transitions. Designed to work with GitHub Copilot in VS Code as your AI-powered development companion.

## 🚀 Quick Start

Install the CLI tool globally:

```bash
npm install -g @cmwen/sdlc-agents
```

Or use with npx (no installation required):

```bash
npx @cmwen/sdlc-agents init
```

### Commands

- `sdlc-agents init` - Initialize a new project with custom agents and documentation structure
- `sdlc-agents install` - Install only the custom agent files
- `sdlc-agents list` - List all available agents with handoffs
- `sdlc-agents --help` - Show help information

### Options

- `-p, --path <path>` - Installation path (default: `.github/agents`)
- `-f, --force` - Overwrite existing files

## The Custom Agents

The custom agents in this repo:
- **Research** — `.github/agents/research.agent.md` — Conduct research, facilitate brainstorming, organize knowledge
- **Vision** — `.github/agents/vision.agent.md` — Define problem space, establish vision and goals
- **Product** — `.github/agents/product.agent.md` — Translate vision into product backlog with features
- **Design** — `.github/agents/design.agent.md` — Create technical architecture and design solutions
- **Execution** — `.github/agents/execution.agent.md` — Implement features and deliver working software
- **QA** — `.github/agents/qa.agent.md` — Validate through comprehensive testing
- **Governance** — `.github/agents/governance.agent.md` — Ensure traceability and process compliance

Each agent includes:
- **Specialized tools** for their domain (fetch, search, codebase analysis, etc.)
- **Handoffs** for seamless transitions to related agents
- **Clear responsibilities** and interaction principles
- **Traceability labels** for documentation cross-referencing

---

## Core Principles

1. **Human-in-the-loop**: People review and approve key steps. Agents challenge assumptions and surface risks.
2. **Role specialization**: Each custom agent focuses on its domain with specialized tools and instructions.
3. **Seamless handoffs**: Use agent handoffs to transition between stages with a single click.
4. **Traceability-by-default**: Every output links backward and forward across the lifecycle using Markdown docs and labels.
5. **Tools for context**: Agents use VS Code tools (fetch, search, codebase, etc.) to research and validate decisions.

---

## How the agents collaborate

Simple ASCII view of the forward flow and feedback loops:

```
                              [Research] (Knowledge & Insights)
                                   |
                                   v
                        /docs/research/index.md
                        /docs/research/topics/*.md
                        /docs/research/conversations/*.md
                                   |
     Research feeds into all stages and receives requests from any stage
                                   |
                                   v
 [Vision] --[Vision → Product]--> [Product] --[Product → Design]--> [Design]
       |                                   |                             |
       v                                   v                             v
   /docs/vision.md                  /docs/product_backlog.md       /docs/design.md

 [Design] --[Design → Execution]--> [Execution] --[Execution → QA]--> [QA]
       |                                   |                             |
       v                                   v                             v
 (design decisions)                /docs/execution_log.md         /docs/qa_plan.md

 Feedback loops:
    [QA] --[QA → Execution: Bug]--> [Execution]
    [QA] --[QA → Design: Flaw]----> [Design]
    [Any Stage] --[Stage → Research]--> [Research] --[Research → Stage]--> [Any Stage]

 Governance (process guardian & traceability):
    [Governance] watches all stages, flags missing links, and maintains
    /docs/governance_traceability.md; provides in-flight summaries and readiness checks.
```

Notes:
- Labels in brackets are used to tag handoffs and create an audit trail in Markdown.
- Governance coordinates handoffs and guards traceability; it is not a methodology label.

---

## Traceability map (Markdown docs)

- `/docs/research/index.md` — Master index of research activities, topics, and knowledge. Cross-references to all SDLC stages. [Research ↔ All Stages]
- `/docs/research/topics/*.md` — Deep-dive research on specific topics with multi-perspective analysis. [Research → Relevant Stages]
- `/docs/research/conversations/*.md` — Brainstorming sessions, learning activities, and research discussions. [Research ↔ All Stages]
- `/docs/vision.md` — Problem statement, user scenarios, success criteria, risks. [Vision → Product]
- `/docs/product_backlog.md` — Epics, features, acceptance criteria; linked to Vision and QA. [Product → Design]
- `/docs/design.md` — Architecture, sequence flows, data models, trade-offs; linked to backlog items and Execution notes. [Design → Execution]
- `/docs/execution_log.md` — Implemented features, linked design decisions and backlog items, suggested tests. [Execution → QA]
- `/docs/qa_plan.md` — Test scenarios mapped to acceptance criteria and design decisions; regression risks tied to execution notes. [QA → Governance]
- `/docs/governance_traceability.md` — Cross-references, gaps, and audit notes across all artifacts.

---

## Quickstart Workflow

### Using Handoffs for Seamless Transitions

1. **Research** (optional but recommended): Use the Research agent for complex or unfamiliar domains to gather context and explore approaches. Click handoff to Vision or Product when ready.

2. **Vision**: Switch to Vision agent, clarify scope and write `/docs/vision.md`. Use the "Create Product Backlog" handoff to transition.

3. **Product**: Creates `/docs/product_backlog.md` with acceptance criteria. Use the "Design Features" handoff to move forward.

4. **Design**: Proposes options and documents `/docs/design.md` with trade-offs. Use the "Start Implementation" handoff.

5. **Execution**: Implements changes, updates `/docs/execution_log.md`. Use the "Test Implementation" handoff to QA.

6. **QA**: Drafts `/docs/qa_plan.md`, files bugs using labels. Use the "Fix Issues" handoff to return to Execution, or "Sign Off" handoff to Governance.

7. **Governance**: Enforces links, highlights gaps, and prepares readiness checks.

**Pro Tip**: Each agent displays available handoffs as buttons after completing a response. Click them to transition with context automatically carried forward!

---

## Using Custom Agents in VS Code

### Switching Agents
1. Open GitHub Copilot Chat in VS Code
2. Click the agent dropdown (default is `@workspace`)
3. Select your custom agent (Research, Vision, Product, Design, Execution, QA, or Governance)
4. The agent's specialized tools and instructions are now active

### Using Handoffs
After an agent completes its response, handoff buttons appear at the bottom:
- Click a handoff button to switch to the next agent with pre-filled context
- The workflow guides you through the SDLC stages seamlessly
- Example: Vision → Product → Design → Execution → QA → Governance

## Best Practices

- **Use handoffs** to transition between stages - they carry context forward automatically
- **Keep requests focused** on the agent's domain for best results
- **Use the labels** defined in the agents to tag handoffs and feedback loops
- **Prefer adding context** (files, diffs) to chats over long prose—let the agent read the source
- **Ask agents to compare approaches** when there's ambiguity and to record trade-offs in `/docs/design.md`
- **Leverage tools**: Agents use #tool:fetch, #tool:search, #tool:githubRepo for validation and research

---

## License

MIT
