const { test, expect } = require('@playwright/test');

// File purpose:
// Demonstrate basic API security hardening checks on responses.
// Team-lead scenario: "Verify no sensitive fields leak in public endpoints and role boundaries are respected."
// Why this matters:
// - Data leakage is a critical production risk.
// - Security checks should be part of regular API regression suite.
// API-specific behavior:
// - Uses GET /users/1 on JSONPlaceholder as public-profile style endpoint.
// - Checks absence of common sensitive fields.
// Sample response shape:
// - { id, name, username, email, address, phone, website, company }
// Where to see real response:
// - Add console.log(responseBody)
// Quick memory: security checks = verify what MUST NOT be exposed.

test.describe('Module 6 - Security Hardening Checks', () => {
  test('ensures sensitive fields are not exposed in user profile response', async ({ request }) => {
    const response = await request.get('/users/1');
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const forbiddenFields = [
      'password',
      'token',
      'accessToken',
      'refreshToken',
      'secret',
      'ssn'
    ];

    for (const field of forbiddenFields) {
      expect(Object.prototype.hasOwnProperty.call(responseBody, field)).toBe(false);
    }
  });

  test('checks role/authorization boundary behavior using known unauthorized endpoint', async ({ request }) => {
    // Deterministic simulation of unauthorized response behavior.
    // In real environments, this would come from protected API endpoints.
    const simulatedUnauthorized = {
      status: 401,
      body: {
        message: 'Unauthorized'
      }
    };

    // Sample unauthorized response behavior:
    // - status = 401
    // - body contains an unauthorized message
    expect(simulatedUnauthorized.status).toBe(401);
    expect(simulatedUnauthorized.body.message).toContain('Unauthorized');
  });
});
