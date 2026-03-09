import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { PROJECTS_DATA } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(
                    card,
                    { rotateX: 8, rotateZ: i % 2 === 0 ? -2 : 2, y: 50, opacity: 0.35 },
                    {
                        rotateX: 0,
                        rotateZ: 0,
                        y: 0,
                        opacity: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            end: 'top 20%',
                            scrub: 1
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="section-container relative">
            <div className="section-inner w-full">
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="section-title text-gradient mx-auto">Projects</h2>
                    <p className="text-gray-400 mt-4 text-sm md:text-base">Scroll to stack and explore each build.</p>
                </div>

                <div className="relative w-full pb-20">
                    {PROJECTS_DATA.map((project, i) => (
                        <article
                            key={project.id}
                            ref={(el) => (cardRefs.current[i] = el)}
                            className="sticky top-[16vh] md:top-[18vh] mx-auto mb-8 md:mb-10 w-full max-w-5xl"
                            style={{ zIndex: PROJECTS_DATA.length - i }}
                        >
                            <div
                                className="glass rounded-[30px] p-5 md:p-8 lg:p-10 relative overflow-hidden"
                                style={{
                                    background: 'rgba(10,10,10,0.84)',
                                    borderColor: `rgba(${theme.primaryRgb}, 0.16)`,
                                    boxShadow: `0 22px 55px rgba(0,0,0,0.45), 0 0 26px rgba(${theme.primaryRgb},0.14)`
                                }}
                            >
                                <div
                                    className="absolute top-0 left-0 h-1.5 w-full"
                                    style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-6 md:gap-8">
                                    <div className="text-left">
                                        <h3 className="text-2xl md:text-3xl font-black text-white mb-4">{project.title}</h3>
                                        <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">{project.description}</p>
                                        <div className="flex flex-wrap gap-2.5">
                                            {project.tech.map((tech) => (
                                                <span
                                                    key={`${project.id}-${tech}`}
                                                    className="px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium"
                                                    style={{
                                                        background: `rgba(${theme.primaryRgb}, 0.12)`,
                                                        color: '#fff',
                                                        border: `1px solid rgba(${theme.primaryRgb}, 0.22)`
                                                    }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-start md:items-end justify-between">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black"
                                            style={{
                                                color: project.color,
                                                background: `rgba(${theme.primaryRgb},0.1)`,
                                                border: `1px solid ${project.color}44`
                                            }}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <a
                                            href={project.link}
                                            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                                            style={{
                                                background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                                                color: '#fff'
                                            }}
                                        >
                                            View Project
                                            <span aria-hidden>↗</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
