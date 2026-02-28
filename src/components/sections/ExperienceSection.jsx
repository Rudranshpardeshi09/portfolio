import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { EXPERIENCE_DATA } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(
                    card,
                    { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
                    {
                        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
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
        <section id="experience" ref={sectionRef} className="section-container">
            <div className="section-inner">
                <div className="text-center mb-12">
                    <h2 className="section-title text-gradient mx-auto">Experience</h2>
                </div>

                {/* Timeline */}
                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical line */}
                    <div
                        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:transform md:-translate-x-1/2"
                        style={{
                            background: `linear-gradient(to bottom, transparent, ${theme.primary}, transparent)`,
                        }}
                    />

                    <div className="space-y-12">
                        {EXPERIENCE_DATA.map((exp, i) => (
                            <div
                                key={i}
                                ref={(el) => (cardsRef.current[i] = el)}
                                className={`relative flex flex-col md:flex-row items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div
                                    className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 z-10 animate-pulse-glow"
                                    style={{
                                        background: theme.primary,
                                        boxShadow: `0 0 15px rgba(${theme.primaryRgb}, 0.5)`,
                                    }}
                                />

                                {/* Content Card */}
                                <div
                                    className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                                        }`}
                                    style={{ borderColor: `rgba(${theme.primaryRgb}, 0.1)` }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span
                                            className="text-xs font-mono px-2 py-0.5 rounded-full"
                                            style={{
                                                background: `rgba(${theme.primaryRgb}, 0.15)`,
                                                color: theme.primary,
                                            }}
                                        >
                                            {exp.period}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-1">{exp.role}</h3>
                                    <p className="text-sm font-medium mb-3" style={{ color: theme.primary }}>
                                        {exp.company}
                                    </p>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.highlights.map((h) => (
                                            <span
                                                key={h}
                                                className="text-xs px-2.5 py-1 rounded-full bg-gray-800/50 text-gray-400 border border-gray-700/50"
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
