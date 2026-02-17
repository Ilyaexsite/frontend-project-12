module.exports = {
  testDir: '__tests__',
  timeout: 30000,
  workers: 1,
  use: {
    baseURL: 'http://localhost:5001',
    headless: true,
    screenshot: 'on',
    trace: 'on',
  },
  reporter: [
    ['html', { outputFolder: 'test-report' }],
    ['list']
  ],
};