const { test, expect } = require('@playwright/test');

// File purpose:
// Use this when the payload is fixed and known in advance.
// Team-lead scenario: "Verify create-post endpoint with the exact documented sample payload."
// Why this matters:
// - It proves the API accepts the documented contract.
// - It is the fastest smoke test for create behavior.
// - It catches request format and schema issues early.
// API-specific behavior:
// - POST = Create.
// - The path '/posts' is combined with baseURL.
// - The response should include the same body values and a generated id.
// Quick memory: POST = create, static body = fixed test data.

test.describe('POST request using static API request body', () => {
  test('sends a hardcoded payload and validates the created post', async ({ request }) => {
    // Steps to learn:
    // 1. Open browser DevTools (F12).
    // 2. Go to Network tab and select XHR/Fetch.
    // 3. Run this test file with Playwright.
    // 4. Manually compare the request payload in DevTools if needed.

    const payload = {
      title: 'Hello World',
      body: 'This is a static post body.',
      userId: 1
    };

    // Action:
    // Send POST /posts with static JSON body.
    const response = await request.post('/posts', { data: payload });

    // Validation:
    // 1) API should return 201 Created.
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    // Sample response body:
    // { id: 101, title: 'Hello World', body: 'This is a static post body.', userId: 1 }
    // Where to see it: add console.log(responseBody) above or inspect the HTML report if you generate one.
    // 2) Response should include the same data we sent.
    expect(responseBody).toMatchObject(payload);
    // 3) Created resource should have an id.
    expect(responseBody.id).toBeDefined();
  });
});
