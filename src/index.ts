export { installAgents, createDocumentationStructure } from './installer';

// Main API for programmatic usage
export interface SDLCAgent {
  name: string;
  description: string;
  agentFile: string;
  handoffs: string[];
}

export const agents: SDLCAgent[] = [
  {
    name: 'Research',
    description: 'Conduct deep research, facilitate brainstorming, and organize knowledge',
    agentFile: 'research.agent.md',
    handoffs: ['vision', 'product', 'design']
  },
  {
    name: 'Vision',
    description: 'Define problem space, establish vision, and set project goals',
    agentFile: 'vision.agent.md',
    handoffs: ['research', 'product']
  },
  {
    name: 'Product',
    description: 'Translate vision into product backlog with features and acceptance criteria',
    agentFile: 'product.agent.md',
    handoffs: ['research', 'design']
  },
  {
    name: 'Design',
    description: 'Create technical architecture, design solutions, and document trade-offs',
    agentFile: 'design.agent.md',
    handoffs: ['research', 'execution']
  },
  {
    name: 'Execution',
    description: 'Implement features, write code, and deliver working software',
    agentFile: 'execution.agent.md',
    handoffs: ['research', 'qa']
  },
  {
    name: 'QA',
    description: 'Validate requirements, design, and implementation through comprehensive testing',
    agentFile: 'qa.agent.md',
    handoffs: ['research', 'execution', 'governance']
  },
  {
    name: 'Governance',
    description: 'Ensure traceability, maintain process compliance, and provide lifecycle oversight',
    agentFile: 'governance.agent.md',
    handoffs: ['research', 'vision']
  }
];
