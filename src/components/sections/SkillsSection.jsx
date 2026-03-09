import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import LogoLoop from '../reactbits/LogoLoop';

gsap.registerPlugin(ScrollTrigger);

const TECH_ROWS = [
    {
        category: 'Frontend',
        speed: 52,
        direction: 'left',
        logos: [
            { name: 'React', src: '/tech-logos/react.svg' },
            { name: 'Tailwind CSS', src: '/tech-logos/tailwindcss.svg' },
            { name: 'Vite', src: '/tech-logos/vite.svg' },
            { name: 'JavaScript', src: '/tech-logos/javascript.svg' },
            { name: 'HTML5', src: '/tech-logos/html5.svg' },
            { name: 'CSS3', src: '/tech-logos/css3.svg' }
        ]
    },
    {
        category: 'Backend',
        speed: 48,
        direction: 'right',
        logos: [
            { name: 'FastAPI', src: '/tech-logos/fastapi.svg' },
            { name: 'Django', src: '/tech-logos/django.svg' },
            { name: 'Python', src: '/tech-logos/python.svg' },
            { name: 'C++', src: '/tech-logos/cpp.svg' }
        ]
    },
    {
        category: 'AI / ML',
        speed: 46,
        direction: 'left',
        logos: [
            { name: 'OpenCV', src: '/tech-logos/opencv.svg' },
            { name: 'NumPy', src: '/tech-logos/numpy.svg' },
            { name: 'Pandas', src: '/tech-logos/pandas.svg' },
            { name: 'Matplotlib', src: '/tech-logos/matplotlib.svg' },
            { name: 'TensorFlow', src: '/tech-logos/tensorflow.svg' },
            { name: 'Scikit-learn', src: '/tech-logos/scikitlearn.svg' },
            { name: 'LangChain', src: '/tech-logos/langchain.svg' },
            { name: 'Hugging Face', src: '/tech-logos/huggingface.svg' }
        ]
    },
    {
        category: 'Database & Tools',
        speed: 44,
        direction: 'right',
        logos: [
            { name: 'PostgreSQL', src: '/tech-logos/postgresql.svg' },
            { name: 'MySQL', src: '/tech-logos/mysql.svg' },
            { name: 'Git', src: '/tech-logos/git.svg' },
            { name: 'GitHub', src: '/tech-logos/github.svg' },
            { name: 'Postman', src: '/tech-logos/postman.svg' },
            { name: 'Jira', src: '/tech-logos/jira.svg' }
        ]
    }
];

export default function SkillsSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const rowRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 40, filter: 'blur(8px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            rowRefs.current.forEach((row, i) => {
                if (!row) return;
                gsap.fromTo(
                    row,
                    { opacity: 0, y: 30, rotateX: 10 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 0.9,
                        delay: 0.18 + i * 0.08,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: row,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const renderLogoItem = useCallback((item, key) => (
        <div key={key} className="flex flex-col items-center gap-2 px-1">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border border-neutral-900 p-2 flex items-center justify-center shadow-[0_10px_24px_rgba(0,0,0,0.3)]">
                <img
                    src={item.src}
                    alt={item.alt}
                    title={item.title}
                    className="w-full h-full object-contain"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        e.currentTarget.src = '/tech-logos/react.svg';
                    }}
                />
            </div>
            <span className="text-[11px] text-white/85 whitespace-nowrap leading-none">{item.title}</span>
        </div>
    ), []);

    return (
        <section id="skills" ref={sectionRef} className="section-container relative z-10 overflow-hidden">
            <div className="section-inner pt-8 md:pt-12">
                <div ref={titleRef} className="text-center mb-4 md:mb-6 relative z-20">
                    <h2 className="section-title text-gradient inline-block" style={{ color: theme.primary }}>
                        Skills & Arsenal
                    </h2>
                    <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm md:text-base">
                        Smooth category-based logo loops inspired by ReactBits.
                    </p>
                </div>

                <div className="w-full relative z-10">
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 50% 50%, ${theme.primary}, transparent 70%)` }}
                    />
                    <div className="relative z-10 grid gap-4 md:gap-5 [transform-style:preserve-3d]">
                        {TECH_ROWS.map((row, idx) => (
                            <div
                                key={row.category}
                                ref={(el) => (rowRefs.current[idx] = el)}
                                className="glass rounded-[20px] p-3 md:p-4 overflow-hidden relative"
                                style={{
                                    boxShadow: `0 16px 35px rgba(0,0,0,0.35), 0 0 25px rgba(${theme.primaryRgb}, 0.08)`
                                }}
                            >
                                <div
                                    className="absolute -inset-x-10 top-0 h-12 opacity-40 pointer-events-none"
                                    style={{ background: `linear-gradient(90deg, transparent, rgba(${theme.primaryRgb},0.35), transparent)` }}
                                />
                                <h3 className="text-white text-sm md:text-base font-semibold tracking-wide mb-3" style={{ color: theme.primary }}>
                                    {row.category}
                                </h3>
                                <LogoLoop
                                    logos={row.logos.map((logo) => ({
                                        src: logo.src,
                                        alt: logo.name,
                                        title: logo.name
                                    }))}
                                    speed={row.speed}
                                    direction={row.direction}
                                    logoHeight={84}
                                    gap={20}
                                    fadeOut
                                    pauseOnHover
                                    hoverSpeed={0}
                                    scaleOnHover
                                    fadeOutColor="rgba(12,12,12,0.92)"
                                    ariaLabel={`${row.category} logo loop`}
                                    renderItem={renderLogoItem}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
