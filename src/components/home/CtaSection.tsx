import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../../i18n/LocaleLink';
import { Button, Container, Section } from '../../design-system';
import { useWizardStore } from '../../store/useWizardStore';

export function CtaSection() {
  const { t } = useTranslation('home');
  const openWizard = useWizardStore((s) => s.openWizard);

  return (
    <Section size="md" tone="dark" className="relative overflow-hidden border-t-4 border-accent-500">
      <div className="absolute inset-0 bg-scientific-molecule opacity-30" aria-hidden />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center py-4"
        >
          <p className="text-eyebrow-accent text-accent-400 before:bg-accent-500 justify-center mb-5">
            {t('cta.eyebrow')}
          </p>
          <h2 className="text-h1 text-white font-display mb-5">{t('cta.title')}</h2>
          <p className="text-silver-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <LocaleLink to="/shop">
              <Button size="lg" className="gap-2 min-w-[220px]">
                {t('cta.button')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </LocaleLink>
            <Button variant="gold" size="lg" onClick={openWizard} className="gap-2 min-w-[220px]">
              <Sparkles className="h-4 w-4" />
              {t('cta.buttonWizard')}
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
