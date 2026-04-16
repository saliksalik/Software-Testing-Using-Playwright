const { test, expect } = require('@playwright/test');

// Module 9: Backend SQA Skill - Authentication and Authorization
//
// Easy explanation:
// - We test login, token expiry, role checks, and admin access blocking.

function login(username, password) {
  if (username === 'qa.user' && password === 'Pass@123') {
    return {
      token: 'token-abc-123',
      expiresAt: Date.now() + 60 * 1000,
      role: 'user'
    };
  }

  return null;
}

function isTokenExpired(expiresAt, now = Date.now()) {
  return now >= expiresAt;
}

function canAccessAdmin(role) {
  return role === 'admin';
}

test.describe('Module 9 - Authentication and Authorization', () => {
  test('validates login success and token not expired', async () => {
    const session = login('qa.user', 'Pass@123');

    expect(session).toBeTruthy();
    expect(session.token).toContain('token-');
    expect(isTokenExpired(session.expiresAt, Date.now())).toBeFalsy();
  });

  test('blocks admin endpoint for non-admin role', async () => {
    const session = login('qa.user', 'Pass@123');

    // Simulate endpoint policy check.
    const allowed = canAccessAdmin(session.role);
    expect(allowed).toBeFalsy();
  });

  test('detects expired token', async () => {
    const expiredAt = Date.now() - 1000;
    expect(isTokenExpired(expiredAt, Date.now())).toBeTruthy();
  });
});
