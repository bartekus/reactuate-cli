import chalk from 'chalk';
import Message from './utils/message';

let { execSync } = require('child_process');

require('../package.json');

const originalConsoleLog = console.log;
console.log = jest.fn();

const originalConsoleError = console.error;
console.error = jest.fn();

jest.mock('child_process', () => {
  const execSync = jest.fn();

  return { execSync };
});

jest.mock('chalk', () => {
  const red = jest.fn(text => text);
  const cyan = jest.fn(text => text);
  const green = jest.fn(text => text);
  const magenta = jest.fn(text => text);

  return {
    red,
    cyan,
    green,
    magenta,
  };
});

describe('cli shows error', () => {
  it('cli runs without arguments', () => {
    const originalProcessExit = process.exit;

    // @ts-ignore
    process.exit = jest.fn();
    process.argv[2] = '';
    require('./cli');

    expect(execSync.mock.calls).toEqual([['yarnpkg --version', { stdio: 'ignore' } ]]);
    expect(console.error['mock'].calls).toEqual([[Message.missingAppName()]]);
    expect(process.exit['mock'].calls).toEqual([[1]]);

    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    process.exit = originalProcessExit;
  });
});
