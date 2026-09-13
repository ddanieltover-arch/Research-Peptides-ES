'use client';

import dynamic from 'next/dynamic';
import { PageLoader } from '../components/PageLoader';
import type { BlogPostRecord } from '../components/blog/BlogArticleTemplate';

const BlogPost = dynamic(() => import('../views/BlogPost'), {
  loading: () => <PageLoader />,
  ssr: true,
});

type BlogPostPageClientProps = {
  id: string;
  initialPost?: BlogPostRecord | null;
  initialRelated?: BlogPostRecord[];
};

export function BlogPostPageClient({
  id,
  initialPost = null,
  initialRelated = [],
}: BlogPostPageClientProps) {
  return <BlogPost id={id} initialPost={initialPost} initialRelated={initialRelated} />;
}
