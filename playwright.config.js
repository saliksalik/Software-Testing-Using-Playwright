const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'test',
  timeout: 30000,
  workers: 1,
  expect: {
    timeout: 5000
  },
  use: {
    headless: false,
    launchOptions: {
      slowMo: 250
    },
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]]
});
