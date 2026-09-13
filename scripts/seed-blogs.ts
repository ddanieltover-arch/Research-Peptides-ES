import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { coreBlogPosts } from '../serverless/content/esCoreBlogPosts';

loadEnv({ path: '.env.local' });
loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log(`Seeding ${coreBlogPosts.length} blog posts (Spanish)…`);
  for (const post of coreBlogPosts) {
    const { error } = await supabase.from('blog_posts').upsert(
      { ...post, updated_at: new Date().toISOString() },
      { onConflict: 'id' },
    );

    if (error) {
      console.error(`Error inserting "${post.id}":`, error.message);
    } else {
      console.log(`✓ ${post.title}`);
    }
  }
  console.log('Done.');
}

seed();
