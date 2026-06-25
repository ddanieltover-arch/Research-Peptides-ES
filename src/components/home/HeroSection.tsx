import { useTranslation } from 'react-i18next';
import { usePreloadImage } from '../../hooks/usePreloadImage';
import { ArrowRight, FlaskConical, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { LocaleLink } from '../../i18n/LocaleLink';
import { Button, Container } from '../../design-system';
import { useWizardStore } from '../../store/useWizardStore';
import vialsHero from '../../assets/vials_hero.png';

const stats = [
  { value: '99.8%', labelKey: 'hero.trustPurity' },
  { value: 'EU', labelKey: 'hero.trustShipping' },
  { value: 'COA', labelKey: 'hero.trustCoa' },
] as const;

export function HeroSection() {
  const { t } = useTranslation('home');
  const openWizard = useWizardStore((s) => s.openWizard);
  usePreloadImage(vialsHero);

  return (
    <section className="relative overflow-hidden bg-navy-950 min-h-[min(92vh,920px)] flex flex-col">
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
      <div className="absolute inset-0 bg-scientific-grid opacity-40" aria-hidden />
      <div className="absolute inset-0 diagonal-gold-rule opacity-60" aria-hidden />
      <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-glow pointer-events-none" aria-hidden />

      <Container className="relative z-10 flex-1 flex flex-col justify-center py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          <div className="lg:col-span-7 xl:col-span-6">
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-eyebrow-accent text-accent-400 before:bg-accent-500 mb-6"
            >
              {t('hero.eyebrow')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="hero-heading text-white mb-6 max-w-2xl"
            >
              {t('hero.title')}{' '}
              <span className="text-gradient-gold italic font-medium">
                {t('hero.titleHighlight')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="text-silver-400 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-sans font-medium"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <LocaleLink to="/shop">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  {t('hero.ctaShop')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </LocaleLink>
              <Button
                variant="gold"
                size="lg"
                onClick={openWizard}
                className="gap-2 w-full sm:w-auto"
              >
                <Sparkles className="h-4 w-4" />
                {t('hero.ctaWizard')}
              </Button>
            </motion.div>
          </div>

          <div className="lg:col-span-5 xl:col-span-6 relative flex justify-center lg:justify-end">
            <motion.div
              className="absolute -inset-8 rounded-full bg-brand-500/20 blur-3xl"
              animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.05, 1] }}
              transition={{ duration: 7, repeat: Infinity }}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative border border-accent-500/25 rounded-[2rem] p-6 md:p-8 bg-white/5 backdrop-blur-sm shadow-glow"
            >
              <img
                src={vialsHero}
                alt=""
                width={480}
                height={480}
                className="w-full max-w-[min(100%,22rem)] md:max-w-md aspect-square object-contain drop-shadow-[0_32px_64px_rgba(169,29,58,0.35)]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="absolute -bottom-3 -left-3 rounded-2xl bg-accent-500 text-navy-950 px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-elevated font-sans">
                EUR · ES
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      <div className="relative z-10 border-t border-accent-500/20 bg-mist-50/95 backdrop-blur-md">
        <Container className="py-6 md:py-8">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {stats.map(({ value, labelKey }, i) => (
              <motion.li
                key={labelKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="flex items-center gap-4"
              >
                <span className="font-display text-3xl md:text-4xl font-semibold text-brand-600 tabular-nums">
                  {value}
                </span>
                <span className="text-sm font-semibold text-steel-600 leading-snug font-sans">
                  {t(labelKey)}
                </span>
              </motion.li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
