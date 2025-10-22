import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';

/**
 * Creates a shared logger for a given test suite/class
 * @param {string} testClassName - used in log file name
 */
export function createLoggerForTest(testClassName) {
  const logsDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const logFile = path.join(logsDir, `${testClassName}-${timestamp}_detailedLog`);

  const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}`
      )
    ),
    transports: [
      new transports.File({ filename: logFile }),
      new transports.Console()
    ]
  });

  return { logger, logFile };
}

/**
 * Attach the log file to Playwright report
 */
export function attachLogToReport(testClassName, testInfo, logFile) {
  if (testInfo && fs.existsSync(logFile)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    testInfo.attach(`${testClassName}_${timestamp}_detailedLog`, {
      path: logFile,
      contentType: 'text/plain'
    });
  }
}
