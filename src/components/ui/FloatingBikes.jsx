import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import useThemeStore, { BIKE_THEMES } from '../../store/themeStore';

const THEMES = Object.keys(BIKE_THEMES).map(key => ({
    id: key,
    ...BIKE_THEMES[key]
}));

export default function FloatingBikes() {
    const { theme, setBike } = useThemeStore();
    const [isExpanded, setIsExpanded] = useState(false);

    // Safety check - find matching theme or default to first
    const selectedThemeObj = THEMES.find(t => t.id === theme.id) || THEMES[0];
    const otherThemes = THEMES.filter(t => t.id !== theme.id);

    const containerRef = useRef(null);
    const bikeRefs = useRef([]);
    const particlesRef = useRef(null);
    const mainBtnRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        if (isExpanded) {
            // S-Shape layout mapping
            otherThemes.forEach((_, index) => {
                const el = bikeRefs.current[index];
                if (!el) return;

                // Create an S-curve visually by oscillating X and increasing Y
                const freq = 1.2;
                const amp = 35;
                const xOffset = Math.sin((index + 1) * freq) * amp - 10;
                const yOffset = -((index + 1) * 65);

                gsap.to(el, {
                    x: xOffset,
                    y: yOffset,
                    rotationZ: Math.cos((index + 1) * freq) * 15, // slight tilt
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(1.5)",
                    delay: index * 0.05
                });
            });

            // Subtle rotation on the main button
            gsap.to(mainBtnRef.current, { rotation: -15, scale: 0.9, duration: 0.4 });

        } else {
            // Collapse
            otherThemes.forEach((_, index) => {
                const el = bikeRefs.current[index];
                if (!el) return;
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    rotationZ: 0,
                    scale: 0.5,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in"
                });
            });

            gsap.to(mainBtnRef.current, { rotation: 0, scale: 1, duration: 0.4 });
        }
    }, [isExpanded, otherThemes.length]);

    // Bobbing animation when NOT expanded
    useEffect(() => {
        if (isExpanded) return;

        const bob = gsap.to(containerRef.current, {
            y: "-=8",
            duration: 1.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        return () => bob.kill();
    }, [isExpanded]);

    const handleThemeSelect = (newTheme) => {
        setBike(newTheme.id);
        setIsExpanded(false);
        triggerBurst(newTheme.primaryRgb);
    };

    const triggerBurst = (rgb) => {
        if (!particlesRef.current) return;

        const burstCount = 12;
        const fragments = Array.from({ length: burstCount }).map(() => {
            const el = document.createElement('div');
            el.className = 'absolute w-2 h-2 rounded-full pointer-events-none';
            el.style.backgroundColor = `rgb(${rgb})`;
            el.style.left = '50%';
            el.style.top = '50%';
            particlesRef.current.appendChild(el);
            return el;
        });

        fragments.forEach((frag, i) => {
            const angle = (i / burstCount) * Math.PI * 2;
            const distance = 40 + Math.random() * 40;

            gsap.to(frag, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                scale: 0,
                duration: 0.6 + Math.random() * 0.4,
                ease: "power2.out",
                onComplete: () => frag.remove()
            });
        });
    };

    return (
        <div
            className="fixed bottom-6 right-6 z-50 pointer-events-none"
            style={{ width: '60px', height: '60px' }}
        >
            <div ref={particlesRef} className="absolute inset-0 z-0 flex items-center justify-center" />

            <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">

                {/* Available Options */}
                {otherThemes.map((t, index) => (
                    <button
                        key={t.id}
                        ref={el => bikeRefs.current[index] = el}
                        onClick={() => handleThemeSelect(t)}
                        className="absolute flex items-center justify-center w-12 h-12 rounded-full pointer-events-auto backdrop-blur-md transition-gpu shadow-lg hover:scale-110"
                        style={{
                            background: `linear-gradient(135deg, ${t.gradientStart}, ${t.gradientEnd})`,
                            border: `2px solid ${t.primary}`,
                            opacity: 0,
                            scale: 0.5,
                            zIndex: 40 - index
                        }}
                        title={t.name}
                    >
                        <img
                            src={t.image}
                            alt={t.name}
                            className="w-10 h-10 object-contain drop-shadow-md scale-[1.2] pointer-events-none"
                        />
                    </button>
                ))}

                {/* Main Toggle Button */}
                <button
                    ref={mainBtnRef}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="absolute z-50 w-16 h-16 rounded-full flex items-center justify-center pointer-events-auto backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all hover:scale-105 active:scale-95 group"
                    style={{
                        background: `linear-gradient(135deg, ${selectedThemeObj.gradientStart}, ${selectedThemeObj.gradientEnd})`,
                        border: `2px solid ${selectedThemeObj.primary}`,
                        boxShadow: `0 0 20px rgba(${selectedThemeObj.primaryRgb}, 0.5)`
                    }}
                    title={isExpanded ? 'Close Themes' : 'Change Theme'}
                >
                    <img 
                        src={selectedThemeObj.image} 
                        alt="Current Theme"
                        className="w-12 h-12 object-contain scale-[1.3] pointer-events-none drop-shadow-xl group-hover:scale-[1.4] transition-transform"
                    />
                </button>
            </div>
        </div>
    );
}