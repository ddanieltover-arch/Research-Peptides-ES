'use client';

import { LocaleLink } from '../../i18n/LocaleLink';
import type { LocaleCode } from '../../i18n/locales';
import type { ProductSeoCopy } from '../../seo/productSeoCopy';

type ProductSeoContentProps = {
  copy: ProductSeoCopy;
  locale: LocaleCode;
};

export function ProductSeoContent({ copy, locale }: ProductSeoContentProps) {
  const quickLabel = locale === 'es' ? 'Respuesta rápida:' : 'Quick answer:';
  const faqTitle = locale === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions';
  const alsoTitle = locale === 'es' ? 'También en el sitio' : 'Also on this site';

  return (
    <section aria-labelledby="product-seo-heading" className="mb-16 space-y-10">
      <div
        id="answer"
        className="rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-steel-600"
      >
        <p>
          <strong className="text-navy-950">{quickLabel} </strong>
          {copy.answerCapsule}
        </p>
      </div>

      <div id="product-seo-heading" className="space-y-8">
        {copy.sections.map((section, index) => {
          const Heading = index === 0 ? 'h2' : 'h3';
          return (
            <div key={section.heading}>
              <Heading
                className={
                  index === 0
                    ? 'font-display text-xl font-semibold text-navy-950 mb-2'
                    : 'font-display text-lg font-semibold text-navy-950 mb-2'
                }
              >
                {section.heading}
              </Heading>
              <p className="text-steel-600 text-sm leading-relaxed">{section.body}</p>
            </div>
          );
        })}
      </div>

      {copy.faqs.length > 0 ? (
        <div>
          <h2 className="font-display text-xl font-semibold text-navy-950 mb-4">{faqTitle}</h2>
          <dl className="space-y-4">
            {copy.faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-brand-100/80 bg-white px-4 py-3">
                <dt className="font-semibold text-navy-950 text-sm">{faq.question}</dt>
                <dd className="mt-1 text-sm text-steel-600 leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {copy.relatedLinks.length > 0 ? (
        <nav aria-label={alsoTitle} className="text-sm text-steel-600">
          <h2 className="font-display text-lg font-semibold text-navy-950 mb-3">{alsoTitle}</h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {copy.relatedLinks.map((link) => (
              <li key={`${link.to}:${link.label}`}>
                <LocaleLink
                  to={link.to}
                  className="text-brand-700 underline decoration-brand-200 underline-offset-2 hover:text-navy-950"
                >
                  {link.label}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </section>
  );
}
