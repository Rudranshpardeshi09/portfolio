import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { SKILLS_DATA } from '../../data/portfolioData';
import InfiniteMenu from '../reactbits/InfiniteMenu';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section title — glitch-in effect
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 50, filter: 'blur(10px)' },
                {
                    opacity: 1, y: 0, filter: 'blur(0px)',
                    duration: 1.2, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const menuItems = useMemo(() => {
        const availableLogos = ['python', 'cpp', 'javascript', 'tensorflow', 'django'];

        return SKILLS_DATA.flatMap(category =>
            category.skills.map(skill => {
                const safeName = skill.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                const hasLogo = availableLogos.includes(safeName);

                // If logo doesn't exist, create a dynamic SVG data URI with the tech's initial
                const fallbackLogo = `data:image/svg+xml;base64,${btoa(`
                    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <rect width="512" height="512" rx="100" fill="rgba(20,20,20,0.9)" />
                        <text x="50%" y="55%" font-family="Arial, sans-serif" font-weight="900" font-size="250" fill="${theme.primary.replace('#', '%23')}" text-anchor="middle" dominant-baseline="middle">${skill.name.charAt(0)}</text>
                        <rect width="480" height="480" x="16" y="16" rx="84" fill="none" stroke="${theme.primary.replace('#', '%23')}" stroke-width="8" opacity="0.3" />
                    </svg>
                `)}`;

                return {
                    image: hasLogo ? `/tech-logos/${safeName}.png` : fallbackLogo,
                    link: '#',
                    title: skill.name,
                    description: category.category
                };
            })
        );
    }, [theme]);

    return (
        <section id="skills" ref={sectionRef} className="section-container relative z-10 min-h-[900px] flex flex-col justify-center overflow-hidden">
            <div className="section-inner h-full flex flex-col pt-20">
                <div ref={titleRef} className="text-center mb-10 relative z-20">
                    <h2 className="section-title text-gradient inline-block" style={{ color: theme.primary }}>Skills & Arsenal</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        A curated collection of technologies I use to build high-performance applications.
                        <span className="block mt-2 text-white/50 text-xs">Drag to explore the 3D arsenal.</span>
                    </p>
                </div>

                <div className="flex-1 w-full relative min-h-[600px] cursor-grab active:cursor-grabbing z-10">
                    <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${theme.primary}, transparent 70%)` }} />
                    <InfiniteMenu
                        items={menuItems}
                        onActiveItemChange={(item) => console.log('Active Skill:', item)}
                    />
                </div>
            </div>
        </section>
    );
}
