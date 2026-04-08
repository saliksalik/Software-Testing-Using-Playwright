const { defineConfig } = require('@playwright/test');

const isHeaded = process.env.HEADED === '1' || process.env.HEADED === 'true';
const slowMo = Number(process.env.SLOWMO || (isHeaded ? '300' : '0'));

module.exports = defineConfig({
  testDir: './tests',
  timeout: 120000,
  expect: {
    timeout: 10000
  },
  fullyParallel: true,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://adactinhotelapp.com',
    headless: !isHeaded,
    launchOptions: {
      slowMo: Number.isFinite(slowMo) ? slowMo : 0
    },
    video: 'off',
    trace: 'on-first-retry',
    screenshot: 'on'
  }
});