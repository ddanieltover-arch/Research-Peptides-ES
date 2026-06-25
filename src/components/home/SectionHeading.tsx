import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === 'center' && 'text-center mx-auto max-w-3xl',
        className,
      )}
    >
      <p
        className={cn(
          'text-eyebrow-accent mb-4',
          align === 'center' && 'justify-center',
          light ? 'text-accent-400 before:bg-accent-400' : 'text-brand-600 before:bg-brand-500',
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          'text-h2 font-display font-semibold mb-4',
          light ? 'text-white' : 'text-navy-950',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'text-body-lg max-w-2xl font-sans',
            align === 'center' && 'mx-auto',
            light ? 'text-silver-400' : 'text-steel-600',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
