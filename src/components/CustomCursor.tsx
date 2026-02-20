import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { prefersReducedMotion } from '@/lib/utils';

/**
 * CustomCursor Component
 * Animated cursor that follows mouse movement
 * Includes hover states for links and buttons
 */
export const CustomCursor: React.FC = () => {
  const isMobile =
    typeof window !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  // Don't render on mobile (use native cursor)
  if (isMobile || prefersReducedMotion()) {
    return null;
  }

  return (
    <CursorInner>
      <CursorBlur />
      <CursorDot />
    </CursorInner>
  );
};

const CursorInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorState({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.role === 'button' ||
        target.onclick;

      if (isClickable) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <motion.div
      ref={cursorOuterRef}
      className="pointer-events-none fixed z-[9999]"
      animate={{
        x: cursorState.x - 16,
        y: cursorState.y - 16,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const CursorBlur: React.FC = () => (
  <motion.div
    className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary-500/30 to-accent-500/30 blur-xl"
    animate={{
      opacity: [0.5, 0.8, 0.5],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const CursorDot: React.FC = () => (
  <div className="absolute inset-0 rounded-full border border-primary-400 bg-primary-500/20 w-8 h-8" />
);
