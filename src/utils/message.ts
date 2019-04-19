import chalk from 'chalk';

export default class Message {
  static nodeVersionTooLow = () =>  `
      You are running Node ${process.versions.node}
      Create React Native Web App requires Node 8 or higher.
      Please update your version of Node.
  `;

  static help = () => `
  Only ${chalk.green('<project-directory>')} is required.

  ${chalk.green('If you have any problems, do not hesitate to file an issue:')}
  ${chalk.cyan('https://github.com/bartekus/reactuate-cli/issues/new')}
  `;

  static missingAppName = (n = 'app-name') => `
${chalk.red('In order to create a new project you must give it a name.')}

    Example: reactuate-cli ${n}
`;

  static step00 = (appName: string) => `⏳ Creating Yarn Workflow using global module name @${appName} ...\n`;

  static step01 = () => '✅ Created project folder.\n';

  static step02 = () => '✅ Added project files.\n';
}
