import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * DucatiSticker SVG
 * Animated red Ducati motorcycle silhouette for the navbar
 */
const DucatiSticker = () => (
    <svg
        className="ducati-sticker"
        width="60"
        height="35"
        viewBox="0 0 120 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Bike body */}
        <path
            d="M25 50 C25 50 30 25 50 20 L70 18 C75 17 80 20 82 25 L85 35 L95 30 C100 28 105 30 105 35 L105 45 C105 50 100 55 95 55 L85 55 L80 55 C80 55 78 45 70 45 L50 45 C45 45 40 48 38 52 L35 55 L25 55 C20 55 18 50 25 50Z"
            fill="#DC143C"
            stroke="#ff2244"
            strokeWidth="1"
        />
        {/* Front wheel */}
        <circle cx="85" cy="55" r="12" fill="none" stroke="#aaa" strokeWidth="4" />
        <circle cx="85" cy="55" r="4" fill="#666" />
        {/* Rear wheel */}
        <circle cx="35" cy="55" r="12" fill="none" stroke="#aaa" strokeWidth="4" />
        <circle cx="35" cy="55" r="4" fill="#666" />
        {/* Exhaust */}
        <path d="M20 48 L10 48 L8 45 L10 42 L22 42" fill="#888" stroke="#999" strokeWidth="0.5" />
        {/* Headlight */}
        <ellipse cx="100" cy="32" rx="4" ry="3" fill="#FFD700" opacity="0.8" />
        {/* Windscreen */}
        <path d="M82 25 C85 20 90 18 95 20 L95 28 C90 26 85 27 82 25Z" fill="rgba(255,255,255,0.15)" />
        {/* Speed lines */}
        <motion.line
            x1="5" y1="35" x2="20" y2="35"
            stroke="#DC143C" strokeWidth="1" opacity="0.4"
            animate={{ x1: [-5, 5], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 0.8, repeat: Infinity }}
        />
        <motion.line
            x1="0" y1="42" x2="18" y2="42"
            stroke="#DC143C" strokeWidth="1" opacity="0.3"
            animate={{ x1: [-3, 3], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
        />
        <motion.line
            x1="3" y1="50" x2="15" y2="50"
            stroke="#DC143C" strokeWidth="0.8" opacity="0.3"
            animate={{ x1: [-4, 4], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0.6 }}
        />
    </svg>
);

/**
 * Navbar Component
 * Black background, animated Ducati sticker on left, white nav links with cherry red hover
 */
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                    ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/50'
                    : 'bg-black/80 backdrop-blur-sm'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 4.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Left - Ducati Sticker */}
                    <a
                        href="#hero"
                        onClick={(e) => handleNavClick(e, '#hero')}
                        className="flex items-center gap-3 group"
                    >
                        <DucatiSticker />
                        <span className="hidden sm:block font-racing text-lg text-white group-hover:text-red-500 transition-colors">
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
                className="md:hidden overflow-hidden bg-black/95 border-t border-gray-800"
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
