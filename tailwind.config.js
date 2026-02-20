/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Space theme - Neon cyan primary
        primary: {
          50: '#e0f7ff',
          100: '#b3f0ff',
          200: '#80e9ff',
          300: '#4de5ff',
          400: '#26e0ff',
          500: '#00d4ff',
          600: '#00b8d4',
          700: '#009bb0',
          800: '#007d8c',
          900: '#006068',
        },
        // Accent colors - Space purple
        accent: {
          50: '#f3e8ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        // Glass and overlay colors
        glass: {
          light: 'rgba(0, 212, 255, 0.05)',
          lighter: 'rgba(0, 212, 255, 0.08)',
          dark: 'rgba(0, 0, 0, 0.2)',
        },
        // Skill palette colors - Space theme
        skill: {
          orange: '#ff6b35',
          cyan: '#00d4ff',
          purple: '#8b5cf6',
          pink: '#ff1493',
          turquoise: '#40e0d0',
          yellow: '#ffd700',
          red: '#ff4444',
          blue: '#4169e1',
        },
        // Semantic colors
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#00d4ff',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.375rem',
        'base': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
        'full': '9999px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(14, 165, 233, 0.3)',
        'glow-sm': '0 0 10px rgba(14, 165, 233, 0.2)',
        'glow-lg': '0 0 40px rgba(14, 165, 233, 0.4)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.15)',
        'glass-sm': '0 4px 16px rgba(31, 38, 135, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translate(0, 20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translate(0, 0)'
          },
        },
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translate(0, -20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translate(0, 0)'
          },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(14, 165, 233, 0.6)'
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-20px)'
          },
        },
      },
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        'in-quart': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(10px)',
        'blur-sm': 'blur(4px)',
        'blur-md': 'blur(12px)',
        'blur-lg': 'blur(16px)',
        'blur-xl': 'blur(24px)',
      },
    },
  },
  plugins: [
    typography,
    // Custom glass-morphism plugin
    function ({ addComponents }) {
      addComponents({
        '.glass': {
          '@apply bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl': {},
        },
        '.glass-dark': {
          '@apply bg-black/10 backdrop-blur-md border border-white/10': {},
        },
        '.glass-sm': {
          '@apply glass rounded-xl': {},
        },
        '.glass-lg': {
          '@apply glass rounded-3xl': {},
        },
      });
    },
  ],
  darkMode: 'class',
};
