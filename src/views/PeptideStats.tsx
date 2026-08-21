'use client';

import { usePageSeo } from '../seo/SeoProvider';
import { LocaleLink } from '../i18n/LocaleLink';

export default function PeptideStats() {
  usePageSeo({ canonicalPath: '/peptide-stats' });

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section id="answer" aria-label="Quick Answer" className="mb-10">
          <p className="rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-steel-600">
            <strong className="text-navy-950">Respuesta rápida:</strong> Los péptidos terapéuticos y de
            investigación son un área en expansión; esta página resume cifras públicas citables y
            enlaza fuentes oficiales para laboratorios.
          </p>
        </section>
        <h1 className="font-display text-4xl font-bold text-navy-950 mb-4">
          Estadísticas de péptidos de investigación
        </h1>
        <p className="text-steel-600 mb-8">
          Uso exclusivo para investigación. Las cifras siguientes proceden de fuentes públicas; verifica
          siempre el documento original.
        </p>
        <ul className="space-y-6 text-steel-600">
          <li>
            <strong className="text-navy-950">Mercado de péptidos terapéuticos:</strong> informes de
            industria estiman un mercado global de decenas de miles de millones USD a mediados de la
            década de 2020, con crecimiento impulsado por metabolicos y oncología. Fuente de contexto:{' '}
            <a
              className="text-brand-600 underline"
              href="https://www.ncbi.nlm.nih.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NCBI / PubMed
            </a>
            .
          </li>
          <li>
            <strong className="text-navy-950">Calidad analítica:</strong> HPLC y espectrometría de masas
            son métodos de referencia habituales en COAs de péptidos sintéticos. Ver revisiones en{' '}
            <a
              className="text-brand-600 underline"
              href="https://pubchem.ncbi.nlm.nih.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PubChem
            </a>
            .
          </li>
          <li>
            <strong className="text-navy-950">UE — investigación:</strong> el marco de sustancias para
            uso de investigación exige etiquetado y documentación adecuados; consulta la legislación
            vigente en{' '}
            <a
              className="text-brand-600 underline"
              href="https://eur-lex.europa.eu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              EUR-Lex
            </a>
            .
          </li>
        </ul>
        <p className="mt-10 text-sm text-steel-600">
          Ver también:{' '}
          <LocaleLink to="/coas" className="text-brand-600 underline">
            biblioteca COA
          </LocaleLink>{' '}
          ·{' '}
          <LocaleLink to="/coa-vs-no-coa" className="text-brand-600 underline">
            COA vs sin COA
          </LocaleLink>
          .
        </p>
      </div>
    </div>
  );
}
