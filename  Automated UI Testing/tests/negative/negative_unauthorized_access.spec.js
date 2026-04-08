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

test('Logout attempt without logging in', async ({ page }) => {
  await page.goto('/SearchHotel.php');

  const loginButton = page.locator('#login');
  await expect(loginButton).toBeVisible();
  await expect(page).toHaveTitle(/Adactin.com - Hotel Reservation System/);
  await expect(page).toHaveURL(/adactinhotelapp\.com\/(?:index\.php)?$/);

  await page.goto('/Logout.php');
  const logoutMessage = page.getByText('You have successfully logged out.');
  await expect(logoutMessage).toBeVisible();
  await expect(logoutMessage).toContainText('You have successfully logged out.');
  await expect(page).toHaveURL(/Logout\.php/);
});