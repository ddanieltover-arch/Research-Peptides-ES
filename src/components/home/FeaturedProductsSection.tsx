import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../../i18n/LocaleLink';
import { ArrowRight } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../supabase';
import { Container, Section, Button } from '../../design-system';
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
        .limit(4);
      if (data) setProducts(data as CatalogProduct[]);
      setLoading(false);
    })();
  }, []);

  return (
    <Section size="lg" tone="mist">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 border-l-4 border-brand-500 pl-6 md:pl-8">
          <SectionHeading
            eyebrow={t('featured.eyebrow')}
            title={
              <>
                <span className="text-brand-600 italic">{t('featured.title')}</span>
              </>
            }
            description={t('featured.subtitle')}
            className="mb-0"
          />
          <LocaleLink to="/shop" className="shrink-0">
            <Button variant="outline" className="gap-2">
              {t('categories.viewAll')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </LocaleLink>
        </div>

        <ProductGrid
          products={products}
          loading={loading}
          skeletonCount={4}
          inWishlist={isInWishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />
      </Container>
    </Section>
  );
}
