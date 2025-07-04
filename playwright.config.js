import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 1,
  use: {
    browserName: undefined,
    headless: undefined,
  },
  globalSetup: './global-setup.js',
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5 * 1000 },
  projects: [
    {
      name: 'InforOS',
      testMatch: 'plan/*.spec.js',
    },
  ],
});
