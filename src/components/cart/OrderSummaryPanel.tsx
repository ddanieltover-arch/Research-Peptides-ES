import { useTranslation } from 'react-i18next';
import { Tag, X, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '../../design-system';
import { formatCurrency } from '../../lib/utils';
import { PRIMARY_PROMO_CODE } from '../../lib/promoCodes';

type OrderSummaryPanelProps = {
  subtotal: number;
  discount: number;
  discountPercent: number;
  total: number;
  promoCode: string | null;
  promoInput: string;
  promoError: string;
  onPromoInputChange: (value: string) => void;
  onApplyPromo: () => void;
  onClearPromo: () => void;
  onCheckout: () => void;
  checkoutLabel?: string;
  sticky?: boolean;
};

export function OrderSummaryPanel({
  subtotal,
  discount,
  discountPercent,
  total,
  promoCode,
  promoInput,
  promoError,
  onPromoInputChange,
  onApplyPromo,
  onClearPromo,
  onCheckout,
  checkoutLabel,
  sticky = true,
}: OrderSummaryPanelProps) {
  const { t } = useTranslation('checkout');
  const proceedLabel = checkoutLabel ?? t('cart.proceed');
  const discountAmount = (subtotal * discount) / 100;

  return (
    <div
      className={`bento-card border-t-4 border-t-accent-500 h-fit ${sticky ? 'lg:sticky lg:top-24' : ''}`}
    >
      <h2 className="font-display font-semibold text-lg text-navy-950 mb-6">{t('cart.summary')}</h2>

      <div className="mb-6">
        <label htmlFor="order-promo-code" className="text-eyebrow-accent text-accent-600 before:bg-accent-500 block mb-3">
          {t('cart.promo')}
        </label>
        <div className="flex gap-2">
          <input
            id="order-promo-code"
            type="text"
            value={promoInput}
            onChange={(e) => onPromoInputChange(e.target.value)}
            placeholder={PRIMARY_PROMO_CODE}
            className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-brand-100 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-300"
          />
          <Button type="button" variant="secondary" size="sm" onClick={onApplyPromo}>
            {t('cart.apply', { defaultValue: 'Apply' })}
          </Button>
        </div>
        {promoError ? <p className="text-xs text-error font-medium mt-2">{promoError}</p> : null}
        {promoCode ? (
          <div className="flex items-center justify-between mt-3 bg-accent-500/10 px-3 py-2 rounded-xl border border-accent-500/25">
            <span className="flex items-center gap-2 text-sm font-semibold text-brand-700">
              <Tag className="h-4 w-4" aria-hidden />
              {promoCode} {t('cart.applied', { defaultValue: 'applied' })}
            </span>
            <button
              type="button"
              onClick={onClearPromo}
              className="text-brand-400 hover:text-brand-600 p-1"
              aria-label="Remove promotion code"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      <dl className="space-y-3 text-sm mb-6">
        <div className="flex justify-between text-steel-600">
          <dt>{t('cart.subtotal')}</dt>
          <dd className="font-semibold text-navy-950 tabular-nums">{formatCurrency(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-success font-semibold">
            <dt>
              {t('cart.discount')} ({discountPercent}%)
            </dt>
            <dd className="tabular-nums">−{formatCurrency(discountAmount)}</dd>
          </div>
        )}
        <div className="flex justify-between text-steel-600">
          <dt>{t('cart.shipping')}</dt>
          <dd className="text-xs italic text-silver-400">{t('cart.shippingAtCheckout')}</dd>
        </div>
        <div className="border-t border-brand-100 pt-4 flex justify-between items-center">
          <dt className="font-display font-semibold text-navy-950">{t('cart.total')}</dt>
          <dd className="text-2xl font-display font-semibold text-brand-600 tabular-nums">
            {formatCurrency(total)}
          </dd>
        </div>
      </dl>

      <Button size="lg" fullWidth onClick={onCheckout}>
        {proceedLabel}
      </Button>

      <p className="mt-4 text-[11px] text-steel-600 leading-relaxed">{t('cart.vatNote')}</p>

      <div className="mt-4 flex flex-wrap justify-center gap-4 pt-4 border-t border-brand-100 text-[10px] font-semibold uppercase tracking-wider text-silver-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-accent-600" aria-hidden />
          {t('cart.secureCheckout', { defaultValue: 'Secure checkout' })}
        </span>
        <span className="flex items-center gap-1">
          <Truck className="h-3.5 w-3.5 text-accent-600" aria-hidden />
          {t('cart.euDispatch', { defaultValue: 'EU dispatch' })}
        </span>
      </div>
    </div>
  );
}
