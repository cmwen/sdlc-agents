# Agentic SDLC with AI-in-the-Loop

This repository defines a lightweight, role-based Agentic SDLC where multiple specialized agents collaborate to deliver software with strong traceability and human oversight. Each agent is a prompt file in `.github/prompts/` and is designed to be used with AI coding tools (for example, GitHub Copilot, Claude Code, Cursor) as a working companion—not a single monolithic assistant.

The agents in this repo:
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

 Governance (process guardian & traceability):
    [Governance] watches all stages, flags missing links, and maintains
    /docs/governance_traceability.md; provides in-flight summaries and readiness checks.
```

Notes:
- Labels in brackets are used to tag handoffs and create an audit trail in Markdown.
- Governance coordinates handoffs and guards traceability; it is not a methodology label.

---

## Traceability map (Markdown docs)

- `/docs/vision.md` — Problem statement, user scenarios, success criteria, risks. [Vision → Product]
- `/docs/product_backlog.md` — Epics, features, acceptance criteria; linked to Vision and QA. [Product → Design]
- `/docs/design.md` — Architecture, sequence flows, data models, trade-offs; linked to backlog items and Execution notes. [Design → Execution]
- `/docs/execution_log.md` — Implemented features, linked design decisions and backlog items, suggested tests. [Execution → QA]
- `/docs/qa_plan.md` — Test scenarios mapped to acceptance criteria and design decisions; regression risks tied to execution notes. [QA → Governance]
- `/docs/governance_traceability.md` — Cross-references, gaps, and audit notes across all artifacts.

---

## Quickstart workflow

1. Start with Vision: clarify scope and write `/docs/vision.md`.
2. Product creates `/docs/product_backlog.md` with acceptance criteria.
3. Design proposes options and documents `/docs/design.md` with trade-offs and risks.
4. Execution implements changes, updates `/docs/execution_log.md`, and tags handoff to QA.
5. QA drafts `/docs/qa_plan.md`, files bugs using labels (for example, `[QA → Execution: Bug]`).
6. Governance enforces links, highlights gaps, and prepares readiness checks.

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
