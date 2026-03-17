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
        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 769px)",
            isMobile: "(max-width: 768px)"
        }, (context) => {
            let { isDesktop, isMobile } = context.conditions;

            // Title animation
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 30, filter: 'blur(10px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );

            // Timeline rail animation
            if (railRef.current) {
                const length = railRef.current.getTotalLength();
                gsap.set(railRef.current, { strokeDasharray: length, strokeDashoffset: length });
                gsap.to(railRef.current, {
                    strokeDashoffset: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        end: 'bottom 20%',
                        scrub: 1.5,
                    },
                });
            }

            // Experience items animation
            itemRefs.current.forEach((item, index) => {
                if (!item) return;

                const fromLeft = index % 2 === 0;

                if (isDesktop) {
                    // Desktop: 3D "Dossier Panel" unfold from center spine
                    gsap.fromTo(
                        item,
                        {
                            opacity: 0,
                            rotationY: fromLeft ? 90 : -90,
                            rotationX: 15,
                            z: -300,
                            y: 100,
                            transformOrigin: fromLeft ? 'left center' : 'right center',
                        },
                        {
                            opacity: 1,
                            rotationY: 0,
                            rotationX: 0,
                            z: 0,
                            y: 0,
                            duration: 1.2,
                            ease: 'power4.out',
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 85%',
                                toggleActions: 'play none none reverse',
                            },
                        }
                    );
                } else {
                    // Mobile: "Slide-and-Scale-in" keeping content space safe from spine
                    gsap.fromTo(
                        item,
                        {
                            opacity: 0,
                            scale: 0.9,
                            x: 40,
                            rotationY: -15, // Subtle tilt away from line
                            y: 50,
                            transformOrigin: 'left center', // Rotate from spine side
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            rotationY: 0,
                            y: 0,
                            duration: 1,
                            ease: 'back.out(1.2)',
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 90%',
                                toggleActions: 'play none none reverse',
                            },
                        }
                    );
                }
            });
        }, sectionRef);

        return () => mm.revert();
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="section-container relative overflow-visible bg-transparent [perspective:2500px] py-32"
        >
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{ background: `radial-gradient(circle at 50% 15%, rgba(${theme.primaryRgb},0.15), transparent 60%)` }}
            />

            <div className="section-inner relative z-10 max-w-7xl mx-auto px-6">
                <div ref={titleRef} className="mx-auto max-w-3xl text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 md:text-xs">
                        Professional Journey
                    </p>
                    <h2 className="mt-4 text-5xl font-black uppercase tracking-tighter text-white sm:text-6xl md:text-7xl leading-none">
                        Impact Timeline
                    </h2>
                    <p className="mt-6 text-sm leading-7 text-white/50 md:text-base max-w-xl mx-auto">
                        A dynamic chronicle of technical achievements, architectural leadership, and scalable solution delivery.
                    </p>
                </div>

                <div className="relative mx-auto mt-24 w-full">
                    {/* Vertical Rail / Spine */}
                    <svg
                        className="pointer-events-none absolute left-6 top-0 h-full w-8 opacity-30 md:left-1/2 md:-translate-x-1/2"
                        viewBox="0 0 32 800"
                        fill="none"
                        preserveAspectRatio="none"
                    >
                        <path
                            ref={railRef}
                            d="M16 0 C30 130 2 270 16 400 C30 535 2 675 16 800"
                            stroke={theme.primary}
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </svg>

                    <div className="space-y-20 md:space-y-32">
                        {EXPERIENCE_DATA.map((exp, index) => {
                            const fromLeft = index % 2 === 0;

                            return (
                                <div
                                    key={`${exp.company}-${exp.role}`}
                                    className={`relative flex pl-16 md:pl-0 ${fromLeft ? 'md:justify-start' : 'md:justify-end'}`}
                                >
                                    {/* Spine Dot */}
                                    <div
                                        className="absolute left-6 top-10 z-20 h-5 w-5 rounded-full md:left-1/2 md:-translate-x-1/2"
                                        style={{
                                            background: theme.primary,
                                            boxShadow: `0 0 30px ${theme.primary}CC, 0 0 10px white`,
                                        }}
                                    />

                                    <article
                                        ref={(element) => {
                                            itemRefs.current[index] = element;
                                        }}
                                        className="relative w-full overflow-hidden rounded-[40px] border p-8 text-left md:w-[45%] md:p-10 transition-all duration-500 hover:border-white/20"
                                        style={{
                                            background: 'linear-gradient(165deg, rgba(20,20,20,0.95), rgba(40,40,40,0.4))',
                                            borderColor: `rgba(${theme.primaryRgb},0.15)`,
                                            boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 40px rgba(${theme.primaryRgb},0.05)`,
                                            transformStyle: 'preserve-3d',
                                        }}
                                    >
                                        {/* Color Accent Bar */}
                                        <div
                                            className="absolute inset-y-0 w-2"
                                            style={{
                                                [fromLeft ? 'right' : 'left']: 0,
                                                background: `linear-gradient(180deg, ${theme.primary}, transparent 90%)`,
                                            }}
                                        />

                                        <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
                                            <div className="flex items-center justify-between mb-6">
                                                <span
                                                    className="inline-flex rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white/80"
                                                    style={{
                                                        borderColor: `rgba(${theme.primaryRgb},0.3)`,
                                                        background: `rgba(${theme.primaryRgb},0.1)`,
                                                    }}
                                                >
                                                    {exp.period}
                                                </span>
                                            </div>

                                            <h3 className="text-3xl font-black leading-tight text-white md:text-4xl">
                                                {exp.role}
                                            </h3>
                                            <p className="mt-3 text-base font-bold uppercase tracking-[0.3em]" style={{ color: theme.primary }}>
                                                {exp.company}
                                            </p>

                                            <p className="mt-6 text-sm leading-7 text-white/60 md:text-lg">
                                                {exp.summary}
                                            </p>

                                            <div className="mt-8 space-y-4">
                                                {exp.achievements.map((achievement) => (
                                                    <div
                                                        key={achievement}
                                                        className="flex items-start gap-4 rounded-[24px] border border-white/5 bg-white/[0.02] px-5 py-4 hover:bg-white/[0.05] transition-colors"
                                                    >
                                                        <span
                                                            className="mt-2.5 h-2 w-2 shrink-0 rounded-full shadow-[0_0_10px_currentColor]"
                                                            style={{ backgroundColor: theme.primary, color: theme.primary }}
                                                        />
                                                        <p className="text-sm leading-7 text-white/80">{achievement}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-8 flex flex-wrap gap-3">
                                                {exp.highlights.map((highlight) => (
                                                    <span
                                                        key={highlight}
                                                        className="rounded-xl border border-white/5 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                                                    >
                                                        {highlight}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
