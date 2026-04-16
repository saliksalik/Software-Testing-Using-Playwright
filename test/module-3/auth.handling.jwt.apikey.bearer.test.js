const { test, expect, request } = require('@playwright/test');

// File purpose:
// Demonstrate authentication handling patterns: JWT, API key, and Bearer token.
// Team-lead scenario: "Validate all supported auth strategies before release and confirm headers are sent correctly."
// Why this matters:
// - Auth failures are high-impact production issues.
// - Different clients may use different auth mechanisms.
// API-specific behavior:
// - Uses httpbin.org because it echoes request data for easy validation.
// - /anything echoes headers and payload.
// - /bearer checks Bearer auth and returns authenticated=true for valid format.
// Sample response examples:
// - /anything -> { headers: { Authorization: 'Bearer ...', 'X-Api-Key': '...' }, ... }
// - /bearer -> { authenticated: true, token: '...' }
// Where to see real response:
// - Add console.log(responseBody) in each test.
// - For browser traffic, inspect Network tab in a browser-based test.
// Quick memory: JWT is often carried as Bearer token; API key is commonly a custom header.

test.describe('5.14 Authentication Handling: JWT, API Keys, and Bearer Tokens', () => {
  test('sends JWT-style Bearer token and validates header echo', async () => {
    // Step 1: Create isolated API context for external auth test endpoint.
    const api = await request.newContext({
      baseURL: 'https://httpbin.org'
    });

    // Step 2: Simulate JWT token format.
    const fakeJwt = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxYS11c2VyIn0.signature';

    // Step 3: Send request with Bearer token.
    const response = await api.get('/anything', {
      headers: {
        Authorization: `Bearer ${fakeJwt}`
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.headers.Authorization).toContain('Bearer ');
    expect(responseBody.headers.Authorization).toContain(fakeJwt);

    await api.dispose();
  });

  test('sends API key header and validates it is received', async () => {
    const api = await request.newContext({
      baseURL: 'https://httpbin.org'
    });

    const apiKey = 'qa-api-key-123';

    // Step 1: Send API key in custom header.
    const response = await api.get('/anything', {
      headers: {
        'x-api-key': apiKey
      }
    });

    // Step 2: Validate status and header propagation.
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.headers['X-Api-Key']).toBe(apiKey);

    await api.dispose();
  });

  test('validates bearer-auth endpoint behavior', async () => {
    const api = await request.newContext({
      baseURL: 'https://httpbin.org',
      extraHTTPHeaders: {
        Authorization: 'Bearer module3-token'
      }
    });

    // Step 1: Call endpoint that validates bearer token format.
    const response = await api.get('/bearer');

    // Step 2: Verify auth success response.
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    // Sample success response: { authenticated: true, token: 'module3-token' }
    expect(responseBody.authenticated).toBe(true);
    expect(responseBody.token).toBe('module3-token');

    await api.dispose();
  });
});
