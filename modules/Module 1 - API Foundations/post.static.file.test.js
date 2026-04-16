const { test, expect } = require('@playwright/test');
const { loadJson } = require('../helpers');

// File purpose:
// Use this when payloads are stored externally as reusable test data files.
// Team-lead scenario: "Run the same API with approved payload fixtures from QA."
// Why this matters:
// - It separates test logic from test data.
// - It makes payload maintenance easier for non-developers.
// API-specific behavior:
// - POST /posts should accept the JSON file content.
// - The response should echo the same fields.
// Quick memory: external JSON = reusable fixture payload.

test.describe('POST request using static JSON file', () => {
  test('loads a JSON payload from file and posts it', async ({ request }) => {
    // Steps to learn:
    // 1. Open DevTools.
    // 2. Run this test and inspect the POST request in a browser if you manually repeat it.
    // 3. Confirm the payload matches payload.json.

    // Step 1: Read payload from payload.json.
    const payload = loadJson('payload.json');

    // Step 2: Send POST /posts with file-based payload.
    const response = await request.post('/posts', { data: payload });

    // Step 3: Validate successful creation and response body shape.
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    // Sample response body:
    // { id: 101, title: 'Static File Post', body: 'Post body from a static JSON file.', userId: 1 }
    // Where to see it: use console.log(responseBody) or review the generated Playwright HTML report.
    expect(responseBody).toMatchObject(payload);
    expect(responseBody.id).toBeDefined();
  });
});
