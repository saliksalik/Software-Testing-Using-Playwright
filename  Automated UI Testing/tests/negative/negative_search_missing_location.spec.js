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

test('Search hotel without selecting mandatory fields', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Adactin.com - Hotel Reservation System/);

  await page.fill('#username', 'RandomGuy9571');
  await page.fill('#password', 'T87AC4');
  await page.click('#login');
  await expect(page).toHaveURL(/SearchHotel\.php/);

  await page.selectOption('#hotels', { value: 'Hotel Creek' });
  await page.selectOption('#room_type', { value: 'Standard' });
  await page.selectOption('#room_nos', { value: '1' });
  await page.fill('#datepick_in', '30/03/2026');
  await page.fill('#datepick_out', '31/03/2026');
  await page.selectOption('#adult_room', { value: '2' });
  await page.click('#Submit');

  const locationError = page.locator('#location_span');
  await expect(locationError).toBeVisible();
  await expect(locationError).toHaveText('Please Select a Location');
  await expect(page).toHaveURL(/SearchHotel\.php/);
});