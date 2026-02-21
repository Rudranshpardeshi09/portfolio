import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  Button,
  Container,
  Heading,
  Paragraph,
  Section,
} from '@/components';
import { MOTION_CONFIG, TRANSITIONS } from '@/config/motion.config';

/**
 * TypewriterEffect Component
 * Animates text character by character
 */
const TypewriterEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="font-mono text-primary-500">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="ml-1"
      >
        _
      </motion.span>
    </span>
  );
};

/**
 * Colorful skill palette circle component
 */
const SkillCircle: React.FC<{ color: string; skill: string; delay: number }> = ({ color, skill, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className="absolute w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-xs text-center p-1"
      style={{ backgroundColor: color }}
      whileHover={{ scale: 1.1 }}
    >
      {skill}
    </motion.div>
  );
};

/**
 * HeroPage Component
 * Landing page with hero background image, garage theme heading, and skill palette
 */
export const HeroPage: React.FC = () => {
  return (
    <Section id="hero" className="hero-section">
      {/* Background image */}
      <div className="hero-bg" />

      {/* Backdrop with blur effect */}
      <div className="hero-backdrop" />

      <Container>
        <motion.div
          className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Garage Heading - positioned at bottom center */}
          <motion.div
            className="text-center space-y-6 max-w-4xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Subtitle with glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="hero-subtitle">
                Welcome to the Garage
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Rudransh's<br />Garage
            </motion.h1>

            {/* Description with glassmorphism */}
            <motion.div
              className="glass-card p-4 md:p-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Paragraph size="lg" animated={false} className="text-white/90">
                Full-Stack Developer & AI/ML Enthusiast. Master of Computer Applications with expertise in React, Python, and AI/ML.
              </Paragraph>
            </motion.div>

            {/* CTA Buttons with glassmorphism */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                size="lg"
                variant="primary"
                className="group bg-white/10 border border-white/30 hover:bg-white/20 backdrop-blur-sm text-white"
                onClick={() => {
                  const section = document.getElementById('projects');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:text-white hover:border-white/60 bg-white/5 backdrop-blur-sm"
                onClick={() => {
                  const section = document.getElementById('contact');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-white/60 rounded-full mt-2"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </Section>
  );
};

export default HeroPage;
