import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import useThemeStore from '../../store/themeStore';
import { PROJECTS_DATA } from '../../data/portfolioData';

const MotionDiv = motion.div;

function ProjectTech({ tech, theme }) {
    return (
        <span
            className="rounded-full border px-3 py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/80 whitespace-nowrap"
            style={{
                borderColor: `rgba(${theme.primaryRgb}, 0.28)`,
                background: `rgba(${theme.primaryRgb}, 0.12)`,
            }}
        >
            {tech}
        </span>
    );
}

function TiltProjectCard({ project, theme, index }) {
    const cardRef = useRef(null);

    // Track mouse position relative to the center of the card
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics for the mouse movement
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    // Map mouse position (-1 to 1) to rotation degrees
    const rotateX = useTransform(mouseYSpring, [-1, 1], [15, -15]);
    const rotateY = useTransform(mouseXSpring, [-1, 1], [-15, 15]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Mouse position relative to center (ranges from -1 to 1)
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) * 2 - 1;
        const yPct = (mouseY / height) * 2 - 1;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <MotionDiv
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full flex"
            initial={{ opacity: 0, y: 100, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
            style={{
                perspective: 1200,
            }}
        >
            <motion.article
                className="w-full h-full flex flex-col justify-between items-center text-center overflow-hidden rounded-[24px] sm:rounded-[30px] border p-8 sm:p-10 lg:p-12 backdrop-blur-xl shadow-lg relative group transition-colors duration-500"
                style={{
                    borderColor: `${project.color}35`,
                    background: 'rgba(15,15,15,0.7)',
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Glow behind card on hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl -z-10"
                    style={{ background: `radial-gradient(circle at center, ${project.color}20, transparent 70%)` }}
                />

                <div
                    className="absolute inset-x-0 top-0 h-[3px] sm:h-[4px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                />

                <div style={{ transform: 'translateZ(40px)' }} className="flex flex-col items-center">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-medium" style={{ color: project.color }}>
                        {project.label}
                    </p>

                    <h3 className="mt-3 text-2xl sm:text-3xl font-black leading-tight text-white drop-shadow-md">
                        {project.title}
                    </h3>

                    <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-white/70 max-w-sm">
                        {project.overview}
                    </p>
                </div>

                <div className="mt-8 space-y-3 flex flex-col items-center" style={{ transform: 'translateZ(20px)' }}>
                    {project.outcomes.slice(0, 2).map((outcome, i) => (
                        <div key={i} className="flex items-center gap-3 max-w-xs sm:max-w-sm">
                            <span
                                className="h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full shadow-[0_0_8px_currentColor]"
                                style={{ backgroundColor: project.color, color: project.color }}
                            />
                            <p className="text-[13px] sm:text-sm leading-relaxed text-white/80">{outcome}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-2" style={{ transform: 'translateZ(30px)' }}>
                    {project.tech.map((tech) => (
                        <ProjectTech key={tech} tech={tech} theme={theme} />
                    ))}
                </div>
            </motion.article>
        </MotionDiv>
    );
}

export default function ProjectsSection() {
    const { theme } = useThemeStore();

    return (
        <section id="projects" className="relative w-full bg-transparent py-24 sm:py-32 overflow-hidden flex flex-col items-center">
            {/* Background ambient glows */}
            <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
                <div
                    className="absolute w-full h-full opacity-10"
                    style={{ background: `radial-gradient(circle at top, rgba(${theme.primaryRgb},0.4), transparent 60%)` }}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl flex flex-col items-center">
                
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16 sm:mb-24 flex flex-col items-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-[11px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.5em] text-white/60 mb-4">
                        Innovation & Engineering
                    </p>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white hover:text-white/90 transition-colors drop-shadow-2xl inline-block" style={{ textShadow: `0 0 40px rgba(${theme.primaryRgb}, 0.3)`}}>
                        PROJECT CATALOG
5                    </h2>
                </motion.div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 w-full place-items-center">
                     {PROJECTS_DATA.map((project, index) => (
                         <TiltProjectCard
                             key={project.id}
                             project={project}
                             index={index}
                             theme={theme}
                         />
                     ))}
                </div>

            </div>
        </section>
    );
}
