import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { LocaleLink } from '../../i18n/LocaleLink';
import { supabase, isSupabaseConfigured } from '../../supabase';
import { Container, Section, buttonClassName } from '../../design-system';
import { ProductGrid } from '../catalog/ProductGrid';
import { useProductCatalogActions } from '../../hooks/useProductCatalogActions';
import { SectionHeading } from './SectionHeading';
import { SHOP_PRODUCT_COLUMNS } from '../../lib/shopCatalogQuery';
import type { CatalogProduct } from '../products/ProductCard';

export const HOME_PRODUCT_GRID =
  'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5';

const HOME_PRODUCT_LIMIT = 8;

export type HomeProductQueryKind = 'rating' | 'newest' | 'category' | 'slugs';

type HomeProductSectionProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  href: string;
  queryKind: HomeProductQueryKind;
  categorySlug?: string;
  slugNeedles?: string[];
  tone?: 'mist' | 'light';
  limit?: number;
};

function matchesSlugNeedles(product: CatalogProduct, needles: string[]): boolean {
  const slug = (product.slug ?? '').toLowerCase();
  const title = (product.title ?? '').toLowerCase();
  return needles.some((needle) => slug.includes(needle) || title.includes(needle));
}

async function loadHomeProducts(
  kind: HomeProductQueryKind,
  limit: number,
  categorySlug?: string,
  slugNeedles: string[] = [],
): Promise<CatalogProduct[]> {
  if (!isSupabaseConfigured) return [];

  if (kind === 'slugs') {
    const { data } = await supabase
      .from('products')
      .select(SHOP_PRODUCT_COLUMNS)
      .order('rating', { ascending: false })
      .limit(80);
    return ((data as CatalogProduct[] | null) ?? [])
      .filter((product) => matchesSlugNeedles(product, slugNeedles))
      .slice(0, limit);
  }

  if (kind === 'category' && categorySlug) {
    const { data, error } = await supabase
      .from('products')
      .select(SHOP_PRODUCT_COLUMNS)
      .contains('categories', [categorySlug])
      .order('rating', { ascending: false })
      .limit(limit);

    if (!error && data) return data as CatalogProduct[];

    const { data: fallback } = await supabase
      .from('products')
      .select(SHOP_PRODUCT_COLUMNS)
      .order('rating', { ascending: false })
      .limit(80);
    return ((fallback as CatalogProduct[] | null) ?? [])
      .filter((product) => product.categories?.includes(categorySlug))
      .slice(0, limit);
  }

  const orderColumn = kind === 'newest' ? 'created_at' : 'rating';
  const { data } = await supabase
    .from('products')
    .select(SHOP_PRODUCT_COLUMNS)
    .order(orderColumn, { ascending: false })
    .limit(limit);
  return (data as CatalogProduct[] | null) ?? [];
}

export function HomeProductSection({
  eyebrow,
  title,
  subtitle,
  href,
  queryKind,
  categorySlug,
  slugNeedles,
  tone = 'mist',
  limit = HOME_PRODUCT_LIMIT,
}: HomeProductSectionProps) {
  const { t } = useTranslation('home');
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { isInWishlist, handleToggleWishlist, handleAddToCart } = useProductCatalogActions();
  const needlesKey = slugNeedles?.join(',') ?? '';

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const rows = await loadHomeProducts(
          queryKind,
          limit,
          categorySlug,
          needlesKey ? needlesKey.split(',') : [],
        );
        if (!cancelled) setProducts(rows);
      } catch (error) {
        console.error('Error fetching homepage products:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [categorySlug, limit, needlesKey, queryKind]);

  if (!loading && products.length === 0) return null;

  return (
    <Section
      size="lg"
      tone={tone}
      className={tone === 'mist' ? 'bg-slate-50/50' : 'bg-white border-b border-slate-200/80'}
    >
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-5 border-b border-slate-200/80">
          <SectionHeading
            eyebrow={eyebrow}
            title={<span>{title}</span>}
            description={subtitle}
            className="mb-0"
          />
          <LocaleLink
            to={href}
            className={buttonClassName({
              variant: 'outline',
              size: 'sm',
              className: 'shrink-0 gap-2 border-slate-200 hover:bg-white text-navy-950 font-medium',
            })}
          >
            {t('categories.viewAll')}
            <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
          </LocaleLink>
        </div>

        <ProductGrid
          products={products}
          loading={loading}
          skeletonCount={limit}
          gridClassName={HOME_PRODUCT_GRID}
          inWishlist={isInWishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />
      </Container>
    </Section>
  );
}
