module.exports = {
  testDir: '__tests__',
  timeout: 30000,
  workers: 1,
  use: {
    baseURL: 'http://localhost:5001',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
};