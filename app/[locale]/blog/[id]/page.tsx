import type { Metadata } from 'next';
import type { LocaleCode } from '../../../../src/i18n/locales';
import { buildPageMetadata, JsonLdScript } from '../../../../src/seo/buildPageMetadata';
import { getServerSupabase } from '../../../../src/lib/supabaseServer';
import { BRAND_NAME } from '../../../../src/config/brand';
import { BlogPostPageClient } from '../../../../src/next/BlogPostPageClient';

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const supabase = getServerSupabase();
  let title = 'Blog';
  let description: string | undefined;
  if (supabase) {
    const { data } = await supabase.from('blog_posts').select('title, excerpt, content').eq('id', id).maybeSingle();
    if (data?.title) title = data.title;
    description = data?.excerpt || (data?.content ? String(data.content).slice(0, 160) : undefined);
  }
  return buildPageMetadata(locale as LocaleCode, `/blog/${id}`, {
    title: `${title} | ${BRAND_NAME}`,
    description,
    ogType: 'article',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = getServerSupabase();
  let post: Record<string, unknown> | null = null;
  if (supabase) {
    const { data } = await supabase.from('blog_posts').select('*').eq('id', id).maybeSingle();
    post = data;
  }

  const ld = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt || undefined,
        datePublished: post.created_at,
        dateModified: post.updated_at || post.created_at,
      }
    : null;

  return (
    <>
      {ld ? <JsonLdScript data={ld} /> : null}
      {post ? <h1 className="sr-only">{String(post.title || id)}</h1> : null}
      <BlogPostPageClient />
    </>
  );
}
