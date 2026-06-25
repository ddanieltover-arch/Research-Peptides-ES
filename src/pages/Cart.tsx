import React from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../i18n/LocaleLink';
import { useLocaleNavigate } from '../i18n/useLocaleNavigate';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { CartPageSkeleton } from '../components/Skeleton';
import { Container, Button, Reveal, PageShell } from '../design-system';
import { CatalogPageHeader } from '../components/catalog/CatalogPageHeader';
import { CartLineItem } from '../components/cart/CartLineItem';
import { OrderSummaryPanel } from '../components/cart/OrderSummaryPanel';
import { usePageSeo } from '../seo/SeoProvider';

export default function Cart() {
  usePageSeo({ canonicalPath: '/cart', noindex: true });
  const { t } = useTranslation('checkout');
  const {
    items,
    removeItem,
    updateQuantity,
    getTotal,
    getSubtotal,
    promoCode,
    discount,
    applyPromoCode,
    clearPromoCode,
    hasHydrated,
  } = useCartStore();
  const [promoInput, setPromoInput] = React.useState('');
  const [promoError, setPromoError] = React.useState('');
  const navigate = useLocaleNavigate();

  const handleApplyPromo = () => {
    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoInput('');
      setPromoError('');
    } else {
      setPromoError(t('cart.invalidPromo'));
    }
  };

  if (!hasHydrated) {
    return (
      <PageShell tone="mist">
        <Container className="py-12">
          <CartPageSkeleton />
        </Container>
      </PageShell>
    );
  }

  if (items.length === 0) {
    return (
      <PageShell tone="parchment">
        <CatalogPageHeader
          eyebrow={t('cart.title')}
          title={t('cart.title')}
          description={t('header.description')}
        />
        <Container className="py-20 text-center" role="status" aria-live="polite">
          <Reveal className="max-w-md mx-auto">
            <ShoppingBag className="h-14 w-14 text-brand-200 mx-auto mb-4" aria-hidden />
            <h2 className="font-display font-bold text-2xl text-navy-950 mb-3">{t('cart.empty')}</h2>
            <p className="text-steel-600 mb-8">{t('hero.subtitle', { ns: 'home' })}</p>
            <LocaleLink to="/shop">
              <Button size="lg">{t('cart.emptyCta')}</Button>
            </LocaleLink>
          </Reveal>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell tone="parchment">
      <CatalogPageHeader
        eyebrow={t('cartPage.eyebrow')}
        title={
          <>
            {t('cartPage.title', { count: items.length })}{' '}
            <span className="text-accent-600 italic">{t('cartPage.titleHighlight')}</span>
          </>
        }
        description={t('cartPage.description')}
      />

      <Container className="py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <CartLineItem
                key={`${item.productId}-${item.specification}-${index}`}
                item={item}
                onUpdateQuantity={(qty) =>
                  updateQuantity(item.productId, qty, item.specification)
                }
                onRemove={() => removeItem(item.productId, item.specification)}
              />
            ))}
          </div>

          <OrderSummaryPanel
            subtotal={getSubtotal()}
            discount={discount}
            discountPercent={discount}
            total={getTotal()}
            promoCode={promoCode}
            promoInput={promoInput}
            promoError={promoError}
            onPromoInputChange={setPromoInput}
            onApplyPromo={handleApplyPromo}
            onClearPromo={clearPromoCode}
            onCheckout={() => navigate('/checkout')}
          />
        </div>
      </Container>
    </PageShell>
  );
}
