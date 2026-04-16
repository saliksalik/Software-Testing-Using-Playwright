const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');

// File purpose:
// Show global auth setup pattern using storageState to share session across tests.
// Team-lead scenario: "Avoid logging in before every test; create one reusable authenticated session."
// Why this matters:
// - Faster test execution.
// - Less flaky repetitive login steps.
// - Consistent authenticated state across dependent tests.
// API-specific behavior:
// - Uses browser context state file with cookies.
// - This demo uses httpbin cookie endpoints to simulate session persistence.
// Sample response example:
// - /cookies -> { cookies: { sessionToken: 'module3-demo-session' } }
// Where to see real response:
// - Add console.log(cookiesBody)
// - Inspect saved state file under test/module-3/.auth/user.json
// Quick memory: storageState = snapshot of cookies/localStorage/sessionStorage.

const authDir = path.join(__dirname, '.auth');
const storageStatePath = path.join(authDir, 'user.json');

test.describe('5.15 Global Auth Setup: storageState session sharing', () => {
  test.describe.configure({ mode: 'serial' });

  test('creates reusable authenticated storageState', async ({ browser }) => {
    // Step 1: Ensure state folder exists.
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    // Step 2: Create context and set a session cookie directly.
    const context = await browser.newContext();
    const page = await context.newPage();

    await context.addCookies([
      {
        name: 'sessionToken',
        value: 'module3-demo-session',
        domain: 'httpbin.org',
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'None'
      }
    ]);

    // Open a page to confirm browser context is active before saving state.
    await page.goto('https://httpbin.org/', { waitUntil: 'domcontentloaded' });

    // Step 3: Save storage state to share with later tests.
    await context.storageState({ path: storageStatePath });

    expect(fs.existsSync(storageStatePath)).toBe(true);

    await context.close();
  });

  test('reuses saved storageState in a new context', async ({ browser }) => {
    // Step 1: Create fresh context from saved state.
    const context = await browser.newContext({ storageState: storageStatePath });
    const page = await context.newPage();

    // Step 2: Verify session cookie is available in new context.
    await page.goto('https://httpbin.org/cookies', {
      waitUntil: 'domcontentloaded'
    });

    const pageText = await page.locator('body').innerText();
    const cookiesBody = JSON.parse(pageText);

    // Sample response: { cookies: { sessionToken: 'module3-demo-session' } }
    expect(cookiesBody.cookies.sessionToken).toBe('module3-demo-session');

    await context.close();
  });
});
