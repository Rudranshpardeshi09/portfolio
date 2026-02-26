import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore, THEMES } from '@/store/useThemeStore';

/**
 * ThemeSwitcher Component
 * Floating bottom-left circle that expands to show 5 bike theme options
 * Each option changes the entire site's color scheme + navbar icon
 */
const ThemeSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { activeTheme, setTheme } = useThemeStore();
    const currentTheme = THEMES[activeTheme];

    const themeEntries = Object.values(THEMES);

    // Use vertically stacked positions with a slight S-curve or scattered pattern
    // so they float directly opening above the main theme selector in a random vertical line.
    const getOptionPosition = (index, total) => {
        const positions = [
            { x: 0, y: -70 },     // directly above
            { x: -5, y: -130 },   // slight left
            { x: 5, y: -190 },    // slight right
            { x: -2, y: -250 },   // slight left
            { x: 3, y: -310 },    // slight right
        ];

        // Fallback for more items
        if (index >= positions.length) {
            return { x: -80, y: -80 };
        }

        return positions[index];
    };

    const handleSelect = (themeId) => {
        setTheme(themeId);
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:left-8 z-[1000] pointer-events-none transform scale-75 md:scale-100 origin-bottom-right md:origin-bottom-left">
            {/* Container for theme options with absolute positioning */}
            <div className="relative w-24 h-24 pointer-events-auto">
                {/* Theme options - absolutely positioned */}
                <AnimatePresence>
                    {isOpen && themeEntries.map((theme, index) => {
                        const pos = getOptionPosition(index, themeEntries.length);
                        return (
                            <motion.button
                                key={theme.id}
                                className="theme-option absolute"
                                initial={{
                                    scale: 0,
                                    left: '50%',
                                    top: '50%',
                                    opacity: 0,
                                    x: '-50%',
                                    y: '-50%'
                                }}
                                animate={{
                                    scale: 1,
                                    left: `calc(50% + ${pos.x}px)`,
                                    top: `calc(50% + ${pos.y}px)`,
                                    opacity: 1,
                                    x: '-50%',
                                    y: '-50%'
                                }}
                                exit={{
                                    scale: 0,
                                    left: '50%',
                                    top: '50%',
                                    opacity: 0,
                                    x: '-50%',
                                    y: '-50%'
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 20,
                                    delay: index * 0.05,
                                }}
                                onClick={() => handleSelect(theme.id)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                                style={{
                                    borderColor: activeTheme === theme.id ? theme.primaryColor : 'rgba(255, 255, 255, 0.15)',
                                    boxShadow: activeTheme === theme.id
                                        ? `0 0 20px ${theme.glowColor}`
                                        : '0 0 10px rgba(0, 0, 0, 0.2)',
                                }}
                                title={theme.label}
                                type="button"
                                aria-label={`Select ${theme.label} theme`}
                            >
                                <img
                                    src={theme.iconPath}
                                    alt={theme.label}
                                    loading="lazy"
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        objectFit: 'contain',
                                        pointerEvents: 'none'
                                    }}
                                />
                                <span className="theme-option-tooltip" style={{ pointerEvents: 'none' }}>
                                    {theme.label}
                                </span>
                            </motion.button>
                        );
                    })}
                </AnimatePresence>

                {/* Main toggle button - centered */}
                <motion.button
                    className="theme-switcher-main absolute left-1/2 top-1/2"
                    style={{
                        transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        rotate: isOpen ? 45 : 0,
                        borderColor: currentTheme.primaryColor,
                        boxShadow: `0 0 25px ${currentTheme.glowColor}`,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    type="button"
                    aria-label="Toggle theme selector"
                >
                    <img
                        src={currentTheme.iconPath}
                        alt="Change theme"
                        style={{
                            width: 40,
                            height: 40,
                            objectFit: 'contain',
                            pointerEvents: 'none'
                        }}
                    />
                </motion.button>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
