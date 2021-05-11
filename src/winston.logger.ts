import { createLogger, transports, format, Logger as WinstonOwnLogger, addColors } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { getNamespace } from 'cls-hooked';

import { Logger, InitOptions, LogMethod, LevelEnum, Tracing } from './logger.interface';

import { CUSTOM_LEVEL } from './logger.contants';
import { getDefaultLevel, ignoreEndpoint } from './utils';
import { isObject } from 'lodash';

class WinstonLogger implements Logger {
  logger: WinstonOwnLogger;
  tracing: Tracing;

  constructor({ fileAppender, defaultMeta, level, tracing }: InitOptions) {
    this.logger = createLogger({
      defaultMeta,
      level: level || getDefaultLevel(),
      format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })),
      levels: CUSTOM_LEVEL.levels,
    });

    addColors(CUSTOM_LEVEL.colors);
    this.tracing = tracing;
    if (fileAppender) {
      this.logger.add(
        new DailyRotateFile({
          filename: `logs/stdout.%DATE%.log`,
          maxSize: '100m', // Maximum size 100MB of the file after which it will rotate
        }),
      );
    } else {
      this.logger.add(
        new transports.Console({
          format: format.combine(
            format(ignoreEndpoint)(),
            format.colorize({ level: true }),
            format.prettyPrint(),
            format.printf(this.formatLogger),
          ),
        }),
      );
    }
  }

  formatLogger = (info: any) => {
    const { timestamp, level, message, ...rest } = info;
    const messages = [timestamp, `[${level}]`, JSON.stringify(message)];
    if (rest) {
      messages.push(JSON.stringify(rest));
    }

    return messages.join(' ');
  };

  getTransactionId = () => {
    const session = getNamespace(this.tracing.tracerSessionName);
    const transactionId = session ? session.get(this.tracing.requestId) : '';

    return transactionId;
  };

  getLoggingMessage = (meta: unknown) => {
    const requestId = this.getTransactionId();
    let message = {};
    if (
      // Grouping non object fields under meta
      isObject(meta) &&
      !(meta instanceof Error) &&
      !(meta instanceof Array)
    ) {
      message = Object.assign(meta, requestId);
    } else message = { meta, requestId };
    return message;
  };

  info: LogMethod = (message, meta) => {
    this.logger.info(message, this.getLoggingMessage(meta));
  };
  error: LogMethod = (message, meta) => {
    this.logger.error(message, this.getLoggingMessage(meta));
  };
  warn: LogMethod = (message, meta) => {
    this.logger.warn(message, this.getLoggingMessage(meta));
  };
  debug: LogMethod = (message, meta) => {
    this.logger.debug(message, this.getLoggingMessage(meta));
  };
  critical: LogMethod = (message, meta) => {
    this.logger.log(LevelEnum.critical, message, this.getLoggingMessage(meta));
  };
  onFinished = (callback: () => void) => {
    this.logger.on('finish', callback);
  };
}

export default WinstonLogger;
