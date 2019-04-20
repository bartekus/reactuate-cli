import commander from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

import Print from './utils/print';
import Color from './utils/color';
import Message from './utils/message';

const packageJson = require('../package.json');

const nodeVersion = process.versions.node;
const nodeVersionSplit = nodeVersion.split('.');
const nodeMajorVersion = nodeVersionSplit[0];

class Reactuate {
  static main = () => {
    if (parseInt(nodeMajorVersion, 10) < 8) {
      Print.error(Color.red(Message.nodeVersionTooLow()));
      process.exit(1);
    }

    let appName;
    new commander.Command(packageJson.name)
      .version(packageJson.version)
      .arguments('<project-directory>')
      .usage(`${Color.green('<project-directory>')}`)
      .action(name => {
        appName = name;
      })
      .on('--help', () => Print.log(Message.help()))
      .parse(process.argv);

    let isYarnAvailable;
    try {
      execSync('yarnpkg --version', { stdio: 'ignore' });
      isYarnAvailable = true;
    } catch (e) {
      isYarnAvailable = false;
    }

    if (appName) {
      Print.log(Color.cyan(Message.step00(appName)));

      fs.ensureDirSync(appName);
      fs.emptyDirSync(appName);

      Print.log(Color.cyan(Message.step01()));

      fs.copySync(path.resolve(__dirname, 'template'), appName);

      Print.log(Color.cyan(Message.step02()));

      // TODO: Implement custom file generation using plop

    } else {
      Print.error(Message.missingAppName());
      process.exit(1);
    }
  }
}

export default Reactuate.main();
