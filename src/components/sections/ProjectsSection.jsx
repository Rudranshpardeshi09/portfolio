import { useState, useRef } from 'react';
import useThemeStore from '../../store/themeStore';
import { PROJECTS_DATA, SKILLS_DATA } from '../../data/portfolioData';
import ScrollStack, { ScrollStackItem } from '../reactbits/ScrollStack';
import LogoLoop from '../reactbits/LogoLoop';

export default function ProjectsSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="section-container relative"
        >
            <div className="section-inner" style={{ maxWidth: '100%' }}>
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="section-title text-gradient mx-auto">Projects</h2>
                    <p className="text-gray-500 mt-6 text-sm">
                        Keep scrolling to stack the projects
                    </p>
                </div>

                {/* Vertical Scroll Stack */}
                <ScrollStack
                    useWindowScroll={true}
                    itemDistance={50} // Margin between cards when unstacked
                    itemStackDistance={60} // Distance when stacked
                    baseScale={0.88} // Base scale of the cards underneath
                    stackPosition="15%" // Viewport Y pos where they pin
                    scaleEndPosition="5%" // Viewport Y pos where scales calculate
                    blurAmount={1.5} // Blur effect for background cards
                >
                    {PROJECTS_DATA.map((project, i) => (
                        <ScrollStackItem
                            key={project.id}
                            itemClassName={`transition-all duration-300 w-full max-w-4xl mx-auto h-[400px] cursor-pointer ${selectedProject === project.id ? 'scale-105' : ''}`}
                        >
                            <div
                                className="glass rounded-[30px] p-8 h-full relative overflow-hidden"
                                style={{
                                    borderColor: selectedProject === project.id
                                        ? `rgba(${theme.primaryRgb}, 0.5)`
                                        : 'rgba(255,255,255,0.08)',
                                    boxShadow: selectedProject === project.id
                                        ? `0 0 50px rgba(${theme.primaryRgb}, 0.2), 0 30px 60px rgba(0,0,0,0.5)`
                                        : '0 20px 40px rgba(0,0,0,0.3)',
                                    background: 'rgba(15, 15, 15, 0.85)',
                                    backdropFilter: 'blur(40px)',
                                }}
                                onClick={() => setSelectedProject(
                                    selectedProject === project.id ? null : project.id
                                )}
                            >
                                {/* Top color bar */}
                                <div
                                    className="absolute top-0 left-0 w-full h-2"
                                    style={{
                                        background: `linear-gradient(90deg, ${project.color}, transparent)`,
                                    }}
                                />

                                <div className="flex flex-col md:flex-row h-full gap-8 mt-2">
                                    <div className="flex-1 flex flex-col justify-center">
                                        <div
                                            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl font-black shadow-lg"
                                            style={{
                                                background: `rgba(${theme.primaryRgb}, 0.1)`,
                                                color: project.color,
                                                border: `1px solid ${project.color}33`,
                                                fontFamily: 'var(--font-display)',
                                            }}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </div>

                                        <h3 className="text-3xl font-bold text-white mb-4 transition-all">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                                            {project.description}
                                        </p>

                                        {/* Tech stack */}
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {project.tech.map((t) => (
                                                <span
                                                    key={t}
                                                    className="text-sm font-mono px-4 py-2 rounded-xl"
                                                    style={{
                                                        background: `rgba(${theme.primaryRgb}, 0.08)`,
                                                        color: theme.primary,
                                                        border: `1px solid rgba(${theme.primaryRgb}, 0.15)`,
                                                    }}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="hidden md:flex flex-col justify-end items-end h-full">
                                        {/* View button */}
                                        <a
                                            href={project.link}
                                            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 group/btn"
                                            style={{
                                                background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                                                color: theme.key === 'bmw' ? '#000' : '#fff',
                                                boxShadow: `0 0 30px rgba(${theme.primaryRgb}, 0.3)`,
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            View Project
                                            <svg className="transition-transform duration-300 group-hover/btn:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* 3D depth layer */}
                                <div
                                    className="absolute -bottom-[20%] -right-[10%] w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle, ${project.color}, transparent)`,
                                        filter: 'blur(50px)',
                                    }}
                                />
                            </div>
                        </ScrollStackItem>
                    ))}
                </ScrollStack>
            </div>
        </section>
    );
}
