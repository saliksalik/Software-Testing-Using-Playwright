const { test, expect } = require('@playwright/test');

// File purpose:
// Demonstrate rate-limit and concurrency testing patterns.
// Team-lead scenario: "Verify service behavior and client handling when burst traffic hits API limits."
// Why this matters:
// - Real APIs often return 429 during bursts.
// - Clients should back off and retry responsibly.
// API-specific behavior:
// - Simulates a 429 then 200 progression to validate backoff logic deterministically.
// - Also validates concurrent request batch to stable endpoint.
// Sample response sequence:
// - Attempt 1 => 429
// - Attempt 2 => 200
// Where to see real values:
// - Add console.log({ attempts, statuses })
// Quick memory: concurrency tests throughput; rate-limit tests protection and retry behavior.

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test.describe('Module 6 - Rate Limiting and Concurrency', () => {
  test('handles simulated 429 with backoff and succeeds', async () => {
    const simulated = [429, 200];
    let attempts = 0;
    const statuses = [];

    let finalStatus = 0;
    while (attempts < 3) {
      const status = simulated[Math.min(attempts, simulated.length - 1)];
      statuses.push(status);
      attempts += 1;

      if (status === 200) {
        finalStatus = status;
        break;
      }

      if (status === 429) {
        await sleep(100);
        continue;
      }
    }

    expect(finalStatus).toBe(200);
    expect(statuses[0]).toBe(429);
  });

  test('validates concurrent API calls complete successfully', async ({ request }) => {
    const tasks = Array.from({ length: 5 }).map(() => request.get('/posts/1'));
    const responses = await Promise.all(tasks);

    const statuses = responses.map((r) => r.status());
    for (const status of statuses) {
      expect(status).toBe(200);
    }
  });
});
