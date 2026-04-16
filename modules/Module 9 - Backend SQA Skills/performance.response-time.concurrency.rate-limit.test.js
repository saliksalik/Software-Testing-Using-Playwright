const { test, expect } = require('@playwright/test');

// Module 9: Backend SQA Skill - Performance Basics
//
// Easy explanation:
// - We validate response-time threshold, basic concurrency behavior, and simple rate-limit policy.

async function simulatedEndpoint(latencyMs) {
  const startedAt = Date.now();
  await new Promise((resolve) => setTimeout(resolve, latencyMs));
  return { status: 200, elapsedMs: Date.now() - startedAt };
}

function rateLimitDecision(requestCount, limit) {
  return requestCount > limit ? 429 : 200;
}

test.describe('Module 9 - Performance Basics', () => {
  test('checks response time threshold', async () => {
    const response = await simulatedEndpoint(60);

    expect(response.status).toBe(200);
    expect(response.elapsedMs).toBeLessThan(250);
  });

  test('checks concurrency sanity with multiple parallel requests', async () => {
    const tasks = Array.from({ length: 5 }, () => simulatedEndpoint(40));
    const results = await Promise.all(tasks);

    expect(results.length).toBe(5);
    expect(results.every((r) => r.status === 200)).toBeTruthy();
  });

  test('checks rate limit status mapping', async () => {
    expect(rateLimitDecision(8, 10)).toBe(200);
    expect(rateLimitDecision(12, 10)).toBe(429);
  });
});
