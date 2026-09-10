import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { usePreloadImage } from '../../hooks/usePreloadImage';
import { ArrowRight, CheckCircle2, FileText, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { LocaleLink } from '../../i18n/LocaleLink';
import { Button, Container, buttonClassName } from '../../design-system';
import { useWizardStore } from '../../store/useWizardStore';
import heroPeptides from '../../assets/hero_peptides.webp';
import { assetUrl } from '../../lib/assetUrl';

const heroPeptidesSrc = assetUrl(heroPeptides);

const trustPillMeta = [
  { icon: ShieldCheck, valueKey: 'hero.trustPurityValue', labelKey: 'hero.trustPurity', subKey: 'hero.trustPuritySub' },
  { icon: Truck, valueKey: 'hero.trustShippingValue', labelKey: 'hero.trustShipping', subKey: 'hero.trustShippingSub' },
  { icon: FileText, valueKey: 'hero.trustCoaValue', labelKey: 'hero.trustCoa', subKey: 'hero.trustCoaSub' },
] as const;

type HeroShortcut = { label: string; q: string };

export function HeroSection() {
  const { t } = useTranslation('home');
  const openWizard = useWizardStore((s) => s.openWizard);
  usePreloadImage(heroPeptidesSrc);

  const shortcuts = useMemo(() => {
    const raw = t('hero.shortcuts', { returnObjects: true });
    return Array.isArray(raw) ? (raw as HeroShortcut[]) : [];
  }, [t]);

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200/80">
      <div className="absolute inset-0 bg-scientific-grid opacity-50 pointer-events-none" aria-hidden />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-50/80 to-transparent pointer-events-none" aria-hidden />

      <Container className="relative z-10 pt-10 pb-14 md:pt-14 md:pb-18 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[min(72vh,720px)]">
          <div className="relative z-30 lg:col-span-6 xl:col-span-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/90 px-3 py-1 mb-5 text-xs text-slate-700 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[11px] font-medium tracking-tight text-slate-600">
                  {t('hero.liveBadge')}
                </span>
              </div>

              <h1 className="text-display font-bold text-navy-950 leading-[1.08] tracking-tight mb-5">
                <span className="block text-[clamp(2.25rem,4.5vw,3.75rem)]">{t('hero.title')}</span>
                <span className="block text-[clamp(2.25rem,4.5vw,3.75rem)] text-brand-600 mt-1">
                  {t('hero.titleHighlight')}
                </span>
              </h1>

              <p className="text-steel-600 text-base md:text-lg leading-relaxed max-w-xl mb-6 font-sans">
                {t('hero.subtitle')}
              </p>

              {shortcuts.length > 0 ? (
                <div className="mb-7">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                    {t('hero.quickAccess')}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {shortcuts.map((item) => (
                      <LocaleLink
                        key={`${item.q}-${item.label}`}
                        to={`/search?q=${item.q}`}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100/90 text-slate-700 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200/80 transition-colors"
                      >
                        {item.label}
                      </LocaleLink>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="relative z-30 flex flex-wrap items-center gap-3 mb-8">
                <LocaleLink
                  to="/shop"
                  className={buttonClassName({ size: 'lg', className: 'gap-2 relative z-30' })}
                >
                  {t('hero.ctaShop')}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </LocaleLink>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={openWizard}
                  className="gap-2 border-slate-200 text-navy-950 hover:bg-slate-50 relative z-30"
                >
                  <Sparkles className="h-4 w-4 text-brand-600" aria-hidden />
                  {t('hero.ctaWizard')}
                </Button>
                <LocaleLink
                  to="/coas"
                  className="relative z-30 text-xs font-semibold uppercase tracking-wider text-brand-600 hover:text-brand-700 transition-colors ml-0 sm:ml-2 py-2"
                >
                  {t('hero.ctaCoa')}
                </LocaleLink>
              </div>

              <ul className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {trustPillMeta.map(({ icon: Icon, valueKey, labelKey, subKey }, i) => (
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
                        {t(valueKey)}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700 leading-tight">{t(labelKey)}</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">{t(subKey)}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="relative z-10 lg:col-span-6 xl:col-span-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-elevated">
                <img
                  src={heroPeptidesSrc}
                  alt={t('hero.imageAlt')}
                  width={960}
                  height={640}
                  className="w-full aspect-[4/3] sm:aspect-[16/11] object-cover object-[center_35%]"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />

                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/95 backdrop-blur-sm border border-slate-200/80 px-2.5 py-1 text-[11px] font-mono font-medium text-slate-700 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {t('hero.gradeBadge')}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-navy-950/85 via-navy-950/40 to-transparent">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-300 mb-0.5">
                        {t('hero.visualBrand')}
                      </p>
                      <p className="text-white text-xs sm:text-sm font-medium leading-snug">
                        {t('hero.visualCaption')}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-md bg-white/95 border border-slate-200 px-2.5 py-1 text-[10px] font-mono font-bold text-navy-950 shadow-sm">
                      {t('hero.marketBadge')}
                    </span>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                aria-hidden
                className="pointer-events-none hidden sm:block absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 w-72 sm:w-80 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 shadow-elevated z-10"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {t('hero.telemetryTitle')}
                  </span>
                  <span className="font-mono text-[10px] text-brand-600 font-semibold bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100">
                    {t('hero.telemetryBatch')}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center text-slate-600 gap-3">
                    <span className="font-sans text-[11px]">{t('hero.telemetryCompound')}</span>
                    <span className="font-mono font-semibold text-navy-950 text-right">
                      {t('hero.telemetryCompoundValue')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 gap-3">
                    <span className="font-sans text-[11px]">{t('hero.telemetryPurity')}</span>
                    <span className="font-mono font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" aria-hidden /> {t('hero.telemetryPurityValue')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 gap-3">
                    <span className="font-sans text-[11px]">{t('hero.telemetryAnalysis')}</span>
                    <span className="font-mono text-[11px] text-slate-700 text-right">
                      {t('hero.telemetryAnalysisValue')}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mb-0.5 gap-2">
                    <span>{t('hero.telemetryChrom')}</span>
                    <span className="text-emerald-600 font-semibold shrink-0">{t('hero.telemetryPeak')}</span>
                  </div>
                  <svg viewBox="0 0 200 32" className="w-full h-6 text-emerald-600 stroke-current fill-none" aria-hidden>
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
