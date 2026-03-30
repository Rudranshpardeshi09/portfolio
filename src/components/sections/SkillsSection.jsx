import { useRef, useMemo, useState, useEffect } from 'react';
import { animate, motion, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import {
  BadgeCheck,
  BrainCircuit,
  Code2,
  Database,
  Layers3,
  ServerCog,
  Sparkles as SparklesIcon,
  Wrench,
  Zap,
  Cpu,
  Globe,
  TrendingUp,
  Award,
  Box,
  GitBranch,
  Terminal,
} from 'lucide-react';
import useThemeStore from '../../store/themeStore';
import { SKILLS_DATA } from '../../data/portfolioData';

// --- Helper functions (unchanged) ---
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

function getCategoryAccent(category) {
  const lower = category.toLowerCase();
  if (lower.includes('programming')) return { icon: Code2, label: 'CORE_LANGUAGES', colorVar: 'primary' };
  if (lower.includes('database')) return { icon: Database, label: 'DATABASE', colorVar: 'primary' };
  if (lower.includes('ai') || lower.includes('ml') || lower.includes('machine learning')) {
    return { icon: BrainCircuit, label: 'AI / ML', colorVar: 'primary' };
  }
  if (lower.includes('framework')) return { icon: Layers3, label: 'UI_FRAMEWORKS', colorVar: 'primary' };
  return { icon: Wrench, label: 'DELIVERY_TOOLING', colorVar: 'primary' };
}

// --- SkillItem component (unchanged) ---
const SkillItem = ({ skill, index, theme, inView }) => {
  const width = useSpring(skill.level, {
    stiffness: 100,
    damping: 20,
    delay: index * 50,
    immediate: !inView,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="mb-4 last:mb-0"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <img
            src={getLogoPath(skill.name)}
            alt={skill.name}
            className="w-4 h-4 object-contain"
            loading="eager"
            onError={(e) => (e.target.style.display = 'none')}
          />
          <span className="text-sm font-medium text-white/80">{skill.name}</span>
        </div>
        <span className="text-xs text-white/40 font-mono">{skill.level}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          style={{ width }}
          className="h-full rounded-full"
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.level}%` : 0 }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- Enhanced Glassmorphic Card (unchanged) ---
const SkillCategoryCard = ({ category, index, theme, inView }) => {
  const accent = getCategoryAccent(category.category);
  const Icon = accent.icon;
  const cardRef = useRef(null);
  const [hover, setHover] = useState(false);
  const { primaryRgb } = theme;

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [12, -12]);
  const rotateY = useTransform(x, [-100, 100], [-12, 12]);
  const translateZ = useSpring(0, { stiffness: 220, damping: 22 });

  useEffect(() => {
    translateZ.set(hover ? 20 : 0);
  }, [hover, translateZ]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHover(false);
  };

  const handleMouseEnter = () => setHover(true);

  // Determine card width based on index for staggered layout
  const cardWidths = ['max-w-sm', 'max-w-md', 'max-w-sm', 'max-w-lg', 'max-w-sm', 'max-w-md'];
  const widthClass = cardWidths[index % cardWidths.length];

  return (
    <motion.div
      ref={cardRef}
      className={`group relative ${widthClass} w-full mx-auto`}
      initial={{ opacity: 0, y: 50, rotate: -2 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="relative backdrop-blur-xl rounded-2xl border p-6 overflow-hidden transition-all duration-300"
        style={{
          background: 'linear-gradient(145deg, rgba(15,15,25,0.8), rgba(8,8,12,0.8))',
          borderColor: hover ? `rgba(${primaryRgb},0.8)` : `rgba(${primaryRgb},0.2)`,
          boxShadow: hover
            ? `0 25px 40px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(${primaryRgb},0.4)`
            : '0 15px 25px -10px rgba(0,0,0,0.4)',
          rotateX: rotateX,
          rotateY: rotateY,
          translateZ: translateZ,
          transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
        }}
      >
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E")', backgroundSize: '200px' }} />

        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, rgba(${primaryRgb},0.25), transparent 80%)`,
          }}
        />

        {/* Header with floating icon */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, rgba(${primaryRgb},0.2), rgba(${primaryRgb},0.05))`,
                boxShadow: `0 0 15px rgba(${primaryRgb},0.2)`,
              }}
            >
              <Icon size={20} style={{ color: theme.primary }} />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">{accent.label}</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Category</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: hover ? 360 : 0, scale: hover ? 1.2 : 1 }}
            transition={{ duration: 0.5 }}
            className="text-white/40"
          >
            <Award size={22} />
          </motion.div>
        </div>

        {/* Summary */}
        <p className="text-sm text-white/70 leading-relaxed mb-6">{category.summary}</p>

        {/* Skills */}
        <div className="space-y-4">
          {category.skills.map((skill, idx) => (
            <SkillItem key={skill.name} skill={skill} index={idx} theme={theme} inView={inView} />
          ))}
        </div>

        {/* Decorative bottom line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }}
        />
      </motion.div>
    </motion.div>
  );
};

// --- WebGL Background with Flowing Particles (unchanged) ---
const AdvancedBackground = ({ theme }) => {
  const canvasRef = useRef(null);
  const { primaryRgb } = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = 150;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.6,
          speedY: (Math.random() - 0.5) * 0.6,
          opacity: Math.random() * 0.4 + 0.1,
          angle: Math.random() * Math.PI * 2,
          radius: Math.random() * 80 + 20,
          centerX: Math.random() * canvas.width,
          centerY: Math.random() * canvas.height,
          orbitSpeed: (Math.random() - 0.5) * 0.01,
        });
      }
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `rgba(${primaryRgb}, 0.08)`;

      // Draw flowing lines
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Use orbit motion for some particles
        if (i % 3 === 0) {
          p.angle += p.orbitSpeed;
          p.x = p.centerX + Math.cos(p.angle) * p.radius;
          p.y = p.centerY + Math.sin(p.angle) * p.radius;
        } else {
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      // Draw connecting lines between nearby particles
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${primaryRgb}, 0.05)`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [primaryRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none"
      style={{ opacity: 0.6, mixBlendMode: 'screen' }}
    />
  );
};

// --- Mouse-following gradient blob (unchanged) ---
const MouseGlow = ({ theme }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { primaryRgb } = theme;

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 rounded-full"
      style={{
        x: useTransform(mouseX, (v) => v - 150),
        y: useTransform(mouseY, (v) => v - 150),
        width: 300,
        height: 300,
        background: `radial-gradient(circle, rgba(${primaryRgb},0.15) 0%, rgba(${primaryRgb},0) 70%)`,
        filter: 'blur(40px)',
      }}
    />
  );
};

// --- CountUp component (unchanged) ---
const CountUp = ({ value, label, theme, inView }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (inView) {
      count.set(0);
      const controls = animate(count, value, { duration: 1.5, ease: 'easeOut' });
      return () => controls.stop();
    }
  }, [inView, value, count]);

  return (
    <div>
      <motion.div className="text-4xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
        {rounded}
      </motion.div>
      <div className="text-xs uppercase tracking-wider text-white/40">{label}</div>
    </div>
  );
};

// --- New Graphic Elements (floating geometric shapes, lines) ---
const AdditionalGraphics = ({ theme }) => {
  const { primaryRgb } = theme;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Floating abstract lines - no circles */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.15 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`rgba(${primaryRgb},0)`} />
            <stop offset="50%" stopColor={`rgba(${primaryRgb},0.6)`} />
            <stop offset="100%" stopColor={`rgba(${primaryRgb},0)`} />
          </linearGradient>
        </defs>
        {[...Array(20)].map((_, i) => (
          <line
            key={`line-${i}`}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
        ))}
      </svg>

      {/* Animated floating squares (non-circular) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`square-${i}`}
            className="absolute"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              border: `1px solid rgba(${primaryRgb},0.15)`,
              background: `rgba(${primaryRgb},0.02)`,
              rotate: Math.random() * 45,
            }}
            animate={{
              x: [0, Math.random() * 60 - 30, 0],
              y: [0, Math.random() * 60 - 30, 0],
              rotate: [0, Math.random() * 30, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </>
  );
};

// --- Main SkillsSection Component with enhanced spacing and graphics ---
export default function SkillsSection() {
  const { theme } = useThemeStore();
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });

  // Track which cards are in view
  const cardRefs = useRef([]);
  const [inViewIndices, setInViewIndices] = useState([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index;
          if (entry.isIntersecting) {
            setInViewIndices((prev) => [...new Set([...prev, Number(index)])]);
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((el, i) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const skillMetrics = useMemo(() => {
    const categories = SKILLS_DATA.length;
    const totalSkills = SKILLS_DATA.reduce((sum, cat) => sum + cat.skills.length, 0);
    const averageDepth = Math.round(
      SKILLS_DATA.reduce(
        (sum, cat) => sum + cat.skills.reduce((inner, skill) => inner + skill.level, 0),
        0
      ) / totalSkills
    );
    const strongestCategory = [...SKILLS_DATA]
      .map((cat) => ({
        name: cat.category,
        value: cat.skills.reduce((sum, skill) => sum + skill.level, 0) / cat.skills.length,
      }))
      .sort((a, b) => b.value - a.value)[0];
    return { categories, totalSkills, averageDepth, strongestCategory };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative flex w-full flex-col items-center overflow-hidden py-28 sm:py-32 md:py-40 lg:py-48"
      style={{ background: 'radial-gradient(circle at 30% 20%, #0b0b12, #010101)' }}
    >
      <AdvancedBackground theme={theme} />
      <MouseGlow theme={theme} />
      <AdditionalGraphics theme={theme} />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 18%, rgba(${theme.primaryRgb}, 0.12), transparent 30%),
            radial-gradient(circle at 78% 30%, rgba(${theme.primaryRgb}, 0.08), transparent 26%),
            radial-gradient(circle at 50% 78%, rgba(255,255,255,0.04), transparent 24%)
          `,
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(${theme.primaryRgb},0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${theme.primaryRgb},0.05) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(circle at center, black 45%, transparent 100%)',
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto mb-16 flex w-full max-w-6xl flex-col items-center px-5 text-center sm:mb-20 sm:px-8 md:mb-24 lg:px-12"
      >
        <div
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-5"
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderColor: `rgba(${theme.primaryRgb},0.18)`,
          }}
        >
          <span
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ background: theme.primary, boxShadow: `0 0 16px rgba(${theme.primaryRgb},0.45)` }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/52">
            Skill Architecture
          </span>
        </div>
        <h2
          className="relative flex flex-col items-center text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span
            className="mb-3 text-[10px] font-bold uppercase tracking-[0.42em] text-white/35 sm:text-xs"
            style={{ letterSpacing: '0.42em' }}
          >
            Engineered Skill System
          </span>
          <motion.span
            className="relative block text-4xl font-black uppercase leading-none tracking-[0.04em] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl lg:text-7xl"
            animate={{ textShadow: [
              `0 0 0 rgba(${theme.primaryRgb},0)`,
              `0 0 26px rgba(${theme.primaryRgb},0.28)`,
              `0 0 0 rgba(${theme.primaryRgb},0)`
            ] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              color: '#f5f7fb',
              WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            }}
          >
            Technical Arsenal
          </motion.span>
          <motion.span
            className="pointer-events-none absolute top-[1.1em] block text-4xl font-black uppercase leading-none tracking-[0.04em] opacity-80 blur-[1px] sm:text-5xl md:text-6xl lg:text-7xl"
            animate={{ opacity: [0.18, 0.32, 0.18] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              color: theme.primary,
              transform: 'translate3d(0, 0, -1px)',
            }}
            aria-hidden="true"
          >
            Technical Arsenal
          </motion.span>
          <div
            className="mt-5 h-px w-28 sm:w-36 md:w-44"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(${theme.primaryRgb},0.95), transparent)`,
              boxShadow: `0 0 18px rgba(${theme.primaryRgb},0.45)`,
            }}
          />
        </h2>
        <p className="mt-6 max-w-3xl mx-auto px-2 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
          A curated collection of my core competencies — each category expands to reveal the tools and proficiency levels.
          <br />
          <span className="text-white/40 text-xs">Hover over cards to see 3D tilt, scroll to reveal animations</span>
        </p>
      </motion.div>

      {/* Cards Layout - Overlapping Masonry */}
      <div className="relative z-10 mx-auto flex w-full justify-center px-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-start justify-center gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12 lg:gap-x-12 lg:gap-y-14">
          {SKILLS_DATA.map((category, idx) => {
            const offsets = ['mt-0', 'sm:mt-6 lg:mt-8', 'mt-0', 'sm:mt-8 lg:mt-12', 'sm:mt-4', 'mt-0'];
            const offsetClass = offsets[idx % offsets.length];
            return (
              <div
                key={category.category}
                ref={(el) => (cardRefs.current[idx] = el)}
                data-index={idx}
                className={`${offsetClass} flex w-full justify-center transition-all duration-300 md:w-auto`}
                style={{ width: '100%', maxWidth: idx % 2 === 0 ? '22rem' : '25rem' }}
              >
                <SkillCategoryCard
                  category={category}
                  index={idx}
                  theme={theme}
                  inView={inViewIndices.includes(idx)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="relative z-10 mx-auto mt-20 flex w-full justify-center px-5 sm:mt-24 sm:px-8 lg:mt-28 lg:px-12">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border bg-black/30 p-7 backdrop-blur-sm sm:p-8 lg:p-10"
            style={{ borderColor: `rgba(${theme.primaryRgb},0.15)` }}
          >
            <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Technical Depth
            </h3>
            <p className="text-white/70 leading-relaxed">
              Every bar represents real-world experience. The gradient width reflects both familiarity and project application.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:justify-start sm:gap-10">
              <CountUp value={skillMetrics.categories} label="Categories" theme={theme} inView={statsInView} />
              <CountUp value={skillMetrics.totalSkills} label="Technologies" theme={theme} inView={statsInView} />
              <CountUp value={skillMetrics.averageDepth} label="Avg Proficiency" theme={theme} inView={statsInView} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative group overflow-hidden rounded-2xl border p-7 sm:p-8 lg:p-10"
            style={{
              background: `linear-gradient(135deg, rgba(${theme.primaryRgb},0.08), rgba(0,0,0,0.4))`,
              borderColor: `rgba(${theme.primaryRgb},0.2)`,
            }}
          >
            <div className="absolute -bottom-10 -right-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <GitBranch size={120} />
            </div>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl mb-4"
              style={{ background: `rgba(${theme.primaryRgb},0.2)` }}
            >
              <Terminal size={24} style={{ color: theme.primary }} />
            </div>
            <h3 className="text-xl font-black text-white mb-2">Continuous Growth</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              I'm constantly expanding my toolkit. The stats above reflect my current depth — I'm always learning and applying new technologies.
            </p>
            <div className="flex items-center gap-3 text-xs text-white/50 mb-6">
              <BadgeCheck size={14} style={{ color: theme.primary }} />
              <span>Top category: {skillMetrics.strongestCategory.name}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-transform"
              style={{
                background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                boxShadow: `0 16px 34px rgba(${theme.primaryRgb},0.24)`,
              }}
            >
              Connect & Collaborate
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-xs"
      >
        <motion.span
          animate={{ color: [`rgba(${theme.primaryRgb},0.6)`, 'rgba(255,255,255,0.3)', `rgba(${theme.primaryRgb},0.6)`] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.span>
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full mt-2"
            style={{ background: theme.primary }}
          />
        </div>
      </motion.div>
    </section>
  );
}
