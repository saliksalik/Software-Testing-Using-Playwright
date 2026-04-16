const { test, expect } = require('@playwright/test');

// File purpose:
// Demonstrate versioning and backward compatibility checks.
// Team-lead scenario: "Ensure v2 API changes do not break clients still expecting v1 fields."
// Why this matters:
// - API version migration is a common source of regressions.
// - Backward compatibility tests protect existing consumers.
// API-specific behavior:
// - Uses a live v1 baseline from GET /posts/1.
// - Simulates v2 shape with extra metadata field.
// Sample payloads:
// - v1: { id, userId, title, body }
// - v2: { id, userId, title, body, metadata: { apiVersion: 'v2' } }
// Where to see real values:
// - Add console.log({ v1Body, v2Body })
// Quick memory: versioned APIs can add fields safely if required old fields remain stable.

test.describe('Module 6 - Versioning and Backward Compatibility', () => {
  test('validates v1 required fields remain available in v2-compatible payload', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);

    const v1Body = await response.json();

    // Simulated v2 payload derived from v1 + new additive field.
    const v2Body = {
      ...v1Body,
      metadata: {
        apiVersion: 'v2'
      }
    };

    // Backward compatibility assertions:
    expect(v2Body).toHaveProperty('id');
    expect(v2Body).toHaveProperty('userId');
    expect(v2Body).toHaveProperty('title');
    expect(v2Body).toHaveProperty('body');

    // v2-specific additive field assertion:
    expect(v2Body.metadata.apiVersion).toBe('v2');
  });
});
