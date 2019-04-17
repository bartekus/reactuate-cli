import TimeReporter from './index'
import { EOL } from 'os';

const printer = (s) => console.log('The time is: ' +  s + EOL);

/**
 * TimeReporter test
 */
describe('TimeReporter test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  });

  it('TimeReporter is instantiable', () => {
    expect(new TimeReporter(printer)).toBeInstanceOf(TimeReporter)
  });
});
