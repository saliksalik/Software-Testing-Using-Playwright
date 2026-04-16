const { test, expect } = require('@playwright/test');

// File purpose:
// This file teaches governance checks.
// Governance means: API behavior follows company-wide standards.
// Team-lead scenario:
// "Enforce one common error contract and status code policy across all teams."
// Why this matters:
// - Consistent APIs are easier for frontend and other consumers.
// - Random error shapes increase bugs and integration cost.
// API-specific behavior:
// - We simulate two service responses and verify they follow one error format.
// Standard error format we enforce:
// { code: 'SOME_CODE', message: 'human readable message', traceId: '...' }
// Where to see values:
// - Add console.log(serviceAError, serviceBError) if needed.
// Quick memory:
// Governance = same rules for every endpoint team.

test.describe('Module 7 - Governance and Error Contract Consistency', () => {
  test('validates standardized error contract shape', async () => {
    // Simulated Service A error payload.
    const serviceAError = {
      status: 400,
      body: {
        code: 'VALIDATION_ERROR',
        message: 'name is required',
        traceId: 'trace-a-100'
      }
    };

    // Simulated Service B error payload.
    const serviceBError = {
      status: 404,
      body: {
        code: 'NOT_FOUND',
        message: 'resource not found',
        traceId: 'trace-b-200'
      }
    };

    // Check policy: status must be non-2xx for errors.
    expect(serviceAError.status).toBeGreaterThanOrEqual(400);
    expect(serviceBError.status).toBeGreaterThanOrEqual(400);

    // Check policy: required error keys must exist.
    for (const err of [serviceAError.body, serviceBError.body]) {
      expect(err).toHaveProperty('code');
      expect(err).toHaveProperty('message');
      expect(err).toHaveProperty('traceId');
      expect(typeof err.code).toBe('string');
      expect(typeof err.message).toBe('string');
      expect(typeof err.traceId).toBe('string');
    }
  });

  test('validates status-code policy example', async () => {
    // Example policy map we expect teams to follow.
    const statusPolicy = {
      createSuccess: 201,
      validationFailure: 400,
      unauthorized: 401,
      notFound: 404,
      serverError: 500
    };

    expect(statusPolicy.createSuccess).toBe(201);
    expect(statusPolicy.validationFailure).toBe(400);
    expect(statusPolicy.unauthorized).toBe(401);
    expect(statusPolicy.notFound).toBe(404);
    expect(statusPolicy.serverError).toBe(500);
  });
});
