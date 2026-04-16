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

test('Successful hotel selection and booking', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Adactin.com - Hotel Reservation System/);

  await page.fill('#username', 'RandomGuy9571');
  await page.fill('#password', 'T87AC4');
  await page.click('#login');

  await page.selectOption('#location', { value: 'Sydney' });
  await page.selectOption('#hotels', { value: 'Hotel Creek' });
  await page.selectOption('#room_type', { value: 'Standard' });
  await page.selectOption('#room_nos', { value: '1' });
  await page.fill('#datepick_in', '30/03/2026');
  await page.fill('#datepick_out', '31/03/2026');
  await page.selectOption('#adult_room', { value: '2' });
  await page.click('#Submit');

  await page.click('#radiobutton_0');
  await page.click('#continue');

  const heading = page.locator('.login_title', { hasText: 'Book A Hotel' });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText(/Book A Hotel/);
  await expect(page).toHaveURL(/BookHotel\.php/);
});