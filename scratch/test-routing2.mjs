import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto('http://localhost:5173/tienda', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

const exploreCatalog = await page.getByRole('link', { name: /explorar catálogo/i }).count();
const shopH1 = await page.locator('h1').filter({ hasText: /tienda/i }).count();
const heroH1 = await page.locator('h1').filter({ hasText: /laboratorios europeos/i }).count();
const productCards = await page.locator('a[href*="/producto/"]').count();

console.log('URL:', page.url());
console.log('explore catalog CTA (home only):', exploreCatalog);
console.log('shop h1 count:', shopH1);
console.log('hero h1 count:', heroH1);
console.log('product cards:', productCards);

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
const tienda = page.getByRole('link', { name: /^tienda$/i }).first();
await tienda.click();
await page.waitForTimeout(1000);
console.log('\nAfter nav click:');
console.log('URL:', page.url());
console.log('explore catalog CTA:', await page.getByRole('link', { name: /explorar catálogo/i }).count());
console.log('shop h1:', await page.locator('h1').filter({ hasText: /tienda/i }).count());
console.log('hero h1:', await page.locator('h1').filter({ hasText: /laboratorios europeos/i }).count());

await browser.close();
