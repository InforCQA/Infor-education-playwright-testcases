import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 1,
  use: {
    browserName: undefined,
    headless: undefined,
  },
  globalSetup: './global-setup.js',
  testDir: './tests',
  timeout: 60 * 1000,
  slowMo: 1000,
  projects: [
    {
      name: 'InforOS',
      testMatch: 'plan/LNConfiguringMultisiteEnvironment.spec.js',
    },
  ],
});
