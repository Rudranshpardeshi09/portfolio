import { useEffect, useRef, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import LogoLoop from '../reactbits/LogoLoop';

gsap.registerPlugin(ScrollTrigger);

const SKILL_TECH = [
    { name: 'React', slug: 'react', short: 'RE' },
    { name: 'Tailwind CSS', slug: 'tailwindcss', short: 'TW' },
    { name: 'Vite', slug: 'vite', short: 'VI' },
    { name: 'JavaScript', slug: 'javascript', short: 'JS' },
    { name: 'HTML5', slug: 'html5', short: 'HT' },
    { name: 'CSS3', slug: 'css3', short: 'CS' },
    { name: 'Python', slug: 'python', short: 'PY' },
    { name: 'C++', slug: 'cpp', short: 'C+' },
    { name: 'FastAPI', slug: 'fastapi', short: 'FA' },
    { name: 'Django', slug: 'django', short: 'DJ' },
    { name: 'OpenCV', slug: 'opencv', short: 'CV' },
    { name: 'NumPy', slug: 'numpy', short: 'NP' },
    { name: 'Pandas', slug: 'pandas', short: 'PD' },
    { name: 'Matplotlib', slug: 'matplotlib', short: 'MP' },
    { name: 'LangChain', slug: 'langchain', short: 'LC' },
    { name: 'Hugging Face', slug: 'huggingface', short: 'HF' },
    { name: 'TensorFlow', slug: 'tensorflow', short: 'TF' },
    { name: 'Scikit-learn', slug: 'scikitlearn', short: 'SK' }
];

const ARSENAL_TECH = [
    { name: 'Postman', slug: 'postman', short: 'PM' },
    { name: 'Git', slug: 'git', short: 'GT' },
    { name: 'GitHub', slug: 'github', short: 'GH' },
    { name: 'Jira', slug: 'jira', short: 'JR' },
    { name: 'PostgreSQL', slug: 'postgresql', short: 'PG' },
    { name: 'MySQL', slug: 'mysql', short: 'MY' },
    { name: 'Jupyter Notebook', slug: 'jupyternotebook', short: 'JP' }
];

export default function SkillsSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 40, filter: 'blur(10px)' },
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
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const skillsLogos = useMemo(
        () =>
            SKILL_TECH.map(item => ({
                src: `/tech-logos/${item.slug}.svg`,
                alt: item.name,
                title: item.name,
                short: item.short
            })),
        []
    );

    const arsenalLogos = useMemo(
        () =>
            ARSENAL_TECH.map(item => ({
                src: `/tech-logos/${item.slug}.svg`,
                alt: item.name,
                title: item.name,
                short: item.short
            })),
        []
    );

    const renderLoopItem = useCallback((item, key) => (
        <div key={key} className="flex flex-col items-center gap-2 px-1">
            <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden border border-white/15 bg-black/30 flex items-center justify-center"
                style={{ boxShadow: `0 0 16px rgba(${theme.primaryRgb}, 0.15)` }}
            >
                <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling;
                        if (fallback) fallback.style.display = 'flex';
                    }}
                />
                <span className="hidden w-full h-full items-center justify-center text-xs font-bold text-white">
                    {item.short}
                </span>
            </div>
            <span className="text-[11px] text-white/80 whitespace-nowrap leading-none">{item.title}</span>
        </div>
    ), [theme.primaryRgb]);

    return (
        <section id="skills" ref={sectionRef} className="section-container relative z-10 overflow-hidden">
            <div className="section-inner pt-8 md:pt-12">
                <div ref={titleRef} className="text-center mb-6 md:mb-8 relative z-20">
                    <h2 className="section-title text-gradient inline-block" style={{ color: theme.primary }}>
                        Skills & Arsenal
                    </h2>
                    <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm md:text-base">
                        A curated collection of technologies I use to build high-performance applications.
                    </p>
                </div>

                <div className="w-full relative z-10">
                    <div
                        className="absolute inset-0 opacity-15 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 50% 50%, ${theme.primary}, transparent 70%)` }}
                    />

                    <div className="relative z-10 grid gap-5 md:gap-7">
                        <div className="glass rounded-[22px] p-4 md:p-6 overflow-hidden">
                            <h3 className="text-white text-lg md:text-2xl font-bold mb-4" style={{ color: theme.primary }}>
                                Skill Loop
                            </h3>
                            <LogoLoop
                                logos={skillsLogos}
                                speed={62}
                                direction="left"
                                logoHeight={84}
                                gap={24}
                                fadeOut
                                pauseOnHover
                                scaleOnHover
                                fadeOutColor="rgba(12,12,12,0.95)"
                                ariaLabel="Skills logo loop"
                                renderItem={renderLoopItem}
                            />
                        </div>

                        <div className="glass rounded-[22px] p-4 md:p-6 overflow-hidden">
                            <h3 className="text-white text-lg md:text-2xl font-bold mb-4" style={{ color: theme.primary }}>
                                Arsenal Loop
                            </h3>
                            <LogoLoop
                                logos={arsenalLogos}
                                speed={56}
                                direction="right"
                                logoHeight={84}
                                gap={24}
                                fadeOut
                                pauseOnHover
                                scaleOnHover
                                fadeOutColor="rgba(12,12,12,0.95)"
                                ariaLabel="Arsenal logo loop"
                                renderItem={renderLoopItem}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
