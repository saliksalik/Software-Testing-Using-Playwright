const { test, expect } = require('@playwright/test');

// File purpose:
// Validate cookie handling and request-header interception in Playwright.
// Team-lead scenario: "Ensure tracking headers and session cookies are attached before requests leave the browser."
// Why this matters:
// - Session and auth often depend on cookies.
// - Header injection/interception is common for trace IDs, auth gateways, and observability.
// API-specific behavior:
// - Uses httpbin.org/cookies to inspect cookies sent by browser.
// - Uses routing interception to inject custom headers before request continues.
// Sample response examples:
// - /cookies -> { cookies: { qaCookie: 'cookie-value-1' } }
// - /anything -> { headers: { 'X-Trace-Id': 'trace-123' }, ... }
// Where to see real response:
// - For /cookies, parse body text in test.
// - For /anything, parsed JSON body contains echoed headers.
// - Also visible in DevTools Network request headers during headed run.
// Quick memory: addCookies controls browser state; route.continue can modify outgoing headers.

test.describe('5.16 Handling Cookies and Header Interception in Playwright', () => {
  test('adds cookie and verifies server receives it', async ({ context, page }) => {
    // Step 1: Add cookie directly into browser context.
    await context.addCookies([
      {
        name: 'qaCookie',
        value: 'cookie-value-1',
        domain: 'httpbin.org',
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'None'
      }
    ]);

    // Step 2: Navigate to cookie inspection endpoint.
    await page.goto('https://httpbin.org/cookies', { waitUntil: 'domcontentloaded' });

    // Step 3: Validate cookie was sent.
    const pageText = await page.locator('body').innerText();
    const responseBody = JSON.parse(pageText);

    expect(responseBody.cookies.qaCookie).toBe('cookie-value-1');
  });

  test('intercepts request and injects trace header', async ({ page }) => {
    // Step 1: Intercept outgoing request and inject header.
    await page.route('**/anything', async (route) => {
      const headers = {
        ...route.request().headers(),
        'x-trace-id': 'trace-123'
      };
      await route.continue({ headers });
    });

    // Step 2: Trigger request.
    await page.goto('https://httpbin.org/anything', { waitUntil: 'domcontentloaded' });

    // Step 3: Validate intercepted/injected header reached server.
    const pageText = await page.locator('body').innerText();
    const responseBody = JSON.parse(pageText);

    expect(responseBody.headers['X-Trace-Id']).toBe('trace-123');
  });
});
