const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://adactinhotelapp.com/');
  await page.fill('#username', 'RandomGuy9571');
  await page.fill('#password', 'T87AC4');
  await page.click('#login');
  await page.waitForURL('**/SearchHotel.php');

  await page.goto('https://adactinhotelapp.com/BookedItinerary.php');
  await page.waitForLoadState('domcontentloaded');

  const rows = await page.evaluate(() => {
    const table = document.querySelector('#booked_form table');
    if (!table) return [];

    const trs = Array.from(table.querySelectorAll('tr'));
    const data = [];

    for (const tr of trs) {
      const orderInput = tr.querySelector('input[name="ids[]"]');
      if (!orderInput) continue;

      const tds = tr.querySelectorAll('td');
      const orderId = orderInput.value || '';
      const hotel = tds[2]?.innerText?.trim() || '';
      const location = tds[3]?.innerText?.trim() || '';
      const roomType = tds[4]?.innerText?.trim() || '';
      const rooms = tds[5]?.innerText?.trim() || '';
      const checkIn = tds[6]?.innerText?.trim() || '';
      const checkOut = tds[7]?.innerText?.trim() || '';
      const status = tds[12]?.innerText?.trim() || '';

      data.push({ orderId, hotel, location, roomType, rooms, checkIn, checkOut, status });
    }

    return data;
  });

  console.log(JSON.stringify({ count: rows.length, entries: rows.slice(0, 10) }, null, 2));

  await browser.close();
})();
