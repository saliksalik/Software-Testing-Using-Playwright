# API Testing

This folder is organized into API testing modules. Each mode contains a dedicated folder with the work items for that module.

## Modules

### Module 1: Core CRUD Operations
Folder: `01-Core-CRUD-Operations`

- POST requests using static body and external JSON.
- Dynamic payloads built from variables and templates.
- GET requests with header validation and query parameters.
- PUT, PATCH, and DELETE operations with verification.

### Module 2: Advanced Validation & Reliability
Folder: `02-Advanced-Validation-and-Reliability`

- Schema validation with AJV/Zod.
- Nested object and array validation.
- Negative error scenario validation.
- Response time and latency assertions.

### Module 3: Security & Session Management
Folder: `03-Security-and-Session-Management`

- JWT, API key, and bearer token handling.
- Global auth/session setup with storageState.
- Cookie and header interception in Playwright.

### Module 4: Integration & Mocking
Folder: `04-Integration-and-Mocking`

- API chaining workflows across login, create, update, and delete.
- Network mocking for no data or server error responses.
- Hybrid UI+API validation flows.

### Module 5: Data-Driven & DevOps
Folder: `05-Data-Driven-and-DevOps`

- Data-driven execution using CSV/Excel sources.
- Environment management for Dev/QA/Prod.
- GitHub Actions CI test runs.
- Advanced reporting with request/response logs.

## How to use

Open the folder for the desired module and add the appropriate API test scripts, data, and reports there.
