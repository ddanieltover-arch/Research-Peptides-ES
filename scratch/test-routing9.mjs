import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.getByRole('link', { name: /explorar catálogo/i }).click();
await page.waitForTimeout(1000);
console.log('Hero CTA ->', page.url());
console.log('shop h1:', await page.locator('h1').filter({ hasText: /tienda/i }).count());

await page.goto('http://localhost:5173/tienda', { waitUntil: 'networkidle' });
const productLink = page.locator('a[href*="/producto/"]').first();
const href = await productLink.getAttribute('href');
await productLink.click();
await page.waitForTimeout(1000);
console.log('Product click ->', page.url());
console.log('PDP h1:', (await page.locator('h1').first().innerText()).slice(0, 60));

await browser.close();
