import { Filter } from 'lucide-react';
import { Button } from '../../design-system';

type CatalogEmptyStateProps = {
  title: string;
  description: string;
  onClear?: () => void;
  clearLabel?: string;
};

export function CatalogEmptyState({
  title,
  description,
  onClear,
  clearLabel = 'Clear all filters',
}: CatalogEmptyStateProps) {
  return (
    <div
      className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-card"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto w-14 h-14 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
        <Filter className="h-7 w-7 text-brand-300" aria-hidden />
      </div>
      <h3 className="font-display font-bold text-xl text-navy-950 mb-2">{title}</h3>
      <p className="text-steel-600 text-sm mb-6 max-w-md mx-auto">{description}</p>
      {onClear ? (
        <Button variant="outline" onClick={onClear}>
          {clearLabel}
        </Button>
      ) : null}
    </div>
  );
}
