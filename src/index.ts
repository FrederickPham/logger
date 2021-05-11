import WinstonLogger from './winston.logger';
import { InitOptions, Logger, LevelEnum } from './logger.interface';
import { createEventLogStream } from './logger.stream';
import BaseLogWrapper from './BaseLoggerWrapper';
// expose classes
export { createEventLogStream };

// expose methods
export const createLogger = (options: InitOptions): Logger => {
  return new WinstonLogger(options);
};

// expose types
export { InitOptions, Logger, LevelEnum };

export default { BaseLogWrapper };
