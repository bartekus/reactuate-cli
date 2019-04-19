import chalk from 'chalk';
import fs from 'fs-extra';
import { mocked } from 'ts-jest/utils';
import Message from './utils/message';

let { execSync } = require('child_process');

require('../package.json');

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
jest.mock('chalk');
const mockedChalk = mocked(chalk, true);

jest.mock('fs-extra', () => {
  const ensureDirSync = jest.fn();
  const emptyDirSync = jest.fn();
  const copySync = jest.fn();

  return {
    ensureDirSync,
    emptyDirSync,
    copySync,
  };
});
jest.mock('fs-extra');
const mockedFs = mocked(fs, true);

console.log = jest.fn();
console.error = jest.fn();

describe('cli runs properly', () => {
  it('cli runs with argument and logs info', () => {
    process.argv[2] = 'myFakeName';

    // @ts-ignore
    jest.requireActual('./cli');

    expect(mockedChalk.red.mock.calls).toEqual([]);
    expect(mockedChalk.cyan.mock.calls).toEqual([[Message.step00('myFakeName')], [Message.step01()], [Message.step02()]]);

    expect(execSync.mock.calls).toEqual([['yarnpkg --version', { stdio: 'ignore' }],]);

    expect(fs.emptyDirSync.mock.calls).toEqual([['myFakeName']]);
    expect(fs.ensureDirSync.mock.calls).toEqual([['myFakeName']]);
  });
});
