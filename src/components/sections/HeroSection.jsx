import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, Sparkles, Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import useThemeStore from '../../store/themeStore';
import { CONTACT_DATA } from '../../data/portfolioData';
import Ribbons from '../reactbits/Ribbons';

gsap.registerPlugin(ScrollTrigger);

// ----- 3D Model Component (Torus Knot with Glass Material) -----
const GlassKnot = ({ themePrimaryRgb, mousePositionRef }) => {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      const { x, y } = mousePositionRef.current;

      // Rotate based on mouse position and time
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + x * 0.5;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.15) * 0.2;

      // Slight movement based on mouse
      meshRef.current.position.x += (x * 0.5 - meshRef.current.position.x) * 0.12;
      meshRef.current.position.y += (-y * 0.3 - meshRef.current.position.y) * 0.12;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={[1.2, 1.2, 1.2]}>
        <torusKnotGeometry args={[0.9, 0.28, 128, 16, 3, 4]} />
        <MeshReflectorMaterial
          color={`rgb(${themePrimaryRgb})`}
          emissive={`rgb(${themePrimaryRgb})`}
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
};

// ----- Animated Floating Particles (Three.js) -----
const FloatingParticles = ({ count = 400, themePrimaryRgb }) => {
  const pointsRef = useRef(null);
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return pos;
  });
  const color = useMemo(() => new THREE.Color(`rgb(${themePrimaryRgb})`), [themePrimaryRgb]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.05} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </points>
  );
};

// ----- Main 3D Scene Component -----
const ThreeScene = ({ themePrimaryRgb, mousePositionRef }) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 5, 5]} intensity={0.8} angle={0.3} penumbra={0.5} />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color={`rgb(${themePrimaryRgb})`} />
      <directionalLight position={[1, 2, 1]} intensity={0.6} />
      <Environment preset="city" />

      <GlassKnot themePrimaryRgb={themePrimaryRgb} mousePositionRef={mousePositionRef} />
      <FloatingParticles count={600} themePrimaryRgb={themePrimaryRgb} />

      {/* Subtle glowing ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <ringGeometry args={[1.4, 2.2, 64]} />
        <meshStandardMaterial color={`rgb(${themePrimaryRgb})`} emissive={`rgb(${themePrimaryRgb})`} emissiveIntensity={0.3} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

// ----- Custom Hook for Mouse Tracking -----
const useMousePosition = () => {
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      const nextX = (e.clientX / window.innerWidth) * 2 - 1;
      const nextY = (e.clientY / window.innerHeight) * 2 - 1;

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        mouseRef.current.x = nextX;
        mouseRef.current.y = nextY;
      });
    };

    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return mouseRef;
};

// ----- Custom Hook for Magnetic Effect -----
const useMagnetic = (ref, strength = 0.4) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const xTo = gsap.quickTo(element, 'x', { duration: 0.45, ease: 'power2.out' });
    const yTo = gsap.quickTo(element, 'y', { duration: 0.45, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength]);
};

const MarqueeBand = ({ items, theme, reverse = false }) => {
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden rounded-full border px-0 py-0 backdrop-blur-xl"
      style={{
        borderColor: `rgba(${theme.primaryRgb},0.18)`,
        background: 'rgba(5,7,14,0.62)',
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 14px 35px rgba(0,0,0,0.18)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-12"
        style={{ background: 'linear-gradient(90deg, rgba(5,7,14,0.92), transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-12"
        style={{ background: 'linear-gradient(270deg, rgba(5,7,14,0.92), transparent)' }}
      />
      <div
        className="flex min-w-max items-center gap-4 py-3"
        style={{
          animation: `${reverse ? 'heroMarqueeReverse' : 'heroMarquee'} 22s linear infinite`,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-4 whitespace-nowrap pl-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/62 sm:text-[11px]">
              {item}
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: `rgba(${theme.primaryRgb},0.9)` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HeroSection() {
  const { theme } = useThemeStore();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const ringsRef = useRef(null);
  const heroTitleRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const projectsButtonRef = useRef(null);
  const resumeButtonRef = useRef(null);
  const contactButtonRef = useRef(null);
  const mousePosition = useMousePosition();
  const resumeHref = '/resume/Rudransh Pardeshi resume.pdf';
  const linkedinUrl = CONTACT_DATA.socials.find((social) => social.name === 'LinkedIn')?.url ?? '#';
  const githubUrl = CONTACT_DATA.socials.find((social) => social.name === 'GitHub')?.url ?? '#';
  const emailHref = `mailto:${CONTACT_DATA.email}`;
  const heroWallRows = [
    'CRAFTED TO PERFORM',
    'FULL STACK . AUTOMATION . AI',
    'RELIABLE SYSTEMS . SHARP DELIVERY',
  ];
  const heroFocusPills = ['Vision & AI', 'Full-Stack Systems', 'Reliable Delivery'];
  const heroTickerItems = [
    'Python',
    'TensorFlow',
    'PyTorch',
    'Computer Vision',
    'AWS',
    'Docker',
    'MongoDB',
    'PostgreSQL',
    'React',
    'Node.js',
  ];

  useMagnetic(projectsButtonRef, 0.3);
  useMagnetic(resumeButtonRef, 0.3);
  useMagnetic(contactButtonRef, 0.3);

  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  // Custom Cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorFollower = cursorFollowerRef.current;
    if (!cursor || !cursorFollower) return;
    const cursorX = gsap.quickTo(cursor, 'x', { duration: 0.08, ease: 'power2.out' });
    const cursorY = gsap.quickTo(cursor, 'y', { duration: 0.08, ease: 'power2.out' });
    const followerX = gsap.quickTo(cursorFollower, 'x', { duration: 0.18, ease: 'power2.out' });
    const followerY = gsap.quickTo(cursorFollower, 'y', { duration: 0.18, ease: 'power2.out' });

    gsap.set([cursor, cursorFollower], { force3D: true, willChange: 'transform' });

    const onMouseMove = (e) => {
      cursorX(e.clientX);
      cursorY(e.clientY);
      followerX(e.clientX);
      followerY(e.clientY);
    };

    const onMouseOverInteractive = () => {
      gsap.to(cursor, { scale: 2, duration: 0.2 });
      gsap.to(cursorFollower, { scale: 1.5, duration: 0.2, opacity: 0.5 });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(cursorFollower, { scale: 1, duration: 0.2, opacity: 0.3 });
    };

    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseOverInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseOverInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  // 3D Tilt Effect on content
  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;
    const rotateYTo = gsap.quickTo(content, 'rotationY', { duration: 0.6, ease: 'power2.out' });
    const rotateXTo = gsap.quickTo(content, 'rotationX', { duration: 0.6, ease: 'power2.out' });
    gsap.set(content, { force3D: true, transformPerspective: 1500, willChange: 'transform' });

    const mouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      rotateYTo(x * 12);
      rotateXTo(-y * 10);
    };

    const leave = () => {
      rotateXTo(0);
      rotateYTo(0);
    };

    container.addEventListener('mousemove', mouseMove);
    container.addEventListener('mouseleave', leave);
    return () => {
      container.removeEventListener('mousemove', mouseMove);
      container.removeEventListener('mouseleave', leave);
    };
  }, []);

  // GSAP Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.hero-reveal'),
        { opacity: 0, y: 40, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.1, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      // Title split animation
      const title = heroTitleRef.current;
      if (title) {
        gsap.fromTo(title.querySelectorAll('.hero-title-line'), {
          opacity: 0,
          y: 56,
          filter: 'blur(12px)',
        }, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.12,
          duration: 0.95,
          ease: 'power3.out',
          delay: 0.6,
        });
      }

      // Scroll effects
      gsap.to(contentRef.current, {
        y: -180,
        rotationX: 20,
        scale: 0.85,
        transformPerspective: 1500,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        }
      });

      gsap.to(ringsRef.current, {
        rotateZ: 120,
        scale: 1.25,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.3,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-3 w-3 rounded-full mix-blend-difference md:block"
        style={{ background: theme.primary, transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorFollowerRef}
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-8 w-8 rounded-full border-2 opacity-30 transition-opacity duration-200 md:block"
        style={{ borderColor: theme.primary, transform: 'translate(-50%, -50%)' }}
      />

      <section
        id="hero"
        ref={containerRef}
        className="relative isolate flex min-h-[100svh] items-center justify-center overflow-x-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-16 xl:px-10"
        style={{ perspective: '1600px' }}
      >
        <style>{`
          @keyframes heroMarquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes heroMarqueeReverse {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
        `}</style>
        {/* Three.js Canvas Background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 2]}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          >
            <Suspense fallback={null}>
              <ThreeScene themePrimaryRgb={theme.primaryRgb} mousePositionRef={mousePosition} />
            </Suspense>
          </Canvas>
        </div>

        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 z-1 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

        {/* Ribbons Background */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <Ribbons
            colors={[theme.primary, theme.secondary]}
            baseThickness={22}
            pointCount={46}
            enableFade
            baseFriction={0.9}
          />
        </div>

        {/* Glassmorphic Rings */}
        <div
          ref={ringsRef}
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle at 50% 45%, rgba(${theme.primaryRgb},0.2), transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(${theme.primaryRgb},0.1), transparent 70%)`
          }}
        />

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        {/* Main Content */}
        <div
          ref={contentRef}
          className="pointer-events-auto relative z-10 mx-auto w-full max-w-7xl px-1 sm:px-0"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-[18%] z-0 hidden space-y-12 overflow-hidden lg:block">
            {heroWallRows.map((row, index) => (
              <div
                key={row}
                className={`hero-wall-row whitespace-nowrap text-[6.3rem] font-black uppercase tracking-[-0.06em] text-white/[0.045] ${index % 2 === 0 ? '-translate-x-[9%]' : '-translate-x-[2%]'}`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {Array.from({ length: 3 }).map((_, copyIndex) => (
                  <span key={`${row}-${copyIndex}`} className="mr-12 inline-block">
                    {row}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="relative z-10 mx-auto flex min-h-[60svh] min-w-0 w-full max-w-5xl flex-col items-center justify-center px-3 py-6 text-center sm:min-h-[56svh] sm:px-4 sm:py-8 lg:min-h-[78svh] lg:items-start lg:justify-center lg:px-0 lg:py-0 lg:text-left">
            {/* Badge */}
            <div
              className="hero-reveal inline-flex flex-wrap items-center justify-center gap-3 rounded-full border px-4 py-3 text-white/90 backdrop-blur-xl shadow-2xl sm:px-5 lg:justify-start"
              style={{
                borderColor: `rgba(${theme.primaryRgb},0.3)`,
                background: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(${theme.primaryRgb},0.15))`,
                boxShadow: `0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
              }}
            >
              <div className="h-9 w-9 overflow-hidden rounded-full border border-white/30 shadow-lg">
                <img src={theme.image} alt={theme.name} className="h-full w-full object-cover" />
              </div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/75 sm:text-xs sm:tracking-[0.28em]">
                MV Agusta F4
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] sm:text-xs sm:tracking-[0.22em]">
                AI Engineer + Full Stack Builder
              </span>
              <Sparkles size={15} style={{ color: theme.primary }} />
            </div>

            {/* Tagline */}
            <div className="hero-reveal mt-10 flex flex-col items-center gap-5 sm:mt-12 lg:items-start">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45 sm:text-[11px] sm:tracking-[0.45em] lg:tracking-[0.55em]">
                Production Systems. Sharp Interfaces. Real Outcomes.
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/32 sm:text-xs lg:tracking-[0.5em]">
                Intelligent Products
              </p>
            </div>

            {/* Main Title */}
            <div className="hero-reveal mt-4 flex w-full max-w-5xl flex-col items-center sm:mt-5 lg:items-start">
              <h1
                ref={heroTitleRef}
                className="text-center text-[3rem] font-black uppercase leading-[0.84] tracking-[-0.07em] text-white sm:text-[4.8rem] md:text-[5.9rem] lg:text-left lg:text-[7.6rem] lg:leading-[0.8]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span className="hero-title-line block">Crafted</span>
                <span
                  className="hero-title-line block"
                  style={{
                    color: theme.primary,
                    textShadow: `0 0 34px rgba(${theme.primaryRgb},0.55), 0 0 64px rgba(${theme.primaryRgb},0.2)`,
                  }}
                >
                  To
                </span>
                <span className="hero-title-line block">Perform</span>
              </h1>
            </div>

            {/* Description */}
            <div
              className="hero-reveal mt-10 grid w-full max-w-5xl gap-5 text-left sm:mt-12 sm:grid-cols-2"
            >
              <div
                className="rounded-[1.85rem] border px-6 py-6 backdrop-blur-md sm:px-8 sm:py-7"
                style={{
                  borderColor: `rgba(${theme.primaryRgb},0.22)`,
                  background: `linear-gradient(135deg, rgba(8,10,18,0.78), rgba(${theme.primaryRgb},0.08))`,
                  boxShadow: `0 24px 60px rgba(0,0,0,0.28)`,
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-white/35 sm:text-[11px]">
                  Build Thesis
                </p>
                <p className="mt-4 text-[1.05rem] leading-8 text-white/82 sm:text-[1.1rem]">
                  I build AI-powered products and full-stack systems that feel polished on the surface and robust underneath.
                </p>
              </div>
              <div
                className="rounded-[1.85rem] border px-6 py-6 backdrop-blur-md sm:px-8 sm:py-7"
                style={{
                  borderColor: `rgba(${theme.primaryRgb},0.18)`,
                  background: `linear-gradient(135deg, rgba(8,10,18,0.74), rgba(${theme.primaryRgb},0.06))`,
                  boxShadow: `0 24px 60px rgba(0,0,0,0.24)`,
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-white/35 sm:text-[11px]">
                  Focus Areas
                </p>
                <p className="mt-4 text-[1rem] leading-8 text-white/72">
                  Computer vision, automation, analytics, and scalable web delivery.
                </p>
              </div>
            </div>

            <div className="hero-reveal mt-8 flex w-full max-w-5xl flex-wrap items-center justify-center gap-3 lg:justify-start">
              {heroFocusPills.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-3 rounded-full border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/84 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: `rgba(${theme.primaryRgb},0.2)`,
                    background: 'rgba(14,18,29,0.62)',
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 16px 32px rgba(0,0,0,0.2)`,
                  }}
                >
                  <Code2 size={14} style={{ color: theme.primary }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="hero-reveal mt-6 w-full max-w-5xl">
              <MarqueeBand items={heroTickerItems} theme={theme} />
            </div>

            {/* CTA Buttons */}
            <div className="hero-reveal mt-10 flex w-full max-w-5xl flex-col items-stretch justify-center gap-3.5 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-4">
              <button
                type="button"
                ref={projectsButtonRef}
                onClick={() => scrollToSection('projects')}
                className="group relative inline-flex w-full min-w-0 items-center justify-center gap-2 overflow-hidden rounded-[1.45rem] px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.24em] text-white transition-all duration-300 sm:min-w-[240px] sm:justify-between sm:px-8 sm:text-sm"
                style={{
                  background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                  boxShadow: `0 22px 44px rgba(${theme.primaryRgb},0.35)`,
                }}
              >
                <span className="relative z-10">View Projects</span>
                <ArrowDownRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                <div className="absolute inset-0 bg-white/18 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              </button>

              <a
                ref={resumeButtonRef}
                href={resumeHref}
                download="Rudransh Pardeshi resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full min-w-0 items-center justify-center rounded-[1.45rem] border px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:-translate-y-1 sm:min-w-[240px] sm:px-8 sm:text-sm"
                style={{
                  borderColor: `rgba(${theme.primaryRgb},0.35)`,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(${theme.primaryRgb},0.12))`,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`,
                }}
              >
                Download Resume
              </a>

              <button
                type="button"
                ref={contactButtonRef}
                onClick={() => scrollToSection('contact')}
                className="group inline-flex w-full min-w-0 items-center justify-center rounded-[1.45rem] border border-white/12 bg-black/40 px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black/60 sm:min-w-[200px] sm:px-8 sm:text-sm"
                style={{
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 32px rgba(0,0,0,0.18)`,
                }}
              >
                Contact Me
              </button>
            </div>

            {/* Social Links */}
            <div className="hero-reveal mt-10 flex flex-wrap items-center justify-center gap-5 sm:mt-12 lg:justify-start">
              <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full border border-white/10 bg-black/20 p-3 text-white/40 transition-colors duration-300 hover:text-white">
                <Github size={20} />
              </a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-white/10 bg-black/20 p-3 text-white/40 transition-colors duration-300 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href={emailHref} aria-label="Email" className="rounded-full border border-white/10 bg-black/20 p-3 text-white/40 transition-colors duration-300 hover:text-white">
                <Mail size={20} />
              </a>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/32 sm:text-[11px]">
                Available for building thoughtful AI experiences
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 sm:flex" onClick={() => scrollToSection('projects')}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">Scroll</span>
          <div className="scroll-indicator w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>
    </>
  );
}
