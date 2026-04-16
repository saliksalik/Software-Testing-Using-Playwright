const { test, expect } = require('@playwright/test');
const { writeFindingReport, failOnFindingsIfConfigured } = require('./security.helpers');

// Module 8: OWASP A03 Injection (safe SQA probes)
//
// Easy explanation:
// - We send harmless test payloads in query parameters.
// - We check for obvious dangerous reflection patterns.
// - This is not a full pentest. It is a regression safety check.

test.describe('Module 8 - Injection Probe Checks', () => {
  test('sends safe payload probes and checks response behavior', async ({ request }) => {
    const baseUrl = process.env.TARGET_WEB_URL || 'https://example.com';
    const probePath = process.env.PROBE_PATH || '/search';
    const targetUrl = `${baseUrl.replace(/\/$/, '')}${probePath}`;

    const probes = [
      "' OR '1'='1",
      '<script>alert(1)</script>',
      '../../etc/passwd'
    ];

    const findings = [];

    for (const probe of probes) {
      const response = await request.get(targetUrl, {
        failOnStatusCode: false,
        params: { q: probe }
      });

      const status = response.status();
      const text = await response.text();

      if (status >= 500) {
        findings.push({
          owasp: 'A03',
          severity: 'high',
          title: 'Server error during injection probe',
          evidence: `GET ${targetUrl}?q=<payload> returned ${status}`,
          recommendation: 'Harden input validation and error handling for malicious input.'
        });
      }

      if (text.includes('<script>alert(1)</script>')) {
        findings.push({
          owasp: 'A03',
          severity: 'high',
          title: 'Reflected script payload observed',
          evidence: 'Raw script payload reflected in response body.',
          recommendation: 'Encode output and validate user-controlled input.'
        });
      }
    }

    const report = writeFindingReport('injection probe checks', targetUrl, findings);
    console.log(`Security report JSON: ${report.jsonPath}`);
    console.log(`Security report MD: ${report.mdPath}`);

    failOnFindingsIfConfigured(findings);
    expect(Array.isArray(findings)).toBeTruthy();
  });
});
