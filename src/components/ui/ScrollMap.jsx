import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import useThemeStore from '../../store/themeStore';
import { SECTIONS } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function ScrollMap() {
    const { theme } = useThemeStore();
    const mapRef = useRef(null);
    const riderRef = useRef(null);
    const pathRef = useRef(null);
    const trailRef = useRef(null);
    const [activeSection, setActiveSection] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > window.innerHeight * 0.5);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!visible || !pathRef.current || !riderRef.current) return;

        const ctx = gsap.context(() => {
            // Animate rider along path
            gsap.to(riderRef.current, {
                motionPath: {
                    path: pathRef.current,
                    align: pathRef.current,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: false,
                },
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                },
                ease: 'none',
            });

            // Draw trail path on scroll
            if (trailRef.current) {
                const length = trailRef.current.getTotalLength();
                gsap.set(trailRef.current, { strokeDasharray: length, strokeDashoffset: length });
                gsap.to(trailRef.current, {
                    strokeDashoffset: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: 'body',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 1,
                    },
                });
            }
        });

        return () => ctx.revert();
    }, [visible]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    // Map positions along S-curve
    const sectionPositions = [
        { x: 30, y: 40 },
        { x: 50, y: 110 },
        { x: 30, y: 180 },
        { x: 50, y: 250 },
        { x: 30, y: 320 },
    ];

    const pathD = "M 30 20 Q 60 75 50 110 Q 20 145 30 180 Q 60 215 50 250 Q 20 285 30 320 L 30 340";

    return (
        <div
            ref={mapRef}
            className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 transition-all duration-700 hidden md:block ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                }`}
            style={{ width: '80px', height: '360px' }}
        >
            <svg
                width="80"
                height="360"
                viewBox="0 0 80 360"
                fill="none"
                className="drop-shadow-lg"
            >
                {/* Base road path */}
                <path
                    ref={pathRef}
                    d={pathD}
                    stroke={`rgba(${theme.primaryRgb}, 0.15)`}
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    fill="none"
                />

                {/* Animated trail that draws on scroll */}
                <path
                    ref={trailRef}
                    d={pathD}
                    stroke={theme.primary}
                    strokeWidth="2"
                    fill="none"
                    opacity="0.6"
                    strokeLinecap="round"
                />

                {/* Section markers */}
                {SECTIONS.map((section, i) => {
                    const pos = sectionPositions[i];
                    const isActive = activeSection === section.id;
                    return (
                        <g
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="cursor-pointer"
                        >
                            {/* Glow ring */}
                            {isActive && (
                                <circle
                                    cx={pos.x}
                                    cy={pos.y}
                                    r="14"
                                    fill="none"
                                    stroke={theme.primary}
                                    strokeWidth="1"
                                    opacity="0.4"
                                    className="animate-pulse"
                                />
                            )}
                            {/* Main dot */}
                            <circle
                                cx={pos.x}
                                cy={pos.y}
                                r={isActive ? 8 : 5}
                                fill={isActive ? theme.primary : '#333'}
                                stroke={isActive ? theme.primary : '#555'}
                                strokeWidth={isActive ? 2 : 1}
                                className="transition-all duration-300"
                            />
                            {/* Label */}
                            <text
                                x={pos.x > 40 ? pos.x - 8 : pos.x + 14}
                                y={pos.y + 4}
                                fill={isActive ? theme.primary : '#666'}
                                fontSize="8"
                                fontFamily="var(--font-body)"
                                fontWeight={isActive ? '600' : '400'}
                                textAnchor={pos.x > 40 ? 'end' : 'start'}
                                className="transition-all duration-300 select-none"
                            >
                                {section.label}
                            </text>
                        </g>
                    );
                })}

                {/* Rider */}
                <g ref={riderRef}>
                    <circle r="4" fill={theme.primary} opacity="0.8">
                        <animate
                            attributeName="opacity"
                            values="0.8;1;0.8"
                            dur="1.5s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle r="8" fill={theme.primary} opacity="0.15">
                        <animate
                            attributeName="r"
                            values="8;12;8"
                            dur="1.5s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            </svg>
        </div>
    );
}
