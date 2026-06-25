import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';
import { pageEnterTransition } from '../motion';

type AnimateInProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
};

export function AnimateIn({ children, className, delay = 0, ...props }: AnimateInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...pageEnterTransition(), delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
