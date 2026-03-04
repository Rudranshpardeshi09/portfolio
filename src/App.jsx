import useThemeStore from './store/themeStore';

import ParticleBackground from './components/ui/ParticleBackground';
import GlassmorphicToast from './components/ui/GlassmorphicToast';
import Navbar from './components/ui/Navbar';
import ScrollMap from './components/ui/ScrollMap';
import FloatingBikes from './components/ui/FloatingBikes';

// Sections
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ContactSection from './components/sections/ContactSection';

export default function App() {
  const { getBackgroundStyle } = useThemeStore();

  return (
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

      {/* Single-page sections */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  );
}
