'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { PageLoader } from '../components/PageLoader';
import { RelatedSeoLinks } from '../components/seo/RelatedSeoLinks';
import { getSeoLinksForStaticPage } from '../seo/seoLinkGraph';

const loaders = {
  Home: () => import('../views/Home'),
  Shop: () => import('../views/Shop'),
  Cart: () => import('../views/Cart'),
  Checkout: () => import('../views/Checkout'),
  Blog: () => import('../views/Blog'),
  Profile: () => import('../views/Profile'),
  Orders: () => import('../views/Orders'),
  Wishlist: () => import('../views/Wishlist'),
  Search: () => import('../views/Search'),
  Categories: () => import('../views/Categories'),
  Login: () => import('../views/Login'),
  FAQ: () => import('../views/FAQ'),
  Shipping: () => import('../views/Shipping'),
  Contact: () => import('../views/Contact'),
  AboutUs: () => import('../views/AboutUs'),
  PeptideGuide: () => import('../views/PeptideGuide'),
  PeptideCalculator: () => import('../views/PeptideCalculator'),
  COALibrary: () => import('../views/COALibrary'),
  PeptideInformation: () => import('../views/PeptideInformation'),
  PeptideResearch: () => import('../views/PeptideResearch'),
  PeptideGlossary: () => import('../views/PeptideGlossary'),
  PeptideStats: () => import('../views/PeptideStats'),
  CoaVsNoCoa: () => import('../views/CoaVsNoCoa'),
  Terms: () => import('../views/Terms'),
  Privacy: () => import('../views/Privacy'),
  RefundReturns: () => import('../views/RefundReturns'),
  AdminDashboard: () => import('../views/AdminDashboard'),
} as const;

export type StaticPageId = keyof typeof loaders;

/** One dynamic wrapper per page id — avoid a shared mutable cache across navigations. */
const DynamicPages = Object.fromEntries(
  (Object.keys(loaders) as StaticPageId[]).map((id) => [
    id,
    dynamic(loaders[id], {
      loading: () => <PageLoader />,
      ssr: true,
    }),
  ]),
) as Record<StaticPageId, ComponentType>;

export function StaticPageHost({ page, answer }: { page: StaticPageId; answer?: string }) {
  const Comp = DynamicPages[page];
  const seoLinks = getSeoLinksForStaticPage(page);
  return (
    <>
      {answer ? (
        <section id="answer" aria-label="Quick Answer" className="mx-auto max-w-3xl px-4 pt-6">
          <p className="rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-steel-600">
            <strong className="text-navy-950">Respuesta rápida:</strong> {answer}
          </p>
        </section>
      ) : null}
      <Comp key={page} />
      {seoLinks ? <RelatedSeoLinks key={`seo-${page}`} links={seoLinks} /> : null}
    </>
  );
}
