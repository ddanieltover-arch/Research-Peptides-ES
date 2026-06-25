import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../../i18n/LocaleLink';
import scientistLab from '../../assets/scientist_lab.png';
import { Container, Section, Card } from '../../design-system';
import { SectionHeading } from './SectionHeading';

export function CustomerExperienceSection() {
  const { t } = useTranslation('home');
  const testimonials = t('experience.testimonials', { returnObjects: true }) as Array<{
    quote: string;
    author: string;
    role: string;
  }>;

  return (
    <Section size="lg" tone="mist" className="border-y border-brand-100/60">
      <Container>
        <SectionHeading
          eyebrow={t('experience.eyebrow')}
          title={t('experience.title')}
          description={t('experience.description')}
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[280px] border border-brand-100 shadow-elevated"
          >
            <img
              src={scientistLab}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-white/90 text-sm font-medium leading-relaxed mb-4">
                {t('experience.communityBlurb')}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-warning fill-warning" aria-hidden />
                  ))}
                </div>
                <span className="text-xs font-semibold text-brand-200 uppercase tracking-wider">
                  {t('experience.satisfaction')}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid gap-4">
            {testimonials.map((item, i) => (
              <motion.div
                key={item.author}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="trust" className="relative pl-12">
                  <Quote
                    className="absolute left-5 top-5 h-6 w-6 text-brand-200"
                    aria-hidden
                  />
                  <p className="text-steel-600 text-sm leading-relaxed mb-4 italic">&ldquo;{item.quote}&rdquo;</p>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-semibold text-navy-950 text-sm">{item.author}</p>
                      <p className="text-xs text-silver-400">{item.role}</p>
                    </div>
                    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 text-warning fill-warning" aria-hidden />
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-center mt-10">
          <LocaleLink to="/faq" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            {t('experience.faqCta')} →
          </LocaleLink>
        </p>
      </Container>
    </Section>
  );
}
