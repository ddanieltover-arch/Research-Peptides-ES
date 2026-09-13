'use client';

import dynamic from 'next/dynamic';
import { PageLoader } from '../components/PageLoader';
import { RelatedSeoLinks } from '../components/seo/RelatedSeoLinks';
import { getSeoLinksForStaticPage } from '../seo/seoLinkGraph';
import type { BlogPostRecord } from '../components/blog/BlogArticleTemplate';

const Blog = dynamic(() => import('../views/Blog'), {
  loading: () => <PageLoader />,
  ssr: true,
});

type BlogIndexPageClientProps = {
  initialPosts?: BlogPostRecord[];
  answer?: string;
};

export function BlogIndexPageClient({ initialPosts = [], answer }: BlogIndexPageClientProps) {
  const seoLinks = getSeoLinksForStaticPage('Blog');
  return (
    <>
      {answer ? (
        <section id="answer" aria-label="Quick Answer" className="mx-auto max-w-3xl px-4 pt-6">
          <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-sm font-sans">
            <strong className="text-navy-950 font-semibold">Respuesta rápida:</strong> {answer}
          </p>
        </section>
      ) : null}
      <Blog initialPosts={initialPosts} />
      {seoLinks ? <RelatedSeoLinks links={seoLinks} /> : null}
    </>
  );
}
