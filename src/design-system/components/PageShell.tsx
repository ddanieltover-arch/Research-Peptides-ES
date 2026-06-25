import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export type PageShellProps = {
  children: ReactNode;
  tone?: 'mist' | 'parchment' | 'white';
  className?: string;
};

const toneClasses = {
  mist: 'bg-mist-50',
  parchment: 'bg-gradient-parchment',
  white: 'bg-white',
};

/** Consistent page canvas for storefront routes. */
export function PageShell({ children, tone = 'mist', className }: PageShellProps) {
  return (
    <div className={cn('min-h-screen', toneClasses[tone], className)}>
      {children}
    </div>
  );
}
