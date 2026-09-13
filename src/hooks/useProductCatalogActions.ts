import { useTranslation } from 'react-i18next';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import type { CatalogProduct } from '../components/products/ProductCard';

export function useProductCatalogActions() {
  const { t } = useTranslation('product');
  const addItem = useCartStore((s) => s.addItem);
  const { productIds, toggleWishlist } = useWishlistStore();
  const { user } = useAuthStore();
  const addToast = useToastStore((s) => s.addToast);

  const isInWishlist = (id: string) => productIds.includes(id);

  const handleToggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(productId, user?.id || '');
  };

  const handleAddToCart = (product: CatalogProduct) => {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      unitPrice: product.price,
      slug: product.slug ?? undefined,
      quantity: 1,
      imageUrl: product.images?.[0] || '',
    });
    addToast(t('toast.added', { title: product.title }));
  };

  return { isInWishlist, handleToggleWishlist, handleAddToCart };
}
