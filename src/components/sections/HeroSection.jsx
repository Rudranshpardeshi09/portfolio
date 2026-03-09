import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import Ribbons from '../reactbits/Ribbons';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const { theme } = useThemeStore();
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const ringsRef = useRef(null);

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
            ref={containerRef}
            className="min-h-[100svh] relative overflow-hidden flex items-center justify-center px-4"
            style={{ perspective: '1400px' }}
        >
            <div className="absolute inset-0 z-0 opacity-55">
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
                    background: `radial-gradient(circle at 50% 50%, rgba(${theme.primaryRgb},0.22), transparent 45%),
                    radial-gradient(circle at 50% 50%, rgba(${theme.primaryRgb},0.08), transparent 70%)`
                }}
            />

            <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                backgroundSize: '44px 44px'
            }} />

            <div
                ref={contentRef}
                className="relative z-10 text-center w-full max-w-5xl mx-auto"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div className="hero-reveal inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/45 border border-white/15 text-white/90 mb-6">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                        <img src={theme.image} alt={theme.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs md:text-sm tracking-widest uppercase">AI / ML Engineer</span>
                </div>

                <h1 className="hero-reveal text-4xl sm:text-6xl lg:text-8xl font-black leading-[0.95] mb-5" style={{ fontFamily: 'var(--font-display)' }}>
                    <span className="text-white">RUDRANSH</span>
                    <br />
                    <span style={{ color: theme.primary }}>BUILDS INTELLIGENCE</span>
                </h1>

                <p className="hero-reveal text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                    I design and ship AI-first web products with production-grade MLOps, computer vision, and scalable full-stack architecture.
                </p>

                <div className="hero-reveal flex flex-wrap justify-center gap-3">
                    <button
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-7 py-3 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
                        style={{
                            background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                            color: '#fff',
                            boxShadow: `0 0 28px rgba(${theme.primaryRgb},0.35)`
                        }}
                    >
                        View Projects
                    </button>
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-7 py-3 rounded-xl text-sm font-semibold tracking-wider uppercase border border-white/20 bg-black/35 text-white transition-all duration-300 hover:bg-black/55"
                    >
                        Contact Me
                    </button>
                </div>
            </div>
        </section>
    );
}
