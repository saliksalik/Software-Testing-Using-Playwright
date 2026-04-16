const { test, expect } = require('@playwright/test');
const { FakeDatabase } = require('./db.simulator');

// Module 10 focus: authentication + authorization with role checks and token expiry.

function login(db, email) {
  const user = db.getUserByEmail(email);
  if (!user) {
    return null;
  }

  return {
    userId: user.id,
    role: user.role,
    token: `token-${user.id.toLowerCase()}`,
    expiresAt: Date.now() + 30_000
  };
}

function isExpired(expiresAt, now = Date.now()) {
  return now >= expiresAt;
}

function accessAdmin(session) {
  if (!session) {
    return 401;
  }
  if (isExpired(session.expiresAt)) {
    return 401;
  }
  return session.role === 'admin' ? 200 : 403;
}

test.describe('Module 10 - Auth and RBAC', () => {
  test('blocks admin route for normal user', async () => {
    const db = FakeDatabase.fromSeedFile();
    const buyerSession = login(db, 'buyer@shop.test');

    expect(accessAdmin(buyerSession)).toBe(403);
  });

  test('allows admin route for admin user', async () => {
    const db = FakeDatabase.fromSeedFile();
    const adminSession = login(db, 'admin@shop.test');

    expect(accessAdmin(adminSession)).toBe(200);
  });

  test('rejects expired token', async () => {
    const db = FakeDatabase.fromSeedFile();
    const adminSession = login(db, 'admin@shop.test');
    adminSession.expiresAt = Date.now() - 1000;

    expect(accessAdmin(adminSession)).toBe(401);
  });
});
