import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

for (const path of ['/en', '/en/shop', '/tienda', '/']) {
  await page.goto(`http://localhost:5173${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  console.log(`\n${path} -> ${page.url()}`);
  console.log('  main:', await page.locator('main').count());
  console.log('  header:', await page.locator('header').count());
  console.log('  root children:', await page.locator('#root > *').count());
  console.log('  h1:', await page.locator('h1').allTextContents().catch(() => []));
}

await browser.close();
