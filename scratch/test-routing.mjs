import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

async function check(path, label) {
  await page.goto(`http://localhost:5173${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const text = await page.locator('body').innerText();
  const h1 = await page.locator('h1').first().innerText().catch(() => '');
  console.log(`\n=== ${label} (${page.url()}) ===`);
  console.log('h1:', h1.slice(0, 80));
  console.log('hero:', /laboratorios europeos/i.test(text));
  console.log('shop:', /resultados|filtros|catálogo|productos/i.test(text));
  console.log('product detail:', /añadir al carrito|add to cart/i.test(text));
}

await check('/', 'home');
await check('/tienda', 'tienda');
await check('/producto/hcg-human-chorionic-gonadotropin-5000iu', 'product');

// click nav link from home
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
const tiendaLink = page.getByRole('link', { name: /^tienda$/i }).first();
if (await tiendaLink.count()) {
  await tiendaLink.click();
  await page.waitForTimeout(800);
  const text = await page.locator('body').innerText();
  console.log('\n=== after click Tienda ===');
  console.log('url:', page.url());
  console.log('hero:', /laboratorios europeos/i.test(text));
  console.log('shop:', /resultados|filtros|catálogo|productos/i.test(text));
}

await browser.close();
