import { motion } from 'motion/react';
import { ProductCard, type CatalogProduct } from '../products/ProductCard';
import { ProductSkeleton } from '../Skeleton';
import { staggerContainerVariants } from '../../design-system/motion';

type ProductGridProps = {
  products: CatalogProduct[];
  loading?: boolean;
  skeletonCount?: number;
  showDescription?: boolean;
  gridClassName?: string;
  inWishlist: (id: string) => boolean;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  onAddToCart: (product: CatalogProduct) => void;
};

const defaultGridClass =
  'grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6';

export function ProductGrid({
  products,
  loading = false,
  skeletonCount = 8,
  showDescription = false,
  gridClassName = defaultGridClass,
  inWishlist,
  onToggleWishlist,
  onAddToCart,
}: ProductGridProps) {
  if (loading) {
    return (
      <div className={gridClassName}>
        {[...Array(skeletonCount)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={gridClassName}
      variants={staggerContainerVariants()}
      initial="hidden"
      animate="visible"
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          showDescription={showDescription}
          inWishlist={inWishlist(product.id)}
          onToggleWishlist={(e) => onToggleWishlist(product.id, e)}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </motion.div>
  );
}
