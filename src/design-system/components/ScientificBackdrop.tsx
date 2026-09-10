import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type ScientificBackdropProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'dark' | 'light';
  grid?: boolean;
  molecule?: boolean;
  glow?: boolean;
};

/** Layered scientific grid + molecule pattern for hero, catalog headers, footer. */
export function ScientificBackdrop({
  variant = 'dark',
  grid = true,
  molecule = false,
  glow = false,
  className,
  ...props
}: ScientificBackdropProps) {
  const gridClass = variant === 'dark' ? 'bg-scientific-grid-dark opacity-35' : 'bg-scientific-grid opacity-60';
  const moleculeOpacity = variant === 'dark' ? 'opacity-[0.08]' : 'opacity-[0.05]';
  const glowOpacity = variant === 'dark' ? 'opacity-35' : 'opacity-20';

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}
      aria-hidden
      {...props}
    >
      {grid ? <div className={cn('absolute inset-0', gridClass)} /> : null}
      {molecule ? (
        <div className={cn('absolute inset-0 bg-scientific-molecule', moleculeOpacity)} />
      ) : null}
      {glow ? (
        <div className={cn('absolute inset-0 bg-gradient-glow', glowOpacity)} />
      ) : null}
    </div>
  );
}
