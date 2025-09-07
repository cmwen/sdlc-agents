# Agentic SDLC with AI-in-the-Loop

This repository defines a lightweight, role-based Agentic SDLC where multiple specialized agents collaborate to deliver software with strong traceability and human oversight. Each agent is a prompt file in `.github/prompts/` and is designed to be used with AI coding tools (for example, GitHub Copilot, Claude Code, Cursor) as a working companion—not a single monolithic assistant.

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

- `sdlc-agents init` - Initialize a new project with prompts and documentation structure
- `sdlc-agents install` - Install only the prompt files
- `sdlc-agents list` - List all available agents
- `sdlc-agents --help` - Show help information

### Options

- `-p, --path <path>` - Installation path (default: `.github/prompts`)
- `-f, --force` - Overwrite existing files

## The Agents

The agents in this repo:
- Research — `.github/prompts/research.prompt.md`
- Vision — `.github/prompts/vision.prompt.md`
- Product — `.github/prompts/product.prompt.md`
- Design — `.github/prompts/design.prompt.md`
- Execution — `.github/prompts/execution.prompt.md`
- QA — `.github/prompts/qa.prompt.md`
- Governance — `.github/prompts/governance.prompt.md`

All prompts encourage agents to use tools to gather external context when helpful.

---

## Core principles

1. Human-in-the-loop: People review and approve key steps. Agents challenge assumptions and surface risks.
2. Role specialization: Each agent focuses on its domain (Vision, Product, Design, Execution, QA, Governance) and hands off clearly to the next.
3. Traceability-by-default: Every output links backward and forward across the lifecycle using Markdown docs and labels.
4. Tools for context: Agents are encouraged to use tools (for example, MCP tools or IDE-integrated actions) to research and validate decisions.

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

## Quickstart workflow

1. **Research** (optional but recommended): For complex or unfamiliar domains, start with research to gather context, explore approaches, and identify best practices.
2. Start with Vision: clarify scope and write `/docs/vision.md`.
3. Product creates `/docs/product_backlog.md` with acceptance criteria.
4. Design proposes options and documents `/docs/design.md` with trade-offs and risks.
5. Execution implements changes, updates `/docs/execution_log.md`, and tags handoff to QA.
6. QA drafts `/docs/qa_plan.md`, files bugs using labels (for example, `[QA → Execution: Bug]`).
7. Governance enforces links, highlights gaps, and prepares readiness checks.

**Research Integration**: Any agent can request research support using `[Stage → Research]` labels, and Research provides insights back using `[Research → Stage]` labels.

---

## Best practices

- Keep prompts brief but explicit; link to the relevant `/docs/*.md` artifacts in your request.
- Use the labels defined in the prompts to tag handoffs and feedback loops.
- Prefer adding context (files, diffs) to chats over long prose—let the agent read the source.
- Ask agents to compare at least two approaches when there’s ambiguity and to record trade-offs in `/docs/design.md`.
- Encourage the agent to use tools for external validation (benchmarks, API docs, security checks) and to capture references in the docs.

---

## License

MIT
