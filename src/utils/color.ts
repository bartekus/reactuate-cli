import chalk from 'chalk';

export default class Color {
  static cyan = (text: string) => chalk.cyan(text);
  static green = (text: string) => chalk.green(text);
  static red = (text: string) => chalk.red(text);
}
