const { test, expect } = require('@playwright/test');

// File purpose:
// This file teaches API observability checks.
// Observability means: can we trace one request across systems?
// Team-lead scenario:
// "Make sure every outgoing request carries correlation headers so debugging in production is easy."
// Why this matters:
// - If an issue happens in production, trace IDs help us find logs quickly.
// - Without these headers, cross-service debugging is slow and painful.
// API-specific behavior:
// - We use route interception to echo request headers in a deterministic way.
// - Endpoint used in this demo page: https://example.com/echo
// Sample response:
// - { headers: { 'X-Correlation-Id': '...', 'X-Trace-Id': '...' }, ... }
// Where to see real response:
// - Add console.log(responseBody) below.
// - Or inspect Network tab in headed browser flows.
// Quick memory:
// Correlation ID = track one user request.
// Trace ID = track one distributed trace.

test.describe('Module 7 - Observability and Trace Headers', () => {
  test('sends correlation and trace headers and verifies echo', async ({ page }) => {
    // Define trace headers that real systems usually require.
    const correlationId = 'corr-module7-001';
    const traceId = 'trace-module7-001';

    // Intercept request and return echoed headers.
    await page.route('https://example.com/echo', async (route) => {
      const reqHeaders = route.request().headers();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          headers: {
            'X-Correlation-Id': reqHeaders['x-correlation-id'],
            'X-Trace-Id': reqHeaders['x-trace-id']
          }
        })
      });
    });

    // Execute browser fetch with observability headers.
    const result = await page.evaluate(async ({ correlationIdArg, traceIdArg }) => {
      const res = await fetch('https://example.com/echo', {
        headers: {
          'x-correlation-id': correlationIdArg,
          'x-trace-id': traceIdArg
        }
      });

      return {
        status: res.status,
        body: await res.json()
      };
    }, { correlationIdArg: correlationId, traceIdArg: traceId });

    // Validate HTTP status.
    expect(result.status).toBe(200);

    // Validate the server received and echoed our headers.
    expect(result.body.headers['X-Correlation-Id']).toBe(correlationId);
    expect(result.body.headers['X-Trace-Id']).toBe(traceId);
  });
});
