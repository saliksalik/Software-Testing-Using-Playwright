const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { parse } = require('csv-parse/sync');
const XLSX = require('xlsx');

// File purpose:
// Run data-driven API tests from CSV and Excel sources.
// Team-lead scenario: "Execute the same POST validation with many datasets without duplicating test code."
// Why this matters:
// - Scales test coverage quickly by adding rows instead of writing new tests.
// - Reflects real QA workflows where data comes from sheets.
// API-specific behavior:
// - Uses POST /posts on JSONPlaceholder.
// - Expected status per row: 201.
// Sample response body:
// - { id: 101, title: 'CSV Title One', body: 'CSV Body One', userId: 1 }
// Where to see real response:
// - Add console.log(responseBody) inside each generated test.
// Quick memory: one test template + many data rows = parameterized testing.

const dataDir = path.join(__dirname, 'data');
const csvPath = path.join(dataDir, 'posts.csv');
const xlsxPath = path.join(dataDir, 'posts.generated.xlsx');

function createExcelFileIfMissing() {
  if (fs.existsSync(xlsxPath)) {
    return;
  }

  const wb = XLSX.utils.book_new();
  const wsData = [
    ['title', 'body', 'userId', 'expectedStatus'],
    ['Excel Title One', 'Excel Body One', 3, 201],
    ['Excel Title Two', 'Excel Body Two', 4, 201]
  ];
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, 'Posts');
  XLSX.writeFile(wb, xlsxPath);
}

function loadCsvRows() {
  const csvText = fs.readFileSync(csvPath, 'utf8');
  const rows = parse(csvText, { columns: true, skip_empty_lines: true });
  return rows.map((r) => ({
    title: r.title,
    body: r.body,
    userId: Number(r.userId),
    expectedStatus: Number(r.expectedStatus)
  }));
}

function loadExcelRows() {
  const wb = XLSX.readFile(xlsxPath);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws);
  return rows.map((r) => ({
    title: r.title,
    body: r.body,
    userId: Number(r.userId),
    expectedStatus: Number(r.expectedStatus)
  }));
}

// Ensure Excel source is available before dynamic test generation runs.
createExcelFileIfMissing();

test.describe('5.20 Data-Driven Testing with CSV and Excel', () => {
  for (const row of loadCsvRows()) {
    test(`CSV row -> ${row.title}`, async ({ request }) => {
      const response = await request.post('/posts', {
        data: {
          title: row.title,
          body: row.body,
          userId: row.userId
        }
      });

      expect(response.status()).toBe(row.expectedStatus);
      const responseBody = await response.json();
      expect(responseBody.title).toBe(row.title);
      expect(responseBody.body).toBe(row.body);
      expect(responseBody.userId).toBe(row.userId);
    });
  }

  for (const row of loadExcelRows()) {
    test(`Excel row -> ${row.title}`, async ({ request }) => {
      const response = await request.post('/posts', {
        data: {
          title: row.title,
          body: row.body,
          userId: row.userId
        }
      });

      expect(response.status()).toBe(row.expectedStatus);
      const responseBody = await response.json();
      expect(responseBody.title).toBe(row.title);
      expect(responseBody.body).toBe(row.body);
      expect(responseBody.userId).toBe(row.userId);
    });
  }
});
