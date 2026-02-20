import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Speedometer-style skill progress indicator
 */
const SpeedometerSkill = ({ name, level, icon, delay = 0 }) => {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // Calculate the needle rotation (from -90deg to 90deg based on level)
    const rotation = -90 + (level / 100) * 180;

    return (
        <motion.div
            ref={ref}
            className="garage-card flex flex-col items-center p-6 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
        >
            {/* Speedometer gauge */}
            <div className="relative w-32 h-20 mb-4">
                <svg viewBox="0 0 120 70" className="w-full h-full">
                    {/* Track */}
                    <path
                        d="M 10 65 A 50 50 0 0 1 110 65"
                        fill="none"
                        stroke="#2a2a2a"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                    {/* Fill based on level */}
                    <path
                        d="M 10 65 A 50 50 0 0 1 110 65"
                        fill="none"
                        stroke="url(#speedGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${(level / 100) * 157} 157`}
                        className="transition-all duration-1000 ease-out"
                        style={{
                            strokeDasharray: inView ? `${(level / 100) * 157} 157` : '0 157',
                        }}
                    />
                    {/* Gradient */}
                    <defs>
                        <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#DC143C" />
                            <stop offset="100%" stopColor="#ff4444" />
                        </linearGradient>
                    </defs>
                    {/* Needle */}
                    <line
                        x1="60"
                        y1="65"
                        x2="60"
                        y2="25"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="origin-bottom transition-transform duration-1000 ease-out"
                        style={{
                            transform: `rotate(${inView ? rotation : -90}deg)`,
                            transformOrigin: '60px 65px',
                        }}
                    />
                    {/* Center dot */}
                    <circle cx="60" cy="65" r="4" fill="#DC143C" />
                </svg>

                {/* Level text */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
                    <span className="font-heading text-sm text-red-500">{level}%</span>
                </div>
            </div>

            {/* Icon */}
            <span className="text-3xl mb-2">{icon}</span>

            {/* Name */}
            <h3 className="font-heading text-sm text-white tracking-wider uppercase group-hover:text-red-500 transition-colors">
                {name}
            </h3>
        </motion.div>
    );
};

const skills = [
    { name: 'React', level: 90, icon: '⚛️' },
    { name: 'JavaScript', level: 85, icon: '🟨' },
    { name: 'Python', level: 80, icon: '🐍' },
    { name: 'Node.js', level: 75, icon: '🟩' },
    { name: 'TypeScript', level: 70, icon: '🔷' },
    { name: 'CSS / Tailwind', level: 88, icon: '🎨' },
    { name: 'MongoDB', level: 72, icon: '🍃' },
    { name: 'Git', level: 82, icon: '📦' },
];

/**
 * SkillsPage Component
 * Speedometer-style skill progress indicators with garage-themed cards
 */
const SkillsPage = () => {
    return (
        <section id="skills" className="relative py-24 px-4 bg-garage-darkest overflow-hidden">
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 50px, rgba(220,20,60,0.1) 50px, rgba(220,20,60,0.1) 51px
          ), repeating-linear-gradient(
            90deg, transparent, transparent 50px, rgba(220,20,60,0.1) 50px, rgba(220,20,60,0.1) 51px
          )`
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title">Engine Specs</h2>
                    <p className="text-gray-400 mt-6 font-body text-lg">
                        My technical horsepower — the tools that drive my projects
                    </p>
                    <div className="glow-line w-20 mx-auto mt-4" />
                </motion.div>

                {/* Skills grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <SpeedometerSkill
                            key={skill.name}
                            name={skill.name}
                            level={skill.level}
                            icon={skill.icon}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsPage;
