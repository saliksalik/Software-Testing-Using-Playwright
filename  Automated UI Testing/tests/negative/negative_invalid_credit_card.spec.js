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

test('Invalid credit card details during payment', async ({ page }) => {
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
  await expect(page).toHaveURL(/BookHotel\.php/);

  await page.fill('#first_name', 'Salik');
  await page.fill('#last_name', 'Ahmad');
  await page.fill('#address', 'North Nazimabad Block N B214, Karachi');
  await page.fill('#cc_num', '411111111111111');
  await page.selectOption('#cc_type', { value: 'VISA' });
  await page.selectOption('#cc_exp_month', { value: '7' });
  await page.selectOption('#cc_exp_year', { value: '2029' });
  await page.fill('#cc_cvv', '');
  await page.click('#book_now');

  const ccError = page.locator('#cc_num_span');
  const cvvError = page.locator('#cc_cvv_span');

  await expect(ccError).toBeVisible();
  await expect(ccError).toHaveText('Please Enter your 16 Digit Credit Card Number');
  await expect(cvvError).toBeVisible();
  await expect(cvvError).toHaveText('Please Enter your Credit Card CVV Number');
  await expect(page.locator('#book_now')).toBeVisible();
});