const { test, expect } = require('@playwright/test');

// Module 9: Backend SQA Skill - Database Validation
//
// Easy explanation:
// - We verify data is saved, duplicates are blocked, rollback works, and final state stays consistent.

class InMemoryOrderRepo {
  constructor() {
    this.records = new Map();
  }

  create(order) {
    if (this.records.has(order.orderId)) {
      throw new Error('DUPLICATE_ORDER_ID');
    }
    this.records.set(order.orderId, order);
    return order;
  }

  get(orderId) {
    return this.records.get(orderId) || null;
  }

  beginTransaction() {
    return new Map(this.records);
  }

  rollback(snapshot) {
    this.records = new Map(snapshot);
  }
}

test.describe('Module 9 - Database Validation', () => {
  test('saves data correctly and blocks duplicates', async () => {
    const repo = new InMemoryOrderRepo();

    repo.create({ orderId: 'ORD-5001', amount: 500, status: 'NEW' });
    const saved = repo.get('ORD-5001');

    expect(saved).toBeTruthy();
    expect(saved.amount).toBe(500);

    expect(() => {
      repo.create({ orderId: 'ORD-5001', amount: 999, status: 'NEW' });
    }).toThrow('DUPLICATE_ORDER_ID');
  });

  test('restores consistency after rollback', async () => {
    const repo = new InMemoryOrderRepo();
    repo.create({ orderId: 'ORD-6001', amount: 100, status: 'NEW' });

    const snapshot = repo.beginTransaction();

    // Simulate partial update before failure.
    repo.create({ orderId: 'ORD-6002', amount: 200, status: 'NEW' });

    // Something fails, so we rollback.
    repo.rollback(snapshot);

    expect(repo.get('ORD-6001')).toBeTruthy();
    expect(repo.get('ORD-6002')).toBeNull();
  });
});
