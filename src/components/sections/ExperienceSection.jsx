import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CalendarRange, Sparkles, X } from 'lucide-react';
import useThemeStore from '../../store/themeStore';
import { EXPERIENCE_DATA } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

function ExperienceCertificateModal({ cert, onClose }) {
    const details = useMemo(
        () => [
            { label: 'Certificate', value: cert.title },
            { label: 'Issuer', value: cert.issuer },
            { label: 'Area', value: cert.category },
            { label: 'Year', value: cert.year },
        ],
        [cert],
    );

    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] overflow-y-auto bg-[rgba(4,4,6,0.9)] px-3 py-5 backdrop-blur-2xl sm:px-5 sm:py-6"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-label={`${cert.title} certificate preview`}
        >
            <div className="flex min-h-full items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="relative grid w-full max-w-[1240px] overflow-hidden rounded-[30px] border border-white/10 bg-[#09090c] shadow-[0_40px_120px_rgba(0,0,0,0.55)] lg:grid-cols-[300px_minmax(0,1fr)]"
                    onClick={(event) => event.stopPropagation()}
                >
                    <aside className="relative flex flex-col justify-between border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 sm:p-6 lg:border-b-0 lg:border-r">
                        <div className="space-y-5">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/35">
                                    Certificate Review
                                </p>
                                <h3 className="mt-2 pr-10 text-[1.95rem] font-semibold leading-[1.05] text-white">
                                    {cert.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-white/55">
                                    Full certificate preview for the internship credential attached to this experience entry.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2">
                                {details.map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3.5"
                                    >
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
                                            {item.label}
                                        </p>
                                        <p className="mt-1.5 text-sm font-medium leading-snug text-white/88">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="mt-6 rounded-[24px] border px-4 py-4"
                            style={{
                                borderColor: `${cert.color}40`,
                                background: `linear-gradient(180deg, ${cert.color}18, rgba(255,255,255,0.02))`,
                            }}
                        >
                            <p className="text-sm font-semibold text-white">
                                Verified internship credential
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-white/60">
                                Use the close button or press Escape to return to the experience timeline.
                            </p>
                        </div>
                    </aside>

                    <div className="relative bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)] p-2.5 sm:p-4 lg:p-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/75 transition hover:bg-white hover:text-black sm:right-4 sm:top-4"
                            aria-label={`Close ${cert.title} certificate preview`}
                        >
                            <X size={16} strokeWidth={2.2} />
                        </button>
                        <div className="flex max-h-[calc(100vh-2.5rem)] min-h-[400px] items-center justify-center overflow-auto rounded-[26px] border border-white/8 bg-[#050505] p-1.5 shadow-inner sm:min-h-[500px] sm:p-2.5 lg:min-h-[540px]">
                            <img
                                src={cert.image}
                                alt={cert.title}
                                className="block h-auto max-h-full w-auto max-w-full rounded-[22px] bg-white object-contain shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function ExperienceSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const railRef = useRef(null);
    const itemRefs = useRef([]);
    const [activeCertificate, setActiveCertificate] = useState(null);

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
            className="section-container relative overflow-visible bg-transparent [perspective:2500px] py-32 md:py-40 lg:py-48"
        >
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-15"
                    style={{ background: `radial-gradient(circle at 50% 12%, rgba(${theme.primaryRgb},0.2), transparent 58%)` }}
                />
                <div
                    className="absolute left-1/2 top-28 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-[150px]"
                    style={{ background: `rgba(${theme.primaryRgb},0.12)` }}
                />
            </div>
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{ background: `radial-gradient(circle at 50% 15%, rgba(${theme.primaryRgb},0.15), transparent 60%)` }}
            />

            <div className="section-inner relative z-10 mx-auto max-w-[1520px] px-6 md:px-12 lg:px-20">
                <div ref={titleRef} className="mx-auto flex max-w-4xl flex-col items-center text-center">
                    <div
                        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-white/55"
                        style={{
                            borderColor: `rgba(${theme.primaryRgb},0.28)`,
                            background: `rgba(${theme.primaryRgb},0.1)`,
                            boxShadow: `0 0 30px rgba(${theme.primaryRgb},0.08)`,
                        }}
                    >
                        <Sparkles size={12} />
                        Professional Journey
                    </div>
                    <h2 className="mt-6 text-5xl font-black uppercase tracking-[-0.08em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.92]">
                        Impact Timeline
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-7 text-white/55 md:text-base">
                        A dynamic chronicle of technical achievements, architectural leadership, and scalable solution delivery.
                    </p>
                    <div
                        className="mt-8 h-px w-28 rounded-full"
                        style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }}
                    />
                </div>

                <div className="relative mx-auto mt-20 w-full md:mt-24">
                    {/* Vertical Rail / Spine */}
                    <svg
                        className="pointer-events-none absolute left-6 top-0 h-full w-8 opacity-50 md:left-1/2 md:-translate-x-1/2"
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

                    <div
                        className="pointer-events-none absolute left-6 top-0 h-full w-px md:left-1/2 md:-translate-x-1/2"
                        style={{ background: `linear-gradient(180deg, transparent, rgba(${theme.primaryRgb},0.3), transparent)` }}
                    />

                    <div className="space-y-18 md:space-y-24 lg:space-y-28">
                        {EXPERIENCE_DATA.map((exp, index) => {
                            const fromLeft = index % 2 === 0;

                            return (
                                <div
                                    key={`${exp.company}-${exp.role}`}
                                    className={`relative flex pl-16 md:pl-0 ${fromLeft ? 'md:justify-start' : 'md:justify-end'}`}
                                >
                                    <div
                                        className={`pointer-events-none absolute left-6 top-12 hidden h-px w-[8.5%] opacity-80 md:block ${fromLeft ? 'md:left-[calc(50%-8.5%)]' : 'md:left-1/2'}`}
                                        style={{
                                            background: `linear-gradient(${fromLeft ? '90deg' : '270deg'}, rgba(${theme.primaryRgb},0.9), transparent)`,
                                        }}
                                    />
                                    {/* Spine Dot */}
                                    <div
                                        className="absolute left-6 top-10 z-20 h-5 w-5 rounded-full md:left-1/2 md:-translate-x-1/2"
                                        style={{
                                            background: theme.primary,
                                            boxShadow: `0 0 0 8px rgba(${theme.primaryRgb},0.08), 0 0 24px ${theme.primary}CC, 0 0 8px white`,
                                        }}
                                    />

                                    <article
                                        ref={(element) => {
                                            itemRefs.current[index] = element;
                                        }}
                                        className="group relative w-full overflow-hidden rounded-[36px] border p-7 text-left md:w-[44%] md:p-9 lg:w-[45%] lg:p-10 transition-all duration-500 hover:-translate-y-1 hover:border-white/20"

                                        style={{
                                            background: `linear-gradient(165deg, rgba(11,11,11,0.96), rgba(${theme.primaryRgb},0.08) 120%)`,
                                            borderColor: `rgba(${theme.primaryRgb},0.22)`,
                                            boxShadow: `0 28px 80px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 30px rgba(${theme.primaryRgb},0.06)`,
                                            transformStyle: 'preserve-3d',
                                        }}
                                    >
                                        <div
                                            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                            style={{ background: `radial-gradient(circle at ${fromLeft ? '0%' : '100%'} 0%, rgba(${theme.primaryRgb},0.18), transparent 55%)` }}
                                        />
                                        {/* Color Accent Bar */}
                                        <div
                                            className="absolute inset-x-0 top-0 h-px"
                                            style={{
                                                background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
                                            }}
                                        />

                                        <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
                                            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                                                <span
                                                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/80"
                                                    style={{
                                                        borderColor: `rgba(${theme.primaryRgb},0.3)`,
                                                        background: `rgba(${theme.primaryRgb},0.1)`,
                                                    }}
                                                >
                                                    <CalendarRange size={12} />
                                                    {exp.period}
                                                </span>
                                                <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
                                                    <ArrowUpRight size={12} />
                                                    Experience Node {String(index + 1).padStart(2, '0')}
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <p className="text-[11px] font-bold uppercase tracking-[0.35em]" style={{ color: theme.primary }}>
                                                    {exp.company}
                                                </p>
                                                <h3 className="text-3xl font-black leading-[0.95] text-white md:text-[2.3rem]">
                                                    {exp.role}
                                                </h3>
                                            </div>

                                            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/62 md:text-base">
                                                {exp.summary}
                                            </p>

                                            <div className="mt-8 grid gap-3">
                                                {exp.achievements.map((achievement, achievementIndex) => (
                                                    <div
                                                        key={achievement}
                                                        className="flex items-start gap-4 rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4 transition-colors hover:bg-white/[0.05]"
                                                    >
                                                        <span
                                                            className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black"
                                                            style={{
                                                                background: `rgba(${theme.primaryRgb},0.16)`,
                                                                color: theme.primary,
                                                            }}
                                                        >
                                                            {achievementIndex + 1}
                                                        </span>
                                                        <p className="text-sm leading-7 text-white/78">{achievement}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {exp.certificate && (
                                                <div className="mt-7 flex flex-wrap gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => setActiveCertificate(exp.certificate)}
                                                        className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${exp.certificate.color}, ${exp.certificate.color}cc)`,
                                                            boxShadow: `0 18px 40px rgba(${theme.primaryRgb},0.22)`,
                                                        }}
                                                    >
                                                        Certificate Review
                                                    </button>
                                                </div>
                                            )}

                                            <div className="mt-7 flex flex-wrap gap-3">
                                                {exp.highlights.map((highlight) => (
                                                    <span
                                                        key={highlight}
                                                        className="rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/62 transition-colors hover:text-white"
                                                        style={{
                                                            borderColor: 'rgba(255,255,255,0.08)',
                                                            background: 'rgba(255,255,255,0.03)',
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

            <AnimatePresence>
                {activeCertificate && (
                    <ExperienceCertificateModal
                        cert={activeCertificate}
                        onClose={() => setActiveCertificate(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
