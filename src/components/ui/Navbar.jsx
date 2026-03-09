import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import useThemeStore from '../../store/themeStore';
import { SECTIONS } from '../../data/portfolioData';

export default function Navbar() {
    const { theme } = useThemeStore();
    const [activeSection, setActiveSection] = useState('#about');
    const [mobileOpen, setMobileOpen] = useState(false);
    const titleRef = useRef(null);
    const mobilePanelRef = useRef(null);
    const mobileItemsRef = useRef([]);

    useEffect(() => {
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

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!titleRef.current) return;
        const tween = gsap.to(titleRef.current, {
            backgroundPosition: '200% 50%',
            duration: 4,
            ease: 'none',
            repeat: -1
        });
        return () => tween.kill();
    }, []);

    useEffect(() => {
        const panel = mobilePanelRef.current;
        if (!panel) return;

        if (mobileOpen) {
            gsap.set(panel, { display: 'block' });
            gsap.fromTo(panel, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' });
            gsap.fromTo(
                mobileItemsRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, stagger: 0.05, duration: 0.28, ease: 'power2.out', delay: 0.05 }
            );
        } else {
            gsap.to(panel, {
                opacity: 0,
                y: -8,
                duration: 0.18,
                ease: 'power2.in',
                onComplete: () => gsap.set(panel, { display: 'none' })
            });
        }
    }, [mobileOpen]);

    const handleNavClick = (href) => {
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-2xl">
                <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 h-16 md:h-18 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => handleNavClick('#about')}
                        className="text-left"
                    >
                        <span
                            ref={titleRef}
                            className="text-base md:text-xl font-black tracking-wide text-transparent bg-clip-text"
                            style={{
                                fontFamily: 'var(--font-display)',
                                backgroundImage: `linear-gradient(90deg, #ffffff 0%, ${theme.primary} 40%, #ffffff 75%, ${theme.secondary} 100%)`,
                                backgroundSize: '200% 100%'
                            }}
                        >
                            RUDRANSH PORTFOLIO
                        </span>
                    </button>

                    <nav className="hidden md:flex items-center gap-1">
                        {SECTIONS.map((item) => {
                            const href = `#${item.id}`;
                            const isActive = activeSection === href;
                            return (
                                <button
                                    key={href}
                                    type="button"
                                    onClick={() => handleNavClick(href)}
                                    className="relative px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300"
                                    style={{
                                        color: isActive ? '#fff' : 'rgba(255,255,255,0.72)',
                                        background: isActive ? `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})` : 'transparent'
                                    }}
                                >
                                    <span>{item.label}</span>
                                    {!isActive && (
                                        <span
                                            className="absolute left-3 right-3 bottom-1 h-[2px] rounded-full origin-left scale-x-0 transition-transform duration-300 hover:scale-x-100"
                                            style={{ backgroundColor: theme.primary }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    <button
                        type="button"
                        onClick={() => setMobileOpen((v) => !v)}
                        className="md:hidden w-10 h-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center"
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                    >
                        <span className={`block w-4 h-4 relative transition-transform duration-300 ${mobileOpen ? 'rotate-45' : ''}`}>
                            <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[2px] rounded bg-white transition-transform duration-300 ${mobileOpen ? 'rotate-90' : ''}`} />
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[2px] rounded bg-white" />
                        </span>
                    </button>
                </div>
            </header>

            <div className="fixed top-16 left-3 right-3 z-50 md:hidden">
                <div
                    ref={mobilePanelRef}
                    className="rounded-2xl border border-white/15 bg-black/80 backdrop-blur-2xl p-2"
                    style={{ display: 'none' }}
                >
                    <div className="grid grid-cols-2 gap-2">
                        {SECTIONS.map((item, i) => {
                            const href = `#${item.id}`;
                            const isActive = activeSection === href;
                            return (
                                <button
                                    key={href}
                                    ref={(el) => (mobileItemsRef.current[i] = el)}
                                    type="button"
                                    onClick={() => handleNavClick(href)}
                                    className="rounded-xl px-3 py-2.5 text-sm font-semibold text-left"
                                    style={{
                                        color: '#fff',
                                        background: isActive
                                            ? `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`
                                            : 'rgba(255,255,255,0.06)'
                                    }}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
