export { installPrompts, createDocumentationStructure } from './installer';

// Main API for programmatic usage
export interface SDLCAgent {
  name: string;
  description: string;
  promptFile: string;
}

export const agents: SDLCAgent[] = [
  {
    name: 'Research',
    description: 'Deep research, brainstorming, knowledge organization',
    promptFile: 'research.prompt.md'
  },
  {
    name: 'Vision',
    description: 'Problem definition, user scenarios, success criteria',
    promptFile: 'vision.prompt.md'
  },
  {
    name: 'Product',
    description: 'Backlog management, epics, features, acceptance criteria',
    promptFile: 'product.prompt.md'
  },
  {
    name: 'Design',
    description: 'Architecture, sequence flows, data models, trade-offs',
    promptFile: 'design.prompt.md'
  },
  {
    name: 'Execution',
    description: 'Implementation, coding, feature development',
    promptFile: 'execution.prompt.md'
  },
  {
    name: 'QA',
    description: 'Test scenarios, quality assurance, regression testing',
    promptFile: 'qa.prompt.md'
  },
  {
    name: 'Governance',
    description: 'Traceability, compliance, audit trails, process oversight',
    promptFile: 'governance.prompt.md'
  }
];
