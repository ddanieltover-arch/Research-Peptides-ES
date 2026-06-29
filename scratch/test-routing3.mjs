import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext();
await context.addInitScript(() => {
  localStorage.setItem('rp-es-locale', 'en');
});
const page = await context.newPage();

async function snapshot(label) {
  const exploreCatalog = await page.getByRole('link', { name: /explorar catálogo/i }).count();
  const shopH1 = await page.locator('h1').filter({ hasText: /tienda|shop/i }).count();
  const heroH1 = await page.locator('h1').filter({ hasText: /laboratorios europeos/i }).count();
  console.log(`\n${label}`);
  console.log('  url:', page.url());
  console.log('  home CTA:', exploreCatalog);
  console.log('  shop h1:', shopH1);
  console.log('  hero h1:', heroH1);
}

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await snapshot('home with en stored');

const tienda = page.getByRole('link', { name: /^(tienda|shop)$/i }).first();
await tienda.click();
await page.waitForTimeout(1000);
await snapshot('after nav click');

await page.goto('http://localhost:5173/tienda', { waitUntil: 'networkidle' });
await snapshot('direct /tienda');

await browser.close();
