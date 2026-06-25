import { lazy, Suspense, type ReactNode } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { HomeSectionFallback } from '../components/home/HomeSectionFallback';
import { LazyWhenVisible } from '../components/LazyWhenVisible';
import { SEO } from '../components/seo/SEO';
import { usePageSeo } from '../seo/SeoProvider';
import { DEFAULT_DESCRIPTION } from '../seo/pageTitles';

const FeaturedProductsSection = lazy(() =>
  import('../components/home/FeaturedProductsSection').then((m) => ({
    default: m.FeaturedProductsSection,
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
  usePageSeo({
    title: 'Research Peptides ES | Péptidos de investigación premium para laboratorios europeos',
    description: DEFAULT_DESCRIPTION,
    canonicalPath: '/',
  });

  return (
    <div className="overflow-hidden bg-mist-50">
      <HeroSection />
      <DeferredSection minHeight="min-h-[420px]">
        <FeaturedProductsSection />
      </DeferredSection>
      <DeferredSection minHeight="min-h-[360px]">
        <WhyEuSection />
      </DeferredSection>
      <DeferredSection minHeight="min-h-[320px]">
        <CategoryShowcaseSection />
      </DeferredSection>
      <DeferredSection minHeight="min-h-[300px]">
        <TrustQualitySection />
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
