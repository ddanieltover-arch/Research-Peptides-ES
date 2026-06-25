import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type CardVariant = 'default' | 'product' | 'feature' | 'trust' | 'glass' | 'bento';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  interactive?: boolean;
};

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white border border-brand-100/60 shadow-card rounded-[1.75rem]',
  product:
    'bg-white border border-brand-100/50 shadow-card rounded-[1.75rem] overflow-hidden group',
  feature:
    'bg-mist-50 border border-brand-100 rounded-[1.75rem] p-6 shadow-card',
  trust: 'bg-white border border-accent-500/20 rounded-[1.75rem] p-6 text-navy-950',
  glass:
    'bg-white/80 backdrop-blur-xl border border-accent-500/15 shadow-card rounded-[1.75rem]',
  bento: 'bento-card',
};

const interactiveClasses =
  'motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-elevated motion-safe:hover:border-accent-500/35 cursor-pointer';

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
