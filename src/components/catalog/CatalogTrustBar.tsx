import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../../i18n/LocaleLink';
import { ShieldCheck, Truck } from 'lucide-react';
import { Container } from '../../design-system';

export function CatalogTrustBar() {
  const { t } = useTranslation('common');

  return (
    <div className="border-b border-slate-200/80 bg-slate-50/80">
      <Container className="py-2 sm:py-2.5">
        <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-center text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Truck className="h-3.5 w-3.5 text-brand-600 shrink-0" aria-hidden />
            {t('catalogTrust.dispatch')}
          </span>
          <span className="hidden sm:inline text-slate-300 select-none" aria-hidden>
            |
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden />
            {t('catalogTrust.researchOnly')}{' '}
            <LocaleLink to="/faq" className="text-brand-600 hover:text-brand-700 underline-offset-2 hover:underline ml-1">
              {t('catalogTrust.faqLink')}
            </LocaleLink>
          </span>
        </p>
      </Container>
    </div>
  );
}
