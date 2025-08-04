// fixtures/withLoggerContext.js
const base = require('@playwright/test');
const { withTestLogger } = require('../utils/logContext');
const { getLoggerForTestClass } = require('../utils/logger');

exports.test = base.test.extend({
  logger: async ({ }, use, testInfo) => {
    const className = testInfo.titlePath?.[1] || testInfo.file.split('/').pop().split('.')[0];
    const log = getLoggerForTestClass(className);
    await withTestLogger(log, async () => {
      await use(log);
    });
  }
});
exports.expect = base.expect;
