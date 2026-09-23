'use client';

import type { LocaleCode } from '../../i18n/locales';
import type { BlogSeoCopy } from '../../seo/blogSeoCopy';

type BlogSeoContentProps = {
  copy: BlogSeoCopy;
  locale: LocaleCode;
};

export function BlogSeoContent({ copy, locale }: BlogSeoContentProps) {
  const quick = locale === 'es' ? 'Respuesta rápida:' : 'Quick answer:';
  const kwLabel = locale === 'es' ? 'Palabras clave' : 'Keywords';
  const faqTitle = locale === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions';

  return (
    <div className="mb-8 space-y-6">
      <section
        id="answer"
        aria-label={quick}
        className="rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-steel-600"
      >
        <p>
          <strong className="text-navy-950">{quick} </strong>
          {copy.answerCapsule}
        </p>
      </section>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-silver-400 mb-2">
          {kwLabel}
        </p>
        <ul className="flex flex-wrap gap-2">
          <li>
            <span className="inline-flex items-center rounded-lg border border-brand-200 bg-white px-2.5 py-1 text-xs font-semibold text-brand-700">
              {copy.primaryKeyword}
            </span>
          </li>
          {copy.secondaryKeywords.map((kw) => (
            <li key={kw}>
              <span className="inline-flex items-center rounded-lg border border-slate-200 bg-mist-50 px-2.5 py-1 text-xs text-steel-600">
                {kw}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {copy.faqs.length > 0 ? (
        <section id="faq" aria-labelledby="blog-seo-faq-heading">
          <h2
            id="blog-seo-faq-heading"
            className="font-display text-lg font-semibold text-navy-950 mb-3"
          >
            {faqTitle}
          </h2>
          <dl className="space-y-3">
            {copy.faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <dt className="font-semibold text-navy-950 text-sm">{faq.question}</dt>
                <dd className="mt-1 text-sm text-steel-600 leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </div>
  );
}
