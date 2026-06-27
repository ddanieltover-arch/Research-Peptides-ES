/**
 * Generate social share image: logo centered on white 1200×630 canvas.
 *   npm run og:generate
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const logoSrc = path.join(root, 'src/assets/logo.png');
const outPng = path.join(root, 'public/og-image.png');
const outJpg = path.join(root, 'public/og-image.jpg');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const LOGO_MAX_WIDTH = 920;

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
  if (!fs.existsSync(logoSrc)) {
    console.error('Missing src/assets/logo.png');
    process.exit(1);
  }

  const logo = await withTransparentBlack(sharp(logoSrc), sharp);
  const logoResized = await logo
    .resize(LOGO_MAX_WIDTH, Math.round(OG_HEIGHT * 0.72), {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .png()
    .toBuffer();

  const { width: logoW, height: logoH } = await sharp(logoResized).metadata();
  const left = Math.floor((OG_WIDTH - (logoW ?? 0)) / 2);
  const top = Math.floor((OG_HEIGHT - (logoH ?? 0)) / 2);

  const canvas = sharp({
    create: {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  }).composite([{ input: logoResized, left, top }]);

  await canvas.clone().png({ compressionLevel: 9 }).toFile(outPng);
  await canvas.clone().jpeg({ quality: 92, mozjpeg: true }).toFile(outJpg);

  const pngKb = (fs.statSync(outPng).size / 1024).toFixed(1);
  const jpgKb = (fs.statSync(outJpg).size / 1024).toFixed(1);
  console.log(`Wrote ${outPng} (${pngKb} KB)`);
  console.log(`Wrote ${outJpg} (${jpgKb} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
