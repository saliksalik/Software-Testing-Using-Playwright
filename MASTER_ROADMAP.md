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
- `test/module-1/post.static.body.test.js`
- `test/module-1/post.static.file.test.js`
- `test/module-1/post.dynamic.body.test.js`
- `test/module-1/post.dynamic.file.test.js`
- `test/module-1/get.headers.test.js`
- `test/module-1/query.params.test.js`
- `test/module-1/put.test.js`
- `test/module-1/patch.test.js`
- `test/module-1/delete.test.js`
- `test/module-1/visual.api.in-browser.test.js`

Run commands:
- `npx playwright test test/module-1/post.static.body.test.js`
- `npx playwright test test/module-1/post.static.file.test.js`
- `npx playwright test test/module-1/post.dynamic.body.test.js`
- `npx playwright test test/module-1/post.dynamic.file.test.js`
- `npx playwright test test/module-1/get.headers.test.js`
- `npx playwright test test/module-1/query.params.test.js`
- `npx playwright test test/module-1/put.test.js`
- `npx playwright test test/module-1/patch.test.js`
- `npx playwright test test/module-1/delete.test.js`
- `npm run test:visual`

## Module 2: Advanced Validation and Reliability

Goal: Validate schema, nested structures, negative paths, and performance.

Files:
- `test/module-2/schema.validation.ajv.zod.test.js`
- `test/module-2/nested.json.validation.test.js`
- `test/module-2/negative.testing.errors.test.js`
- `test/module-2/performance.latency.assertions.test.js`

Run commands:
- `npx playwright test test/module-2/schema.validation.ajv.zod.test.js`
- `npx playwright test test/module-2/nested.json.validation.test.js`
- `npx playwright test test/module-2/negative.testing.errors.test.js`
- `npx playwright test test/module-2/performance.latency.assertions.test.js`

## Module 3: Security and Session Management

Goal: Learn token auth, shared session state, cookies, and header interception.

Files:
- `test/module-3/auth.handling.jwt.apikey.bearer.test.js`
- `test/module-3/global.auth.storageState.test.js`
- `test/module-3/cookies.header.interception.test.js`

Run commands:
- `npx playwright test test/module-3/auth.handling.jwt.apikey.bearer.test.js`
- `npx playwright test test/module-3/global.auth.storageState.test.js`
- `npx playwright test test/module-3/cookies.header.interception.test.js`

## Module 4: Integration and Mocking

Goal: Chain APIs, mock network responses, and mix API + UI checks.

Files:
- `test/module-4/api.chaining.e2e.integration.test.js`
- `test/module-4/network.mocking.no-data-server-error.test.js`
- `test/module-4/hybrid.api-create.ui-verify.test.js`

Run commands:
- `npx playwright test test/module-4/api.chaining.e2e.integration.test.js`
- `npx playwright test test/module-4/network.mocking.no-data-server-error.test.js`
- `npx playwright test test/module-4/hybrid.api-create.ui-verify.test.js`

## Module 5: Data-Driven and DevOps

Goal: Parameterized tests, environment strategy, CI integration, and reporting logs.

Files:
- `test/module-5/data.driven.csv.excel.test.js`
- `test/module-5/environment.management.dev.qa.prod.test.js`
- `test/module-5/cicd.github-actions.integration.test.js`
- `test/module-5/advanced.reporting.allure.logs.test.js`

Run commands:
- `npx playwright test test/module-5/data.driven.csv.excel.test.js`
- `npx playwright test test/module-5/environment.management.dev.qa.prod.test.js`
- `npx playwright test test/module-5/cicd.github-actions.integration.test.js`
- `npx playwright test test/module-5/advanced.reporting.allure.logs.test.js`

Extra:
- `npm run test:module-5`
- `npm run test:module-5:allure`

## Module 6: Enterprise Readiness

Goal: Contract, resilience, concurrency, versioning, and security-hardening mindset.

Files:
- `test/module-6/contract.openapi.validation.test.js`
- `test/module-6/resilience.retry.timeout.idempotency.test.js`
- `test/module-6/rate.limit.concurrency.test.js`
- `test/module-6/versioning.backward.compatibility.test.js`
- `test/module-6/security.hardening.checks.test.js`

Run commands:
- `npx playwright test test/module-6/contract.openapi.validation.test.js`
- `npx playwright test test/module-6/resilience.retry.timeout.idempotency.test.js`
- `npx playwright test test/module-6/rate.limit.concurrency.test.js`
- `npx playwright test test/module-6/versioning.backward.compatibility.test.js`
- `npx playwright test test/module-6/security.hardening.checks.test.js`

Extra:
- `npm run test:module-6`

## Module 7: Observability, Governance, CDC, and Quality Gates

Goal: Learn release-level quality engineering and dashboard-ready metrics.

Files:
- `test/module-7/observability.correlation.trace.test.js`
- `test/module-7/governance.error-contract.policy.test.js`
- `test/module-7/cdc.consumer.contract.test.js`
- `test/module-7/quality.gates.release.blocking.test.js`
- `test/module-7/flakiness.management.reliability.test.js`
- `test/module-7/metrics.dashboard.inputs.test.js`

Run commands:
- `npx playwright test test/module-7/observability.correlation.trace.test.js`
- `npx playwright test test/module-7/governance.error-contract.policy.test.js`
- `npx playwright test test/module-7/cdc.consumer.contract.test.js`
- `npx playwright test test/module-7/quality.gates.release.blocking.test.js`
- `npx playwright test test/module-7/flakiness.management.reliability.test.js`
- `npx playwright test test/module-7/metrics.dashboard.inputs.test.js`

Extra:
- `npm run test:module-7`

## Module 8: Web Security Checks (OWASP-Aligned SQA)

Goal: Add security regression testing to SQA workflow and produce Jira-ready findings.

Files:
- `test/module-8/security.headers.passive.scan.test.js`
- `test/module-8/security.authz.access-control.test.js`
- `test/module-8/security.injection.probes.test.js`
- `test/module-8/security.sensitive-files.exposure.test.js`
- `test/module-8/README.md`

Run commands:
- `npx playwright test test/module-8/security.headers.passive.scan.test.js`
- `npx playwright test test/module-8/security.authz.access-control.test.js`
- `npx playwright test test/module-8/security.injection.probes.test.js`
- `npx playwright test test/module-8/security.sensitive-files.exposure.test.js`

Extra:
- `npm run test:module-8`
- `npm run security:scan`
- `npm run security:jira:csv`

## Module 9: Backend SQA Job Skills

Goal: Practice the exact backend testing areas commonly listed in SQA job openings.

Files:
- `test/module-9/api.correctness.status.schema.fields.errors.test.js`
- `test/module-9/business.logic.discount.totals.workflow.test.js`
- `test/module-9/authn.authz.login.token.roles.admin-block.test.js`
- `test/module-9/database.validation.duplicates.rollback.consistency.test.js`
- `test/module-9/integration.services.thirdparty.retry.timeout.test.js`
- `test/module-9/negative.testing.invalid.missing.bad-headers.malformed.test.js`
- `test/module-9/performance.response-time.concurrency.rate-limit.test.js`
- `test/module-9/security.sqa.headers.access.injection.secrets.test.js`
- `test/module-9/observability.trace.logging.error-contract.test.js`

Run commands:
- `npx playwright test test/module-9/api.correctness.status.schema.fields.errors.test.js`
- `npx playwright test test/module-9/business.logic.discount.totals.workflow.test.js`
- `npx playwright test test/module-9/authn.authz.login.token.roles.admin-block.test.js`
- `npx playwright test test/module-9/database.validation.duplicates.rollback.consistency.test.js`
- `npx playwright test test/module-9/integration.services.thirdparty.retry.timeout.test.js`
- `npx playwright test test/module-9/negative.testing.invalid.missing.bad-headers.malformed.test.js`
- `npx playwright test test/module-9/performance.response-time.concurrency.rate-limit.test.js`
- `npx playwright test test/module-9/security.sqa.headers.access.injection.secrets.test.js`
- `npx playwright test test/module-9/observability.trace.logging.error-contract.test.js`

Extra:
- `npm run test:module-9`

## Module 10: Production-Style Backend SQA

Goal: Move from interview-style checks to production-like backend data integrity and reliability patterns.

Files:
- `test/module-10/api.db.correctness.required-fields.errors.test.js`
- `test/module-10/auth.rbac.token-expiry.admin-protection.test.js`
- `test/module-10/database.transactions.rollback.consistency.test.js`
- `test/module-10/integration.outbox.retry.timeout.idempotency.test.js`
- `test/module-10/negative.bad-input.headers.payload.test.js`
- `test/module-10/observability.audit.trace.error-contract.test.js`

Run commands:
- `npx playwright test test/module-10/api.db.correctness.required-fields.errors.test.js`
- `npx playwright test test/module-10/auth.rbac.token-expiry.admin-protection.test.js`
- `npx playwright test test/module-10/database.transactions.rollback.consistency.test.js`
- `npx playwright test test/module-10/integration.outbox.retry.timeout.idempotency.test.js`
- `npx playwright test test/module-10/negative.bad-input.headers.payload.test.js`
- `npx playwright test test/module-10/observability.audit.trace.error-contract.test.js`

Extra:
- `npm run test:module-10`

## Full-suite commands

- Run all tests:
  - `npm test`
- Run by module folder:
  - `npx playwright test test/module-1`
  - `npx playwright test test/module-2`
  - `npx playwright test test/module-3`
  - `npx playwright test test/module-4`
  - `npx playwright test test/module-5`
  - `npx playwright test test/module-6`
  - `npx playwright test test/module-7`
  - `npx playwright test test/module-8`
  - `npx playwright test test/module-9`
  - `npx playwright test test/module-10`

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
  - `npx playwright test test/module-1/post.static.body.test.js`
  - `npx playwright test test/module-1/post.static.file.test.js`
  - `npx playwright test test/module-1/get.headers.test.js`
- Focus:
  - Understand request body vs response body.
  - Understand status code and basic assertions.

Day 2: CRUD continuation (dynamic create + update + delete)
- Run:
  - `npx playwright test test/module-1/post.dynamic.body.test.js`
  - `npx playwright test test/module-1/post.dynamic.file.test.js`
  - `npx playwright test test/module-1/put.test.js`
  - `npx playwright test test/module-1/patch.test.js`
  - `npx playwright test test/module-1/delete.test.js`
- Focus:
  - Difference between PUT and PATCH.
  - How dynamic data is generated and validated.

Day 3: Query + visual understanding
- Run:
  - `npx playwright test test/module-1/query.params.test.js`
  - `npm run test:visual`
- Focus:
  - Query parameters and filtered results.
  - See visible browser behavior and map it to API calls.

Day 4: Validation and reliability basics
- Run:
  - `npx playwright test test/module-2/schema.validation.ajv.zod.test.js`
  - `npx playwright test test/module-2/nested.json.validation.test.js`
  - `npx playwright test test/module-2/negative.testing.errors.test.js`
  - `npx playwright test test/module-2/performance.latency.assertions.test.js`
- Focus:
  - Schema checks with AJV and Zod.
  - Negative testing and latency assertions.

Day 5: Security + integration
- Run:
  - `npx playwright test test/module-3`
  - `npx playwright test test/module-4`
- Focus:
  - Token/cookie/session behavior.
  - API chaining and network mocking.

Day 6: Data-driven + DevOps
- Run:
  - `npx playwright test test/module-5`
  - (Optional) `npm run test:module-5:allure`
- Focus:
  - CSV/Excel parameterization.
  - Environment matrix and CI-style quality mindset.

Day 7: Enterprise quality and release governance
- Run:
  - `npx playwright test test/module-6`
  - `npx playwright test test/module-7`
  - `npm test`
- Focus:
  - Contracts, resilience, compatibility, governance.
  - Final readiness check using full-suite execution.

### Revision Loop (repeat weekly)

1. Re-run failed tests first.
2. Re-read comments in each failed file.
3. Re-run only those files.
4. End with `npm test`.
