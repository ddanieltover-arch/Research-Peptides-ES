import type { MetadataRoute } from 'next';
import { SITE_URL } from '../src/config/brand';
import { pathWithLocale } from '../src/i18n/routing';
import { PUBLIC_STATIC_CANONICAL_PATHS } from '../src/i18n/routeSlugs';
import type { LocaleCode } from '../src/i18n/locales';
import { getServerSupabase } from '../src/lib/supabaseServer';

const LOCALES: LocaleCode[] = ['es', 'en', 'nl', 'de', 'fr'];
const origin = SITE_URL.replace(/\/+$/, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ['/', ...PUBLIC_STATIC_CANONICAL_PATHS];
  const entries: MetadataRoute.Sitemap = [];

  for (const canonical of staticPaths) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${origin}${pathWithLocale(locale, canonical)}`,
        lastModified: new Date(),
        changeFrequency: canonical === '/' ? 'daily' : 'weekly',
        priority: canonical === '/' ? 1 : 0.7,
      });
    }
  }

  const supabase = getServerSupabase();
  if (supabase) {
    const { data: products } = await supabase.from('products').select('slug').not('slug', 'is', null).limit(500);
    for (const row of products ?? []) {
      if (!row.slug) continue;
      const canonical = `/product/${row.slug}`;
      for (const locale of LOCALES) {
        entries.push({
          url: `${origin}${pathWithLocale(locale, canonical)}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
    const { data: posts } = await supabase.from('blog_posts').select('id').limit(200);
    for (const row of posts ?? []) {
      if (!row.id) continue;
      const canonical = `/blog/${row.id}`;
      for (const locale of LOCALES) {
        entries.push({
          url: `${origin}${pathWithLocale(locale, canonical)}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
