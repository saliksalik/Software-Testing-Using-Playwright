const { test, expect } = require('@playwright/test');
const { writeFindingReport, failOnFindingsIfConfigured } = require('./security.helpers');

// Module 8: OWASP A05 Security Misconfiguration
//
// Easy explanation:
// - We check if sensitive default files are publicly exposed.
// - If these files are accessible, we report a finding.

test.describe('Module 8 - Sensitive File Exposure Checks', () => {
  test('checks common sensitive paths are not exposed', async ({ request }) => {
    const baseUrl = process.env.TARGET_WEB_URL || 'https://example.com';
    const targetRoot = baseUrl.replace(/\/$/, '');

    const sensitivePaths = [
      '/.env',
      '/.git/config',
      '/server-status',
      '/phpinfo.php'
    ];

    const secretIndicators = [
      'DB_PASSWORD',
      'AWS_SECRET_ACCESS_KEY',
      'BEGIN PRIVATE KEY',
      'root:x:0:0'
    ];

    const findings = [];

    for (const p of sensitivePaths) {
      const url = `${targetRoot}${p}`;
      const response = await request.get(url, { failOnStatusCode: false });
      const status = response.status();
      const body = await response.text();

      if (status >= 200 && status < 300) {
        findings.push({
          owasp: 'A05',
          severity: 'high',
          title: `Sensitive path exposed: ${p}`,
          evidence: `${url} returned ${status}`,
          recommendation: 'Disable public access to internal/sensitive files and endpoints.'
        });
      }

      const leakedToken = secretIndicators.find((token) => body.includes(token));
      if (leakedToken) {
        findings.push({
          owasp: 'A02',
          severity: 'critical',
          title: `Potential secret leakage on ${p}`,
          evidence: `Response contained token pattern: ${leakedToken}`,
          recommendation: 'Rotate exposed secrets immediately and block endpoint access.'
        });
      }
    }

    const report = writeFindingReport('sensitive file exposure checks', targetRoot, findings);
    console.log(`Security report JSON: ${report.jsonPath}`);
    console.log(`Security report MD: ${report.mdPath}`);

    failOnFindingsIfConfigured(findings);
    expect(Array.isArray(findings)).toBeTruthy();
  });
});
