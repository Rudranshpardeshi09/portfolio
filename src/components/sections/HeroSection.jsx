import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useThemeStore from '../../store/themeStore';
import Ribbons from '../reactbits/Ribbons';

export default function HeroSection() {
    const { theme } = useThemeStore();
    const heroContentRef = useRef(null);
    const titleRef = useRef(null);
    const containerRef = useRef(null);

    // 3D parallax on mouse move
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(heroContentRef.current, {
                rotateY: x * 5,
                rotateX: -y * 5,
                duration: 0.6,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(heroContentRef.current, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)',
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Entry animation
    useEffect(() => {
        if (!heroContentRef.current) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            // Title comes from far depth
            tl.fromTo(titleRef.current,
                { opacity: 0, z: -200, scale: 0.5, filter: 'blur(20px)' },
                { opacity: 1, z: 0, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'expo.out' }
            );

            // Other elements stagger in
            tl.fromTo(
                heroContentRef.current.querySelectorAll('.hero-stagger'),
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
                '-=0.8'
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="min-h-[100svh] flex items-center justify-center relative overflow-hidden px-4 sm:px-6"
            style={{ perspective: '1200px' }}
        >
            {/* Atmospheric background glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 30% 40%, rgba(${theme.primaryRgb}, 0.08) 0%, transparent 60%),
                        radial-gradient(ellipse at 70% 60%, rgba(${theme.primaryRgb}, 0.05) 0%, transparent 50%)`,
                }}
            />

            {/* Interactive 3D Ribbons */}
            <div className="absolute inset-0 z-0 opacity-60 pointer-events-auto">
                <Ribbons
                    colors={[theme.primary, theme.secondary]}
                    baseThickness={25}
                    pointCount={50}
                    enableFade={true}
                    baseFriction={0.92}
                />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Floating depth particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full animate-float"
                        style={{
                            width: `${4 + i * 2}px`,
                            height: `${4 + i * 2}px`,
                            background: `rgba(${theme.primaryRgb}, ${0.1 + i * 0.05})`,
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i % 3) * 25}%`,
                            animationDelay: `${i * 0.5}s`,
                            filter: `blur(${i}px)`,
                        }}
                    />
                ))}
            </div>

            <div
                ref={heroContentRef}
                className="text-center relative z-10 w-full max-w-5xl mx-auto"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Bike badge */}
                <div
                    className="hero-stagger inline-flex items-center gap-3 px-5 py-2 rounded-full mb-6 text-sm"
                    style={{
                        background: `rgba(${theme.primaryRgb}, 0.1)`,
                        border: `1px solid rgba(${theme.primaryRgb}, 0.25)`,
                        color: theme.primary,
                    }}
                >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                        <img src={theme.image} alt={theme.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="font-medium">{theme.name}</span>
                </div>

                {/* Main title */}
                <h1
                    ref={titleRef}
                    className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-black tracking-wider mb-5 md:mb-6"
                    style={{ fontFamily: 'var(--font-display)', transformStyle: 'preserve-3d' }}
                >
                    <span className="text-white">RUDRANSH'S</span>
                    <br />
                    <span style={{ color: 'var(--color-primary)' }}>GARAGE</span>
                </h1>

                {/* Subtitle */}
                <p className="hero-stagger text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-7 md:mb-8 leading-relaxed">
                    Full-Stack Developer crafting high-octane digital experiences.
                    <br className="hidden sm:block" />
                    Scroll down to explore the journey.
                </p>

                {/* Scroll CTA */}
                <div className="hero-stagger flex flex-col items-center gap-3">
                    <button
                        onClick={() => {
                            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-3 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 cursor-pointer"
                        style={{
                            background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                            boxShadow: `0 0 30px rgba(${theme.primaryRgb}, 0.3)`,
                            color: theme.key === 'bmw' ? '#000' : '#fff',
                        }}
                    >
                        Start the Ride
                    </button>

                    {/* Scroll indicator */}
                    <div className="mt-8 animate-bounce">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={theme.primary}
                            strokeWidth="2"
                            className="opacity-50"
                        >
                            <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
