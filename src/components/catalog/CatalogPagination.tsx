import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

export const SHOP_PRODUCTS_PER_PAGE = 30;

type CatalogPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

function visiblePages(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result: (number | 'ellipsis')[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('ellipsis');
    result.push(sorted[i]);
  }

  return result;
}

export function CatalogPagination({
  page,
  totalPages,
  onPageChange,
  className,
}: CatalogPaginationProps) {
  const { t } = useTranslation('shop');

  if (totalPages <= 1) return null;

  const pages = visiblePages(page, totalPages);

  return (
    <nav
      className={cn('flex flex-wrap items-center justify-center gap-2 pt-10', className)}
      aria-label={t('pagination.label')}
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={cn(
          'inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-semibold border transition-colors',
          page <= 1
            ? 'border-brand-100 text-silver-400 cursor-not-allowed'
            : 'border-brand-200 text-brand-700 hover:bg-brand-50',
        )}
        aria-label={t('pagination.previous')}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">{t('pagination.previous')}</span>
      </button>

      <div className="flex items-center gap-1">
        {pages.map((item, index) =>
          item === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="w-10 h-10 flex items-center justify-center text-silver-400 text-sm"
              aria-hidden
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-current={item === page ? 'page' : undefined}
              className={cn(
                'min-w-10 h-10 px-3 rounded-full text-sm font-semibold transition-colors',
                item === page
                  ? 'bg-brand-600 text-white shadow-card'
                  : 'text-steel-600 hover:bg-brand-50 hover:text-brand-700',
              )}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={cn(
          'inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-semibold border transition-colors',
          page >= totalPages
            ? 'border-brand-100 text-silver-400 cursor-not-allowed'
            : 'border-brand-200 text-brand-700 hover:bg-brand-50',
        )}
        aria-label={t('pagination.next')}
      >
        <span className="hidden sm:inline">{t('pagination.next')}</span>
        <ChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </nav>
  );
}
