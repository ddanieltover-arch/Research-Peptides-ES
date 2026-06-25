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
    <Section size="lg" tone="parchment" className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-glow opacity-50 pointer-events-none" aria-hidden />
      <Container className="relative z-10">
        <SectionHeading
          eyebrow={t('whyEu.eyebrow')}
          title={
            <>
              {t('whyEu.title')}{' '}
              <span className="text-gradient-gold italic">{t('whyEu.titleHighlight')}</span>
            </>
          }
          description={t('whyEu.description')}
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 auto-rows-fr">
          {pillars.map((item, index) => {
            const Icon = pillarIcons[index] ?? FlaskConical;
            const span =
              index === 0
                ? 'md:col-span-7 md:row-span-2'
                : index === 1
                  ? 'md:col-span-5'
                  : index === 2
                    ? 'md:col-span-5'
                    : 'md:col-span-7';

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.07 }}
                className={`bento-card flex flex-col ${span} ${index === 0 ? 'md:min-h-[280px]' : ''}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center mb-5 shadow-elevated">
                  <Icon className="h-6 w-6 text-accent-400" aria-hidden />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-navy-950 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-steel-600 leading-relaxed font-sans mt-auto">{item.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
