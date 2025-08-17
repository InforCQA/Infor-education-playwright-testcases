import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 1,
  use: {
    browserName: undefined,
    headless: undefined,
    trace: 'on',
  },
  globalSetup: './global-setup.js',
  testDir: './tests',
  reporter: 'html',
  timeout: 20000 * 1000,
  projects: [
    {
      name: 'InforOS',
      testMatch: 'plan/LNConfiguringMultisiteEnvironment.spec.js',
    },
  ],
});
