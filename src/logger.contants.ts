const IGNORE_LOG_PATH: { [key: string]: string } = {
  '/ping': '/ping',
};

const CUSTOM_LEVEL = {
  levels: {
    critical: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    critical: 'magenta',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
  },
};

export { IGNORE_LOG_PATH, CUSTOM_LEVEL };
