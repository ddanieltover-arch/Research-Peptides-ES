import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Microscope, ShieldAlert } from 'lucide-react';

export default function PeptideResearch() {
  const { t } = useTranslation('research');
  const cards = t('hub.cards', { returnObjects: true }) as Array<{
    category: string;
    readTime: string;
    title: string;
    summary: string;
  }>;

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <Microscope className="h-4 w-4" />
            {t('hub.eyebrow')}
          </div>
          <h1>{t('hub.title')}</h1>
          <p className="text-gray-500 mt-4 font-medium italic max-w-3xl mx-auto">
            {t('hub.subtitle')}
          </p>
        </motion.div>

        <section className="bg-amber-50 border border-amber-100 rounded-3xl p-6 mb-8 flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-900 leading-relaxed">
            {t('hub.disclaimer')}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, idx) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="bg-gray-50 border border-gray-100 rounded-3xl p-7"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-600">{card.category}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{card.readTime}</span>
              </div>
              <h3 className="text-xl font-black tracking-tight mb-3">{card.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{card.summary}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
