const { test, expect } = require('@playwright/test');

function buildScreenshotName(testInfo) {
  const safeTitle = testInfo.title.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  return `negative-screenshots/${safeTitle}-${testInfo.status}.png`;
}

test.afterEach(async ({ page }, testInfo) => {
  if (!page.isClosed()) {
    await page.screenshot({ path: buildScreenshotName(testInfo), fullPage: true });
  }
});

test('Login with invalid username/password', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Adactin.com - Hotel Reservation System/);

  await page.fill('#username', 'RandomGuy9571');
  await page.fill('#password', 'WrongPassword123');
  await page.click('#login');

  const error = page.locator('.auth_error');
  await expect(error).toBeVisible();
  await expect(error).toContainText('Invalid Login details or Your Password might have expired.');
  await expect(page).toHaveURL(/adactinhotelapp\.com\/(?:index\.php)?$/);
});