import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

    const bikeImage = bikeImages[theme.key] || bikeImages.ducati;

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

            // Headlight Glow Animation
            // Starts at About (0.1), Max at Contact (0.9), and turns off after Contact
            gsap.to("#bike-headlight-glow", {
                opacity: 1,
                filter: "brightness(2) saturate(1.5)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "10% top", // Near About
                    end: "90% top",   // Near Contact
                    scrub: true,
                    onLeave: () => {
                        gsap.to("#bike-headlight-glow", { opacity: 0, duration: 0.5 });
                    },
                    onEnterBack: () => {
                        gsap.to("#bike-headlight-glow", { opacity: 1, duration: 0.5 });
                    }
                }
            });

            // Marker highlight animations (triggered at midpoint between sections)
            checkpoints.forEach((cp, index) => {
                const prevCp = checkpoints[index - 1];
                const nextCp = checkpoints[index + 1];

                // Start trigger is halfway between previous and current
                // End trigger is halfway between current and next
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
    }, []);

    const activateMarker = (index) => {
        gsap.to(`#marker-${index}`, { scale: 1.5, opacity: 1, duration: 0.3 });
        gsap.to(`#label-${index}`, { opacity: 1, y: 0, duration: 0.3 });
    };

    const deactivateMarker = (index) => {
        gsap.to(`#marker-${index}`, { scale: 1, opacity: 0.6, duration: 0.3 });
        gsap.to(`#label-${index}`, { opacity: 0.5, y: 5, duration: 0.3 });
    };

    const handleBackToStart = () => {
        setBike(null); // Reset selection
        navigate('/');
    };


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
            className="w-full relative bg-transparent"
            ref={containerRef}
        >
            {/* Scrollable container to drive scroll trigger (500vh makes it scrollable) */}
            <div className="h-[400vh] w-full" />

            {/* Sticky map container */}
            <div
                ref={mapContainerRef}
                className="fixed top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Ambient glow - Subtler now that background is colored */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{ background: `radial-gradient(circle at 50% 50%, #ffffff33, transparent 70%)` }}
                />

                {/* Top Nav */}
                <div className="absolute top-0 left-0 w-full p-12 flex justify-between z-50">
                    <button
                        onClick={handleBackToStart}
                        className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 transition-all group"
                        style={{ border: `1px solid rgba(255, 255, 255, 0.3)` }}
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-white" />
                        <span className="font-medium text-sm tracking-wider uppercase text-white">Switch Machine</span>
                    </button>

                    <div className="text-center bg-black/20 px-8 py-3 rounded-full glass backdrop-blur-md hidden sm:block">
                        <span className="text-white text-sm tracking-[0.2em] font-medium uppercase">
                            Scroll to navigate the journey
                        </span>
                    </div>
                </div>

                <div className="w-full h-full flex items-center px-8 md:px-16">
                    {/* Left: SVG Map */}
                    <div className="w-1/2 relative z-10 pointer-events-none">
                        <svg
                            viewBox="0 0 1000 600"
                            className="w-full h-auto drop-shadow-2xl"
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

                            {/* Winding Loop Path */}
                            <path
                                id="journeyPath"
                                d="M 100,500 C 50,500 50,100 200,100 C 400,100 400,500 600,500 C 800,500 900,450 900,300 C 900,100 700,50 500,200"
                                fill="none"
                                stroke="url(#pathGradient)"
                                strokeWidth="4"
                                strokeDasharray="10 10"
                                className="opacity-80"
                            />

                            {/* Solid underlying track */}
                            <path
                                d="M 100,500 C 50,500 50,100 200,100 C 400,100 400,500 600,500 C 800,500 900,450 900,300 C 900,100 700,50 500,200"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="1"
                                strokeOpacity="0.2"
                            />

                            {/* Rider Circle */}
                            <g ref={riderRef} className="z-50" style={{ transformOrigin: "center" }}>
                                <circle cx="0" cy="0" r="12" fill="#ffffff" filter="url(#glow)" />
                                {/* Inner core */}
                                <circle cx="0" cy="0" r="4" fill={theme.primary} />
                            </g>

                            {/* Checkpoint Markers */}
                            {/* 1. About */}
                            <g id="marker-group-0" transform="translate(100, 310)" className="pointer-events-auto cursor-pointer" onClick={() => navigate('/about')}>
                                <circle id="marker-0" cx="0" cy="0" r="8" fill="#ffffff" className="opacity-80 transition-all cursor-pointer" />
                                <circle cx="0" cy="0" r="16" fill="transparent" /> {/* Hitbox */}
                                <text id="label-0" x="0" y="25" textAnchor="middle" fill="#fff" className="text-sm font-bold uppercase opacity-70 tracking-wider font-sans transition-all">About</text>
                                <text x="0" y="40" textAnchor="middle" fill="#fff" className="text-xs font-bold uppercase opacity-90 cursor-pointer hover:underline">Click to Enter</text>
                            </g>

                            {/* 2. Skills */}
                            <g id="marker-group-1" transform="translate(250, 170)" className="pointer-events-auto cursor-pointer" onClick={() => navigate('/skills')}>
                                <circle id="marker-1" cx="0" cy="0" r="8" fill="#ffffff" className="opacity-80 transition-all cursor-pointer" />
                                <circle cx="0" cy="0" r="16" fill="transparent" />
                                <text id="label-1" x="0" y="-15" textAnchor="middle" fill="#fff" className="text-sm font-bold uppercase opacity-70 tracking-wider font-sans transition-all">Skills</text>
                                <text x="0" y="-30" textAnchor="middle" fill="#fff" className="text-xs font-bold uppercase opacity-90 cursor-pointer hover:underline">Click to Enter</text>
                            </g>

                            {/* 3. Projects */}
                            <g id="marker-group-2" transform="translate(480, 420)" className="pointer-events-auto cursor-pointer" onClick={() => navigate('/projects')}>
                                <circle id="marker-2" cx="0" cy="0" r="8" fill="#ffffff" className="opacity-80 transition-all cursor-pointer" />
                                <circle cx="0" cy="0" r="16" fill="transparent" />
                                <text id="label-2" x="0" y="25" textAnchor="middle" fill="#fff" className="text-sm font-bold uppercase opacity-70 tracking-wider font-sans transition-all">Projects</text>
                                <text x="0" y="40" textAnchor="middle" fill="#fff" className="text-xs font-bold uppercase opacity-90 cursor-pointer hover:underline">Click to Enter</text>
                            </g>

                            {/* 4. Experience */}
                            <g id="marker-group-3" transform="translate(790, 480)" className="pointer-events-auto cursor-pointer" onClick={() => navigate('/experience')}>
                                <circle id="marker-3" cx="0" cy="0" r="8" fill="#ffffff" className="opacity-80 transition-all cursor-pointer" />
                                <circle cx="0" cy="0" r="16" fill="transparent" />
                                <text id="label-3" x="0" y="25" textAnchor="middle" fill="#fff" className="text-sm font-bold uppercase opacity-70 tracking-wider font-sans transition-all">Experience</text>
                                <text x="0" y="40" textAnchor="middle" fill="#fff" className="text-xs font-bold uppercase opacity-90 cursor-pointer hover:underline">Click to Enter</text>
                            </g>

                            {/* 5. Contact */}
                            <g id="marker-group-4" transform="translate(680, 100)" className="pointer-events-auto cursor-pointer" onClick={() => navigate('/contact')}>
                                <circle id="marker-4" cx="0" cy="0" r="8" fill="#ffffff" className="opacity-80 transition-all cursor-pointer" />
                                <circle cx="0" cy="0" r="16" fill="transparent" />
                                <text id="label-4" x="0" y="-15" textAnchor="middle" fill="#fff" className="text-sm font-bold uppercase opacity-70 tracking-wider font-sans transition-all">Contact</text>
                                <text x="0" y="-30" textAnchor="middle" fill="#fff" className="text-xs font-bold uppercase opacity-90 cursor-pointer hover:underline">Complete Journey</text>
                            </g>
                        </svg>
                    </div>

                    {/* Right: Bike Image & Headlight Animation */}
                    <div className="w-1/2 h-full flex items-center justify-center relative">
                        <div className="relative max-w-lg w-full">
                            {/* Base Bike Image (Headlight OFF) */}
                            <img
                                src={bikeImage}
                                alt={theme.name}
                                className="w-full h-auto object-contain brightness-50 contrast-125 grayscale-[0.5]"
                            />
                            {/* Glow Overlay (Headlight ON - Animated) */}
                            <div
                                id="bike-headlight-glow"
                                className="absolute inset-0 opacity-0 pointer-events-none"
                                style={{
                                    backgroundImage: `url(${bikeImage})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    filter: 'brightness(1.5) drop-shadow(0 0 30px rgba(255,255,255,0.8))'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator helper */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-pulse">
                    <span className="uppercase tracking-[0.2em] text-[10px] text-white">Scroll Down</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                </div>
            </div>
        </motion.div>
    );
}
