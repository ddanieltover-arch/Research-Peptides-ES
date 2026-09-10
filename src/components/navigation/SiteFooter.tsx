import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../../i18n/LocaleLink';
import { MapPin, ShieldCheck, Truck } from 'lucide-react';
import footerLogo from '../../assets/footerLogo';
import { Container, ScientificBackdrop } from '../../design-system';
import { footerInventory, footerLegal, footerSupport } from '../../navigation/config';
import { BRAND_NAME, HQ_LOCATION, SUPPORT_EMAIL } from '../../config/brand';
import { FOOTER_EXTERNAL_LINKS, FOOTER_SEO_LINKS } from '../../seo/seoLinkGraph';

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
    <footer className="bg-navy-950 text-white relative overflow-hidden border-t border-slate-800">
      <ScientificBackdrop variant="dark" glow />

      <Container className="relative z-10 section-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <LocaleLink to="/" className="inline-flex items-center gap-3 mb-5 rounded-lg">
              <img
                src={footerLogo}
                alt={BRAND_NAME}
                className="h-10 sm:h-11 w-auto max-w-[220px]"
                width={180}
                height={48}
              />
            </LocaleLink>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {tCommon('footer.tagline')}
            </p>
            <p className="flex items-start gap-2 text-xs text-slate-400 mt-3 max-w-sm leading-relaxed font-mono">
              <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-brand-400" aria-hidden />
              {HQ_LOCATION}
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-mono font-medium uppercase tracking-wider text-slate-300">
                <Truck className="h-3 w-3 text-brand-400" aria-hidden />
                {tCommon('footer.euShipping')}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-mono font-medium uppercase tracking-wider text-slate-300">
                <ShieldCheck className="h-3 w-3 text-emerald-400" aria-hidden />
                {tCommon('footer.gdpr')}
              </span>
            </div>
            <address className="not-italic text-slate-400 text-xs sm:text-sm leading-relaxed mt-6 max-w-sm font-mono">
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white transition-colors">
                {SUPPORT_EMAIL}
              </a>
            </address>
            <div className="mt-5">
              <h4 className="text-caption text-slate-400 mb-2.5">Fuentes externas</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {FOOTER_EXTERNAL_LINKS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-caption text-slate-300 mb-4">{tNav('footer.inventory')}</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
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
            <h4 className="text-caption text-slate-300 mb-4">{tNav('footer.support')}</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
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
            <h4 className="text-caption text-slate-300 mb-4">Investigación y catálogo</h4>
            <ul className="columns-1 sm:columns-2 gap-x-6 space-y-1.5 text-xs text-slate-400 mb-6">
              {FOOTER_SEO_LINKS.map((item) => (
                <li key={`${item.to}:${item.anchor}`} className="break-inside-avoid">
                  <LocaleLink to={item.to} className="hover:text-white transition-colors">
                    {item.anchor}
                  </LocaleLink>
                </li>
              ))}
            </ul>
            <h4 className="text-caption text-slate-300 mb-3">{tCommon('footer.newsletterTitle')}</h4>
            <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed font-sans">
              {tCommon('footer.newsletterDescription')}
            </p>
            <form
              className="flex flex-wrap gap-2 rounded-xl p-1 bg-white/5 backdrop-blur-md border border-white/10 focus-within:ring-2 focus-within:ring-brand-500/40 transition-all"
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
                className="min-w-0 flex-1 px-3 py-2 bg-transparent text-white placeholder:text-slate-500 focus:outline-none text-xs sm:text-sm font-sans"
              />
              <button
                type="submit"
                disabled={newsletterSubmitting}
                className="bg-brand-600 px-4 py-2 rounded-lg hover:bg-brand-700 disabled:opacity-70 font-semibold text-xs sm:text-sm whitespace-nowrap transition-all text-white cursor-pointer"
              >
                {newsletterSubmitting ? tCommon('footer.newsletterSubscribing') : tCommon('footer.newsletterSubscribe')}
              </button>
            </form>
            {newsletterMessage ? (
              <p className="mt-2 text-xs text-emerald-400 font-medium" role="status" aria-live="polite">
                {newsletterMessage}
              </p>
            ) : null}
            {newsletterError ? (
              <p className="mt-2 text-xs text-rose-400 font-medium" role="alert">
                {newsletterError}
              </p>
            ) : null}
          </div>
        </div>
      </Container>

      <Container className="relative z-10 pb-10">
        <div className="pt-6 border-t border-slate-850 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono font-medium uppercase tracking-[0.12em] text-slate-400">
          <span>
            © {new Date().getFullYear()} {BRAND_NAME}. {tCommon('footer.copyright')}
          </span>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {footerLegal.map((item) => (
              <LocaleLink key={item.href} to={item.href} className="hover:text-white transition-colors">
                {tNav(item.labelKey)}
              </LocaleLink>
            ))}
          </div>
        </div>
        <p className="text-center md:text-left text-[10px] text-slate-500 mt-3 max-w-3xl leading-relaxed normal-case tracking-normal font-normal">
          {tCommon('footer.disclaimer')}
        </p>
      </Container>
    </footer>
  );
}
