import React from 'react';
import { motion } from 'framer-motion';

/**
 * Inline SVG bike icons for the road animation
 * Each bike is a small stylized silhouette
 */
const BikeIcon = ({ color = '#DC143C' }) => (
    <svg width="70" height="45" viewBox="0 0 100 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M20 42 C20 42 25 22 42 18 L58 16 C62 15 66 18 68 22 L72 32 L80 28 C84 26 88 28 88 32 L88 40 C88 44 84 48 80 48 L72 48 L68 48 C68 48 66 40 60 40 L42 40 C38 40 34 42 32 46 L30 48 L20 48 C16 48 14 42 20 42Z"
            fill={color}
        />
        <circle cx="72" cy="50" r="10" fill="none" stroke="#777" strokeWidth="3.5" />
        <circle cx="72" cy="50" r="3" fill="#555" />
        <circle cx="30" cy="50" r="10" fill="none" stroke="#777" strokeWidth="3.5" />
        <circle cx="30" cy="50" r="3" fill="#555" />
        <ellipse cx="84" cy="30" rx="3" ry="2" fill="#FFD700" opacity="0.9" />
    </svg>
);

const bikes = [
    { name: 'Kawasaki Ninja H2', color: '#22c55e' },
    { name: 'Ducati Panigale V4', color: '#DC143C' },
    { name: 'BMW S1000RR', color: '#3b82f6' },
    { name: 'Suzuki Hayabusa', color: '#94a3b8' },
    { name: 'MV Agusta 1000RR', color: '#ef4444' },
];

/**
 * AboutPage Component
 * Left: About me card | Right: Profile in tire frame
 * Bottom: Animated road with bikes riding across
 */
const AboutPage = () => {
    return (
        <section id="about" className="relative py-24 px-4 bg-garage-dark overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title">About the Rider</h2>
                    <div className="glow-line w-20 mx-auto mt-6" />
                </motion.div>

                {/* Content grid */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left - About card */}
                    <motion.div
                        className="flex-1 order-2 lg:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="garage-card">
                            <h3 className="font-racing text-2xl text-white mb-4">
                                Who Am I?
                            </h3>
                            <div className="space-y-4 text-gray-300 text-lg leading-relaxed font-body">
                                <p>
                                    Hey there! I'm <span className="text-gradient-red font-semibold">Rudransh</span>, a passionate
                                    developer and motorcycle enthusiast. I build digital experiences that are as thrilling
                                    as a ride on the open road.
                                </p>
                                <p>
                                    With a love for clean code and powerful machines, I bring the same precision and
                                    attention to detail to my development work as an engineer does to a finely tuned
                                    superbike engine.
                                </p>
                                <p>
                                    When I'm not coding, you'll find me dreaming about my next ride on a Ducati Panigale V4
                                    or exploring new tech stacks that push the boundaries of what's possible.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-700/50">
                                {[
                                    { value: '10+', label: 'Projects' },
                                    { value: '5+', label: 'Skills' },
                                    { value: '∞', label: 'Passion' },
                                ].map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <span className="block text-2xl font-heading text-red-500">{stat.value}</span>
                                        <span className="text-sm text-gray-500 uppercase tracking-wider font-heading">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Tire frame with profile */}
                    <motion.div
                        className="flex-shrink-0 order-1 lg:order-2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="tire-frame">
                            {/* Spinning tire ring */}
                            <div className="tire-ring" />

                            {/* Profile image inside tire */}
                            <div className="relative z-10">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                                    alt="Rudransh - Profile"
                                    className="profile-in-tire"
                                />
                            </div>

                            {/* Red glow behind tire */}
                            <div className="absolute inset-0 rounded-full bg-red-500/10 blur-xl -z-10" />
                        </div>
                    </motion.div>
                </div>

                {/* Animated Road with Bikes */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="road-strip">
                        {/* Road center dashes */}
                        <div className="road-dashes" />

                        {/* Road edge lines */}
                        <div className="absolute top-2 left-0 w-full h-px bg-yellow-500/20" />
                        <div className="absolute bottom-2 left-0 w-full h-px bg-yellow-500/20" />

                        {/* Bikes riding across */}
                        {bikes.map((bike, index) => (
                            <div key={bike.name} className="bike-on-road">
                                <div className="relative">
                                    <span className="bike-label">{bike.name}</span>
                                    <BikeIcon color={bike.color} />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutPage;
