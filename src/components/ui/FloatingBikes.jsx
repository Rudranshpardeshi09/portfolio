import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import useThemeStore, { BIKE_THEMES } from '../../store/themeStore';

const bikeKeys = Object.keys(BIKE_THEMES);

export default function FloatingBikes() {
    const { selectedBike, setBike, theme } = useThemeStore();
    const containerRef = useRef(null);
    const bikeRefs = useRef([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Initial animation for the column
            bikeRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.set(el, { opacity: 0, x: -50, scale: 0.8 });
                gsap.to(el, {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'power3.out'
                });

                // Floating effect
                gsap.to(el, {
                    y: '+=10',
                    duration: 2 + i * 0.3,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut'
                });

                // Periodic 3D rotation of the icons
                const imgEl = el.querySelector('.bike-img-3d');
                if (imgEl) {
                    gsap.to(imgEl, {
                        rotateY: 360,
                        duration: 8,
                        ease: 'none',
                        repeat: -1,
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed bottom-10 left-6 md:left-10 z-[100] flex flex-col gap-6"
            style={{ perspective: '1000px' }}
        >
            {bikeKeys.map((key, i) => {
                const bike = BIKE_THEMES[key];
                const isActive = selectedBike === key;

                return (
                    <div
                        key={key}
                        ref={(el) => (bikeRefs.current[i] = el)}
                        onClick={() => setBike(key)}
                        className="relative cursor-pointer group"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div
                            className="bike-img-3d w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 relative shadow-2xl"
                            style={{
                                transformStyle: 'preserve-3d',
                                background: isActive
                                    ? `linear-gradient(135deg, ${bike.gradientStart}, ${bike.gradientEnd})`
                                    : 'rgba(20,20,20,0.85)',
                                border: isActive
                                    ? `2px solid ${bike.primary}`
                                    : '1px solid rgba(255,255,255,0.1)',
                                boxShadow: isActive
                                    ? `0 0 30px rgba(${bike.primaryRgb}, 0.5)`
                                    : '0 10px 30px rgba(0,0,0,0.4)',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <img
                                src={bike.image}
                                alt={bike.name}
                                className="w-[85%] h-[85%] object-contain pointer-events-none drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
                            />

                            {/* Active Indicator Dot */}
                            {isActive && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: bike.primary }} />
                                </div>
                            )}
                        </div>

                        {/* Label Tooltip */}
                        <div
                            className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-black/90 border border-white/10 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-xl whitespace-nowrap pointer-events-none translate-x-2 group-hover:translate-x-0"
                            style={{ boxShadow: isActive ? `0 0 20px rgba(${bike.primaryRgb}, 0.2)` : 'none' }}
                        >
                            {bike.name}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
