import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Theme configuration interface
 */
export interface ThemeConfig {
    id: string;
    label: string;
    primaryColor: string;
    accentColor: string;
    glowColor: string;
    secondaryColor: string;
    iconPath: string;
    gradientFrom: string;
    gradientTo: string;
}

/**
 * Theme store state interface
 */
interface ThemeState {
    activeTheme: string;
    setTheme: (themeId: string) => void;
}

/**
 * Theme configurations for each bike brand
 * Each theme defines colors, icon path, and CSS class
 */
export const THEMES: Record<string, ThemeConfig> = {
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
        primaryColor: '#FFFFFF',            // White base
        accentColor: '#0066FF',             // Blue
        glowColor: 'rgba(0, 102, 255, 0.4)',
        secondaryColor: '#FF3366',          // Red
        iconPath: '/bike icons/bmw-icon.png',
        gradientFrom: '#FFFFFF',
        gradientTo: '#0066FF',
    },
    hayabusa: {
        id: 'hayabusa',
        label: 'Suzuki Hayabusa',
        primaryColor: '#FFD700',        // Gold/Yellow
        accentColor: '#FFA500',         // Orange-Yellow
        glowColor: 'rgba(255, 215, 0, 0.4)',
        secondaryColor: '#FFEB3B',      // Bright Yellow
        iconPath: '/bike icons/busa-icon.png',
        gradientFrom: '#FFD700',
        gradientTo: '#FFA500',
    },
    ninja: {
        id: 'ninja',
        label: 'Kawasaki Ninja H2',
        primaryColor: '#39FF14',        // Neon Green
        accentColor: '#00E676',         // Bright Green
        glowColor: 'rgba(57, 255, 20, 0.6)',
        secondaryColor: '#000000',      // Black
        iconPath: '/bike icons/ninja-icon.png',
        gradientFrom: '#39FF14',
        gradientTo: '#00E676',
    },
    mvagusta: {
        id: 'mvagusta',
        label: 'MV Agusta F4',
        primaryColor: '#00B4D8',        // Ocean Light Blue
        accentColor: '#0096C7',         // Lighter Ocean Blue
        glowColor: 'rgba(0, 180, 216, 0.5)',
        secondaryColor: '#00D9FF',      // Bright Cyan
        iconPath: '/bike icons/mv-augusta.png',
        gradientFrom: '#00B4D8',
        gradientTo: '#00D9FF',
    },
};

/**
 * Zustand theme store with localStorage persistence
 * Manages the active bike theme across the entire portfolio
 */
export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            activeTheme: 'ducati',
            setTheme: (themeId: string) => set({ activeTheme: themeId }),
        }),
        {
            name: 'bike-theme',
        }
    )
);

/**
 * Helper: get the full theme config for the current active theme
 */
export const getThemeConfig = (themeId: string): ThemeConfig => THEMES[themeId] || THEMES.ducati;
