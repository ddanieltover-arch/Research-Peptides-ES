'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAppSearchParams } from '../lib/useAppSearchParams';
import { useTranslation } from 'react-i18next';
import { usePageSeo } from '../seo/SeoProvider';
import { breadcrumbJsonLd, itemListJsonLd } from '../seo/structuredData';
import type { LocaleCode } from '../i18n/locales';
import { supabase } from '../supabase';
import { sortProducts, type CatalogSortKey } from '../lib/productSort';
import { catalogPriceSliderMax, productEffectiveMaxPrice } from '../lib/catalogPriceSlider';
import { SHOP_PRODUCT_COLUMNS } from '../lib/shopCatalogQuery';
import { Container, PageShell } from '../design-system';
import { CatalogPageHeader } from '../components/catalog/CatalogPageHeader';
import { CatalogTrustBar } from '../components/catalog/CatalogTrustBar';
import {
  CatalogFilters,
  CatalogActiveChips,
  type CatalogFiltersProps,
  type PurityMinFilter,
} from '../components/catalog/CatalogFilters';
import { CatalogSortSelect } from '../components/catalog/CatalogSortSelect';
import { CatalogEmptyState } from '../components/catalog/CatalogEmptyState';
import { ProductGrid } from '../components/catalog/ProductGrid';
import {
  CatalogPagination,
  SHOP_PRODUCTS_PER_PAGE,
} from '../components/catalog/CatalogPagination';
import { useProductCatalogActions } from '../hooks/useProductCatalogActions';
import type { CategoryOption } from '../components/catalog/types';
import type { CatalogProduct } from '../components/products/ProductCard';
import { productMeetsPurityMin } from '../lib/productLabSpecs';

export default function Shop() {
  const { t, i18n } = useTranslation('shop');
  const locale = i18n.language as LocaleCode;
  const [searchParams, setSearchParams] = useAppSearchParams();
  const [allProducts, setAllProducts] = useState<CatalogProduct[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategorySlugs, setSelectedCategorySlugs] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(500);
  const [purityMin, setPurityMin] = useState<PurityMinFilter>(null);
  const [sortBy, setSortBy] = useState<CatalogSortKey>('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { isInWishlist, handleToggleWishlist, handleAddToCart } = useProductCatalogActions();

  useEffect(() => {
    void (async () => {
      try {
        const [prodResult, catResult] = await Promise.all([
          supabase.from('products').select(SHOP_PRODUCT_COLUMNS).order('created_at', { ascending: false }),
          supabase.from('categories').select('name, slug').order('name'),
        ]);

        if (!prodResult.error && prodResult.data) {
          setAllProducts(prodResult.data as CatalogProduct[]);
          setPriceRange(catalogPriceSliderMax(prodResult.data));
        }

        if (!catResult.error && catResult.data) {
          setCategories(catResult.data as CategoryOption[]);
        }
      } catch (error) {
        console.error('Error fetching shop data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const priceSliderMax = useMemo(() => catalogPriceSliderMax(allProducts), [allProducts]);
  const priceSliderStep = priceSliderMax > 2000 ? 50 : 10;

  const shopSeo = useMemo(() => {
    if (allProducts.length === 0) return null;
    return {
      title: undefined,
      description: t('header.description'),
      canonicalPath: '/shop',
      jsonLd: [
        breadcrumbJsonLd(
          [
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
          ],
          locale,
        ),
        itemListJsonLd(allProducts, locale),
      ],
    };
  }, [allProducts, locale, t]);

  usePageSeo(shopSeo);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];
    if (selectedCategorySlugs.length > 0) {
      result = result.filter(
        (p) =>
          p.categories &&
          p.categories.some((c: string) => selectedCategorySlugs.includes(c)),
      );
    }
    result = result.filter((p) => productEffectiveMaxPrice(p) <= priceRange);
    if (purityMin != null) {
      result = result.filter((p) => productMeetsPurityMin(p.slug, purityMin));
    }
    return sortProducts(result, sortBy);
  }, [allProducts, selectedCategorySlugs, priceRange, purityMin, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / SHOP_PRODUCTS_PER_PAGE));
  const rawPage = parseInt(searchParams.get('page') ?? '1', 10) || 1;
  const currentPage = Math.min(Math.max(1, rawPage), totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * SHOP_PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + SHOP_PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const resultsFrom =
    filteredProducts.length === 0 ? 0 : (currentPage - 1) * SHOP_PRODUCTS_PER_PAGE + 1;
  const resultsTo = Math.min(currentPage * SHOP_PRODUCTS_PER_PAGE, filteredProducts.length);

  useEffect(() => {
    if (loading || rawPage === currentPage) return;
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (currentPage <= 1) next.delete('page');
        else next.set('page', String(currentPage));
        return next;
      },
      { replace: true },
    );
  }, [loading, rawPage, currentPage, setSearchParams]);

  const handlePageChange = (page: number) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (page <= 1) next.delete('page');
        else next.set('page', String(page));
        return next;
      },
      { replace: true },
    );
    document.getElementById('shop-products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const resetPage = () => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('page');
        return next;
      },
      { replace: true },
    );
  };

  const toggleCategory = (slug: string) => {
    resetPage();
    setSelectedCategorySlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  const clearFilters = () => {
    resetPage();
    setSelectedCategorySlugs([]);
    setPriceRange(priceSliderMax);
    setPurityMin(null);
    setSortBy('newest');
  };

  const filterProps: CatalogFiltersProps = {
    categories,
    selectedCategorySlugs,
    onToggleCategory: toggleCategory,
    priceRange,
    priceSliderMax,
    priceSliderStep,
    onPriceChange: (value: number) => {
      resetPage();
      setPriceRange(value);
    },
    purityMin,
    onPurityMinChange: (value) => {
      resetPage();
      setPurityMin(value);
    },
    onClear: clearFilters,
    showMobile: showMobileFilters,
    onCloseMobile: () => setShowMobileFilters(false),
    onOpenMobile: () => setShowMobileFilters(true),
  };

  return (
    <PageShell tone="mist">
      <CatalogPageHeader
        eyebrow={t('header.eyebrow')}
        title={
          <>
            {t('header.title')}{' '}
            <span className="text-brand-600">{t('header.titleHighlight')}</span>
          </>
        }
        description={t('header.description')}
      />
      <CatalogTrustBar />

      <Container className="py-10 md:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-card">
          <p className="text-sm text-slate-600 font-mono tabular-nums">
            {t('results', { from: resultsFrom, to: resultsTo, total: filteredProducts.length })}
          </p>
          <div className="flex items-center gap-2.5">
            <CatalogFilters {...filterProps} mode="trigger" />
            <CatalogSortSelect
              value={sortBy}
              onChange={(v) => {
                resetPage();
                setSortBy(v as CatalogSortKey);
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <CatalogFilters {...filterProps} mode="sidebar" />

          <div id="shop-products" className="lg:col-span-3 scroll-mt-28">
            <CatalogActiveChips {...filterProps} />

            {!loading && filteredProducts.length === 0 ? (
              <CatalogEmptyState
                title={t('empty.title')}
                description={t('empty.description')}
                onClear={clearFilters}
                clearLabel={t('filters.clearAll')}
              />
            ) : (
              <>
                <ProductGrid
                  products={paginatedProducts}
                  loading={loading}
                  showDescription
                  inWishlist={isInWishlist}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                />
                {!loading && (
                  <CatalogPagination
                    page={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Container>

      <CatalogFilters {...filterProps} mode="drawer" />
    </PageShell>
  );
}

