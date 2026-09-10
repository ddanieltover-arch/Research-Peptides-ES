'use client';

import { LocaleLink } from '../../i18n/LocaleLink';
import { Container } from '../../design-system';
import { SEO_HUB_LINKS } from '../../seo/seoLinkGraph';

const TOP_GAP_LINKS = [
  SEO_HUB_LINKS.shopComprar,
  SEO_HUB_LINKS.shopPeptidosEs,
  SEO_HUB_LINKS.peptidesSpain,
  SEO_HUB_LINKS.retatrutide,
  SEO_HUB_LINKS.retatrutideBuy,
  SEO_HUB_LINKS.ghkCu,
  SEO_HUB_LINKS.bpc157,
  SEO_HUB_LINKS.pt141,
  SEO_HUB_LINKS.melanotan,
  SEO_HUB_LINKS.bacWater,
] as const;

/** Visible keyword anchors from espanapeptide.es gap (top commercial ES queries). */
export function HomeKeywordStrip() {
  return (
    <section aria-label="Búsquedas frecuentes" className="border-b border-slate-200/80 bg-slate-50/70">
      <Container className="py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="shrink-0 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
            Búsquedas frecuentes:
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
                <span className="ml-2 text-slate-300 select-none" aria-hidden>·</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
