import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror:' + e));
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push('console:' + msg.text());
});

await page.goto('http://localhost:5173/en/shop', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
console.log('url:', page.url());
console.log('body:', await page.locator('body').innerHTML());
console.log('errors:', errors);

await browser.close();
