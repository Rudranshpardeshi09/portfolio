import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { EXPERIENCE_DATA } from '../../data/portfolioData';
import Cubes from '../reactbits/Cubes';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const roadPathRef = useRef(null);
    const cardsRef = useRef([]);
    const markersRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title entry
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 50, rotateX: 30, filter: 'blur(10px)' },
                {
                    opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
                    duration: 1, ease: 'expo.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Road path draws on scroll
            if (roadPathRef.current) {
                const path = roadPathRef.current;
                const length = path.getTotalLength();
                gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
                gsap.to(path, {
                    strokeDashoffset: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                        end: 'bottom 40%',
                        scrub: 1,
                    },
                });
            }

            // Cards emerge from road markers with 3D transforms
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                const isLeft = i % 2 === 0;

                gsap.fromTo(card,
                    {
                        opacity: 0,
                        x: isLeft ? -120 : 120,
                        rotateY: isLeft ? -30 : 30,
                        scale: 0.7,
                        z: -100,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        scale: 1,
                        z: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

            // Markers pulse and glow on scroll
            markersRef.current.forEach((marker, i) => {
                if (!marker) return;
                gsap.fromTo(marker,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1, opacity: 1,
                        duration: 0.6,
                        ease: 'back.out(2)',
                        scrollTrigger: {
                            trigger: marker,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="section-container"
            style={{ perspective: '1200px' }}
        >
            <div className="section-inner">
                <div ref={titleRef} className="text-center mb-8 md:mb-14 relative z-10">
                    <h2 className="section-title text-gradient mx-auto">Experience</h2>
                    <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm">
                        The road I've traveled in my dev journey
                    </p>
                </div>

                {/* Cubes 3D Background */}
                <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-auto flex items-center justify-center overflow-hidden">
                    <div className="w-[150%] h-[150%] max-w-[1200px] flex items-center justify-center origin-center rotate-[15deg]">
                        <Cubes
                            gridSize={12}
                            faceColor={`rgba(${theme.primaryRgb}, 0.2)`}
                            rippleColor={`rgba(${theme.primaryRgb}, 0.8)`}
                            borderStyle={`1px solid rgba(${theme.primaryRgb}, 0.1)`}
                        />
                    </div>
                </div>

                {/* Timeline with SVG road */}
                <div className="relative max-w-3xl mx-auto z-10" style={{ transformStyle: 'preserve-3d' }}>
                    {/* SVG Road Path */}
                    <svg
                        className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 h-full"
                        width="40"
                        viewBox="0 0 40 600"
                        fill="none"
                        style={{ overflow: 'visible' }}
                    >
                        <path
                            ref={roadPathRef}
                            d="M 20 0 Q 35 100 20 200 Q 5 300 20 400 Q 35 500 20 600"
                            stroke={theme.primary}
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.6"
                        />
                        {/* Road dashes underneath */}
                        <path
                            d="M 20 0 Q 35 100 20 200 Q 5 300 20 400 Q 35 500 20 600"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="20"
                            strokeLinecap="round"
                            fill="none"
                        />
                    </svg>

                    <div className="space-y-10 md:space-y-14">
                        {EXPERIENCE_DATA.map((exp, i) => (
                            <div
                                key={i}
                                className={`relative flex flex-col md:flex-row items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Road marker */}
                                <div
                                    ref={(el) => (markersRef.current[i] = el)}
                                    className="absolute left-6 md:left-1/2 w-6 h-6 rounded-full transform -translate-x-1/2 z-10"
                                    style={{
                                        background: `radial-gradient(circle, ${theme.primary}, ${theme.secondary})`,
                                        boxShadow: `0 0 20px rgba(${theme.primaryRgb}, 0.5), 0 0 40px rgba(${theme.primaryRgb}, 0.2)`,
                                    }}
                                >
                                    {/* Inner pulse ring */}
                                    <div
                                        className="absolute inset-0 rounded-full animate-pulse-glow"
                                        style={{
                                            border: `2px solid rgba(${theme.primaryRgb}, 0.4)`,
                                            transform: 'scale(1.8)',
                                        }}
                                    />
                                </div>

                                {/* Content Card */}
                                <div
                                    ref={(el) => (cardsRef.current[i] = el)}
                                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] glass rounded-2xl p-4 md:p-6 transition-all duration-500 hover:scale-[1.02] group ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                                        }`}
                                    style={{
                                        borderColor: `rgba(${theme.primaryRgb}, 0.1)`,
                                        transformStyle: 'preserve-3d',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                    }}
                                >
                                    {/* Hover depth effect */}
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            background: `linear-gradient(135deg, rgba(${theme.primaryRgb}, 0.05), transparent)`,
                                        }}
                                    />

                                    <div className="flex items-center gap-2 mb-2 relative z-10">
                                        <span
                                            className="text-xs font-mono px-3 py-1 rounded-full"
                                            style={{
                                                background: `rgba(${theme.primaryRgb}, 0.15)`,
                                                color: theme.primary,
                                                boxShadow: `0 0 10px rgba(${theme.primaryRgb}, 0.1)`,
                                            }}
                                        >
                                            {exp.period}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-1 relative z-10">{exp.role}</h3>
                                    <p className="text-sm font-medium mb-3 relative z-10" style={{ color: theme.primary }}>
                                        {exp.company}
                                    </p>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4 relative z-10">{exp.description}</p>
                                    <div className="flex flex-wrap gap-2 relative z-10">
                                        {exp.highlights.map((h) => (
                                            <span
                                                key={h}
                                                className="text-xs px-2.5 py-1 rounded-full bg-gray-800/50 text-gray-400 border border-gray-700/50 transition-all duration-300 hover:border-gray-500"
                                            >
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
