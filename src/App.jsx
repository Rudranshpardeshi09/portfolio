import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useThemeStore from './store/themeStore';
import Lenis from 'lenis';

import ParticleBackground from './components/ui/ParticleBackground';
import GlassmorphicToast from './components/ui/GlassmorphicToast';
import Navbar from './components/ui/Navbar';
import ScrollMap from './components/ui/ScrollMap';
import FloatingBikes from './components/ui/FloatingBikes';
import ClickSpark from './components/reactbits/ClickSpark';
import RibbonCursor from './components/ui/RibbonCursor';
import Footer from './components/ui/Footer';

// Sections
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ContactSection from './components/sections/ContactSection';

export default function App() {
  const { getBackgroundStyle, theme } = useThemeStore();
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleNavToggle = (e) => {
      setIsNavOpen(e.detail.isOpen);
    };

    window.addEventListener('navToggle', handleNavToggle);
    return () => window.removeEventListener('navToggle', handleNavToggle);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    if (isNavOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isNavOpen]);

  return (
    <ClickSpark
      sparkColor={theme?.primary || '#fff'}
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div
        className="relative w-full min-h-screen theme-transition perspective-2000 overflow-x-hidden"
        style={getBackgroundStyle()}
      >
        <div className="noise-overlay" />

        {/* Background Particles */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <ParticleBackground />
        </div>

        {/* Toast notifications */}
        <GlassmorphicToast />

        {/* Fixed UI elements - Navbar stays on top */}
        <Navbar />

        {/* Content Wrapper with 3D Transfrom */}
        <motion.div
           animate={{
             scale: isNavOpen ? 0.8 : 1,
             rotateY: isNavOpen ? -15 : 0,
             x: isNavOpen ? '60%' : '0%',
             borderRadius: isNavOpen ? '40px' : '0px',
           }}
           transition={{
             type: "spring",
             damping: 25,
             stiffness: 120
           }}
           className="relative z-10 w-full min-h-screen shadow-2xl origin-left transform-gpu"
           style={{
             overflow: isNavOpen ? 'hidden' : 'visible',
             pointerEvents: isNavOpen ? 'none' : 'auto',
             background: getBackgroundStyle().background // Ensure inner background matches
           }}
        >
          <ScrollMap />
          <FloatingBikes />
          <RibbonCursor />

          {/* Single-page sections */}
          <main className="relative w-full">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
          </main>
          <Footer />
        </motion.div>
      </div>
    </ClickSpark>
  );
}
