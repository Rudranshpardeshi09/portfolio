/**
 * Motion Configuration
 * Centralized animation tokens and easing templates for consistent motion design
 *
 * Usage:
 * import { motion } from 'framer-motion';
 * import { MOTION_CONFIG } from '@/config/motion.config';
 *
 * <motion.div variants={MOTION_CONFIG.variants.fadeUp} />
 */

// Animation durations
export const DURATIONS = {
  fast: 0.12, // 120ms - quick micro-interactions
  medium: 0.26, // 260ms - standard transitions
  long: 0.56, // 560ms - dramatic reveals
  extraLong: 1.0, // 1000ms - page transitions
} as const;

// Easing configurations
export const EASINGS = {
  easeOutQuart: [0.165, 0.84, 0.44, 1],
  easeInQuart: [0.895, 0.03, 0.685, 0.22],
  easeInOutQuart: [0.77, 0, 0.175, 1],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
} as const;

// Spring configurations for natural motion
export const SPRINGS = {
  smooth: {
    type: 'spring',
    stiffness: 100,
    damping: 30,
    mass: 1,
  },
  bouncy: {
    type: 'spring',
    stiffness: 300,
    damping: 10,
    mass: 0.5,
  },
  stiff: {
    type: 'spring',
    stiffness: 400,
    damping: 60,
    mass: 1,
  },
} as const;

// Transition presets
export const TRANSITIONS = {
  fast: {
    duration: DURATIONS.fast,
    ease: EASINGS.easeOutQuart,
  },
  medium: {
    duration: DURATIONS.medium,
    ease: EASINGS.easeOutQuart,
  },
  long: {
    duration: DURATIONS.long,
    ease: EASINGS.easeOutCubic,
  },
  smooth: SPRINGS.smooth,
  bouncy: SPRINGS.bouncy,
} as const;

// Variant patterns for common animations
export const MOTION_CONFIG = {
  // Fade animations
  variants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: TRANSITIONS.medium,
    },
    fadeOut: {
      initial: { opacity: 1 },
      animate: { opacity: 0 },
      transition: TRANSITIONS.medium,
    },

    // Slide animations
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
      transition: TRANSITIONS.medium,
    },
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: TRANSITIONS.medium,
    },
    slideLeft: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: TRANSITIONS.medium,
    },
    slideRight: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
      transition: TRANSITIONS.medium,
    },

    // Scale animations
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: TRANSITIONS.medium,
    },
    scaleUp: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
      transition: TRANSITIONS.long,
    },

    // Rotate animations
    rotateIn: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: -10 },
      transition: TRANSITIONS.medium,
    },

    // Blur animations
    blurIn: {
      initial: { opacity: 0, filter: 'blur(10px)' },
      animate: { opacity: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, filter: 'blur(10px)' },
      transition: TRANSITIONS.long,
    },
  },

  // Stagger configurations for list/grid animations
  staggerContainer: (staggerChildren = 0.05) => ({
    animate: {
      transition: {
        staggerChildren,
      },
    },
  }),

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },

  // Hover effects
  buttonHover: {
    scale: 1.05,
    transition: TRANSITIONS.fast,
  },
  buttonTap: {
    scale: 0.95,
  },

  // Hover underline effect
  underlineHover: {
    initial: { scaleX: 0, originX: 0 },
    whileHover: { scaleX: 1, originX: 0 },
    transition: TRANSITIONS.medium,
  },

  // Scroll-triggered animations
  viewportTrigger: {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.3 },
  },
} as const;

/**
 * Utility function to create a fade-up stagger animation
 * Usage: <motion.div variants={fadeUpStagger()} initial="hidden" animate="visible">
 */
export const fadeUpStagger = (staggerDelay = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

/**
 * Utility function to create fade-up items for stagger container
 */
export const fadeUpItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.medium,
  },
};

export default MOTION_CONFIG;
