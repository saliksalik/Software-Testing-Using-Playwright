const { test, expect } = require('@playwright/test');

// File purpose:
// Demonstrate network mocking by intercepting API calls and returning controlled responses.
// Team-lead scenario: "Test empty-state and server-error UI behavior without depending on unstable backend environments."
// Why this matters:
// - You can validate edge cases on-demand (no data, 500 errors).
// - Tests become deterministic and faster in CI.
// API-specific behavior:
// - Intercepts calls to https://example.com/api/posts
// - Mocks 200 with [] (no data)
// - Mocks 500 with error payload
// Sample mocked responses:
// - No data: []
// - Server error: { message: 'Internal Server Error' }
// Where to see response:
// - In this test, mocked response is consumed by page JS and shown on UI text.
// - Also inspect request in DevTools Network during headed runs.
// Quick memory: route.fulfill = fake backend reply for controlled test scenarios.

test.describe('5.18 Network Mocking: No Data and Server Error simulation', () => {
  test('mocks no-data response and verifies empty-state UI', async ({ page }) => {
    // Step 1: Mock API as no-data.
    await page.route('https://example.com/api/posts', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    // Step 2: Build minimal UI that consumes mocked API.
    await page.setContent(`
      <div id="result">Loading...</div>
      <script>
        (async () => {
          const res = await fetch('https://example.com/api/posts');
          const data = await res.json();
          document.getElementById('result').innerText = data.length === 0 ? 'No Data' : 'Has Data';
        })();
      </script>
    `);

    // Step 3: Validate no-data state on UI.
    await expect(page.locator('#result')).toHaveText('No Data');
  });

  test('mocks server error and verifies error-state UI', async ({ page }) => {
    // Step 1: Mock API as server error.
    await page.route('https://example.com/api/posts', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' })
      });
    });

    // Step 2: Build minimal UI to show error status.
    await page.setContent(`
      <div id="result">Loading...</div>
      <script>
        (async () => {
          const res = await fetch('https://example.com/api/posts');
          if (!res.ok) {
            document.getElementById('result').innerText = 'Server Error: ' + res.status;
            return;
          }
          document.getElementById('result').innerText = 'OK';
        })();
      </script>
    `);

    // Step 3: Validate error-state text.
    await expect(page.locator('#result')).toHaveText('Server Error: 500');
  });
});
