import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'gold';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-cta text-white shadow-elevated hover:shadow-glow hover:brightness-105 border border-accent-500/25',
  secondary:
    'bg-brand-600 text-white hover:bg-brand-700 shadow-card border border-brand-700/20',
  gold:
    'bg-accent-500 text-navy-950 hover:bg-accent-400 shadow-card border border-accent-600/30 font-bold',
  outline:
    'bg-transparent border-2 border-brand-500 text-brand-600 hover:bg-brand-50',
  ghost:
    'bg-transparent text-accent-400 hover:bg-white/10 hover:text-accent-300',
  danger: 'bg-error text-white hover:brightness-110 shadow-card',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm rounded-full',
  md: 'h-11 px-6 text-sm font-bold rounded-full tracking-wide',
  lg: 'h-12 px-8 text-base font-bold rounded-full tracking-wide',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', fullWidth, className, disabled, type = 'button', children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-200 font-sans',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'motion-safe:active:scale-[0.98]',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
