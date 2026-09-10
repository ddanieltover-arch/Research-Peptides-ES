import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import type { CatalogSortKey } from '../../lib/productSort';
import { cn } from '../../lib/utils';

type SortValue = CatalogSortKey | 'relevance';

type CatalogSortSelectProps = {
  value: SortValue;
  onChange: (value: SortValue) => void;
  includeRelevance?: boolean;
  className?: string;
};

export function CatalogSortSelect({
  value,
  onChange,
  includeRelevance = false,
  className,
}: CatalogSortSelectProps) {
  const { t } = useTranslation('shop');
  return (
    <div className={cn('relative', className)}>
      <label htmlFor="catalog-sort" className="sr-only">
        {t('sort.label')}
      </label>
      <select
        id="catalog-sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortValue)}
        className="appearance-none w-full min-w-[180px] pl-3.5 pr-9 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-400/40 cursor-pointer shadow-card"
      >
        {includeRelevance ? <option value="relevance">{t('sort.relevance')}</option> : null}
        <option value="featured">{t('sort.featured')}</option>
        <option value="rating-desc">{t('sort.ratingDesc')}</option>
        <option value="newest">{t('sort.newest')}</option>
        <option value="price-asc">{t('sort.priceAsc')}</option>
        <option value="price-desc">{t('sort.priceDesc')}</option>
      </select>
      <ChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silver-400 pointer-events-none"
        aria-hidden
      />
    </div>
  );
}
