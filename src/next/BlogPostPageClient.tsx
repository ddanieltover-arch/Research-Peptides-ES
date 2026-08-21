'use client';

import dynamic from 'next/dynamic';
import { PageLoader } from '../components/PageLoader';

const BlogPost = dynamic(() => import('../views/BlogPost'), {
  loading: () => <PageLoader />,
  ssr: true,
});

export function BlogPostPageClient() {
  return <BlogPost />;
}
