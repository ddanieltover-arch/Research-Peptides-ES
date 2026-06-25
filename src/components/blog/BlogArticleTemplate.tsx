import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Check,
  FlaskConical,
  Share2,
  Tag,
} from 'lucide-react';
import { motion } from 'motion/react';
import { LocaleLink } from '../../i18n/LocaleLink';
import { BRAND_NAME } from '../../config/brand';
import { formatLocaleDate } from '../../lib/formatLocaleDate';
import { blogExcerpt, BlogContent, estimateReadMinutes } from '../../lib/blogContent';
import { pageEnterTransition } from '../../design-system/motion';
import { Container, GlassPanel, PageShell } from '../../design-system';
import { LocaleButton } from '../../i18n/LocaleButton';
import { BlogPostCover } from './BlogPostCover';
import { cn } from '../../lib/utils';

export type BlogPostRecord = {
  id: string;
  title: string;
  content: string;
  image_url?: string | null;
  created_at: string;
};

type BlogArticleTemplateProps = {
  post: BlogPostRecord;
  related?: BlogPostRecord[];
};

const RESOURCE_LINKS = [
  { to: '/shop', labelKey: 'resourceShop', icon: FlaskConical },
  { to: '/coas', labelKey: 'resourceCoa', icon: BookOpen },
  { to: '/peptide-calculator', labelKey: 'resourceCalculator', icon: Clock },
] as const;

export function BlogArticleTemplate({ post, related = [] }: BlogArticleTemplateProps) {
  const { t, i18n } = useTranslation('blog');
  const [copied, setCopied] = useState(false);
  const readMinutes = estimateReadMinutes(post.content);
  const published = formatLocaleDate(post.created_at, i18n.language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled share */
    }
  };

  return (
    <PageShell tone="parchment" className="pb-20 md:pb-28">
      {/* Hero band */}
      <div className="relative border-b border-brand-100/80 bg-gradient-parchment overflow-hidden">
        <div className="absolute inset-0 bg-scientific-grid opacity-25 pointer-events-none" aria-hidden />
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"
          aria-hidden
        />
        <Container className="relative z-10 pt-10 pb-8 md:pt-14 md:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={pageEnterTransition()}
          >
            <LocaleLink
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-steel-600 hover:text-brand-600 transition-colors mb-8"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              {t('backToArchives')}
            </LocaleLink>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-[10px] font-bold uppercase tracking-widest border border-brand-100">
                <Tag className="h-3 w-3" aria-hidden />
                {t('tagResearch')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 text-steel-600 text-[10px] font-semibold uppercase tracking-wider border border-brand-100/80">
                <Calendar className="h-3 w-3" aria-hidden />
                {published}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 text-steel-600 text-[10px] font-semibold uppercase tracking-wider border border-brand-100/80">
                <Clock className="h-3 w-3" aria-hidden />
                {t('minRead', { count: readMinutes })}
              </span>
            </div>

            <h1 className="text-h1 font-display font-semibold text-navy-950 leading-[1.08] max-w-4xl">
              {post.title}
            </h1>

            <p className="mt-4 text-steel-600 text-base md:text-lg leading-relaxed max-w-2xl font-sans">
              {blogExcerpt(post.content, 200)}
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Cover image */}
      <Container className="relative z-10 -mt-6 md:-mt-8 mb-10 md:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...pageEnterTransition(), delay: 0.08 }}
          className="relative rounded-[1.75rem] md:rounded-[2rem] overflow-hidden border border-brand-100/90 bg-white shadow-elevated"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="aspect-[21/9] md:aspect-[2.4/1] max-h-[420px]">
            <BlogPostCover
              imageUrl={post.image_url}
              title={post.title}
              imgClassName="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </Container>

      {/* Article + sidebar */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...pageEnterTransition(), delay: 0.12 }}
            className="lg:col-span-8"
          >
            <GlassPanel variant="parchment" padding="lg" className="shadow-card">
              <BlogContent content={post.content} />
            </GlassPanel>

            <div className="mt-8 flex flex-wrap gap-3">
              <LocaleButton to="/blog" variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t('returnToArchives')}
              </LocaleButton>
              <LocaleButton to="/shop" size="sm" className="gap-2">
                {t('resourceShop')}
                <ArrowRight className="h-4 w-4" />
              </LocaleButton>
            </div>
          </motion.article>

          <aside className="lg:col-span-4 space-y-5">
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...pageEnterTransition(), delay: 0.16 }}
              className="lg:sticky lg:top-28 space-y-5"
            >
              <GlassPanel variant="light" padding="md" className="shadow-card">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-14 w-14 rounded-2xl bg-brand-500 flex items-center justify-center shadow-card shrink-0">
                    <span className="font-display font-bold text-accent-400 text-lg">RP</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-silver-400">
                      {t('authoredBy')}
                    </p>
                    <p className="text-sm font-semibold text-navy-950 leading-snug">{t('editorialBoard')}</p>
                  </div>
                </div>
                <p className="text-xs text-steel-600 leading-relaxed mb-5">{t('sidebarNote')}</p>
                <button
                  type="button"
                  onClick={() => void handleShare()}
                  className={cn(
                    'w-full inline-flex items-center justify-center gap-2 h-11 rounded-full text-sm font-semibold border transition-colors',
                    copied
                      ? 'border-success/30 bg-success/10 text-success'
                      : 'border-brand-200 text-brand-700 hover:bg-brand-50',
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      {t('linkCopied')}
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4" />
                      {t('shareArticle')}
                    </>
                  )}
                </button>
              </GlassPanel>

              <GlassPanel variant="light" padding="md" className="shadow-card">
                <p className="text-eyebrow-accent text-brand-600 before:bg-brand-500 mb-4 text-[0.65rem]">
                  {t('resourcesEyebrow')}
                </p>
                <ul className="space-y-2">
                  {RESOURCE_LINKS.map(({ to, labelKey, icon: Icon }) => (
                    <li key={to}>
                      <LocaleLink
                        to={to}
                        className="flex items-center gap-3 p-3 rounded-xl text-sm font-semibold text-steel-600 hover:bg-brand-50 hover:text-brand-700 transition-colors group"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        {t(labelKey)}
                        <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-500" />
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
              </GlassPanel>

              <GlassPanel variant="light" padding="md" className="bg-navy-950 text-white border-navy-900 shadow-elevated">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-400 mb-2">
                  {BRAND_NAME}
                </p>
                <p className="text-sm text-silver-400 leading-relaxed mb-4">{t('disclaimer')}</p>
                <LocaleButton to="/shop" variant="gold" size="sm" fullWidth className="gap-2">
                  {t('resourceShop')}
                  <ArrowRight className="h-4 w-4" />
                </LocaleButton>
              </GlassPanel>
            </motion.div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16 md:mt-20 pt-12 border-t border-brand-100/80">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="text-h2 font-display font-semibold text-navy-950">{t('relatedPosts')}</h2>
              <LocaleLink
                to="/blog"
                className="text-sm font-semibold text-brand-600 hover:text-brand-700 shrink-0"
              >
                {t('viewAllPosts')} →
              </LocaleLink>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item, idx) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-24px' }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <LocaleLink to={`/blog/${item.id}`} className="group block h-full">
                    <div className="rounded-[1.25rem] overflow-hidden border border-brand-100/80 bg-white shadow-card mb-4 aspect-[16/10]">
                      <BlogPostCover
                        imageUrl={item.image_url}
                        title={item.title}
                        imgClassName="group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-display font-semibold text-navy-950 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-steel-600 mt-2 line-clamp-2">{blogExcerpt(item.content, 100)}</p>
                  </LocaleLink>
                </motion.article>
              ))}
            </div>
          </section>
        )}
      </Container>
    </PageShell>
  );
}

export function BlogArticleSkeleton() {
  return (
    <PageShell tone="parchment" className="pb-20">
      <Container className="py-12 space-y-8 animate-pulse">
        <div className="h-4 w-36 rounded-full skeleton-shimmer" />
        <div className="h-14 w-full max-w-3xl rounded-2xl skeleton-shimmer" />
        <div className="h-4 w-2/3 max-w-xl rounded-lg skeleton-shimmer" />
        <div className="aspect-[21/9] rounded-[2rem] skeleton-shimmer" />
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 h-96 rounded-[1.75rem] skeleton-shimmer" />
          <div className="lg:col-span-4 h-64 rounded-[1.75rem] skeleton-shimmer" />
        </div>
      </Container>
    </PageShell>
  );
}
