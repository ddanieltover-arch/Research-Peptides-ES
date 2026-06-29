import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

for (const path of ['/', '/en', '/en/shop', '/tienda', '/shop']) {
  await page.goto(`http://localhost:5173${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const h1s = await page.locator('h1').allTextContents();
  const mainText = await page.locator('main').innerText().catch(() => '');
  console.log(`\n${path} -> ${page.url()}`);
  console.log('h1s:', h1s.map((t) => t.replace(/\s+/g, ' ').trim().slice(0, 60)));
  console.log('main has explorar:', /explorar catálogo/i.test(mainText));
  console.log('main has tienda:', /tienda péptidos/i.test(mainText));
}

await browser.close();
