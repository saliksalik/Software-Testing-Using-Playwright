const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const schema = require('./data/api-response-schema.json');

// Module 9: Backend SQA Skill - API Correctness
//
// Easy explanation:
// - We validate status code, response schema, required fields, and error shape.
// - This mirrors what backend SQA jobs usually ask in API validation rounds.

test.describe('Module 9 - API Correctness', () => {
  test('validates success response contract and required fields', async () => {
    // Simulated backend response for a successful order API call.
    const statusCode = 200;
    const responseBody = {
      status: 'success',
      message: 'Order fetched successfully',
      traceId: 'trace-9012',
      data: {
        orderId: 'ORD-1001',
        total: 2499.5
      }
    };

    expect(statusCode).toBe(200);
    expect(responseBody.status).toBe('success');
    expect(responseBody.message.length).toBeGreaterThan(0);

    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);

    expect(valid, `Schema errors: ${JSON.stringify(validate.errors)}`).toBeTruthy();
  });

  test('validates error response format and helpful message', async () => {
    const statusCode = 400;
    const errorBody = {
      status: 'error',
      message: 'Invalid order id format',
      traceId: 'trace-9013',
      data: {
        orderId: 'N/A',
        total: 0
      },
      errors: [
        { code: 'VALIDATION_ERROR', message: 'orderId must match ORD-<number>' }
      ]
    };

    expect(statusCode).toBe(400);
    expect(errorBody.status).toBe('error');
    expect(errorBody.errors[0].code).toBe('VALIDATION_ERROR');
    expect(errorBody.errors[0].message.toLowerCase()).toContain('orderid');

    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(errorBody);

    expect(valid, `Schema errors: ${JSON.stringify(validate.errors)}`).toBeTruthy();
  });
});
