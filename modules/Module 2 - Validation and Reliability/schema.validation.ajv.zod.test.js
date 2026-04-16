const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const { z } = require('zod');

// File purpose:
// Validate API response structure using two popular validators: AJV and Zod.
// Team-lead scenario: "Before release, confirm response contracts cannot break frontend deserialization."
// Why this matters:
// - Schema checks catch missing or wrong-typed fields early.
// - Contract tests reduce integration bugs across teams.
// API-specific behavior:
// - Endpoint used: GET /posts/1
// - Sample response:
//   { userId: 1, id: 1, title: '...', body: '...' }
// Where to see real response:
// - Add console.log(responseBody) below, or inspect request in a browser-based demo.
// Quick memory: AJV = JSON Schema validator, Zod = code-first runtime schema validator.

test.describe('5.10 Schema Validation using AJV and Zod', () => {
  test('validates post response schema with AJV and Zod', async ({ request }) => {
    // Step 1: Fetch a post object.
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    // Example response from this test:
    // { userId: 1, id: 1, title: '...', body: '...' }
    // Where to see real response:
    // - Add: console.log(responseBody)
    // - Or inspect this call in the visual browser demo file.

    // Step 2: AJV validation using JSON Schema.
    const ajv = new Ajv({ allErrors: true, strict: false });
    const postJsonSchema = {
      type: 'object',
      properties: {
        userId: { type: 'number' },
        id: { type: 'number' },
        title: { type: 'string' },
        body: { type: 'string' }
      },
      required: ['userId', 'id', 'title', 'body'],
      additionalProperties: true
    };

    const validateWithAjv = ajv.compile(postJsonSchema);
    const isAjvValid = validateWithAjv(responseBody);
    expect(isAjvValid, JSON.stringify(validateWithAjv.errors || [])).toBe(true);

    // Step 3: Zod validation using code-first schema.
    const postZodSchema = z.object({
      userId: z.number(),
      id: z.number(),
      title: z.string(),
      body: z.string()
    });

    const zodResult = postZodSchema.safeParse(responseBody);
    expect(zodResult.success, JSON.stringify(zodResult.error?.issues || [])).toBe(true);
  });
});
