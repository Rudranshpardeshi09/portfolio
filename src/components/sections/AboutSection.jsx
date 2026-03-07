import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { ABOUT_DATA } from '../../data/portfolioData';
import DecayCard from '../reactbits/DecayCard';
import ModelViewer from '../reactbits/ModelViewer';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const statsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image — 3D tilt entry
            gsap.fromTo(imageRef.current,
                { opacity: 0, x: -120, rotateY: -30, scale: 0.8, z: -100 },
                {
                    opacity: 1, x: 0, rotateY: 0, scale: 1, z: 0,
                    duration: 1.2, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        end: 'top 25%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Text card — perspective fly-in
            gsap.fromTo(textRef.current,
                { opacity: 0, x: 120, rotateY: 20, scale: 0.85 },
                {
                    opacity: 1, x: 0, rotateY: 0, scale: 1,
                    duration: 1.2, ease: 'power3.out', delay: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        end: 'top 25%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Stats counter animation
            statsRef.current.forEach((stat, i) => {
                if (!stat) return;
                gsap.fromTo(stat,
                    { opacity: 0, y: 30, scale: 0.8 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.6, ease: 'back.out(1.5)',
                        delay: 0.5 + i * 0.1,
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 70%',
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
            id="about"
            ref={sectionRef}
            className="section-container"
            style={{ perspective: '1200px' }}
        >
            <div className="section-inner">
                <div
                    className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-6 md:py-10 w-full"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Image Left */}
                    <div
                        ref={imageRef}
                        className="lg:w-1/2 flex justify-center items-center"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="relative group">
                            <div
                                className="w-[280px] h-[360px] sm:w-[330px] sm:h-[430px] lg:w-[420px] lg:h-[520px] rounded-3xl p-4 mx-auto flex items-center justify-center transition-all duration-700"
                                style={{
                                    background: `conic-gradient(from 180deg, rgba(255,255,255,0.1), rgba(0,0,0,0.5), rgba(255,255,255,0.1), rgba(0,0,0,0.5), rgba(255,255,255,0.1))`,
                                    boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(var(--color-primary-rgb), 0.1)`,
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                <div className="w-full h-full rounded-2xl overflow-hidden border-[8px] border-gray-800 animate-float relative shadow-inner">
                                    <DecayCard width="100%" height="100%" image="/my-pfp/pfp.jpg">
                                    </DecayCard>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                </div>
                            </div>
                            {/* Decorative framing */}
                            <div
                                className="absolute -inset-4 rounded-3xl border border-white/20 opacity-50"
                                style={{ borderStyle: 'double', borderWidth: '4px' }}
                            />
                            {/* Depth glow behind image */}
                            <div
                                className="absolute inset-0 rounded-full opacity-30 blur-3xl pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle, rgba(var(--color-primary-rgb), 0.3), transparent)`,
                                    transform: 'translateZ(-50px) scale(1.3)',
                                }}
                            />
                        </div>
                    </div>

                    {/* Text Right */}
                    <div ref={textRef} className="lg:w-[55%] flex flex-col justify-center" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="w-full glass-strong p-6 md:p-8 lg:p-10 rounded-[28px] md:rounded-[36px] border-white/10 relative overflow-hidden group/card shadow-2xl transition-all duration-500 hover:shadow-white/5"
                            style={{
                                background: 'rgba(20, 20, 20, 0.75)',
                                backdropFilter: 'blur(30px) saturate(150%)',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                transformStyle: 'preserve-3d',
                            }}>
                            {/* Heading */}
                            <div className="relative mb-7 md:mb-10 inline-block">
                                <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter"
                                    style={{
                                        WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                                        color: 'transparent',
                                    }}>
                                    About Me
                                </h2>
                                <h2 className="absolute top-0 left-0 text-4xl lg:text-6xl font-black uppercase tracking-tighter"
                                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', color: 'var(--color-primary)' }}>
                                    About Me
                                </h2>
                                <div className="h-1 w-20 mt-2" style={{ background: 'var(--color-primary)' }} />
                            </div>

                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6 md:mb-8 text-white leading-tight font-display tracking-tight"
                                style={{ fontFamily: 'var(--font-display)' }}>
                                {ABOUT_DATA.title}
                            </h3>

                            <div className="space-y-5">
                                <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed font-medium tracking-tight">
                                    {ABOUT_DATA.bio}
                                </p>
                                <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed font-light italic">
                                    {ABOUT_DATA.bio2}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-10">
                                {ABOUT_DATA.stats.map((stat, i) => (
                                    <div
                                        key={stat.label}
                                        ref={(el) => (statsRef.current[i] = el)}
                                        className="p-4 text-center border-l border-white/10 hover:border-white transition-all duration-300 group/stat"
                                    >
                                        <div
                                            className="text-3xl font-black mb-1 text-white group-hover/stat:text-gradient transition-all"
                                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.05em' }}
                                        >
                                            {stat.value}
                                        </div>
                                        <div className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em]">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
