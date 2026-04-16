const { test, expect } = require('@playwright/test');
const { renderTemplate } = require('../helpers');

// File purpose:
// Use this when payload structure is fixed but values change by environment or test case.
// Team-lead scenario: "Use one JSON template for many test datasets (dev/qa/stage)."
// Why this matters:
// - It keeps payload structure consistent while swapping values easily.
// - It is ideal for parameterized tests and environment-specific data.
// API-specific behavior:
// - POST /posts uses the resolved JSON template values.
// - The response should match the final payload after template replacement.
// Quick memory: dynamic file = templated payload values.

test.describe('POST request using dynamic JSON file', () => {
  test('replaces placeholders in a JSON template before sending', async ({ request }) => {
    // Steps to learn:
    // 1. Open DevTools Network tab.
    // 2. Run this test and inspect the POST request.
    // 3. Confirm the JSON values were inserted from the template.

    // Step 1: Replace placeholders in template.json.
    const payload = renderTemplate('template.json', {
      title: 'Templated Title',
      body: 'This body is inserted from the JSON template.',
      userId: 2
    });

    // Step 2: Submit templated payload to API.
    const response = await request.post('/posts', { data: payload });
    expect(response.status()).toBe(201);

    // Step 3: Ensure API echoed the resolved template values.
    const responseBody = await response.json();
    // Sample response body:
    // { id: 101, title: 'Templated Title', body: 'This body is inserted from the JSON template.', userId: 2 }
    // Where to see it: add console.log(responseBody) or examine the response in the browser demo.
    expect(responseBody).toMatchObject(payload);
  });
});
