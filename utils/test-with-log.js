// // fixtures/test-with-log.js
// const base = require('@playwright/test');
// const path = require('path');
// const { getLoggerForTestClass } = require('../utils/logger');

// const test = base.test.extend({
//   log: async ({}, use, testInfo) => {
//     const pathTitles = testInfo.titlePath || [];  // arr of [file, describe, test, …]
//     let className;

//     if (pathTitles.length >= 2 && typeof pathTitles[1] === 'string') {
//       // Top-level describe title
//       className = pathTitles[1].trim().replace(/[^\w]+/g, '_');
//     } else {
//       // Fallback to file basename
//       className = path.basename(testInfo.file, path.extname(testInfo.file)).replace(/[^\w]+/g, '_');
//     }

//     const log = getLoggerForTestClass(className);
//     log.info(`⏵ Start tests for '${className}'`);

//     await use(log);

//     log.info(`⏴ Tests finished for '${className}' → ${testInfo.status}`);
//   }
// });

// module.exports = { test, expect: base.expect };
