const { test, expect } = require('@playwright/test');

// File purpose:
// Use this to test partial updates where only changed fields are sent.
// Team-lead scenario: "Validate quick field edit endpoint (example: title/status only)."
// Why this matters:
// - PATCH is for small edits without resending the full object.
// - It is often used in UI forms and partial update flows.
// API-specific behavior:
// - PATCH /posts/1 should update only the supplied fields.
// - The server may merge the change into the existing resource.
// Quick memory: PATCH = partial change, update only what changed.

test.describe('PATCH request for partial resource update', () => {
  test('updates only one field using PATCH', async ({ request }) => {
    // Steps to learn:
    // 1. Open DevTools Network tab.
    // 2. Run this test and inspect the PATCH request body.
    // 3. Confirm only the title field is sent for partial update.

    const payload = {
      title: 'Patched Title'
    };

    // Step 1: Send partial update payload.
    const response = await request.patch('/posts/1', { data: payload });

    // Step 2: Validate update success.
    expect(response.status()).toBe(200);

    // Step 3: Ensure changed field is reflected in response.
    const responseBody = await response.json();
    // Sample response body:
    // { id: 1, title: 'Patched Title', body: '...', userId: 1 }
    // Where to see it: add console.log(responseBody) or inspect the browser demo.
    expect(responseBody).toMatchObject({ title: 'Patched Title' });
    expect(responseBody.id).toBe(1);
  });
});
