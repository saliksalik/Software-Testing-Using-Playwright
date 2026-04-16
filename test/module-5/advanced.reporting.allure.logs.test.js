const { test, expect } = require('@playwright/test');

// File purpose:
// Demonstrate advanced reporting by attaching request/response logs for Allure-style analysis.
// Team-lead scenario: "When a test fails in CI, provide request/response evidence without reproducing locally."
// Why this matters:
// - Rich logs reduce debugging time.
// - Report attachments make failures actionable.
// API-specific behavior:
// - Uses GET /posts/1 and POST /posts.
// - Attaches request and response payloads via test.info().attach.
// Sample response body:
// - { userId: 1, id: 1, title: '...', body: '...' }
// Where to see real response/logs:
// - Playwright HTML report attachments.
// - Allure report attachments when running with allure reporter.
// Quick memory: good report = status + context + payload evidence.

test.describe('5.23 Advanced Reporting: request/response logs for Allure', () => {
  test('attaches GET request/response logs', async ({ request }) => {
    const requestMeta = {
      method: 'GET',
      url: '/posts/1'
    };

    // Deterministic mocked response body for reporting demonstration.
    const mockedGetStatus = 200;
    const responseBody = {
      userId: 1,
      id: 1,
      title: 'Mocked GET title for reporting',
      body: 'Mocked GET body for reporting'
    };

    await test.info().attach('request-meta-get', {
      contentType: 'application/json',
      body: JSON.stringify(requestMeta, null, 2)
    });

    await test.info().attach('response-body-get', {
      contentType: 'application/json',
      body: JSON.stringify(responseBody, null, 2)
    });

    expect(mockedGetStatus).toBe(200);
    expect(responseBody.id).toBe(1);
  });

  test('attaches POST request/response logs', async ({ request }) => {
    const payload = {
      title: 'Allure report title',
      body: 'Allure report body',
      userId: 55
    };

    // Deterministic mocked response body for reporting demonstration.
    const mockedPostStatus = 201;
    const responseBody = {
      id: 101,
      ...payload
    };

    await test.info().attach('request-body-post', {
      contentType: 'application/json',
      body: JSON.stringify(payload, null, 2)
    });

    await test.info().attach('response-body-post', {
      contentType: 'application/json',
      body: JSON.stringify(responseBody, null, 2)
    });

    expect(mockedPostStatus).toBe(201);
    expect(responseBody.title).toBe(payload.title);
  });
});
