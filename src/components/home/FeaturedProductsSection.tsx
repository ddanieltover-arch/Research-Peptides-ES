import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../../i18n/LocaleLink';
import { ArrowRight } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../supabase';
import { Container, Section, buttonClassName } from '../../design-system';
import { ProductGrid } from '../catalog/ProductGrid';
import { useProductCatalogActions } from '../../hooks/useProductCatalogActions';
import { SectionHeading } from './SectionHeading';
import type { CatalogProduct } from '../products/ProductCard';

export function FeaturedProductsSection() {
  const { t } = useTranslation('home');
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { isInWishlist, handleToggleWishlist, handleAddToCart } = useProductCatalogActions();

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    void (async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('rating', { ascending: false })
        .limit(8);
      if (data) setProducts(data as CatalogProduct[]);
      setLoading(false);
    })();
  }, []);

  return (
    <Section size="lg" tone="mist" className="bg-slate-50/50">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-5 border-b border-slate-200/80">
          <SectionHeading
            eyebrow={t('featured.eyebrow')}
            title={<span>{t('featured.title')}</span>}
            description={t('featured.subtitle')}
            className="mb-0"
          />
          <LocaleLink
            to="/shop"
            className={buttonClassName({ variant: 'outline', size: 'sm', className: 'shrink-0 gap-2 border-slate-200 hover:bg-white text-navy-950 font-medium' })}
          >
            {t('categories.viewAll')}
            <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
          </LocaleLink>
        </div>

        <ProductGrid
          products={products}
          loading={loading}
          skeletonCount={8}
          gridClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
          inWishlist={isInWishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />
      </Container>
    </Section>
  );
}
