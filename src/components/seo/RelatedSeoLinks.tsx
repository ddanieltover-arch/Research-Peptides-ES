'use client';

import { LocaleLink } from '../../i18n/LocaleLink';
import { Container } from '../../design-system';
import type { SeoLinkSet } from '../../seo/seoLinkGraph';

type RelatedSeoLinksProps = {
  links: SeoLinkSet;
  /** Optional heading override */
  title?: string;
  className?: string;
  /** Use full-width container padding */
  contained?: boolean;
};

/**
 * Contextual SEO block: keyword-anchored internal links + ≥2 outbound scientific refs.
 */
export function RelatedSeoLinks({
  links,
  title = 'Enlaces relacionados para investigación',
  className = '',
  contained = true,
}: RelatedSeoLinksProps) {
  const internal = links.internal.slice(0, 8);
  const external = links.external.slice(0, 4);

  if (internal.length === 0 && external.length === 0) return null;

  const body = (
    <section
      aria-labelledby="related-seo-links-heading"
      className={`border-t border-brand-100/80 bg-mist-50/40 py-10 ${className}`}
    >
      <h2
        id="related-seo-links-heading"
        className="font-display text-lg font-semibold text-navy-950 mb-4"
      >
        {title}
      </h2>
      <div className="grid gap-8 sm:grid-cols-2">
        {internal.length > 0 ? (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-700 mb-3">
              En el sitio
            </h3>
            <ul className="space-y-2 text-sm text-steel-600">
              {internal.map((link) => (
                <li key={`${link.to}:${link.anchor}`}>
                  <LocaleLink
                    to={link.to}
                    className="text-brand-700 underline decoration-brand-200 underline-offset-2 hover:text-navy-950 hover:decoration-brand-500"
                  >
                    {link.anchor}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {external.length > 0 ? (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-700 mb-3">
              Fuentes externas
            </h3>
            <ul className="space-y-2 text-sm text-steel-600">
              {external.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 underline decoration-brand-200 underline-offset-2 hover:text-navy-950 hover:decoration-brand-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );

  if (!contained) return body;

  return <Container className="max-w-5xl">{body}</Container>;
}
