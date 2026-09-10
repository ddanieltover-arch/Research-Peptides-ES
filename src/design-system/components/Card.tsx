import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type CardVariant = 'default' | 'product' | 'feature' | 'trust' | 'glass' | 'bento';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  interactive?: boolean;
};

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white border border-slate-200/80 shadow-card rounded-xl',
  product:
    'bg-white border border-slate-200/80 shadow-card rounded-xl overflow-hidden group',
  feature:
    'bg-slate-50/60 border border-slate-200/80 rounded-xl p-6 shadow-card',
  trust: 'bg-white border border-slate-200/80 rounded-xl p-6 text-navy-950 shadow-card',
  glass:
    'bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-card rounded-xl',
  bento: 'bento-card',
};

const interactiveClasses =
  'motion-safe:transition-all motion-safe:duration-150 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-elevated motion-safe:hover:border-slate-300 cursor-pointer';

export function Card({
  variant = 'default',
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(variantClasses[variant], interactive && interactiveClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
}
