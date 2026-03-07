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
            { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'Tailwind CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
            { name: 'Vite', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg' },
            { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
            { name: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' }
        ]
    },
    {
        category: 'Backend',
        speed: 48,
        direction: 'right',
        logos: [
            { name: 'FastAPI', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
            { name: 'Django', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
            { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
            { name: 'C++', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
            { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
            { name: 'Express', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' }
        ]
    },
    {
        category: 'AI / ML',
        speed: 46,
        direction: 'left',
        logos: [
            { name: 'OpenCV', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
            { name: 'NumPy', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
            { name: 'Pandas', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
            { name: 'Matplotlib', src: 'https://cdn.simpleicons.org/matplotlib/11557C' },
            { name: 'TensorFlow', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
            { name: 'Scikit-learn', src: 'https://cdn.simpleicons.org/scikitlearn/F7931E' },
            { name: 'LangChain', src: 'https://cdn.simpleicons.org/langchain/1C3C3C' },
            { name: 'Hugging Face', src: 'https://cdn.simpleicons.org/huggingface/FF9D00' }
        ]
    },
    {
        category: 'Database & Tools',
        speed: 44,
        direction: 'right',
        logos: [
            { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
            { name: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
            { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
            { name: 'GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
            { name: 'Postman', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
            { name: 'Jira', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' }
        ]
    }
];

export default function SkillsSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);

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
                    loading="lazy"
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
                    <div className="relative z-10 grid gap-4 md:gap-5">
                        {TECH_ROWS.map((row) => (
                            <div key={row.category} className="glass rounded-[20px] p-3 md:p-4 overflow-hidden">
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
