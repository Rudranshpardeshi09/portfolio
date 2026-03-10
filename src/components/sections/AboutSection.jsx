import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_DATA } from '../../data/portfolioData';
import DecayCard from '../reactbits/DecayCard';
import TiltedCard from '../reactbits/TiltedCard';
import VariableProximity from '../reactbits/VariableProximity';
import RotatingText from '../reactbits/RotatingText';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
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
                            <TiltedCard
                                maxRotateX={28}
                                maxRotateY={28}
                                scaleOnHover={1.1}
                                className="w-[280px] h-[360px] sm:w-[330px] sm:h-[430px] lg:w-[420px] lg:h-[520px] rounded-3xl p-4 mx-auto flex items-center justify-center transition-all duration-700"
                            >
                                <div
                                    className="w-full h-full rounded-3xl p-4"
                                    style={{
                                        background: `conic-gradient(from 180deg, rgba(255,255,255,0.1), rgba(0,0,0,0.5), rgba(255,255,255,0.1), rgba(0,0,0,0.5), rgba(255,255,255,0.1))`,
                                        boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(var(--color-primary-rgb), 0.1)`,
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    <div className="w-full h-full rounded-2xl overflow-hidden border-[8px] border-gray-800 animate-float relative shadow-inner">
                                        <DecayCard width="100%" height="100%" image="/my-pfp/pfp.jpg" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                    </div>
                                </div>
                            </TiltedCard>
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
                    <div ref={textRef} className="lg:w-[55%] flex flex-col justify-center px-4 sm:px-2 lg:px-0" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="w-full glass-strong px-4 py-8 sm:px-8 sm:py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 xl:px-14 xl:py-14 rounded-[28px] md:rounded-[36px] border border-white/10 relative overflow-hidden group/card shadow-2xl transition-all duration-500 hover:shadow-white/5"
                            style={{
                                background: 'rgba(20, 20, 20, 0.75)',
                                backdropFilter: 'blur(30px) saturate(150%)',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                transformStyle: 'preserve-3d',
                            }}>
                            {/* Heading */}
                            <div className="relative mb-12 md:mb-16 lg:mb-20 inline-block">
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
                                <div className="h-1 w-20 md:w-24 mt-3" style={{ background: 'var(--color-primary)' }} />
                            </div>

                            <div className="px-2 pt-8 pb-2 sm:px-4 sm:pt-4 sm:pb-3 md:px-6 md:pt-5 md:pb-4 lg:px-8 lg:pt-8 lg:pb-5 mb-8 md:mb-10">
                                <p className="mb-4 md:mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-white/45 md:text-xs">
                                    Intelligent Products. Full-Stack Delivery.
                                </p>
                                <h3
                                    className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.7rem] font-black text-white leading-tight md:leading-[1.15] font-display tracking-tight"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    I build as an{' '}
                                    <span className="text-white">
                                        <RotatingText
                                            texts={['Full Stack Developer', 'AI/ML Engineer', 'MCA Candidate']}
                                        />
                                    </span>
                                </h3>
                            </div>

                            <div className="space-y-6 md:space-y-7 px-2 sm:px-4 md:px-6 lg:px-8">
                                <VariableProximity
                                    text={ABOUT_DATA.bio}
                                    radius={190}
                                    className="text-white/90 text-base md:text-lg lg:text-xl leading-8 md:leading-9 lg:leading-10 font-medium tracking-tight"
                                />
                                <p className="text-white/70 text-sm md:text-base lg:text-lg leading-7 md:leading-8 font-light italic">
                                    {ABOUT_DATA.bio2}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-7 mt-10 md:mt-12 px-2 sm:px-4 md:px-6">
                                {ABOUT_DATA.stats.map((stat, i) => (
                                    <div
                                        key={stat.label}
                                        ref={(el) => (statsRef.current[i] = el)}
                                        className="px-3 py-4 md:px-4 md:py-5 text-center border-l border-white/10 hover:border-white transition-all duration-300 group/stat"
                                    >
                                        <div
                                            className="text-3xl md:text-[2rem] font-black mb-1.5 text-white group-hover/stat:text-gradient transition-all"
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
