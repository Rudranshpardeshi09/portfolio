import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_DATA } from '../../data/portfolioData';
import TiltedCard from '../reactbits/TiltedCard';
import VariableProximity from '../reactbits/VariableProximity';
import RotatingText from '../reactbits/RotatingText';
import useThemeStore from '../../store/themeStore';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const container3DRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const statsRef = useRef([]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // 3D Parallax values
    const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
    const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
    const textTranslateZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 0]);
    const imageTranslateZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, -50, 0]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Stats counter animation (entry only)
            statsRef.current.forEach((stat, i) => {
                if (!stat) return;
                gsap.fromTo(stat,
                    { opacity: 0, y: 30, scale: 0.8 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.6, ease: 'back.out(1.5)',
                        delay: 0.5 + i * 0.1,
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="section-container relative flex items-center justify-center py-24 md:py-32 overflow-hidden perspective-2000"
        >
            {/* 3D Background Decorative Element */}
            <motion.div 
                style={{ 
                    rotate: scrollYProgress,
                    rotateX: useTransform(scrollYProgress, [0, 1], [0, 360]),
                    y: useTransform(scrollYProgress, [0, 1], [0, 200]),
                    opacity: 0.05
                }}
                className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border-[60px] border-white pointer-events-none"
            />

            <motion.div 
                ref={container3DRef}
                style={{ 
                    rotateX, 
                    rotateY,
                    transformStyle: 'preserve-3d'
                }}
                className="section-inner w-full transform-gpu"
            >
                <div
                    className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 w-full"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Image Left */}
                    <motion.div
                        ref={imageRef}
                        style={{ translateZ: imageTranslateZ, transformStyle: 'preserve-3d' }}
                        className="lg:w-1/2 flex justify-center items-center"
                    >
                        <div className="relative group">
                            <TiltedCard
                                maxRotateX={20}
                                maxRotateY={20}
                                scaleOnHover={1.05}
                                className="w-[280px] h-[360px] sm:w-[330px] sm:h-[430px] lg:w-[420px] lg:h-[520px] rounded-3xl p-4 mx-auto flex items-center justify-center transition-all duration-700"
                            >
                                <div
                                    className="w-full h-full rounded-3xl p-4"
                                    style={{
                                        background: `conic-gradient(from 180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.4), rgba(255,255,255,0.05))`,
                                        boxShadow: `0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(${theme.primaryRgb}, 0.05)`,
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    <div className="w-full h-full rounded-2xl overflow-hidden border-[6px] border-white/5 relative group/img">
                                        <img 
                                            src="/my-pfp/pfp.jpg" 
                                            alt="Rudransh Pardeshi"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </TiltedCard>
                            
                            {/* Depth glow behind image */}
                            <div
                                className="absolute inset-0 rounded-full opacity-20 blur-3xl pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle, ${theme.primary} 0%, transparent 70%)`,
                                    transform: 'translateZ(-100px) scale(1.5)',
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Text Right */}
                    <motion.div 
                        ref={textRef} 
                        style={{ translateZ: textTranslateZ, transformStyle: 'preserve-3d' }}
                        className="lg:w-[55%] flex flex-col justify-center transform-gpu"
                    >
                        <div className="w-full glass-strong p-10 md:p-14 lg:p-16 rounded-[40px] border border-white/10 relative overflow-hidden group shadow-2xl transition-all duration-500"
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                backdropFilter: 'blur(40px)',
                                transformStyle: 'preserve-3d',
                            }}>
                            
                            {/* Light Sheen Effect */}
                            <motion.div 
                                style={{ 
                                    left: useTransform(scrollYProgress, [0, 1], ['-100%', '200%']),
                                    rotate: 25 
                                }}
                                className="absolute top-0 w-20 h-full bg-white/10 blur-xl pointer-events-none"
                            />

                            {/* Heading */}
                            <div className="relative mb-16 inline-block">
                                <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter"
                                    style={{
                                        WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                                        color: 'transparent',
                                    }}>
                                    About Me
                                </h2>
                                <h2 className="absolute top-0 left-0 text-5xl lg:text-7xl font-black uppercase tracking-tighter"
                                    style={{ color: theme.primary }}>
                                    About Me
                                </h2>
                                <div className="h-1.5 w-24 mt-4" style={{ backgroundColor: theme.primary }} />
                            </div>

                            <div className="mb-12">
                                <p className="mb-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/40">
                                    Intelligent Products. Full-Stack Delivery.
                                </p>
                                <h3
                                    className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight"
                                >
                                    I build as an{' '}
                                    <span className="text-white">
                                        <RotatingText
                                            texts={['Full Stack Developer', 'AI/ML Engineer', 'MCA Candidate']}
                                        />
                                    </span>
                                </h3>
                            </div>

                            {/* Bio Paragraphs with Improved Spacing */}
                            <div className="space-y-10 mb-16">
                                <div className="p-2 md:p-4 rounded-2xl transition-colors">
                                    <VariableProximity
                                        text={ABOUT_DATA.bio}
                                        radius={200}
                                        className="text-white/80 text-lg md:text-xl lg:text-2xl leading-[1.6] font-medium tracking-tight"
                                    />
                                </div>
                                <p className="text-white/50 text-base md:text-lg lg:text-xl leading-relaxed italic border-l-2 pl-8 border-white/10">
                                    {ABOUT_DATA.bio2}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                {ABOUT_DATA.stats.map((stat, i) => (
                                    <div
                                        key={stat.label}
                                        ref={(el) => (statsRef.current[i] = el)}
                                        className="text-center group/stat"
                                    >
                                        <div
                                            className="text-3xl md:text-4xl font-black mb-1 text-white group-hover/stat:text-gradient transition-all"
                                            style={{ letterSpacing: '-0.05em' }}
                                        >
                                            {stat.value}
                                        </div>
                                        <div className="text-[9px] text-white/30 font-bold uppercase tracking-[0.2em]">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
