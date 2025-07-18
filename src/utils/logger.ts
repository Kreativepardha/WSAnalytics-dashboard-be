import winston, { createLogger, format, transports, addColors } from 'winston';
import util from 'util';
import fs from 'fs';
import path from 'path';

const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  ai: 5,
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  http: 'magenta',
  debug: 'blue',
  ai: 'green',
};

addColors(logColors);

const logDir = path.resolve(__dirname, '../../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const consoleLogFormat = format.printf(({ level, message, timestamp, ...meta }) => {
  const colorizer = winston.format.colorize();
  const safeTimestamp = timestamp ?? new Date().toISOString();
  const safeMessage = typeof message === 'string' ? message : util.inspect(message, { depth: null });
  const metaString = Object.keys(meta).length ? `\nMETA: ${util.inspect(meta, { depth: null })}` : '';
  return colorizer.colorize(level, `${level.toUpperCase()} -- [${safeTimestamp}] ${safeMessage} ${metaString}`);
});

export const logger = createLogger({
  levels: customLevels,
  level: 'debug',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), consoleLogFormat),
    }),
    new transports.File({ filename: 'logs/db.log', level: 'debug' }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

declare module 'winston' {
  interface Logger {
    ai: winston.LeveledLogMethod;
  }
}
