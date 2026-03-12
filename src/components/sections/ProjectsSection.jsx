import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useThemeStore from '../../store/themeStore';
import { PROJECTS_DATA } from '../../data/portfolioData';

const MotionDiv = motion.div;

const ORBIT_RADIUS_X = 360;
const ORBIT_RADIUS_Y = 150;
const PROJECTS_SECTION_HEIGHT = '155vh';

function orbitPosition(angle) {
    const radians = (angle * Math.PI) / 180;

    return {
        x: `${Math.cos(radians) * ORBIT_RADIUS_X}px`,
        y: `${Math.sin(radians) * ORBIT_RADIUS_Y}px`,
    };
}

function ProjectTech({ tech, theme }) {
    return (
        <span
            className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/80"
            style={{
                borderColor: `rgba(${theme.primaryRgb}, 0.28)`,
                background: `rgba(${theme.primaryRgb}, 0.12)`,
            }}
        >
            {tech}
        </span>
    );
}

function OrbitProjectCard({ project, index, progress, theme }) {
    const orbitBaseRotation = useTransform(progress, [0, 1], [0, 360]);
    const cardAngle = useTransform(orbitBaseRotation, (value) => value + index * (360 / PROJECTS_DATA.length));
    const x = useTransform(cardAngle, (value) => orbitPosition(value).x);
    const y = useTransform(cardAngle, (value) => orbitPosition(value).y);
    const scale = useTransform(progress, [0, 0.5, 1], [0.86, 1, 0.86]);
    const rotateZ = useTransform(cardAngle, (value) => `${Math.sin((value * Math.PI) / 180) * 7}deg`);
    const rotateX = useTransform(cardAngle, (value) => `${8 - Math.abs(Math.cos((value * Math.PI) / 180)) * 10}deg`);

    return (
        <MotionDiv
            className="absolute left-1/2 top-1/2"
            style={{
                x,
                y,
                scale,
                rotateZ,
                rotateX,
                transformStyle: 'preserve-3d',
            }}
        >
            <article
                className="w-[320px] md:w-[350px] overflow-hidden rounded-[30px] border p-6 backdrop-blur-xl"
                style={{
                    borderColor: `${project.color}55`,
                    background: 'rgba(15,15,15,0.76)',
                    boxShadow: `0 18px 45px rgba(0,0,0,0.4), 0 0 28px ${project.color}28`,
                }}
            >
                <div
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                />

                <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: project.color }}>
                    {project.label}
                </p>

                <h3 className="mt-3 text-2xl font-black leading-tight text-white">
                    {project.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-white/70">
                    {project.overview}
                </p>

                <div className="mt-5 space-y-3">
                    {project.outcomes.slice(0, 2).map((outcome) => (
                        <div key={outcome} className="flex items-start gap-3">
                            <span
                                className="mt-2 h-2 w-2 shrink-0 rounded-full"
                                style={{ backgroundColor: project.color }}
                            />
                            <p className="text-sm leading-6 text-white/78">{outcome}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                        <ProjectTech key={tech} tech={tech} theme={theme} />
                    ))}
                </div>
            </article>
        </MotionDiv>
    );
}

export default function ProjectsSection() {
    const sectionRef = useRef(null);
    const { theme } = useThemeStore();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    const stageRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <section id="projects" ref={sectionRef} className="relative w-full bg-transparent">
            <div style={{ height: PROJECTS_SECTION_HEIGHT }}>
                <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-28"
                        style={{ background: `radial-gradient(circle at center, rgba(${theme.primaryRgb},0.18), transparent 70%)` }}
                    />

                    <div
                        className="absolute h-[170px] w-[170px] rounded-full blur-3xl"
                        style={{ background: `radial-gradient(circle, ${theme.primary}, transparent)` }}
                    />

                    <div className="absolute left-1/2 top-1/2 z-30 w-full max-w-5xl -translate-x-1/2 -translate-y-[46%] px-4 text-center pointer-events-none">
                        <p className="text-xs uppercase tracking-[0.42em] text-white/40">
                            AI & Full Stack Builds
                        </p>
                        <h2 className="mt-4 text-5xl font-black text-white md:text-6xl">
                            Project Galaxy
                        </h2>
                    </div>

                    <MotionDiv
                        className="relative h-[560px] w-[min(1000px,100vw)]"
                        style={{
                            rotate: stageRotate,
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {PROJECTS_DATA.map((project, index) => (
                            <OrbitProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                progress={scrollYProgress}
                                theme={theme}
                            />
                        ))}
                    </MotionDiv>
                </div>
            </div>
        </section>
    );
}
