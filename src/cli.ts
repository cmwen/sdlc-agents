#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { installAgents } from './installer';
const packageJson = require('../package.json');

const program = new Command();

program
  .name('sdlc-agents')
  .description('Install SDLC custom agents into your project')
  .version(packageJson.version);

program
  .command('install')
  .description('Install SDLC custom agents into the current project')
  .option('-p, --path <path>', 'Installation path', '.github/agents')
  .option('-f, --force', 'Overwrite existing files')
  .action(async (options: { path: string; force: boolean }) => {
    try {
      console.log(chalk.blue('🤖 Installing SDLC custom agents...'));
      await installAgents(options.path, options.force);
      console.log(chalk.green('✅ SDLC custom agents installed successfully!'));
      console.log(chalk.cyan('\nNext steps:'));
      console.log(chalk.white('1. Review the installed agents in'), chalk.yellow(options.path));
      console.log(chalk.white('2. Create the'), chalk.yellow('/docs'), chalk.white('directory structure'));
      console.log(chalk.white('3. Start with the Vision agent to define your project scope'));
      console.log(chalk.white('4. Use handoffs to transition between agents seamlessly'));
      console.log(chalk.white('\nFor more information, see:'), chalk.underline('https://github.com/cmwen/sdlc-agents'));
    } catch (error: any) {
      console.error(chalk.red('❌ Installation failed:'), error.message);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize a new project with SDLC custom agents and documentation structure')
  .option('-p, --path <path>', 'Installation path', '.github/agents')
  .option('-f, --force', 'Overwrite existing files')
  .action(async (options: { path: string; force: boolean }) => {
    try {
      console.log(chalk.blue('🚀 Initializing SDLC custom agents project...'));
      await installAgents(options.path, options.force);
      await createDocsStructure();
      console.log(chalk.green('✅ SDLC custom agents project initialized successfully!'));
      console.log(chalk.cyan('\nProject structure created:'));
      console.log(chalk.white('├── .github/agents/      '), chalk.gray('(custom agent files)'));
      console.log(chalk.white('└── docs/               '), chalk.gray('(documentation structure)'));
      console.log(chalk.white('\nNext steps:'));
      console.log(chalk.white('1. Start with the Vision agent:'), chalk.yellow('docs/vision.md'));
      console.log(chalk.white('2. Use agent handoffs to transition seamlessly between stages'));
      console.log(chalk.white('3. Follow the workflow in the README'));
    } catch (error: any) {
      console.error(chalk.red('❌ Initialization failed:'), error.message);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List available SDLC custom agents')
  .action(() => {
    console.log(chalk.blue('📋 Available SDLC Custom Agents:\n'));
    console.log(chalk.white('• Research   '), chalk.gray('- Deep research, brainstorming, knowledge organization'));
    console.log(chalk.gray('  Handoffs: → Vision, Product, Design'));
    console.log(chalk.white('\n• Vision     '), chalk.gray('- Problem definition, user scenarios, success criteria'));
    console.log(chalk.gray('  Handoffs: → Research, Product'));
    console.log(chalk.white('\n• Product    '), chalk.gray('- Backlog management, epics, features, acceptance criteria'));
    console.log(chalk.gray('  Handoffs: → Research, Design'));
    console.log(chalk.white('\n• Design     '), chalk.gray('- Architecture, sequence flows, data models, trade-offs'));
    console.log(chalk.gray('  Handoffs: → Research, Execution'));
    console.log(chalk.white('\n• Execution  '), chalk.gray('- Implementation, coding, feature development'));
    console.log(chalk.gray('  Handoffs: → Research, QA'));
    console.log(chalk.white('\n• QA         '), chalk.gray('- Test scenarios, quality assurance, regression testing'));
    console.log(chalk.gray('  Handoffs: → Research, Execution, Governance'));
    console.log(chalk.white('\n• Governance '), chalk.gray('- Traceability, compliance, audit trails, process oversight'));
    console.log(chalk.gray('  Handoffs: → Research, Vision'));
  });

async function createDocsStructure() {
  const { createDocumentationStructure } = await import('./installer');
  await createDocumentationStructure();
}

program.parse();
