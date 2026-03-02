import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import useThemeStore from '../../store/themeStore';
import { ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function MapPage() {
    const { theme, setBike } = useThemeStore();
    const navigate = useNavigate();

    const containerRef = useRef(null);
    const mapContainerRef = useRef(null);
    const riderRef = useRef(null);

    const [headlightLevel, setHeadlightLevel] = useState(0);
    const isDucati = theme.key === 'ducati';

    // Checkpoints representing our 5 sections
    const checkpoints = [
        { id: '/about', label: 'About', fraction: 0.1 },
        { id: '/skills', label: 'Skills', fraction: 0.3 },
        { id: '/projects', label: 'Projects', fraction: 0.5 },
        { id: '/experience', label: 'Experience', fraction: 0.7 },
        { id: '/contact', label: 'Contact', fraction: 0.9 },
    ];

    // Map themes to images
    const bikeImages = {
        ducati: '/solo-bike-map-comp/ducati-img/headlight-level-1.png',
        bmw: '/solo-bike-map-comp/bmw-img/Gemini_Generated_Image_sqh9drsqh9drsqh9.png', // Placeholder
        hayabusa: '/solo-bike-map-comp/hayabusa-img/Gemini_Generated_Image_0485956a-406c-4963-8508-030770624050.png', // Placeholder
        ninja: '/solo-bike-map-comp/ninja-img/placeholder.png', // Placeholder
        agusta: '/solo-bike-map-comp/agusta-img/placeholder.png', // Placeholder
    };

    const bikeIcons = {
        ducati: '/bike-sideways/duccati-icon.png',
        bmw: '/bike-sideways/bmw-icon.png',
        hayabusa: '/bike-sideways/busa-icon.png',
        ninja: '/bike-sideways/ninja-icon.png',
        agusta: '/bike-sideways/mv-augusta.png',
    };

    const bikeImage = bikeImages[theme.key] || bikeImages.ducati;
    const bikeIcon = bikeIcons[theme.key] || bikeIcons.ducati;

    // Headlight sequence images (Ducati exclusive)
    const headlightSequence = [
        '/solo-bike-map-comp/ducati-img/headlight-level-0.png',
        '/solo-bike-map-comp/ducati-img/headlight-level-1.png',
        '/solo-bike-map-comp/ducati-img/headlight-level-2.png',
        '/solo-bike-map-comp/ducati-img/headlight-level-3.png',
    ];

    useEffect(() => {
        if (!containerRef.current || !mapContainerRef.current || !riderRef.current) return;

        let ctx = gsap.context(() => {
            // Main scroll sequence driving the rider along the path
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1, // Smooth scrub
                }
            });

            // The SVG path has ID #journeyPath
            tl.to(riderRef.current, {
                motionPath: {
                    path: "#journeyPath",
                    align: "#journeyPath",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true
                },
                ease: "none"
            });

            // Ducati Specific Scroll Logic
            if (isDucati) {
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        let level = 0;
                        if (progress >= 0.1 && progress < 0.3) level = 1;
                        else if (progress >= 0.3 && progress < 0.6) level = 2;
                        else if (progress >= 0.6) level = 3;
                        setHeadlightLevel(level);
                    }
                });
            } else {
                // Original Headlight Glow Animation for other themes
                gsap.to("#bike-headlight-glow", {
                    opacity: 1,
                    filter: "brightness(2) saturate(1.5)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "10% top",
                        end: "90% top",
                        scrub: true,
                        onLeave: () => {
                            gsap.to("#bike-headlight-glow", { opacity: 0, duration: 0.5 });
                        },
                        onEnterBack: () => {
                            gsap.to("#bike-headlight-glow", { opacity: 1, duration: 0.5 });
                        }
                    }
                });
            }

            // Marker highlight animations
            checkpoints.forEach((cp, index) => {
                const prevCp = checkpoints[index - 1];
                const nextCp = checkpoints[index + 1];
                const startTrigger = prevCp ? (prevCp.fraction + cp.fraction) / 2 : 0;
                const endTrigger = nextCp ? (cp.fraction + nextCp.fraction) / 2 : 1;

                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: `${startTrigger * 100}% top`,
                    end: `${endTrigger * 100}% top`,
                    onEnter: () => activateMarker(index),
                    onEnterBack: () => activateMarker(index),
                    onLeave: () => deactivateMarker(index),
                    onLeaveBack: () => deactivateMarker(index),
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, [theme.key]); // Re-run when theme changes

    const activateMarker = (index) => {
        gsap.to(`#marker-${index}`, { scale: 1.5, opacity: 1, duration: 0.3 });
        gsap.to(`#label-${index}`, { opacity: 1, y: 0, duration: 0.3 });
    };

    const deactivateMarker = (index) => {
        gsap.to(`#marker-${index}`, { scale: 1, opacity: 0.6, duration: 0.3 });
        gsap.to(`#label-${index}`, { opacity: 0.5, y: 5, duration: 0.3 });
    };

    const handleBackToStart = () => {
        setBike(null);
        navigate('/');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
            className="w-full relative"
            style={isDucati ? { backgroundColor: theme.primary } : {}}
            ref={containerRef}
        >
            <div className="h-[400vh] w-full" />

            <div
                ref={mapContainerRef}
                className={`fixed top-0 left-0 w-full h-screen flex ${isDucati ? 'flex-col md:flex-row' : 'items-center'} justify-center overflow-hidden`}
            >
                {!isDucati && (
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{ background: `radial-gradient(circle at 50% 50%, #ffffff33, transparent 70%)` }}
                    />
                )}

                <div className={`absolute top-0 left-0 w-full ${isDucati ? 'p-6 md:p-12' : 'p-12'} flex justify-between z-50`}>
                    <button
                        onClick={handleBackToStart}
                        className={`flex items-center gap-2 ${isDucati ? 'px-4 py-2 md:px-6 md:py-3' : 'px-6 py-3'} rounded-full glass hover:bg-white/10 transition-all group`}
                        style={{ border: `1px solid rgba(255, 255, 255, 0.3)` }}
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-white" />
                        <span className={`font-medium ${isDucati ? 'text-xs md:text-sm' : 'text-sm'} tracking-wider uppercase text-white`}>Switch Machine</span>
                    </button>

                    <div className={`text-center bg-black/20 ${isDucati ? 'px-4 py-2 md:px-8 md:py-3' : 'px-8 py-3'} rounded-full glass backdrop-blur-md hidden sm:block`}>
                        <span className={`text-white ${isDucati ? 'text-[10px] md:text-sm' : 'text-sm'} tracking-[0.2em] font-medium uppercase`}>
                            Scroll to navigate the journey
                        </span>
                    </div>
                </div>

                <div className={`w-full h-full flex ${isDucati ? 'flex-col md:flex-row' : 'items-center'} px-4 md:px-16`}>
                    {/* Left/Map Section */}
                    <div className={`${isDucati ? 'w-full h-full md:w-1/2' : 'w-1/2'} relative z-10 pointer-events-none flex items-center justify-center`}>
                        {/* Background icon removed for mobile as per requirement */}
                        {isDucati && (
                            <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-20 z-0">
                                <img src={bikeIcon} alt="bike icon" className="w-full max-w-[80%] h-auto object-contain" />
                            </div>
                        )}

                        <svg
                            viewBox="0 0 1000 600"
                            className={`w-full h-full drop-shadow-2xl relative z-10 ${isDucati ? 'rotate-90 md:rotate-0 scale-100 md:scale-100' : ''}`}
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <defs>
                                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                                    <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="8" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            <path
                                id="journeyPath"
                                d="M 100,500 C 50,500 50,100 200,100 C 400,100 400,500 600,500 C 800,500 900,450 900,300 C 900,100 700,500 500,200"
                                fill="none"
                                stroke="url(#pathGradient)"
                                strokeWidth={isDucati ? "8" : "4"}
                                strokeDasharray={isDucati ? "15 15" : "10 10"}
                                className={`opacity-80 ${isDucati ? 'sm:stroke-[4] sm:stroke-dasharray-[10_10]' : ''}`}
                            />

                            <path
                                d="M 100,500 C 50,500 50,100 200,100 C 400,100 400,500 600,500 C 800,500 900,450 900,300 C 900,100 700,500 500,200"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth={isDucati ? "2" : "1"}
                                strokeOpacity="0.2"
                                className={isDucati ? "sm:stroke-[1]" : ""}
                            />

                            <g ref={riderRef} className="z-50" style={{ transformOrigin: "center" }}>
                                <circle cx="0" cy="0" r={isDucati ? "15" : "12"} fill="#ffffff" filter="url(#glow)" className={isDucati ? "sm:r-[12]" : ""} />
                                <circle cx="0" cy="0" r={isDucati ? "6" : "4"} fill={theme.primary} className={isDucati ? "sm:r-[4]" : ""} />
                            </g>

                            {checkpoints.map((cp, idx) => {
                                const coords = [
                                    { x: 100, y: 310 }, { x: 250, y: 170 }, { x: 480, y: 420 }, { x: 790, y: 480 }, { x: 680, y: 100 },
                                ];
                                const { x, y } = coords[idx];
                                return (
                                    <g key={cp.id} id={`marker-group-${idx}`} transform={`translate(${x}, ${y})`} className="pointer-events-auto cursor-pointer" onClick={() => navigate(cp.id)}>
                                        <g className={isDucati ? 'rotate-[-90deg] md:rotate-0' : ''}>
                                            <circle id={`marker-${idx}`} cx="0" cy="0" r={isDucati ? "12" : "8"} fill="#ffffff" className="opacity-80 transition-all cursor-pointer sm:r-[8]" />
                                            <circle cx="0" cy="0" r="24" fill="transparent" />
                                            <text id={`label-${idx}`} x="0" y={idx % 2 === 0 ? 35 : -25} textAnchor="middle" fill="#fff" className={`${isDucati ? 'text-xl sm:text-sm' : 'text-sm'} font-bold uppercase opacity-70 tracking-wider font-sans transition-all`}>{cp.label}</text>
                                            <text x="0" y={idx % 2 === 0 ? 55 : -45} textAnchor="middle" fill="#fff" className="text-xs font-bold uppercase opacity-90 cursor-pointer hover:underline hidden sm:block">Click to Enter</text>
                                        </g>
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    {/* Right/Headlight Section */}
                    <div className={`${isDucati ? 'hidden md:flex md:w-1/2 md:h-full' : 'w-1/2 h-full'} flex items-center justify-center relative`}>
                        <div className="relative max-w-lg w-full px-4 md:px-0">
                            {isDucati ? (
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={headlightLevel}
                                        src={headlightSequence[headlightLevel]}
                                        alt={`${theme.name} level ${headlightLevel}`}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                        className="w-full h-auto object-contain brightness-100 contrast-100"
                                    />
                                </AnimatePresence>
                            ) : (
                                <>
                                    <img src={bikeImage} alt={theme.name} className="w-full h-auto object-contain brightness-50 contrast-125 grayscale-[0.5]" />
                                    <div
                                        id="bike-headlight-glow"
                                        className="absolute inset-0 opacity-0 pointer-events-none"
                                        style={{
                                            backgroundImage: `url(${bikeImage})`,
                                            backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
                                            filter: 'brightness(1.5) drop-shadow(0 0 30px rgba(255,255,255,0.8))'
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 md:gap-2 opacity-50 animate-pulse">
                    <span className="uppercase tracking-[0.2em] text-[8px] md:text-[10px] text-white">Scroll Down</span>
                    <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white to-transparent" />
                </div>
            </div>
        </motion.div>
    );
}
