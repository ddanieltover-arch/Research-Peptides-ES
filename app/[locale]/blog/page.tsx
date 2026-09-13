import type { Metadata } from 'next';
import type { LocaleCode } from '../../../src/i18n/locales';
import { buildPageMetadata } from '../../../src/seo/buildPageMetadata';
import { getServerSupabase } from '../../../src/lib/supabaseServer';
import { BlogIndexPageClient } from '../../../src/next/BlogIndexPageClient';
import type { BlogPostRecord } from '../../../src/components/blog/BlogArticleTemplate';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale as LocaleCode, '/blog');
}

export default async function Page() {
  const supabase = getServerSupabase();
  let initialPosts: BlogPostRecord[] = [];
  if (supabase) {
    const { data } = await supabase
      .from('blog_posts')
      .select('id, title, content, image_url, created_at')
      .order('created_at', { ascending: false })
      .limit(50);
    if (data) initialPosts = data as BlogPostRecord[];
  }

  return (
    <BlogIndexPageClient
      initialPosts={initialPosts}
      answer="El diario de investigacion de Research Peptides ES publica notas sobre peptidos, calidad de laboratorio y mejores practicas para investigadores."
    />
  );
}
