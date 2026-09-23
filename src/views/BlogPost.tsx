'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabase';
import { LocaleLink } from '../i18n/LocaleLink';
import { BRAND_NAME } from '../config/brand';
import { usePageSeo } from '../seo/SeoProvider';
import { resolveBlogImageUrl } from '../lib/blogImages';
import { getBlogSeoCopy } from '../seo/blogSeoCopy';
import { blogArticleJsonLd, blogFaqJsonLd } from '../seo/structuredData';
import type { LocaleCode } from '../i18n/locales';
import {
  BlogArticleSkeleton,
  BlogArticleTemplate,
  type BlogPostRecord,
} from '../components/blog/BlogArticleTemplate';
import { PageShell } from '../design-system';
import { blogPostIdFromPath } from '../i18n/routing';

function resolvePostId(
  propId: string | undefined,
  params: ReturnType<typeof useParams>,
  pathname: string | null,
): string | undefined {
  if (propId) return propId;
  const raw = params?.id;
  if (typeof raw === 'string' && raw) return raw;
  if (Array.isArray(raw) && raw[0]) return raw[0];
  return blogPostIdFromPath(pathname || '');
}

type BlogPostProps = {
  id?: string;
  initialPost?: BlogPostRecord | null;
  initialRelated?: BlogPostRecord[];
};

export default function BlogPost({
  id: idProp,
  initialPost = null,
  initialRelated = [],
}: BlogPostProps) {
  const { t, i18n } = useTranslation('blog');
  const locale = i18n.language as LocaleCode;
  const params = useParams();
  const pathname = usePathname();
  const id = resolvePostId(idProp, params, pathname);
  const [post, setPost] = useState<BlogPostRecord | null>(initialPost);
  const [related, setRelated] = useState<BlogPostRecord[]>(initialRelated);
  const [loading, setLoading] = useState(!initialPost && Boolean(id));

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    // Prefer server-provided post when id matches (avoids broken client Supabase env).
    if (initialPost && initialPost.id === id) {
      setPost(initialPost);
      setRelated(initialRelated);
      setLoading(false);
      if (!isSupabaseConfigured) return;
    }

    void (async () => {
      try {
        const [postRes, relatedRes] = await Promise.all([
          supabase.from('blog_posts').select('*').eq('id', id).maybeSingle(),
          supabase
            .from('blog_posts')
            .select('id, title, content, image_url, created_at')
            .neq('id', id)
            .order('created_at', { ascending: false })
            .limit(3),
        ]);

        if (postRes.data) setPost(postRes.data as BlogPostRecord);
        else if (!initialPost || initialPost.id !== id) setPost(null);

        if (relatedRes.data?.length) setRelated(relatedRes.data as BlogPostRecord[]);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, initialPost, initialRelated]);

  const seoCopy = post ? getBlogSeoCopy(post.id, locale, post.title) : null;

  usePageSeo(
    post && seoCopy
      ? {
          title: `${seoCopy.documentTitle} | ${BRAND_NAME}`,
          description: seoCopy.metaDescription,
          canonicalPath: `/blog/${post.id}`,
          ogType: 'article',
          ogImage: resolveBlogImageUrl(post.image_url) ?? undefined,
          jsonLd: [
            blogArticleJsonLd(post, locale),
            ...(blogFaqJsonLd(post.id, locale, post.title)
              ? [blogFaqJsonLd(post.id, locale, post.title)!]
              : []),
          ],
        }
      : null,
  );

  if (loading) return <BlogArticleSkeleton />;

  if (!post) {
    return (
      <PageShell tone="mist" className="min-h-[70vh] flex items-center justify-center p-8">
        <div className="text-center max-w-md bg-white rounded-xl border border-slate-200 p-10 shadow-card">
          <BookOpen className="h-14 w-14 text-brand-200 mx-auto mb-5" aria-hidden />
          <h2 className="text-2xl font-display font-semibold text-navy-950 mb-3">{t('notFoundTitle')}</h2>
          <p className="text-steel-600 text-sm mb-8">{t('notFoundBody')}</p>
          <LocaleLink
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('returnToArchives')}
          </LocaleLink>
        </div>
      </PageShell>
    );
  }

  return <BlogArticleTemplate post={post} related={related} />;
}
