'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabase';
import { LocaleLink } from '../i18n/LocaleLink';
import { BookOpen, Sparkles, ArrowRight, Clock, User } from 'lucide-react';
import { motion } from 'motion/react';
import { BlogPostCover } from '../components/blog/BlogPostCover';
import { blogExcerpt } from '../lib/blogContent';
import { usePageSeo } from '../seo/SeoProvider';
import { Container, PageShell } from '../design-system';

export default function Blog() {
  usePageSeo({ canonicalPath: '/blog' });
  const { t } = useTranslation('blog');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
        if (data) setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <PageShell tone="mist">
      <section className="bg-white border-b border-slate-200/80 pt-16 pb-14 md:pt-20 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-scientific-grid opacity-30 pointer-events-none" aria-hidden />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-5"
            >
              <Sparkles className="h-4 w-4 text-brand-600" aria-hidden />
              <span className="text-eyebrow-accent text-brand-600 before:bg-brand-500">{t('eyebrow')}</span>
            </motion.div>
            <h1 className="text-display font-bold text-navy-950 mb-5">
              {t('title')}{' '}
              <span className="text-brand-600">{t('titleHighlight')}</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
              {t('subtitle')}
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-14 md:py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[16/10] bg-slate-100 rounded-xl skeleton-shimmer" />
                <div className="h-7 bg-slate-100 rounded-lg w-3/4 skeleton-shimmer" />
                <div className="h-4 bg-slate-100 rounded-md w-1/2 skeleton-shimmer" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-xl border border-slate-200 shadow-card">
            <BookOpen className="mx-auto h-14 w-14 text-slate-200 mb-5" aria-hidden />
            <h3 className="text-xl font-semibold text-navy-950 mb-2">{t('emptyTitle')}</h3>
            <p className="text-slate-500">{t('emptyBody')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
              >
                <LocaleLink
                  to={`/blog/${post.id}`}
                  className="group flex flex-col h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 mb-5 border border-slate-200/80 shadow-card">
                    <BlogPostCover
                      imageUrl={post.image_url}
                      title={post.title}
                      imgClassName="group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
                      <span className="px-3 py-1 bg-white/95 rounded-lg text-[10px] font-bold uppercase tracking-widest text-navy-950 border border-slate-200/80">
                        {t('tagResearch')}
                      </span>
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col">
                    <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" aria-hidden /> {t('readTime')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="h-3 w-3" aria-hidden /> {t('author')}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-navy-950 mb-3 line-clamp-2 leading-snug group-hover:text-brand-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3 flex-grow">
                      {blogExcerpt(post.content)}
                    </p>

                    <span className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-600 group-hover:gap-3 transition-all">
                      {t('exploreArticle')} <ArrowRight className="h-3 w-3" aria-hidden />
                    </span>
                  </div>
                </LocaleLink>
              </motion.article>
            ))}
          </div>
        )}
      </Container>
    </PageShell>
  );
}
