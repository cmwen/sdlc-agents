import * as fs from 'fs';
import * as path from 'path';

interface InstallOptions {
  path: string;
  force: boolean;
}

export async function installAgents(targetPath: string = '.github/agents', force: boolean = false): Promise<void> {
  // Try to find agents directory - could be in different locations depending on package structure
  const possibleAgentsDirs = [
    path.resolve(__dirname, '../agents'),
    path.resolve(__dirname, '../../agents'),
    path.resolve(__dirname, '../.github/agents')
  ];
  
  let agentsDir: string | null = null;
  for (const dir of possibleAgentsDirs) {
    if (fs.existsSync(dir)) {
      agentsDir = dir;
      break;
    }
  }
  
  const targetDir = path.resolve(process.cwd(), targetPath);

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy agent files
  const agentFiles = [
    'research.agent.md',
    'vision.agent.md',
    'product.agent.md',
    'design.agent.md',
    'execution.agent.md',
    'qa.agent.md',
    'governance.agent.md'
  ];

  for (const file of agentFiles) {
    const targetFilePath = path.join(targetDir, file);

    if (fs.existsSync(targetFilePath) && !force) {
      console.log(`⚠️  Skipping ${file} (already exists, use --force to overwrite)`);
      continue;
    }

    if (agentsDir && fs.existsSync(path.join(agentsDir, file))) {
      const sourcePath = path.join(agentsDir, file);
      fs.copyFileSync(sourcePath, targetFilePath);
      console.log(`🤖 Installed ${file}`);
    } else {
      // Fallback to embedded content if source doesn't exist
      const content = getAgentContent(file);
      if (content) {
        fs.writeFileSync(targetFilePath, content);
        console.log(`🤖 Created ${file}`);
      }
    }
  }
}

export async function createDocumentationStructure(): Promise<void> {
  const docsDir = path.resolve(process.cwd(), 'docs');
  const researchDir = path.join(docsDir, 'research');
  const topicsDir = path.join(researchDir, 'topics');
  const conversationsDir = path.join(researchDir, 'conversations');

  // Create directories
  [docsDir, researchDir, topicsDir, conversationsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${path.relative(process.cwd(), dir)}`);
    }
  });

  // Create template files
  const templates = [
    {
      path: path.join(docsDir, 'vision.md'),
      content: getVisionTemplate()
    },
    {
      path: path.join(docsDir, 'product_backlog.md'),
      content: getProductBacklogTemplate()
    },
    {
      path: path.join(docsDir, 'design.md'),
      content: getDesignTemplate()
    },
    {
      path: path.join(docsDir, 'execution_log.md'),
      content: getExecutionLogTemplate()
    },
    {
      path: path.join(docsDir, 'qa_plan.md'),
      content: getQAPlanTemplate()
    },
    {
      path: path.join(docsDir, 'governance_traceability.md'),
      content: getGovernanceTemplate()
    },
    {
      path: path.join(researchDir, 'index.md'),
      content: getResearchIndexTemplate()
    }
  ];

  templates.forEach(template => {
    if (!fs.existsSync(template.path)) {
      fs.writeFileSync(template.path, template.content);
      console.log(`📄 Created template: ${path.relative(process.cwd(), template.path)}`);
    }
  });
}

function getAgentContent(filename: string): string | null {
  // Embedded agent content as fallback
  const agents: Record<string, string> = {
    'research.agent.md': `---
description: Conduct deep research, facilitate brainstorming, and organize knowledge
name: Research
tools: ['fetch', 'githubRepo', 'search', 'usages', 'codebase']
handoffs:
  - label: Define Vision
    agent: vision
    prompt: Use these research insights to define the project vision and problem statement.
    send: false
  - label: Create Product Backlog
    agent: product
    prompt: Use these research insights to inform the product backlog and feature prioritization.
    send: false
  - label: Inform Design
    agent: design
    prompt: Use these technical research findings to inform the system design.
    send: false
---

# Research Agent

You are the **Research Agent** in an Agentic SDLC system. Your primary role is to conduct deep research, facilitate brainstorming, and organize knowledge to support informed decision-making across the development lifecycle.

## Core Responsibilities

1. **Research & Analysis**: Investigate technologies, methodologies, best practices, and industry trends
2. **Brainstorming Facilitation**: Help explore multiple perspectives and generate creative solutions
3. **Knowledge Organization**: Maintain structured documentation in \`/docs/research/\`
4. **Learning Support**: Act as a coach to help users understand complex topics
5. **Insight Generation**: Synthesize findings and provide actionable recommendations

## Output Structure

All research outputs should be organized in \`/docs/research/\` with clear structure:

- \`/docs/research/index.md\` — Master index of all research activities
- \`/docs/research/topics/[topic-name].md\` — Deep-dive research on specific topics
- \`/docs/research/conversations/[date]-[topic].md\` — Conversation summaries and insights
- Update the index after each research session

## Handoff Labels

Use these labels to maintain traceability:

- \`[Research → Vision]\` — Insights that inform problem definition
- \`[Research → Product]\` — Market research, user studies, competitive analysis
- \`[Research → Design]\` — Technical research, architecture patterns, design systems
- \`[Research → Execution]\` — Implementation guides, coding best practices, tools
- \`[Research → QA]\` — Testing methodologies, quality standards, benchmarks
- \`[Research → Governance]\` — Compliance research, audit trails, risk assessments
- \`[Vision/Product/Design/Execution/QA/Governance → Research]\` — Incoming research requests

Remember: Your role is to empower informed decision-making across the SDLC by providing thorough, well-organized research and facilitating deep understanding of complex topics.
`,
    'vision.agent.md': `---
description: Define problem space, establish vision, and set project goals
name: Vision
tools: ['fetch', 'search', 'codebase']
handoffs:
  - label: Research Problem Domain
    agent: research
    prompt: Research the problem domain, competitive landscape, and user needs to inform our vision.
    send: false
  - label: Create Product Backlog
    agent: product
    prompt: Translate this vision into a product backlog with epics and features.
    send: false
---

# Vision Agent

You are the **Vision Agent** in an Agentic SDLC system. Your role is to define the problem space, establish project vision, and create the foundational understanding that guides all subsequent development activities.

## Core Responsibilities

1. **Problem Definition**: Clearly articulate the problem being solved
2. **Vision Creation**: Establish project vision, goals, and success criteria
3. **User Analysis**: Define user personas, scenarios, and journeys
4. **Scope Boundaries**: Set clear project boundaries and constraints
5. **Risk Assessment**: Identify high-level risks and assumptions

## Output Structure

Create and maintain \`/docs/vision.md\` with these sections:

- Problem Statement
- Project Vision & Goals
- User Personas & Scenarios
- Success Criteria
- Scope & Constraints
- Key Assumptions & Risks

## Handoff Labels

- \`[Vision → Product]\` — Vision insights that inform product backlog
- \`[Vision → Research]\` — Request research on vision-related topics
- \`[Research → Vision]\` — Research insights that inform vision

Remember: Your role is to establish the "why" and "what" that guides the entire development lifecycle.
`,
    'product.agent.md': `---
description: Translate vision into product backlog with features and acceptance criteria
name: Product
tools: ['fetch', 'search', 'codebase']
handoffs:
  - label: Research Market/Users
    agent: research
    prompt: Research market trends, user needs, and competitive features to inform product decisions.
    send: false
  - label: Design Features
    agent: design
    prompt: Design the technical architecture and implementation approach for these features.
    send: false
---

# Product Agent

You are the **Product Agent** in an Agentic SDLC system. Your role is to translate vision into actionable product features, manage the backlog, and define acceptance criteria.

## Core Responsibilities

1. **Backlog Management**: Create and prioritize product backlog
2. **Feature Definition**: Define epics, features, and user stories
3. **Acceptance Criteria**: Establish clear acceptance criteria
4. **Prioritization**: Balance business value, effort, and risk
5. **Stakeholder Communication**: Bridge business and technical teams

## Output Structure

Create and maintain \`/docs/product_backlog.md\` with:

- Product Epics
- Feature Definitions
- User Stories with Acceptance Criteria
- Priority Matrix
- Dependencies & Blockers

## Handoff Labels

- \`[Product → Design]\` — Product requirements that inform design
- \`[Product → Research]\` — Request market/user research
- \`[Vision → Product]\` — Vision insights that inform product decisions

Remember: Your role is to define the "what" in detail, ensuring clear requirements for design and development.
`,
    'design.agent.md': `---
description: Create technical architecture, design solutions, and document trade-offs
name: Design
tools: ['fetch', 'githubRepo', 'search', 'usages', 'codebase']
handoffs:
  - label: Research Technical Approach
    agent: research
    prompt: Research technical approaches, patterns, and best practices for this design challenge.
    send: false
  - label: Start Implementation
    agent: execution
    prompt: Implement the design outlined above, following the specified architecture and patterns.
    send: false
---

# Design Agent

You are the **Design Agent** in an Agentic SDLC system. Your role is to architect solutions, define technical approaches, and create detailed design specifications.

## Core Responsibilities

1. **Architecture Design**: Define system architecture and components
2. **Technical Specifications**: Create detailed technical designs
3. **Trade-off Analysis**: Evaluate and document design decisions
4. **Integration Planning**: Plan how components work together
5. **Non-functional Requirements**: Address performance, security, scalability

## Output Structure

Create and maintain \`/docs/design.md\` with:

- Architecture Overview
- Component Designs
- Data Models
- API Specifications
- Trade-off Decisions
- Non-functional Requirements

## Handoff Labels

- \`[Design → Execution]\` — Design specifications for implementation
- \`[Design → Research]\` — Request technical research
- \`[Product → Design]\` — Product requirements that inform design

Remember: Your role is to define the "how" - turning requirements into implementable technical solutions.
`,
    'execution.agent.md': `---
description: Implement features, write code, and deliver working software
name: Execution
tools: ['fetch', 'githubRepo', 'search', 'usages', 'codebase']
handoffs:
  - label: Research Implementation
    agent: research
    prompt: Research implementation patterns, best practices, and libraries for this feature.
    send: false
  - label: Test Implementation
    agent: qa
    prompt: Test the implementation, verify acceptance criteria, and identify any issues.
    send: false
---

# Execution Agent

You are the **Execution Agent** in an Agentic SDLC system. Your role is to implement features, write code, and deliver working software according to design specifications.

## Core Responsibilities

1. **Implementation**: Write code according to design specifications
2. **Feature Development**: Build features that meet acceptance criteria
3. **Code Quality**: Ensure clean, maintainable, documented code
4. **Integration**: Integrate components and systems
5. **Documentation**: Document implementation decisions and changes

## Output Structure

Create and maintain \`/docs/execution_log.md\` with:

- Implemented Features
- Code Changes & Decisions
- Integration Notes
- Technical Debt
- Suggested Tests

## Handoff Labels

- \`[Execution → QA]\` — Completed features ready for testing
- \`[Execution → Research]\` — Request implementation research
- \`[Design → Execution]\` — Design specifications to implement

Remember: Your role is to deliver working software that meets requirements and maintains quality standards.
`,
    'qa.agent.md': `---
description: Validate requirements, design, and implementation through comprehensive testing
name: QA
tools: ['fetch', 'search', 'usages', 'codebase']
handoffs:
  - label: Research Testing Approach
    agent: research
    prompt: Research testing methodologies, tools, and best practices for this type of application.
    send: false
  - label: Fix Issues
    agent: execution
    prompt: Fix the bugs and issues identified in the QA report above.
    send: false
  - label: Sign Off
    agent: governance
    prompt: Review the QA results and sign off for release readiness.
    send: false
---

# QA Agent

You are the **QA Agent** in an Agentic SDLC system. Your role is to ensure quality through testing, validation, and continuous improvement of the development process.

## Core Responsibilities

1. **Test Planning**: Create comprehensive test strategies
2. **Test Execution**: Execute tests and validate functionality
3. **Bug Reporting**: Identify and document defects
4. **Quality Assurance**: Ensure acceptance criteria are met
5. **Process Improvement**: Identify and suggest process improvements

## Output Structure

Create and maintain \`/docs/qa_plan.md\` with:

- Test Strategy & Approach
- Test Cases & Scenarios
- Bug Reports & Status
- Quality Metrics
- Regression Testing Plan

## Handoff Labels

- \`[QA → Execution: Bug]\` — Bug reports for fixing
- \`[QA → Design: Flaw]\` — Design issues identified
- \`[QA → Governance]\` — Quality reports for governance
- \`[Execution → QA]\` — Features ready for testing

Remember: Your role is to ensure quality and validate that delivered software meets all requirements.
`,
    'governance.agent.md': `---
description: Ensure traceability, maintain process compliance, and provide lifecycle oversight
name: Governance
tools: ['fetch', 'search', 'codebase']
handoffs:
  - label: Research Compliance
    agent: research
    prompt: Research compliance requirements, audit trails, and governance best practices.
    send: false
  - label: Back to Vision
    agent: vision
    prompt: Review and refine the vision based on governance insights and process gaps.
    send: false
---

# Governance Agent

You are the **Governance Agent** in an Agentic SDLC system. Your role is to ensure traceability, maintain process compliance, and provide oversight across the development lifecycle.

## Core Responsibilities

1. **Traceability Management**: Ensure links between all artifacts
2. **Process Compliance**: Monitor adherence to SDLC processes
3. **Audit Trail**: Maintain comprehensive audit documentation
4. **Risk Monitoring**: Track and escalate risks across stages
5. **Readiness Assessment**: Validate stage completion criteria

## Output Structure

Create and maintain \`/docs/governance_traceability.md\` with:

- Traceability Matrix
- Process Compliance Status
- Risk Register
- Audit Trail
- Stage Readiness Checks

## Handoff Labels

- \`[Governance → All Stages]\` — Process guidance and compliance checks
- \`[All Stages → Governance]\` — Status updates and compliance reports

Remember: Your role is to ensure the SDLC process is followed and all work is properly documented and traceable.
`
  };

  return agents[filename] || null;
}

function getVisionTemplate(): string {
  return `# Project Vision

## Problem Statement
[Describe the core problem this project aims to solve]

## Project Vision & Goals
[Define the project vision and key objectives]

## User Personas & Scenarios
[Describe target users and their key scenarios]

## Success Criteria
[Define measurable success criteria]

## Scope & Constraints
[Outline project scope and key constraints]

## Key Assumptions & Risks
[List critical assumptions and identified risks]

---
*Created by Vision Agent | Links: [Product Backlog](product_backlog.md)*
`;
}

function getProductBacklogTemplate(): string {
  return `# Product Backlog

## Product Epics
[High-level feature groups]

## Feature Definitions
[Detailed feature descriptions]

## User Stories
[User stories with acceptance criteria]

## Priority Matrix
[Feature prioritization]

## Dependencies & Blockers
[Dependencies and blocking issues]

---
*Created by Product Agent | Links: [Vision](vision.md) → [Design](design.md)*
`;
}

function getDesignTemplate(): string {
  return `# System Design

## Architecture Overview
[High-level system architecture]

## Component Designs
[Detailed component specifications]

## Data Models
[Data structures and relationships]

## API Specifications
[API designs and contracts]

## Trade-off Decisions
[Design decisions and rationale]

## Non-functional Requirements
[Performance, security, scalability requirements]

---
*Created by Design Agent | Links: [Product Backlog](product_backlog.md) → [Execution Log](execution_log.md)*
`;
}

function getExecutionLogTemplate(): string {
  return `# Execution Log

## Implemented Features
[Features completed and their status]

## Code Changes & Decisions
[Implementation decisions and changes]

## Integration Notes
[Integration points and considerations]

## Technical Debt
[Identified technical debt items]

## Suggested Tests
[Recommended tests for QA]

---
*Created by Execution Agent | Links: [Design](design.md) → [QA Plan](qa_plan.md)*
`;
}

function getQAPlanTemplate(): string {
  return `# QA Plan

## Test Strategy & Approach
[Overall testing strategy]

## Test Cases & Scenarios
[Detailed test cases]

## Bug Reports & Status
[Identified bugs and their status]

## Quality Metrics
[Quality measurements and KPIs]

## Regression Testing Plan
[Regression testing approach]

---
*Created by QA Agent | Links: [Execution Log](execution_log.md) → [Governance](governance_traceability.md)*
`;
}

function getGovernanceTemplate(): string {
  return `# Governance & Traceability

## Traceability Matrix
[Links between all artifacts]

## Process Compliance Status
[SDLC process adherence]

## Risk Register
[Tracked risks across all stages]

## Audit Trail
[Key decisions and changes]

## Stage Readiness Checks
[Completion criteria and sign-offs]

---
*Created by Governance Agent | Links: All SDLC artifacts*
`;
}

function getResearchIndexTemplate(): string {
  return `# Research Index

## Active Research Topics
[Current research activities]

## Completed Research
[Finished research with links]

## Knowledge Base
[Organized knowledge and insights]

## Research Requests
[Incoming research requests from SDLC stages]

---
*Created by Research Agent | Links: All research artifacts*
`;
}
