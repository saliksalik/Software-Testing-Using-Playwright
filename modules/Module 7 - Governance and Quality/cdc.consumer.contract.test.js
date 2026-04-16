const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const { test, expect } = require('@playwright/test');

// File purpose:
// This file teaches Consumer-Driven Contract (CDC) testing.
// CDC means: the consumer defines needed fields, provider must satisfy them.
// Team-lead scenario:
// "Do not break mobile/web clients when backend changes payload fields."
// Why this matters:
// - Prevents accidental breaking API changes.
// - Gives clear contract ownership between teams.
// API-specific behavior:
// - Contract file: modules/Module 7 - Governance and Quality/data/consumer.contract.user.v1.json
// - Provider payload in this demo is simulated.
// Sample payload:
// { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' }
// Where to see values:
// - Add console.log(providerPayload)
// Quick memory:
// Consumer says what it needs; provider must not remove those fields.

test.describe('Module 7 - Consumer-Driven Contract Testing', () => {
  test('validates provider payload against consumer contract', async () => {
    // Build full path to contract file.
    const contractPath = path.join(__dirname, 'data', 'consumer.contract.user.v1.json');

    // Read and parse contract schema.
    const contractSchema = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

    // Simulated provider payload (what backend returns).
    const providerPayload = {
      id: 1,
      name: 'Leanne Graham',
      email: 'leanne@example.com',
      // Extra fields are allowed due to additionalProperties=true in contract.
      metadata: {
        source: 'provider-v2'
      }
    };

    // Compile and run AJV validation.
    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(contractSchema);
    const isValid = validate(providerPayload);

    // Assert contract pass/fail with meaningful details.
    expect(isValid, JSON.stringify(validate.errors || [])).toBe(true);
  });
});
