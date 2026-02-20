import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MOTION_CONFIG } from '@/config/motion.config';

/**
 * Heading Component
 * Semantic heading with optional animated intro
 */
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  animated?: boolean;
  gradient?: boolean;
  children: React.ReactNode;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { as: Component = 'h1', animated = true, gradient = false, className, children, ...props },
    ref,
  ) => {
    const sizes = {
      h1: 'text-5xl md:text-7xl font-bold',
      h2: 'text-4xl md:text-5xl font-bold',
      h3: 'text-3xl md:text-4xl font-bold',
      h4: 'text-2xl md:text-3xl font-bold',
      h5: 'text-xl md:text-2xl font-bold',
      h6: 'text-lg md:text-xl font-bold',
    };

    const baseClasses = cn(
      sizes[Component],
      gradient && 'gradient-text',
      className,
    );

    if (!animated) {
      return React.createElement(
        Component,
        {
          ref,
          className: baseClasses,
          ...props,
        },
        children,
      );
    }

    return React.createElement(
      motion[Component as keyof typeof motion],
      {
        ref,
        className: baseClasses,
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.6, ease: 'easeOut' },
        ...props,
      },
      children,
    );
  },
);

Heading.displayName = 'Heading';

/**
 * Paragraph Component
 * Semantic paragraph with optional animations
 */
interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  animated?: boolean;
  size?: 'sm' | 'base' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (
    { animated = true, size = 'base', className, children, ...props },
    ref,
  ) => {
    const sizes = {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };

    const baseClasses = cn(
      sizes[size],
      'leading-relaxed text-white/80',
      className,
    );

    if (!animated) {
      return (
        <p ref={ref} className={baseClasses} {...props}>
          {children}
        </p>
      );
    }

    return (
      <motion.p
        ref={ref}
        className={baseClasses}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </motion.p>
    );
  },
);

Paragraph.displayName = 'Paragraph';

/**
 * Section Component
 * Wrapper for content sections with padding and layout
 */
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    { children, className, ...props },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          'relative w-full px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32',
          className,
        )}
        {...props}
      >
        {children}
      </section>
    );
  },
);

Section.displayName = 'Section';

/**
 * Container Component
 * Max-width container for content
 */
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    { children, className, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto max-w-6xl w-full',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = 'Container';

/**
 * Badge Component
 * Small pill-shaped label
 */
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'error';
}

const badgeVariants = {
  primary: 'bg-primary-500/20 text-primary-200 border-primary-500/30',
  accent: 'bg-accent-500/20 text-accent-200 border-accent-500/30',
  success: 'bg-green-500/20 text-green-200 border-green-500/30',
  warning: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30',
  error: 'bg-red-500/20 text-red-200 border-red-500/30',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { children, variant = 'primary', className, ...props },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border',
          badgeVariants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
