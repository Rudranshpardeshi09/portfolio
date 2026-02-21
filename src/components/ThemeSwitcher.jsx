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

    // Radial positions for the 5 options (fanning upward from bottom-left)
    const getOptionPosition = (index, total) => {
        const startAngle = -20;  // degrees from horizontal
        const endAngle = -110;   // degrees
        const angle = startAngle + (endAngle - startAngle) * (index / (total - 1));
        const rad = (angle * Math.PI) / 180;
        const radius = 85;
        return {
            x: Math.cos(rad) * radius,
            y: Math.sin(rad) * radius,
        };
    };

    const handleSelect = (themeId) => {
        setTheme(themeId);
        setIsOpen(false);
    };

    return (
        <div style={{ position: 'fixed', bottom: 30, left: 30, zIndex: 1000 }}>
            {/* Theme options */}
            <AnimatePresence>
                {isOpen && themeEntries.map((theme, index) => {
                    const pos = getOptionPosition(index, themeEntries.length);
                    return (
                        <motion.button
                            key={theme.id}
                            className={`theme-option ${activeTheme === theme.id ? 'active' : ''}`}
                            initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                            animate={{
                                scale: 1,
                                x: pos.x,
                                y: pos.y,
                                opacity: 1,
                            }}
                            exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 22,
                                delay: index * 0.05,
                            }}
                            onClick={() => handleSelect(theme.id)}
                            style={{
                                borderColor: activeTheme === theme.id ? theme.primaryColor : undefined,
                                boxShadow: activeTheme === theme.id
                                    ? `0 0 15px ${theme.glowColor}`
                                    : undefined,
                            }}
                            title={theme.label}
                        >
                            <img
                                src={theme.iconPath}
                                alt={theme.label}
                                loading="lazy"
                            />
                            <span className="theme-option-tooltip">{theme.label}</span>
                        </motion.button>
                    );
                })}
            </AnimatePresence>

            {/* Main toggle button */}
            <motion.button
                className="theme-switcher-main"
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                animate={{
                    rotate: isOpen ? 45 : 0,
                    borderColor: currentTheme.primaryColor,
                    boxShadow: `0 0 20px ${currentTheme.glowColor}`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <img
                    src={currentTheme.iconPath}
                    alt="Change theme"
                    style={{ width: 36, height: 36, objectFit: 'contain' }}
                />
            </motion.button>
        </div>
    );
};

export default ThemeSwitcher;
