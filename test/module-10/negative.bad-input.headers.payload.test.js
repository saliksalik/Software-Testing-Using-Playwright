const { test, expect } = require('@playwright/test');

// Module 10 focus: negative testing for malformed payloads and headers.

function validateRequest(payload, headers) {
  if (!headers || headers['x-api-version'] !== 'v1') {
    return { status: 400, code: 'BAD_HEADER', message: 'x-api-version header is required and must be v1' };
  }

  if (typeof payload !== 'object' || payload === null) {
    return { status: 400, code: 'MALFORMED_PAYLOAD', message: 'Payload must be object' };
  }

  if (!payload.orderId || !payload.userId) {
    return { status: 422, code: 'MISSING_FIELDS', message: 'orderId and userId are mandatory' };
  }

  return { status: 200, code: 'OK', message: 'valid' };
}

test.describe('Module 10 - Negative Validation', () => {
  test('returns BAD_HEADER for invalid version header', async () => {
    const result = validateRequest({ orderId: 'ORD-9', userId: 'U-101' }, { 'x-api-version': 'v2' });
    expect(result.status).toBe(400);
    expect(result.code).toBe('BAD_HEADER');
  });

  test('returns MALFORMED_PAYLOAD for invalid body', async () => {
    const result = validateRequest('string-not-json', { 'x-api-version': 'v1' });
    expect(result.status).toBe(400);
    expect(result.code).toBe('MALFORMED_PAYLOAD');
  });

  test('returns MISSING_FIELDS for partial body', async () => {
    const result = validateRequest({ orderId: 'ORD-9' }, { 'x-api-version': 'v1' });
    expect(result.status).toBe(422);
    expect(result.code).toBe('MISSING_FIELDS');
  });
});
