import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { SKILLS_DATA } from '../../data/portfolioData';
import LogoLoop from '../reactbits/LogoLoop';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section title — glitch-in effect
            if (titleRef.current) {
                gsap.fromTo(titleRef.current,
                    { opacity: 0, scale: 1.5, filter: 'blur(20px)', rotateX: 45 },
                    {
                        opacity: 1, scale: 1, filter: 'blur(0px)', rotateX: 0,
                        duration: 1.2, ease: 'expo.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const menuItems = useMemo(() => {
        return SKILLS_DATA.flatMap(category =>
            category.skills.map(skill => {
                const safeLogoName = skill.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                return {
                    image: `/tech logos/${safeLogoName}.svg`,
                    link: '#',
                    title: skill.name,
                    description: `${skill.level}% Proficiency`
                };
            })
        );
    }, []);

    return (
        <section id="skills" ref={sectionRef} className="section-container relative z-10" style={{ perspective: '1200px' }}>
            <div className="section-inner h-full flex flex-col">
                <div ref={titleRef} className="text-center mb-10 pt-10">
                    <h2 className="section-title text-gradient inline-block" style={{ color: theme.primary }}>Skills & Arsenal</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Drag to rotate the 3D sphere. Tap a logo to select.
                    </p>
                </div>

                <div className="flex-1 w-full relative pt-10 px-4 md:px-0">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${theme.primary}, transparent 70%)` }} />

                    {/* Two rows of LogoLoop for varied display */}
                    <div className="mb-12">
                        <LogoLoop
                            logos={menuItems.slice(0, Math.ceil(menuItems.length / 2)).map(item => ({ src: item.image, alt: item.title, title: item.title }))}
                            speed={1.5}
                            logoHeight={50}
                            gap={50}
                            scaleOnHover={true}
                        />
                    </div>
                    <div>
                        <LogoLoop
                            logos={menuItems.slice(Math.ceil(menuItems.length / 2)).map(item => ({ src: item.image, alt: item.title, title: item.title }))}
                            speed={-1.5}
                            direction="right"
                            logoHeight={50}
                            gap={50}
                            scaleOnHover={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
