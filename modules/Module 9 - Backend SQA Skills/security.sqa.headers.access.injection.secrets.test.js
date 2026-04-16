const { test, expect } = require('@playwright/test');

// Module 9: Backend SQA Skill - Security Checks (SQA level)
//
// Easy explanation:
// - We validate security headers, access controls, injection handling, and secret leakage checks.
// - This is automation-friendly security validation, not deep manual pentesting.

function evaluateSecurityResponse(response) {
  const findings = [];

  if (!response.headers['content-security-policy']) {
    findings.push({ area: 'headers', severity: 'high', issue: 'Missing CSP header' });
  }

  if (response.adminAccessStatus === 200) {
    findings.push({ area: 'access-control', severity: 'critical', issue: 'Admin endpoint exposed to non-admin' });
  }

  if (response.reflectedPayload && response.reflectedPayload.includes('<script>')) {
    findings.push({ area: 'injection', severity: 'high', issue: 'Potential reflected script payload' });
  }

  if (/(SECRET|PRIVATE KEY|PASSWORD)/i.test(response.bodyText || '')) {
    findings.push({ area: 'secret-exposure', severity: 'critical', issue: 'Sensitive token pattern found in response' });
  }

  return findings;
}

test.describe('Module 9 - SQA Security Checks', () => {
  test('flags security weaknesses from backend behavior snapshot', async () => {
    const simulatedResponse = {
      headers: {
        'x-content-type-options': 'nosniff'
      },
      adminAccessStatus: 403,
      reflectedPayload: 'safe output',
      bodyText: 'public content only'
    };

    const findings = evaluateSecurityResponse(simulatedResponse);

    // In this sample, only CSP is missing.
    expect(findings.length).toBe(1);
    expect(findings[0].issue).toContain('CSP');
  });
});
