const { test, expect } = require('@playwright/test');

// File purpose:
// Validate nested objects and arrays deeply, not just top-level fields.
// Team-lead scenario: "Ensure user profile and nested address/company structure remains backward-compatible."
// Why this matters:
// - Many real APIs return complex nested payloads.
// - Bugs often hide in nested keys or array item shapes.
// API-specific behavior:
// - Endpoints used:
//   1) GET /users/1 (nested address and company)
//   2) GET /posts/1/comments (array of comment objects)
// Sample nested response bits:
// - user.address.geo.lat
// - user.company.name
// - comments[0].email
// Where to see real response:
// - Add console.log(userBody) / console.log(commentsBody) below.
// Quick memory: Top-level check is not enough; verify nested paths and array item structure.

test.describe('5.11 Validating Nested JSON Objects and Arrays', () => {
  test('validates nested user object and comments array structure', async ({ request }) => {
    // Step 1: Validate nested object structure from /users/1.
    const userResponse = await request.get('/users/1');
    expect(userResponse.status()).toBe(200);

    const userBody = await userResponse.json();
    // Example user response fragment:
    // {
    //   id: 1,
    //   address: { geo: { lat: '-37.3159', lng: '81.1496' } },
    //   company: { name: 'Romaguera-Crona' }
    // }
    // Where to see real response: console.log(userBody)
    expect(userBody).toHaveProperty('id');
    expect(userBody).toHaveProperty('address');
    expect(userBody).toHaveProperty('address.street');
    expect(userBody).toHaveProperty('address.geo');
    expect(userBody).toHaveProperty('address.geo.lat');
    expect(userBody).toHaveProperty('company');
    expect(userBody).toHaveProperty('company.name');

    // Step 2: Validate nested array item structure from /posts/1/comments.
    const commentsResponse = await request.get('/posts/1/comments');
    expect(commentsResponse.status()).toBe(200);

    const commentsBody = await commentsResponse.json();
    // Example comments response fragment:
    // [ { postId: 1, id: 1, name: '...', email: '...', body: '...' }, ... ]
    // Where to see real response: console.log(commentsBody)
    expect(Array.isArray(commentsBody)).toBe(true);
    expect(commentsBody.length).toBeGreaterThan(0);

    const firstComment = commentsBody[0];
    expect(firstComment).toHaveProperty('postId');
    expect(firstComment).toHaveProperty('id');
    expect(firstComment).toHaveProperty('name');
    expect(firstComment).toHaveProperty('email');
    expect(firstComment).toHaveProperty('body');
  });
});
