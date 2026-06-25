import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'dark' | 'light' | 'parchment';
  padding?: 'none' | 'sm' | 'md' | 'lg';
};

const variantClasses = {
  dark: 'bg-navy-950/90 border-white/10 text-white',
  light: 'bg-white/90 border-brand-100/80 text-navy-950 backdrop-blur-sm',
  parchment: 'bg-white border-brand-100/80 text-navy-950 shadow-card',
};

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-12',
};

export function GlassPanel({
  variant = 'dark',
  padding = 'md',
  className,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        'rounded-[1.75rem] border',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
