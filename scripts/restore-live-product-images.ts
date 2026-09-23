/**
 * Point every product.images URL back at the original live Storage photos
 * (not the /rebrand/ variants). Dry-run by default; pass --apply to write.
 *
 *   npx tsx scripts/restore-live-product-images.ts
 *   npx tsx scripts/restore-live-product-images.ts --apply
 */
import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

loadEnv({ path: '.env.local' });
loadEnv();

const apply = process.argv.includes('--apply');
const HOST = 'cdpwpggnjdknryhkjccd.supabase.co';
const PUBLIC = `https://${HOST}/storage/v1/object/public/products`;

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const sb = createClient(url, key);

async function listAll(prefix = ''): Promise<string[]> {
  const names: string[] = [];
  const { data, error } = await sb.storage.from('products').list(prefix, { limit: 1000 });
  if (error) throw error;
  for (const item of data ?? []) {
    const path = prefix ? `${prefix}/${item.name}` : item.name;
    if (!item.id) names.push(...(await listAll(path)));
    else names.push(path);
  }
  return names;
}

function publicUrl(path: string): string {
  return `${PUBLIC}/${path}`;
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

async function main() {
  const files = (await listAll()).filter((f) => !f.startsWith('rebrand/'));
  const { data: products, error } = await sb.from('products').select('id, slug, title, images');
  if (error) throw error;

  console.log(`${apply ? 'APPLY' : 'DRY-RUN'} — ${products?.length} products, ${files.length} original files`);

  let updated = 0;
  let missing = 0;

  for (const product of products ?? []) {
    const slug = String(product.slug || '').toLowerCase();
    if (!slug) {
      missing += 1;
      console.warn(`NO SLUG ${product.title}`);
      continue;
    }

    let best: { file: string; score: number } | null = null;
    for (const file of files) {
      const score = scoreMatch(slug, file);
      if (score < 0) continue;
      if (!best || score > best.score) best = { file, score };
    }

    if (!best) {
      missing += 1;
      console.warn(`NO MATCH ${slug}  current=${product.images?.[0] || ''}`);
      continue;
    }

    const nextUrl = publicUrl(best.file);
    const current = product.images?.[0] || '';
    if (current === nextUrl) continue;

    console.log(`${slug}\n  from ${current}\n  to   ${nextUrl}`);
    updated += 1;

    if (apply) {
      const { error: upErr } = await sb
        .from('products')
        .update({ images: [nextUrl] })
        .eq('id', product.id);
      if (upErr) console.error(`  UPDATE FAIL ${slug}: ${upErr.message}`);
    }
  }

  console.log(`\n${apply ? 'Updated' : 'Would update'}: ${updated}; unmatched: ${missing}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
