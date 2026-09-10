import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Filter } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { formatCurrency } from '../../lib/utils';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { Button, GlassPanel } from '../../design-system';
import type { CategoryOption } from './types';
import { cn } from '../../lib/utils';

export type PurityMinFilter = null | 98 | 99;

export type CatalogFiltersProps = {
  categories: CategoryOption[];
  selectedCategorySlugs: string[];
  onToggleCategory: (slug: string) => void;
  priceRange: number;
  priceSliderMax: number;
  priceSliderStep: number;
  onPriceChange: (value: number) => void;
  purityMin: PurityMinFilter;
  onPurityMinChange: (value: PurityMinFilter) => void;
  onClear: () => void;
  showMobile: boolean;
  onCloseMobile: () => void;
  onOpenMobile: () => void;
  className?: string;
  /** desktop sidebar | mobile trigger button | mobile drawer panel */
  mode?: 'sidebar' | 'trigger' | 'drawer';
};

function activeFilterCount(props: CatalogFiltersProps): number {
  let n = props.selectedCategorySlugs.length;
  if (props.priceRange < props.priceSliderMax) n += 1;
  if (props.purityMin != null) n += 1;
  return n;
}

function FiltersPanel({
  categories,
  selectedCategorySlugs,
  onToggleCategory,
  priceRange,
  priceSliderMax,
  priceSliderStep,
  onPriceChange,
  purityMin,
  onPurityMinChange,
  onClear,
}: Omit<CatalogFiltersProps, 'showMobile' | 'onCloseMobile' | 'onOpenMobile' | 'className' | 'mode'>) {
  const { t } = useTranslation('shop');

  const purityOptions = useMemo(
    () =>
      [
        { value: null as PurityMinFilter, label: t('filters.purityAny') },
        { value: 98 as PurityMinFilter, label: t('filters.purity98') },
        { value: 99 as PurityMinFilter, label: t('filters.purity99') },
      ] as const,
    [t],
  );

  const hasActive =
    selectedCategorySlugs.length > 0 || priceRange < priceSliderMax || purityMin != null;

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-slate-500">
            {t('filters.categories')}
          </h3>
          {selectedCategorySlugs.length > 0 ? (
            <span className="text-[10px] font-mono font-bold tabular-nums text-brand-600">
              {selectedCategorySlugs.length}
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-52 overflow-y-auto pr-0.5 content-start">
          {categories.map((cat) => {
            const active = selectedCategorySlugs.includes(cat.slug);
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => onToggleCategory(cat.slug)}
                aria-pressed={active}
                className={cn(
                  'inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors',
                  active
                    ? 'bg-brand-600 text-white border-brand-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-mist-50',
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-200/80 pt-4">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-slate-500">
            {t('filters.purity')}
          </h3>
          <span className="text-[10px] font-mono text-slate-400">{t('filters.purityHint')}</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label={t('filters.purity')}>
          {purityOptions.map((opt) => {
            const active = purityMin === opt.value;
            return (
              <button
                key={String(opt.value)}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onPurityMinChange(opt.value)}
                className={cn(
                  'px-2 py-2 rounded-lg text-[11px] font-mono font-bold border text-center transition-colors',
                  active
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40',
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-200/80 pt-4">
        <div className="flex justify-between items-center mb-2.5">
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-slate-500">
            {t('filters.maxPrice')}
          </h3>
          <span className="text-xs font-mono font-bold text-brand-700 tabular-nums">
            ≤ {formatCurrency(priceRange)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={priceSliderMax}
          step={priceSliderStep}
          value={Math.min(priceRange, priceSliderMax)}
          onChange={(e) => onPriceChange(parseInt(e.target.value, 10))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-brand-600 bg-slate-200"
          aria-label={t('filters.maxPrice')}
        />
        <div className="flex justify-between text-[10px] font-mono font-semibold text-slate-400 mt-1.5 uppercase tracking-wider">
          <span>{formatCurrency(0)}</span>
          <span>{formatCurrency(priceSliderMax)}+</span>
        </div>
      </div>

      {hasActive ? (
        <Button variant="outline" fullWidth size="sm" onClick={onClear} className="gap-1.5 text-slate-600">
          <X className="h-3.5 w-3.5" />
          {t('filters.clearShort')}
        </Button>
      ) : null}
    </div>
  );
}

export function CatalogFilters(props: CatalogFiltersProps) {
  const { t } = useTranslation('shop');
  const { showMobile, onCloseMobile, onOpenMobile, className, mode = 'sidebar' } = props;
  const count = activeFilterCount(props);

  const mobileRef = useRef<HTMLDivElement>(null);
  useFocusTrap(showMobile && mode === 'drawer', mobileRef, onCloseMobile);

  if (mode === 'trigger') {
    return (
      <button
        type="button"
        onClick={onOpenMobile}
        className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-card hover:border-brand-500/40 transition-colors"
        aria-expanded={showMobile}
        aria-controls="catalog-mobile-filters"
      >
        <Filter className="h-4 w-4" aria-hidden />
        {t('filters.filters')}
        {count > 0 ? (
          <span className="min-w-[1.25rem] h-5 px-1.5 rounded-md bg-brand-600 text-white text-[10px] font-mono font-bold tabular-nums flex items-center justify-center">
            {count}
          </span>
        ) : null}
      </button>
    );
  }

  if (mode === 'sidebar') {
    return (
      <aside className={cn('hidden lg:block sticky top-28 self-start', className)}>
        <GlassPanel
          variant="light"
          padding="sm"
          className="space-y-4 border-t-4 border-t-brand-500 p-5 md:p-5"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display font-semibold text-navy-950 text-base">{t('filters.refine')}</h2>
            {count > 0 ? (
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-100 px-2 py-0.5 rounded-md">
                {t('filters.activeCount', { count })}
              </span>
            ) : null}
          </div>
          <FiltersPanel {...props} />
        </GlassPanel>
      </aside>
    );
  }

  return (
    <AnimatePresence>
      {showMobile && (
        <>
          <motion.div
            className="fixed inset-0 bg-navy-950/40 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            aria-hidden
          />
          <motion.div
            ref={mobileRef}
            id="catalog-mobile-filters"
            role="dialog"
            aria-modal="true"
            aria-label={t('filters.filters')}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-[60] p-5 shadow-elevated lg:hidden flex flex-col border-l border-slate-200"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
          >
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
              <div>
                <h2 className="font-display font-semibold text-lg text-navy-950">{t('filters.filters')}</h2>
                {count > 0 ? (
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                    {t('filters.activeCount', { count })}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                aria-label={t('filters.close')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-1">
              <FiltersPanel {...props} />
            </div>
            <Button className="mt-4 w-full" onClick={onCloseMobile}>
              {t('filters.showResults')}
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/** @deprecated use mode prop — kept for mobile drawer mount at page root */
export function CatalogFiltersDrawer(props: CatalogFiltersProps) {
  return <CatalogFilters {...props} mode="drawer" />;
}

export function CatalogActiveChips(props: CatalogFiltersProps) {
  const { t } = useTranslation('shop');
  const {
    categories,
    selectedCategorySlugs,
    onToggleCategory,
    priceRange,
    priceSliderMax,
    onPriceChange,
    purityMin,
    onPurityMinChange,
    onClear,
  } = props;

  const chips = [
    ...selectedCategorySlugs.map((slug) => ({
      key: `cat-${slug}`,
      label: categories.find((c) => c.slug === slug)?.name ?? slug,
      onRemove: () => onToggleCategory(slug),
    })),
    ...(purityMin != null
      ? [
          {
            key: 'purity',
            label: purityMin >= 99 ? t('filters.purity99') : t('filters.purity98'),
            onRemove: () => onPurityMinChange(null),
          },
        ]
      : []),
    ...(priceRange < priceSliderMax
      ? [
          {
            key: 'price',
            label: t('filters.underPrice', { price: formatCurrency(priceRange) }),
            onRemove: () => onPriceChange(priceSliderMax),
          },
        ]
      : []),
  ];

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 mb-5">
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-lg bg-white text-slate-800 text-[11px] font-semibold border border-slate-200 shadow-card"
        >
          <span className="font-mono">{chip.label}</span>
          <button
            type="button"
            onClick={chip.onRemove}
            className="p-0.5 rounded-md text-slate-400 hover:text-brand-700 hover:bg-brand-50 transition-colors"
            aria-label={t('filters.removeChip', { label: chip.label })}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="text-[11px] font-semibold text-brand-600 hover:text-brand-700 px-1.5 py-1"
      >
        {t('filters.clearAll')}
      </button>
    </div>
  );
}
