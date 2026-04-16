const { test, expect } = require('@playwright/test');

// File purpose:
// Provide CI-friendly API tests intended for GitHub Actions pipelines.
// Team-lead scenario: "Gate merges by running API smoke tests automatically in CI on every push/PR."
// Why this matters:
// - Prevents regressions from being merged.
// - Gives fast feedback in pull requests.
// API-specific behavior:
// - Uses lightweight smoke checks to keep pipeline fast.
// - Reads TARGET_ENV from CI variables.
// Sample response body:
// - GET /posts/1 -> { userId: 1, id: 1, title: '...', body: '...' }
// Where to see real response:
// - GitHub Actions logs and Playwright report artifact.
// Quick memory: CI smoke tests should be fast, stable, and informative.

test.describe('5.22 CI/CD Integration: GitHub Actions pipeline readiness', () => {
  test('smoke check: API is reachable', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.id).toBe(1);
  });

  test('smoke check: create endpoint responds correctly', async ({ request }) => {
    const response = await request.post('/posts', {
      data: {
        title: 'CI smoke title',
        body: 'CI smoke body',
        userId: 99
      }
    });

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.title).toBe('CI smoke title');
  });
});
