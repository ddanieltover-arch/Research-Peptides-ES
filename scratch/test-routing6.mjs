import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto('http://localhost:5173/en/shop', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
console.log('url:', page.url());
console.log('body length:', (await page.locator('body').innerHTML()).length);
console.log('has main:', await page.locator('main').count());
console.log('has header:', await page.locator('header').count());
console.log('body text:', (await page.locator('body').innerText()).slice(0, 300));

await browser.close();
