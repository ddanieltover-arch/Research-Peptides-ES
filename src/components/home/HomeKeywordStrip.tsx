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
    <section aria-label="Búsquedas frecuentes" className="border-y border-brand-100/80 bg-white">
      <Container className="py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 mb-3">
          Búsquedas frecuentes
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-steel-600">
          {TOP_GAP_LINKS.map((link) => (
            <li key={`${link.to}:${link.anchor}`}>
              <LocaleLink
                to={link.to}
                className="underline decoration-brand-200 underline-offset-2 hover:text-navy-950 hover:decoration-brand-500"
              >
                {link.anchor}
              </LocaleLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
