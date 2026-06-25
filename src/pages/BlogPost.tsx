import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabase';
import { LocaleLink } from '../i18n/LocaleLink';
import { BookOpen, ArrowLeft, Clock, Share2, Tag, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_NAME } from '../config/brand';
import { usePageSeo } from '../seo/SeoProvider';

export default function BlogPost() {
  const { t } = useTranslation('blog');
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single();
        if (data) setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  usePageSeo(post ? {
    title: `${post.title} | ${BRAND_NAME} ${t('titleSuffix')}`,
    description: post.content.substring(0, 150) + '...',
    canonicalPath: `/blog/${post.id}`,
    ogType: 'article',
    ogImage: post.image_url,
    jsonLd: [{
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "image": post.image_url ? [post.image_url] : [],
      "datePublished": post.created_at,
      "dateModified": post.updated_at || post.created_at,
      "author": {
        "@type": "Organization",
        "name": t('editorialBoard')
      }
    }]
  } : null);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 space-y-8 animate-pulse">
        <div className="h-4 w-32 bg-gray-100 rounded-full" />
        <div className="h-20 bg-gray-100 rounded-2xl w-full" />
        <div className="h-96 bg-gray-100 rounded-[3rem] w-full" />
        <div className="space-y-4">
           <div className="h-4 bg-gray-100 rounded w-full" />
           <div className="h-4 bg-gray-100 rounded w-full" />
           <div className="h-4 bg-gray-100 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
        <div className="text-center bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100">
          <BookOpen className="h-16 w-16 text-gray-200 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-gray-900 mb-4">{t('notFoundTitle')}</h2>
          <p className="text-gray-400 font-medium mb-8">{t('notFoundBody')}</p>
          <LocaleLink to="/blog" className="inline-flex items-center gap-2 text-brand-600 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
            <ArrowLeft className="h-3 w-3" /> {t('returnToArchives')}
          </LocaleLink>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white min-h-screen pb-32">
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <LocaleLink to="/blog" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-600 transition-colors mb-12">
          <ArrowLeft className="h-3 w-3" /> {t('backToArchives')}
        </LocaleLink>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-wrap items-center gap-6 mb-8 text-[10px] font-black uppercase tracking-widest text-brand-600">
             <span className="flex items-center gap-2 px-4 py-1.5 bg-brand-50 rounded-full"><Tag className="h-3 w-3" /> {t('insightTag')}</span>
             <span className="flex items-center gap-2 text-gray-400"><Calendar className="h-3 w-3" /> {new Date(post.created_at).toLocaleDateString()}</span>
             <span className="flex items-center gap-2 text-gray-400"><Clock className="h-3 w-3" /> {t('minRead', { count: 5 })}</span>
          </div>
          
          <h1 className="mb-10 text-gray-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pb-12 border-b border-gray-100">
             <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-900 p-0.5">
                   <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-black text-xs text-brand-600">RP</div>
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t('authoredBy')}</p>
                   <p className="text-sm font-black text-gray-900">{t('editorialBoard')}</p>
                </div>
             </div>
             <button type="button" className="p-4 rounded-2xl bg-gray-50 text-gray-400 hover:text-brand-600 hover:bg-brand-50 transition-all" aria-label="Share">
                <Share2 className="h-5 w-5" />
             </button>
          </div>
        </motion.div>
      </header>

      {post.image_url && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 mb-16"
        >
          <img src={post.image_url} alt={post.title} className="w-full rounded-[3rem] shadow-2xl object-cover max-h-[600px]" />
        </motion.div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-lg prose-gray">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-medium">
          {post.content}
        </div>
      </div>
    </article>
  );
}
