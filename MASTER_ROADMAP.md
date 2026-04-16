# API Testing Master Roadmap (Module 1 to 7)

This file helps you revise all modules in order.
Use it like a study checklist and practice tracker.

## How to use this roadmap

1. Run one file at a time.
2. Read comments inside that file before running.
3. Check pass/fail result.
4. Open report if needed:
   - `npx playwright show-report`

## Module 1: CRUD Basics

Goal: Learn core API methods and request/response validation.

Files:
- `modules/Module 1 - API Foundations/post.static.body.test.js`
- `modules/Module 1 - API Foundations/post.static.file.test.js`
- `modules/Module 1 - API Foundations/post.dynamic.body.test.js`
- `modules/Module 1 - API Foundations/post.dynamic.file.test.js`
- `modules/Module 1 - API Foundations/get.headers.test.js`
- `modules/Module 1 - API Foundations/query.params.test.js`
- `modules/Module 1 - API Foundations/put.test.js`
- `modules/Module 1 - API Foundations/patch.test.js`
- `modules/Module 1 - API Foundations/delete.test.js`
- `modules/Module 1 - API Foundations/visual.api.in-browser.test.js`

Run commands:
- `npx playwright test modules/Module 1 - API Foundations/post.static.body.test.js`
- `npx playwright test modules/Module 1 - API Foundations/post.static.file.test.js`
- `npx playwright test modules/Module 1 - API Foundations/post.dynamic.body.test.js`
- `npx playwright test modules/Module 1 - API Foundations/post.dynamic.file.test.js`
- `npx playwright test modules/Module 1 - API Foundations/get.headers.test.js`
- `npx playwright test modules/Module 1 - API Foundations/query.params.test.js`
- `npx playwright test modules/Module 1 - API Foundations/put.test.js`
- `npx playwright test modules/Module 1 - API Foundations/patch.test.js`
- `npx playwright test modules/Module 1 - API Foundations/delete.test.js`
- `npm run test:visual`

## Module 2: Advanced Validation and Reliability

Goal: Validate schema, nested structures, negative paths, and performance.

Files:
- `modules/Module 2 - Validation and Reliability/schema.validation.ajv.zod.test.js`
- `modules/Module 2 - Validation and Reliability/nested.json.validation.test.js`
- `modules/Module 2 - Validation and Reliability/negative.testing.errors.test.js`
- `modules/Module 2 - Validation and Reliability/performance.latency.assertions.test.js`

Run commands:
- `npx playwright test modules/Module 2 - Validation and Reliability/schema.validation.ajv.zod.test.js`
- `npx playwright test modules/Module 2 - Validation and Reliability/nested.json.validation.test.js`
- `npx playwright test modules/Module 2 - Validation and Reliability/negative.testing.errors.test.js`
- `npx playwright test modules/Module 2 - Validation and Reliability/performance.latency.assertions.test.js`

## Module 3: Security and Session Management

Goal: Learn token auth, shared session state, cookies, and header interception.

Files:
- `modules/Module 3 - Authentication and Session/auth.handling.jwt.apikey.bearer.test.js`
- `modules/Module 3 - Authentication and Session/global.auth.storageState.test.js`
- `modules/Module 3 - Authentication and Session/cookies.header.interception.test.js`

Run commands:
- `npx playwright test modules/Module 3 - Authentication and Session/auth.handling.jwt.apikey.bearer.test.js`
- `npx playwright test modules/Module 3 - Authentication and Session/global.auth.storageState.test.js`
- `npx playwright test modules/Module 3 - Authentication and Session/cookies.header.interception.test.js`

## Module 4: Integration and Mocking

Goal: Chain APIs, mock network responses, and mix API + UI checks.

Files:
- `modules/Module 4 - Integration and Mocking/api.chaining.e2e.integration.test.js`
- `modules/Module 4 - Integration and Mocking/network.mocking.no-data-server-error.test.js`
- `modules/Module 4 - Integration and Mocking/hybrid.api-create.ui-verify.test.js`

Run commands:
- `npx playwright test modules/Module 4 - Integration and Mocking/api.chaining.e2e.integration.test.js`
- `npx playwright test modules/Module 4 - Integration and Mocking/network.mocking.no-data-server-error.test.js`
- `npx playwright test modules/Module 4 - Integration and Mocking/hybrid.api-create.ui-verify.test.js`

## Module 5: Data-Driven and DevOps

Goal: Parameterized tests, environment strategy, CI integration, and reporting logs.

Files:
- `modules/Module 5 - Data Driven and DevOps/data.driven.csv.excel.test.js`
- `modules/Module 5 - Data Driven and DevOps/environment.management.dev.qa.prod.test.js`
- `modules/Module 5 - Data Driven and DevOps/cicd.github-actions.integration.test.js`
- `modules/Module 5 - Data Driven and DevOps/advanced.reporting.allure.logs.test.js`

Run commands:
- `npx playwright test modules/Module 5 - Data Driven and DevOps/data.driven.csv.excel.test.js`
- `npx playwright test modules/Module 5 - Data Driven and DevOps/environment.management.dev.qa.prod.test.js`
- `npx playwright test modules/Module 5 - Data Driven and DevOps/cicd.github-actions.integration.test.js`
- `npx playwright test modules/Module 5 - Data Driven and DevOps/advanced.reporting.allure.logs.test.js`

Extra:
- `npm run test:module-5`
- `npm run test:module-5:allure`

## Module 6: Enterprise Readiness

Goal: Contract, resilience, concurrency, versioning, and security-hardening mindset.

Files:
- `modules/Module 6 - Enterprise Reliability/contract.openapi.validation.test.js`
- `modules/Module 6 - Enterprise Reliability/resilience.retry.timeout.idempotency.test.js`
- `modules/Module 6 - Enterprise Reliability/rate.limit.concurrency.test.js`
- `modules/Module 6 - Enterprise Reliability/versioning.backward.compatibility.test.js`
- `modules/Module 6 - Enterprise Reliability/security.hardening.checks.test.js`

Run commands:
- `npx playwright test modules/Module 6 - Enterprise Reliability/contract.openapi.validation.test.js`
- `npx playwright test modules/Module 6 - Enterprise Reliability/resilience.retry.timeout.idempotency.test.js`
- `npx playwright test modules/Module 6 - Enterprise Reliability/rate.limit.concurrency.test.js`
- `npx playwright test modules/Module 6 - Enterprise Reliability/versioning.backward.compatibility.test.js`
- `npx playwright test modules/Module 6 - Enterprise Reliability/security.hardening.checks.test.js`

Extra:
- `npm run test:module-6`

## Module 7: Observability, Governance, CDC, and Quality Gates

Goal: Learn release-level quality engineering and dashboard-ready metrics.

Files:
- `modules/Module 7 - Governance and Quality/observability.correlation.trace.test.js`
- `modules/Module 7 - Governance and Quality/governance.error-contract.policy.test.js`
- `modules/Module 7 - Governance and Quality/cdc.consumer.contract.test.js`
- `modules/Module 7 - Governance and Quality/quality.gates.release.blocking.test.js`
- `modules/Module 7 - Governance and Quality/flakiness.management.reliability.test.js`
- `modules/Module 7 - Governance and Quality/metrics.dashboard.inputs.test.js`

Run commands:
- `npx playwright test modules/Module 7 - Governance and Quality/observability.correlation.trace.test.js`
- `npx playwright test modules/Module 7 - Governance and Quality/governance.error-contract.policy.test.js`
- `npx playwright test modules/Module 7 - Governance and Quality/cdc.consumer.contract.test.js`
- `npx playwright test modules/Module 7 - Governance and Quality/quality.gates.release.blocking.test.js`
- `npx playwright test modules/Module 7 - Governance and Quality/flakiness.management.reliability.test.js`
- `npx playwright test modules/Module 7 - Governance and Quality/metrics.dashboard.inputs.test.js`

Extra:
- `npm run test:module-7`

## Module 8: Web Security Checks (OWASP-Aligned SQA)

Goal: Add security regression testing to SQA workflow and produce Jira-ready findings.

Files:
- `modules/Module 8 - Security Checks/security.headers.passive.scan.test.js`
- `modules/Module 8 - Security Checks/security.authz.access-control.test.js`
- `modules/Module 8 - Security Checks/security.injection.probes.test.js`
- `modules/Module 8 - Security Checks/security.sensitive-files.exposure.test.js`
- `modules/Module 8 - Security Checks/README.md`

Run commands:
- `npx playwright test modules/Module 8 - Security Checks/security.headers.passive.scan.test.js`
- `npx playwright test modules/Module 8 - Security Checks/security.authz.access-control.test.js`
- `npx playwright test modules/Module 8 - Security Checks/security.injection.probes.test.js`
- `npx playwright test modules/Module 8 - Security Checks/security.sensitive-files.exposure.test.js`

Extra:
- `npm run test:module-8`
- `npm run security:scan`
- `npm run security:jira:csv`

## Module 9: Backend SQA Job Skills

Goal: Practice the exact backend testing areas commonly listed in SQA job openings.

Files:
- `modules/Module 9 - Backend SQA Skills/api.correctness.status.schema.fields.errors.test.js`
- `modules/Module 9 - Backend SQA Skills/business.logic.discount.totals.workflow.test.js`
- `modules/Module 9 - Backend SQA Skills/authn.authz.login.token.roles.admin-block.test.js`
- `modules/Module 9 - Backend SQA Skills/database.validation.duplicates.rollback.consistency.test.js`
- `modules/Module 9 - Backend SQA Skills/integration.services.thirdparty.retry.timeout.test.js`
- `modules/Module 9 - Backend SQA Skills/negative.testing.invalid.missing.bad-headers.malformed.test.js`
- `modules/Module 9 - Backend SQA Skills/performance.response-time.concurrency.rate-limit.test.js`
- `modules/Module 9 - Backend SQA Skills/security.sqa.headers.access.injection.secrets.test.js`
- `modules/Module 9 - Backend SQA Skills/observability.trace.logging.error-contract.test.js`

Run commands:
- `npx playwright test modules/Module 9 - Backend SQA Skills/api.correctness.status.schema.fields.errors.test.js`
- `npx playwright test modules/Module 9 - Backend SQA Skills/business.logic.discount.totals.workflow.test.js`
- `npx playwright test modules/Module 9 - Backend SQA Skills/authn.authz.login.token.roles.admin-block.test.js`
- `npx playwright test modules/Module 9 - Backend SQA Skills/database.validation.duplicates.rollback.consistency.test.js`
- `npx playwright test modules/Module 9 - Backend SQA Skills/integration.services.thirdparty.retry.timeout.test.js`
- `npx playwright test modules/Module 9 - Backend SQA Skills/negative.testing.invalid.missing.bad-headers.malformed.test.js`
- `npx playwright test modules/Module 9 - Backend SQA Skills/performance.response-time.concurrency.rate-limit.test.js`
- `npx playwright test modules/Module 9 - Backend SQA Skills/security.sqa.headers.access.injection.secrets.test.js`
- `npx playwright test modules/Module 9 - Backend SQA Skills/observability.trace.logging.error-contract.test.js`

Extra:
- `npm run test:module-9`

## Module 10: Production-Style Backend SQA

Goal: Move from interview-style checks to production-like backend data integrity and reliability patterns.

Files:
- `modules/Module 10 - Production Backend SQA/api.db.correctness.required-fields.errors.test.js`
- `modules/Module 10 - Production Backend SQA/auth.rbac.token-expiry.admin-protection.test.js`
- `modules/Module 10 - Production Backend SQA/database.transactions.rollback.consistency.test.js`
- `modules/Module 10 - Production Backend SQA/integration.outbox.retry.timeout.idempotency.test.js`
- `modules/Module 10 - Production Backend SQA/negative.bad-input.headers.payload.test.js`
- `modules/Module 10 - Production Backend SQA/observability.audit.trace.error-contract.test.js`

Run commands:
- `npx playwright test modules/Module 10 - Production Backend SQA/api.db.correctness.required-fields.errors.test.js`
- `npx playwright test modules/Module 10 - Production Backend SQA/auth.rbac.token-expiry.admin-protection.test.js`
- `npx playwright test modules/Module 10 - Production Backend SQA/database.transactions.rollback.consistency.test.js`
- `npx playwright test modules/Module 10 - Production Backend SQA/integration.outbox.retry.timeout.idempotency.test.js`
- `npx playwright test modules/Module 10 - Production Backend SQA/negative.bad-input.headers.payload.test.js`
- `npx playwright test modules/Module 10 - Production Backend SQA/observability.audit.trace.error-contract.test.js`

Extra:
- `npm run test:module-10`

## Full-suite commands

- Run all tests:
  - `npm test`
- Run by module folder:
  - `npx playwright test modules/Module 1 - API Foundations`
  - `npx playwright test modules/Module 2 - Validation and Reliability`
  - `npx playwright test modules/Module 3 - Authentication and Session`
  - `npx playwright test modules/Module 4 - Integration and Mocking`
  - `npx playwright test modules/Module 5 - Data Driven and DevOps`
  - `npx playwright test modules/Module 6 - Enterprise Reliability`
  - `npx playwright test modules/Module 7 - Governance and Quality`
  - `npx playwright test modules/Module 8 - Security Checks`
  - `npx playwright test modules/Module 9 - Backend SQA Skills`
  - `npx playwright test modules/Module 10 - Production Backend SQA`

## APIs used in this project

- `https://jsonplaceholder.typicode.com`
- `https://dummyjson.com`
- `https://httpbin.org`
- `https://httpstat.us` (for selected negative scenarios)

## One important note

Most files are backend/API tests, so you usually see pass/fail in terminal and reports.
For visible browser actions, use:
- `npm run test:visual`

## Daily Practice Plan (7 Days)

Day 1: CRUD foundation (create + read)
- Run:
  - `npx playwright test modules/Module 1 - API Foundations/post.static.body.test.js`
  - `npx playwright test modules/Module 1 - API Foundations/post.static.file.test.js`
  - `npx playwright test modules/Module 1 - API Foundations/get.headers.test.js`
- Focus:
  - Understand request body vs response body.
  - Understand status code and basic assertions.

Day 2: CRUD continuation (dynamic create + update + delete)
- Run:
  - `npx playwright test modules/Module 1 - API Foundations/post.dynamic.body.test.js`
  - `npx playwright test modules/Module 1 - API Foundations/post.dynamic.file.test.js`
  - `npx playwright test modules/Module 1 - API Foundations/put.test.js`
  - `npx playwright test modules/Module 1 - API Foundations/patch.test.js`
  - `npx playwright test modules/Module 1 - API Foundations/delete.test.js`
- Focus:
  - Difference between PUT and PATCH.
  - How dynamic data is generated and validated.

Day 3: Query + visual understanding
- Run:
  - `npx playwright test modules/Module 1 - API Foundations/query.params.test.js`
  - `npm run test:visual`
- Focus:
  - Query parameters and filtered results.
  - See visible browser behavior and map it to API calls.

Day 4: Validation and reliability basics
- Run:
  - `npx playwright test modules/Module 2 - Validation and Reliability/schema.validation.ajv.zod.test.js`
  - `npx playwright test modules/Module 2 - Validation and Reliability/nested.json.validation.test.js`
  - `npx playwright test modules/Module 2 - Validation and Reliability/negative.testing.errors.test.js`
  - `npx playwright test modules/Module 2 - Validation and Reliability/performance.latency.assertions.test.js`
- Focus:
  - Schema checks with AJV and Zod.
  - Negative testing and latency assertions.

Day 5: Security + integration
- Run:
  - `npx playwright test modules/Module 3 - Authentication and Session`
  - `npx playwright test modules/Module 4 - Integration and Mocking`
- Focus:
  - Token/cookie/session behavior.
  - API chaining and network mocking.

Day 6: Data-driven + DevOps
- Run:
  - `npx playwright test modules/Module 5 - Data Driven and DevOps`
  - (Optional) `npm run test:module-5:allure`
- Focus:
  - CSV/Excel parameterization.
  - Environment matrix and CI-style quality mindset.

Day 7: Enterprise quality and release governance
- Run:
  - `npx playwright test modules/Module 6 - Enterprise Reliability`
  - `npx playwright test modules/Module 7 - Governance and Quality`
  - `npm test`
- Focus:
  - Contracts, resilience, compatibility, governance.
  - Final readiness check using full-suite execution.

### Revision Loop (repeat weekly)

1. Re-run failed tests first.
2. Re-read comments in each failed file.
3. Re-run only those files.
4. End with `npm test`.
