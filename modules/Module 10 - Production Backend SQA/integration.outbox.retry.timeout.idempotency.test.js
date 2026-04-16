const { test, expect } = require('@playwright/test');
const { FakeDatabase } = require('./db.simulator');

// Module 10 focus: integration reliability with outbox, retry, and idempotency mindset.

test.describe('Module 10 - Integration Reliability', () => {
  test('delivers outbox event after retry and empties queue', async () => {
    const db = FakeDatabase.fromSeedFile();

    db.insertOrder({ orderId: 'ORD-301', userId: 'U-101', amount: 1500, status: 'created' });
    const delivered = db.processOutboxWithRetry(3);

    expect(delivered.length).toBeGreaterThan(0);
    expect(delivered[0].type).toBe('ORDER_CREATED_EVENT');
    expect(db.outbox.length).toBe(0);
  });

  test('idempotent consumer simulation ignores duplicate event ids', async () => {
    const processed = new Set();

    function consume(event) {
      if (processed.has(event.eventId)) {
        return { status: 'ignored' };
      }
      processed.add(event.eventId);
      return { status: 'processed' };
    }

    const first = consume({ eventId: 'EV-11', orderId: 'ORD-301' });
    const second = consume({ eventId: 'EV-11', orderId: 'ORD-301' });

    expect(first.status).toBe('processed');
    expect(second.status).toBe('ignored');
    expect(processed.size).toBe(1);
  });
});
