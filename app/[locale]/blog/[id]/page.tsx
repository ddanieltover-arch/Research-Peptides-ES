import type { Metadata } from 'next';
import type { LocaleCode } from '../../../../src/i18n/locales';
import { buildPageMetadata, JsonLdScript } from '../../../../src/seo/buildPageMetadata';
import { getServerSupabase } from '../../../../src/lib/supabaseServer';
import { BRAND_NAME } from '../../../../src/config/brand';
import { BlogPostPageClient } from '../../../../src/next/BlogPostPageClient';
import type { BlogPostRecord } from '../../../../src/components/blog/BlogArticleTemplate';
import {
  getBlogSeoDocumentTitle,
  getBlogSeoMetaDescription,
} from '../../../../src/seo/blogSeoCopy';
import { blogArticleJsonLd, blogFaqJsonLd, breadcrumbJsonLd } from '../../../../src/seo/structuredData';

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const loc = locale as LocaleCode;
  const supabase = getServerSupabase();
  let fallbackTitle = id;
  if (supabase) {
    const { data } = await supabase.from('blog_posts').select('title').eq('id', id).maybeSingle();
    if (data?.title) fallbackTitle = data.title;
  }
  return buildPageMetadata(loc, `/blog/${id}`, {
    title: `${getBlogSeoDocumentTitle(id, loc, fallbackTitle)} | ${BRAND_NAME}`,
    description: getBlogSeoMetaDescription(id, loc, fallbackTitle),
    ogType: 'article',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, id } = await params;
  const loc = locale as LocaleCode;
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

  const ld: Record<string, unknown>[] = [];
  if (initialPost) {
    ld.push(blogArticleJsonLd(initialPost, loc));
    const faq = blogFaqJsonLd(initialPost.id, loc, initialPost.title);
    if (faq) ld.push(faq);
    ld.push(
      breadcrumbJsonLd(
        [
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: initialPost.title, path: `/blog/${id}` },
        ],
        loc,
      ),
    );
  }

  return (
    <>
      {ld.length ? <JsonLdScript data={ld} /> : null}
      {initialPost ? (
        <article className="sr-only">
          <h1>{initialPost.title}</h1>
          <p>{getBlogSeoMetaDescription(id, loc, initialPost.title)}</p>
        </article>
      ) : null}
      <BlogPostPageClient id={id} initialPost={initialPost} initialRelated={initialRelated} />
    </>
  );
}
