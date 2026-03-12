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
                { opacity: 0, y: 28, filter: 'blur(8px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 78%',
                    },
                }
            );

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
                        scrub: 1,
                    },
                });
            }

            itemRefs.current.forEach((item, index) => {
                if (!item) return;

                const fromLeft = index % 2 === 0;

                gsap.fromTo(
                    item,
                    {
                        opacity: 0,
                        rotationY: fromLeft ? 86 : -86,
                        rotationX: 10,
                        z: -260,
                        y: 70,
                        transformOrigin: fromLeft ? 'left center' : 'right center',
                    },
                    {
                        opacity: 1,
                        rotationY: 0,
                        rotationX: 0,
                        z: 0,
                        y: 0,
                        duration: 1.05,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 84%',
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
            className="section-container relative overflow-visible bg-transparent [perspective:2200px]"
            style={{ paddingTop: 'clamp(3.5rem, 6vw, 5rem)' }}
        >
            <div
                className="absolute inset-0 pointer-events-none opacity-15"
                style={{ background: `radial-gradient(circle at 50% 18%, rgba(${theme.primaryRgb},0.2), transparent 55%)` }}
            />

            <div className="section-inner relative z-10">
                <div ref={titleRef} className="mx-auto max-w-3xl text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-white/35 md:text-xs">
                        Experience
                    </p>
                    <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
                        Impact Timeline
                    </h2>
                    <p className="mt-5 text-sm leading-7 text-white/55 md:text-base">
                        Each role unfolds from the spine like a dossier panel, with resume metrics broken into readable achievement lines.
                    </p>
                </div>

                <div className="relative mx-auto mt-8 w-full max-w-6xl">
                    <svg
                        className="pointer-events-none absolute left-5 top-0 h-full w-8 opacity-35 md:left-1/2 md:-translate-x-1/2"
                        viewBox="0 0 32 800"
                        fill="none"
                        preserveAspectRatio="none"
                    >
                        <path
                            ref={railRef}
                            d="M16 0 C30 130 2 270 16 400 C30 535 2 675 16 800"
                            stroke={theme.primary}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                        />
                    </svg>

                    <div className="space-y-14 md:space-y-20">
                        {EXPERIENCE_DATA.map((exp, index) => {
                            const fromLeft = index % 2 === 0;

                            return (
                                <div
                                    key={`${exp.company}-${exp.role}`}
                                    className={`relative flex pl-12 md:pl-0 ${fromLeft ? 'md:justify-start' : 'md:justify-end'}`}
                                >
                                    <div
                                        className="absolute left-5 top-10 z-20 h-4 w-4 rounded-full md:left-1/2 md:-translate-x-1/2"
                                        style={{
                                            background: theme.primary,
                                            boxShadow: `0 0 20px ${theme.primary}99`,
                                        }}
                                    />

                                    <article
                                        ref={(element) => {
                                            itemRefs.current[index] = element;
                                        }}
                                        className="relative w-full overflow-hidden rounded-[32px] border p-6 text-left sm:p-8 md:w-[46%] md:p-9"
                                        style={{
                                            background: 'linear-gradient(160deg, rgba(14,14,14,0.86), rgba(255,255,255,0.03))',
                                            borderColor: `rgba(${theme.primaryRgb},0.18)`,
                                            boxShadow: `0 26px 60px rgba(0,0,0,0.36), 0 0 24px rgba(${theme.primaryRgb},0.08)`,
                                            transformStyle: 'preserve-3d',
                                        }}
                                    >
                                        <div
                                            className="absolute inset-y-0 w-1.5"
                                            style={{
                                                [fromLeft ? 'right' : 'left']: 0,
                                                background: `linear-gradient(180deg, ${theme.primary}, transparent 78%)`,
                                            }}
                                        />

                                        <div className="relative z-10" style={{ transform: 'translateZ(70px)' }}>
                                            <span
                                                className="inline-flex rounded-full border px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-white/75"
                                                style={{
                                                    borderColor: `rgba(${theme.primaryRgb},0.22)`,
                                                    background: `rgba(${theme.primaryRgb},0.12)`,
                                                }}
                                            >
                                                {exp.period}
                                            </span>

                                            <h3 className="mt-5 text-2xl font-black leading-tight text-white md:text-3xl">
                                                {exp.role}
                                            </h3>
                                            <p className="mt-2 text-sm font-bold uppercase tracking-[0.25em]" style={{ color: theme.primary }}>
                                                {exp.company}
                                            </p>

                                            <p className="mt-5 text-sm leading-7 text-white/72 md:text-base">
                                                {exp.summary}
                                            </p>

                                            <div className="mt-6 space-y-3">
                                                {exp.achievements.map((achievement) => (
                                                    <div
                                                        key={achievement}
                                                        className="flex items-start gap-3 rounded-[22px] border px-4 py-4"
                                                        style={{
                                                            borderColor: 'rgba(255,255,255,0.08)',
                                                            background: 'rgba(255,255,255,0.03)',
                                                        }}
                                                    >
                                                        <span
                                                            className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                                                            style={{ backgroundColor: theme.primary }}
                                                        />
                                                        <p className="text-sm leading-7 text-white/82">{achievement}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-6 flex flex-wrap gap-2.5">
                                                {exp.highlights.map((highlight) => (
                                                    <span
                                                        key={highlight}
                                                        className="rounded-xl border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/88"
                                                        style={{
                                                            borderColor: 'rgba(255,255,255,0.08)',
                                                            background: 'rgba(255,255,255,0.04)',
                                                        }}
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
