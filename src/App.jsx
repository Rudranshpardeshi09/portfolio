import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import ProtectedRoute from './components/ui/ProtectedRoute';
import GlassmorphicToast from './components/ui/GlassmorphicToast';

// Pages
import BikeSelectionPage from './components/pages/BikeSelectionPage';
import MapPage from './components/pages/MapPage';
import AboutPage from './components/pages/AboutPage';
import SkillsPage from './components/pages/SkillsPage';
import ProjectsPage from './components/pages/ProjectsPage';
import ExperiencePage from './components/pages/ExperiencePage';
import ContactPage from './components/pages/ContactPage';

export default function App() {
  return (
    <div className="relative w-full h-full min-h-screen bg-black text-white overflow-hidden">
      {/* Subtle noise overlay */}
      <div className="noise-overlay" />

      {/* Toast notifications */}
      <GlassmorphicToast />

      {/* Routing */}
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Landing Route */}
          <Route path="/" element={<BikeSelectionPage />} />

          {/* Protected Interactive Routes */}
          <Route path="/map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
          <Route path="/skills" element={<ProtectedRoute><SkillsPage /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
          <Route path="/experience" element={<ProtectedRoute><ExperiencePage /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
