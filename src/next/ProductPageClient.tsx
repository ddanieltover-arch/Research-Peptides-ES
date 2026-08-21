'use client';

import dynamic from 'next/dynamic';
import { PageLoader } from '../components/PageLoader';

const ProductDetails = dynamic(() => import('../views/ProductDetails'), {
  loading: () => <PageLoader />,
  ssr: true,
});

export function ProductPageClient() {
  return <ProductDetails />;
}
