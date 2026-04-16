const { test, expect } = require('@playwright/test');

// File purpose:
// Demonstrate resilience concepts: retry strategy, timeout guard, and idempotency verification.
// Team-lead scenario: "Ensure client behavior is stable under transient failures and slow endpoints."
// Why this matters:
// - Production APIs can fail intermittently.
// - Good tests verify behavior under degraded conditions, not only happy path.
// API-specific behavior:
// - Uses synthetic response sequences for deterministic retry testing.
// - Uses GET /posts/1 as safe/idempotent request example.
// Sample resilience signals:
// - Retry sequence: 503, 503, 200
// - Timeout guard: operation aborted if exceeds threshold.
// Where to see real values:
// - Add console.log({ attempts, elapsedMs, firstBody, secondBody })
// Quick memory: resilient client = retries transient failures + enforces timeout + relies on idempotent reads.

async function retryOperation(fn, maxRetries) {
  let attempt = 0;
  let lastError;

  while (attempt <= maxRetries) {
    try {
      return await fn(attempt + 1);
    } catch (err) {
      lastError = err;
      attempt += 1;
      if (attempt > maxRetries) {
        throw lastError;
      }
    }
  }

  throw lastError;
}

test.describe('Module 6 - Resilience: retry, timeout, idempotency', () => {
  test('validates retry behavior for transient failure sequence', async () => {
    const statusSequence = [503, 503, 200];
    let cursor = 0;

    const result = await retryOperation(async () => {
      const current = statusSequence[cursor];
      cursor += 1;
      if (current !== 200) {
        throw new Error(`Transient failure status ${current}`);
      }
      return { status: current };
    }, 2);

    expect(result.status).toBe(200);
    expect(cursor).toBe(3);
  });

  test('validates timeout guard for slow operation', async () => {
    const timeoutMs = 150;

    const slowOperation = new Promise((resolve) => {
      setTimeout(() => resolve('done'), 400);
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs);
    });

    await expect(Promise.race([slowOperation, timeoutPromise])).rejects.toThrow('Operation timed out');
  });

  test('validates idempotent GET behavior returns stable resource identity', async ({ request }) => {
    const first = await request.get('/posts/1');
    const second = await request.get('/posts/1');

    expect(first.status()).toBe(200);
    expect(second.status()).toBe(200);

    const firstBody = await first.json();
    const secondBody = await second.json();

    expect(firstBody.id).toBe(1);
    expect(secondBody.id).toBe(1);
    expect(firstBody.title).toBe(secondBody.title);
  });
});
