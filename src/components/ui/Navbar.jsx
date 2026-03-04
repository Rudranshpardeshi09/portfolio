import { useState, useEffect } from 'react';
import useThemeStore from '../../store/themeStore';
import { SECTIONS } from '../../data/portfolioData';
import PillNav from '../reactbits/PillNav';

export default function Navbar() {
    const { theme } = useThemeStore();
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('#home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`);
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

    const items = SECTIONS.map(sec => ({
        label: sec.label,
        href: `#${sec.id}`
    }));

    return (
        <div className={`fixed top-4 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? 'opacity-90 scale-95' : 'opacity-100 scale-100'
            }`}>
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
    );
}
