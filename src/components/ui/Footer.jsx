import { useEffect, useState } from 'react';
import useThemeStore from '../../store/themeStore';
import DecryptText from '../reactbits/DecryptText';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
    const { theme } = useThemeStore();
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = [
        { name: 'Home', id: 'hero' },
        { name: 'Skills', id: 'skills' },
        { name: 'Projects', id: 'projects' },
        { name: 'Experience', id: 'experience' },
        { name: 'Certificates', id: 'certificates' },
    ];

    return (
        <footer className="relative z-10 pb-12 pt-16 bg-[#030303] border-t border-white/5 flex justify-center">

            {/* MAIN CONTAINER FIX */}
            <div className="w-full max-w-7xl px-4 md:px-8 lg:px-12 flex flex-col items-center text-center">

                {/* Navigation Links FIX */}
                <nav className="mb-12 w-full flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-center">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.id)}
                            className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/50 transition-colors duration-300 hover:text-white group relative"
                        >
                            {link.name}
                            <span
                                className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent transition-all duration-300 group-hover:w-full group-hover:left-0"
                                style={{ color: theme.primary }}
                            />
                        </button>
                    ))}
                </nav>

                {/* Big Decrypted Text Footer */}
                <div className="w-full text-center opacity-30 hover:opacity-100 transition-opacity duration-700 select-none mb-12">
                    <div className="text-[12vw] font-black uppercase tracking-tighter leading-none text-white whitespace-nowrap overflow-hidden">
                        <DecryptText text="RUDRANSH" />
                    </div>
                </div>

                {/* Bottom Bar FIX */}
                <div className="w-full flex flex-col items-center justify-center pt-12 border-t border-white/10 relative text-center">

                    {/* Inner Content FIX */}
                    <div className="flex flex-col items-center justify-center gap-6 text-center">
                        <AnimatePresence>
                            {showBackToTop && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                    onClick={scrollToTop}
                                    className="w-14 h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group z-50 backdrop-blur-md hover:scale-110 active:scale-95 mb-4"
                                    style={{
                                        boxShadow: `0 0 0 rgba(${theme.primaryRgb}, 0)`
                                    }}
                                    whileHover={{
                                        boxShadow: `0 0 30px rgba(${theme.primaryRgb}, 0.3)`
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white/50 group-hover:text-white transition-colors group-hover:-translate-y-1 duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                                        />
                                    </svg>
                                </motion.button>
                            )}
                        </AnimatePresence>

                        <div className="flex flex-col items-center text-center space-y-4">
                            <p className="text-xs text-white/30 tracking-[0.4em] uppercase font-bold">
                                © 2026 Rudransh Pardeshi
                            </p>

                            <div className="w-10 h-[1px] bg-white/10" />

                            <p className="text-[10px] text-white/20 tracking-[0.3em] uppercase font-mono">
                                Orchestrated with <span className="text-white/40" style={{ color: theme.primary }}>ReactBits</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}