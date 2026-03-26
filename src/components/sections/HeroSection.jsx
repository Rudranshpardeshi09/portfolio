import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, BrainCircuit, Boxes, ShieldCheck, Sparkles } from 'lucide-react';
import useThemeStore from '../../store/themeStore';
import Ribbons from '../reactbits/Ribbons';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const { theme } = useThemeStore();
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const ringsRef = useRef(null);
    const resumeHref = '/resume/Rudransh Pardeshi resume.pdf';

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        const mouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            gsap.to(content, {
                rotateY: x * 9,
                rotateX: -y * 7,
                transformPerspective: 1200,
                duration: 0.45,
                ease: 'power2.out'
            });
        };

        const leave = () => {
            gsap.to(content, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' });
        };

        container.addEventListener('mousemove', mouseMove);
        container.addEventListener('mouseleave', leave);
        return () => {
            container.removeEventListener('mousemove', mouseMove);
            container.removeEventListener('mouseleave', leave);
        };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current?.querySelectorAll('.hero-reveal'),
                { opacity: 0, y: 24, filter: 'blur(8px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.12, duration: 0.9, ease: 'power3.out', delay: 0.2 }
            );

            gsap.to(contentRef.current, {
                y: -140,
                rotateX: 16,
                scale: 0.9,
                transformPerspective: 1200,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.1
                }
            });

            gsap.to(ringsRef.current, {
                rotateZ: 100,
                scale: 1.15,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.2
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-10"
            style={{ perspective: '1400px' }}
        >
            <div className="absolute inset-0 z-0 opacity-50">
                <Ribbons
                    colors={[theme.primary, theme.secondary]}
                    baseThickness={22}
                    pointCount={46}
                    enableFade
                    baseFriction={0.9}
                />
            </div>

            <div
                ref={ringsRef}
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: `radial-gradient(circle at 50% 45%, rgba(${theme.primaryRgb},0.24), transparent 34%),
                    radial-gradient(circle at 50% 50%, rgba(${theme.primaryRgb},0.12), transparent 58%)`
                }}
            />

            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '44px 44px',
                }}
            />

            <div
                className="absolute left-1/2 top-[18%] z-0 h-40 w-40 -translate-x-1/2 rounded-full blur-[120px] sm:h-56 sm:w-56"
                style={{ background: `rgba(${theme.primaryRgb},0.22)` }}
            />

            <div
                className="absolute inset-x-0 bottom-0 z-0 h-40 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.9))' }}
            />

            <div
                ref={contentRef}
                className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.12fr)_360px] lg:items-end lg:gap-12"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    <div
                        className="hero-reveal inline-flex items-center gap-3 rounded-full border px-4 py-2 text-white/90 backdrop-blur-xl"
                        style={{
                            borderColor: `rgba(${theme.primaryRgb},0.26)`,
                            background: `linear-gradient(135deg, rgba(0,0,0,0.62), rgba(${theme.primaryRgb},0.12))`,
                            boxShadow: `0 18px 40px rgba(0,0,0,0.25)`,
                        }}
                    >
                        <div className="h-8 w-8 overflow-hidden rounded-full border border-white/20">
                            <img src={theme.image} alt={theme.name} className="h-full w-full object-cover" />
                        </div>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] sm:text-xs">
                            AI Engineer + Full Stack Builder
                        </span>
                        <Sparkles size={14} style={{ color: theme.primary }} />
                    </div>

                    <div className="mt-7 hero-reveal">
                        <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">
                            Production Systems. Sharp Interfaces. Real Outcomes.
                        </p>
                    </div>

                    <h1
                        className="hero-reveal mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-6xl md:text-7xl lg:text-[6.4rem]"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Intelligent Products
                        <br />
                        <span
                            style={{
                                color: theme.primary,
                                textShadow: `0 0 32px rgba(${theme.primaryRgb},0.28)`,
                            }}
                        >
                            Crafted To Perform
                        </span>
                    </h1>

                    <p className="hero-reveal mt-6 max-w-3xl text-sm leading-7 text-white/62 sm:text-base md:text-lg md:leading-8">
                        I build AI-powered products and full-stack systems that feel polished on the surface and robust underneath, spanning computer vision, automation, analytics, and scalable web delivery.
                    </p>

                    <div className="hero-reveal mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                        {[
                            { label: 'Vision & AI', icon: BrainCircuit },
                            { label: 'Full-stack Systems', icon: Boxes },
                            { label: 'Reliable Delivery', icon: ShieldCheck },
                        ].map(({ label, icon: Icon }) => (
                            <div
                                key={label}
                                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/72"
                                style={{
                                    borderColor: 'rgba(255,255,255,0.1)',
                                    background: 'rgba(255,255,255,0.04)',
                                }}
                            >
                                <Icon size={14} style={{ color: theme.primary }} />
                                {label}
                            </div>
                        ))}
                    </div>

                    <div className="hero-reveal mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                        <button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-2xl px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:-translate-y-1"
                            style={{
                                background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                                boxShadow: `0 24px 50px rgba(${theme.primaryRgb},0.28)`,
                            }}
                        >
                            View Projects
                            <ArrowDownRight size={16} />
                        </button>

                        <a
                            href={resumeHref}
                            download="Rudransh Pardeshi resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex min-w-[190px] items-center justify-center rounded-2xl border px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-1"
                            style={{
                                borderColor: `rgba(${theme.primaryRgb},0.28)`,
                                background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(${theme.primaryRgb},0.08))`,
                            }}
                        >
                            Download Resume
                        </a>

                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex min-w-[170px] items-center justify-center rounded-2xl border border-white/15 bg-black/35 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black/55"
                        >
                            Contact Me
                        </button>
                    </div>
                </div>

                <div className="hero-reveal mx-auto w-full max-w-[420px] lg:mx-0">
                    <div
                        className="relative overflow-hidden rounded-[34px] border p-5 sm:p-6"
                        style={{
                            borderColor: `rgba(${theme.primaryRgb},0.24)`,
                            background: `linear-gradient(180deg, rgba(10,10,12,0.92), rgba(${theme.primaryRgb},0.08) 130%)`,
                            boxShadow: `0 30px 80px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.04)`,
                        }}
                    >
                        <div
                            className="absolute inset-x-0 top-0 h-px"
                            style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }}
                        />
                        <div
                            className="absolute -right-14 top-[-20px] h-36 w-36 rounded-full blur-[70px]"
                            style={{ background: `rgba(${theme.primaryRgb},0.18)` }}
                        />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
                                        Current Focus
                                    </p>
                                    <h2 className="mt-3 text-2xl font-black uppercase leading-none text-white sm:text-[2rem]">
                                        Building AI That Ships
                                    </h2>
                                </div>
                                <div
                                    className="flex h-12 w-12 items-center justify-center rounded-2xl border"
                                    style={{
                                        borderColor: `rgba(${theme.primaryRgb},0.25)`,
                                        background: `rgba(${theme.primaryRgb},0.12)`,
                                    }}
                                >
                                    <Sparkles size={18} style={{ color: theme.primary }} />
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                {[
                                    ['AI/ML Workflows', 'Forecasting, automation, and intelligent decision systems'],
                                    ['Frontend Quality', 'Motion-rich interfaces with product-minded UX'],
                                    ['Backend Reliability', 'Django, APIs, validation, and scalable delivery'],
                                ].map(([title, text]) => (
                                    <div
                                        key={title}
                                        className="rounded-[22px] border px-4 py-4"
                                        style={{
                                            borderColor: 'rgba(255,255,255,0.08)',
                                            background: 'rgba(255,255,255,0.03)',
                                        }}
                                    >
                                        <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.primary }}>
                                            {title}
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-white/65">
                                            {text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                {[
                                    ['Projects', '10+'],
                                    ['Internships', '2'],
                                    ['Focus', 'AI + Web'],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="rounded-[20px] border px-3 py-4 text-center"
                                        style={{
                                            borderColor: 'rgba(255,255,255,0.08)',
                                            background: 'rgba(255,255,255,0.03)',
                                        }}
                                    >
                                        <p className="text-lg font-black text-white sm:text-xl">{value}</p>
                                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/42">
                                            {label}
                                        </p>
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
