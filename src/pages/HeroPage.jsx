import React from 'react';
import { motion } from 'framer-motion';

/**
 * HeroPage Component
 * Full-viewport garage background with conical spotlight
 * "RUDRANSH'S GARAGE" title with red glow
 */
const HeroPage = () => {
    return (
        <section id="hero" className="hero-section">
            {/* Dark garage background */}
            <div className="hero-bg" />

            {/* Conical warm white light from top */}
            <div className="hero-conical-light" />
            <div className="hero-spotlight" />

            {/* Dark gradient overlay at edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 4.5 }}
                >
                    {/* Subtitle */}
                    <motion.p
                        className="hero-subtitle mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 5 }}
                    >
                        — Est. 2024 —
                    </motion.p>

                    {/* Main title */}
                    <h1 className="hero-title">
                        Rudransh's
                        <br />
                        <span className="text-gradient-red">Garage</span>
                    </h1>

                    {/* Bike names */}
                    <motion.div
                        className="mt-8 flex flex-wrap justify-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 5.5 }}
                    >
                        {['Ninja H2', 'Panigale V4', 'S1000RR', 'Hayabusa', 'MV Agusta'].map((bike, i) => (
                            <span
                                key={bike}
                                className="px-3 py-1 text-xs font-heading tracking-widest uppercase text-white/40 border border-white/10 rounded-full"
                            >
                                {bike}
                            </span>
                        ))}
                    </motion.div>

                    {/* Headlight glow effect */}
                    <motion.div
                        className="mt-12 flex justify-center gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 5.8 }}
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-3 h-3 rounded-full bg-yellow-400/60"
                                animate={{
                                    opacity: [0.4, 0.9, 0.4],
                                    boxShadow: [
                                        '0 0 10px rgba(255, 215, 0, 0.3)',
                                        '0 0 25px rgba(255, 215, 0, 0.6)',
                                        '0 0 10px rgba(255, 215, 0, 0.3)',
                                    ],
                                }}
                                transition={{
                                    duration: 2 + i * 0.3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                            <motion.div
                                className="w-1.5 h-1.5 bg-red-500 rounded-full"
                                animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroPage;
