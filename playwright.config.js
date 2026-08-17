// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { on } from 'node:cluster';

dotenv.config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
  },
  timeout:60000,
  /* Configure projects for major browsers */
  projects: [

        // 1. Authentication setup
        {
            name: 'setup',
            testMatch: /.*\.setup\.js/
        },

        // 2. Authentication tests
        {
            name: 'auth',
            testMatch: /auth\/.*\.spec\.js/
        },

        // 3. Future authenticated tests
        {
            name: 'authenticated',
            dependencies: ['setup'],
            testIgnore: /auth\/.*\.spec\.js/,

            use: {
                ...devices['Desktop Chrome'],
                storageState: 'playwright/.auth/user.json'
            }
        },

        // {
        //     name: 'firefox',
        //     use: {
        //         ...devices['Desktop Firefox']
        //     }
        // },

        // {
        //     name: 'webkit',
        //     use: {
        //         ...devices['Desktop Safari']
        //     }
        // }
    ]
});

