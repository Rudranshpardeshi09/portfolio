import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useThemeStore from '../../store/themeStore';

export default function AboutIntro({ onComplete }) {
    const { getBackgroundStyle } = useThemeStore();
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const text = "rider's info";

    useEffect(() => {
        const chars = textRef.current.querySelectorAll('.char');
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        // Initial state
        gsap.set(chars, { opacity: 0, y: 20 });

        // Animation sequence
        tl.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out"
        })
            .to(chars, {
                delay: 1, // Hold for a moment
                opacity: 0,
                scale: 0,
                x: () => (Math.random() - 0.5) * 100, // Drift horizontally like ashes
                y: () => -(Math.random() * 150), // Fly upwards like ashes from fire
                rotation: () => (Math.random() - 0.5) * 720,
                filter: "blur(10px)",
                duration: 1.5,
                stagger: {
                    each: 0.08,
                    from: "end" // Disappear from end to front
                },
                ease: "power1.in"
            })
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.5
            });

        return () => tl.kill();
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden theme-transition"
            style={getBackgroundStyle()}
        >
            <div ref={textRef} className="flex gap-4 md:gap-8">
                {text.split("").map((char, i) => (
                    <span
                        key={i}
                        className="char text-white text-5xl md:text-8xl font-black italic tracking-tighter uppercase font-display inline-block"
                        style={{
                            fontFamily: 'var(--font-display)',
                            textShadow: '0 0 30px rgba(255,255,255,0.4)',
                            marginRight: char === " " ? "1rem" : "0"
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </div>
        </div>
    );
}
