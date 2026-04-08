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

test('Successful logout after booking', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Adactin.com - Hotel Reservation System/);

  await page.fill('#username', 'RandomGuy9571');
  await page.fill('#password', 'T87AC4');
  await page.click('#login');
  await expect(page).toHaveURL(/SearchHotel\.php/);
  await expect(page.locator('.login_title')).toHaveText(/Search Hotel/);

  await page.getByRole('link', { name: 'Logout' }).click();

  const logoutMessage = page.getByText('You have successfully logged out.');
  await expect(logoutMessage).toBeVisible();
  await expect(logoutMessage).toContainText('You have successfully logged out.');
  await expect(page).toHaveURL(/Logout\.php/);
});