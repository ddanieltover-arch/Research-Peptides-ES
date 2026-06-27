import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../../i18n/LocaleLink';
import { MapPin, ShieldCheck, Truck } from 'lucide-react';
import footerLogo from '../../assets/footerLogo';
import { Container, ScientificBackdrop } from '../../design-system';
import { footerInventory, footerLegal, footerSupport } from '../../navigation/config';
import { BRAND_NAME, HQ_LOCATION, SUPPORT_EMAIL } from '../../config/brand';

type SiteFooterProps = {
  newsletterEmail: string;
  newsletterSubmitting: boolean;
  newsletterMessage: string | null;
  newsletterError: string | null;
  onNewsletterEmailChange: (value: string) => void;
  onNewsletterSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function SiteFooter({
  newsletterEmail,
  newsletterSubmitting,
  newsletterMessage,
  newsletterError,
  onNewsletterEmailChange,
  onNewsletterSubmit,
}: SiteFooterProps) {
  const { t: tNav } = useTranslation('nav');
  const { t: tCommon } = useTranslation('common');

  return (
    <footer className="bg-navy-950 text-white relative overflow-hidden border-t-4 border-accent-500">
      <ScientificBackdrop variant="dark" glow />

      <Container className="relative z-10 section-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <LocaleLink to="/" className="inline-flex items-center gap-3 mb-6 rounded-lg">
              <img
                src={footerLogo}
                alt={BRAND_NAME}
                className="h-11 sm:h-12 w-auto max-w-[240px]"
                width={180}
                height={48}
              />
            </LocaleLink>
            <p className="text-sm text-silver-400 leading-relaxed max-w-sm">
              {tCommon('footer.tagline')}
            </p>
            <p className="flex items-start gap-2 text-xs text-brand-300/90 mt-4 max-w-sm leading-relaxed">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" aria-hidden />
              {HQ_LOCATION}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-200">
                <Truck className="h-3 w-3" aria-hidden />
                {tCommon('footer.euShipping')}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-200">
                <ShieldCheck className="h-3 w-3" aria-hidden />
                {tCommon('footer.gdpr')}
              </span>
            </div>
            <address className="not-italic text-silver-400 text-sm leading-relaxed mt-8 max-w-sm">
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white transition-colors">
                {SUPPORT_EMAIL}
              </a>
            </address>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-caption text-accent-500 mb-5 font-sans">{tNav('footer.inventory')}</h4>
            <ul className="space-y-3 text-sm text-silver-400">
              {footerInventory.map((item) => (
                <li key={item.href}>
                  <LocaleLink to={item.href} className="hover:text-white transition-colors">
                    {tNav(item.labelKey)}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-caption text-brand-400 mb-5">{tNav('footer.support')}</h4>
            <ul className="space-y-3 text-sm text-silver-400">
              {footerSupport.map((item) => (
                <li key={item.href}>
                  <LocaleLink to={item.href} className="hover:text-white transition-colors">
                    {tNav(item.labelKey)}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-caption text-brand-400 mb-5">{tCommon('footer.newsletterTitle')}</h4>
            <p className="text-silver-400 text-sm mb-5 leading-relaxed">
              {tCommon('footer.newsletterDescription')}
            </p>
            <form
              className="flex flex-wrap gap-2 rounded-2xl p-1.5 bg-white/5 backdrop-blur-md border border-white/10 focus-within:ring-2 focus-within:ring-brand-400/40 transition-all"
              onSubmit={onNewsletterSubmit}
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                {tCommon('footer.newsletterEmailLabel')}
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                placeholder={tCommon('footer.newsletterPlaceholder')}
                autoComplete="email"
                value={newsletterEmail}
                onChange={(e) => onNewsletterEmailChange(e.target.value)}
                disabled={newsletterSubmitting}
                required
                className="min-w-0 flex-1 px-4 py-3 bg-transparent text-white placeholder:text-silver-400/80 focus:outline-none text-sm"
              />
              <button
                type="submit"
                disabled={newsletterSubmitting}
                className="bg-gradient-cta px-6 py-3 rounded-xl hover:brightness-110 disabled:opacity-70 font-semibold text-sm whitespace-nowrap transition-all"
              >
                {newsletterSubmitting ? tCommon('footer.newsletterSubscribing') : tCommon('footer.newsletterSubscribe')}
              </button>
            </form>
            {newsletterMessage ? (
              <p className="mt-2 text-xs text-success font-medium" role="status" aria-live="polite">
                {newsletterMessage}
              </p>
            ) : null}
            {newsletterError ? (
              <p className="mt-2 text-xs text-error font-medium" role="alert">
                {newsletterError}
              </p>
            ) : null}
          </div>
        </div>
      </Container>

      <Container className="relative z-10 pb-10">
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-silver-400">
          <span>
            © {new Date().getFullYear()} {BRAND_NAME}. {tCommon('footer.copyright')}
          </span>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {footerLegal.map((item) => (
              <LocaleLink key={item.href} to={item.href} className="hover:text-brand-300 transition-colors">
                {tNav(item.labelKey)}
              </LocaleLink>
            ))}
          </div>
        </div>
        <p className="text-center md:text-left text-[10px] text-silver-400/80 mt-4 max-w-3xl leading-relaxed normal-case tracking-normal font-normal">
          {tCommon('footer.disclaimer')}
        </p>
      </Container>
    </footer>
  );
}
