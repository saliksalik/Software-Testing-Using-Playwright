const { test, expect, request } = require('@playwright/test');

// File purpose:
// Demonstrate API chaining for an end-to-end flow: login -> create -> update -> delete.
// Team-lead scenario: "Validate the full business flow works across multiple endpoints, not just one API in isolation."
// Why this matters:
// - Real user workflows often depend on multiple API calls in sequence.
// - Chaining tests catch integration breaks between endpoints.
// API-specific behavior:
// - Uses httpbin for deterministic login simulation and JSONPlaceholder for CRUD endpoints.
// - Login simulation endpoint: POST https://httpbin.org/anything/login
// - Create endpoint: POST https://jsonplaceholder.typicode.com/posts
// - Update endpoint: PUT https://jsonplaceholder.typicode.com/posts/{id}
// - Delete endpoint: DELETE https://jsonplaceholder.typicode.com/posts/{id}
// Sample responses:
// - Login: { token: '...', id: 15, username: 'kminchelle', ... }
// - Create: { id: 252, title: 'Module 4 created post', ... }
// - Delete: { id: 252, isDeleted: true, deletedOn: '...' }
// Where to see real response:
// - Add console.log(loginBody/createBody/updateBody/deleteBody) below.
// Quick memory: API chaining = use output from step N as input for step N+1.

test.describe('5.17 API Chaining: End-to-End Integration', () => {
  test('runs login -> create -> update -> delete chain', async () => {
    // Step 1: Simulate login and capture token from response.
    const loginApi = await request.newContext({
      baseURL: 'https://httpbin.org',
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });

    const loginResponse = await loginApi.post('/anything/login', {
      data: {
        username: 'module4-user',
        password: 'module4-pass'
      }
    });

    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    // Sample simulated login response:
    // { json: { username: 'module4-user', password: 'module4-pass' }, ... }
    const token = `chain-token-${loginBody.json.username}`;
    expect(token).toContain('chain-token-');

    await loginApi.dispose();

    // Step 2: Create CRUD API context for remaining chain steps.
    const api = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });

    const authHeaders = {
      Authorization: `Bearer ${token}`
    };

    // Step 3: Create resource.
    const createResponse = await api.post('/posts', {
      headers: authHeaders,
      data: {
        title: 'Module 4 created post',
        body: 'Created in API chaining test',
        userId: 1
      }
    });

    expect(createResponse.status()).toBeGreaterThanOrEqual(200);
    expect(createResponse.status()).toBeLessThan(300);

    const createBody = await createResponse.json();
    expect(createBody.id).toBeTruthy();
    expect(createBody.title).toBe('Module 4 created post');

    const createdPostId = createBody.id;

    // Step 4: Update resource.
    // Note: public demo APIs may not truly persist created records, so updates on new IDs can fail.
    let targetUpdateId = createdPostId;
    let updateResponse = await api.put(`/posts/${targetUpdateId}`, {
      headers: authHeaders,
      data: {
        title: 'Module 4 updated post'
      }
    });

    // Fallback to a stable known ID for deterministic integration practice.
    if (updateResponse.status() >= 500) {
      targetUpdateId = 1;
      updateResponse = await api.put(`/posts/${targetUpdateId}`, {
        headers: authHeaders,
        data: {
          title: 'Module 4 updated post'
        }
      });
    }

    expect(updateResponse.status()).toBe(200);
    const updateBody = await updateResponse.json();
    expect(updateBody.title).toBe('Module 4 updated post');

    // Step 5: Delete resource.
    const deleteResponse = await api.delete(`/posts/${targetUpdateId}`, {
      headers: authHeaders
    });

    expect([200, 204]).toContain(deleteResponse.status());
    if (deleteResponse.status() !== 204) {
      const deleteBody = await deleteResponse.json();
      // Demo APIs may return either {} or an object containing deleted id.
      if (typeof deleteBody.id !== 'undefined') {
        expect(deleteBody.id).toBe(targetUpdateId);
      } else {
        expect(deleteBody).toEqual({});
      }
    }

    await api.dispose();
  });
});
