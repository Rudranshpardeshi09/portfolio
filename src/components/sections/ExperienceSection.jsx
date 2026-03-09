import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { EXPERIENCE_DATA } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const railRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 30, filter: 'blur(8px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 78%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            if (railRef.current) {
                const len = railRef.current.getTotalLength();
                gsap.set(railRef.current, { strokeDasharray: len, strokeDashoffset: len });
                gsap.to(railRef.current, {
                    strokeDashoffset: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 65%',
                        end: 'bottom 35%',
                        scrub: 1
                    }
                });
            }

            itemRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 45, rotateX: 14, x: i % 2 === 0 ? -20 : 20 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        x: 0,
                        duration: 0.9,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 82%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" ref={sectionRef} className="section-container relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 20%, rgba(${theme.primaryRgb},0.25), transparent 60%)` }}
            />

            <div className="section-inner relative z-10">
                <div ref={titleRef} className="text-center mb-10 md:mb-14">
                    <h2 className="section-title text-gradient mx-auto">Experience</h2>
                    <p className="text-gray-400 mt-4 text-sm md:text-base">Roles that shaped my AI/ML engineering direction.</p>
                </div>

                <div className="relative max-w-5xl mx-auto w-full">
                    <svg
                        className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-8"
                        viewBox="0 0 32 760"
                        fill="none"
                        preserveAspectRatio="none"
                    >
                        <path
                            ref={railRef}
                            d="M16 0 C30 110 2 220 16 330 C30 440 2 550 16 660 C26 705 16 740 16 760"
                            stroke={theme.primary}
                            strokeWidth="3"
                            strokeLinecap="round"
                            opacity="0.8"
                        />
                    </svg>

                    <div className="space-y-8 md:space-y-10">
                        {EXPERIENCE_DATA.map((exp, i) => (
                            <div
                                key={`${exp.company}-${exp.period}`}
                                ref={(el) => (itemRefs.current[i] = el)}
                                className={`relative flex ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} pl-12 md:pl-0`}
                            >
                                <div
                                    className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-6 w-4 h-4 rounded-full"
                                    style={{
                                        background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                                        boxShadow: `0 0 16px rgba(${theme.primaryRgb},0.55)`
                                    }}
                                />

                                <article
                                    className="glass rounded-[24px] p-5 md:p-6 w-full md:w-[46%] relative overflow-hidden"
                                    style={{
                                        borderColor: `rgba(${theme.primaryRgb},0.18)`,
                                        boxShadow: `0 14px 34px rgba(0,0,0,0.35), 0 0 20px rgba(${theme.primaryRgb},0.1)`
                                    }}
                                >
                                    <div className="absolute -top-10 -right-12 w-32 h-32 rounded-full blur-2xl opacity-30" style={{ background: theme.primary }} />
                                    <div className="relative z-10">
                                        <span
                                            className="inline-block text-xs px-3 py-1 rounded-full mb-3 font-semibold"
                                            style={{
                                                color: '#fff',
                                                background: `rgba(${theme.primaryRgb}, 0.26)`,
                                                border: `1px solid rgba(${theme.primaryRgb},0.35)`
                                            }}
                                        >
                                            {exp.period}
                                        </span>
                                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                        <p className="text-sm mt-1 mb-3 font-semibold" style={{ color: theme.primary }}>{exp.company}</p>
                                        <p className="text-gray-300 text-sm leading-relaxed mb-4">{exp.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.highlights.map((h) => (
                                                <span
                                                    key={h}
                                                    className="text-xs px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.04] text-white/85"
                                                >
                                                    {h}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
