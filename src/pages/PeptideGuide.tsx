import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { BookOpen, FlaskConical, ShieldCheck, Beaker } from 'lucide-react';
import { LocaleLink } from '../i18n/LocaleLink';

export default function PeptideGuide() {
  const { t } = useTranslation('research');
  const topics = t('guide.topics', { returnObjects: true }) as Array<{ title: string; summary: string }>;

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <BookOpen className="h-4 w-4" />
            {t('guide.eyebrow')}
          </div>
          <h1>{t('guide.title')}</h1>
          <p className="text-gray-500 mt-4 font-medium italic max-w-3xl mx-auto">
            {t('guide.subtitle')}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-brand-50 border-l-4 border-brand-500 p-6 rounded-r-2xl mb-12 text-left max-w-3xl mx-auto shadow-sm">
          <p className="text-navy-950 font-bold text-lg mb-2">{t('guide.quickTitle')}</p>
          <p className="text-steel-700 font-medium leading-relaxed">
            {t('guide.quickBody')}
          </p>
        </motion.div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {topics.map((topic, idx) => (
            <motion.article
              key={topic.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-gray-50 border border-gray-100 rounded-3xl p-7"
            >
              <h3 className="text-xl font-black tracking-tight mb-3">{topic.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{topic.summary}</p>
            </motion.article>
          ))}
        </section>

        <section className="bg-slate-950 text-white rounded-[2.5rem] p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <FlaskConical className="h-6 w-6 text-brand-400 mb-3" />
              <h4 className="font-black uppercase tracking-wider text-sm mb-2">{t('guide.cards.scopeTitle')}</h4>
              <p className="text-sm text-gray-300">{t('guide.cards.scopeBody')}</p>
            </div>
            <div>
              <ShieldCheck className="h-6 w-6 text-brand-400 mb-3" />
              <h4 className="font-black uppercase tracking-wider text-sm mb-2">{t('guide.cards.complianceTitle')}</h4>
              <p className="text-sm text-gray-300">{t('guide.cards.complianceBody')}</p>
            </div>
            <div>
              <Beaker className="h-6 w-6 text-brand-400 mb-3" />
              <h4 className="font-black uppercase tracking-wider text-sm mb-2">{t('guide.cards.calcTitle')}</h4>
              <LocaleLink to="/peptide-calculator" className="text-sm text-brand-300 hover:text-brand-200 font-bold transition-colors">
                {t('guide.cards.calcLink')}
              </LocaleLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
