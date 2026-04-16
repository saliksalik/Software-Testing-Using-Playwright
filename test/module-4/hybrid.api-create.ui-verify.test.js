const { test, expect, request } = require('@playwright/test');

// File purpose:
// Demonstrate hybrid testing: create data via API and verify it on UI.
// Team-lead scenario: "Create test data quickly through API and then validate frontend rendering without manual setup."
// Why this matters:
// - API setup is faster than creating data through UI forms.
// - UI verification proves end-user visibility of backend-created data.
// API-specific behavior:
// - Creates post using DummyJSON: POST /posts/add
// - Feeds created result to a UI fetch via interception for deterministic validation.
// Sample created response:
// - { id: 252, title: 'Hybrid title', body: 'Hybrid body', userId: 7 }
// Where to see real response:
// - Add console.log(createdBody)
// - UI verification text is visible in #post-title and #post-body elements.
// Quick memory: Hybrid = API for setup + UI for verification.

test.describe('5.19 Hybrid Testing: API create + UI verification', () => {
  test('creates post by API and verifies values on UI', async ({ page }) => {
    // Step 1: Create resource via API.
    const api = await request.newContext({
      baseURL: 'https://dummyjson.com',
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });

    const createResponse = await api.post('/posts/add', {
      data: {
        title: 'Hybrid title',
        body: 'Hybrid body',
        userId: 7
      }
    });

    expect(createResponse.status()).toBeGreaterThanOrEqual(200);
    expect(createResponse.status()).toBeLessThan(300);

    const createdBody = await createResponse.json();
    expect(createdBody.title).toBe('Hybrid title');

    // Step 2: Intercept UI fetch and return created API data.
    await page.route('https://example.com/api/created-post', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(createdBody)
      });
    });

    // Step 3: Render fetched data in UI and verify.
    await page.setContent(`
      <h1 id="post-title"></h1>
      <p id="post-body"></p>
      <script>
        (async () => {
          const res = await fetch('https://example.com/api/created-post');
          const post = await res.json();
          document.getElementById('post-title').innerText = post.title;
          document.getElementById('post-body').innerText = post.body;
        })();
      </script>
    `);

    await expect(page.locator('#post-title')).toHaveText('Hybrid title');
    await expect(page.locator('#post-body')).toHaveText('Hybrid body');

    await api.dispose();
  });
});
