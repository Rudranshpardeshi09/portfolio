import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    BadgeCheck,
    BrainCircuit,
    Code2,
    Database,
    Layers3,
    ServerCog,
    Sparkles,
    TerminalSquare,
    Wrench,
} from 'lucide-react';
import useThemeStore from '../../store/themeStore';
import { SKILLS_DATA } from '../../data/portfolioData';

const MotionDiv = motion.div;

function getCategoryAccent(category) {
    const lower = category.toLowerCase();
    if (lower.includes('programming')) {
        return {
            icon: Code2,
            label: 'CORE_LANGUAGES',
            tint: 'rgba(255,255,255,0.85)',
            borderOpacity: 0.2,
        };
    }
    if (lower.includes('ai') || lower.includes('data')) {
        return {
            icon: BrainCircuit,
            label: 'INTELLIGENCE_STACK',
            tint: 'rgba(255,255,255,0.85)',
            borderOpacity: 0.18,
        };
    }
    if (lower.includes('framework')) {
        return {
            icon: Layers3,
            label: 'UI_FRAMEWORKS',
            tint: 'rgba(255,255,255,0.85)',
            borderOpacity: 0.18,
        };
    }
    if (lower.includes('database')) {
        return {
            icon: Database,
            label: 'DATA_SYSTEMS',
            tint: 'rgba(255,255,255,0.85)',
            borderOpacity: 0.16,
        };
    }
    return {
        icon: Wrench,
        label: 'DELIVERY_TOOLING',
        tint: 'rgba(255,255,255,0.85)',
        borderOpacity: 0.16,
    };
}

function getRuntimeLabel(category) {
    const lower = category.toLowerCase();
    if (lower.includes('programming')) return '$ runtime.env: production-ready';
    if (lower.includes('ai') || lower.includes('data')) return '$ inference.mode: active';
    if (lower.includes('framework')) return '$ render.pipeline: optimized';
    if (lower.includes('database')) return '$ persistence.layer: stable';
    return '$ delivery.ops: maintained';
}

function getArchitectureLabel(category) {
    const lower = category.toLowerCase();
    if (lower.includes('programming')) return '$ architecture: full-stack';
    if (lower.includes('ai') || lower.includes('data')) return '$ use_case: vision/ml/automation';
    if (lower.includes('framework')) return '$ interface.layer: reactive';
    if (lower.includes('database')) return '$ storage: relational-first';
    return '$ workflow: versioned/collaborative';
}

function SkillRow({ skill, index, theme }) {
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            className="group"
        >
            <div className="mb-2 flex items-end justify-between gap-4">
                <span className="cursor-default text-sm font-medium text-white transition-all duration-300 group-hover:tracking-[0.02em] sm:text-base">
                    {skill.name}
                </span>
                <span
                    className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: theme.primary }}
                >
                    Proficiency: {skill.level}%
                </span>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/6">
                <MotionDiv
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.08 + index * 0.04, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                        background: `linear-gradient(90deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                        boxShadow: `0 0 18px rgba(${theme.primaryRgb},0.22)`,
                    }}
                />
            </div>
        </MotionDiv>
    );
}

function CategoryBlock({ category, index, theme }) {
    const accent = getCategoryAccent(category.category);
    const AccentIcon = accent.icon;

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            className="mb-12"
        >
            <div className="mb-5 flex items-center gap-4">
                <span className="font-bold" style={{ color: theme.primary }}>
                    [SYSTEM] &gt;
                </span>
                <div className="flex items-center gap-3">
                    <AccentIcon size={18} style={{ color: theme.primary }} />
                    <h3 className="font-black uppercase tracking-tight text-white sm:text-xl">
                        {accent.label}
                    </h3>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            </div>

            <div
                className="space-y-6 pl-4"
                style={{ borderLeft: `1px solid rgba(${theme.primaryRgb},${accent.borderOpacity})` }}
            >
                <div>
                    <p className="text-sm leading-7 text-white/70 sm:text-[15px]">
                        {category.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-white/42">
                        <span>{getRuntimeLabel(category.category)}</span>
                        <span>{getArchitectureLabel(category.category)}</span>
                    </div>
                </div>

                <div className="space-y-5">
                    {category.skills.map((skill, skillIndex) => (
                        <SkillRow key={skill.name} skill={skill} index={skillIndex} theme={theme} />
                    ))}
                </div>
            </div>
        </MotionDiv>
    );
}

export default function SkillsSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);

    const skillMetrics = useMemo(() => {
        const categories = SKILLS_DATA.length;
        const totalSkills = SKILLS_DATA.reduce((sum, category) => sum + category.skills.length, 0);
        const averageDepth = Math.round(
            SKILLS_DATA.reduce(
                (sum, category) => sum + category.skills.reduce((inner, skill) => inner + skill.level, 0),
                0
            ) / totalSkills
        );
        const strongestCategory = [...SKILLS_DATA]
            .map((category) => ({
                name: category.category,
                value:
                    category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length,
            }))
            .sort((a, b) => b.value - a.value)[0];

        return { categories, totalSkills, averageDepth, strongestCategory };
    }, []);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="section-container relative z-10 overflow-hidden !px-4 !py-24 sm:!px-6 sm:!py-28 lg:!px-8 lg:!py-32"
        >
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: `radial-gradient(circle at 50% 0%, rgba(${theme.primaryRgb},0.14), transparent 35%), linear-gradient(180deg, rgba(8,10,18,0.3), rgba(8,10,18,0.78))`,
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.045]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)',
                        backgroundSize: '42px 42px',
                    }}
                />
            </div>

            <div className="section-inner relative z-10 max-w-6xl gap-10 sm:gap-12 lg:gap-14">
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto w-full px-1 text-left sm:px-2"
                >
                    <div
                        className="inline-flex items-center gap-2 rounded-full border px-3 py-1"
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            borderColor: `rgba(${theme.primaryRgb},0.18)`,
                        }}
                    >
                        <span
                            className="h-2 w-2 rounded-full"
                            style={{
                                background: theme.primary,
                                boxShadow: `0 0 16px rgba(${theme.primaryRgb},0.45)`,
                            }}
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/52">
                            System Identity: active
                        </span>
                    </div>

                    <h2
                        className="mt-6 text-4xl font-black uppercase tracking-[-0.05em] text-white sm:text-6xl md:text-7xl"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Skill Logs
                    </h2>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-white/58 md:text-base">
                        Decrypted directory of core competencies and technical frameworks, presented as a live terminal feed instead of card stacks.
                    </p>
                </MotionDiv>

                <div
                    className="relative overflow-hidden rounded-[1.5rem] border shadow-2xl"
                    style={{
                        background: 'rgba(10,12,20,0.78)',
                        borderColor: `rgba(${theme.primaryRgb},0.14)`,
                        boxShadow: `0 28px 70px rgba(0,0,0,0.36)`,
                    }}
                >
                    <div
                        className="flex items-center justify-between border-b px-4 py-3"
                        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}
                    >
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-red-400/40" />
                            <span className="h-3 w-3 rounded-full" style={{ background: `rgba(${theme.primaryRgb},0.45)` }} />
                            <span className="h-3 w-3 rounded-full bg-violet-300/30" />
                        </div>
                        <div className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/38 sm:block">
                            usr/bin/skills --verbose
                        </div>
                        <div className="flex items-center gap-3 text-white/34">
                            <TerminalSquare size={16} />
                            <Activity size={16} />
                        </div>
                    </div>

                    <div
                        className="p-6 sm:p-7 md:p-10 lg:p-12"
                        style={{
                            background: `radial-gradient(circle at 50% -10%, rgba(${theme.primaryRgb},0.08), transparent 28%)`,
                        }}
                    >
                        <div className="mb-10 space-y-1 font-mono text-xs text-white/38 sm:mb-12">
                            <div>[TIMESTAMP: 2026.03.29_04:12:01]</div>
                            <div>[NODE: LOCALHOST_VAULT_01]</div>
                            <div>[AUTH: ENCRYPTED_SESSION_VALID]</div>
                            <div className="mt-2" style={{ color: theme.primary }}>
                                Initializing skills sequence... 100% complete.
                            </div>
                        </div>

                        {SKILLS_DATA.map((category, index) => (
                            <CategoryBlock
                                key={category.category}
                                category={category}
                                index={index}
                                theme={theme}
                            />
                        ))}

                        <div className="border-t border-white/8 pt-8 text-center text-xs italic text-white/34">
                            End of stream. Listening for new protocols...
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 px-1 sm:gap-7 sm:px-2 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.95fr)] lg:gap-8">
                    <MotionDiv
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, delay: 0.08 }}
                        className="rounded-[1.5rem] border p-7 sm:p-8 lg:p-9"
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            borderColor: 'rgba(255,255,255,0.08)',
                        }}
                    >
                        <div className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
                            Technical Philosophy
                        </div>
                        <p className="mt-3 text-sm leading-7 text-white/58">
                            Architecture over noise. Stability over novelty. Every tool in the stack is chosen to make delivery cleaner, systems stronger, and the product easier to maintain under pressure.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-8 sm:mt-10 sm:gap-10">
                            <div>
                                <div className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                    {skillMetrics.categories}
                                </div>
                                <div className="mt-1 text-[10px] uppercase tracking-[0.26em] text-white/34">
                                    Capability Groups
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                    {skillMetrics.totalSkills}+
                                </div>
                                <div className="mt-1 text-[10px] uppercase tracking-[0.26em] text-white/34">
                                    Tools Logged
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                    {skillMetrics.averageDepth}%
                                </div>
                                <div className="mt-1 text-[10px] uppercase tracking-[0.26em] text-white/34">
                                    Average Depth
                                </div>
                            </div>
                        </div>
                    </MotionDiv>

                    <MotionDiv
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, delay: 0.12 }}
                        className="group relative overflow-hidden rounded-[1.5rem] border p-7 sm:p-8 lg:p-9"
                        style={{
                            background: `linear-gradient(180deg, rgba(${theme.primaryRgb},0.08), rgba(255,255,255,0.03))`,
                            borderColor: `rgba(${theme.primaryRgb},0.14)`,
                        }}
                    >
                        <div className="absolute -bottom-10 -right-8 opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.1]">
                            <ServerCog size={120} />
                        </div>
                        <div
                            className="flex h-12 w-12 items-center justify-center rounded-2xl"
                            style={{ background: `rgba(${theme.primaryRgb},0.14)` }}
                        >
                            <Sparkles size={22} style={{ color: theme.primary }} />
                        </div>
                        <h3 className="mt-5 text-xl font-black leading-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
                            Architecture
                            <br />
                            Consultancy
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-white/56">
                            Available for system design reviews, implementation planning, and technical delivery audits.
                        </p>

                        <div className="mt-6 space-y-3 text-xs text-white/52">
                            <div className="flex items-center gap-3">
                                <BadgeCheck size={15} style={{ color: theme.primary }} />
                                <span>Highest depth: {skillMetrics.strongestCategory.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Database size={15} style={{ color: theme.primary }} />
                                <span>Structured stack with maintainable delivery focus</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="mt-8 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition-transform duration-200 active:scale-95"
                            style={{
                                background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                                boxShadow: `0 16px 34px rgba(${theme.primaryRgb},0.24)`,
                            }}
                        >
                            Initialize Request
                        </button>
                    </MotionDiv>
                </div>
            </div>
        </section>
    );
}
