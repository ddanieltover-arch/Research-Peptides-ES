import React, { useMemo, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { formatCurrency, DEFAULT_CURRENCY } from '../lib/utils';
import { useLocaleNavigate } from '../i18n/useLocaleNavigate';
import { supabase } from '../supabase';
import { CheckCircle, Loader2, Shield, Landmark } from 'lucide-react';
import { europeanLocations } from '../data/europeanCountries';
import { postOrderCreatedEmail } from '../lib/transactionalEmailApi';
import { CheckoutSkeleton } from '../components/Skeleton';
import { PRIMARY_PROMO_CODE } from '../lib/promoCodes';
import { Container, Button, PageShell } from '../design-system';
import { CatalogPageHeader } from '../components/catalog/CatalogPageHeader';
import { CheckoutProgress } from '../components/checkout/CheckoutProgress';
import { usePageSeo } from '../seo/SeoProvider';
import { whatsappUrl } from '../lib/whatsapp';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { rememberCheckoutLiveChatContext, syncLiveChatVisitor } from '../lib/livechat';

const SHIPPING_METHODS = {
  EUROPE: [
    { id: 'intl_eu', price: 18.14 },
    { id: 'eu_express', price: 28.5 },
  ],
  UK: [
    { id: 'rm24', price: 5.27 },
    { id: 'rm_special', price: 8.78 },
    { id: 'dpd_uk', price: 8.07 },
  ],
  INTL: [{ id: 'intl_row', price: 29.84 }],
};

type ShippingMethodOption = { id: string; name: string; subtext: string; price: number };

const EUROPEAN_COUNTRIES = Array.from(new Set(europeanLocations.map(l => l.country)));

export default function Checkout() {
  usePageSeo({ canonicalPath: '/checkout', noindex: true });
  const { t } = useTranslation('checkout');
  const { items, getTotal, getSubtotal, clearCart, hasHydrated, promoCode: storePromoCode, discount: storeDiscountPercent, applyPromoCode, clearPromoCode } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useLocaleNavigate();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    country: 'Spain',
    postalCode: ''
  });
  const [selectedShippingId, setSelectedShippingId] = useState('intl_eu');
  const paymentMethod = 'bank' as const;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [lockedTotals, setLockedTotals] = useState<{
    subtotal: number;
    promoDiscount: number;
    shippingCost: number;
    finalTotal: number;
  } | null>(null);

  const [promoCode, setPromoCode] = useState(storePromoCode ?? '');
  const [promoError, setPromoError] = useState('');
  const [showPromo, setShowPromo] = useState(Boolean(storePromoCode));
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});

  // Sync email if user logs in/out
  React.useEffect(() => {
    if (user?.email) {
      setShipping(s => ({ ...s, email: user.email }));
    }
  }, [user]);

  React.useEffect(() => {
    if (!hasHydrated) return;
    if (items.length === 0 && !placedOrderId) {
      navigate('/cart');
    }
  }, [hasHydrated, items.length, placedOrderId, navigate]);

  React.useEffect(() => {
    if (storePromoCode) {
      setPromoCode(storePromoCode);
      setShowPromo(true);
    }
  }, [storePromoCode]);

  const subtotalValue = getSubtotal();

  const localizeShippingMethod = (method: { id: string; price: number }): ShippingMethodOption => ({
    id: method.id,
    price: method.price,
    name: t(`shippingMethods.${method.id}.name`),
    subtext: t(`shippingMethods.${method.id}.subtext`),
  });

  const availableMethods = useMemo(() => {
    let baseMethods: typeof SHIPPING_METHODS.EUROPE = [];
    let threshold = 500;

    if (EUROPEAN_COUNTRIES.includes(shipping.country)) {
      baseMethods = SHIPPING_METHODS.EUROPE;
      threshold = 500;
    } else if (shipping.country === 'United Kingdom') {
      baseMethods = SHIPPING_METHODS.UK;
      threshold = 500;
    } else {
      baseMethods = SHIPPING_METHODS.INTL;
      threshold = 1000;
    }

    const localized = baseMethods.map(localizeShippingMethod);

    if (subtotalValue >= threshold) {
      return [localizeShippingMethod({ id: 'free', price: 0 }), ...localized];
    }
    return localized;
  }, [shipping.country, subtotalValue, t]);

  React.useEffect(() => {
    const hasFree = availableMethods.find((m) => m.id === 'free');
    if (hasFree && selectedShippingId !== 'free') {
      setSelectedShippingId('free');
    } else if (!availableMethods.find((m) => m.id === selectedShippingId)) {
      setSelectedShippingId(availableMethods[0]?.id ?? 'intl_eu');
    }
  }, [availableMethods, selectedShippingId]);

  const selectedMethod = availableMethods.find((m) => m.id === selectedShippingId) || availableMethods[0];
  const shippingCost = selectedMethod?.price ?? 0;

  const promoDiscountValue =
    storePromoCode && storeDiscountPercent > 0
      ? Math.min(subtotalValue * (storeDiscountPercent / 100), subtotalValue)
      : 0;
  const finalTotalValue = subtotalValue - promoDiscountValue + shippingCost;

  const applyPromo = () => {
    if (applyPromoCode(promoCode)) {
      setPromoError('');
    } else {
      setPromoError(t('summary.invalidPromo', { code: PRIMARY_PROMO_CODE }));
      clearPromoCode();
    }
  };

  if (!hasHydrated) {
    return <CheckoutSkeleton />;
  }

  if (items.length === 0 && !placedOrderId) {
    return <CheckoutSkeleton />;
  }

  const focusField = (id: string) => {
    const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    el?.focus();
  };

  const validateShippingStep = () => {
    const errors: Record<string, string> = {};
    if (!shipping.email.trim()) errors.email = t('validation.email');
    if (!shipping.fullName.trim()) errors.fullName = t('validation.fullName');
    if (!shipping.phone.trim()) errors.phone = t('validation.phone');
    if (!shipping.address.trim()) errors.address = t('validation.address');
    if (!shipping.city.trim()) errors.city = t('validation.city');
    if (!shipping.postalCode.trim()) errors.postalCode = t('validation.postalCode');
    if (!shipping.country.trim()) errors.country = t('validation.country');
    if (!selectedShippingId) errors.shippingMethod = t('validation.shippingMethod');
    setShippingErrors(errors);
    if (Object.keys(errors).length > 0) {
      const firstKey = Object.keys(errors)[0];
      const idMap: Record<string, string> = {
        email: 'checkout-email',
        fullName: 'checkout-full-name',
        phone: 'checkout-phone',
        address: 'checkout-address-line',
        city: 'checkout-city',
        postalCode: 'checkout-postal',
        country: 'checkout-country',
        shippingMethod: 'checkout-shipping-method-legend',
      };
      focusField(idMap[firstKey] || 'checkout-email');
      return false;
    }
    return true;
  };

  const validatePaymentStep = () => {
    const errors: Record<string, string> = {};
    if (!paymentMethod) errors.paymentMethod = t('validation.paymentMethod');
    setPaymentErrors(errors);
    if (Object.keys(errors).length > 0) {
      return false;
    }
    return true;
  };

  const handleContinueToPayment = () => {
    if (!validateShippingStep()) return;
    setStep(2);
  };

  const handleConfirmPaymentChoice = () => {
    if (!validatePaymentStep()) return;
    setStep(3);
  };

  const handleOrderSubmit = async () => {
    if (!validateShippingStep()) {
      setStep(1);
      return;
    }
    if (!validatePaymentStep()) {
      setStep(2);
      return;
    }

    setIsSubmitting(true);
    
    let createdOrderId: string | null = null;
    try {
      setLockedTotals({
        subtotal: subtotalValue,
        promoDiscount: promoDiscountValue,
        shippingCost,
        finalTotal: finalTotalValue
      });
      setCheckoutMessage('');

      // NOTE: We wrap non-schema columns (payment_method) inside shipping_address JSON
      // to avoid Supabase errors until columns are officially added to the database.
      // 1. Generate ID manually so we don't need .select() (which fails for guests due to RLS)
      const generatedId = crypto.randomUUID();

      const orderData = {
        id: generatedId,
        user_id: user?.id || null, // Allow null for Guest Checkout
        items: items,
        total_amount: finalTotalValue,
        currency: DEFAULT_CURRENCY,
        status: 'pending',
        shipping_address: {
          ...shipping,
          payment_method: paymentMethod,
          shipping_method: selectedMethod.name,
          shipping_cost: shippingCost
        }
      };
      
      // 2. Insert order to Supabase
      const { error } = await supabase.from('orders').insert([orderData]);
      if (error) throw error;
      const orderId = generatedId;
      createdOrderId = orderId;
      setPlacedOrderId(orderId);

      const liveChatContext = {
        name: shipping.fullName,
        email: shipping.email,
        orderId,
        page: '/checkout',
      };
      rememberCheckoutLiveChatContext(liveChatContext);
      void syncLiveChatVisitor(liveChatContext);

      let emailDispatchFailed = false;
      try {
        await postOrderCreatedEmail(orderId);
      } catch (emailError) {
        console.error('Order email trigger failed', emailError);
        emailDispatchFailed = true;
      }

      if (emailDispatchFailed) {
        setCheckoutMessage(t('messages.emailFailed'));
      } else {
        setCheckoutMessage(t('messages.bankSuccess'));
      }
      clearCart();
      setStep(4);

    } catch (error: any) {
      console.error("Order submission failed:", error);
      if (createdOrderId) {
        setPlacedOrderId(createdOrderId);
        setCheckoutMessage(t('messages.orderSaved'));
        clearCart();
        setStep(4);
      } else {
        const fallbackMessage = t('messages.processFailed');
        alert(`${fallbackMessage}: ${error?.message || ''}`);
      }
      // Don't set step to 4 on hard errors unless we want to show a failure state
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell tone="parchment">
      <CatalogPageHeader
        eyebrow={t('header.eyebrow')}
        title={t('header.title')}
        description={t('header.description')}
      />

      <Container className="py-10 md:py-12 max-w-5xl">
        {step < 4 && <CheckoutProgress step={step} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bento-card border-t-4 border-t-accent-500 min-h-[500px]">
            {step === 1 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-display font-semibold text-navy-950">{t('steps.shipping')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="checkout-email" className="text-eyebrow-accent text-accent-600 before:bg-accent-500 block mb-2">{t('form.email')}</label>
                    <input id="checkout-email" required type="email" value={shipping.email} onChange={e => setShipping({...shipping, email: e.target.value})} className="w-full p-4 bg-white border border-brand-100 rounded-xl focus:ring-2 focus:ring-brand-400/50 focus:border-brand-300 outline-none transition-all font-medium text-navy-950" placeholder={t('form.emailPlaceholder')} disabled={!!user} autoComplete="email" />
                    {user && <p className="text-[10px] font-bold text-silver-400 mt-1 uppercase tracking-widest">{t('form.emailLocked')}</p>}
                    {shippingErrors.email && <p className="mt-1 text-xs font-semibold text-red-600">{shippingErrors.email}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="checkout-full-name" className="text-eyebrow-accent text-accent-600 before:bg-accent-500 block mb-2">{t('form.fullName')}</label>
                    <input id="checkout-full-name" required type="text" value={shipping.fullName} onChange={e => setShipping({...shipping, fullName: e.target.value})} className="w-full p-4 bg-white border border-brand-100 rounded-xl focus:ring-2 focus:ring-brand-400/50 focus:border-brand-300 outline-none transition-all font-medium text-navy-950" placeholder={t('form.fullNamePlaceholder')} autoComplete="name" />
                    {shippingErrors.fullName && <p className="mt-1 text-xs font-semibold text-red-600">{shippingErrors.fullName}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="checkout-phone" className="text-eyebrow-accent text-accent-600 before:bg-accent-500 block mb-2">{t('form.phone')}</label>
                    <input id="checkout-phone" required type="tel" value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})} className="w-full p-4 bg-white border border-brand-100 rounded-xl focus:ring-2 focus:ring-brand-400/50 focus:border-brand-300 outline-none transition-all font-medium text-navy-950" placeholder={t('form.phonePlaceholder')} autoComplete="tel" />
                    {shippingErrors.phone && <p className="mt-1 text-xs font-semibold text-red-600">{shippingErrors.phone}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="checkout-address-line" className="text-eyebrow-accent text-accent-600 before:bg-accent-500 block mb-2">{t('form.address')}</label>
                    <input id="checkout-address-line" required type="text" value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} className="w-full p-4 bg-white border border-brand-100 rounded-xl focus:ring-2 focus:ring-brand-400/50 focus:border-brand-300 outline-none transition-all font-medium text-navy-950" placeholder={t('form.addressPlaceholder')} autoComplete="street-address" />
                    {shippingErrors.address && <p className="mt-1 text-xs font-semibold text-red-600">{shippingErrors.address}</p>}
                  </div>
                  <div>
                    <label htmlFor="checkout-city" className="text-eyebrow-accent text-accent-600 before:bg-accent-500 block mb-2">{t('form.city')}</label>
                    <input id="checkout-city" required type="text" value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} className="w-full p-4 bg-white border border-brand-100 rounded-xl focus:ring-2 focus:ring-brand-400/50 focus:border-brand-300 outline-none transition-all font-medium text-navy-950" placeholder={t('form.cityPlaceholder')} autoComplete="address-level2" />
                    {shippingErrors.city && <p className="mt-1 text-xs font-semibold text-red-600">{shippingErrors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="checkout-postal" className="text-eyebrow-accent text-accent-600 before:bg-accent-500 block mb-2">{t('form.postalCode')}</label>
                    <input id="checkout-postal" required type="text" value={shipping.postalCode} onChange={e => setShipping({...shipping, postalCode: e.target.value})} className="w-full p-4 bg-white border border-brand-100 rounded-xl focus:ring-2 focus:ring-brand-400/50 focus:border-brand-300 outline-none transition-all font-medium text-navy-950" placeholder={t('form.postalCodePlaceholder')} autoComplete="postal-code" />
                    {shippingErrors.postalCode && <p className="mt-1 text-xs font-semibold text-red-600">{shippingErrors.postalCode}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="checkout-country" className="text-eyebrow-accent text-accent-600 before:bg-accent-500 block mb-2">{t('form.country')}</label>
                    <select id="checkout-country" value={shipping.country} onChange={e => setShipping({...shipping, country: e.target.value})} className="w-full p-4 bg-white border border-brand-100 rounded-xl focus:ring-2 focus:ring-brand-400/50 focus:border-brand-300 outline-none transition-all font-medium text-navy-950 appearance-none cursor-pointer" autoComplete="country-name">
                      <optgroup label={t('form.countryGroups.eu')}>
                        <option value="Spain">Spain</option>
                        {EUROPEAN_COUNTRIES.filter(c => c !== 'Spain' && c !== 'United Kingdom').sort().map(c => <option key={c} value={c}>{c}</option>)}
                      </optgroup>
                      <option value="United Kingdom">United Kingdom</option>
                      <optgroup label={t('form.countryGroups.restOfWorld')}>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Other">Other International</option>
                      </optgroup>
                    </select>
                    {shippingErrors.country && <p className="mt-1 text-xs font-semibold text-red-600">{shippingErrors.country}</p>}
                  </div>
                </div>

                <fieldset className="space-y-4 pt-4 border-0 border-t border-brand-100 min-w-0">
                  <legend id="checkout-shipping-method-legend" className="text-eyebrow-accent text-accent-600 before:bg-accent-500 px-0 mb-4">
                    {t('form.selectShipping')}
                  </legend>
                  <div className="grid grid-cols-1 gap-3" role="radiogroup" aria-labelledby="checkout-shipping-method-legend">
                    {availableMethods.map((m) => (
                      <button key={m.id} type="button" role="radio" aria-checked={selectedShippingId === m.id} onClick={() => setSelectedShippingId(m.id)} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${selectedShippingId === m.id ? 'border-brand-500 bg-brand-50/60 shadow-card' : 'border-brand-100 bg-white hover:border-accent-500/30'}`}>
                        <div className="flex items-center gap-4 text-left">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedShippingId === m.id ? 'border-brand-500 bg-brand-500' : 'border-gray-300'}`}>
                            {selectedShippingId === m.id && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <div>
                            <p className="text-sm font-black text-navy-950">{m.name}</p>
                            <p className="text-[10px] font-bold text-silver-400 uppercase">{m.subtext}</p>
                          </div>
                        </div>
                        <span className="text-sm font-black text-navy-950">{formatCurrency(m.price)}</span>
                      </button>
                    ))}
                  </div>
                  {shippingErrors.shippingMethod && <p className="text-xs font-semibold text-red-600">{shippingErrors.shippingMethod}</p>}
                </fieldset>

                <Button type="button" size="lg" fullWidth onClick={handleContinueToPayment}>
                  {t('actions.continueToPayment')}
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 id="checkout-payment-heading" className="text-2xl font-display font-semibold text-navy-950">{t('payment.title')}</h2>
                  <button type="button" onClick={() => setStep(1)} className="text-xs font-black text-brand-600 uppercase tracking-widest hover:underline">{t('payment.editShipping')}</button>
                </div>

                <div className="grid grid-cols-1 gap-4" role="radiogroup" aria-labelledby="checkout-payment-heading">
                  <div className="relative flex items-center gap-5 p-6 rounded-[1.25rem] border-2 border-brand-500 bg-brand-50/40 shadow-card">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-brand-600 text-white">
                      <Landmark className="w-8 h-8" aria-hidden />
                    </div>
                    <div className="text-left flex-1">
                      <span className="text-lg font-black text-navy-950">{t('payment.bank.name')}</span>
                      <p className="text-xs font-bold text-silver-400">{t('payment.bank.subtext')}</p>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-brand-500 bg-brand-500 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                    </div>
                  </div>
                </div>
                {paymentErrors.paymentMethod && <p className="text-xs font-semibold text-red-600">{paymentErrors.paymentMethod}</p>}

                <Button type="button" size="lg" fullWidth onClick={handleConfirmPaymentChoice}>
                  {t('payment.confirmChoice')}
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-display font-semibold text-navy-950">{t('confirm.title')}</h2>
                  <button type="button" onClick={() => setStep(2)} className="text-xs font-black text-brand-600 uppercase tracking-widest hover:underline">{t('confirm.changeMethod')}</button>
                </div>

                <div className="bg-mist-50 p-8 rounded-[2rem] text-center space-y-4">
                  <Landmark className="w-16 h-16 text-navy-950 mx-auto opacity-20" />
                  <div>
                    <h3 className="text-xl font-black text-navy-950">{t('confirm.bank.title')}</h3>
                    <p className="text-sm font-bold text-steel-600 mt-2">
                      <Trans
                        i18nKey="confirm.bank.body"
                        values={{ email: shipping.email }}
                        components={{ 1: <span className="text-brand-600" /> }}
                      />
                    </p>
                  </div>
                </div>

                <Button type="button" size="lg" fullWidth onClick={handleOrderSubmit} disabled={isSubmitting} className="gap-3 text-lg py-6">
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" aria-hidden /> : t('confirm.completePurchase')}
                </Button>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-display font-semibold text-navy-950">{t('success.title')}</h2>
                <div className="mt-4 p-4 bg-mist-50 rounded-2xl border border-brand-100 max-w-xs mx-auto">
                   <p className="text-[10px] font-black uppercase text-silver-400 mb-1">{t('success.orderIdLabel')}</p>
                   <p className="text-lg font-black text-brand-600 select-all tracking-wider">{placedOrderId || t('success.processing')}</p>
                </div>
                <p className="text-steel-600 mt-6 max-w-sm mx-auto font-medium">
                  {t('success.bankFollowUp')}
                </p>
                {checkoutMessage && (
                  <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mt-4 text-sm font-semibold max-w-lg mx-auto">
                    {checkoutMessage}
                  </p>
                )}
                {placedOrderId && (
                  <div className="mt-8 flex justify-center">
                    <a
                      href={whatsappUrl(
                        t('success.whatsappMessage', {
                          name: shipping.fullName || 'Cliente',
                          orderId: placedOrderId,
                        }),
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-mist-50 px-5 py-3 text-sm font-semibold text-brand-600 transition-colors hover:bg-mist-100 hover:text-brand-700"
                    >
                      <WhatsAppIcon className="h-4 w-4 shrink-0" />
                      {t('success.whatsapp')}
                    </a>
                  </div>
                )}
                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                  {user ? (
                    <Button type="button" size="lg" onClick={() => navigate('/orders')}>
                      {t('success.viewOrders')}
                    </Button>
                  ) : (
                    <div className="p-4 bg-brand-50 rounded-2xl text-navy-900 text-[10px] font-bold max-w-xs mx-auto border border-brand-100">
                      {t('success.guestNote')}
                    </div>
                  )}
                  <Button type="button" variant="outline" size="lg" onClick={() => navigate('/')}>
                    {t('success.continueResearch')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar / Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bento-card border-t-4 border-t-accent-500 sticky top-24">
            <h2 className="text-eyebrow-accent text-accent-600 before:bg-accent-500 mb-6">{t('summary.title')}</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold text-steel-600">
                <span>{t('summary.subtotal')}</span>
                <span>{formatCurrency(lockedTotals?.subtotal ?? subtotalValue)}</span>
              </div>
              {(lockedTotals?.promoDiscount ?? promoDiscountValue) > 0 && (
                <div className="flex justify-between text-sm font-black text-emerald-500">
                  <span>{t('summary.promoDiscount')}</span>
                  <span>-{formatCurrency(lockedTotals?.promoDiscount ?? promoDiscountValue)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-steel-600">
                <span>{t('summary.shipping')}</span>
                <span>{formatCurrency(lockedTotals?.shippingCost ?? shippingCost)}</span>
              </div>
              <div className="pt-4 border-t border-brand-100 flex justify-between items-end">
                <span className="text-sm font-black text-navy-950 uppercase">{t('summary.total')}</span>
                <span className="text-2xl font-black text-brand-600 leading-none">{formatCurrency(lockedTotals?.finalTotal ?? finalTotalValue)}</span>
              </div>
            </div>

            {step < 3 && (
              <div className="mt-8 pt-8 border-t border-brand-100">
                {!showPromo ? (
                   <button type="button" onClick={() => setShowPromo(true)} className="text-[10px] font-black text-brand-600 uppercase tracking-widest hover:underline">{t('summary.applyPromo')}</button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <label htmlFor="checkout-promo-code" className="sr-only">{t('summary.promoLabel')}</label>
                      <input id="checkout-promo-code" type="text" placeholder={PRIMARY_PROMO_CODE} value={promoCode} onChange={e => setPromoCode(e.target.value)} className="flex-1 p-3 bg-mist-50 border-none rounded-xl outline-none text-xs font-black" />
                      <button type="button" onClick={applyPromo} className="bg-brand-600 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-700 transition-colors">{t('summary.apply')}</button>
                    </div>
                    {promoError && <p className="text-[10px] text-red-500 font-bold">{promoError}</p>}
                    {storePromoCode && promoDiscountValue > 0 && <p className="text-[10px] text-emerald-500 font-bold">{t('summary.promoAccepted')}</p>}
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 grid grid-cols-2 gap-3">
               <div className="bg-mist-50 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                  <Shield className="w-5 h-5 text-brand-600 mb-1" />
                  <p className="text-[8px] font-black uppercase text-navy-950">{t('summary.sslSecure')}</p>
               </div>
               <div className="bg-mist-50 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mb-1" />
                  <p className="text-[8px] font-black uppercase text-navy-950">{t('summary.protected')}</p>
               </div>
            </div>
          </div>
        </div>
      </div>
      </Container>
    </PageShell>
  );
}
