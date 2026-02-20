import React from 'react';
import { SpaceBackground, CustomCursor } from '@/components';
import { Footer } from '@/components/Footer';
import HeroPage from '@/pages/HeroPage';
import AboutPage from '@/pages/AboutPage';
import SkillsPage from '@/pages/SkillsPage';
import ProjectsPage from '@/pages/ProjectsPage';
import TestimonialsPage from '@/pages/TestimonialsPage';
import ContactPage from '@/pages/ContactPage';

/**
 * Main App Component
 * Integrates all pages and global components
 */
function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Space background with stars and constellations */}
      <SpaceBackground />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero section */}
        <HeroPage />

        {/* About section */}
        <AboutPage />

        {/* Skills section */}
        <SkillsPage />

        {/* Projects section */}
        <ProjectsPage />

        {/* Testimonials section */}
        <TestimonialsPage />

        {/* Contact section */}
        <ContactPage />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

