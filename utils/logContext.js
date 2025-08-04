// utils/logContext.js
const { AsyncLocalStorage } = require('node:async_hooks');
const storage = new AsyncLocalStorage();

/**
 * Run the callback with `logger` bound in the async context
 */
function withTestLogger(logger, callback) {
  return storage.run({ logger }, callback);
}

/**
 * Retrieve the logger from the current async context
 * Falls back to console if none set
 */
function getCurrentLogger() {
  const store = storage.getStore();
  return (store && store.logger) || console;
}

module.exports = { withTestLogger, getCurrentLogger };
