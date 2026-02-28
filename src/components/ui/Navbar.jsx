import { useRef, useState, useEffect } from 'react';
import useThemeStore from '../../store/themeStore';
import { SECTIONS } from '../../data/portfolioData';

export default function Navbar() {
    const { theme, selectedBike } = useThemeStore();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false);
        }
    };

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong py-3' : 'py-5 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Left: Bike icon + Title */}
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-500"
                        style={{
                            background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                            boxShadow: `0 0 20px rgba(${theme.primaryRgb}, 0.4)`,
                        }}
                    >
                        {theme.emoji}
                    </div>
                    <div>
                        <h1
                            className="text-lg sm:text-xl font-bold tracking-wider"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Rudransh's{' '}
                            <span style={{ color: theme.primary }} className="transition-colors duration-500">
                                Garage
                            </span>
                        </h1>
                        <p className="text-xs hidden sm:block" style={{ color: theme.primary, opacity: 0.7 }}>
                            {theme.tagline}
                        </p>
                    </div>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                    {SECTIONS.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${activeSection === id
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                            style={
                                activeSection === id
                                    ? {
                                        background: `rgba(${theme.primaryRgb}, 0.15)`,
                                        color: theme.primary,
                                    }
                                    : {}
                            }
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                        style={{ background: theme.primary }}
                    />
                    <span
                        className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''
                            }`}
                        style={{ background: theme.primary }}
                    />
                    <span
                        className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                        style={{ background: theme.primary }}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-400 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="glass-strong mx-4 mt-2 rounded-xl p-4 flex flex-col gap-1">
                    {SECTIONS.map(({ id, label, icon }) => (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-gray-300 hover:text-white cursor-pointer"
                            style={
                                activeSection === id
                                    ? {
                                        background: `rgba(${theme.primaryRgb}, 0.15)`,
                                        color: theme.primary,
                                    }
                                    : {}
                            }
                        >
                            <span>{icon}</span>
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
