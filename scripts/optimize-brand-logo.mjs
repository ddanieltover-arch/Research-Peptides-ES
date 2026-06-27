/**
 * Optimize horizontal brand logo for header/footer + public SEO assets.
 * Run: node scripts/optimize-brand-logo.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcPng = path.join(root, 'src/assets/logo.png');
const outWebp = path.join(root, 'src/assets/logo.webp');
const brandLogoPng = path.join(root, 'public/brand_logo.png');
const brandLogoWebp = path.join(root, 'public/brand_logo.webp');
const faviconPng = path.join(root, 'public/favicon.png');
const faviconWebp = path.join(root, 'public/favicon.webp');

/** Make near-black JPEG background transparent for light/dark headers. */
async function withTransparentBlack(image, sharpFactory, threshold = 42) {
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = new Uint8Array(data);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      pixels[i + 3] = 0;
    }
  }
  return sharpFactory(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
}

async function main() {
  const sharp = (await import('sharp')).default;
  if (!fs.existsSync(srcPng)) {
    console.error('Missing src/assets/logo.png');
    process.exit(1);
  }

  const base = await withTransparentBlack(sharp(srcPng), sharp);

  await base
    .clone()
    .resize(520, 152, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 90, effort: 6, alphaQuality: 100 })
    .toFile(outWebp);

  const webpStat = fs.statSync(outWebp);
  console.log(`Wrote ${outWebp} (${(webpStat.size / 1024).toFixed(1)} KB)`);

  await base
    .clone()
    .resize(1024, 298, { fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(brandLogoPng);
  console.log(`Wrote ${brandLogoPng}`);

  await base
    .clone()
    .resize(1024, 298, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(brandLogoWebp);
  console.log(`Wrote ${brandLogoWebp}`);

  await base
    .clone()
    .extract({ left: 0, top: 0, width: 298, height: 298 })
    .resize(192, 192, { fit: 'cover', position: 'left' })
    .png()
    .toFile(faviconPng);

  await sharp(faviconPng).resize(192, 192).webp({ quality: 90 }).toFile(faviconWebp);
  console.log(`Wrote ${faviconPng} and ${faviconWebp}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
