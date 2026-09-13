import type { Metadata } from 'next';
import type { LocaleCode } from '../../../../src/i18n/locales';
import { buildPageMetadata, JsonLdScript } from '../../../../src/seo/buildPageMetadata';
import { getServerSupabase } from '../../../../src/lib/supabaseServer';
import { BRAND_NAME } from '../../../../src/config/brand';
import { BlogPostPageClient } from '../../../../src/next/BlogPostPageClient';
import type { BlogPostRecord } from '../../../../src/components/blog/BlogArticleTemplate';
import { blogExcerpt } from '../../../../src/lib/blogContent';

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const supabase = getServerSupabase();
  let title = 'Blog';
  let description: string | undefined;
  if (supabase) {
    const { data } = await supabase
      .from('blog_posts')
      .select('title, content')
      .eq('id', id)
      .maybeSingle();
    if (data?.title) title = data.title;
    if (data?.content) description = blogExcerpt(String(data.content), 160);
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
  let initialPost: BlogPostRecord | null = null;
  let initialRelated: BlogPostRecord[] = [];

  if (supabase) {
    const [postRes, relatedRes] = await Promise.all([
      supabase.from('blog_posts').select('*').eq('id', id).maybeSingle(),
      supabase
        .from('blog_posts')
        .select('id, title, content, image_url, created_at')
        .neq('id', id)
        .order('created_at', { ascending: false })
        .limit(3),
    ]);
    if (postRes.data) initialPost = postRes.data as BlogPostRecord;
    if (relatedRes.data) initialRelated = relatedRes.data as BlogPostRecord[];
  }

  const ld = initialPost
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: initialPost.title,
        description: blogExcerpt(initialPost.content, 160),
        datePublished: initialPost.created_at,
        dateModified: initialPost.created_at,
      }
    : null;

  return (
    <>
      {ld ? <JsonLdScript data={ld} /> : null}
      {initialPost ? <h1 className="sr-only">{initialPost.title}</h1> : null}
      <BlogPostPageClient id={id} initialPost={initialPost} initialRelated={initialRelated} />
    </>
  );
}
