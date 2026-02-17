module.exports = {
  testDir: '__tests__',
  timeout: 30000,
  workers: 1,
  use: {
    baseURL: 'http://localhost:5001',
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'on',
    trace: 'on',
  },
  reporter: [
    ['html', { outputFolder: 'test-report' }],
    ['list']
  ],
};