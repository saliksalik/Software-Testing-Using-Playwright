const { test, expect } = require('@playwright/test');

// Module 9: Backend SQA Skill - Integration Testing
//
// Easy explanation:
// - We simulate service-to-service flow.
// - We test third-party timeout behavior and retry logic.

async function fakeThirdPartyCall(attempt) {
  // First call fails with timeout-like error, second succeeds.
  if (attempt === 1) {
    throw new Error('TIMEOUT');
  }

  return { status: 200, paymentId: 'PAY-701', provider: 'third-party-gateway' };
}

async function callWithRetry(maxAttempts) {
  let attempt = 0;
  let lastError;

  while (attempt < maxAttempts) {
    attempt += 1;
    try {
      const result = await fakeThirdPartyCall(attempt);
      return { attempt, result };
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError;
}

test.describe('Module 9 - Integration Testing', () => {
  test('validates retry behavior after timeout', async () => {
    const output = await callWithRetry(3);

    expect(output.attempt).toBe(2);
    expect(output.result.status).toBe(200);
    expect(output.result.provider).toContain('third-party');
  });

  test('validates order flow across internal services', async () => {
    // Simulated microservice flow:
    // Order Service -> Inventory Service -> Payment Service
    const orderService = { orderId: 'ORD-9001', items: 2 };
    const inventoryService = { reserved: true, reservationId: 'RES-81' };
    const paymentService = { paid: true, paymentId: 'PAY-81' };

    expect(orderService.orderId).toContain('ORD-');
    expect(inventoryService.reserved).toBeTruthy();
    expect(paymentService.paid).toBeTruthy();
  });
});
