import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
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
            className="fixed inset-0 z-[140] overflow-y-auto bg-[rgba(4,4,6,0.88)] p-4 backdrop-blur-2xl sm:p-6"
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
                    className="relative grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-[#09090c] shadow-[0_40px_120px_rgba(0,0,0,0.55)] lg:grid-cols-[320px_minmax(0,1fr)]"
                    onClick={(event) => event.stopPropagation()}
                >
                    <aside className="relative flex flex-col justify-between border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                        <div className="space-y-6">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/35">
                                    Certificate Review
                                </p>
                                <h3 className="mt-3 pr-12 text-2xl font-semibold leading-tight text-white">
                                    {cert.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/55">
                                    Full certificate preview for the internship credential attached to this experience entry.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                                {details.map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
                                    >
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
                                            {item.label}
                                        </p>
                                        <p className="mt-2 text-sm font-medium text-white/88">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="mt-8 rounded-[24px] border p-5"
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

                    <div className="relative bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)] p-3 sm:p-5 lg:p-6">
                        <div className="mb-4 flex items-center justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white hover:text-black"
                            >
                                Close
                            </button>
                        </div>
                        <div className="flex max-h-[calc(100vh-3rem)] min-h-[420px] items-center justify-center overflow-auto rounded-[28px] border border-white/8 bg-[#050505] p-3 shadow-inner sm:min-h-[520px] sm:p-5">
                            <img
                                src={cert.image}
                                alt={cert.title}
                                className="block h-auto max-h-full w-auto max-w-full rounded-2xl bg-white object-contain shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
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
            className="section-container relative overflow-visible bg-transparent [perspective:2500px] py-44 md:py-56 lg:py-72"
        >
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{ background: `radial-gradient(circle at 50% 15%, rgba(${theme.primaryRgb},0.15), transparent 60%)` }}
            />

            <div className="section-inner relative z-10 mx-auto max-w-[1520px] px-6 md:px-12 lg:px-20">
                <div ref={titleRef} className="mx-auto max-w-3xl text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 md:text-xs">
                        Professional Journey
                    </p>
                    <h2 className="mt-4 text-5xl font-black uppercase tracking-tighter text-white sm:text-6xl md:text-7xl leading-none">
                        Impact Timeline
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-white/50 md:text-base">
                        A dynamic chronicle of technical achievements, architectural leadership, and scalable solution delivery.
                    </p>
                </div>

                <div className="relative mx-auto mt-28 w-full">
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

                    <div className="space-y-32 md:space-y-44 lg:space-y-52">
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
                                        className="relative w-full overflow-hidden rounded-[44px] border p-12 text-left md:w-[49%] md:p-14 lg:w-[50%] lg:p-16 transition-all duration-500 hover:border-white/20"

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
                                            <div className="mb-10 flex items-center justify-between">
                                                <span
                                                    className="inline-flex rounded-full border px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white/80"
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

                                            <p className="mt-8 text-base leading-8 text-white/60 md:text-lg">
                                                {exp.summary}
                                            </p>

                                            <div className="mt-12 space-y-6">
                                                {exp.achievements.map((achievement) => (
                                                    <div
                                                        key={achievement}
                                                        className="flex items-start gap-5 rounded-[28px] border border-white/5 bg-white/[0.02] px-7 py-6 hover:bg-white/[0.05] transition-colors"
                                                    >
                                                        <span
                                                            className="mt-2.5 h-2 w-2 shrink-0 rounded-full shadow-[0_0_10px_currentColor]"
                                                            style={{ backgroundColor: theme.primary, color: theme.primary }}
                                                        />
                                                        <p className="text-sm leading-7 text-white/80">{achievement}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {exp.certificate && (
                                                <div className="mt-10 flex flex-wrap gap-4">
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

                                            <div className="mt-10 flex flex-wrap gap-4">
                                                {exp.highlights.map((highlight) => (
                                                    <span
                                                        key={highlight}
                                                        className="rounded-xl border border-white/5 bg-white/[0.04] px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
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
