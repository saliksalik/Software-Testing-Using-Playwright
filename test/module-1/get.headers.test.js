const { test, expect } = require('@playwright/test');

// File purpose:
// Use this to validate read operations and important response headers.
// Team-lead scenario: "Confirm endpoint contract: status, header type, and required fields."
// Why this matters:
// - It verifies both body content and transport contract.
// - Clients depend on headers like content-type and caching rules.
// API-specific behavior:
// - GET /posts/1 should return 200 and application/json.
// - Header validation prevents broken clients even if body looks correct.
// Quick memory: GET = read, verify headers and body.

test.describe('GET API request and validating response headers', () => {
  test('fetches a post and checks response headers', async ({ request }) => {
    // Steps to learn:
    // 1. Open DevTools Network tab.
    // 2. Run this test and inspect the GET request.
    // 3. Confirm the Response Headers include content-type application/json.

    // Step 1: Call GET /posts/1.
    const response = await request.get('/posts/1');

    // Step 2: Validate status and content-type header.
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    // Step 3: Validate required fields from response body.
    const responseBody = await response.json();
    // Sample response body:
    // { userId: 1, id: 1, title: '...', body: '...' }
    // Where to see it: log responseBody or use DevTools in a browser-based demo.
    expect(responseBody).toHaveProperty('userId');
    expect(responseBody).toHaveProperty('title');
  });
});
