import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../../i18n/LocaleLink';
import { Button, Container, Section, buttonClassName } from '../../design-system';
import { useWizardStore } from '../../store/useWizardStore';

export function CtaSection() {
  const { t } = useTranslation('home');
  const openWizard = useWizardStore((s) => s.openWizard);

  return (
    <Section size="md" tone="dark" className="relative overflow-hidden bg-navy-950 border-t border-slate-800">
      <div className="absolute inset-0 bg-scientific-grid-dark opacity-30 pointer-events-none" aria-hidden />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" aria-hidden />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center py-6"
        >
          <p className="text-eyebrow-accent text-brand-400 before:bg-brand-500 justify-center mb-4">
            {t('cta.eyebrow')}
          </p>
          <h2 className="text-display font-bold text-white mb-4 leading-tight">{t('cta.title')}</h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed font-sans">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <LocaleLink
              to="/shop"
              className={buttonClassName({ size: 'lg', className: 'gap-2 min-w-[200px]' })}
            >
              {t('cta.button')}
              <ArrowRight className="h-4 w-4" />
            </LocaleLink>
            <Button
              variant="outline"
              size="lg"
              onClick={openWizard}
              className="gap-2 min-w-[200px] border-slate-700 bg-white/5 text-white hover:bg-white/10 hover:border-slate-500"
            >
              <Sparkles className="h-4 w-4 text-brand-400" />
              {t('cta.buttonWizard')}
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
