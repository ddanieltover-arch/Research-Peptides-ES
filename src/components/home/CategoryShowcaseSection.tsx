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
    <Section size="lg" tone="dark" className="relative overflow-hidden bg-navy-950 border-y border-slate-800">
      <div className="absolute inset-0 bg-scientific-grid-dark opacity-30 pointer-events-none" aria-hidden />
      <Container className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-5 border-b border-slate-800">
          <SectionHeading
            eyebrow={t('categories.eyebrow')}
            title={t('categories.title')}
            description={t('featured.subtitle')}
            light
            className="mb-0"
          />
          <LocaleLink
            to="/categories"
            className="shrink-0 inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
          >
            {t('categories.viewAll')}
            <ArrowRight className="h-3.5 w-3.5 text-brand-400" />
          </LocaleLink>
        </div>

        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 w-56 shrink-0 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
            {categories.map((cat, i) => {
              const Icon = iconPool[i % iconPool.length];
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="snap-start shrink-0 w-56 md:w-64"
                >
                  <LocaleLink
                    to={`/search?category=${cat.slug}`}
                    className="group block h-full rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-slate-500 hover:bg-white/[0.07] transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mb-3 text-brand-400 group-hover:text-white group-hover:bg-brand-600 transition-colors">
                      <Icon className="h-4 w-4" aria-hidden />
                    </div>
                    <h3 className="font-sans text-base font-bold text-white mb-1.5 group-hover:text-brand-300 transition-colors">
                      {cat.name}
                    </h3>
                    {cat.description ? (
                      <p className="text-xs text-slate-400 line-clamp-2 font-sans">{cat.description}</p>
                    ) : null}
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                      <span>Ver compuestos</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </LocaleLink>
                </motion.div>
              );
            })}
          </div>
        )}
      </Container>
    </Section>
  );
}
