const { test, expect } = require('@playwright/test');
const { writeFindingReport, failOnFindingsIfConfigured } = require('./security.helpers');

// Module 8: OWASP A01 Broken Access Control
//
// Easy explanation:
// - We test if admin endpoints are blocked for anonymous users.
// - If admin URL is accessible without login, we create a high-severity finding.

test.describe('Module 8 - Access Control Checks', () => {
  test('verifies admin/protected endpoint is not publicly accessible', async ({ request }) => {
    const baseUrl = process.env.TARGET_WEB_URL || 'https://example.com';
    const protectedPath = process.env.PROTECTED_ADMIN_PATH || '/admin';
    const targetUrl = `${baseUrl.replace(/\/$/, '')}${protectedPath}`;

    const response = await request.get(targetUrl, { failOnStatusCode: false });
    const status = response.status();
    const findings = [];

    const isUnexpectedlyOpen = status >= 200 && status < 300;
    if (isUnexpectedlyOpen) {
      findings.push({
        owasp: 'A01',
        severity: 'critical',
        title: 'Protected endpoint accessible without authentication',
        evidence: `Anonymous GET ${targetUrl} returned ${status}`,
        recommendation: 'Enforce authentication and role-based authorization checks.'
      });
    }

    const report = writeFindingReport('access control check', targetUrl, findings);
    console.log(`Security report JSON: ${report.jsonPath}`);
    console.log(`Security report MD: ${report.mdPath}`);

    failOnFindingsIfConfigured(findings);
    expect(isUnexpectedlyOpen).toBeFalsy();
  });
});
