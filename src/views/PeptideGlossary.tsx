'use client';

import { usePageSeo } from '../seo/SeoProvider';
import { LocaleLink } from '../i18n/LocaleLink';

const TERMS = [
  {
    term: 'Péptido de investigación',
    def: 'Cadena corta de aminoácidos suministrada para uso exclusivo en laboratorio e investigación in vitro o preclínica, no para consumo humano ni uso clínico.',
  },
  {
    term: 'Liofilización',
    def: 'Proceso de secado por congelación que estabiliza péptidos en polvo para almacenamiento y transporte.',
  },
  {
    term: 'Reconstitución',
    def: 'Disolución de un péptido liofilizado en un diluyente adecuado (p. ej. agua bacteriostática) bajo protocolos de laboratorio.',
  },
  {
    term: 'COA (Certificate of Analysis)',
    def: 'Informe de un laboratorio analítico que documenta pureza e identidad del lote mediante métodos como HPLC o MS.',
  },
  {
    term: 'Pureza HPLC',
    def: 'Porcentaje de pureza estimado por cromatografía líquida de alta resolución, indicador habitual de calidad analítica.',
  },
  {
    term: 'Cadena de frío',
    def: 'Logística de temperatura controlada para preservar la integridad de productos sensibles durante el envío.',
  },
];

export default function PeptideGlossary() {
  usePageSeo({ canonicalPath: '/peptide-glossary' });

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section id="answer" aria-label="Quick Answer" className="mb-10">
          <p className="rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-steel-600">
            <strong className="text-navy-950">Respuesta rápida:</strong> Este glosario define términos
            clave de péptidos de investigación (COA, liofilización, reconstitución, pureza) para
            laboratorios europeos.
          </p>
        </section>
        <h1 className="font-display text-4xl font-bold text-navy-950 mb-4">Glosario de péptidos</h1>
        <p className="text-steel-600 mb-10">
          Definiciones orientadas a investigadores. Para protocolos prácticos, consulta la{' '}
          <LocaleLink to="/peptide-guide" className="text-brand-600 underline">
            guía de péptidos
          </LocaleLink>{' '}
          y la{' '}
          <LocaleLink to="/peptide-calculator" className="text-brand-600 underline">
            calculadora de reconstitución
          </LocaleLink>
          .
        </p>
        <dl className="space-y-8">
          {TERMS.map((item) => (
            <div key={item.term} id={item.term.toLowerCase().replace(/\s+/g, '-')}>
              <dt className="font-display text-xl font-semibold text-navy-950">{item.term}</dt>
              <dd className="mt-2 text-steel-600 leading-relaxed">{item.def}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
