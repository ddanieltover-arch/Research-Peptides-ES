import { LocaleLink } from '../../i18n/LocaleLink';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Heart, ShoppingCart } from 'lucide-react';
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
  const primaryBadge = getPrimaryProductBadge({
    price: product.price,
    compare_at_price: product.compare_at_price ?? undefined,
    rating: product.rating ?? undefined,
    review_count: product.review_count ?? undefined,
  });
  const lowStock = product.inventory != null && Number(product.inventory) < 10;
  const categoryLabel = product.categories?.[0];

  const card = (
    <Card
      variant="product"
      interactive
      className={cn(
        'relative h-full flex flex-col p-0 overflow-hidden group bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl shadow-card hover:shadow-elevated transition-all duration-200',
        className,
      )}
    >
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1 items-start pointer-events-none">
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[9px] font-semibold uppercase tracking-tight">
          <CheckCircle2 className="h-2.5 w-2.5" />
          ≥99.4%
        </span>
        {primaryBadge ? <ProductBadge type={primaryBadge} size="sm" /> : null}
        {lowStock ? <ProductBadge type="low_stock" size="sm" /> : null}
      </div>

      {/* Product Image Area */}
      <LocaleLink
        to={productHref}
        className="relative block aspect-[4/5] overflow-hidden bg-slate-50 m-2 mb-0 rounded-lg"
      >
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={displayTitle}
            loading="lazy"
            decoding="async"
            width={400}
            height={500}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ProductImagePlaceholder
            productId={String(product.id)}
            title={displayTitle}
            className="h-full min-h-full rounded-lg"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Wishlist button */}
        <button
          type="button"
          onClick={onToggleWishlist}
          className={cn(
            'absolute top-2 right-2 z-20 p-2 rounded-md backdrop-blur-sm transition-all cursor-pointer',
            inWishlist
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/90 text-slate-400 hover:text-rose-600 border border-slate-200/60 shadow-sm',
          )}
          aria-label={
            inWishlist
              ? t('card.removeFromWishlist', { title: displayTitle })
              : t('card.addToWishlist', { title: displayTitle })
          }
        >
          <Heart className="h-3.5 w-3.5" fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </LocaleLink>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4">
        {categoryLabel ? (
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
            {categoryLabel}
          </span>
        ) : null}

        <LocaleLink
          to={productHref}
          className="font-sans font-semibold text-navy-950 group-hover:text-brand-600 transition-colors line-clamp-2 text-sm leading-snug mb-1"
        >
          {displayTitle}
        </LocaleLink>

        <ProductCardRating
          rating={product.rating ?? undefined}
          reviewCount={product.review_count ?? undefined}
          className="my-1"
          starClassName="h-3 w-3"
        />

        {showDescription && displayDescription ? (
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-2 flex-1">
            {displayDescription}
          </p>
        ) : (
          <div className="flex-1 min-h-[0.25rem]" />
        )}

        <div className="pt-2.5 mt-auto space-y-2.5 border-t border-slate-100">
          <div className="flex items-center justify-between gap-1 text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Stock Madrid
            </span>
            <LocaleLink to="/coas" className="hover:text-brand-600 hover:underline">
              Ver COA
            </LocaleLink>
          </div>

          <div className="flex items-end justify-between gap-2">
            <ProductCardPriceBlock product={product} />
            <button
              type="button"
              onClick={onAddToCart}
              className="inline-flex items-center justify-center gap-1.5 h-8 sm:h-9 px-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer"
              aria-label={t('card.addToCart', { title: displayTitle })}
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>Añadir</span>
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
