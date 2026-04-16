const { test, expect } = require('@playwright/test');

// File purpose:
// Demonstrate environment management for Dev/QA/Prod style base URLs.
// Team-lead scenario: "Run the same test suite against DEV in PRs, QA in staging, and PROD smoke in release."
// Why this matters:
// - Same tests, different environments = confidence without duplicated scripts.
// - Environment drift is detected early.
// API-specific behavior:
// - Uses env map to pick base URL by TARGET_ENV.
// - Default is dev.
// Sample response body:
// - { userId: 1, id: 1, title: '...', body: '...' }
// Where to see real response:
// - Add console.log({ targetEnv, baseUrl, responseBody })
// Quick memory: config by env variable, not hardcoded URL in each test.

const ENV_URLS = {
  dev: 'https://jsonplaceholder.typicode.com',
  qa: 'https://jsonplaceholder.typicode.com',
  prod: 'https://jsonplaceholder.typicode.com'
};

const targetEnv = (process.env.TARGET_ENV || 'dev').toLowerCase();
const baseUrl = ENV_URLS[targetEnv] || ENV_URLS.dev;

test.describe('5.21 Environment Management across Dev/QA/Prod', () => {
  test('validates selected environment endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/posts/1`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', 1);
    expect(responseBody).toHaveProperty('title');
  });

  test('validates environment selection logic', async () => {
    expect(['dev', 'qa', 'prod']).toContain(targetEnv);
    expect(baseUrl).toContain('jsonplaceholder.typicode.com');
  });
});
