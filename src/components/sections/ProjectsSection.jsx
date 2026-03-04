import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { PROJECTS_DATA } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const carouselRef = useRef(null);
    const cardsRef = useRef([]);
    const [selectedProject, setSelectedProject] = useState(null);

    const selected = PROJECTS_DATA.find((p) => p.id === selectedProject);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title cinematic entry
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 60, scale: 0.8, filter: 'blur(10px)' },
                {
                    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
                    duration: 1, ease: 'expo.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Horizontal scroll carousel driven by vertical scroll
            if (carouselRef.current) {
                const cards = carouselRef.current;
                const totalScroll = cards.scrollWidth - cards.clientWidth;

                gsap.to(cards, {
                    scrollLeft: totalScroll,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 20%',
                        end: 'bottom 80%',
                        scrub: 1,
                    },
                });
            }

            // Cards stagger entry with 3D tilt
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        x: 100,
                        rotateY: -25,
                        scale: 0.85,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // 3D tilt on mouse move for cards
    const handleMouseMove = (e, cardEl) => {
        if (!cardEl) return;
        const rect = cardEl.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(cardEl, {
            rotateY: x * 20,
            rotateX: -y * 15,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = (cardEl) => {
        if (!cardEl) return;
        gsap.to(cardEl, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
        });
    };

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="section-container relative"
            style={{ perspective: '1200px' }}
        >
            <div className="section-inner" style={{ maxWidth: '100%' }}>
                {/* Title */}
                <div ref={titleRef} className="text-center mb-12">
                    <h2 className="section-title text-gradient mx-auto">Projects</h2>
                    <p className="text-gray-500 mt-6 text-sm">
                        Scroll through or click to explore project details
                    </p>
                </div>

                {/* Horizontal scroll carousel */}
                <div
                    ref={carouselRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-4"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        perspective: '1000px',
                    }}
                >
                    {PROJECTS_DATA.map((project, i) => (
                        <div
                            key={project.id}
                            ref={(el) => (cardsRef.current[i] = el)}
                            className={`flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] snap-center cursor-pointer group transition-all duration-300 ${selectedProject === project.id ? 'scale-105' : 'hover:scale-[1.02]'
                                }`}
                            style={{
                                transformStyle: 'preserve-3d',
                            }}
                            onClick={() => setSelectedProject(
                                selectedProject === project.id ? null : project.id
                            )}
                            onMouseMove={(e) => handleMouseMove(e, cardsRef.current[i])}
                            onMouseLeave={() => handleMouseLeave(cardsRef.current[i])}
                        >
                            <div
                                className="glass rounded-2xl p-6 h-full relative overflow-hidden"
                                style={{
                                    borderColor: selectedProject === project.id
                                        ? `rgba(${theme.primaryRgb}, 0.4)`
                                        : 'rgba(255,255,255,0.05)',
                                    boxShadow: selectedProject === project.id
                                        ? `0 0 40px rgba(${theme.primaryRgb}, 0.15), 0 20px 40px rgba(0,0,0,0.3)`
                                        : '0 10px 30px rgba(0,0,0,0.2)',
                                }}
                            >
                                {/* Top color bar */}
                                <div
                                    className="w-full h-1 rounded-full mb-5"
                                    style={{
                                        background: `linear-gradient(90deg, ${project.color}, transparent)`,
                                    }}
                                />

                                {/* Project icon/number */}
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-2xl font-black"
                                    style={{
                                        background: `rgba(${theme.primaryRgb}, 0.1)`,
                                        color: project.color,
                                        border: `1px solid ${project.color}33`,
                                        fontFamily: 'var(--font-display)',
                                    }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                                    {project.description}
                                </p>

                                {/* Tech stack */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.tech.map((t) => (
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
                                    href={project.link}
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                                    style={{
                                        background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                                        color: theme.key === 'bmw' ? '#000' : '#fff',
                                        boxShadow: `0 0 20px rgba(${theme.primaryRgb}, 0.25)`,
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    View Project
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                                    </svg>
                                </a>

                                {/* 3D depth layer */}
                                <div
                                    className="absolute -bottom-2 -right-2 w-32 h-32 rounded-full opacity-10 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle, ${project.color}, transparent)`,
                                        filter: 'blur(30px)',
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
