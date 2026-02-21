import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore, getThemeConfig } from '@/store/useThemeStore';

/**
 * Navbar Component
 * Dynamic bike icon from theme, glassmorphism nav bar, themed hover colors
 */
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { activeTheme } = useThemeStore();
    const theme = getThemeConfig(activeTheme);

    const navItems = [
        { label: 'Garage', href: '#hero' },
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-black/80 backdrop-blur-xl shadow-lg shadow-black/50'
                : 'bg-black/40 backdrop-blur-md'
                }`}
            style={{
                borderBottom: isScrolled ? `1px solid rgba(255,255,255,0.06)` : 'none',
            }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 4.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Left — Dynamic bike icon */}
                    <a
                        href="#hero"
                        onClick={(e) => handleNavClick(e, '#hero')}
                        className="flex items-center gap-3 group"
                    >
                        {/* Dynamic bike icon based on active theme */}
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeTheme}
                                src={theme.iconPath}
                                alt={`${theme.label} icon`}
                                className="navbar-bike-icon"
                                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                            />
                        </AnimatePresence>

                        <span
                            className="hidden sm:block font-racing text-lg text-white transition-colors"
                            style={{
                                '--hover-color': theme.primaryColor,
                            }}
                            onMouseEnter={(e) => e.target.style.color = theme.primaryColor}
                            onMouseLeave={(e) => e.target.style.color = '#fff'}
                        >
                            RG
                        </span>
                    </a>

                    {/* Desktop Menu - Right */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="nav-link"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            className="w-6 h-0.5 bg-white block"
                            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                        />
                        <motion.span
                            className="w-6 h-0.5 bg-white block"
                            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                        />
                        <motion.span
                            className="w-6 h-0.5 bg-white block"
                            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <motion.div
                className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl border-t border-white/5"
                initial={false}
                animate={{
                    height: isMobileMenuOpen ? 'auto' : 0,
                    opacity: isMobileMenuOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="px-6 py-4 space-y-4">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="block nav-link text-lg"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;
