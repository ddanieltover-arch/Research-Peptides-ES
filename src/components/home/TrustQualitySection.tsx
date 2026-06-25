import { BadgeCheck, FileCheck, ShieldCheck, Thermometer } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { LocaleLink } from '../../i18n/LocaleLink';
import { Container, Section } from '../../design-system';
import { SectionHeading } from './SectionHeading';

const standardIcons = [ShieldCheck, FileCheck, Thermometer, BadgeCheck] as const;

export function TrustQualitySection() {
  const { t } = useTranslation('home');

  const standards = [
    { title: t('trust.title'), desc: t('trust.eyebrow') },
    { title: 'HPLC / MS', desc: t('hero.trustPurity') },
    { title: 'COA', desc: t('hero.trustCoa') },
    { title: 'EU', desc: t('hero.trustShipping') },
  ];

  return (
    <Section size="lg" tone="light">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <SectionHeading
            eyebrow={t('trust.eyebrow')}
            title={
              <>
                {t('trust.title')}{' '}
                <span className="text-gradient-gold italic">{t('trust.eyebrow')}</span>
              </>
            }
            description={t('whyEu.description')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {standards.map((item, i) => {
              const Icon = standardIcons[i] ?? ShieldCheck;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bento-card"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-brand-600" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-navy-950 mb-2">{item.title}</h3>
                  <p className="text-xs text-steel-600 leading-relaxed font-sans">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 text-center">
          <LocaleLink
            to="/coas"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors font-sans uppercase tracking-wider"
          >
            {t('trust.coaCta')} →
          </LocaleLink>
        </div>
      </Container>
    </Section>
  );
}
