/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Orbitron', 'sans-serif'],
        'body': ['Rajdhani', 'sans-serif'],
        'racing': ['Racing Sans One', 'cursive'],
      },
      colors: {
        // Bike theme - Cherry Red primary
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#DC143C', // Cherry red
          600: '#c01234',
          700: '#a0102c',
          800: '#800d23',
          900: '#60091a',
        },
        // Accent - Warm gold/amber
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Dark garage backgrounds
        garage: {
          darkest: '#050505',
          dark: '#0a0a0a',
          DEFAULT: '#111111',
          light: '#1a1a1a',
          lighter: '#222222',
          card: '#1c1c1c',
          border: '#2a2a2a',
        },
        // Glass overlays
        glass: {
          light: 'rgba(220, 20, 60, 0.05)',
          lighter: 'rgba(220, 20, 60, 0.08)',
          dark: 'rgba(0, 0, 0, 0.6)',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#DC143C',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'zoom-out-in': 'zoomOutIn 4s ease-in-out forwards',
        'spin-tire': 'spinTire 8s linear infinite',
        'ride-bike': 'rideBike 6s linear infinite',
        'ride-bike-delay-1': 'rideBike 6s linear 1.2s infinite',
        'ride-bike-delay-2': 'rideBike 6s linear 2.4s infinite',
        'ride-bike-delay-3': 'rideBike 6s linear 3.6s infinite',
        'ride-bike-delay-4': 'rideBike 6s linear 4.8s infinite',
        'sticker-hover': 'stickerHover 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'road-scroll': 'roadScroll 2s linear infinite',
        'headlight-flicker': 'headlightFlicker 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomOutIn: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '30%': { transform: 'scale(0.6)', opacity: '1' },
          '50%': { transform: 'scale(0.6)', opacity: '1' },
          '80%': { transform: 'scale(3)', opacity: '0' },
          '100%': { transform: 'scale(3)', opacity: '0' },
        },
        spinTire: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rideBike: {
          '0%': { transform: 'translateX(100vw)' },
          '100%': { transform: 'translateX(-200px)' },
        },
        stickerHover: {
          '0%, 100%': { transform: 'translateX(0) rotate(-2deg)' },
          '25%': { transform: 'translateX(5px) rotate(0deg)' },
          '50%': { transform: 'translateX(0) rotate(2deg)' },
          '75%': { transform: 'translateX(-5px) rotate(0deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(220, 20, 60, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(220, 20, 60, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        roadScroll: {
          '0%': { backgroundPositionX: '0' },
          '100%': { backgroundPositionX: '-200px' },
        },
        headlightFlicker: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(220, 20, 60, 0.3)',
        'glow-red-sm': '0 0 10px rgba(220, 20, 60, 0.2)',
        'glow-red-lg': '0 0 40px rgba(220, 20, 60, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-sm': '0 4px 16px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [
    typography,
  ],
  darkMode: 'class',
};
