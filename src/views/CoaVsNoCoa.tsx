'use client';

import { usePageSeo } from '../seo/SeoProvider';
import { LocaleLink } from '../i18n/LocaleLink';

export default function CoaVsNoCoa() {
  usePageSeo({ canonicalPath: '/coa-vs-no-coa' });

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section id="answer" aria-label="Quick Answer" className="mb-10">
          <p className="rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-steel-600">
            <strong className="text-navy-950">Respuesta rápida:</strong> Un COA de terceros documenta
            pureza e identidad del lote; comprar sin COA aumenta el riesgo analítico para protocolos de
            laboratorio. Research Peptides ES prioriza verificación documentada.
          </p>
        </section>
        <h1 className="font-display text-4xl font-bold text-navy-950 mb-4">
          COA frente a péptidos sin certificado
        </h1>
        <p className="text-steel-600 mb-8">
          Comparación orientada a compradores de laboratorio. No constituye consejo médico ni de dosificación
          humana.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border border-brand-100 rounded-xl overflow-hidden">
            <thead className="bg-brand-50 text-navy-950">
              <tr>
                <th className="p-3">Criterio</th>
                <th className="p-3">Con COA de terceros</th>
                <th className="p-3">Sin COA</th>
              </tr>
            </thead>
            <tbody className="text-steel-600">
              <tr className="border-t border-brand-100">
                <td className="p-3 font-medium text-navy-950">Trazabilidad de lote</td>
                <td className="p-3">Alta — lote, método, fecha</td>
                <td className="p-3">Baja o inexistente</td>
              </tr>
              <tr className="border-t border-brand-100">
                <td className="p-3 font-medium text-navy-950">Pureza documentada</td>
                <td className="p-3">Reportada (p. ej. HPLC)</td>
                <td className="p-3">No verificable</td>
              </tr>
              <tr className="border-t border-brand-100">
                <td className="p-3 font-medium text-navy-950">Riesgo para el protocolo</td>
                <td className="p-3">Menor incertidumbre analítica</td>
                <td className="p-3">Mayor riesgo de impurezas</td>
              </tr>
              <tr className="border-t border-brand-100">
                <td className="p-3 font-medium text-navy-950">Uso</td>
                <td className="p-3">Investigación de laboratorio</td>
                <td className="p-3">No recomendado para trabajo serio</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-10 text-sm text-steel-600">
          Explora la{' '}
          <LocaleLink to="/coas" className="text-brand-600 underline">
            biblioteca COA
          </LocaleLink>{' '}
          o el{' '}
          <LocaleLink to="/shop" className="text-brand-600 underline">
            catálogo
          </LocaleLink>
          .
        </p>
      </div>
    </div>
  );
}
