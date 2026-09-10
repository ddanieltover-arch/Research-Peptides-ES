import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import scientistLab from '../../assets/scientist_lab.webp';
import { assetUrl } from '../../lib/assetUrl';
import { Container, Section } from '../../design-system';
import { SectionHeading } from './SectionHeading';

const scientistLabSrc = assetUrl(scientistLab);

export function CustomerExperienceSection() {
  const { t } = useTranslation('home');
  const testimonials = t('experience.testimonials', { returnObjects: true }) as Array<{
    quote: string;
    author: string;
    role: string;
  }>;

  return (
    <Section size="lg" tone="light" className="bg-slate-50/50 border-b border-slate-200/80">
      <Container>
        <SectionHeading
          eyebrow={t('experience.eyebrow')}
          title={t('experience.title')}
          description={t('experience.description')}
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative rounded-xl overflow-hidden min-h-[300px] border border-slate-200 shadow-card"
          >
            <img
              src={scientistLabSrc}
              alt={t('experience.imageAlt')}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
              <p className="text-white/95 text-xs sm:text-sm font-medium leading-relaxed mb-3">
                {t('experience.communityBlurb')}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden />
                  ))}
                </div>
                <span className="text-[11px] font-mono font-semibold text-slate-300 uppercase tracking-wider">
                  {t('experience.satisfaction')}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid gap-3.5">
            {testimonials.map((item, i) => (
              <motion.div
                key={item.author}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative rounded-xl border border-slate-200/90 bg-white p-5 pl-12 shadow-card hover:border-slate-300 hover:shadow-elevated transition-all duration-200"
              >
                <Quote
                  className="absolute left-4 top-4 h-5 w-5 text-brand-300"
                  aria-hidden
                />
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-3 font-sans">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between gap-4 flex-wrap pt-2 border-t border-slate-100">
                  <div>
                    <p className="font-semibold text-navy-950 text-xs sm:text-sm">{item.author}</p>
                    <p className="text-[11px] font-mono text-slate-400">{item.role}</p>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3 w-3 fill-current" aria-hidden />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
