import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { BookText, FlaskConical, TestTube2 } from 'lucide-react';
import { SUPPORT_EMAIL } from '../config/brand';

export default function PeptideInformation() {
  const { t } = useTranslation('research');
  const articles = t('information.articles', { returnObjects: true }) as Array<{
    title: string;
    readTime: string;
    summary: string;
  }>;

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <BookText className="h-4 w-4" />
            {t('information.eyebrow')}
          </div>
          <h1>{t('information.title')}</h1>
          <p className="text-gray-500 mt-4 font-medium italic max-w-3xl mx-auto">
            {t('information.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, idx) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="bg-gray-50 border border-gray-100 rounded-3xl p-7"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-600 mb-2">{article.readTime}</p>
              <h3 className="text-xl font-black tracking-tight mb-3">{article.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{article.summary}</p>
            </motion.article>
          ))}
        </div>

        <section className="mt-10 bg-slate-950 text-white rounded-3xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <FlaskConical className="h-5 w-5 text-brand-400 mb-2" />
            <h4 className="font-black text-sm uppercase tracking-widest mb-1">{t('information.cards.scopeTitle')}</h4>
            <p className="text-sm text-gray-300">{t('information.cards.scopeBody')}</p>
          </div>
          <div>
            <TestTube2 className="h-5 w-5 text-brand-400 mb-2" />
            <h4 className="font-black text-sm uppercase tracking-widest mb-1">{t('information.cards.methodTitle')}</h4>
            <p className="text-sm text-gray-300">{t('information.cards.methodBody')}</p>
          </div>
          <div>
            <BookText className="h-5 w-5 text-brand-400 mb-2" />
            <h4 className="font-black text-sm uppercase tracking-widest mb-1">{t('information.cards.supportTitle')}</h4>
            <p className="text-sm text-gray-300">{t('information.cards.supportBody')} {SUPPORT_EMAIL}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
