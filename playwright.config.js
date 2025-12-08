import { defineConfig } from '@playwright/test';

export default defineConfig({
  //workers: 1,
  use: {
      browserName: 'chromium',

    launchOptions: {
      executablePath: ''
    },
    trace: 'on',
    screenshot: 'only-on-failure'
  },
  testDir: './education',
  reporter: 'html',
  timeout: 90000 * 1000,
  projects: [
    // {
    //   name: 'LN',
    //   testMatch: 'ln/plan/LNConfiguringMultisiteEnvironment.spec.js',
    // },
    {
      name: 'FSM',
      testMatch: 'fsm/plan/FSMFinancialsDifferencesToLawson.spec.js',
    }
  ],
});
