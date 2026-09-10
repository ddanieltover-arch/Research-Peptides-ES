import { Activity, Award, FlaskConical, Microscope } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Container, Section } from '../../design-system';
import { SectionHeading } from './SectionHeading';

const pillarIcons = [FlaskConical, Microscope, Activity, Award] as const;

export function WhyEuSection() {
  const { t } = useTranslation('home');
  const pillars = t('whyEu.pillars', { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <Section size="lg" tone="light" className="relative overflow-hidden bg-white border-b border-slate-200/80">
      <div className="absolute inset-0 bg-scientific-grid opacity-40 pointer-events-none" aria-hidden />
      <Container className="relative z-10">
        <SectionHeading
          eyebrow={t('whyEu.eyebrow')}
          title={
            <>
              {t('whyEu.title')}{' '}
              <span className="text-brand-600">{t('whyEu.titleHighlight')}</span>
            </>
          }
          description={t('whyEu.description')}
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {pillars.map((item, index) => {
            const Icon = pillarIcons[index] ?? FlaskConical;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-5 md:p-6 shadow-card hover:bg-white hover:border-slate-300 hover:shadow-elevated transition-all duration-200 flex flex-col h-full"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200/90 flex items-center justify-center mb-4 shadow-sm shrink-0 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-sans text-base font-bold text-navy-950 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-steel-600 leading-relaxed font-sans">{item.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
