import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { SKILLS_DATA } from '../../data/portfolioData';
import { Code2, Settings, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const categoryRefs = useRef([]);
    const cardRefs = useRef([]);
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

            // Category headers slide in from left with expanding underline
            categoryRefs.current.forEach((catWrapper, i) => {
                if (!catWrapper) return;
                const header = catWrapper.querySelector('.cat-header');
                const underline = catWrapper.querySelector('.cat-underline');

                if (header) {
                    gsap.fromTo(header,
                        { opacity: 0, x: -80, rotateY: -15 },
                        {
                            opacity: 1, x: 0, rotateY: 0,
                            duration: 0.8, ease: 'power3.out',
                            scrollTrigger: {
                                trigger: catWrapper,
                                start: 'top 85%',
                                toggleActions: 'play none none reverse',
                            },
                        }
                    );
                }

                if (underline) {
                    gsap.fromTo(underline,
                        { scaleX: 0, transformOrigin: 'left' },
                        {
                            scaleX: 1,
                            duration: 1, ease: 'power2.out', delay: 0.3,
                            scrollTrigger: {
                                trigger: catWrapper,
                                start: 'top 85%',
                                toggleActions: 'play none none reverse',
                            },
                        }
                    );
                }
            });

            // Cards — 3D perspective rain effect
            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                const row = Math.floor(i / 5);
                const col = i % 5;

                gsap.fromTo(card,
                    {
                        opacity: 0,
                        rotateX: 60,
                        rotateY: (col - 2) * 10,
                        y: -100,
                        z: -200,
                        scale: 0.6,
                    },
                    {
                        opacity: 1,
                        rotateX: 0,
                        rotateY: 0,
                        y: 0,
                        z: 0,
                        scale: 1,
                        duration: 1,
                        ease: 'back.out(1.2)',
                        delay: (col * 0.08) + (row * 0.15),
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const getCategoryIcon = (catName) => {
        if (catName.includes('Frontend')) return <Code2 size={24} />;
        if (catName.includes('Backend')) return <Settings size={24} />;
        return <Terminal size={24} />;
    };

    let globalCardIndex = 0;

    return (
        <section id="skills" ref={sectionRef} className="section-container" style={{ perspective: '1200px' }}>
            <div className="section-inner">
                <div ref={titleRef} className="text-center mb-16">
                    <h2 className="section-title text-gradient inline-block">Skills & Arsenal</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Hover or tap the cards to reveal proficiency levels.
                    </p>
                </div>

                <div className="space-y-16 w-full" style={{ transformStyle: 'preserve-3d' }}>
                    {SKILLS_DATA.map((category, catIdx) => (
                        <div
                            key={category.category}
                            ref={(el) => (categoryRefs.current[catIdx] = el)}
                            className="w-full"
                        >
                            <div className="cat-header flex items-center gap-3 mb-8 pb-4 relative" style={{ perspective: '800px' }}>
                                <span className="text-3xl filter drop-shadow-md" style={{ color: theme.primary }}>
                                    {category.icon}
                                </span>
                                <h3 className="text-2xl font-bold text-white tracking-wide">{category.category}</h3>
                            </div>
                            <div
                                className="cat-underline h-[2px] mb-6 rounded-full"
                                style={{
                                    background: `linear-gradient(90deg, ${theme.primary}, transparent)`,
                                }}
                            />

                            {/* Cards Grid */}
                            <div
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                                style={{ perspective: '1000px' }}
                            >
                                {category.skills.map((skill) => {
                                    const cardIndex = globalCardIndex++;
                                    const safeLogoName = skill.name.toLowerCase().replace(/[^a-z0-9]/g, '');

                                    return (
                                        <div
                                            key={skill.name}
                                            ref={(el) => (cardRefs.current[cardIndex] = el)}
                                            className="flip-card h-36 w-full cursor-pointer group card-3d"
                                            style={{ transformStyle: 'preserve-3d' }}
                                        >
                                            <div className="flip-card-inner">
                                                {/* FRONT OF CARD */}
                                                <div
                                                    className="flip-card-front glass flex flex-col items-center justify-center p-4 transition-all"
                                                    style={{ borderBottom: `2px solid rgba(${theme.primaryRgb}, 0.3)` }}
                                                >
                                                    <div className="w-12 h-12 mb-3 flex items-center justify-center relative">
                                                        <object
                                                            data={`/tech logos/${safeLogoName}.svg`}
                                                            type="image/svg+xml"
                                                            className="w-full h-full object-contain"
                                                        >
                                                            <div className="text-gray-400 group-hover:text-white transition-colors">
                                                                {getCategoryIcon(category.category)}
                                                            </div>
                                                        </object>
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-semibold text-gray-300 text-center uppercase tracking-wider">
                                                        {skill.name}
                                                    </span>
                                                </div>

                                                {/* BACK OF CARD */}
                                                <div
                                                    className="flip-card-back glass-strong flex flex-col justify-center items-center p-5"
                                                    style={{
                                                        borderColor: `rgba(${theme.primaryRgb}, 0.5)`,
                                                        boxShadow: `0 0 20px rgba(${theme.primaryRgb}, 0.15) inset`
                                                    }}
                                                >
                                                    <span className="text-sm font-bold text-center mb-1">{skill.name}</span>
                                                    <span
                                                        className="text-2xl font-black mb-3"
                                                        style={{ color: theme.primary, fontFamily: 'var(--font-display)' }}
                                                    >
                                                        {skill.level}%
                                                    </span>
                                                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                width: `${skill.level}%`,
                                                                background: `linear-gradient(90deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                                                                boxShadow: `0 0 10px rgba(${theme.primaryRgb}, 0.5)`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
