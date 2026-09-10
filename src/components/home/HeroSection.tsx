import { useTranslation } from 'react-i18next';
import { usePreloadImage } from '../../hooks/usePreloadImage';
import { ArrowRight, CheckCircle2, FileText, FlaskConical, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { LocaleLink } from '../../i18n/LocaleLink';
import { Button, Container, buttonClassName } from '../../design-system';
import { useWizardStore } from '../../store/useWizardStore';
import heroPeptides from '../../assets/hero_peptides.webp';
import { assetUrl } from '../../lib/assetUrl';

const heroPeptidesSrc = assetUrl(heroPeptides);

const trustPills = [
  { icon: ShieldCheck, value: '≥99.4%', labelKey: 'hero.trustPurity', sub: 'HPLC / MS Verificado' },
  { icon: Truck, value: '24/48h', labelKey: 'hero.trustShipping', sub: 'Cadena de frío Madrid' },
  { icon: FileText, value: 'COA', labelKey: 'hero.trustCoa', sub: 'Certificado por lote' },
] as const;

const popularShortcuts = [
  { label: 'BPC-157', q: 'bpc-157' },
  { label: 'Semaglutida', q: 'semaglutide' },
  { label: 'Tirzepatida', q: 'tirzepatide' },
  { label: 'NAD+', q: 'nad' },
  { label: 'TB-500', q: 'tb-500' },
  { label: 'Retatrutida', q: 'retatrutide' },
  { label: 'GHK-Cu', q: 'ghk-cu' },
] as const;

export function HeroSection() {
  const { t } = useTranslation('home');
  const openWizard = useWizardStore((s) => s.openWizard);
  usePreloadImage(heroPeptidesSrc);

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200/80">
      {/* Precision background grid */}
      <div className="absolute inset-0 bg-scientific-grid opacity-50 pointer-events-none" aria-hidden />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-50/80 to-transparent pointer-events-none" aria-hidden />

      <Container className="relative z-10 pt-10 pb-14 md:pt-14 md:pb-18 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[min(72vh,720px)]">
          {/* Copy column */}
          <div className="lg:col-span-6 xl:col-span-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Telemetry live status badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/90 px-3 py-1 mb-5 text-xs text-slate-700 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[11px] font-medium tracking-tight text-slate-600">
                  Lotes 2026 Verificados HPLC/MS · Madrid Hub
                </span>
              </div>

              {/* Laser-sharp H1 with Geist Sans typography */}
              <h1 className="text-display font-bold text-navy-950 leading-[1.08] tracking-tight mb-5">
                <span className="block text-[clamp(2.25rem,4.5vw,3.75rem)]">
                  {t('hero.title')}
                </span>
                <span className="block text-[clamp(2.25rem,4.5vw,3.75rem)] text-brand-600 mt-1">
                  {t('hero.titleHighlight')}
                </span>
              </h1>

              <p className="text-steel-600 text-base md:text-lg leading-relaxed max-w-xl mb-6 font-sans">
                {t('hero.subtitle')}
              </p>

              {/* Popular quick peptide pills */}
              <div className="mb-7">
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Acceso rápido por compuesto:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {popularShortcuts.map((item) => (
                    <LocaleLink
                      key={item.label}
                      to={`/search?q=${item.q}`}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100/90 text-slate-700 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200/80 transition-colors"
                    >
                      {item.label}
                    </LocaleLink>
                  ))}
                </div>
              </div>

              {/* Main Actions */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <LocaleLink
                  to="/shop"
                  className={buttonClassName({ size: 'lg', className: 'gap-2' })}
                >
                  {t('hero.ctaShop')}
                  <ArrowRight className="h-4 w-4" />
                </LocaleLink>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={openWizard}
                  className="gap-2 border-slate-200 text-navy-950 hover:bg-slate-50"
                >
                  <Sparkles className="h-4 w-4 text-brand-600" />
                  {t('hero.ctaWizard')}
                </Button>
                <LocaleLink
                  to="/coas"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-brand-600 transition-colors ml-2 py-2"
                >
                  Ver Certificados (COA) →
                </LocaleLink>
              </div>

              {/* Trust Metric Tiles */}
              <ul className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {trustPills.map(({ icon: Icon, value, labelKey, sub }, i) => (
                  <motion.li
                    key={labelKey}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="flex flex-col p-3 sm:p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/60 shadow-card"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white border border-slate-200/80 text-brand-600">
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span className="font-mono text-base sm:text-lg font-bold text-navy-950 tabular-nums leading-none">
                        {value}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                      {t(labelKey)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {sub}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Visual column — Clinical Command Station */}
          <div className="lg:col-span-6 xl:col-span-6 order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Product Visual Container with 1px surgical border */}
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-elevated">
                <img
                  src={heroPeptidesSrc}
                  alt="Research Peptides ES - Laboratorio de péptidos de alta pureza"
                  width={960}
                  height={640}
                  className="w-full aspect-[4/3] sm:aspect-[16/11] object-cover object-[center_35%]"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />

                {/* Top status bar overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/95 backdrop-blur-sm border border-slate-200/80 px-2.5 py-1 text-[11px] font-mono font-medium text-slate-700 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Grado Investigación (≥99.4%)
                  </span>
                </div>

                {/* Bottom gradient label */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-navy-950/85 via-navy-950/40 to-transparent">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-300 mb-0.5">
                        Research Peptides España
                      </p>
                      <p className="text-white text-xs sm:text-sm font-medium leading-snug">
                        Liofilizado puro · Viales sellados con nitrógeno grado farmacéutico
                      </p>
                    </div>
                    <span className="shrink-0 rounded-md bg-white/95 border border-slate-200 px-2.5 py-1 text-[10px] font-mono font-bold text-navy-950 shadow-sm">
                      EUR · ES / UE
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive HPLC Analytical Telemetry Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="hidden sm:block absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 w-72 sm:w-80 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 shadow-elevated z-20"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Especificación Analítica
                  </span>
                  <span className="font-mono text-[10px] text-brand-600 font-semibold bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100">
                    Lote ES-2026
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="font-sans text-[11px]">Compuesto:</span>
                    <span className="font-mono font-semibold text-navy-950">Semaglutide 5mg</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="font-sans text-[11px]">Pureza HPLC:</span>
                    <span className="font-mono font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> 99.82% Passed
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="font-sans text-[11px]">Análisis:</span>
                    <span className="font-mono text-[11px] text-slate-700">LC-MS / Janoshik Ref</span>
                  </div>
                </div>

                {/* HPLC Peak Retention Waveform SVG */}
                <div className="mt-2.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mb-0.5">
                    <span>Cromatograma HPLC (UV 214nm)</span>
                    <span className="text-emerald-600 font-semibold">Pico: 4.82 min</span>
                  </div>
                  <svg viewBox="0 0 200 32" className="w-full h-6 text-emerald-600 stroke-current fill-none">
                    <path
                      d="M 0 28 L 50 28 L 75 27 L 90 26 L 98 4 L 104 26 L 115 27 L 140 28 L 200 28"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 0 28 L 50 28 L 75 27 L 90 26 L 98 4 L 104 26 L 115 27 L 140 28 L 200 28 L 200 32 L 0 32 Z"
                      fill="currentColor"
                      fillOpacity="0.08"
                    />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
