/**
 * One-shot / idempotent Spanish content seed for production Supabase.
 * POST /api/internal/seed-es-content
 * Header: x-seed-token: <CONTENT_SEED_TOKEN or default below>
 */
import { createClient } from '@supabase/supabase-js';
import { coreBlogPosts } from '../../serverless/content/esCoreBlogPosts.js';
import { esCategories } from '../../serverless/content/esCategories.js';
import { questionPosts } from '../../serverless/content/esQuestionBlogPosts.js';

const DEFAULT_SEED_TOKEN = '';

function getClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
  return createClient(url, key);
}

function authorized(req: { headers?: Record<string, string | string[] | undefined> }) {
  const expected = process.env.CONTENT_SEED_TOKEN || DEFAULT_SEED_TOKEN;
  if (!expected) return false;
  const header = req.headers?.['x-seed-token'];
  const token = Array.isArray(header) ? header[0] : header;
  return Boolean(token && token === expected);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  if (!authorized(req)) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const supabase = getClient();
    const now = new Date().toISOString();
    const results: { blogs: string[]; categories: string[]; errors: string[] } = {
      blogs: [],
      categories: [],
      errors: [],
    };

    const allPosts = [...coreBlogPosts, ...questionPosts];

    for (const post of allPosts) {
      const { error } = await supabase.from('blog_posts').upsert(
        { ...post, updated_at: now },
        { onConflict: 'id' },
      );
      if (error) results.errors.push(`blog:${post.id}:${error.message}`);
      else results.blogs.push(post.id);
    }

    const englishNameBySlug: Record<string, string[]> = {
      peptides: ['Peptides', 'Péptidos'],
      sarms: ['SARMs'],
      'research-chemicals': ['Research Chemicals', 'Productos químicos de investigación'],
      'peptide-blends': ['Peptide Blends', 'Mezclas de péptidos'],
      'peptide-capsules': ['Peptide Capsules', 'Cápsulas de péptidos'],
      'igf-1-proteins': ['IGF-1 Proteins', 'Proteínas IGF-1'],
      'melanotan-peptides': ['Melanotan Peptides', 'Péptidos Melanotan'],
      supplements: ['Supplements', 'Suplementos de laboratorio'],
      'lab-supplies': ['Lab Supplies', 'Material de laboratorio'],
      'peptide-powder': ['Peptide Powder', 'Polvo de péptidos'],
    };

    const { data: allCats, error: catsErr } = await supabase
      .from('categories')
      .select('id,name,slug');
    if (catsErr) {
      results.errors.push(`cats-list:${catsErr.message}`);
    } else {
      for (const cat of esCategories) {
        const aliases = englishNameBySlug[cat.slug] || [];
        const existing =
          allCats?.find((r) => r.slug === cat.slug) ||
          allCats?.find((r) => aliases.includes(r.name || ''));

        if (!existing?.id) {
          results.errors.push(`cat-missing:${cat.slug}`);
          continue;
        }

        const { error } = await supabase
          .from('categories')
          .update({ name: cat.name, description: cat.description, slug: cat.slug })
          .eq('id', existing.id);
        if (error) results.errors.push(`cat-update:${cat.slug}:${error.message}`);
        else results.categories.push(cat.slug);
      }
    }

    return res.status(200).json({
      success: results.errors.length === 0,
      upsertedBlogs: results.blogs.length,
      updatedCategories: results.categories.length,
      blogs: results.blogs,
      categories: results.categories,
      errors: results.errors,
    });
  } catch (error: any) {
    console.error('seed-es-content:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'seed failed',
    });
  }
}
