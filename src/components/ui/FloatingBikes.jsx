import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useThemeStore, { BIKE_THEMES } from '../../store/themeStore';

const bikeKeys = Object.keys(BIKE_THEMES);

export default function FloatingBikes() {
    const { selectedBike, setBike } = useThemeStore();
    const containerRef = useRef(null);
    const bikeRefs = useRef([]);

    // S-curve positions: bikes arranged in an S-shape from top to bottom
    // Each bike gets a vertical position + horizontal offset via sin wave
    const getBikePosition = (index, total) => {
        const verticalSpacing = 64; // px between bikes
        const amplitude = 30; // horizontal S wave amplitude
        const yOffset = index * verticalSpacing;
        const xOffset = Math.sin((index / (total - 1)) * Math.PI * 2) * amplitude;
        return { x: xOffset, y: yOffset };
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Entry animation — bikes fly in from right
            bikeRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(el,
                    { opacity: 0, x: 100, rotateY: -180 },
                    {
                        opacity: 1, x: 0, rotateY: 0,
                        duration: 1.2,
                        delay: 0.8 + i * 0.15,
                        ease: 'back.out(1.4)',
                    }
                );
            });

            // Continuous floating + Y-axis rotation for each bike
            bikeRefs.current.forEach((el, i) => {
                if (!el) return;
                // Floating motion
                gsap.to(el, {
                    y: `+=${8 + i * 2}`,
                    duration: 2 + i * 0.3,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                    delay: i * 0.2,
                });

                // Y-axis rotation
                const imgEl = el.querySelector('.bike-img-3d');
                if (imgEl) {
                    gsap.to(imgEl, {
                        rotateY: 360,
                        duration: 4 + i * 0.5,
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
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 flex flex-col items-center"
            style={{ perspective: '800px' }}
        >
            {bikeKeys.map((key, i) => {
                const bike = BIKE_THEMES[key];
                const pos = getBikePosition(i, bikeKeys.length);
                const isActive = selectedBike === key;

                return (
                    <div
                        key={key}
                        ref={(el) => (bikeRefs.current[i] = el)}
                        onClick={() => setBike(key)}
                        className="absolute cursor-pointer group"
                        style={{
                            bottom: `${pos.y}px`,
                            right: `${pos.x + 10}px`,
                            transformStyle: 'preserve-3d',
                            zIndex: isActive ? 10 : 5 - i,
                        }}
                        title={bike.name}
                    >
                        {/* Glow ring behind active bike */}
                        <div
                            className="absolute inset-0 rounded-full transition-all duration-500"
                            style={{
                                background: isActive
                                    ? `radial-gradient(circle, rgba(${bike.primaryRgb}, 0.4), transparent 70%)`
                                    : 'none',
                                transform: 'scale(1.8)',
                                filter: isActive ? 'blur(8px)' : 'none',
                            }}
                        />

                        {/* Bike image with 3D rotation */}
                        <div
                            className="bike-img-3d relative w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                                transformStyle: 'preserve-3d',
                                background: isActive
                                    ? `linear-gradient(135deg, ${bike.gradientStart}, ${bike.gradientEnd})`
                                    : 'rgba(255,255,255,0.08)',
                                border: isActive
                                    ? `2px solid rgba(${bike.primaryRgb}, 0.6)`
                                    : '1px solid rgba(255,255,255,0.1)',
                                boxShadow: isActive
                                    ? `0 0 20px rgba(${bike.primaryRgb}, 0.4), 0 0 40px rgba(${bike.primaryRgb}, 0.2)`
                                    : '0 4px 12px rgba(0,0,0,0.3)',
                            }}
                        >
                            <img
                                src={bike.image}
                                alt={bike.name}
                                className="w-[85%] h-[85%] object-contain pointer-events-none drop-shadow-lg"
                                style={{ backfaceVisibility: 'hidden' }}
                            />
                        </div>

                        {/* Name tooltip on hover */}
                        <div
                            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 rounded-md text-[10px] md:text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                            style={{
                                background: 'rgba(0,0,0,0.8)',
                                color: isActive ? bike.primary : '#ccc',
                                border: `1px solid rgba(${bike.primaryRgb}, 0.3)`,
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            {bike.name.split(' ').slice(-1)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
