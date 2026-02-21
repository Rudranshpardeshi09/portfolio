import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
  hoverEffect?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * GlassCard Component
 * Glass-morphism card with optional animations
 * Features: backdrop blur, transparency, subtle borders
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      animated = true,
      hoverEffect = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses = cn(
      'relative rounded-2xl p-6 backdrop-blur-md border border-white/20 bg-gradient-to-br from-white/10 to-white/5 transition-all duration-300',
      hoverEffect && 'hover:border-white/30 hover:bg-white/15 hover:shadow-glass',
      className,
    );

    const motionProps: MotionProps = animated
      ? {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6, ease: 'easeOut' },
        }
      : {};

    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        {...motionProps}
        {...props}
      >
        {/* Gradient overlay effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 via-transparent to-accent-500/0 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  },
);

GlassCard.displayName = 'GlassCard';
