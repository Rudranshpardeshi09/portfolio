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

    // Calculate positions for the 5 options (fanning upward and to the right)
    const getOptionPosition = (index, total) => {
        // Fan from 45 degrees (up-right) to 120 degrees (up-left)
        const startAngle = 45;   // degrees
        const endAngle = 120;     // degrees
        const angle = startAngle + (endAngle - startAngle) * (index / (total - 1));
        const rad = (angle * Math.PI) / 180;
        const radius = 100;       // Distance from center

        return {
            x: Math.cos(rad) * radius,
            y: -(Math.sin(rad) * radius),  // Negative because Y increases downward
        };
    };

    const handleSelect = (themeId) => {
        setTheme(themeId);
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-8 left-8 z-[1000] pointer-events-none">
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
