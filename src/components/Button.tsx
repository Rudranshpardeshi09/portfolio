import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TRANSITIONS } from '@/config/motion.config';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  animated?: boolean;
}

const buttonVariants = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white',
  secondary: 'bg-accent-500 hover:bg-accent-600 text-white',
  outline: 'border border-white/30 hover:border-white/50 text-white hover:bg-white/5',
  ghost: 'text-white hover:bg-white/10',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

/**
 * Button Component
 * Accessible, animated button with multiple variants
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'left',
      animated = true,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    const content = (
      <span className="flex items-center justify-center gap-2">
        {icon && iconPosition === 'left' && <span>{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span>{icon}</span>}
        {isLoading && (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
      </span>
    );

    const baseClasses = cn(
      'relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
      buttonVariants[variant],
      buttonSizes[size],
      className,
    );

    const motionProps: MotionProps = animated
      ? {
          whileHover: { scale: isDisabled ? 1 : 1.05 },
          whileTap: { scale: isDisabled ? 1 : 0.95 },
          transition: TRANSITIONS.fast,
        }
      : {};

    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        disabled={isDisabled}
        {...motionProps}
        {...props}
      >
        {content}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
