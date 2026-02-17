module.exports = {
  testDir: '__tests__',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:5001',
  },
  webServer: {
    command: 'npm run start:test',
    port: 5001,
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
};