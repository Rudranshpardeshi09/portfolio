import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, BrainCircuit, Boxes, ShieldCheck, Sparkles, Github, Linkedin, Mail } from 'lucide-react';
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
      pos[i*3] = (Math.random() - 0.5) * 15;
      pos[i*3+1] = (Math.random() - 0.5) * 8;
      pos[i*3+2] = (Math.random() - 0.5) * 10 - 5;
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
    const rotateYTo = gsap.quickTo(content, 'rotateY', { duration: 0.6, ease: 'power2.out' });
    const rotateXTo = gsap.quickTo(content, 'rotateX', { duration: 0.6, ease: 'power2.out' });
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
        const text = title.innerText;
        title.innerHTML = text.split(' ').map(word => 
          `<span class="word" style="display:inline-block; opacity:0; transform:translateY(40px); filter:blur(8px);">${word}&nbsp;</span>`
        ).join('');
        gsap.to(title.querySelectorAll('.word'), {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.08,
          duration: 0.8,
          ease: 'back.out(1.2)',
          delay: 0.6,
        });
      }

      // Scroll effects
      gsap.to(contentRef.current, {
        y: -180,
        rotateX: 20,
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
        className="relative isolate flex min-h-[100svh] items-start justify-center overflow-x-hidden px-4 pb-20 pt-24 sm:items-center sm:px-6 sm:py-24 lg:px-10"
        style={{ perspective: '1600px' }}
      >
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
          className="pointer-events-auto relative z-10 mx-auto grid w-full max-w-7xl gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.12fr)_380px] lg:items-end lg:gap-16"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
            {/* Badge */}
            <div
              className="hero-reveal inline-flex flex-wrap items-center justify-center gap-3 rounded-full border px-4 py-2.5 text-white/90 backdrop-blur-xl shadow-2xl sm:px-5 lg:justify-start"
              style={{
                borderColor: `rgba(${theme.primaryRgb},0.3)`,
                background: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(${theme.primaryRgb},0.15))`,
                boxShadow: `0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
              }}
            >
              <div className="h-9 w-9 overflow-hidden rounded-full border border-white/30 shadow-lg">
                <img src={theme.image} alt={theme.name} className="h-full w-full object-cover" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs sm:tracking-[0.3em]">
                AI Engineer + Full Stack Builder
              </span>
              <Sparkles size={15} style={{ color: theme.primary }} />
            </div>

            {/* Tagline */}
            <div className="mt-8 hero-reveal">
              <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-white/50">
                Production Systems. Sharp Interfaces. Real Outcomes.
              </p>
            </div>

            {/* Main Title */}
            <h1
              ref={heroTitleRef}
              className="hero-reveal mt-6 max-w-5xl text-[2.8rem] font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-6xl md:text-7xl lg:text-[6.8rem]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Intelligent Products
              <br />
              <span
                className="block"
                style={{
                  color: theme.primary,
                  textShadow: `0 0 40px rgba(${theme.primaryRgb},0.4)`,
                }}
              >
                Crafted To Perform
              </span>
            </h1>

            {/* Description */}
            <p className="hero-reveal mt-6 max-w-3xl text-sm leading-7 text-white/70 sm:mt-8 sm:text-base md:text-lg md:leading-8">
              I build AI-powered products and full-stack systems that feel polished on the surface and robust underneath, spanning computer vision, automation, analytics, and scalable web delivery.
            </p>

            {/* Tech Stack Chips */}
            <div className="hero-reveal mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              {[
                { label: 'Vision & AI', icon: BrainCircuit },
                { label: 'Full-stack Systems', icon: Boxes },
                { label: 'Reliable Delivery', icon: ShieldCheck },
              ].map((item) => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 sm:px-5 sm:text-[11px] sm:tracking-[0.2em]"
                  style={{
                    borderColor: `rgba(${theme.primaryRgb},0.2)`,
                    background: 'rgba(255,255,255,0.05)',
                  }}
                >
                  <item.icon size={14} style={{ color: theme.primary }} />
                  {item.label}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hero-reveal mt-10 flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 lg:justify-start">
              <button
                type="button"
                ref={projectsButtonRef}
                onClick={() => scrollToSection('projects')}
                className="group relative inline-flex w-full min-w-0 items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 sm:min-w-[200px] sm:px-8 sm:tracking-[0.22em]"
                style={{
                  background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                  boxShadow: `0 25px 45px rgba(${theme.primaryRgb},0.35)`,
                }}
              >
                <span className="relative z-10">View Projects</span>
                <ArrowDownRight size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <a
                ref={resumeButtonRef}
                href={resumeHref}
                download="Rudransh Pardeshi resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full min-w-0 items-center justify-center rounded-2xl border px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1 sm:min-w-[200px] sm:px-8 sm:tracking-[0.22em]"
                style={{
                  borderColor: `rgba(${theme.primaryRgb},0.35)`,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(${theme.primaryRgb},0.12))`,
                }}
              >
                Download Resume
              </a>

              <button
                type="button"
                ref={contactButtonRef}
                onClick={() => scrollToSection('contact')}
                className="group inline-flex w-full min-w-0 items-center justify-center rounded-2xl border border-white/20 bg-black/40 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black/60 sm:min-w-[180px] sm:px-8 sm:tracking-[0.22em]"
              >
                Contact Me
              </button>
            </div>

            {/* Social Links */}
            <div className="hero-reveal mt-10 flex gap-4">
              <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-white/40 hover:text-white transition-colors duration-300">
                <Github size={20} />
              </a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-white/40 hover:text-white transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a href={emailHref} aria-label="Email" className="text-white/40 hover:text-white transition-colors duration-300">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="hero-reveal mx-auto w-full max-w-[440px] lg:mx-0">
            <div
              className="relative overflow-hidden rounded-[2rem] border p-5 backdrop-blur-sm sm:p-7"
              style={{
                borderColor: `rgba(${theme.primaryRgb},0.25)`,
                background: `linear-gradient(145deg, rgba(10,10,15,0.8), rgba(${theme.primaryRgb},0.1) 130%)`,
                boxShadow: `0 40px 90px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }}
              />
              <div
                className="absolute -right-20 top-[-30px] h-48 w-48 rounded-full blur-[100px]"
                style={{ background: `rgba(${theme.primaryRgb},0.2)` }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/50 sm:tracking-[0.4em]">
                      Current Focus
                    </p>
                    <h2 className="mt-3 text-2xl font-black uppercase leading-none text-white sm:text-[2.2rem]">
                      Building AI That Ships
                    </h2>
                  </div>
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border sm:h-14 sm:w-14"
                    style={{
                      borderColor: `rgba(${theme.primaryRgb},0.35)`,
                      background: `rgba(${theme.primaryRgb},0.15)`,
                    }}
                  >
                    <Sparkles size={20} style={{ color: theme.primary }} />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    ['AI/ML Workflows', 'Forecasting, automation, and intelligent decision systems', 'AI'],
                    ['Frontend Quality', 'Motion-rich interfaces with product-minded UX', 'UI'],
                    ['Backend Reliability', 'Django, APIs, validation, and scalable delivery', 'API'],
                  ].map(([title, text, badge]) => (
                    <div
                      key={title}
                      className="group rounded-[1.5rem] border px-4 py-4 transition-all duration-300 hover:translate-x-1 hover:border-opacity-50 sm:px-5"
                      style={{
                        borderColor: `rgba(${theme.primaryRgb},0.15)`,
                        background: 'rgba(255,255,255,0.03)',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex min-w-10 items-center justify-center rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70"
                          style={{ borderColor: `rgba(${theme.primaryRgb},0.2)` }}
                        >
                          {badge}
                        </span>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em]" style={{ color: theme.primary }}>
                          {title}
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-white/70">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    ['Projects', '10+', 'PR'],
                    ['Internships', '2', 'IN'],
                    ['Focus', 'AI + Web', 'FW'],
                  ].map(([label, value, badge]) => (
                    <div
                      key={label}
                      className="rounded-2xl border px-3 py-4 text-center transition-all duration-300 hover:scale-105"
                      style={{
                        borderColor: `rgba(${theme.primaryRgb},0.2)`,
                        background: 'rgba(255,255,255,0.03)',
                      }}
                    >
                      <p className="text-lg font-black text-white sm:text-2xl">{value}</p>
                      <p className="mt-1 flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/50 sm:tracking-[0.18em]">
                        <span>{badge}</span>
                        <span>{label}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
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
