import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { ABOUT_DATA } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                imageRef.current,
                { opacity: 0, x: -80, scale: 0.9 },
                {
                    opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', end: 'top 25%', toggleActions: 'play none none reverse' },
                }
            );
            gsap.fromTo(
                textRef.current,
                { opacity: 0, x: 80 },
                {
                    opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', end: 'top 25%', toggleActions: 'play none none reverse' },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="section-container">
            <div className="section-inner">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    {/* Image Left */}
                    <div ref={imageRef} className="flex-shrink-0">
                        <div className="relative">
                            {/* Tire frame around image */}
                            <div
                                className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full p-2 mx-auto"
                                style={{
                                    background: `conic-gradient(from 0deg, ${theme.primary}, #333, ${theme.primary}, #333, ${theme.primary})`,
                                    boxShadow: `0 0 40px rgba(${theme.primaryRgb}, 0.2)`,
                                }}
                            >
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden border-4 border-gray-700 animate-float">
                                    <img
                                        src="/my-pfp/pfp.jpg"
                                        alt="Rudransh"
                                        className="w-full h-full object-cover mix-blend-overlay opacity-90 transition-all hover:scale-110 duration-700"
                                    />
                                </div>
                            </div>
                            {/* Decorative ring */}
                            <div
                                className="absolute -inset-3 rounded-full border border-dashed opacity-30 animate-[spin_20s_linear_infinite]"
                                style={{ borderColor: theme.primary }}
                            />
                        </div>
                    </div>

                    {/* Text Right */}
                    <div ref={textRef} className="flex-1">
                        <h2 className="section-title text-gradient">About Me</h2>
                        <h3
                            className="text-xl sm:text-2xl font-semibold mb-4 mt-6"
                            style={{ color: theme.primary }}
                        >
                            {ABOUT_DATA.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-4">{ABOUT_DATA.bio}</p>
                        <p className="text-gray-500 leading-relaxed mb-8">{ABOUT_DATA.bio2}</p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {ABOUT_DATA.stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="glass rounded-xl p-4 text-center transition-all duration-300 hover:scale-105"
                                    style={{
                                        borderColor: `rgba(${theme.primaryRgb}, 0.15)`,
                                    }}
                                >
                                    <div
                                        className="text-2xl font-bold mb-1"
                                        style={{ color: theme.primary, fontFamily: 'var(--font-display)' }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-gray-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
