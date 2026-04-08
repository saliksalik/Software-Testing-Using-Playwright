const { test, expect } = require('@playwright/test');

const VALID_USER = 'RandomGuy9571';
const VALID_PASSWORD = 'T87AC4';
const RUN_STAMP = new Date().toISOString().replace(/[:.]/g, '-');

test('E2E booking flow: login, search, select, book, itinerary, logout', async ({ page }) => {
  let orderNumber = '';

  await test.step('Step 1: Login with valid credentials', async () => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Adactin.com - Hotel Reservation System/);
    await expect(page).toHaveURL(/adactinhotelapp\.com\/(?:index\.php)?$/);

    await page.fill('#username', VALID_USER);
    await page.fill('#password', VALID_PASSWORD);

    await page.click('#login');

    const welcomeName = page.locator('#username_show');
    await expect(welcomeName).toBeVisible();
    await expect(welcomeName).toHaveValue(new RegExp(`Hello ${VALID_USER}!`));
    await expect(page).toHaveURL(/SearchHotel\.php/);
  });

  await test.step('Step 2: Search hotels with valid mandatory fields', async () => {
    await page.selectOption('#location', { value: 'Sydney' });
    await page.selectOption('#hotels', { value: 'Hotel Creek' });
    await page.selectOption('#room_type', { value: 'Standard' });
    await page.selectOption('#room_nos', { value: '1' });
    await page.fill('#datepick_in', '30/03/2026');
    await page.fill('#datepick_out', '31/03/2026');
    await page.selectOption('#adult_room', { value: '2' });
    await page.click('#Submit');

    const selectHotelHeader = page.locator('.login_title');
    await expect(selectHotelHeader).toBeVisible();
    await expect(selectHotelHeader).toHaveText(/Select Hotel/);
    await expect(page).toHaveURL(/SelectHotel\.php/);
  });

  await test.step('Step 3: Select first available hotel and continue', async () => {
    await page.click('#radiobutton_0');
    await page.click('#continue');

    const bookHotelHeader = page.locator('.login_title', { hasText: 'Book A Hotel' });
    await expect(bookHotelHeader).toBeVisible();
    await expect(bookHotelHeader).toHaveText(/Book A Hotel/);
    await expect(page).toHaveURL(/BookHotel\.php/);
  });

  await test.step('Step 4: Complete booking form and submit', async () => {
    await page.fill('#first_name', 'Salik');
    await page.fill('#last_name', 'Ahmad');
    await page.fill('#address', 'North Nazimabad Block N B214, Karachi');
    await page.fill('#cc_num', '4111111111111111');
    await page.selectOption('#cc_type', { value: 'VISA' });
    await page.selectOption('#cc_exp_month', { value: '7' });
    await page.selectOption('#cc_exp_year', { value: '2029' });
    await page.fill('#cc_cvv', '123');
    await page.click('#book_now');
  });

  await test.step('Step 5: Capture and validate generated Order ID', async () => {
    await page.waitForSelector('#order_no', { state: 'visible', timeout: 30000 });

    const bookingHeader = page.locator('.login_title');
    await expect(bookingHeader).toBeVisible();
    await expect(bookingHeader).toHaveText(/Booking Confirmation/);
    await expect(page).toHaveURL(/BookingConfirm\.php/);

    orderNumber = (await page.locator('#order_no').inputValue()).trim();
    expect(orderNumber).not.toBe('');

    const safeOrderId = orderNumber.replace(/[^a-zA-Z0-9_-]/g, '_');
    await page.screenshot({ path: `test-results/e2e/orderid-${safeOrderId}-${RUN_STAMP}.png`, fullPage: true });
  });

  await test.step('Step 6: Verify same Order ID appears in My Itinerary', async () => {
    await page.click('#my_itinerary');

    const searchOrderInput = page.locator('#order_id_text');
    await expect(searchOrderInput).toBeVisible();
    await expect(page).toHaveURL(/BookedItinerary\.php/);
    await searchOrderInput.fill(orderNumber);
    await page.click('#search_hotel_id');

    const itineraryResultRow = page.getByRole('row', { name: new RegExp(orderNumber) }).first();
    await expect(itineraryResultRow).toBeVisible();
    await expect(itineraryResultRow).toContainText(orderNumber);

    const safeOrderId = orderNumber.replace(/[^a-zA-Z0-9_-]/g, '_');
    await page.screenshot({ path: `test-results/e2e/itinerary-orderid-${safeOrderId}-${RUN_STAMP}.png`, fullPage: true });
  });

  await test.step('Step 7: Logout and validate confirmation message', async () => {
    await page.getByRole('link', { name: 'Logout' }).click();

    const logoutMessage = page.getByText('You have successfully logged out.');
    await expect(logoutMessage).toBeVisible();
    await expect(logoutMessage).toContainText('You have successfully logged out.');
    await expect(page).toHaveURL(/Logout\.php/);
  });
});