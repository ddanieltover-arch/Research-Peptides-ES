/**
 * Writes src/lib/liveProductImages.ts from Storage originals (not /rebrand/).
 * Also optionally updates remaining rebrand rows in the catalog.
 *
 *   npx tsx scripts/write-live-image-map.ts --apply-db
 */
import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';

loadEnv({ path: '.env.local' });
loadEnv();

const applyDb = process.argv.includes('--apply-db');
const HOST = 'cdpwpggnjdknryhkjccd.supabase.co';
const PUBLIC = `https://${HOST}/storage/v1/object/public/products`;

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const sb = createClient(url, key);

async function listAll(prefix = ''): Promise<string[]> {
  const names: string[] = [];
  const { data, error } = await sb.storage.from('products').list(prefix, { limit: 1000 });
  if (error) throw error;
  for (const item of data ?? []) {
    const p = prefix ? `${prefix}/${item.name}` : item.name;
    if (!item.id) names.push(...(await listAll(p)));
    else names.push(p);
  }
  return names;
}

function stem(filename: string): string {
  return filename.replace(/\.[^.]+$/, '').replace(/_\d{10,}$/, '');
}

function scoreMatch(slug: string, filename: string): number {
  const s = slug.toLowerCase();
  const fileStem = stem(filename.split('/').pop() || '').toLowerCase();
  if (fileStem === s) return 1000 + s.length;
  if (fileStem.startsWith(`${s}-`) || fileStem.startsWith(`${s}_`)) return 800 + s.length;
  if (s.startsWith(fileStem) && fileStem.length >= 8) return 400 + fileStem.length;
  return -1;
}

function pickFile(slug: string, files: string[]): string | null {
  let best: { file: string; score: number } | null = null;
  for (const file of files) {
    const score = scoreMatch(slug, file);
    if (score < 0) continue;
    if (!best || score > best.score) best = { file, score };
  }
  return best?.file ?? null;
}

async function main() {
  const files = (await listAll()).filter((f) => !f.startsWith('rebrand/'));
  const { data: products, error } = await sb.from('products').select('id, slug, images');
  if (error) throw error;

  const map: Record<string, string> = {};
  const pending: { id: string; slug: string; url: string }[] = [];

  for (const product of products ?? []) {
    const slug = String(product.slug || '').toLowerCase();
    if (!slug) continue;
    const file = pickFile(slug, files);
    if (!file) continue;
    const liveUrl = `${PUBLIC}/${file}`;
    map[slug] = liveUrl;
    const current = product.images?.[0] || '';
    if (current.includes('/rebrand/') || current.includes('unsplash.com')) {
      pending.push({ id: product.id, slug, url: liveUrl });
    }
  }

  const outPath = path.join(process.cwd(), 'src/lib/liveProductImages.ts');
  const body = `/** Original live-storefront product photos (Supabase Storage, not /rebrand/). */
export const LIVE_PRODUCT_IMAGES: Record<string, string> = ${JSON.stringify(map, null, 2)};

export function liveProductImage(slug?: string | null, fallback?: string | null): string | undefined {
  if (slug && LIVE_PRODUCT_IMAGES[slug]) return LIVE_PRODUCT_IMAGES[slug];
  if (fallback && !fallback.includes('/rebrand/') && !fallback.includes('unsplash.com')) {
    return fallback;
  }
  if (fallback?.includes('/rebrand/')) {
    const name = fallback.split('/rebrand/')[1]?.split('?')[0]?.replace(/\\.png$/i, '');
    if (name && LIVE_PRODUCT_IMAGES[name]) return LIVE_PRODUCT_IMAGES[name];
  }
  return fallback || undefined;
}

export function withLiveProductImages<T extends { slug?: string | null; images?: string[] | null }>(
  product: T,
): T {
  const live = liveProductImage(product.slug, product.images?.[0]);
  if (!live) return product;
  return { ...product, images: [live, ...(product.images || []).filter((u) => u && u !== live)] };
}
`;
  fs.writeFileSync(outPath, body, 'utf8');
  console.log(`Wrote ${Object.keys(map).length} live image mappings to ${outPath}`);
  console.log(`DB rows still on rebrand/unsplash: ${pending.length}`);

  if (!applyDb || pending.length === 0) return;

  let ok = 0;
  let fail = 0;
  const chunkSize = 8;
  for (let i = 0; i < pending.length; i += chunkSize) {
    const chunk = pending.slice(i, i + chunkSize);
    const results = await Promise.all(
      chunk.map(async (row) => {
        for (let attempt = 0; attempt < 3; attempt++) {
          const { error: upErr } = await sb.from('products').update({ images: [row.url] }).eq('id', row.id);
          if (!upErr) return true;
          await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
        }
        console.error('FAIL', row.slug);
        return false;
      }),
    );
    ok += results.filter(Boolean).length;
    fail += results.filter((v) => !v).length;
    console.log(`updated ${Math.min(i + chunkSize, pending.length)}/${pending.length}`);
  }
  console.log(`DB apply done. ok=${ok} fail=${fail}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
