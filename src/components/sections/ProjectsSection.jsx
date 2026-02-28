import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { PROJECTS_DATA } from '../../data/portfolioData';
import TireModel from '../3d/TireModel';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const detailRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);

    const selected = PROJECTS_DATA.find((p) => p.id === selectedProject);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (selected && detailRef.current) {
            gsap.fromTo(
                detailRef.current,
                { opacity: 0, x: 40, scale: 0.95 },
                { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }
            );
        }
    }, [selectedProject]);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="section-container relative"
            style={{
                background: `radial-gradient(ellipse at 50% 50%, rgba(${theme.primaryRgb}, 0.04) 0%, #0a0a0a 70%)`,
            }}
        >
            <div className="section-inner">
                {/* Title */}
                <div ref={titleRef} className="text-center mb-8">
                    <h2 className="section-title text-gradient mx-auto">Projects</h2>
                    <p className="text-gray-500 mt-6 text-sm">
                        Click a spoke node on the tire to explore a project
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* 3D Tire */}
                    <div className="w-full lg:w-1/2 h-[400px] sm:h-[500px] relative">
                        <TireModel
                            projects={PROJECTS_DATA}
                            selectedProject={selectedProject}
                            onSelectProject={setSelectedProject}
                        />

                        {/* Project labels floating near the canvas */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 flex-wrap px-4">
                            {PROJECTS_DATA.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => setSelectedProject(project.id)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${selectedProject === project.id
                                        ? 'text-white scale-105'
                                        : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                    style={
                                        selectedProject === project.id
                                            ? {
                                                background: `rgba(${theme.primaryRgb}, 0.2)`,
                                                border: `1px solid rgba(${theme.primaryRgb}, 0.3)`,
                                                boxShadow: `0 0 15px rgba(${theme.primaryRgb}, 0.15)`,
                                            }
                                            : {
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.06)',
                                            }
                                    }
                                >
                                    {project.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Project Detail Panel */}
                    <div className="w-full lg:w-1/2">
                        {selected ? (
                            <div
                                ref={detailRef}
                                className="glass rounded-2xl p-8"
                                style={{
                                    borderColor: `rgba(${theme.primaryRgb}, 0.15)`,
                                    boxShadow: `0 0 30px rgba(${theme.primaryRgb}, 0.05)`,
                                }}
                            >
                                {/* Color bar */}
                                <div
                                    className="w-full h-1 rounded-full mb-6"
                                    style={{
                                        background: `linear-gradient(90deg, ${selected.color}, transparent)`,
                                    }}
                                />

                                <h3 className="text-2xl font-bold text-white mb-3">{selected.title}</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">{selected.description}</p>

                                {/* Tech stack */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {selected.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="text-xs font-mono px-3 py-1.5 rounded-lg"
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

                                {/* View button */}
                                <a
                                    href={selected.link}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                                    style={{
                                        background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                                        color: theme.key === 'bmw' ? '#000' : '#fff',
                                        boxShadow: `0 0 20px rgba(${theme.primaryRgb}, 0.25)`,
                                    }}
                                >
                                    View Project
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                                    </svg>
                                </a>
                            </div>
                        ) : (
                            <div className="text-center p-12 glass rounded-2xl" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                                <div className="text-5xl mb-4 animate-float">🔧</div>
                                <p className="text-gray-500 text-lg">
                                    Select a project from the tire
                                </p>
                                <p className="text-gray-700 text-sm mt-2">
                                    Click a spoke or use the buttons below
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
