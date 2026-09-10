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
        className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-600"
      >
        <p>
          <strong className="text-navy-950 font-semibold">{quickLabel} </strong>
          {copy.answerCapsule}
        </p>
      </div>

      <div id="product-seo-heading" className="space-y-6">
        {copy.sections.map((section, index) => {
          const Heading = index === 0 ? 'h2' : 'h3';
          return (
            <div key={section.heading}>
              <Heading
                className={
                  index === 0
                    ? 'font-sans text-lg font-bold text-navy-950 mb-1.5'
                    : 'font-sans text-base font-bold text-navy-950 mb-1.5'
                }
              >
                {section.heading}
              </Heading>
              <p className="text-slate-600 text-sm leading-relaxed font-sans">{section.body}</p>
            </div>
          );
        })}
      </div>

      {copy.faqs.length > 0 ? (
        <div>
          <h2 className="font-sans text-lg font-bold text-navy-950 mb-3">{faqTitle}</h2>
          <dl className="space-y-3">
            {copy.faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-sm">
                <dt className="font-semibold text-navy-950 text-sm">{faq.question}</dt>
                <dd className="mt-1 text-sm text-slate-600 leading-relaxed font-sans">{faq.answer}</dd>
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
