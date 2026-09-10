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
    'bg-brand-600 hover:bg-brand-700 text-white shadow-sm hover:shadow-elevated transition-all border border-brand-700/20 active:brightness-95',
  secondary:
    'bg-navy-950 text-white hover:bg-slate-800 shadow-sm border border-navy-900/30',
  gold:
    'bg-brand-600 hover:bg-brand-700 text-white shadow-sm border border-brand-700/20',
  outline:
    'bg-white border border-slate-200 text-navy-950 hover:bg-slate-50 hover:border-slate-300 shadow-sm',
  ghost:
    'bg-transparent text-steel-600 hover:bg-slate-100 hover:text-navy-950',
  danger: 'bg-error text-white hover:brightness-110 shadow-sm',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs font-medium rounded-lg',
  md: 'h-10 px-5 text-sm font-semibold rounded-lg tracking-normal',
  lg: 'h-11 px-6 text-sm font-semibold rounded-xl tracking-normal',
};

const baseButtonClasses =
  'inline-flex items-center justify-center gap-2 transition-all duration-150 font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 motion-safe:active:scale-[0.99] cursor-pointer';

export type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

/** Shared button styles — use on `<Link>` / `<LocaleLink>` (never nest `<button>` inside `<a>`). */
export function buttonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
}: ButtonStyleOptions = {}) {
  return cn(
    baseButtonClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className,
  );
}

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
        buttonClassName({ variant, size, fullWidth, className }),
        'disabled:pointer-events-none disabled:opacity-50',
      )}
      {...props}
    >
      {children}
    </button>
  );
});
