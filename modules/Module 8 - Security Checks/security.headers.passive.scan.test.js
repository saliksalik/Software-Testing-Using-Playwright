const { test, expect } = require('@playwright/test');
const { writeFindingReport, failOnFindingsIfConfigured } = require('./security.helpers');

// Module 8: SQA Security Checks for Web Applications
// Test focus: OWASP A05 Security Misconfiguration
//
// Easy explanation:
// - We call the target website home page.
// - We check if important security headers are present.
// - Missing headers are reported as findings.
// - A markdown + JSON report is generated automatically.

test.describe('Module 8 - Passive Security Header Scan', () => {
  test('checks important response security headers', async ({ request }) => {
    const targetUrl = process.env.TARGET_WEB_URL || 'https://example.com';
    const response = await request.get(targetUrl, { failOnStatusCode: false });

    expect(response.status()).toBeLessThan(500);

    const headers = response.headers();
    const findings = [];

    const requiredHeaders = [
      { key: 'content-security-policy', owasp: 'A05', severity: 'high', recommendation: 'Add a strict Content-Security-Policy.' },
      { key: 'x-frame-options', owasp: 'A05', severity: 'medium', recommendation: 'Add X-Frame-Options: DENY or SAMEORIGIN.' },
      { key: 'x-content-type-options', owasp: 'A05', severity: 'medium', recommendation: 'Add X-Content-Type-Options: nosniff.' },
      { key: 'strict-transport-security', owasp: 'A02', severity: 'high', recommendation: 'Add HSTS on HTTPS responses.' },
      { key: 'referrer-policy', owasp: 'A05', severity: 'low', recommendation: 'Set a safe Referrer-Policy.' },
      { key: 'permissions-policy', owasp: 'A05', severity: 'low', recommendation: 'Restrict browser features via Permissions-Policy.' }
    ];

    for (const header of requiredHeaders) {
      if (!headers[header.key]) {
        findings.push({
          owasp: header.owasp,
          severity: header.severity,
          title: `Missing header: ${header.key}`,
          evidence: `Header not present on ${targetUrl}`,
          recommendation: header.recommendation
        });
      }
    }

    const report = writeFindingReport('security headers passive scan', targetUrl, findings);
    console.log(`Security report JSON: ${report.jsonPath}`);
    console.log(`Security report MD: ${report.mdPath}`);

    failOnFindingsIfConfigured(findings);
    expect(Array.isArray(findings)).toBeTruthy();
  });
});
