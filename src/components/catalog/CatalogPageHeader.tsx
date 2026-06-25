import type { ReactNode } from 'react';
import { Container } from '../../design-system';

type CatalogPageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
};

export function CatalogPageHeader({ eyebrow, title, description, actions }: CatalogPageHeaderProps) {
  return (
    <div className="bg-gradient-parchment border-b border-brand-100/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-scientific-grid opacity-30 pointer-events-none" aria-hidden />
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/60 to-transparent"
        aria-hidden
      />
      <Container className="relative z-10 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-eyebrow-accent mb-4">{eyebrow}</p>
            <h1 className="text-h1 font-display font-semibold text-navy-950 mb-3 leading-tight">{title}</h1>
            {description ? (
              <p className="text-steel-600 text-sm md:text-base leading-relaxed max-w-xl">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
      </Container>
    </div>
  );
}
