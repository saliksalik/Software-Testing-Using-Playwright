const { test, expect } = require('@playwright/test');

// File purpose:
// This test is for visual learning. It opens a real browser page and runs API calls from inside the page context.
// Team-lead scenario: "Demo CRUD flow to juniors in a visible browser session."
// Why this matters:
// - It makes the API call flow visible in a browser.
// - It helps non-technical stakeholders understand CRUD operations.
// - It demonstrates how a browser can call APIs with fetch().
// API-specific behavior:
// - It uses browser fetch() instead of Playwright request fixtures.
// - It is useful for demoing API activity, not just validating backend contract.
// Quick memory: visual demo = see the API happen in a browser.

test.describe('Visual API demo in browser', () => {
  test('runs CRUD-like API calls and shows live status on screen', async ({ page }) => {
    // Step 1: Open JSONPlaceholder home page so you can see browser activity.
    await page.goto('https://jsonplaceholder.typicode.com/', { waitUntil: 'domcontentloaded' });

    // Step 2: Create a visual panel to display each API step while test runs.
    await page.evaluate(() => {
      const panel = document.createElement('div');
      panel.id = 'api-demo-panel';
      panel.style.position = 'fixed';
      panel.style.right = '16px';
      panel.style.top = '16px';
      panel.style.zIndex = '99999';
      panel.style.width = '420px';
      panel.style.maxHeight = '70vh';
      panel.style.overflow = 'auto';
      panel.style.padding = '12px';
      panel.style.background = 'rgba(17, 24, 39, 0.95)';
      panel.style.color = '#e5e7eb';
      panel.style.fontFamily = 'Consolas, monospace';
      panel.style.fontSize = '13px';
      panel.style.borderRadius = '10px';
      panel.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)';
      panel.innerHTML = '<div style="font-weight:700;margin-bottom:8px;">Visual API Demo (Playwright)</div><ul id="api-demo-logs" style="padding-left:18px;margin:0;"></ul>';
      document.body.appendChild(panel);
    });

    // Helper for writing visible logs in the page.
    const logStep = async (message) => {
      await page.evaluate((msg) => {
        const list = document.getElementById('api-demo-logs');
        const item = document.createElement('li');
        item.textContent = msg;
        item.style.marginBottom = '6px';
        list.appendChild(item);
      }, message);
    };

    // Step 3: Run API calls from browser page context so you can see progression.
    await logStep('GET /posts/1 -> starting');
    const getData = await page.evaluate(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const body = await response.json();
      return { status: response.status, body };
    });
    await logStep(`GET /posts/1 -> ${getData.status}`);

    await logStep('POST /posts -> starting');
    const postData = await page.evaluate(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Visual Post', body: 'Created in browser demo', userId: 7 })
      });
      const body = await response.json();
      return { status: response.status, body };
    });
    await logStep(`POST /posts -> ${postData.status}`);

    await logStep('PUT /posts/1 -> starting');
    const putData = await page.evaluate(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 1, title: 'Visual PUT', body: 'Updated fully', userId: 1 })
      });
      const body = await response.json();
      return { status: response.status, body };
    });
    await logStep(`PUT /posts/1 -> ${putData.status}`);
    // Sample response for PUT /posts/1 in this demo:
    // { id: 1, title: 'Visual PUT', body: 'Updated fully', userId: 1 }
    // You can see the actual response body in the browser window panel created by this test.

    await logStep('PATCH /posts/1 -> starting');
    const patchData = await page.evaluate(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Visual PATCH' })
      });
      const body = await response.json();
      return { status: response.status, body };
    });
    await logStep(`PATCH /posts/1 -> ${patchData.status}`);

    await logStep('DELETE /posts/1 -> starting');
    const deleteData = await page.evaluate(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE'
      });
      return { status: response.status };
    });
    await logStep(`DELETE /posts/1 -> ${deleteData.status}`);

    await logStep('Demo complete.');

    // Step 4: Validate each call worked as expected.
    expect(getData.status).toBe(200);
    expect(getData.body.id).toBe(1);

    expect(postData.status).toBe(201);
    expect(postData.body.title).toBe('Visual Post');

    expect(putData.status).toBe(200);
    expect(putData.body.title).toBe('Visual PUT');

    expect(patchData.status).toBe(200);
    expect(patchData.body.title).toBe('Visual PATCH');

    expect(deleteData.status).toBe(200);

    // Keep browser visible briefly so you can observe final log panel.
    await page.waitForTimeout(2500);
  });
});
