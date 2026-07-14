/**
 * Copy product images from a legacy Supabase Storage host into the current project,
 * then rewrite products.images URLs to point at the destination bucket.
 *
 * Setup in `.env.local`:
 *   SUPABASE_URL=https://ookuaiouverpznpjlqhr.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=<destination service role>
 *
 * Optional:
 *   SOURCE_STORAGE_HOST=cdpwpggnjdknryhkjccd.supabase.co
 *
 * Usage:
 *   npx tsx scripts/migrate-product-images.ts --dry-run
 *   npx tsx scripts/migrate-product-images.ts --apply
 */
import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

loadEnv({ path: '.env.local' });
loadEnv();

const BUCKET = 'products';
const DEFAULT_SOURCE_HOST = 'cdpwpggnjdknryhkjccd.supabase.co';
const PAGE_SIZE = 200;

const apply = process.argv.includes('--apply');
const dryRun = !apply;
const sourceHost = (process.env.SOURCE_STORAGE_HOST || DEFAULT_SOURCE_HOST).replace(/^https?:\/\//, '');

const destUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const destKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!destUrl || !destKey) {
  console.error('Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY for the destination project.');
  process.exit(1);
}

const dest = createClient(destUrl, destKey);

type ProductRow = {
  id: string;
  title: string;
  slug: string | null;
  images: string[] | null;
};

function storagePathFromUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(url.slice(idx + marker.length));
}

function rewriteImageUrl(url: string, destHost: string): string {
  const path = storagePathFromUrl(url);
  if (!path) return url;
  return `https://${destHost}/storage/v1/object/public/${BUCKET}/${path}`;
}

function destHostFromUrl(url: string): string {
  return new URL(url).host;
}

async function fetchAllProducts(): Promise<ProductRow[]> {
  const rows: ProductRow[] = [];
  let from = 0;
  while (true) {
    const { data, error } = await dest
      .from('products')
      .select('id, title, slug, images')
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    if (!data?.length) break;
    rows.push(...(data as ProductRow[]));
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }
  return rows;
}

async function ensureBucket(): Promise<void> {
  if (dryRun) {
    console.log(`Would ensure public bucket "${BUCKET}" exists.`);
    return;
  }
  const { data: buckets, error } = await dest.storage.listBuckets();
  if (error) throw error;
  if (buckets?.some((b) => b.name === BUCKET)) {
    console.log(`Bucket "${BUCKET}" already exists.`);
    return;
  }
  if (dryRun) {
    console.log(`Would create public bucket "${BUCKET}".`);
    return;
  }
  const { error: createError } = await dest.storage.createBucket(BUCKET, { public: true });
  if (createError) throw createError;
  console.log(`Created public bucket "${BUCKET}".`);
}

async function copyImage(sourceUrl: string, storagePath: string): Promise<string> {
  const destHost = destHostFromUrl(destUrl);
  const targetUrl = rewriteImageUrl(sourceUrl, destHost);

  if (!sourceUrl.includes(sourceHost)) {
    return sourceUrl;
  }

  if (dryRun) {
    console.log(`  [dry-run] ${storagePath}`);
    return targetUrl;
  }

  const { data: existing } = await dest.storage.from(BUCKET).list('', {
    search: storagePath.split('/').pop(),
  });
  const alreadyThere = existing?.some((f) => storagePath.endsWith(f.name));
  if (alreadyThere) {
    return targetUrl;
  }

  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Download failed (${response.status}) for ${sourceUrl}`);
  }

  const contentType = response.headers.get('content-type') || 'image/png';
  const buffer = Buffer.from(await response.arrayBuffer());

  const { error: uploadError } = await dest.storage.from(BUCKET).upload(storagePath, buffer, {
    contentType,
    upsert: true,
  });
  if (uploadError) throw uploadError;

  return targetUrl;
}

async function main() {
  if (dryRun) {
    console.log('DRY RUN — pass --apply to copy images and update products.');
  }

  const destHost = destHostFromUrl(destUrl);
  console.log(`Destination: ${destUrl}`);
  console.log(`Source host:   ${sourceHost}`);

  await ensureBucket();

  const products = await fetchAllProducts();
  console.log(`Loaded ${products.length} products.`);

  let pendingProducts = 0;
  let updatedProducts = 0;
  let copiedImages = 0;
  let skippedImages = 0;
  let failed = 0;

  for (const product of products) {
    const images = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
    if (!images.length) continue;

    const needsMigration = images.some((url) => url.includes(sourceHost));
    if (!needsMigration) {
      skippedImages += images.length;
      continue;
    }

    pendingProducts += 1;
    console.log(`\n${product.title} (${product.slug || product.id})`);

    const nextImages: string[] = [];
    for (const imageUrl of images) {
      if (!imageUrl.includes(sourceHost)) {
        nextImages.push(imageUrl);
        skippedImages += 1;
        continue;
      }

      const storagePath = storagePathFromUrl(imageUrl);
      if (!storagePath) {
        console.warn(`  Skipping unrecognized URL: ${imageUrl}`);
        nextImages.push(imageUrl);
        failed += 1;
        continue;
      }

      try {
        const newUrl = await copyImage(imageUrl, storagePath);
        nextImages.push(newUrl);
        copiedImages += 1;
        if (!dryRun) console.log(`  copied ${storagePath}`);
      } catch (err) {
        failed += 1;
        console.error(`  failed ${storagePath}:`, (err as Error).message);
        nextImages.push(imageUrl);
      }
    }

    const changed = JSON.stringify(images) !== JSON.stringify(nextImages);
    if (!changed) continue;

    if (dryRun) {
      console.log(`  would update images -> ${nextImages[0]}`);
      updatedProducts += 1;
      continue;
    }

    const { error } = await dest.from('products').update({ images: nextImages }).eq('id', product.id);
    if (error) {
      failed += 1;
      console.error(`  DB update failed: ${error.message}`);
      continue;
    }

    updatedProducts += 1;
    console.log(`  updated product row`);
  }

  console.log('\nSummary');
  console.log(`  products needing migration: ${pendingProducts}`);
  console.log(`  products updated:           ${updatedProducts}`);
  console.log(`  images copied:              ${copiedImages}`);
  console.log(`  images skipped:             ${skippedImages}`);
  console.log(`  failures:                   ${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
