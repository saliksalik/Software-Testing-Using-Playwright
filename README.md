# API Testing Practice

This project now uses Playwright Test for API testing. Each test file covers one API concept with detailed comments for learning.

## What This Repository Is About 🚀

This is a complete backend-focused Software Testing Engineer learning journey built with Playwright.

Instead of only writing basic CRUD checks, this repository grows module by module into a practical SQA framework that covers real job skills:

- API correctness and contract validation ✅
- Business logic and workflow validation 🧠
- Authentication/authorization and session behavior 🔐
- Integration reliability and retry strategies 🔁
- Data-driven execution and CI/CD quality gates ⚙️
- Security checks aligned to OWASP-style testing 🛡️
- Observability, trace IDs, governance, and reporting 📊

The goal is simple:
learn the full backend testing mindset from intern level to production-style SQA practices.

## Module Journey (What You Are Doing In Detail) 🗺️

### Module 1 - API Foundations
- Learn HTTP methods end-to-end: GET, POST, PUT, PATCH, DELETE.
- Build confidence with request body, headers, query params, and response assertions.
- Use the visual browser API demo to connect backend calls with visible behavior.

### Module 2 - Validation and Reliability Basics
- Validate response schema using AJV and Zod.
- Assert nested JSON fields safely.
- Practice negative testing and response-time checks.

### Module 3 - Auth and Session Management
- Validate token-based flows (JWT/API key/Bearer concepts).
- Reuse login state with storageState.
- Test cookie and header behavior in secure scenarios.

### Module 4 - Integration and Mocking
- Chain APIs into business-like E2E backend flows.
- Use network mocking to simulate no-data and server errors.
- Mix API + UI verification for hybrid quality checks.

### Module 5 - Data-Driven and CI/CD Readiness
- Run parameterized tests from CSV and Excel.
- Execute environment-aware tests (dev/qa/prod mindset).
- Add CI-compatible reporting and pipeline-friendly checks.

### Module 6 - Enterprise Reliability Patterns
- Practice OpenAPI contract checks.
- Test retry, timeout, idempotency, concurrency, and version compatibility.
- Add security-hardening checks for stable production behavior.

### Module 7 - Governance and Quality Engineering
- Validate error contract policy and release quality gates.
- Add flakiness tracking and reliability scoring.
- Generate dashboard-ready metrics artifacts.

### Module 8 - SQA Security Automation
- Run OWASP-aligned web security checks safely.
- Generate JSON/Markdown findings reports.
- Export findings to Jira-ready CSV and optional direct Jira API flow.

### Module 9 - Backend SQA Interview Skill Pack
- Cover core hiring expectations: correctness, logic, auth, DB, integration, negative, performance, security, observability.
- Use deterministic tests to practice explanations and interview answers.

### Module 10 - Production-Style Backend SQA
- Simulate DB-backed workflows with seed data and transactions.
- Validate rollback consistency, uniqueness constraints, outbox retry, and idempotent consumption.
- Practice traceable error contracts and auditability checks.

## Why This Matters For SQA Careers 💼

This repository is not only about passing tests.
It demonstrates how an SQA engineer thinks:

1. What can fail?
2. How do we detect it early?
3. How do we report it clearly?
4. How do we prevent regression in CI/CD?

That is exactly what backend-focused internship and junior SQA roles look for.

## Setup

1. Open a terminal in `c:\Users\Dell\OneDrive\Desktop\API-TESTING`
2. Run:
   ```bash
   npm install
   ```

## Run all tests

```bash
npm test
```

## Run headed (visible browser)

```bash
npm run test:headed
```

Important:
- Your concept files in `modules/Module 1 - API Foundations/*.test.js` and `modules/Module 2 - Validation and Reliability/*.test.js` are API tests using Playwright `request` fixture.
- These validate APIs directly and usually do not perform visible page clicks/typing.
- To watch browser actions live, run the visual demo file below.

## Run visual browser API demo

```bash
npm run test:visual
```

This opens a real browser window and shows a live on-screen panel while GET/POST/PUT/PATCH/DELETE calls run.

## Run one concept file

```bash
npx playwright test modules/Module 1 - API Foundations/post.static.body.test.js
```

Replace the file path to run any single test.

## Generate a report

```bash
npx playwright show-report
```

## Run Module 5

```bash
npm run test:module-5
```

## Run Module 6

```bash
npm run test:module-6
```

## Run Module 7

```bash
npm run test:module-7
```

## Run Module 8 (Web Security Checks)

```bash
npm run test:module-8
```

## Run Module 9 (Backend SQA Job Skills)

```bash
npm run test:module-9
```

## Run Module 10 (Production-Style Backend SQA)

```bash
npm run test:module-10
```

Recommended secure workflow:

1. Point scan to authorized test/staging target only.
2. Run scan:
   ```bash
   # PowerShell
   $env:TARGET_WEB_URL="https://your-approved-site.example"
   npm run security:scan
   ```
3. Convert latest findings to Jira CSV:
   ```bash
   npm run security:jira:csv
   ```
4. (Optional) Push findings directly to Jira using API:
   ```bash
   # PowerShell
   $env:JIRA_BASE_URL="https://your-org.atlassian.net"
   $env:JIRA_EMAIL="you@company.com"
   $env:JIRA_API_TOKEN="your_token"
   $env:JIRA_PROJECT_KEY="SEC"
   npm run security:jira:push
   ```

If you want pipeline blocking on high/critical findings, enable:

```bash
$env:SECURITY_GATE_ENABLED="true"
npm run security:scan
```

For Allure-compatible execution (with attachments):

```bash
npm run test:module-5:allure
```

If you want both in one step:

```bash
npm run test:report
```

## Individual test files

- `modules/Module 1 - API Foundations/post.static.body.test.js` — POST using a hardcoded request body
- `modules/Module 1 - API Foundations/post.static.file.test.js` — POST using payload loaded from a JSON file
- `modules/Module 1 - API Foundations/post.dynamic.body.test.js` — POST using runtime variables in the request body
- `modules/Module 1 - API Foundations/post.dynamic.file.test.js` — POST using a JSON template file with placeholders
- `modules/Module 1 - API Foundations/get.headers.test.js` — GET request and response header validation
- `modules/Module 1 - API Foundations/query.params.test.js` — GET request with search/filter query parameters
- `modules/Module 1 - API Foundations/put.test.js` — PUT request for complete resource update
- `modules/Module 1 - API Foundations/patch.test.js` — PATCH request for partial update
- `modules/Module 1 - API Foundations/delete.test.js` — DELETE request and deletion validation logic
- `modules/Module 1 - API Foundations/visual.api.in-browser.test.js` — visual API demo in browser
- `modules/Module 2 - Validation and Reliability/schema.validation.ajv.zod.test.js` — schema validation with AJV and Zod
- `modules/Module 2 - Validation and Reliability/nested.json.validation.test.js` — nested objects and arrays validation
- `modules/Module 2 - Validation and Reliability/negative.testing.errors.test.js` — 400/401/404 negative testing
- `modules/Module 2 - Validation and Reliability/performance.latency.assertions.test.js` — latency and response-time assertions
- `modules/Module 3 - Authentication and Session/auth.handling.jwt.apikey.bearer.test.js` — JWT, API key, and bearer token auth handling
- `modules/Module 3 - Authentication and Session/global.auth.storageState.test.js` — reusable session setup with storageState
- `modules/Module 3 - Authentication and Session/cookies.header.interception.test.js` — cookies and header interception handling
- `modules/Module 4 - Integration and Mocking/api.chaining.e2e.integration.test.js` — login/create/update/delete API chaining flow
- `modules/Module 4 - Integration and Mocking/network.mocking.no-data-server-error.test.js` — intercepting API calls for no-data and server-error simulation
- `modules/Module 4 - Integration and Mocking/hybrid.api-create.ui-verify.test.js` — hybrid testing with API data creation and UI validation
- `modules/Module 5 - Data Driven and DevOps/data.driven.csv.excel.test.js` — data-driven execution using CSV and Excel sources
- `modules/Module 5 - Data Driven and DevOps/environment.management.dev.qa.prod.test.js` — environment-aware execution for dev/qa/prod URLs
- `modules/Module 5 - Data Driven and DevOps/cicd.github-actions.integration.test.js` — CI/CD-ready smoke checks for pipeline automation
- `modules/Module 5 - Data Driven and DevOps/advanced.reporting.allure.logs.test.js` — request/response attachment examples for advanced reporting
- `modules/Module 6 - Enterprise Reliability/contract.openapi.validation.test.js` — contract testing with OpenAPI schema validation
- `modules/Module 6 - Enterprise Reliability/resilience.retry.timeout.idempotency.test.js` — resilience checks for retry/timeout/idempotency
- `modules/Module 6 - Enterprise Reliability/rate.limit.concurrency.test.js` — rate-limiting and concurrency handling checks
- `modules/Module 6 - Enterprise Reliability/versioning.backward.compatibility.test.js` — API versioning and backward compatibility assertions
- `modules/Module 6 - Enterprise Reliability/security.hardening.checks.test.js` — basic security hardening checks for API responses
- `modules/Module 7 - Governance and Quality/observability.correlation.trace.test.js` — observability checks for correlation/trace headers
- `modules/Module 7 - Governance and Quality/governance.error-contract.policy.test.js` — governance checks for error contract and status policy
- `modules/Module 7 - Governance and Quality/cdc.consumer.contract.test.js` — consumer-driven contract validation
- `modules/Module 7 - Governance and Quality/quality.gates.release.blocking.test.js` — release-blocking quality gate checks
- `modules/Module 7 - Governance and Quality/flakiness.management.reliability.test.js` — flaky-rate analysis and quarantine policy checks
- `modules/Module 7 - Governance and Quality/metrics.dashboard.inputs.test.js` — dashboard-ready API quality metrics artifact generation
- `modules/Module 8 - Security Checks/security.headers.passive.scan.test.js` — passive response-header security checks (OWASP A05/A02)
- `modules/Module 8 - Security Checks/security.authz.access-control.test.js` — unauthorized access checks for protected routes (OWASP A01)
- `modules/Module 8 - Security Checks/security.injection.probes.test.js` — safe injection probe behavior checks (OWASP A03)
- `modules/Module 8 - Security Checks/security.sensitive-files.exposure.test.js` — sensitive path exposure checks (OWASP A05/A02)
- `modules/Module 8 - Security Checks/security.helpers.js` — shared security reporting and optional gate helper
- `scripts/security/generate-jira-csv.js` — create Jira CSV from latest security findings
- `scripts/security/push-jira-findings.js` — create Jira bug tickets using Jira REST API
- `modules/Module 9 - Backend SQA Skills/api.correctness.status.schema.fields.errors.test.js` — API status/schema/required-field/error-format validation
- `modules/Module 9 - Backend SQA Skills/business.logic.discount.totals.workflow.test.js` — discount logic, totals, and workflow transition checks
- `modules/Module 9 - Backend SQA Skills/authn.authz.login.token.roles.admin-block.test.js` — login, token expiry, roles, and admin-block checks
- `modules/Module 9 - Backend SQA Skills/database.validation.duplicates.rollback.consistency.test.js` — save/duplicate/rollback/consistency validation
- `modules/Module 9 - Backend SQA Skills/integration.services.thirdparty.retry.timeout.test.js` — service-to-service flow and retry/timeout handling
- `modules/Module 9 - Backend SQA Skills/negative.testing.invalid.missing.bad-headers.malformed.test.js` — invalid payload/headers/malformed request checks
- `modules/Module 9 - Backend SQA Skills/performance.response-time.concurrency.rate-limit.test.js` — response-time, concurrency, and rate-limit checks
- `modules/Module 9 - Backend SQA Skills/security.sqa.headers.access.injection.secrets.test.js` — SQA-level security checks for headers/access/injection/secrets
- `modules/Module 9 - Backend SQA Skills/observability.trace.logging.error-contract.test.js` — trace-id, logs, and useful error-contract checks
- `modules/Module 10 - Production Backend SQA/api.db.correctness.required-fields.errors.test.js` — API correctness with DB-backed create and validation errors
- `modules/Module 10 - Production Backend SQA/auth.rbac.token-expiry.admin-protection.test.js` — login, token expiry, and admin RBAC protection checks
- `modules/Module 10 - Production Backend SQA/database.transactions.rollback.consistency.test.js` — transaction rollback and uniqueness consistency checks
- `modules/Module 10 - Production Backend SQA/integration.outbox.retry.timeout.idempotency.test.js` — outbox retry and idempotent event-consumer behavior
- `modules/Module 10 - Production Backend SQA/negative.bad-input.headers.payload.test.js` — malformed payload and bad-header negative testing
- `modules/Module 10 - Production Backend SQA/observability.audit.trace.error-contract.test.js` — traceable errors and audit log expectations
- `modules/Module 10 - Production Backend SQA/db.simulator.js` — deterministic fake database for production-style backend SQA patterns
- `modules/helpers.js` — shared helper functions for JSON loading and template rendering

## GitHub Actions CI

Workflow file:

- `.github/workflows/playwright-api-tests.yml`

What it does:

- Runs API tests on push and pull request.
- Uses a matrix for `TARGET_ENV=dev|qa|prod`.
- Uploads Playwright report artifacts for each environment.

## Inspecting API requests in browser DevTools

1. Open Chrome or Edge.
2. Press `F12` or `Ctrl+Shift+I`.
3. Select the `Network` tab.
4. In the browser, make the same request manually or run the test with a browser-based request.
5. Inspect the request to confirm:
   - `Headers`: method, URL, status code, content-type.
   - `Payload` / `Request Body`: JSON sent for POST/PUT/PATCH.
   - `Response`: JSON returned by the API.

## API used in this project

Primary Base URL: `https://jsonplaceholder.typicode.com`

Additional APIs used by specific modules:

- `https://dummyjson.com` (integration and hybrid flows)
- `https://httpbin.org` (auth/session/header echo endpoints)
- `https://httpstat.us` (error/negative testing)

Note about visuals:

- Most files are backend/API tests using Playwright `request`, so they show pass/fail in terminal/report.
- Visual browser actions are available in `modules/Module 1 - API Foundations/visual.api.in-browser.test.js` and UI/hybrid files.

Supported endpoints:

- `GET /posts?_page=2&_limit=3`
- `GET /posts/1`
- `POST /posts`
- `PUT /posts/1`
- `PATCH /posts/1`
- `DELETE /posts/1`
