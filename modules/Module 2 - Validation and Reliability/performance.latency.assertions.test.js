const { test, expect } = require('@playwright/test');

// File purpose:
// Validate response time and latency expectations for reliability/performance monitoring.
// Team-lead scenario: "Ensure core read endpoints stay under agreed SLA before deployment."
// Why this matters:
// - Functional success is not enough if responses are too slow.
// - Latency assertions catch performance regressions early.
// API-specific behavior:
// - Endpoint used: GET /posts/1
// - This test uses elapsed wall-clock time around the API call.
// - Example assertion target: < 2000 ms (adjust to your real SLA).
// Where to see real response timing:
// - Add console.log(elapsedMs) below.
// - In browser DevTools, Network tab shows request timing breakdown.
// Quick memory: Reliability = correct + fast + consistent.

test.describe('5.13 Monitoring API Performance: Response Time and Latency Assertions', () => {
  test('asserts single request response time under threshold', async ({ request }) => {
    // Step 1: Measure start time.
    const start = Date.now();

    // Step 2: Execute API call.
    const response = await request.get('/posts/1');
    const elapsedMs = Date.now() - start;
    // Example timing output:
    // - elapsedMs = 120
    // Where to see real timing:
    // - Add: console.log(elapsedMs)
    // - Or check DevTools Network timing in the visual browser demo flow.

    // Step 3: Validate functional and performance conditions.
    expect(response.status()).toBe(200);
    expect(elapsedMs).toBeLessThan(2000);
  });

  test('asserts average latency across repeated calls', async ({ request }) => {
    const iterations = 3;
    const durations = [];

    for (let i = 0; i < iterations; i += 1) {
      const start = Date.now();
      const response = await request.get('/posts/1');
      const elapsedMs = Date.now() - start;

      expect(response.status()).toBe(200);
      durations.push(elapsedMs);
    }

    const averageMs = durations.reduce((sum, v) => sum + v, 0) / durations.length;
    // Example average timing output:
    // - durations = [110, 140, 130]
    // - averageMs = 126.67
    // Where to see real timing:
    // - Add: console.log({ durations, averageMs })

    // Example average SLA threshold. Tune this for your environment.
    expect(averageMs).toBeLessThan(2000);
  });
});
