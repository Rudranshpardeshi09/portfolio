import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useThemeStore, { BIKE_THEMES } from '../../store/themeStore';
import ParticleBackground from '../ui/ParticleBackground';

const bikeKeys = Object.keys(BIKE_THEMES);

export default function HeroSection() {
    const { bikeSelected, setBike, theme } = useThemeStore();
    const [showPicker, setShowPicker] = useState(!bikeSelected);
    const [hoveredBike, setHoveredBike] = useState(null);
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const bikesRef = useRef([]);
    const heroContentRef = useRef(null);

    useEffect(() => {
        if (showPicker && containerRef.current) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: -40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
            );

            gsap.fromTo(
                bikesRef.current,
                { opacity: 0, y: 60, scale: 0.8 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'back.out(1.5)',
                    delay: 0.4,
                }
            );
        }
    }, [showPicker]);

    const handleBikeSelect = (bikeKey) => {
        setBike(bikeKey);

        const tl = gsap.timeline({
            onComplete: () => setShowPicker(false),
        });

        // Animate out the picker
        tl.to(bikesRef.current, {
            opacity: 0,
            y: -30,
            scale: 0.9,
            stagger: 0.05,
            duration: 0.4,
            ease: 'power2.in',
        });
        tl.to(titleRef.current, {
            opacity: 0,
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.in',
        }, '-=0.2');
    };

    // Show hero content after picker
    useEffect(() => {
        if (!showPicker && heroContentRef.current) {
            gsap.fromTo(
                heroContentRef.current.children,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    delay: 0.2,
                }
            );
        }
    }, [showPicker]);

    if (showPicker) {
        return (
            <section
                ref={containerRef}
                className="h-screen flex flex-col items-center justify-center relative overflow-hidden px-8"
                style={{ background: '#0a0a0a' }}
            >
                <ParticleBackground />
                {/* Background glow */}
                <div
                    className="absolute inset-0 opacity-20 transition-all duration-700"
                    style={{
                        background: hoveredBike
                            ? `radial-gradient(circle at 50% 50%, ${BIKE_THEMES[hoveredBike].primary}22, transparent 70%)`
                            : 'none',
                    }}
                />

                {/* Title */}
                <div ref={titleRef} className="text-center mb-12 relative z-10">
                    <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
                        Welcome to
                    </p>
                    <h1
                        className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-wider mb-4"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        THE{' '}
                        <span className="text-gradient">GARAGE</span>
                    </h1>
                    <p className="text-gray-400 text-lg sm:text-xl tracking-wide">
                        Pick your ride to begin the journey
                    </p>
                </div>

                {/* Bike Picker Grid */}
                <div className="flex flex-wrap justify-center gap-8 sm:gap-10 px-4 relative z-10 max-w-6xl">
                    {bikeKeys.map((key, i) => {
                        const bike = BIKE_THEMES[key];
                        return (
                            <button
                                key={key}
                                ref={(el) => (bikesRef.current[i] = el)}
                                onClick={() => handleBikeSelect(key)}
                                onMouseEnter={() => setHoveredBike(key)}
                                onMouseLeave={() => setHoveredBike(null)}
                                className="group relative flex flex-col items-center gap-3 p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-400 hover:scale-105"
                                style={{
                                    background: hoveredBike === key
                                        ? `rgba(${bike.primaryRgb}, 0.08)`
                                        : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${hoveredBike === key
                                        ? `rgba(${bike.primaryRgb}, 0.3)`
                                        : 'rgba(255,255,255,0.06)'
                                        }`,
                                    boxShadow:
                                        hoveredBike === key
                                            ? `0 0 40px rgba(${bike.primaryRgb}, 0.15)`
                                            : 'none',
                                }}
                            >
                                {/* Color Circle */}
                                <div
                                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl transition-all duration-400 mb-2 relative overflow-hidden"
                                    style={{
                                        background: `linear-gradient(135deg, ${bike.gradientStart}, ${bike.gradientEnd})`,
                                        boxShadow:
                                            hoveredBike === key
                                                ? `0 0 30px rgba(${bike.primaryRgb}, 0.5)`
                                                : `0 0 15px rgba(${bike.primaryRgb}, 0.2)`,
                                    }}
                                >
                                    {bike.image && (
                                        <img
                                            src={bike.image}
                                            alt={bike.name}
                                            className={`w-[90%] h-[90%] object-contain transition-all duration-500 pointer-events-none drop-shadow-2xl
                                                    ${hoveredBike === key ? 'scale-110' : 'scale-100'}`}
                                        />
                                    )}
                                </div>

                                {/* Name */}
                                <span className="text-sm sm:text-base font-semibold text-gray-300 group-hover:text-white transition-colors whitespace-nowrap">
                                    {bike.name.split(' ').slice(-1)}
                                </span>
                                <span className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">
                                    {bike.tagline}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Bottom hint line */}
                <div className="absolute bottom-8 flex flex-col items-center gap-2 text-gray-600">
                    <p className="text-xs tracking-widest uppercase">Choose Your Machine</p>
                    <div className="w-8 h-0.5 rounded-full bg-gray-700" />
                </div>
            </section>
        );
    }

    // ===== After Bike Selection: Hero Content =====
    return (
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
            {/* Atmospheric background glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 30% 40%, rgba(${theme.primaryRgb}, 0.08) 0%, transparent 60%),
                        radial-gradient(ellipse at 70% 60%, rgba(${theme.primaryRgb}, 0.05) 0%, transparent 50%)`,
                }}
            />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div ref={heroContentRef} className="text-center relative z-10 px-4">
                {/* Bike badge */}
                <div
                    className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-6 text-sm"
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
                    className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-wider mb-6"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    <span className="text-white">RUDRANSH'S</span>
                    <br />
                    <span className="text-gradient">GARAGE</span>
                </h1>

                {/* Subtitle */}
                <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                    Full-Stack Developer crafting high-octane digital experiences.
                    <br className="hidden sm:block" />
                    Scroll down to explore the journey.
                </p>

                {/* Scroll CTA */}
                <div className="flex flex-col items-center gap-3">
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
