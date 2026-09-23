'use client';

import { lazy, Suspense, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '../components/home/HeroSection';
import { HomeKeywordStrip } from '../components/home/HomeKeywordStrip';
import { HomeSectionFallback } from '../components/home/HomeSectionFallback';
import { LazyWhenVisible } from '../components/LazyWhenVisible';
import { usePageSeo } from '../seo/SeoProvider';
import { DEFAULT_DESCRIPTION } from '../seo/pageTitles';

const METABOLIC_SLUGS = [
  'semaglutide',
  'tirzepatide',
  'retatrutide',
  'cagrilintide',
  'liraglutide',
  'survodutide',
];

const FeaturedProductsSection = lazy(() =>
  import('../components/home/FeaturedProductsSection').then((m) => ({
    default: m.FeaturedProductsSection,
  })),
);
const HomeProductSection = lazy(() =>
  import('../components/home/HomeProductSection').then((m) => ({
    default: m.HomeProductSection,
  })),
);
const WhyEuSection = lazy(() =>
  import('../components/home/WhyEuSection').then((m) => ({ default: m.WhyEuSection })),
);
const CategoryShowcaseSection = lazy(() =>
  import('../components/home/CategoryShowcaseSection').then((m) => ({
    default: m.CategoryShowcaseSection,
  })),
);
const TrustQualitySection = lazy(() =>
  import('../components/home/TrustQualitySection').then((m) => ({
    default: m.TrustQualitySection,
  })),
);
const CustomerExperienceSection = lazy(() =>
  import('../components/home/CustomerExperienceSection').then((m) => ({
    default: m.CustomerExperienceSection,
  })),
);
const CtaSection = lazy(() =>
  import('../components/home/CtaSection').then((m) => ({ default: m.CtaSection })),
);

function DeferredSection({
  minHeight,
  className,
  children,
}: {
  minHeight: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <LazyWhenVisible
      fallback={<HomeSectionFallback minHeight={minHeight} className={className} />}
    >
      <Suspense fallback={<HomeSectionFallback minHeight={minHeight} className={className} />}>
        {children}
      </Suspense>
    </LazyWhenVisible>
  );
}

export default function Home() {
  const { t } = useTranslation('home');
  usePageSeo({
    title: 'Research Peptides ES | Péptidos España | comprar péptidos de investigación',
    description: DEFAULT_DESCRIPTION,
    canonicalPath: '/',
  });

  return (
    <div className="overflow-hidden bg-mist-50">
      <HeroSection />
      <HomeKeywordStrip />
      <DeferredSection minHeight="min-h-[420px]">
        <FeaturedProductsSection />
      </DeferredSection>
      <DeferredSection minHeight="min-h-[360px]">
        <WhyEuSection />
      </DeferredSection>
      <DeferredSection minHeight="min-h-[420px]">
        <HomeProductSection
          eyebrow={t('newArrivals.eyebrow')}
          title={t('newArrivals.title')}
          subtitle={t('newArrivals.subtitle')}
          href="/shop"
          queryKind="newest"
          tone="mist"
        />
      </DeferredSection>
      <DeferredSection minHeight="min-h-[320px]">
        <CategoryShowcaseSection />
      </DeferredSection>
      <DeferredSection minHeight="min-h-[420px]">
        <HomeProductSection
          eyebrow={t('blends.eyebrow')}
          title={t('blends.title')}
          subtitle={t('blends.subtitle')}
          href="/search?category=peptide-blends"
          queryKind="category"
          categorySlug="peptide-blends"
          tone="light"
        />
      </DeferredSection>
      <DeferredSection minHeight="min-h-[300px]">
        <TrustQualitySection />
      </DeferredSection>
      <DeferredSection minHeight="min-h-[420px]">
        <HomeProductSection
          eyebrow={t('metabolic.eyebrow')}
          title={t('metabolic.title')}
          subtitle={t('metabolic.subtitle')}
          href="/shop"
          queryKind="slugs"
          slugNeedles={METABOLIC_SLUGS}
          tone="mist"
        />
      </DeferredSection>
      <DeferredSection minHeight="min-h-[280px]" className="bg-white">
        <CustomerExperienceSection />
      </DeferredSection>
      <DeferredSection minHeight="min-h-[180px]">
        <CtaSection />
      </DeferredSection>
    </div>
  );
}

