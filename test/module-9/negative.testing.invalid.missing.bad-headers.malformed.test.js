const { test, expect } = require('@playwright/test');

// Module 9: Backend SQA Skill - Negative Testing
//
// Easy explanation:
// - We validate behavior for invalid payloads, missing fields, bad headers, malformed inputs.

function validateCreateUserRequest(payload, headers) {
  if (!headers || headers['content-type'] !== 'application/json') {
    return { status: 415, error: 'UNSUPPORTED_MEDIA_TYPE' };
  }

  if (!payload || typeof payload !== 'object') {
    return { status: 400, error: 'MALFORMED_PAYLOAD' };
  }

  if (!payload.email || !payload.name) {
    return { status: 422, error: 'MISSING_REQUIRED_FIELDS' };
  }

  if (!payload.email.includes('@')) {
    return { status: 422, error: 'INVALID_EMAIL' };
  }

  return { status: 201, ok: true };
}

test.describe('Module 9 - Negative Testing', () => {
  test('returns 422 for missing required fields', async () => {
    const result = validateCreateUserRequest({ email: 'qa@demo.com' }, { 'content-type': 'application/json' });

    expect(result.status).toBe(422);
    expect(result.error).toBe('MISSING_REQUIRED_FIELDS');
  });

  test('returns 415 for bad content-type header', async () => {
    const result = validateCreateUserRequest({ email: 'qa@demo.com', name: 'QA' }, { 'content-type': 'text/plain' });

    expect(result.status).toBe(415);
    expect(result.error).toBe('UNSUPPORTED_MEDIA_TYPE');
  });

  test('returns 400 for malformed payload', async () => {
    const result = validateCreateUserRequest('not-a-json-object', { 'content-type': 'application/json' });

    expect(result.status).toBe(400);
    expect(result.error).toBe('MALFORMED_PAYLOAD');
  });
});
