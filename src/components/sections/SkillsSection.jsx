import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { SKILLS_DATA } from '../../data/portfolioData';
import { Code2, Settings, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const categoryRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            categoryRefs.current.forEach((catWrapper, i) => {
                if (!catWrapper) return;
                gsap.fromTo(
                    catWrapper,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                        delay: i * 0.15,
                        scrollTrigger: {
                            trigger: catWrapper,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Get a generic icon based on category if the specific logo fails to load
    const getCategoryIcon = (catName) => {
        if (catName.includes('Frontend')) return <Code2 size={24} />;
        if (catName.includes('Backend')) return <Settings size={24} />;
        return <Terminal size={24} />;
    };

    return (
        <section id="skills" ref={sectionRef} className="pb-20">
            <div className="w-full">
                <div className="text-center mb-16">
                    <h2 className="section-title text-gradient inline-block">Skills & Arsenal</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Hover or tap the cards to reveal proficiency levels.
                    </p>
                </div>

                <div className="space-y-16">
                    {SKILLS_DATA.map((category, catIdx) => (
                        <div
                            key={category.category}
                            ref={(el) => (categoryRefs.current[catIdx] = el)}
                            className="w-full"
                        >
                            <div className="flex items-center gap-3 mb-8 border-b pb-4" style={{ borderColor: `rgba(${theme.primaryRgb}, 0.2)` }}>
                                <span className="text-3xl filter drop-shadow-md" style={{ color: theme.primary }}>
                                    {category.icon}
                                </span>
                                <h3 className="text-2xl font-bold text-white tracking-wide">{category.category}</h3>
                            </div>

                            {/* Flip Cards Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {category.skills.map((skill) => {
                                    // Make a safe filename for the logo (e.g. "React / Next.js" -> "reactnextjs")
                                    const safeLogoName = skill.name.toLowerCase().replace(/[^a-z0-9]/g, '');

                                    return (
                                        <div key={skill.name} className="flip-card h-36 w-full cursor-pointer group">
                                            <div className="flip-card-inner">

                                                {/* FRONT OF CARD - Logo */}
                                                <div
                                                    className="flip-card-front glass flex flex-col items-center justify-center p-4 transition-all"
                                                    style={{ borderBottom: `2px solid rgba(${theme.primaryRgb}, 0.3)` }}
                                                >
                                                    <div className="w-12 h-12 mb-3 flex items-center justify-center relative">
                                                        {/* Try to load from public/tech logos/, fallback to generic icon */}
                                                        <object
                                                            data={`/tech logos/${safeLogoName}.svg`}
                                                            type="image/svg+xml"
                                                            className="w-full h-full object-contain"
                                                        >
                                                            {/* Fallback if logo not found */}
                                                            <div className="text-gray-400 group-hover:text-white transition-colors">
                                                                {getCategoryIcon(category.category)}
                                                            </div>
                                                        </object>
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-semibold text-gray-300 text-center uppercase tracking-wider">
                                                        {skill.name}
                                                    </span>
                                                </div>

                                                {/* BACK OF CARD - Stats */}
                                                <div
                                                    className="flip-card-back glass-strong flex flex-col justify-center items-center p-5"
                                                    style={{
                                                        borderColor: `rgba(${theme.primaryRgb}, 0.5)`,
                                                        boxShadow: `0 0 20px rgba(${theme.primaryRgb}, 0.15) inset`
                                                    }}
                                                >
                                                    <span className="text-sm font-bold text-center mb-1">{skill.name}</span>
                                                    <span
                                                        className="text-2xl font-black mb-3"
                                                        style={{ color: theme.primary, fontFamily: 'var(--font-display)' }}
                                                    >
                                                        {skill.level}%
                                                    </span>

                                                    {/* Progress Bar Container */}
                                                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                width: `${skill.level}%`,
                                                                background: `linear-gradient(90deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                                                                boxShadow: `0 0 10px rgba(${theme.primaryRgb}, 0.5)`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
