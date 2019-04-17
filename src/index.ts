export type Printer = (s: string) => void;

/**
 * Reactuate class
 */
export default class TimeReporter {
  printer: Printer;
  timerToken: any;

  constructor (printer: Printer) {
    this.printer = printer;
    this.printer(new Date().toUTCString());
  }

  start() {
    this.timerToken = setInterval(() => this.printer(new Date().toUTCString()), 500);
  }

  stop() {
    clearTimeout(this.timerToken);
  }
}
