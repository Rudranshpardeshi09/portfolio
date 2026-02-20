import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * WelcomeScreen Component
 * Displays "Welcome to My Garage" with Ducati image fill text
 * Animates: zoom out → pause → zoom in → reveal main content
 */
const WelcomeScreen = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Auto dismiss after animation completes
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
        }, 4200);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="welcome-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Background particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-red-500 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    opacity: [0, 0.6, 0],
                                    scale: [0, 1.5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    delay: Math.random() * 2,
                                    repeat: Infinity,
                                }}
                            />
                        ))}
                    </div>

                    {/* Red glow lines */}
                    <motion.div
                        className="absolute top-1/2 left-0 w-full h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, #DC143C, transparent)' }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2, delay: 0.5 }}
                    />

                    {/* Main text container with zoom animation */}
                    <motion.div
                        className="relative flex flex-col items-center justify-center z-10 px-4"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{
                            scale: [1, 1, 0.7, 0.7, 4],
                            opacity: [0, 1, 1, 1, 0],
                        }}
                        transition={{
                            duration: 4,
                            times: [0, 0.15, 0.35, 0.55, 0.85],
                            ease: "easeInOut",
                        }}
                    >
                        {/* Outline text (behind) */}
                        <span className="welcome-text-outline" aria-hidden="true">
                            Welcome to<br />My Garage
                        </span>

                        {/* Image-filled text */}
                        <h1 className="welcome-text">
                            Welcome to<br />My Garage
                        </h1>
                    </motion.div>

                    {/* Animated rev line at bottom */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 3, delay: 0.5 }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-red-500" />
                            <span className="text-red-500 font-heading text-xs tracking-[0.3em] uppercase">
                                Loading Garage
                            </span>
                            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-red-500" />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeScreen;
