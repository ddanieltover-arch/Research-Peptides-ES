import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import { supabase } from '../supabase';
import { useAuthStore } from '../store/useAuthStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { AccountShell } from '../components/account/AccountShell';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { useProductCatalogActions } from '../hooks/useProductCatalogActions';
import { LocaleButton } from '../i18n/LocaleButton';
import type { CatalogProduct } from '../components/products/ProductCard';

export default function Wishlist() {
  const { t } = useTranslation('account');
  const { user } = useAuthStore();
  const { productIds } = useWishlistStore();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { isInWishlist, handleToggleWishlist, handleAddToCart } = useProductCatalogActions();

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (!user || productIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      try {
        const { data } = await supabase.from('products').select('*').in('id', productIds);
        if (data) setProducts(data as CatalogProduct[]);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlistProducts();
  }, [user, productIds]);

  return (
    <AccountShell title={t('wishlist.title')} subtitle={t('wishlist.subtitle')}>
      <p className="text-sm text-steel-600 mb-6">
        {t('wishlist.savedCount', { count: products.length })}
      </p>

      {loading ? (
        <ProductGrid
          products={[]}
          loading
          skeletonCount={6}
          inWishlist={isInWishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-brand-100 shadow-card">
          <Heart className="h-12 w-12 text-brand-200 mx-auto mb-4" aria-hidden />
          <h2 className="font-display font-bold text-xl text-navy-950 mb-2">{t('wishlist.emptyTitle')}</h2>
          <p className="text-steel-600 text-sm mb-6 max-w-sm mx-auto">{t('wishlist.emptyBody')}</p>
          <LocaleButton to="/shop">{t('wishlist.browseShop')}</LocaleButton>
        </div>
      ) : (
        <ProductGrid
          products={products}
          inWishlist={isInWishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />
      )}
    </AccountShell>
  );
}
