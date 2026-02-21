import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Theme configurations for each bike brand
 * Each theme defines colors, icon path, and CSS class
 */
export const THEMES = {
    ducati: {
        id: 'ducati',
        label: 'Ducati Panigale V4',
        primaryColor: '#DC143C',
        accentColor: '#a0102c',
        glowColor: 'rgba(220, 20, 60, 0.4)',
        secondaryColor: '#ff4444',
        iconPath: '/bike icons/duccati-icon.png',
        gradientFrom: '#DC143C',
        gradientTo: '#ff4444',
    },
    bmw: {
        id: 'bmw',
        label: 'BMW S1000RR',
        primaryColor: '#1E88E5',
        accentColor: '#1565C0',
        glowColor: 'rgba(30, 136, 229, 0.4)',
        secondaryColor: '#ffffff',
        iconPath: '/bike icons/bmw-icon.png',
        gradientFrom: '#1E88E5',
        gradientTo: '#42A5F5',
    },
    hayabusa: {
        id: 'hayabusa',
        label: 'Suzuki Hayabusa',
        primaryColor: '#F5A623',
        accentColor: '#E09100',
        glowColor: 'rgba(245, 166, 35, 0.4)',
        secondaryColor: '#C0C0C0',
        iconPath: '/bike icons/busa-icon.png',
        gradientFrom: '#F5A623',
        gradientTo: '#FFD54F',
    },
    ninja: {
        id: 'ninja',
        label: 'Kawasaki Ninja H2',
        primaryColor: '#39FF14',
        accentColor: '#00E676',
        glowColor: 'rgba(57, 255, 20, 0.4)',
        secondaryColor: '#000000',
        iconPath: '/bike icons/ninja-icon.png',
        gradientFrom: '#39FF14',
        gradientTo: '#76FF03',
    },
    mvagusta: {
        id: 'mvagusta',
        label: 'MV Agusta F4',
        primaryColor: '#2962FF',
        accentColor: '#0039CB',
        glowColor: 'rgba(41, 98, 255, 0.4)',
        secondaryColor: '#B0BEC5',
        iconPath: '/bike icons/mv-augusta.png',
        gradientFrom: '#2962FF',
        gradientTo: '#448AFF',
    },
};

/**
 * Zustand theme store with localStorage persistence
 * Manages the active bike theme across the entire portfolio
 */
export const useThemeStore = create(
    persist(
        (set) => ({
            activeTheme: 'ducati',
            setTheme: (themeId) => set({ activeTheme: themeId }),
        }),
        {
            name: 'bike-theme',
        }
    )
);

/**
 * Helper: get the full theme config for the current active theme
 */
export const getThemeConfig = (themeId) => THEMES[themeId] || THEMES.ducati;
