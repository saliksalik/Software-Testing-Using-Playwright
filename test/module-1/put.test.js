const { test, expect } = require('@playwright/test');

// File purpose:
// Use this to test full updates where the entire resource object is sent.
// Team-lead scenario: "Validate full profile/product update endpoint with complete body."
// Why this matters:
// - PUT should replace the old resource with the new one.
// - Missing fields can cause data loss or default values.
// API-specific behavior:
// - PUT /posts/1 expects the full resource payload.
// - The response should contain the fully updated object.
// Quick memory: PUT = replace object, send all fields.

test.describe('PUT request for complete resource update', () => {
  test('updates a post completely using PUT', async ({ request }) => {
    // Steps to learn:
    // 1. Open DevTools Network tab.
    // 2. Run this test and inspect the PUT request payload.
    // 3. Confirm the request sends the full post object.

    const payload = {
      id: 1,
      title: 'Updated Title',
      body: 'Updated body content.',
      userId: 1
    };

    // Step 1: Send full object update via PUT.
    const response = await request.put('/posts/1', { data: payload });

    // Step 2: Validate status code.
    expect(response.status()).toBe(200);

    // Step 3: Validate full updated content in response.
    const responseBody = await response.json();
    // Sample response body:
    // { id: 1, title: 'Updated Title', body: 'Updated body content.', userId: 1 }
    // Where to see it: log responseBody or inspect the request in the browser demo.
    expect(responseBody).toMatchObject({
      title: 'Updated Title',
      body: 'Updated body content.',
      userId: 1
    });
    expect(responseBody.id).toBe(1);
  });
});
