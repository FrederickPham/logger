import { IGNORE_LOG_PATH } from './logger.contants';
import { TransformFunction, TransformableInfo } from 'logform';
import { LevelEnum } from './logger.interface';
const ASYNC_MATCHER_REGEX = /(__awaiter)+/i;

const ignoreEndpoint: TransformFunction = (info: TransformableInfo): TransformableInfo | boolean => {
  if (info && info.path && (IGNORE_LOG_PATH[info.path] || info.path.endsWith('/ping'))) {
    return false;
  }
  return info;
};

const getDefaultLevel = (): LevelEnum => {
  const logLevel = process.env.LOG_LEVEL;
  if (logLevel && logLevel in LevelEnum) {
    return logLevel as LevelEnum;
  }
  switch (process.env.NODE_ENV) {
    case 'pt':
    case 'staging':
      return LevelEnum.warn;
    case 'prod':
      return LevelEnum.info;
    default:
      return LevelEnum.debug;
  }
};

const isAsync = (wrapped: (arg?: any) => void) => Boolean(wrapped.toString().match(ASYNC_MATCHER_REGEX));

export { ignoreEndpoint, getDefaultLevel, isAsync };
