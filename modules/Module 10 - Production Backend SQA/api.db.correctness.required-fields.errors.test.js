const { test, expect } = require('@playwright/test');
const { FakeDatabase } = require('./db.simulator');

// Module 10: Production-style backend SQA
// Focus: API correctness + required fields + useful error format with DB-backed flow.

function createOrderApi(db, payload, traceId = 'trace-m10-1001') {
  if (!payload || typeof payload !== 'object') {
    return { status: 400, body: { status: 'error', traceId, error: { code: 'MALFORMED_PAYLOAD', message: 'Payload must be JSON object' } } };
  }

  if (!payload.orderId || !payload.userId || typeof payload.amount !== 'number') {
    return { status: 422, body: { status: 'error', traceId, error: { code: 'MISSING_FIELDS', message: 'orderId, userId, amount are required' } } };
  }

  try {
    db.insertOrder({ orderId: payload.orderId, userId: payload.userId, amount: payload.amount, status: 'created' });
  } catch (err) {
    return { status: 409, body: { status: 'error', traceId, error: { code: err.message, message: 'Data constraint violation' } } };
  }

  return {
    status: 201,
    body: {
      status: 'success',
      traceId,
      data: {
        orderId: payload.orderId,
        amount: payload.amount
      }
    }
  };
}

test.describe('Module 10 - API Correctness with DB-backed flow', () => {
  test('creates order with correct schema and status', async () => {
    const db = FakeDatabase.fromSeedFile();
    const response = createOrderApi(db, { orderId: 'ORD-101', userId: 'U-101', amount: 900 });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.traceId).toContain('trace-m10-');
    expect(response.body.data.orderId).toBe('ORD-101');
  });

  test('returns field error for incomplete payload', async () => {
    const db = FakeDatabase.fromSeedFile();
    const response = createOrderApi(db, { orderId: 'ORD-102', amount: 500 });

    expect(response.status).toBe(422);
    expect(response.body.error.code).toBe('MISSING_FIELDS');
  });
});
