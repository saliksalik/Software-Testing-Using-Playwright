const { test, expect } = require('@playwright/test');

function buildScreenshotName(testInfo) {
  const safeTitle = testInfo.title.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  return `positive-screenshots/${safeTitle}-${testInfo.status}.png`;
}

test.afterEach(async ({ page }, testInfo) => {
  if (!page.isClosed()) {
    await page.screenshot({ path: buildScreenshotName(testInfo), fullPage: true });
  }
});

test('Successful login with valid credentials', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Adactin.com - Hotel Reservation System/);

  await page.fill('#username', 'RandomGuy9571');
  await page.fill('#password', 'T87AC4');

  await page.click('#login');

  const welcomeField = page.locator('#username_show');
  await expect(welcomeField).toBeVisible();
  await expect(welcomeField).toHaveValue(/Hello RandomGuy9571!/);
  await expect(page.locator('.login_title')).toHaveText(/Search Hotel/);
  await expect(page).toHaveURL(/SearchHotel\.php/);
});