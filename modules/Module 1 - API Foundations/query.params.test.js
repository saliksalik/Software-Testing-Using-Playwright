const { test, expect } = require('@playwright/test');

// File purpose:
// Use this for filtering, searching, pagination, and sorting validations.
// Team-lead scenario: "Verify API returns correct subset when query params are applied."
// Why this matters:
// - Query params define how clients search and page results.
// - A broken query endpoint can return wrong data or too much data.
// API-specific behavior:
// - GET /posts?_page=2&_limit=3 should return exactly 3 posts from page 2.
// - Different APIs may use page/per_page or limit/offset; know the contract.
// Quick memory: query params = request modifiers for read operations.

test.describe('Handling query parameters for search and filtering', () => {
  test('sends query params and validates filtered response', async ({ request }) => {
    // Steps to learn:
    // 1. Open DevTools.
    // 2. Run this test and inspect the request URL query string.
    // 3. Confirm ?_page=2&_limit=3 appears in the request.

    // Step 1: Send GET with query parameters.
    const response = await request.get('/posts', {
      params: { _page: 2, _limit: 3 }
    });

    // Step 2: Validate request succeeded.
    expect(response.status()).toBe(200);

    // Step 3: Validate API returned only requested count.
    const responseBody = await response.json();
    // Sample response body: an array of 3 post objects.
    // Where to see it: log responseBody or check the Network tab in a browser demo.
    expect(responseBody).toHaveLength(3);
  });
});
