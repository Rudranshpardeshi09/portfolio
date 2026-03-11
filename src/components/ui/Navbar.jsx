import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useThemeStore from '../../store/themeStore';
import { SECTIONS } from '../../data/portfolioData';
import NavOverlay from './NavOverlay';

export default function Navbar() {
    const { theme } = useThemeStore();
    const [activeSection, setActiveSection] = useState('#hero');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
                });
            },
            { threshold: 0.4 }
        );

        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            observer.disconnect();
        };
    }, []);

    // Also update parent/App state if needed via window events or context if we had one
    // But since we are in App.jsx too, we can handle the tilt there.
    // For now, let's dispatch a custom event that App.jsx can listen to.
    useEffect(() => {
        const event = new CustomEvent('navToggle', { detail: { isOpen: isMenuOpen } });
        window.dispatchEvent(event);
        
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <>
            <header 
                className={`fixed top-0 left-0 w-full z-[110] px-6 md:px-12 py-8 flex justify-between items-center transition-all duration-500 ${
                    scrolled && !isMenuOpen ? 'backdrop-blur-md bg-black/20' : ''
                }`}
            >
                {/* Logo Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setIsMenuOpen(false);
                    }}
                >
                    <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-white/10"
                        style={{ backgroundColor: theme.primary }}
                    >
                        <img 
                            src={theme.image || "/bike-sideways/duccati-icon.png"} 
                            alt="Logo" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-xl font-black uppercase tracking-tighter text-white">
                        RUDRANSH<span style={{ color: theme.primary }}>.</span>
                    </span>
                </motion.div>

                {/* 3D Hamburger Toggle */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="group relative w-12 h-12 flex flex-col justify-center items-center gap-1.5 z-[120]"
                >
                    <motion.span 
                        animate={isMenuOpen ? { rotate: 45, y: 8, backgroundColor: theme.primary } : { rotate: 0, y: 0, backgroundColor: 'white' }}
                        className="w-8 h-0.5 rounded-full"
                    />
                    <motion.span 
                        animate={isMenuOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0, backgroundColor: 'white' }}
                        className="w-8 h-0.5 rounded-full"
                    />
                    <motion.span 
                        animate={isMenuOpen ? { rotate: -45, y: -8, backgroundColor: theme.primary } : { rotate: 0, y: 0, backgroundColor: 'white' }}
                        className="w-8 h-0.5 rounded-full"
                    />
                    
                    {/* Hover text label */}
                    <span className="absolute -left-16 text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                        {isMenuOpen ? 'Close' : 'Menu'}
                    </span>
                </button>
            </header>

            <NavOverlay 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
                activeSection={activeSection}
            />
        </>
    );
}
