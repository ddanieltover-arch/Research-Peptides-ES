import { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { LocaleLink } from '../i18n/LocaleLink';
import { useLocaleNavigate } from '../i18n/useLocaleNavigate';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { supabase } from '../supabase';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useToastStore } from '../store/useToastStore';
import { DetailedProductSkeleton } from '../components/Skeleton';
import { productPath } from '../lib/productUrl';
import { BRAND_NAME } from '../config/brand';
import { Container, Reveal, PageShell } from '../design-system';
import { ProductGallery } from '../components/product-detail/ProductGallery';
import { ProductPurchasePanel } from '../components/product-detail/ProductPurchasePanel';
import { ProductRecommendations } from '../components/product-detail/ProductRecommendations';
import { useProductCatalogActions } from '../hooks/useProductCatalogActions';
import type { CatalogProduct } from '../components/products/ProductCard';
import { usePageSeo } from '../seo/SeoProvider';
import { breadcrumbJsonLd, productJsonLd } from '../seo/structuredData';
import type { LocaleCode } from '../i18n/locales';
import { localizedProductDescription, localizedProductTitle } from '../lib/localizedProduct';
import { pathWithLocale } from '../i18n/routing';

type SampleReview = {
  name: string;
  role: string;
  content: string;
  date: string;
};

export default function ProductDetails() {
  const { t, i18n } = useTranslation('product');
  const locale = i18n.language as LocaleCode;
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [showShare, setShowShare] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [recentlyViewed, setRecentlyViewed] = useState<CatalogProduct[]>([]);

  const addItem = useCartStore((state) => state.addItem);
  const { user } = useAuthStore();
  const { productIds, toggleWishlist } = useWishlistStore();
  const addToast = useToastStore((state) => state.addToast);
  const navigate = useLocaleNavigate();
  const location = useLocation();
  const { isInWishlist, handleToggleWishlist, handleAddToCart: addRelatedToCart } =
    useProductCatalogActions();

  const displayTitle = product ? localizedProductTitle(product, locale) : '';
  const displayDescription = product ? localizedProductDescription(product, locale) : '';

  const sampleReviews = t('reviews.samples', { returnObjects: true }) as SampleReview[];

  const seoConfig = useMemo(() => {
    if (!product) return null;
    const title = localizedProductTitle(product, locale);
    const canonicalPath = productPath(product);
    const plainDescription = String(localizedProductDescription(product, locale) || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160);
    return {
      title: `${title} | ${BRAND_NAME}`,
      description:
        plainDescription || t('seoDescription', { title, lng: locale }),
      canonicalPath,
      ogType: 'product' as const,
      ogImage: product.images?.[0] || undefined,
      jsonLd: [
        productJsonLd(product, locale),
        breadcrumbJsonLd(
          [
            { name: t('breadcrumb.home', { lng: locale }), path: '/' },
            { name: t('breadcrumb.shop', { lng: locale }), path: '/shop' },
            { name: title, path: canonicalPath },
          ],
          locale,
        ),
      ],
    };
  }, [product, locale, t]);

  usePageSeo(seoConfig);

  useEffect(() => {
    let cancelled = false;

    const fetchProductAndReviews = async () => {
      if (!slug && !id) return;
      setLoading(true);
      try {
        const query = supabase.from('products').select('*');
        const { data: pData } = slug
          ? await query.eq('slug', slug).maybeSingle()
          : await query.eq('id', id as string).maybeSingle();

        if (cancelled) return;

        if (pData) {
          const canonicalPath = pathWithLocale(locale, productPath(pData));
          if (location.pathname !== canonicalPath) {
            navigate(productPath(pData), { replace: true });
          }
          setProduct(pData);
          if (pData.variants?.length > 0) {
            setSelectedVariant(pData.variants[0]);
          }
          setActiveImage(0);

          const stored = localStorage.getItem('recentlyViewed');
          let prevIds = stored ? JSON.parse(stored) : [];
          prevIds = [pData.id, ...prevIds.filter((pid: string) => pid !== pData.id)].slice(0, 10);
          localStorage.setItem('recentlyViewed', JSON.stringify(prevIds));

          const displayIds = prevIds.filter((pid: string) => pid !== pData.id).slice(0, 4);
          if (displayIds.length > 0) {
            const { data: rvData } = await supabase.from('products').select('*').in('id', displayIds);
            if (!cancelled && rvData) setRecentlyViewed(rvData as CatalogProduct[]);
          }
        }

        const productId = pData?.id;
        if (!productId) {
          if (!cancelled) {
            setReviews([]);
            setRecommended([]);
          }
          return;
        }

        const { data: rData } = await supabase.from('reviews').select('*').eq('product_id', productId);
        if (!cancelled && rData) setReviews(rData);

        const { data: recData } = await supabase.from('products').select('*').limit(5);
        if (!cancelled && recData) {
          setRecommended(
            recData.filter((p) => String(p.id) !== String(productId)).slice(0, 4) as CatalogProduct[],
          );
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProductAndReviews();
    window.scrollTo(0, 0);

    return () => {
      cancelled = true;
    };
  }, [slug, id, navigate, locale, location.pathname]);

  const handleAddToCart = () => {
    if (!product) return;
    const unitPrice = selectedVariant ? selectedVariant.display_price : product.price;

    addItem({
      productId: product.id,
      title: product.title,
      price: unitPrice,
      unitPrice,
      slug: product.slug,
      quantity,
      imageUrl: product.images?.[0] || '',
      specification: selectedVariant
        ? selectedVariant.attributes?.attribute_pa_peptides || selectedVariant.display_name
        : undefined,
    });

    const title = localizedProductTitle(product, locale);
    if (quantity >= 5) addToast(t('toast.bulk15', { title }));
    else if (quantity >= 3) addToast(t('toast.bulk10', { title }));
    else addToast(t('toast.added', { title }));
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShare(false);
    addToast(t('toast.linkCopied'));
  };

  if (loading) {
    return (
      <Container className="py-12">
        <DetailedProductSkeleton />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-20 text-center">
        <h2 className="font-display font-bold text-2xl text-navy-950 mb-4">{t('notFound.title')}</h2>
        <LocaleLink to="/shop" className="text-brand-600 font-semibold hover:underline">
          {t('notFound.cta')}
        </LocaleLink>
      </Container>
    );
  }

  const currentPrice = selectedVariant ? selectedVariant.display_price : product.price;
  const currentNum = Number(currentPrice) || 0;
  const listCompare = Number(product.compare_at_price ?? product.compare_at);
  const variantCompare = selectedVariant
    ? Number(selectedVariant.original_price ?? selectedVariant.regular_price)
    : NaN;
  const compareWas =
    Number.isFinite(listCompare) && listCompare > currentNum
      ? listCompare
      : Number.isFinite(variantCompare) && variantCompare > currentNum
        ? variantCompare
        : null;

  const images: string[] = product.images?.length ? product.images : [];

  return (
    <PageShell tone="parchment">
      <Container className="py-10 md:py-12">
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-steel-600">
            <li>
              <LocaleLink to="/" className="hover:text-brand-600 transition-colors">
                {t('breadcrumb.home')}
              </LocaleLink>
            </li>
            <li className="text-silver-400" aria-hidden>/</li>
            <li>
              <LocaleLink to="/shop" className="hover:text-brand-600 transition-colors">
                {t('breadcrumb.shop')}
              </LocaleLink>
            </li>
            <li className="text-silver-400" aria-hidden>/</li>
            <li className="text-navy-950 font-medium truncate max-w-[12rem] sm:max-w-none">{displayTitle}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
          <ProductGallery
            productId={String(product.id)}
            title={displayTitle}
            images={images}
            activeIndex={activeImage}
            onSelectImage={setActiveImage}
            lowStock={Number(product.inventory) < 50}
          />

          <ProductPurchasePanel
            title={displayTitle}
            description={displayDescription}
            currentPrice={currentPrice}
            compareWas={compareWas}
            reviewCount={reviews.length}
            rating={product.rating}
            quantity={quantity}
            onQuantityChange={setQuantity}
            variants={product.variants || []}
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
            specifications={product.specifications || []}
            onAddToCart={handleAddToCart}
            inWishlist={productIds.includes(product.id)}
            onToggleWishlist={() => toggleWishlist(product.id, user?.id || '')}
            showShare={showShare}
            onToggleShare={() => setShowShare((s) => !s)}
            onCopyLink={copyLink}
          />
        </div>

        <Reveal as="section" className="bento-card border-t-4 border-t-accent-500 mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <p className="text-eyebrow-accent text-accent-600 before:bg-accent-500 mb-3">{t('reviews.eyebrow')}</p>
              <h2 className="text-h2 font-display font-semibold text-navy-950">{t('reviews.title')}</h2>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-mist-50 border border-brand-100/80">
              <span className="text-sm font-bold text-navy-950">{t('reviews.ratingLabel')}</span>
              <div className="flex text-warning">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleReviews.map((review) => (
              <blockquote
                key={review.name}
                className="bento-card border-t-2 border-t-accent-500/25 text-steel-600 text-sm leading-relaxed"
              >
                <p className="italic mb-4">&ldquo;{review.content}&rdquo;</p>
                <footer className="flex justify-between items-center not-italic pt-4 border-t border-brand-100">
                  <div>
                    <cite className="font-semibold text-navy-950 not-italic">{review.name}</cite>
                    <p className="text-xs text-silver-400">{review.role}</p>
                  </div>
                  <span className="text-[10px] font-semibold uppercase text-brand-600">{review.date}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </Reveal>
      </Container>

      <ProductRecommendations
        recommended={recommended}
        recentlyViewed={recentlyViewed}
        inWishlist={isInWishlist}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={addRelatedToCart}
      />
    </PageShell>
  );
}
