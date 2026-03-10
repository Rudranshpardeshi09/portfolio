import { useEffect } from 'react';
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

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <ClickSpark
      sparkColor={theme?.primary || '#fff'}
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div
        className="relative w-full min-h-screen theme-transition"
        style={getBackgroundStyle()}
      >
        <div className="noise-overlay" />

        {/* Background Particles */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <ParticleBackground />
        </div>

        {/* Toast notifications */}
        <GlassmorphicToast />

        {/* Fixed UI elements */}
        <Navbar />
        <ScrollMap />
        <FloatingBikes />
        <RibbonCursor />

        {/* Single-page sections */}
        <main className="relative z-10 w-full">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ClickSpark>
  );
}
