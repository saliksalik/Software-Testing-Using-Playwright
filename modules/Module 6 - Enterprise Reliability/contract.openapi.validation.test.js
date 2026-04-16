const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const { test, expect } = require('@playwright/test');

// File purpose:
// Validate live API response against an OpenAPI-defined contract schema.
// Team-lead scenario: "Catch breaking API contract changes before frontend consumers fail."
// Why this matters:
// - Prevents silent schema drift between backend and frontend.
// - Useful as a release gate for backward compatibility.
// API-specific behavior:
// - Endpoint: GET /posts/1 (JSONPlaceholder)
// - Contract source: modules/Module 6 - Enterprise Reliability/data/openapi.posts.v1.json
// Sample response:
// - { userId: 1, id: 1, title: '...', body: '...' }
// Where to see real response:
// - Add console.log(responseBody) below.
// Quick memory: Contract test = implementation must match documented schema.

test.describe('Module 6 - Contract Testing with OpenAPI', () => {
  test('validates GET /posts/1 against OpenAPI schema', async ({ request }) => {
    const specPath = path.join(__dirname, 'data', 'openapi.posts.v1.json');
    const openapiSpec = JSON.parse(fs.readFileSync(specPath, 'utf8'));

    const schema = openapiSpec.paths['/posts/{id}'].get.responses['200'].content['application/json'].schema;

    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);

    expect(valid, JSON.stringify(validate.errors || [])).toBe(true);
  });
});
