import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Beaker, Dna, Layers, Pill, TestTube2 } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../supabase';
import { Container, Section, PageShell } from '../design-system';
import { CatalogPageHeader } from '../components/catalog/CatalogPageHeader';
import { CatalogTrustBar } from '../components/catalog/CatalogTrustBar';
import { LocaleLink } from '../i18n/LocaleLink';
import { cn } from '../lib/utils';

type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

const icons = [Dna, Beaker, TestTube2, Layers, Pill];

export default function Categories() {
  const { t } = useTranslation('categories');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const { data } = await supabase.from('categories').select('*').order('name');
        if (data) setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageShell tone="parchment">
      <CatalogPageHeader
        eyebrow={t('header.eyebrow')}
        title={
          <>
            {t('header.title')}{' '}
            <span className="text-brand-400">{t('header.titleHighlight')}</span>
          </>
        }
        description={t('header.description')}
      />
      <CatalogTrustBar />

      <Section size="lg" tone="mist">
        <Container>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 rounded-3xl bg-white animate-pulse border border-brand-50" />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-16 rounded-3xl bg-white border border-brand-100 shadow-card">
              <p className="text-steel-600">{t('empty')}</p>
              <LocaleLink to="/shop" className="inline-block mt-4 text-brand-600 font-semibold text-sm">
                {t('browseShop')} →
              </LocaleLink>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <LocaleLink
                      to={`/search?category=${category.slug}`}
                      className={cn(
                        'group flex flex-col h-full p-8 rounded-3xl bg-white border border-brand-100',
                        'shadow-card hover:shadow-elevated hover:border-brand-300 transition-all duration-300',
                        'hover:-translate-y-1',
                      )}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-500 transition-colors">
                        <Icon className="h-6 w-6 text-brand-600 group-hover:text-white" aria-hidden />
                      </div>
                      <h2 className="font-display font-bold text-xl text-navy-950 group-hover:text-brand-600 transition-colors mb-2">
                        {category.name}
                      </h2>
                      {category.description ? (
                        <p className="text-sm text-steel-600 leading-relaxed flex-1">{category.description}</p>
                      ) : (
                        <p className="text-sm text-silver-400 flex-1">{t('fallbackDescription')}</p>
                      )}
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                        {t('viewProducts')}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </LocaleLink>
                  </motion.div>
                );
              })}
            </div>
          )}
        </Container>
      </Section>
    </PageShell>
  );
}
