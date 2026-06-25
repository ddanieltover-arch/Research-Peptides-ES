import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { supabase } from '../supabase';
import { LocaleLink } from '../i18n/LocaleLink';
import { BRAND_NAME } from '../config/brand';
import { usePageSeo } from '../seo/SeoProvider';
import { blogExcerpt } from '../lib/blogContent';
import { resolveBlogImageUrl } from '../lib/blogImages';
import {
  BlogArticleSkeleton,
  BlogArticleTemplate,
  type BlogPostRecord,
} from '../components/blog/BlogArticleTemplate';
import { PageShell } from '../design-system';

export default function BlogPost() {
  const { t } = useTranslation('blog');
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostRecord | null>(null);
  const [related, setRelated] = useState<BlogPostRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    void (async () => {
      try {
        const [postRes, relatedRes] = await Promise.all([
          supabase.from('blog_posts').select('*').eq('id', id).single(),
          supabase
            .from('blog_posts')
            .select('id, title, content, image_url, created_at')
            .neq('id', id)
            .order('created_at', { ascending: false })
            .limit(3),
        ]);

        if (postRes.data) setPost(postRes.data as BlogPostRecord);
        if (relatedRes.data) setRelated(relatedRes.data as BlogPostRecord[]);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  usePageSeo(
    post
      ? {
          title: `${post.title} | ${BRAND_NAME} ${t('titleSuffix')}`,
          description: blogExcerpt(post.content, 155),
          canonicalPath: `/blog/${post.id}`,
          ogType: 'article',
          ogImage: resolveBlogImageUrl(post.image_url) ?? undefined,
          jsonLd: [
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: post.title,
              image: resolveBlogImageUrl(post.image_url)
                ? [resolveBlogImageUrl(post.image_url)!]
                : [],
              datePublished: post.created_at,
              dateModified: post.created_at,
              author: {
                '@type': 'Organization',
                name: t('editorialBoard'),
              },
            },
          ],
        }
      : null,
  );

  if (loading) return <BlogArticleSkeleton />;

  if (!post) {
    return (
      <PageShell tone="mist" className="min-h-[70vh] flex items-center justify-center p-8">
        <div className="text-center max-w-md bg-white rounded-[1.75rem] border border-brand-100 p-10 shadow-elevated">
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
