/**
 * Upserts Spanish category names/descriptions (keeps slugs for product filters).
 *
 *   npx tsx scripts/seed-spanish-categories.ts
 */
import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { esCategories } from '../serverless/content/esCategories';

loadEnv({ path: '.env.local' });
loadEnv();

async function main() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(url, key);
  const { data: rows, error } = await supabase.from('categories').select('id,name,slug');
  if (error) {
    console.error(error.message);
    process.exit(1);
  }

  for (const cat of esCategories) {
    const match =
      rows?.find((r) => r.slug === cat.slug) ||
      rows?.find((r) => (r.name || '').toLowerCase() === cat.slug.replace(/-/g, ' ')) ||
      rows?.find((r) => (r.slug || '').toLowerCase() === cat.slug);

    // Also match legacy English names
    const englishNameMap: Record<string, string[]> = {
      peptides: ['Peptides'],
      sarms: ['SARMs'],
      'research-chemicals': ['Research Chemicals'],
      'peptide-blends': ['Peptide Blends'],
      'peptide-capsules': ['Peptide Capsules'],
      'igf-1-proteins': ['IGF-1 Proteins'],
      'melanotan-peptides': ['Melanotan Peptides'],
      supplements: ['Supplements'],
      'lab-supplies': ['Lab Supplies'],
      'peptide-powder': ['Peptide Powder'],
    };
    const byEnglish =
      match ||
      rows?.find((r) => (englishNameMap[cat.slug] || []).includes(r.name || ''));

    if (!byEnglish) {
      console.warn(`skip missing category ${cat.slug}`);
      continue;
    }

    const { error: updErr } = await supabase
      .from('categories')
      .update({ name: cat.name, description: cat.description, slug: cat.slug })
      .eq('id', byEnglish.id);

    if (updErr) console.error(cat.slug, updErr.message);
    else console.log(`✓ ${cat.slug} → ${cat.name}`);
  }
}

main();
