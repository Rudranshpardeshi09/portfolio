import { useEffect, useState } from 'react';
import useThemeStore from '../../store/themeStore';
import { SECTIONS } from '../../data/portfolioData';
import PillNav from '../reactbits/PillNav';

export default function Navbar() {
    const { theme } = useThemeStore();
    const [activeSection, setActiveSection] = useState('#about');
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

    const items = SECTIONS.map((section) => ({
        label: section.label,
        href: `#${section.id}`
    }));

    return (
  <div
    className={`fixed top-4 left-4 w-full z-50 flex items-center justify-center transition-all duration-400 ${
      scrolled ? "opacity-95 scale-[0.98]" : "opacity-100 scale-100"
    }`}
  >
    <div className="mx-auto flex justify-space-between w-full max-w-4xl px-4">
      <PillNav
        logo={theme.image || "/bike-sideways/duccati-icon.png"}
        logoAlt={theme.name}
        items={items}
        activeHref={activeSection}
        baseColor={theme.primary}
        pillColor="rgba(8,8,8,0.86)"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#ffffff"
      />
    </div>
  </div>
);
}
