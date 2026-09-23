import { Columns2, Columns3, LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

export const SHOP_PRODUCTS_PER_ROW_OPTIONS = [2, 3, 4] as const;
export type ShopProductsPerRow = (typeof SHOP_PRODUCTS_PER_ROW_OPTIONS)[number];

export const DEFAULT_SHOP_PRODUCTS_PER_ROW: ShopProductsPerRow = 4;

const GRID_CLASS: Record<ShopProductsPerRow, string> = {
  2: 'grid grid-cols-2 gap-4 md:gap-6',
  3: 'grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6',
  4: 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6',
};

const OPTION_ICON = {
  2: Columns2,
  3: Columns3,
  4: LayoutGrid,
} as const;

export function shopGridClassName(perRow: ShopProductsPerRow): string {
  return GRID_CLASS[perRow];
}

type CatalogProductsPerRowProps = {
  value: ShopProductsPerRow;
  onChange: (value: ShopProductsPerRow) => void;
  className?: string;
};

export function CatalogProductsPerRow({
  value,
  onChange,
  className,
}: CatalogProductsPerRowProps) {
  const { t } = useTranslation('shop');

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-xl border border-slate-200 bg-white p-0.5 shadow-card',
        className,
      )}
      role="radiogroup"
      aria-label={t('grid.label')}
    >
      {SHOP_PRODUCTS_PER_ROW_OPTIONS.map((option) => {
        const Icon = OPTION_ICON[option];
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={t('grid.option', { count: option })}
            onClick={() => onChange(option)}
            className={cn(
              'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
              selected
                ? 'bg-brand-600 text-white'
                : 'text-slate-500 hover:bg-slate-50 hover:text-navy-950',
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
