export interface ILogInstance {
  debug: (arg: any, meta?: any) => void;
  info: (arg: any, meta?: any) => void;
  error: (arg: any, meta?: any) => void;
  warn: (arg: any, meta?: any) => void;
}

type LogMethod = (message: string, meta?: any) => void;

interface Logger {
  info: LogMethod;
  error: LogMethod;
  warn: LogMethod;
  debug: LogMethod;
  critical: LogMethod;
  onFinished(callback: () => void): void;
}

enum LevelEnum {
  critical = 'critical',
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug',
}

interface Tracing {
  tracerSessionName: string;
  requestId: string;
}

interface InitOptions {
  tracing: Tracing;
  level?: LevelEnum;
  fileAppender?: boolean;
  defaultMeta?: Record<string, any>;
}

export type IMaskConfiguration = string[] | undefined;

export { Logger, LogMethod, InitOptions, LevelEnum, Tracing };
