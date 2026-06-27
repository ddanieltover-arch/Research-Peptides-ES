/**
 * Replace generic English product descriptions with Spanish-first copy in Supabase.
 *   npx tsx scripts/localize-product-descriptions.ts
 */
import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

loadEnv({ path: '.env.local' });
loadEnv();

const ES =
  'Péptido de investigación premium exclusivamente para uso en investigación de laboratorio.';
const EN = 'Premium research peptide for laboratory research use only.';

async function main() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error('Missing Supabase credentials.');
    process.exit(1);
  }

  const supabase = createClient(url, key);
  const { data: products, error } = await supabase.from('products').select('id, description');
  if (error) throw error;

  let updated = 0;
  for (const row of products ?? []) {
    const desc = String(row.description ?? '').trim();
    const isGeneric =
      !desc ||
      /^premium research peptide for laboratory research use only\.?$/i.test(desc) ||
      /scraped from local dump/i.test(desc);

    if (!isGeneric) continue;

    const { error: updateError } = await supabase
      .from('products')
      .update({ description: ES })
      .eq('id', row.id);

    if (updateError) {
      console.warn(`Skip ${row.id}:`, updateError.message);
      continue;
    }
    updated++;
  }

  console.log(`Updated ${updated} product descriptions to Spanish-first copy.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
