import type { ReactNode } from 'react';
import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from '../design-system/components/Button';
import { LocaleLink } from './LocaleLink';

type LocaleButtonProps = {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

/** Navigates like a link, styled like a button — avoids invalid `<a><button>` nesting. */
export function LocaleButton({
  to,
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
}: LocaleButtonProps) {
  return (
    <LocaleLink
      to={to}
      className={buttonClassName({ variant, size, fullWidth, className })}
    >
      {children}
    </LocaleLink>
  );
}
