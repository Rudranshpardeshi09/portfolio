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

            // Marker highlight animations (optional glow effect when nearby)
            checkpoints.forEach((cp, index) => {
                const markerTriggerStart = cp.fraction * 100 - 10;
                const markerTriggerEnd = cp.fraction * 100 + 10;

                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: `${markerTriggerStart}% top`,
                    end: `${markerTriggerEnd}% top`,
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
            className="w-full bg-black relative"
            ref={containerRef}
        >
            {/* Scrollable container to drive scroll trigger (500vh makes it scrollable) */}
            <div className="h-[400vh] w-full" />

            {/* Sticky map container */}
            <div
                ref={mapContainerRef}
                className="fixed top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Ambient glow */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${theme.primary}66, transparent 60%)` }}
                />

                {/* Top Nav */}
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between z-50">
                    <button
                        onClick={handleBackToStart}
                        className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-all group"
                        style={{ border: `1px solid ${theme.primary}55` }}
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium text-sm tracking-wider uppercase text-white">Switch Machine</span>
                    </button>

                    <div className="text-center bg-black/50 px-6 py-2 rounded-full glass backdrop-blur-md hidden sm:block">
                        <span className="text-gray-300 text-sm tracking-[0.2em] font-medium uppercase">
                            Scroll to navigate the journey
                        </span>
                    </div>
                </div>

                {/* SVG Map */}
                <div className="relative w-full max-w-5xl aspect-[16/9] px-4 md:px-12 pointer-events-none">
                    <svg
                        viewBox="0 0 1000 600"
                        className="w-full h-full drop-shadow-2xl"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={theme.primary} stopOpacity="0.2" />
                                <stop offset="50%" stopColor={theme.primary} stopOpacity="0.8" />
                                <stop offset="100%" stopColor={theme.primary} stopOpacity="0.2" />
                            </linearGradient>

                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="8" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Winding Loop Path - Looks like a racetrack circuit or simple loop */}
                        {/* We use a closed path (M... Z) or a continuous open path that looks like a journey */}
                        <path
                            id="journeyPath"
                            d="M 100,500 C 50,500 50,100 200,100 C 400,100 400,500 600,500 C 800,500 900,450 900,300 C 900,100 700,50 500,200"
                            fill="none"
                            stroke="url(#pathGradient)"
                            strokeWidth="4"
                            strokeDasharray="10 10"
                            className="opacity-60"
                        />

                        {/* Solid underlying track */}
                        <path
                            d="M 100,500 C 50,500 50,100 200,100 C 400,100 400,500 600,500 C 800,500 900,450 900,300 C 900,100 700,50 500,200"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="1"
                            strokeOpacity="0.1"
                        />

                        {/* Rider Circle */}
                        <g ref={riderRef} className="z-50" style={{ transformOrigin: "center" }}>
                            <circle cx="0" cy="0" r="12" fill={theme.primary} filter="url(#glow)" />
                            {/* Inner core */}
                            <circle cx="0" cy="0" r="4" fill="#ffffff" />
                        </g>

                        {/* Checkpoint Markers - Rendered visually on the path.
                            The coordinates match the approximate fractional position on the path above. 
                            (0.1 -> Around About, 0.3 -> Skills, etc.) 
                            We approximate the x,y coordinates since GSAP motion path handles the actual rider.
                        */}
                        {/* 1. About */}
                        <g id="marker-group-0" transform="translate(100, 310)" className="pointer-events-auto cursor-pointer" onClick={() => navigate('/about')}>
                            <circle id="marker-0" cx="0" cy="0" r="8" fill={theme.primary} className="opacity-60 transition-all cursor-pointer" />
                            <circle cx="0" cy="0" r="16" fill="transparent" /> {/* Hitbox */}
                            <text id="label-0" x="0" y="25" textAnchor="middle" fill="#fff" className="text-sm font-bold uppercase opacity-50 tracking-wider font-sans transition-all">About</text>
                            <text x="0" y="40" textAnchor="middle" fill={theme.primary} className="text-xs font-bold uppercase opacity-80 cursor-pointer hover:underline">Click to Enter</text>
                        </g>

                        {/* 2. Skills */}
                        <g id="marker-group-1" transform="translate(250, 170)" className="pointer-events-auto cursor-pointer" onClick={() => navigate('/skills')}>
                            <circle id="marker-1" cx="0" cy="0" r="8" fill={theme.primary} className="opacity-60 transition-all cursor-pointer" />
                            <circle cx="0" cy="0" r="16" fill="transparent" />
                            <text id="label-1" x="0" y="-15" textAnchor="middle" fill="#fff" className="text-sm font-bold uppercase opacity-50 tracking-wider font-sans transition-all">Skills</text>
                            <text x="0" y="-30" textAnchor="middle" fill={theme.primary} className="text-xs font-bold uppercase opacity-80 cursor-pointer hover:underline">Click to Enter</text>
                        </g>

                        {/* 3. Projects */}
                        <g id="marker-group-2" transform="translate(480, 420)" className="pointer-events-auto cursor-pointer" onClick={() => navigate('/projects')}>
                            <circle id="marker-2" cx="0" cy="0" r="8" fill={theme.primary} className="opacity-60 transition-all cursor-pointer" />
                            <circle cx="0" cy="0" r="16" fill="transparent" />
                            <text id="label-2" x="0" y="25" textAnchor="middle" fill="#fff" className="text-sm font-bold uppercase opacity-50 tracking-wider font-sans transition-all">Projects</text>
                            <text x="0" y="40" textAnchor="middle" fill={theme.primary} className="text-xs font-bold uppercase opacity-80 cursor-pointer hover:underline">Click to Enter</text>
                        </g>

                        {/* 4. Experience */}
                        <g id="marker-group-3" transform="translate(790, 480)" className="pointer-events-auto cursor-pointer" onClick={() => navigate('/experience')}>
                            <circle id="marker-3" cx="0" cy="0" r="8" fill={theme.primary} className="opacity-60 transition-all cursor-pointer" />
                            <circle cx="0" cy="0" r="16" fill="transparent" />
                            <text id="label-3" x="0" y="25" textAnchor="middle" fill="#fff" className="text-sm font-bold uppercase opacity-50 tracking-wider font-sans transition-all">Experience</text>
                            <text x="0" y="40" textAnchor="middle" fill={theme.primary} className="text-xs font-bold uppercase opacity-80 cursor-pointer hover:underline">Click to Enter</text>
                        </g>

                        {/* 5. Contact */}
                        <g id="marker-group-4" transform="translate(680, 100)" className="pointer-events-auto cursor-pointer" onClick={() => navigate('/contact')}>
                            <circle id="marker-4" cx="0" cy="0" r="8" fill={theme.primary} className="opacity-60 transition-all cursor-pointer" />
                            <circle cx="0" cy="0" r="16" fill="transparent" />
                            <text id="label-4" x="0" y="-15" textAnchor="middle" fill="#fff" className="text-sm font-bold uppercase opacity-50 tracking-wider font-sans transition-all">Contact</text>
                            <text x="0" y="-30" textAnchor="middle" fill={theme.primary} className="text-xs font-bold uppercase opacity-80 cursor-pointer hover:underline">Complete Journey</text>
                        </g>

                    </svg>
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
