const { test, expect } = require('@playwright/test');

// Module 9: Backend SQA Skill - Observability
//
// Easy explanation:
// - We validate trace IDs, log expectations, and error contract usefulness.

function buildErrorResponse({ traceId, code, message }) {
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

function logLineContainsTraceId(logLine, traceId) {
  return logLine.includes(traceId);
}

test.describe('Module 9 - Observability', () => {
  test('ensures error contract includes traceId and clear message', async () => {
    const response = buildErrorResponse({
      traceId: 'trace-mod9-7001',
      code: 'ORDER_NOT_FOUND',
      message: 'Order was not found for provided id'
    });

    expect(response.status).toBe('error');
    expect(response.traceId).toContain('trace-mod9-');
    expect(response.error.code).toBe('ORDER_NOT_FOUND');
    expect(response.error.message.toLowerCase()).toContain('not found');
  });

  test('ensures logs contain traceId for troubleshooting', async () => {
    const traceId = 'trace-mod9-7002';
    const simulatedLog = `[ERROR] traceId=${traceId} endpoint=/orders/999 message=order missing`;

    expect(logLineContainsTraceId(simulatedLog, traceId)).toBeTruthy();
  });
});
