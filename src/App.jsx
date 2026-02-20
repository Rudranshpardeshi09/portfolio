import React, { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import HeroPage from '@/pages/HeroPage';
import AboutPage from '@/pages/AboutPage';
import SkillsPage from '@/pages/SkillsPage';
import ProjectsPage from '@/pages/ProjectsPage';
import TestimonialsPage from '@/pages/TestimonialsPage';
import ContactPage from '@/pages/ContactPage';

/**
 * Main App Component
 * Bike-themed portfolio with welcome screen, navbar, and all sections
 */
function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="min-h-screen bg-garage-dark text-white">
      {/* Welcome screen overlay */}
      {showWelcome && (
        <WelcomeScreen onComplete={() => setShowWelcome(false)} />
      )}

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero / Garage section */}
        <HeroPage />

        {/* About the Rider */}
        <AboutPage />

        {/* Engine Specs (Skills) */}
        <SkillsPage />

        {/* My Builds (Projects) */}
        <ProjectsPage />

        {/* Pit Crew Says (Testimonials) */}
        <TestimonialsPage />

        {/* Drop a Message (Contact) */}
        <ContactPage />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
