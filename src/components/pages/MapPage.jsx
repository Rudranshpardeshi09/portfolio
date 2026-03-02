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
    const pathRef = useRef(null);
    const [markerCoords, setMarkerCoords] = useState([]);

    const [headlightLevel, setHeadlightLevel] = useState(0);
    const isDucati = theme.key === 'ducati';

    // Checkpoints representing our 5 sections
    const checkpoints = [
        { id: '/about', label: 'About', fraction: 0.15 },
        { id: '/skills', label: 'Skills', fraction: 0.35 },
        { id: '/projects', label: 'Projects', fraction: 0.55 },
        { id: '/experience', label: 'Experience', fraction: 0.75 },
        { id: '/contact', label: 'Contact', fraction: 1.0 },
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
        if (!pathRef.current) return;

        const path = pathRef.current;
        const length = path.getTotalLength();

        const newCoords = checkpoints.map(cp => {
            const point = path.getPointAtLength(cp.fraction * length);
            return { x: point.x, y: point.y };
        });

        setMarkerCoords(newCoords);
    }, [theme.key]); // Recalculate if path changes (though currently constant)

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

                // For the last marker, we want it to stay highlighted until the very end
                const endTrigger = nextCp ? (cp.fraction + nextCp.fraction) / 2 : 1.1; // 1.1 ensures it doesn't "leave" at the bottom

                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: `${startTrigger * 100}% top`,
                    end: `${endTrigger * 100}% top`,
                    onEnter: () => activateMarker(index),
                    onEnterBack: () => activateMarker(index),
                    onLeave: () => {
                        // Only deactivate if there's a next marker to move to
                        if (index < checkpoints.length - 1) deactivateMarker(index);
                    },
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
            ref={containerRef}
        >
            <div className="h-[400vh] w-full" />

            <div
                ref={mapContainerRef}
                className="fixed top-0 left-0 w-full h-screen flex flex-col md:flex-row justify-center overflow-hidden"
            >
                <div
                    className="absolute inset-0 opacity-5"
                    style={{ background: `radial-gradient(circle at 50% 50%, #ffffff33, transparent 70%)` }}
                />

                <div className="absolute top-0 left-0 w-full p-6 md:p-12 flex justify-between z-50">
                    <button
                        onClick={handleBackToStart}
                        className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full glass hover:bg-white/10 transition-all group"
                        style={{ border: `1px solid rgba(255, 255, 255, 0.3)` }}
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-white" />
                        <span className="font-medium text-xs md:text-sm tracking-wider uppercase text-white">Switch Machine</span>
                    </button>

                    <div className="text-center bg-black/20 px-4 py-2 md:px-8 md:py-3 rounded-full glass backdrop-blur-md hidden sm:block">
                        <span className="text-white text-[10px] md:text-sm tracking-[0.2em] font-medium uppercase">
                            Scroll to navigate the journey
                        </span>
                    </div>
                </div>

                <div className="w-full h-full flex flex-col md:flex-row px-4 md:px-16">
                    {/* Left/Map Section */}
                    <div className="w-full h-full md:w-1/2 relative z-10 pointer-events-none flex items-center justify-center">
                        {/* Background icon removed for mobile as per requirement */}


                        <svg
                            viewBox="0 0 1000 600"
                            className="w-full h-full drop-shadow-2xl relative z-10 rotate-90 md:rotate-0 scale-100 md:scale-100"
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
                                ref={pathRef}
                                d="M 100,500 C 50,400 50,150 150,120 C 300,80 400,250 450,450 C 500,650 750,550 850,450 C 950,350 900,150 750,120 C 650,100 550,250 680,100"
                                fill="none"
                                stroke="url(#pathGradient)"
                                strokeWidth="8"
                                strokeDasharray="15 15"
                                className="opacity-80 sm:stroke-[4] sm:stroke-dasharray-[10_10]"
                            />

                            <path
                                d="M 100,500 C 50,400 50,150 150,120 C 300,80 400,250 450,450 C 500,650 750,550 850,450 C 950,350 900,150 750,120 C 650,100 550,250 680,100"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeOpacity="0.2"
                                className="sm:stroke-[1]"
                            />

                            <g ref={riderRef} className="z-50" style={{ transformOrigin: "center" }}>
                                <circle cx="0" cy="0" r="15" fill="#ffffff" filter="url(#glow)" className="sm:r-[12]" />
                                <circle cx="0" cy="0" r="6" fill={theme.primary} className="sm:r-[4]" />
                            </g>

                            {markerCoords.length > 0 && checkpoints.map((cp, idx) => {
                                const { x, y } = markerCoords[idx];
                                return (
                                    <g key={cp.id} id={`marker-group-${idx}`} transform={`translate(${x}, ${y})`} className="pointer-events-auto cursor-pointer" onClick={() => navigate(cp.id)}>
                                        <g className="rotate-[-90deg] md:rotate-0">
                                            <circle id={`marker-${idx}`} cx="0" cy="0" r="12" fill="#ffffff" className="opacity-80 transition-all cursor-pointer sm:r-[8]" />
                                            <circle cx="0" cy="0" r="24" fill="transparent" />
                                            <text id={`label-${idx}`} x="0" y={idx % 2 === 0 ? 35 : -25} textAnchor="middle" fill="#fff" className="text-xl sm:text-sm font-bold uppercase opacity-70 tracking-wider font-sans transition-all">{cp.label}</text>
                                            <text x="0" y={idx % 2 === 0 ? 55 : -45} textAnchor="middle" fill="#fff" className="text-xs font-bold uppercase opacity-90 cursor-pointer hover:underline hidden sm:block">Click to Enter</text>
                                        </g>
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    {/* Right/Headlight Section */}
                    <div className="hidden md:flex md:w-1/2 md:h-full flex items-center justify-center relative">
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
