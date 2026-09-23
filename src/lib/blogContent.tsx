'use client';

import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LocaleLink } from '../i18n/LocaleLink';
import { SITE_URL } from '../config/brand';
import { toCanonicalPath } from '../i18n/routeSlugs';
import { cn } from './utils';

export { blogExcerpt, estimateReadMinutes } from './blogExcerpt';

type BlogContentProps = {
  content: string;
};

const SITE_ORIGIN = SITE_URL.replace(/\/+$/, '');

/** Map absolute site URLs / pretty aliases to LocaleLink canonical paths. */
function toInternalHref(href: string | undefined): string | null {
  if (!href) return null;
  try {
    if (href.startsWith('/') && !href.startsWith('//')) {
      return toCanonicalPath(href);
    }
    const url = new URL(href, SITE_ORIGIN);
    if (url.origin !== new URL(SITE_ORIGIN).origin) return null;
    return toCanonicalPath(url.pathname || '/');
  } catch {
    return null;
  }
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="text-xl md:text-2xl font-display font-semibold text-navy-950 mb-4 mt-10 first:mt-0 leading-tight relative md:pl-6">
      <span
        className="hidden md:block absolute left-0 top-1 bottom-1 w-1 rounded-full bg-gradient-to-b from-brand-500 via-brand-500 to-brand-300"
        aria-hidden
      />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-display font-semibold text-navy-950 mb-3 mt-8 leading-snug">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-steel-600 text-base leading-[1.75] font-sans mb-4 last:mb-0">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-navy-950">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-steel-700">{children}</em>,
  ul: ({ children }) => (
    <ul className="my-4 space-y-2 list-disc pl-5 text-steel-600 marker:text-brand-500">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 space-y-2 list-decimal pl-5 text-steel-600 marker:text-brand-600 marker:font-semibold">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-base leading-[1.75] font-sans pl-1">{children}</li>
  ),
  a: ({ href, children }) => {
    const internal = toInternalHref(href);
    const className =
      'font-semibold text-brand-600 underline decoration-brand-500/30 underline-offset-2 hover:text-brand-700 hover:decoration-brand-600 transition-colors';

    if (internal) {
      return (
        <LocaleLink to={internal} className={className}>
          {children}
        </LocaleLink>
      );
    }

    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-left text-sm text-steel-600">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-mist-50 text-navy-950 font-semibold">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 border-b border-slate-200">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 border-b border-slate-100 align-top">{children}</td>
  ),
  hr: () => <hr className="my-8 border-slate-200" />,
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-brand-500/40 pl-4 text-steel-600 italic">
      {children}
    </blockquote>
  ),
};

/** Renders blog body markdown (headings, links, lists, tables, emphasis). */
export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className={cn('blog-prose max-w-none')}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
