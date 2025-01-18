import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 10000,

  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: 'html',

  use: {
    baseURL: 'https://localhost',
    // baseURL: 'https://errwarn.projektstudencki.pl', // AVOID TESTING ON PROD!

    trace: 'on-first-retry',

    headless: false,

    viewport: { width: 1920, height: 1080 },

    actionTimeout: 20000,

    ignoreHTTPSErrors: true,

    video: 'retain-on-failure',

    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
