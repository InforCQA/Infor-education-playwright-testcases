// utils/logger.js
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const path = require('path');

function getLoggerForTestClass(className) {
  const fileTransport = new transports.DailyRotateFile({
    filename: `${className}-%DATE%.log`,
    dirname: path.resolve(process.cwd(), 'logs'),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    zippedArchive: true,
    level: process.env.LOG_LEVEL || 'info',
  });

  return createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      format.printf(({ timestamp, level, message, stack }) => {
        const msg = stack || message;
        return `${timestamp} [${className}] ${level}: ${msg}`;
      })
    ),
    transports: [
      new transports.Console({ format: format.combine(format.colorize(), format.simple()) }),
      fileTransport,
    ],
    exitOnError: false,
  });
}

module.exports = { getLoggerForTestClass };
