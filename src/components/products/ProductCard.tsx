import { LocaleLink } from '../../i18n/LocaleLink';
import { useTranslation } from 'react-i18next';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from '../../design-system';
import { ProductBadge } from './ProductBadge';
import { ProductCardRating } from './ProductCardRating';
import { ProductImagePlaceholder } from './ProductImagePlaceholder';
import { ProductCardPriceBlock } from './ProductCardPriceBlock';
import { getPrimaryProductBadge } from '../../lib/productBadges';
import { productPath } from '../../lib/productUrl';
import { whatsappUrl } from '../../lib/whatsapp';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { cardHoverState, fadeUpVariants } from '../../design-system/motion';
import { cn } from '../../lib/utils';
import type { LocaleCode } from '../../i18n/locales';
import { localizedProductDescription, localizedProductTitle } from '../../lib/localizedProduct';

export type CatalogProduct = {
  id: string;
  title: string;
  description?: string | null;
  description_i18n?: Record<string, string> | null;
  title_i18n?: Record<string, string> | null;
  price: number;
  inventory?: number | null;
  images?: string[] | null;
  rating?: number | null;
  review_count?: number | null;
  slug?: string | null;
  categories?: string[] | null;
  variants?: unknown[];
  compare_at_price?: number | null;
};

type ProductCardProps = {
  product: CatalogProduct;
  index?: number;
  inWishlist: boolean;
  onToggleWishlist: (e: React.MouseEvent) => void;
  onAddToCart: () => void;
  showDescription?: boolean;
  animate?: boolean;
  entrance?: 'stagger' | 'scroll' | 'none';
  className?: string;
};

export function ProductCard({
  product,
  index = 0,
  inWishlist,
  onToggleWishlist,
  onAddToCart,
  showDescription = false,
  animate = true,
  entrance = 'stagger',
  className,
}: ProductCardProps) {
  const { t, i18n } = useTranslation('product');
  const locale = i18n.language as LocaleCode;
  const productHref = productPath(product);
  const displayTitle = localizedProductTitle(product, locale);
  const displayDescription = localizedProductDescription(product, locale);
  const primaryBadge = getPrimaryProductBadge(product);
  const lowStock = Number(product.inventory) < 10;
  const categoryLabel = product.categories?.[0];

  const card = (
    <Card
      variant="product"
      interactive
      className={cn(
        'relative h-full flex flex-col p-0 overflow-hidden group border-t-2 border-t-transparent hover:border-t-accent-500/50',
        className,
      )}
    >
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
        {primaryBadge ? <ProductBadge type={primaryBadge} size="sm" /> : null}
        {lowStock ? <ProductBadge type="low_stock" size="sm" /> : null}
      </div>

      <LocaleLink
        to={productHref}
        className="relative block aspect-[4/5] overflow-hidden bg-mist-50 m-3 mb-0 rounded-2xl"
      >
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={displayTitle}
            loading="lazy"
            decoding="async"
            width={400}
            height={500}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <ProductImagePlaceholder
            productId={String(product.id)}
            title={displayTitle}
            className="h-full min-h-full rounded-2xl"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <button
          type="button"
          onClick={onToggleWishlist}
          className={cn(
            'absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-sm transition-all',
            inWishlist
              ? 'bg-red-50/95 text-error shadow-inner'
              : 'bg-white/90 text-silver-400 hover:text-error',
          )}
          aria-label={
            inWishlist
              ? t('card.removeFromWishlist', { title: displayTitle })
              : t('card.addToWishlist', { title: displayTitle })
          }
        >
          <Heart className="h-4 w-4" fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </LocaleLink>

      <div className="flex flex-col flex-1 p-4 md:p-5">
        {categoryLabel ? (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-accent-600 mb-1.5">
            {categoryLabel}
          </span>
        ) : null}
        <LocaleLink
          to={productHref}
          className="font-display font-bold text-navy-950 group-hover:text-brand-600 transition-colors line-clamp-2 text-sm md:text-base"
        >
          {displayTitle}
        </LocaleLink>
        <ProductCardRating
          rating={product.rating}
          reviewCount={product.review_count}
          className="mt-2 mb-2"
          starClassName="h-3.5 w-3.5"
        />
        {showDescription && displayDescription ? (
          <p className="text-xs text-steel-600 line-clamp-2 leading-relaxed mb-3 flex-1">
            {displayDescription}
          </p>
        ) : (
          <div className="flex-1 min-h-[0.5rem]" />
        )}
        <div className="pt-3 mt-auto space-y-3">
          <a
            href={whatsappUrl(t('card.whatsappMessage', { title: displayTitle }))}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-mist-50 px-3 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-mist-100 hover:text-brand-700"
            aria-label={t('card.whatsapp')}
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            {t('card.whatsapp')}
          </a>
          <div className="flex items-end justify-between gap-2 border-t border-brand-100/60 pt-3">
          <ProductCardPriceBlock product={product} />
          <button
            type="button"
            onClick={onAddToCart}
            className="shrink-0 p-3 rounded-full bg-brand-600 text-white hover:bg-brand-700 shadow-card transition-all active:scale-95"
            aria-label={t('card.addToCart', { title: displayTitle })}
          >
            <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
        </div>
      </div>
    </Card>
  );

  if (!animate || entrance === 'none') return card;

  if (entrance === 'scroll') {
    return (
      <motion.div
        className="h-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-24px' }}
        variants={fadeUpVariants()}
        whileHover={cardHoverState()}
      >
        {card}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="h-full"
      variants={fadeUpVariants()}
      whileHover={cardHoverState()}
    >
      {card}
    </motion.div>
  );
}
