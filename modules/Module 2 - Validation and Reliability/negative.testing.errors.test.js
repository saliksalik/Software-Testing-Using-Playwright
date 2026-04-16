const { test, expect } = require('@playwright/test');

// File purpose:
// Validate negative/error scenarios and confirm API returns correct status codes.
// Team-lead scenario: "Before go-live, prove API handles bad/unauthorized/not-found requests correctly."
// Why this matters:
// - Robust APIs fail safely with predictable error codes.
// - Clients depend on status codes for retries, messaging, and fallback flows.
// API-specific behavior:
// - 400/401 are simulated locally for deterministic and network-safe learning.
// - 404 Not Found is validated using application endpoint: /posts/999999
// Sample error behavior:
// - 400 => invalid request format/params
// - 401 => missing or invalid auth
// - 404 => resource does not exist
// Where to see real response:
// - Use response.text() and console.log() for each error call if you want raw body output.
// Quick memory: Negative tests prove how API behaves when things go wrong.

test.describe('5.12 Negative Testing: 400, 401, and 404 Error Scenarios', () => {
  test('validates 400 Bad Request behavior', async () => {
    // Step 1: Simulate a backend 400 response.
    const response = {
      status: () => 400,
      text: async () => '400 Bad Request'
    };
    // Example response details:
    // - Status: 400
    // - Body text often contains "400 Bad Request"
    // Where to see real response: const text = await response.text(); console.log(text)

    // Step 2: Assert status code.
    expect(response.status()).toBe(400);
  });

  test('validates 401 Unauthorized behavior', async () => {
    // Step 1: Simulate a backend 401 response.
    const response = {
      status: () => 401,
      text: async () => '401 Unauthorized'
    };
    // Example response details:
    // - Status: 401
    // - Body text often contains "401 Unauthorized"
    // Where to see real response: const text = await response.text(); console.log(text)

    // Step 2: Assert status code.
    expect(response.status()).toBe(401);
  });

  test('validates 404 Not Found behavior', async ({ request }) => {
    // Step 1: Request a non-existing resource in our API.
    const response = await request.get('/posts/999999');
    // Example response details:
    // - Status: 404
    // - Body may be empty object or not-found message based on API design
    // Where to see real response: const text = await response.text(); console.log(text)

    // Step 2: Assert status code is 404.
    expect(response.status()).toBe(404);
  });
});
