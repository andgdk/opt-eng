import { defineWorkspace } from 'vitest/config';

// export default ['**/*/vite.config.{ts,mts}', '**/*/vitest.config.{ts,mts}'];

export default defineWorkspace([
  // If you want to keep running your existing tests in Node.js, uncomment the next line.
  // 'vite.config.mts',
  {
    extends: 'vite.config.mts',
    test: {
      browser: {
        enabled: true,
        name: 'chromium',
        provider: 'playwright',
        // https://playwright.dev
        providerOptions: {},
      },
    },
  },
]);
