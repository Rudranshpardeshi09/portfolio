import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useThemeStore from '../../store/themeStore';
import AnimatedLogo from '../ui/AnimatedLogo';
import LordIcon from '../ui/LordIcon';
import { SKILLS_DATA } from '../../data/portfolioData';

const MotionArticle = motion.article;
const MotionDiv = motion.div;

function getLogoPath(name) {
    const mapping = {
        'C++': 'cpp',
        'Scikit-learn': 'scikitlearn',
        'HTML5': 'html5',
        'CSS3': 'css3',
        'Hugging Face': 'huggingface',
        'Jupyter Notebook': 'jupyternotebook',
    };

    const base = mapping[name] || name.toLowerCase().replace(/\s+/g, '');
    return `/tech-logos/${base}.svg`;
}

function SkillCard({ category, idx, total, theme, scrollYProgress }) {
    const lane = idx - (total - 1) / 2;
    const rotateY = useTransform(scrollYProgress, [0, 0.45, 1], [`${lane * 10}deg`, '0deg', `${lane * -8}deg`]);
    const rotateX = useTransform(scrollYProgress, [0, 0.45, 1], ['12deg', '0deg', '-10deg']);
    const z = useTransform(scrollYProgress, [0, 0.45, 1], [-180 + idx * 18, 90 - Math.abs(lane) * 18, -120]);
    const y = useTransform(scrollYProgress, [0, 0.45, 1], [60 + idx * 18, 0, -30 - idx * 10]);

    const getIconType = (cat) => {
        const lower = cat.toLowerCase();
        if (lower.includes('programming')) return 'frontend';
        if (lower.includes('frameworks')) return 'backend';
        if (lower.includes('ai') || lower.includes('data')) return 'data';
        return 'tools';
    };

    return (
        <MotionArticle
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: idx * 0.08 }}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-[34px] border p-6 sm:p-8 md:p-9"
            style={{
                rotateX,
                rotateY,
                y,
                z,
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(160deg, rgba(14,14,14,0.88), rgba(255,255,255,0.03))',
                borderColor: `rgba(${theme.primaryRgb}, 0.18)`,
                boxShadow: `0 28px 60px rgba(0,0,0,0.38), 0 0 24px rgba(${theme.primaryRgb}, 0.08)`,
            }}
        >
            <div
                className="absolute inset-x-0 top-0 h-px opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }}
            />
            <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 50% 0%, rgba(${theme.primaryRgb},0.18), transparent 55%)` }}
            />

            <div className="relative z-10" style={{ transform: 'translateZ(72px)' }}>
                <div className="flex items-start justify-between gap-4">
                    <div className="max-w-[80%] text-left">
                        <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-white/35">Category</p>
                        <h3 className="mt-3 text-2xl font-black uppercase tracking-tight text-white md:text-[1.9rem]">
                            {category.category}
                        </h3>
                    </div>
                    <div style={{ transform: 'translateZ(110px)' }}>
                        <LordIcon type={getIconType(category.category)} theme={theme} />
                    </div>
                </div>

                <p className="mt-5 max-w-xl text-left text-sm leading-7 text-white/72 md:text-base">
                    {category.summary}
                </p>

                <div className="mt-6 flex items-center gap-3 text-left">
                    <span
                        className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white/70"
                        style={{
                            borderColor: `rgba(${theme.primaryRgb}, 0.24)`,
                            background: `rgba(${theme.primaryRgb}, 0.12)`,
                        }}
                    >
                        {category.skills.length} tools
                    </span>
                    <span className="text-xs uppercase tracking-[0.28em] text-white/28">Layered vault motion</span>
                </div>
            </div>

            <div
                className="relative z-10 mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5"
                style={{ transform: 'translateZ(54px)' }}
            >
                {category.skills.map((skill, skillIndex) => (
                    <MotionDiv
                        key={skill.name}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.18 + skillIndex * 0.04 }}
                        whileHover={{ y: -6, z: 22 }}
                        className="rounded-[24px] border p-3 md:p-4"
                        style={{
                            transformStyle: 'preserve-3d',
                            borderColor: 'rgba(255,255,255,0.08)',
                            background: 'rgba(255,255,255,0.03)',
                        }}
                    >
                        <AnimatedLogo
                            name={skill.name}
                            src={getLogoPath(skill.name)}
                            alt={skill.name}
                            theme={theme}
                        />
                        <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/68">
                            {skill.name}
                        </p>
                    </MotionDiv>
                ))}
            </div>
        </MotionArticle>
    );
}

export default function SkillsSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="section-container relative z-10 overflow-hidden [perspective:2200px]"
        >
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: `radial-gradient(circle at 50% 20%, rgba(${theme.primaryRgb},0.22), transparent 42%)`,
                    }}
                />
                <div
                    className="absolute inset-x-0 bottom-0 h-[44%] opacity-25"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(${theme.primaryRgb},0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(${theme.primaryRgb},0.18) 1px, transparent 1px)`,
                        backgroundSize: '54px 54px',
                        transform: 'rotateX(72deg) translateY(120px)',
                        transformOrigin: 'bottom',
                    }}
                />
            </div>

            <div className="section-inner relative z-10">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-white/35 md:text-xs">
                        Skills and arsenal
                    </p>
                    <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
                        Engineering Vault
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
                        Each block is structured by capability and staged like a suspended module instead of another tilt card.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 px-1 md:grid-cols-2 xl:grid-cols-3">
                    {SKILLS_DATA.map((category, idx) => (
                        <SkillCard
                            key={category.category}
                            category={category}
                            idx={idx}
                            total={SKILLS_DATA.length}
                            theme={theme}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
