import { ConsoleLogger } from '@nestjs/common';

export class LoggerService extends ConsoleLogger {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }

  log(message: string) {
    super.log(message + ' - ' + this.name);
  }

  error(message: string, trace: string) {
    super.error(message, trace);
  }

  warn(message: string) {
    super.warn(message);
  }

  debug(message: string) {
    super.debug(message);
  }

  verbose(message: string) {
    super.verbose(message);
  }
}
