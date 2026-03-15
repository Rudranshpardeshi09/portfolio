import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import useThemeStore, { BIKE_THEMES } from '../../store/themeStore';
import ParticleBackground from '../ui/ParticleBackground';

const bikeKeys = Object.keys(BIKE_THEMES);

export default function BikeSelectionPage() {
    const { setBike } = useThemeStore();
    const navigate = useNavigate();
    const [hoveredBike, setHoveredBike] = useState(null);
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const bikesRef = useRef([]);

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: -40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
            );

            gsap.fromTo(
                bikesRef.current,
                { opacity: 0, y: 60, scale: 0.8, rotateX: 15 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'back.out(1.5)',
                    delay: 0.4,
                }
            );
        }
    }, []);

    const handleBikeSelect = (key) => {
        setBike(key);

        const tl = gsap.timeline({
            onComplete: () => {
                navigate('/map');
            },
        });

        // Animate out the picker before navigating
        tl.to(bikesRef.current, {
            opacity: 0,
            y: -30,
            scale: 0.9,
            rotateX: -10,
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

    const handleMouseEnter = (key, index) => {
        setHoveredBike(key);
        gsap.to(bikesRef.current[index], {
            rotateY: -15,
            scale: 1.08,
            z: 60,
            duration: 0.5,
            ease: 'power3.out',
            transformPerspective: 1800,
            transformOrigin: 'left center', // Like a panel opening
        });
    };

    const handleMouseLeave = (index) => {
        setHoveredBike(null);
        gsap.to(bikesRef.current[index], {
            rotateY: 0,
            scale: 1,
            z: 0,
            duration: 0.5,
            ease: 'power3.out',
            transformPerspective: 1800,
        });
    };

    return (
        <section
            ref={containerRef}
            className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-8 [perspective:1800px]"
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
            <div ref={titleRef} className="text-center mb-12 relative z-10 px-4">
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

            {/* Perspective Picker Grid */}
            <div className="flex flex-wrap justify-center gap-8 sm:gap-10 px-4 relative z-10 max-w-6xl">
                {bikeKeys.map((key, i) => {
                    const bike = BIKE_THEMES[key];
                    const isHovered = hoveredBike === key;
                    return (
                        <div key={key} className="relative">
                            <button
                                ref={(el) => (bikesRef.current[i] = el)}
                                onClick={() => handleBikeSelect(key)}
                                onMouseEnter={() => handleMouseEnter(key, i)}
                                onMouseLeave={() => handleMouseLeave(i)}
                                className="group relative flex flex-col items-center gap-3 p-6 sm:p-8 rounded-2xl cursor-pointer transition-colors duration-400 w-40 sm:w-48 will-change-transform"
                                style={{
                                    background: isHovered
                                        ? `rgba(${bike.primaryRgb}, 0.08)`
                                        : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${isHovered
                                        ? `rgba(${bike.primaryRgb}, 0.3)`
                                        : 'rgba(255,255,255,0.06)'
                                        }`,
                                    boxShadow: isHovered
                                        ? `0 0 40px rgba(${bike.primaryRgb}, 0.15), inset 0 0 20px rgba(${bike.primaryRgb}, 0.05)`
                                        : 'none',
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                {/* Color Circle & Pulsing Ring */}
                                <div className="relative mb-2 w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">
                                    {isHovered && (
                                        <div 
                                            className="absolute inset-0 rounded-full animate-ping opacity-20"
                                            style={{ background: bike.primary }}
                                        />
                                    )}
                                    <div
                                        className="w-full h-full rounded-full flex items-center justify-center text-3xl transition-all duration-400 relative overflow-visible"
                                        style={{
                                            background: `linear-gradient(135deg, ${bike.gradientStart}, ${bike.gradientEnd})`,
                                            boxShadow: isHovered
                                                ? `0 0 30px rgba(${bike.primaryRgb}, 0.5)`
                                                : `0 0 15px rgba(${bike.primaryRgb}, 0.2)`,
                                            transform: 'translateZ(30px)' // Pops out from panel
                                        }}
                                    >
                                        {bike.image && (
                                            <img
                                                src={bike.image}
                                                alt={bike.name}
                                                className={`w-[120%] h-[120%] object-contain transition-all duration-500 pointer-events-none drop-shadow-2xl absolute
                                                        ${isHovered ? 'scale-110 -translate-y-2' : 'scale-100'}`}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Name */}
                                <div className="flex flex-col items-center" style={{ transform: 'translateZ(20px)' }}>
                                    <span className="text-sm sm:text-base font-semibold text-gray-300 group-hover:text-white transition-colors whitespace-nowrap z-10">
                                        {bike.name.split(' ').slice(-1)}
                                    </span>
                                    <span className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors z-10 text-center">
                                        {bike.tagline}
                                    </span>
                                </div>
                            </button>
                            
                            {/* Floor reflection gradient below card */}
                            <div 
                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-4 blur-xl rounded-full transition-opacity duration-500"
                                style={{ 
                                    background: isHovered ? bike.primary : 'transparent',
                                    opacity: isHovered ? 0.4 : 0
                                }}
                            />
                        </div>
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
