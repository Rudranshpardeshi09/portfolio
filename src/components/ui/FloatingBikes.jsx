import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import useThemeStore, { BIKE_THEMES } from '../../store/themeStore';

const bikeKeys = Object.keys(BIKE_THEMES);

export default function FloatingBikes() {
    const { selectedBike, setBike, theme } = useThemeStore();
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef(null);
    const bikeRefs = useRef([]);

    const visibleKeys = useMemo(
        () => (expanded ? bikeKeys : [selectedBike]),
        [expanded, selectedBike]
    );

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            bikeRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(
                    el,
                    { opacity: 0, x: -16, scale: 0.92 },
                    { opacity: 1, x: 0, scale: 1, duration: 0.35, delay: i * 0.05, ease: 'power2.out' }
                );

                gsap.to(el, {
                    y: '+=8',
                    duration: 1.8 + i * 0.2,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut'
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, [visibleKeys, expanded]);

    return (
        <div
            ref={containerRef}
            className="fixed bottom-8 left-4 md:left-8 z-[100] flex flex-col items-start gap-3"
            style={{ perspective: '1000px' }}
        >
            <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="w-12 h-12 rounded-full flex items-center justify-center border text-white transition-all duration-300"
                style={{
                    background: 'rgba(12, 12, 12, 0.85)',
                    borderColor: `rgba(${theme.primaryRgb}, 0.45)`,
                    boxShadow: `0 0 20px rgba(${theme.primaryRgb}, 0.2)`
                }}
                title={expanded ? 'Hide theme options' : 'Show theme options'}
            >
                <span className="text-lg leading-none">{expanded ? 'x' : '+'}</span>
            </button>

            {visibleKeys.map((key, i) => {
                const bike = BIKE_THEMES[key];
                const isActive = selectedBike === key;
                const sOffset = expanded ? Math.round(Math.sin((i / Math.max(visibleKeys.length - 1, 1)) * Math.PI * 2) * 12) : 0;

                return (
                    <div
                        key={key}
                        ref={(el) => (bikeRefs.current[i] = el)}
                        onClick={() => {
                            setBike(key);
                            if (!expanded) return;
                        }}
                        className="relative cursor-pointer group transition-transform duration-300"
                        style={{ transform: `translateX(${sOffset}px)` }}
                    >
                        <div
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300"
                            style={{
                                background: isActive
                                    ? `linear-gradient(135deg, ${bike.gradientStart}, ${bike.gradientEnd})`
                                    : 'rgba(20,20,20,0.92)',
                                border: isActive
                                    ? `2px solid ${bike.primary}`
                                    : '1px solid rgba(255,255,255,0.15)',
                                boxShadow: isActive
                                    ? `0 0 24px rgba(${bike.primaryRgb}, 0.45)`
                                    : '0 10px 24px rgba(0,0,0,0.45)',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <img
                                src={bike.image}
                                alt={bike.name}
                                className="w-full h-full object-contain scale-[1.25] pointer-events-none transition-transform duration-300 group-hover:scale-[1.35]"
                            />
                        </div>

                        {isActive && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border border-white flex items-center justify-center shadow-md">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: bike.primary }} />
                            </div>
                        )}

                        {expanded && (
                            <div
                                className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-black/90 border border-white/10 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none"
                                style={{ boxShadow: `0 0 14px rgba(${bike.primaryRgb}, 0.15)` }}
                            >
                                {bike.name}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
