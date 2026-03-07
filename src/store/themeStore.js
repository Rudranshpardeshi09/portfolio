import { create } from 'zustand';

const BIKE_THEMES = {
    ducati: {
        name: 'Ducati Panigale V4',
        key: 'ducati',
        primary: '#9B1B30', // Cherry Red (Pantone)
        primaryRgb: '155, 27, 48',
        secondary: '#7B1324',
        gradientStart: '#9B1B30',
        gradientEnd: '#7B1324',
        glow: '#9B1B30',
        emoji: '🏍️',
        image: '/bike-sideways/duccati-icon.png',
        tagline: 'Italian Thunder',
    },
    bmw: {
        name: 'BMW S1000RR',
        key: 'bmw',
        primary: '#0057B8',
        primaryRgb: '0, 87, 184',
        secondary: '#D90429',
        gradientStart: '#D90429',
        gradientEnd: '#0057B8',
        glow: '#0057B8',
        emoji: '🏍️',
        image: '/bike-sideways/bmw-icon.png',
        tagline: 'Bavarian Precision',
    },
    hayabusa: {
        name: 'Suzuki Hayabusa',
        key: 'hayabusa',
        primary: '#FFCC00',
        primaryRgb: '255, 204, 0',
        secondary: '#CC8800',
        gradientStart: '#FFCC00',
        gradientEnd: '#FF8800',
        glow: '#FFCC00',
        emoji: '🏍️',
        image: '/bike-sideways/busa-icon.png',
        tagline: 'The Peregrine Falcon',
    },
    ninja: {
        name: 'Kawasaki Ninja H2',
        key: 'ninja',
        primary: '#39FF14',
        primaryRgb: '57, 255, 20',
        secondary: '#00CC00',
        gradientStart: '#39FF14',
        gradientEnd: '#00CC00',
        glow: '#39FF14',
        emoji: '🏍️',
        image: '/bike-sideways/ninja-icon.png',
        tagline: 'Supercharged Beast',
    },
    agusta: {
        name: 'MV Agusta F4',
        key: 'agusta',
        primary: '#005DA4',
        primaryRgb: '0, 93, 164',
        secondary: '#003D6B',
        gradientStart: '#0088FF',
        gradientEnd: '#005DA4',
        glow: '#0088FF',
        emoji: '🏍️',
        image: '/bike-sideways/mv-augusta.png',
        tagline: 'Art on Two Wheels',
    },
};

function applyThemeToDom(theme) {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-rgb', theme.primaryRgb);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-glow', theme.glow);
    root.style.setProperty('--color-gradient-start', theme.gradientStart);
    root.style.setProperty('--color-gradient-end', theme.gradientEnd);
}

const savedBike = typeof window !== 'undefined' ? localStorage.getItem('selectedBike') : null;
const initialBike = savedBike && BIKE_THEMES[savedBike] ? savedBike : 'ducati';

// Apply initial theme immediately
if (typeof window !== 'undefined') {
    applyThemeToDom(BIKE_THEMES[initialBike]);
}

const useThemeStore = create((set, get) => ({
    selectedBike: initialBike,
    theme: BIKE_THEMES[initialBike],
    bikeSelected: true, // Always true — no selection page needed
    allThemes: BIKE_THEMES,

    setBike: (bikeKey) => {
        const theme = BIKE_THEMES[bikeKey];
        if (!theme) return;

        applyThemeToDom(theme);
        localStorage.setItem('selectedBike', bikeKey);

        set({
            selectedBike: bikeKey,
            theme,
            bikeSelected: true,
        });
    },
    getBackgroundStyle: () => {
        return { backgroundColor: '#0a0a0a' }; // Professional universal black background
    },
}));

export { BIKE_THEMES };
export default useThemeStore;

