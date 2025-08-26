# Agentic SDLC with Human-in-the-Loop

This repository explores a **lightweight Agentic SDLC methodology** designed for solo developers or small teams who want to leverage AI coding assistants (e.g., GitHub Copilot, Claude Code) as role-based agents.  

Instead of relying on one monolithic AI, this system splits responsibilities into **specialized agents** that reflect classic software development roles (Vision, Design, Implementation, QA, Release). Each agent is defined via `.prompt.md` files and can provide **insights, critiques, and clarifications** instead of passively following user instructions.

---

## ✨ Core Principles

1. **Human-in-the-Loop:**  
   AI is not left unchecked. At key stages (Vision, Design, Code Review, Release), humans provide oversight, context, and strategy.

2. **Role-based Agents:**  
   - Vision/Strategy Agent  
   - Design/Architecture Agent  
   - Implementation Agent  
   - QA/Test Agent  
   - Release/Feedback Agent  

3. **Traceability:**  
   Each agent maintains a record of decisions and rationale (in Markdown), ensuring that requirements, designs, and tests are **auditable and revisitable** when requirements change.

4. **Living Documents:**  
   All outputs (requirements.md, design.md, test-plan.md, release-notes.md) are **version-controlled in the repo** to support iteration and adjustment.

---

## 📂 Repo Structure

/agents
vision.prompt.md
design.prompt.md
implementation.prompt.md
qa.prompt.md
release.prompt.md

/docs
requirements.md
design.md
test-plan.md
release-notes.md

---

## 🚀 Workflow

1. **Start with Vision Agent**  
   - User shares a feature idea or problem.  
   - Agent challenges assumptions, clarifies unknowns, and writes `/docs/requirements.md`.  

2. **Move to Design Agent**  
   - Translates requirements into architecture and decisions.  
   - Produces `/docs/design.md`.  

3. **Implementation Agent**  
   - Generates code.  
   - Embeds traceability links back to requirements & design.  

4. **QA Agent**  
   - Creates `/docs/test-plan.md`.  
   - Ensures test cases map to requirements.  

5. **Release Agent**  
   - Summarizes changes, writes `/docs/release-notes.md`.  
   - Captures lessons learned for next iteration.  

---

## 🎯 Benefits

- **Clarity through Iteration:** Multiple rounds with Vision/Design Agents reduce misalignment.  
- **Traceability:** Clear link from requirements → design → code → test → release.  
- **Human Control:** Developers only need to focus on reviewing key artifacts, not micromanaging every step.  
- **Scalable:** Start simple (one developer + agents), expand later with team-wide usage.  

---

## 🔮 Future Direction

- MCP-based persistence (instead of only repo Markdown)  
- Agent-to-agent communication for brainstorming  
- Automated change impact analysis when requirements shift  

---

## 📖 License

MIT
