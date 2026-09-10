import { useMemo } from 'react';
import { BadgeCheck, FileCheck, ShieldCheck, Thermometer, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { LocaleLink } from '../../i18n/LocaleLink';
import { Container, Section, buttonClassName } from '../../design-system';
import { SectionHeading } from './SectionHeading';

const STANDARD_ICONS = [ShieldCheck, FileCheck, Thermometer, BadgeCheck] as const;

type TrustStandard = { title: string; desc: string };

export function TrustQualitySection() {
  const { t } = useTranslation('home');

  const standards = useMemo(() => {
    const raw = t('trust.standards', { returnObjects: true });
    return Array.isArray(raw) ? (raw as TrustStandard[]) : [];
  }, [t]);

  return (
    <Section size="lg" tone="light" className="relative overflow-hidden bg-white border-b border-slate-200/80">
      <div className="absolute inset-0 bg-scientific-grid opacity-35 pointer-events-none" aria-hidden />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={t('trust.eyebrow')}
              title={t('trust.title')}
              description={t('trust.body')}
              className="mb-6"
            />
            <div className="flex items-center gap-3 flex-wrap">
              <LocaleLink
                to="/coas"
                className={buttonClassName({
                  variant: 'primary',
                  size: 'md',
                  className: 'gap-2',
                })}
              >
                <span>{t('trust.coaCta')}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </LocaleLink>
              <LocaleLink
                to="/coa-vs-no-coa"
                className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 hover:text-brand-600 transition-colors py-2 px-3"
              >
                {t('trust.whyCoa')}
              </LocaleLink>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {standards.map((item, i) => {
              const Icon = STANDARD_ICONS[i] ?? ShieldCheck;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-5 shadow-card hover:bg-white hover:border-slate-300 hover:shadow-elevated transition-all duration-200 flex flex-col"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/90 flex items-center justify-center mb-3 shadow-sm text-brand-600">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <h3 className="font-sans text-sm font-bold text-navy-950 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
