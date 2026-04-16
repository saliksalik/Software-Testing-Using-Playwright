const { test, expect } = require('@playwright/test');
const { FakeDatabase } = require('./db.simulator');

// Module 10 focus: observability + auditability.

function buildError(traceId, code, message) {
  return {
    status: 'error',
    traceId,
    error: {
      code,
      message
    },
    timestamp: new Date().toISOString()
  };
}

test.describe('Module 10 - Observability and Auditability', () => {
  test('error contract contains trace id and useful message', async () => {
    const body = buildError('trace-m10-err-1', 'ORDER_NOT_FOUND', 'Order id does not exist');

    expect(body.status).toBe('error');
    expect(body.traceId).toContain('trace-m10-');
    expect(body.error.code).toBe('ORDER_NOT_FOUND');
    expect(body.error.message.toLowerCase()).toContain('order');
  });

  test('audit log created when order is inserted', async () => {
    const db = FakeDatabase.fromSeedFile();

    db.insertOrder({ orderId: 'ORD-401', userId: 'U-101', amount: 3000, status: 'created' });

    const hasAudit = db.auditLogs.some((log) => log.action === 'ORDER_CREATED' && log.orderId === 'ORD-401');
    expect(hasAudit).toBeTruthy();
  });
});
