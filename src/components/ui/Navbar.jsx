import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import useThemeStore from '../../store/themeStore';
import { SECTIONS } from '../../data/portfolioData';
import PillNav from '../reactbits/PillNav';

export default function Navbar() {
    const { theme } = useThemeStore();
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('#home');
    const [mobileOpen, setMobileOpen] = useState(false);
    const mobilePanelRef = useRef(null);
    const mobileItemRefs = useRef([]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
                });
            },
            { threshold: 0.35 }
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

    useEffect(() => {
        const panel = mobilePanelRef.current;
        if (!panel) return;

        if (mobileOpen) {
            gsap.set(panel, { display: 'block' });
            gsap.fromTo(
                panel,
                { opacity: 0, y: -20, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' }
            );

            gsap.fromTo(
                mobileItemRefs.current,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, stagger: 0.06, duration: 0.3, ease: 'power2.out', delay: 0.08 }
            );
        } else {
            gsap.to(panel, {
                opacity: 0,
                y: -10,
                scale: 0.98,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => gsap.set(panel, { display: 'none' })
            });
        }
    }, [mobileOpen]);

    const items = SECTIONS.map((sec) => ({
        label: sec.label,
        href: `#${sec.id}`
    }));

    const handleMobileItemClick = (href) => {
        setMobileOpen(false);
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <div className={`fixed top-4 left-0 right-0 z-50 justify-center transition-all duration-500 hidden md:flex ${scrolled ? 'opacity-90 scale-95' : 'opacity-100 scale-100'}`}>
                <PillNav
                    logo={theme.image || '/bike-sideways/duccati-icon.png'}
                    logoAlt={theme.name}
                    items={items}
                    activeHref={activeSection}
                    baseColor={theme.primary}
                    pillColor={`rgba(${theme.primaryRgb}, 0.2)`}
                    hoveredPillTextColor="#ffffff"
                    pillTextColor="#ffffff"
                />
            </div>

            <div className="fixed top-4 left-4 right-4 z-50 md:hidden">
                <div className="flex items-center justify-between rounded-2xl px-3 py-2 backdrop-blur-xl border border-white/10 bg-black/55">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-white/10">
                            <img src={theme.image} alt={theme.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-semibold text-white/90">Rudransh&apos;s Garage</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setMobileOpen((v) => !v)}
                        className="w-9 h-9 rounded-xl border border-white/20 bg-white/10 text-white flex items-center justify-center transition-transform duration-300 active:scale-95"
                        aria-label="Toggle mobile menu"
                        aria-expanded={mobileOpen}
                    >
                        <span className={`block w-4 h-4 relative ${mobileOpen ? 'rotate-45' : ''} transition-transform duration-300`}>
                            <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-white rounded transition-all duration-300 ${mobileOpen ? 'rotate-90' : ''}`} />
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-white rounded" />
                        </span>
                    </button>
                </div>

                <div
                    ref={mobilePanelRef}
                    className="mt-3 rounded-2xl border border-white/15 bg-black/75 backdrop-blur-2xl p-2"
                    style={{ display: 'none' }}
                >
                    <div className="grid grid-cols-2 gap-2">
                        {items.map((item, i) => (
                            <button
                                key={item.href}
                                ref={(el) => (mobileItemRefs.current[i] = el)}
                                type="button"
                                onClick={() => handleMobileItemClick(item.href)}
                                className={`rounded-xl px-3 py-3 text-sm font-semibold text-left transition-all duration-300 ${activeSection === item.href ? 'text-white' : 'text-white/80'}`}
                                style={{
                                    background: activeSection === item.href
                                        ? `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`
                                        : 'rgba(255,255,255,0.06)'
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
