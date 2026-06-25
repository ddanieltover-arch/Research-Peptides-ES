import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../../i18n/LocaleLink';
import { ArrowRight, Beaker, Dna, Layers, Pill, TestTube2 } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase, isSupabaseConfigured } from '../../supabase';
import { Container, Section } from '../../design-system';
import { SectionHeading } from './SectionHeading';

type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

const iconPool = [Dna, Beaker, TestTube2, Layers, Pill];

export function CategoryShowcaseSection() {
  const { t } = useTranslation('home');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    void (async () => {
      const { data } = await supabase.from('categories').select('id, name, slug, description').limit(8);
      if (data) setCategories(data);
      setLoading(false);
    })();
  }, []);

  return (
    <Section size="lg" tone="dark" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-scientific-grid opacity-20 pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent" aria-hidden />
      <Container className="relative z-10">
        <SectionHeading
          eyebrow={t('categories.eyebrow')}
          title={t('categories.title')}
          description={t('featured.subtitle')}
          light
          className="mb-12"
        />

        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-44 w-56 shrink-0 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
            {categories.map((cat, i) => {
              const Icon = iconPool[i % iconPool.length];
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="snap-start shrink-0 w-56 md:w-64"
                >
                  <LocaleLink
                    to={`/shop?category=${cat.slug}`}
                    className="group block h-full rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-accent-500/40 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-500/30 flex items-center justify-center mb-4 group-hover:bg-accent-500/30 transition-colors">
                      <Icon className="h-5 w-5 text-accent-400" aria-hidden />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-accent-400 transition-colors">
                      {cat.name}
                    </h3>
                    {cat.description ? (
                      <p className="text-xs text-silver-400 line-clamp-2 font-sans">{cat.description}</p>
                    ) : null}
                    <ArrowRight className="h-4 w-4 text-accent-500 mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </LocaleLink>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-10 text-center">
          <LocaleLink
            to="/categories"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent-400 hover:text-accent-300 transition-colors font-sans"
          >
            {t('categories.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </LocaleLink>
        </div>
      </Container>
    </Section>
  );
}
