const { test, expect } = require('@playwright/test');
const { FakeDatabase } = require('./db.simulator');

// Module 10 focus: data persistence, rollback, and consistency checks.

test.describe('Module 10 - Database Transactions and Consistency', () => {
  test('keeps only committed data after rollback', async () => {
    const db = FakeDatabase.fromSeedFile();

    const snapshot = db.beginTransaction();

    try {
      db.insertOrder({ orderId: 'ORD-200', userId: 'U-101', amount: 2000, status: 'created' });
      db.insertOrder({ orderId: 'ORD-200', userId: 'U-101', amount: 2500, status: 'created' });
    } catch (err) {
      db.rollback(snapshot);
    }

    expect(db.getOrder('ORD-200')).toBeNull();
    expect(db.getOrder('ORD-100')).toBeTruthy();
  });

  test('blocks duplicate user email constraint', async () => {
    const db = FakeDatabase.fromSeedFile();

    expect(() => {
      db.insertUser({ id: 'U-999', email: 'buyer@shop.test', role: 'user', status: 'active' });
    }).toThrow('UNIQUE_EMAIL_VIOLATION');
  });
});
