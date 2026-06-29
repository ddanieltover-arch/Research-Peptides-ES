import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text());
});

await page.goto('http://localhost:5173/en/shop', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
console.log('url:', page.url());
console.log('main html length:', (await page.locator('main').innerHTML()).length);
console.log('main text:', (await page.locator('main').innerText()).slice(0, 200));
console.log('outlet children:', await page.locator('main > *').count());
console.log('errors:', errors.slice(0, 10));

await browser.close();
