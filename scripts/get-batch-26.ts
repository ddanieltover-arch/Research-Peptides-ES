import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('products').select('title, slug, images');
  if (error) {
    console.error(error); return;
  }
  // Filter products that DO NOT have a supabase storage URL
  const pending = data.filter(p => {
    const img = p.images?.[0] || '';
    return !img.includes('cdpwpggnjdknryhkjccd.supabase.co') && !img.includes('rebranded_vial');
  });
  
  console.log(`Remaining products: ${pending.length}`);
  console.log('Next 5 products:');
  pending.slice(0, 5).forEach(p => console.log(`- ${p.title} (${p.slug})`));
}
main();
