# Software Testing Using Playwright

## Clone and run

```bash
git clone https://github.com/saliksalik/Software-Testing-Using-Playwright.git
cd Software-Testing-Using-Playwright
npm install
npm test
```

All test source code is included in this repository, so anyone can clone it and run the suite locally.

## Overview

This repository contains a Playwright automation suite for the Adactin Hotel App. It includes:

- `e2e` tests for full end-to-end booking flows
- `positive` tests for valid user journeys
- `negative` tests for invalid or blocked scenarios
- screenshots and report artifacts for review

## Repository Structure

- `package.json` - npm scripts and project metadata
- `playwright.config.js` - Playwright configuration
- `tests/e2e/` - end-to-end flows and booking scenarios
- `tests/positive/` - positive test cases
- `tests/negative/` - negative test cases
- `positive-screenshots/` - positive test screenshots
- `negative-screenshots/` - negative test screenshots
- `playwright-report/` - generated HTML report output
- `test-results/` - test result artifacts

## Test Suites

All JavaScript test files are included in this repo and are stored under the `tests/` folder:

- `tests/e2e/` — end-to-end test code
- `tests/positive/` — positive validation test code
- `tests/negative/` — negative validation test code

### End-to-end tests

- `tests/e2e/e2e_booking.spec.js`
- `tests/e2e/itinerary_check.js`

### Positive tests

- `tests/positive/positive_login.spec.js`
- `tests/positive/positive_search.spec.js`
- `tests/positive/positive_selection.spec.js`
- `tests/positive/positive_booking_confirmation.spec.js`
- `tests/positive/positive_logout.spec.js`

### Negative tests

- `tests/negative/negative_invalid_login.spec.js`
- `tests/negative/negative_search_missing_location.spec.js`
- `tests/negative/negative_unauthorized_access.spec.js`
- `tests/negative/negative_booking_missing_firstname.spec.js`
- `tests/negative/negative_invalid_credit_card.spec.js`

## Setup

1. Install dependencies

```bash
npm install
```

2. Run the full test suite

```bash
npm test
```

3. Run specific suites

```bash
npm run test:e2e
npm run test:positive
npm run test:negative
npm run test:headed
```

4. View reports

```bash
npm run report
```

## Screenshots and Reports

- Store visual evidence in `positive-screenshots/` and `negative-screenshots/`.
- Use the auto-generated HTML report in `playwright-report/`.
- If you add videos, create a `videos/` folder and link them from this README.

Example image embed:

```md
![Positive Booking Screenshot](positive-screenshots/your-screenshot.png)
```

Example video link:

```md
[Watch the positive test video](videos/positive_e2e.mp4)
```

## Recommended GitHub Repository Content

To present this work clearly on GitHub, include:

- this `README.md`
- test source code in `tests/`
- sample screenshots
- generated report HTML
- optional demo videos in `videos/`

## Notes

- This suite is built with Playwright `@playwright/test` `^1.53.0`.
- Keep `node_modules/` out of the repo and commit only source files, tests, reports, screenshots, and videos.
- Rename the repository to `Software-Testing-Using-Playwright` to match the project theme.
