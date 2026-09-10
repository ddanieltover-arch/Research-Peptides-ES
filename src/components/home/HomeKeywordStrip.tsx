'use client';

import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../../i18n/LocaleLink';
import { Container } from '../../design-system';
import { SEO_HUB_LINKS } from '../../seo/seoLinkGraph';

const TOP_GAP_LINKS = [
  SEO_HUB_LINKS.shopComprar,
  SEO_HUB_LINKS.shopComprarEs,
  SEO_HUB_LINKS.shopOnline,
  SEO_HUB_LINKS.shopInyectables,
  SEO_HUB_LINKS.peptidesSpain,
  SEO_HUB_LINKS.retatrutideComprar,
  SEO_HUB_LINKS.cagrilintide,
  SEO_HUB_LINKS.cagrilintidePrecio,
  SEO_HUB_LINKS.follistatin,
  SEO_HUB_LINKS.igf1,
  SEO_HUB_LINKS.bacWater,
  SEO_HUB_LINKS.bacWaterEn,
  SEO_HUB_LINKS.blogRetatrutide,
  SEO_HUB_LINKS.blogComprarPeptidos,
] as const;

/** Visible keyword anchors from espanapeptide.es gap (top commercial ES queries). */
export function HomeKeywordStrip() {
  const { t } = useTranslation('home');

  return (
    <section aria-label={t('keywords.ariaLabel')} className="border-b border-slate-200/80 bg-slate-50/70">
      <Container className="py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="shrink-0 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
            {t('keywords.label')}
          </span>
          <ul className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-slate-600">
            {TOP_GAP_LINKS.map((link) => (
              <li key={`${link.to}:${link.anchor}`}>
                <LocaleLink
                  to={link.to}
                  className="inline-flex items-center text-slate-600 hover:text-brand-600 hover:underline underline-offset-2 transition-colors font-medium"
                >
                  {link.anchor}
                </LocaleLink>
                <span className="ml-2 text-slate-300 select-none" aria-hidden>
                  ·
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
