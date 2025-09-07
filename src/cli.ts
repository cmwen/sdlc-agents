#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { installPrompts } from './installer';
const packageJson = require('../package.json');

const program = new Command();

program
  .name('sdlc-agents')
  .description('Install SDLC agent prompts into your project')
  .version(packageJson.version);

program
  .command('install')
  .description('Install SDLC agent prompts into the current project')
  .option('-p, --path <path>', 'Installation path', '.github/prompts')
  .option('-f, --force', 'Overwrite existing files')
  .action(async (options: { path: string; force: boolean }) => {
    try {
      console.log(chalk.blue('🤖 Installing SDLC Agent prompts...'));
      await installPrompts(options.path, options.force);
      console.log(chalk.green('✅ SDLC Agent prompts installed successfully!'));
      console.log(chalk.cyan('\nNext steps:'));
      console.log(chalk.white('1. Review the installed prompts in'), chalk.yellow(options.path));
      console.log(chalk.white('2. Create the'), chalk.yellow('/docs'), chalk.white('directory structure'));
      console.log(chalk.white('3. Start with the Vision agent to define your project scope'));
      console.log(chalk.white('\nFor more information, see:'), chalk.underline('https://github.com/cmwen/sdlc-agents'));
    } catch (error: any) {
      console.error(chalk.red('❌ Installation failed:'), error.message);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize a new project with SDLC agents and documentation structure')
  .option('-p, --path <path>', 'Installation path', '.github/prompts')
  .option('-f, --force', 'Overwrite existing files')
  .action(async (options: { path: string; force: boolean }) => {
    try {
      console.log(chalk.blue('🚀 Initializing SDLC Agent project...'));
      await installPrompts(options.path, options.force);
      await createDocsStructure();
      console.log(chalk.green('✅ SDLC Agent project initialized successfully!'));
      console.log(chalk.cyan('\nProject structure created:'));
      console.log(chalk.white('├── .github/prompts/     '), chalk.gray('(agent prompt files)'));
      console.log(chalk.white('└── docs/               '), chalk.gray('(documentation structure)'));
      console.log(chalk.white('\nNext steps:'));
      console.log(chalk.white('1. Start with the Vision agent:'), chalk.yellow('docs/vision.md'));
      console.log(chalk.white('2. Follow the workflow in the README'));
    } catch (error: any) {
      console.error(chalk.red('❌ Initialization failed:'), error.message);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List available SDLC agent prompts')
  .action(() => {
    console.log(chalk.blue('📋 Available SDLC Agents:'));
    console.log(chalk.white('• Research   '), chalk.gray('- Deep research, brainstorming, knowledge organization'));
    console.log(chalk.white('• Vision     '), chalk.gray('- Problem definition, user scenarios, success criteria'));
    console.log(chalk.white('• Product    '), chalk.gray('- Backlog management, epics, features, acceptance criteria'));
    console.log(chalk.white('• Design     '), chalk.gray('- Architecture, sequence flows, data models, trade-offs'));
    console.log(chalk.white('• Execution  '), chalk.gray('- Implementation, coding, feature development'));
    console.log(chalk.white('• QA         '), chalk.gray('- Test scenarios, quality assurance, regression testing'));
    console.log(chalk.white('• Governance '), chalk.gray('- Traceability, compliance, audit trails, process oversight'));
  });

async function createDocsStructure() {
  const { createDocumentationStructure } = await import('./installer');
  await createDocumentationStructure();
}

program.parse();
