import { useMemo } from 'react';
import { LocaleLink } from '../../i18n/LocaleLink';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Heart,
  LinkIcon,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Zap,
} from 'lucide-react';
import { Button, Badge } from '../../design-system';
import { ProductBadge } from '../products/ProductBadge';
import { formatCurrency } from '../../lib/utils';
import { cn } from '../../lib/utils';
import {
  filterDisplaySpecifications,
  hasLabSpecs,
  type ProductLabSpecs,
} from '../../lib/productLabSpecs';

type Variant = {
  variation_id?: string;
  display_name?: string;
  display_price?: number;
  attributes?: { attribute_pa_peptides?: string };
};

type ProductPurchasePanelProps = {
  title: string;
  description?: string;
  currentPrice: number;
  compareWas: number | null;
  reviewCount: number;
  rating?: number;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  variants: Variant[];
  selectedVariant: Variant | null;
  onSelectVariant: (v: Variant) => void;
  specifications: string[];
  labSpecs: ProductLabSpecs;
  onAddToCart: () => void;
  inWishlist: boolean;
  onToggleWishlist: () => void;
  showShare: boolean;
  onToggleShare: () => void;
  onCopyLink: () => void;
};

export function ProductPurchasePanel({
  title,
  description,
  currentPrice,
  compareWas,
  reviewCount,
  rating = 5,
  quantity,
  onQuantityChange,
  variants,
  selectedVariant,
  onSelectVariant,
  specifications,
  labSpecs,
  onAddToCart,
  inWishlist,
  onToggleWishlist,
  showShare,
  onToggleShare,
  onCopyLink,
}: ProductPurchasePanelProps) {
  const { t } = useTranslation('product');
  const basePrice = Number(currentPrice) || 0;
  const profileLines = useMemo(
    () => filterDisplaySpecifications(specifications),
    [specifications],
  );
  const showLabStrip = hasLabSpecs(labSpecs);

  const bundleTiers = useMemo(
    () =>
      [
        {
          id: 'standard',
          qty: 1,
          range: t('purchase.unitsRange12'),
          label: t('purchase.bulkStandard'),
          discount: 0,
        },
        {
          id: 'save',
          qty: 3,
          range: t('purchase.unitsRange35'),
          label: t('purchase.bulkSave10'),
          discount: 0.1,
        },
        {
          id: 'value',
          qty: 5,
          range: t('purchase.unitsRange6'),
          label: t('purchase.bulkBestValue'),
          discount: 0.15,
        },
      ] as const,
    [t],
  );

  const trustBadges = useMemo(
    () =>
      [
        { icon: ShieldCheck, label: t('purchase.hplcTested') },
        { icon: Truck, label: t('purchase.euDispatch') },
        { icon: Zap, label: t('purchase.coldChain') },
      ] as const,
    [t],
  );

  const labRows = useMemo(() => {
    const rows: Array<{ label: string; value: string }> = [];
    if (labSpecs.cas) rows.push({ label: t('purchase.specCas'), value: labSpecs.cas });
    if (labSpecs.mw) rows.push({ label: t('purchase.specMw'), value: `${labSpecs.mw} g/mol` });
    if (labSpecs.formula) rows.push({ label: t('purchase.specFormula'), value: labSpecs.formula });
    // Purity is surfaced in the strip header HPLC badge when present
    if (labSpecs.purity && !(labSpecs.cas || labSpecs.mw || labSpecs.formula)) {
      rows.push({ label: t('purchase.specPurity'), value: labSpecs.purity });
    }
    return rows;
  }, [labSpecs, t]);

  const addToCartControls = (
    <div className="flex gap-3">
      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <button
          type="button"
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className="px-3.5 py-2.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
          aria-label={t('purchase.decreaseQty')}
        >
          −
        </button>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => onQuantityChange(Math.max(1, parseInt(e.target.value, 10) || 1))}
          className="w-12 text-center font-mono font-bold text-navy-950 border-x border-slate-200 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-sm"
          aria-label={t('purchase.quantity')}
        />
        <button
          type="button"
          onClick={() => onQuantityChange(quantity + 1)}
          className="px-3.5 py-2.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
          aria-label={t('purchase.increaseQty')}
        >
          +
        </button>
      </div>
      <Button size="md" fullWidth onClick={onAddToCart} className="gap-2 flex-1 h-11">
        <ShoppingCart className="h-4 w-4" />
        {t('purchase.addToCart')}
      </Button>
    </div>
  );

  return (
    <>
      <div className="lg:sticky lg:top-28 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-1">
        <div className="bento-card border-t-4 border-t-brand-500 space-y-5">
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-h2 font-display font-semibold text-navy-950 leading-tight">{title}</h1>
            <div className="flex gap-2 shrink-0 relative">
              <button
                type="button"
                onClick={onToggleShare}
                className="p-2.5 rounded-xl border border-slate-200 text-steel-600 hover:bg-brand-50 hover:text-brand-600"
                aria-expanded={showShare}
                aria-label={t('purchase.shareProduct')}
              >
                <Share2 className="h-5 w-5" />
              </button>
              {showShare && (
                <div
                  className="absolute right-0 top-12 bg-white border border-slate-200 shadow-elevated rounded-xl p-2 z-10"
                  role="menu"
                >
                  <button
                    type="button"
                    onClick={onCopyLink}
                    className="p-2 rounded-lg hover:bg-brand-50 text-steel-600"
                    aria-label={t('purchase.copyLinkAria')}
                  >
                    <LinkIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={onToggleWishlist}
                className={cn(
                  'p-2.5 rounded-xl border transition-colors',
                  inWishlist
                    ? 'border-error/30 bg-red-50 text-error'
                    : 'border-slate-200 text-steel-600 hover:bg-brand-50',
                )}
                aria-label={inWishlist ? t('purchase.removeWishlist') : t('purchase.addWishlist')}
              >
                <Heart className="h-5 w-5" fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-warning">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn('h-4 w-4', i < Math.round(rating) ? 'fill-current' : 'text-brand-100')}
                />
              ))}
            </div>
            <span className="text-sm text-steel-600">
              {t('purchase.reviewsCount', { count: reviewCount })}
            </span>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              {compareWas != null && (
                <span className="text-lg font-semibold text-silver-400 line-through tabular-nums block">
                  {formatCurrency(compareWas)}
                </span>
              )}
              <span className="text-2xl sm:text-3xl font-sans font-bold text-navy-950 tabular-nums">
                {formatCurrency(basePrice)}
              </span>
            </div>
            <Badge variant="purity">{t('purchase.priceVerified')}</Badge>
          </div>

          {showLabStrip ? (
            <div className="rounded-xl border border-slate-200 bg-mist-50/80 overflow-hidden">
              <div className="px-3.5 py-2 border-b border-slate-200/80 flex items-center justify-between gap-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-slate-500">
                  {t('purchase.labIdentity')}
                </p>
                {labSpecs.purity ? (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    HPLC {labSpecs.purity}
                  </span>
                ) : null}
              </div>
              <dl className="grid grid-cols-2 gap-px bg-slate-200/70">
                {labRows.map((row) => (
                  <div key={row.label} className="bg-white px-3.5 py-2.5 min-w-0">
                    <dt className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-slate-400 mb-0.5">
                      {row.label}
                    </dt>
                    <dd className="text-sm font-mono font-semibold text-navy-950 tabular-nums break-all">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          {description ? (
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-sans">
              {description}
            </p>
          ) : null}

          {variants.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-caption text-slate-500 mb-2.5">{t('purchase.specification')}</h3>
              <div className="flex flex-wrap gap-2">
                {variants.map((v, i) => {
                  const label =
                    v.attributes?.attribute_pa_peptides ||
                    v.display_name ||
                    t('purchase.variantFallback', { index: i + 1 });
                  const selected = selectedVariant?.variation_id === v.variation_id;
                  return (
                    <button
                      key={v.variation_id || i}
                      type="button"
                      onClick={() => onSelectVariant(v)}
                      className={cn(
                        'px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all cursor-pointer',
                        selected
                          ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300',
                      )}
                      aria-pressed={selected}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {profileLines.length > 0 && (
            <div>
              <h3 className="text-caption text-brand-600 mb-3">{t('purchase.productProfile')}</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {profileLines.map((spec, i) => (
                  <li
                    key={`${spec}-${i}`}
                    className="flex items-center gap-2 text-xs text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-200/80 font-mono"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span className="line-clamp-2">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-3">
              <ProductBadge type="verified" size="sm" />
              <span className="text-caption text-slate-500">{t('purchase.researchBundle')}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {bundleTiers.map((tier) => {
                const unitPrice = basePrice * (1 - tier.discount);
                const isSelected =
                  (tier.qty === 1 && quantity < 3) ||
                  (tier.qty === 3 && quantity >= 3 && quantity < 5) ||
                  (tier.qty === 5 && quantity >= 5);

                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => onQuantityChange(tier.qty)}
                    className={cn(
                      'p-3 rounded-xl border text-center transition-all cursor-pointer',
                      isSelected
                        ? 'border-brand-600 bg-brand-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300',
                    )}
                    aria-pressed={isSelected}
                  >
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wide text-brand-600 block mb-0.5">
                      {tier.label}
                    </span>
                    <span className="text-xs text-slate-500 block mb-1 font-mono">{tier.range}</span>
                    <span className="text-sm sm:text-base font-sans font-bold text-navy-950 tabular-nums">
                      {formatCurrency(unitPrice)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-center"
              >
                <Icon className="h-4 w-4 text-brand-600 mb-1" />
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wide text-slate-700">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="hidden lg:block space-y-3">{addToCartControls}</div>

          <LocaleLink
            to="/coas"
            className="group flex items-start gap-3 rounded-xl border border-emerald-200/90 bg-emerald-50/70 p-3.5 transition-colors hover:bg-emerald-50 hover:border-emerald-300"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-emerald-200 text-emerald-700 shadow-sm">
              <FileCheck2 className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 text-sm font-semibold text-navy-950">
                {t('purchase.coaCtaTitle')}
                <ArrowRight className="h-3.5 w-3.5 text-emerald-700 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-0.5 block text-xs text-slate-600 leading-relaxed">
                {t('purchase.coaCtaBody')}
              </span>
            </span>
          </LocaleLink>

          <p className="text-xs text-silver-400 text-center font-mono">{t('purchase.laboratoryOnly')}</p>
        </div>
      </div>

      {/* Mobile sticky buy bar — clears bottom nav */}
      <div className="lg:hidden fixed bottom-[4.25rem] inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 py-3 shadow-elevated">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 truncate">
              {title}
            </p>
            <p className="text-base font-bold text-navy-950 tabular-nums">{formatCurrency(basePrice)}</p>
          </div>
          <Button size="md" onClick={onAddToCart} className="gap-2 flex-1 h-11 shrink-0">
            <ShoppingCart className="h-4 w-4" />
            {t('purchase.addToCart')}
          </Button>
        </div>
      </div>
    </>
  );
}
