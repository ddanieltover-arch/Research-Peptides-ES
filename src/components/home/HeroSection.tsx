import { useTranslation } from 'react-i18next';
import { usePreloadImage } from '../../hooks/usePreloadImage';
import { ArrowRight, FlaskConical, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { LocaleLink } from '../../i18n/LocaleLink';
import { Button, Container } from '../../design-system';
import { useWizardStore } from '../../store/useWizardStore';
import heroPeptides from '../../assets/hero_peptides.png';

const trustPills = [
  { icon: ShieldCheck, value: '99.8%', labelKey: 'hero.trustPurity' },
  { icon: Truck, value: 'EU', labelKey: 'hero.trustShipping' },
  { icon: FlaskConical, value: 'COA', labelKey: 'hero.trustCoa' },
] as const;

export function HeroSection() {
  const { t } = useTranslation('home');
  const openWizard = useWizardStore((s) => s.openWizard);
  usePreloadImage(heroPeptides);

  return (
    <section className="relative overflow-hidden bg-gradient-parchment">
      <div className="absolute inset-0 bg-scientific-molecule opacity-40 pointer-events-none" aria-hidden />
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-accent-500 to-brand-600"
        aria-hidden
      />

      <Container className="relative z-10 pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[min(78vh,780px)]">
          {/* Copy column */}
          <div className="lg:col-span-6 xl:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-eyebrow-accent text-brand-600 before:bg-accent-500 mb-6">
                {t('hero.eyebrow')}
              </p>

              <h1 className="font-display font-semibold text-navy-950 leading-[1.02] tracking-tight mb-6">
                <span className="block text-[clamp(2.5rem,5.5vw,4.25rem)]">
                  {t('hero.title')}
                </span>
                <span className="block text-[clamp(2.75rem,6vw,4.75rem)] text-brand-600 italic mt-1">
                  {t('hero.titleHighlight')}
                </span>
              </h1>

              <p className="text-steel-600 text-base md:text-lg leading-relaxed max-w-lg mb-8 font-sans">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-row flex-wrap items-center gap-3 mb-10">
                <LocaleLink to="/shop">
                  <Button size="lg" className="w-auto gap-2">
                    {t('hero.ctaShop')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </LocaleLink>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={openWizard}
                  className="gap-2 w-auto border-navy-950/15 text-navy-950 hover:bg-white"
                >
                  <Sparkles className="h-4 w-4 text-brand-600" />
                  {t('hero.ctaWizard')}
                </Button>
              </div>

              <ul className="grid grid-cols-3 gap-2 sm:gap-3">
                {trustPills.map(({ icon: Icon, value, labelKey }, i) => (
                  <motion.li
                    key={labelKey}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.07 }}
                    className="flex items-center gap-2 sm:gap-3 min-w-0 rounded-full border border-brand-100/90 bg-white/80 backdrop-blur-sm px-2.5 sm:px-4 py-2 sm:py-2.5 shadow-card"
                  >
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                    </span>
                    <span className="text-left min-w-0">
                      <span className="block font-display text-base sm:text-lg font-semibold text-navy-950 leading-none tabular-nums">
                        {value}
                      </span>
                      <span className="block text-[9px] sm:text-[11px] font-semibold text-steel-600 leading-tight mt-0.5 line-clamp-2">
                        {t(labelKey)}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Visual column — offset editorial frame */}
          <div className="lg:col-span-6 xl:col-span-7 order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative mx-auto lg:mr-0 max-w-lg lg:max-w-none"
            >
              <div
                className="absolute -top-6 -right-4 lg:-right-8 w-[42%] h-[88%] rounded-[2rem] bg-brand-600/90 hidden sm:block"
                aria-hidden
              />
              <div
                className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full border border-accent-500/40 bg-accent-500/10"
                aria-hidden
              />

              <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-brand-100/80 bg-white shadow-elevated">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50/40 via-transparent to-accent-500/10 pointer-events-none" />
                <img
                  src={heroPeptides}
                  alt=""
                  width={960}
                  height={640}
                  className="w-full aspect-[4/5] sm:aspect-[5/6] object-cover object-[center_35%]"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-navy-950/75 via-navy-950/35 to-transparent">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-400 mb-1 font-sans">
                        Research Peptides ES
                      </p>
                      <p className="text-white/90 text-sm font-medium font-sans max-w-[14rem] leading-snug">
                        {t('hero.trustCoa')}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-accent-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-navy-950 font-sans">
                      EUR · ES
                    </span>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -right-2 top-8 md:top-12 hidden md:flex flex-col gap-2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
                aria-hidden
              >
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className="block h-px w-12 bg-accent-500/50"
                    style={{ width: `${3 - n + 1}rem` }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>

      <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" aria-hidden />
    </section>
  );
}
