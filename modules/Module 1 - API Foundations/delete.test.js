const { test, expect } = require('@playwright/test');

// File purpose:
// Use this to validate delete operation behavior and post-delete verification flow.
// Team-lead scenario: "Ensure delete endpoint returns success and system behavior is documented."
// Why this matters:
// - It verifies removal of resources and ensures delete semantics are correct.
// - It helps catch APIs that accept delete requests but do not actually remove data.
// API-specific behavior:
// - DELETE /posts/1 should remove the resource with id 1.
// - Real APIs often return 204 No Content; this demo returns 200.
// - Follow-up GET usually returns 404 in a real system.
// Quick memory: DELETE = remove resource, then verify it is gone.

test.describe('DELETE request and validating deletion logic', () => {
  test('deletes a post and checks delete behavior', async ({ request }) => {
    // Steps to learn:
    // 1. Open DevTools Network tab.
    // 2. Run this test and inspect the DELETE request method and status.
    // 3. Review the GET response after delete.

    // Step 1: Send DELETE request.
    // '/posts/1' means delete the post resource with id = 1.
    // The actual request URL becomes:
    // https://jsonplaceholder.typicode.com/posts/1
    const response = await request.delete('/posts/1');
    expect(response.status()).toBe(200);
    // Sample delete response: status 200 or 204, often no body.
    // Where to see it: run the test with console logging or inspect the browser demo request/response.

    // Step 2: Perform follow-up GET to verify deletion.
    // In a real API, this GET would often return 404 after a successful delete.
    // This specific demo API is fake, so it may still return 200 and a body.
    const verify = await request.get('/posts/1');
    expect(verify.status()).toBe(200);

    // Step 3: Validate behavior of this demo API.
    // Sample GET response body: { id: 1, title: '...', body: '...', userId: 1 }
    // In a real delete test, you would expect 404 or a missing resource.

    // Step 3: Validate behavior of this demo API.
    // For a real delete test, you would check that the resource is gone.
    const verifyBody = await verify.json();
    expect(verifyBody).toHaveProperty('id', 1);
  });
});
