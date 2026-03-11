import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import useThemeStore from '../../store/themeStore';
import AnimatedLogo from '../ui/AnimatedLogo';
import LordIcon from '../ui/LordIcon';
import { SKILLS_DATA } from '../../data/portfolioData';

function SkillCard({ category, idx, theme }) {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);

        // For the sheen overlay
        cardRef.current.style.setProperty('--mouse-x', `${mouseX}px`);
        cardRef.current.style.setProperty('--mouse-y', `${mouseY}px`);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        if (cardRef.current) {
            cardRef.current.style.setProperty('--mouse-x', `50%`);
            cardRef.current.style.setProperty('--mouse-y', `50%`);
        }
    };

    // Map category to LordIcon type
    const getIconType = (cat) => {
        const lower = cat.toLowerCase();
        if (lower.includes('programming') || lower.includes('frontend')) return 'frontend';
        if (lower.includes('frameworks') || lower.includes('web') || lower.includes('backend')) return 'backend';
        if (lower.includes('ai') || lower.includes('data')) return 'data';
        return 'tools';
    };

    // Dynamic layout logic: Larger categories with more content get more space
    const skillCount = category.skills.length;
    let colSpan = 'lg:col-span-1';
    
    if (skillCount > 6) {
        colSpan = 'lg:col-span-2';
    } else if (skillCount <= 2 && idx % 2 === 0) {
        // Just for extra unsymmetric spice, make some small ones even smaller or offset
        colSpan = 'lg:col-span-1';
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className={`relative group p-8 md:p-10 xl:p-12 rounded-[50px] bg-white/[0.03] border-2 border-white/10 hover:border-${theme.primary}/30 backdrop-blur-2xl hover:bg-white/[0.05] transition-all duration-500 transform-gpu ${colSpan}`}
            style={{
                borderColor: `${theme.primary}22`,
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Glass Sheen Overlay */}
            <motion.div 
                style={{
                    background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1) 0%, transparent 80%)`,
                    transform: 'translateZ(50px)',
                }}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-[50px]"
            />

            <div className="flex items-center gap-6 mb-12" style={{ transform: 'translateZ(60px)' }}>
                <LordIcon type={getIconType(category.category)} theme={theme} />
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
                    {category.category}
                </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 gap-y-8" style={{ transform: 'translateZ(40px)' }}>
                {category.skills.map((skill) => {
                    const getLogoPath = (name) => {
                        const mapping = {
                            'C++': 'cpp',
                            'Scikit-learn': 'scikitlearn',
                            'HTML5': 'html5',
                            'CSS3': 'css3',
                            'Hugging Face': 'huggingface',
                            'Jupyter Notebook': 'jupyternotebook'
                        };
                        const base = mapping[name] || name.toLowerCase().replace(/\s+/g, '');
                        return `/tech-logos/${base}.svg`;
                    };

                    return (
                        <div key={skill.name} className="flex justify-center items-center transform-gpu transition-transform duration-500 hover:scale-105">
                            <AnimatedLogo
                                name={skill.name}
                                src={getLogoPath(skill.name)}
                                alt={skill.name}
                                theme={theme}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Decorative Corner Glow */}
            <div 
                className="absolute -top-10 -right-10 w-48 h-48 blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
                style={{ backgroundColor: theme.primary }}
            />
        </motion.div>
    );
}

export default function SkillsSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const globalRotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);

    const titleLetters = "SKILLS & ARSENAL".split("");

    return (
        <section id="skills" ref={sectionRef} className="section-container relative z-10 py-32 overflow-hidden perspective-2000">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10"
                    style={{ background: `radial-gradient(circle, ${theme.primary} 0%, transparent 70%)` }}
                />
                
                {/* Floating Decorative Particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, 20, 0],
                            rotate: [0, 180, 360],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute w-2 h-2 rounded-full border border-white/20"
                        style={{
                            top: `${20 + i * 15}%`,
                            left: `${10 + (i * 17) % 80}%`,
                            backgroundColor: i % 2 === 0 ? theme.primary : 'transparent',
                            boxShadow: i % 2 === 0 ? `0 0 20px ${theme.primary}` : 'none'
                        }}
                    />
                ))}

                {/* 3D Grid floor effect */}
                <div 
                    className="absolute bottom-0 left-0 w-full h-1/2 opacity-20"
                    style={{ 
                        backgroundImage: `linear-gradient(to right, ${theme.primary}22 1px, transparent 1px), linear-gradient(to bottom, ${theme.primary}22 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                        transform: 'rotateX(75deg) translateY(150px)',
                        transformOrigin: 'bottom'
                    }}
                />
            </div>

            <div className="section-inner relative z-10">
                <div className="text-center mb-24">
                    <div className="flex justify-center flex-wrap gap-x-3 md:gap-x-5">
                        {titleLetters.map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20, rotateX: 90 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: i % 2 === 0 ? 5 : -5 }}
                                transition={{ delay: i * 0.05, duration: 0.5, type: 'spring' }}
                                className={`text-6xl md:text-8xl font-black uppercase tracking-tighter inline-block shadow-sm ${i % 3 === 0 ? 'mt-4' : i % 3 === 1 ? '-mt-2' : ''}`}
                                style={{ 
                                    color: char === "&" ? theme.primary : 'white',
                                    textShadow: char === "&" ? `0 0 20px ${theme.primary}66` : 'none',
                                    transform: `rotateY(${i % 2 === 0 ? '10deg' : '-10deg'})`
                                }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-white/30 uppercase tracking-[0.5em] font-bold text-[10px] md:text-xs mt-8"
                    >
                        High-performance tech stack & 3D interactions
                    </motion.p>
                </div>

                <motion.div 
                    style={{ rotateX: globalRotateX }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 lg:gap-16 transform-gpu px-4 md:px-8"
                >
                    {SKILLS_DATA.map((category, idx) => (
                        <SkillCard 
                            key={category.category} 
                            category={category} 
                            idx={idx} 
                            theme={theme} 
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
