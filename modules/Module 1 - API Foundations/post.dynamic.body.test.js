const { test, expect } = require('@playwright/test');

// File purpose:
// Use this when test data must be generated during runtime.
// Team-lead scenario: "Create unique values in CI so repeated runs do not clash."
// Why this matters:
// - It helps avoid duplicate IDs or repeated data collisions.
// - It is useful for data-driven and parameterized tests.
// API-specific behavior:
// - POST /posts accepts dynamic values in the request body.
// - The server should treat each payload as a new resource.
// Quick memory: dynamic body = runtime data creation.

test.describe('POST request using dynamic API request body', () => {
  test('builds a payload at runtime and sends it', async ({ request }) => {
    // Steps to learn:
    // 1. Open Network tab in DevTools.
    // 2. Run this test and inspect the POST request.
    // 3. Verify the request payload uses runtime values.

    // Dynamic payload built from runtime values.
    const payload = {
      title: 'Dynamic Title',
      body: 'Dynamic post body',
      userId: 2
    };

    // API call with runtime-generated body.
    const response = await request.post('/posts', { data: payload });

    // Validate status and body content.
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    // Sample response body:
    // { id: 101, title: 'Dynamic Title', body: 'Dynamic post body', userId: 2 }
    // Where to see it: log the responseBody or inspect the raw API call in DevTools when you run a browser-based demo.
    expect(responseBody).toMatchObject(payload);
  });
});
