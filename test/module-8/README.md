# Module 8 - Web Security Checks for SQA

This module helps an SQA team run practical, automated web security checks aligned to OWASP Top 10.

Important:
- Use only on systems where you have explicit written permission.
- This is DAST-style automation for common security regressions.
- It does not replace manual pentesting for business logic and advanced attack chains.

## Files

- `security.headers.passive.scan.test.js`
- `security.authz.access-control.test.js`
- `security.injection.probes.test.js`
- `security.sensitive-files.exposure.test.js`
- `security.helpers.js`

## Default behavior

- Tests generate JSON and Markdown reports inside `test/module-8/output`.
- Tests do not fail just because findings exist.
- To enforce fail-on-high/critical findings, set `SECURITY_GATE_ENABLED=true`.

## PowerShell examples

Run scan on your target:

$env:TARGET_WEB_URL="https://your-approved-site.example"
npm run security:scan

Enable release gate:

$env:TARGET_WEB_URL="https://your-approved-site.example"
$env:SECURITY_GATE_ENABLED="true"
npm run security:scan

Optional admin route check path override:

$env:TARGET_WEB_URL="https://your-approved-site.example"
$env:PROTECTED_ADMIN_PATH="/admin/dashboard"
npm run security:scan

## Jira reporting options

1) CSV import flow (simple and reliable)

- Run scan first.
- Then generate Jira CSV:

npm run security:jira:csv

This creates:
- `test/module-8/output/jira-import.csv`

2) Direct Jira API issue creation

Set env vars in PowerShell:

$env:JIRA_BASE_URL="https://your-org.atlassian.net"
$env:JIRA_EMAIL="you@company.com"
$env:JIRA_API_TOKEN="your_token"
$env:JIRA_PROJECT_KEY="SEC"

Then run:

npm run security:jira:push
