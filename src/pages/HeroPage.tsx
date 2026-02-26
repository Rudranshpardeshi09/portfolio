import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
 * Landing page with hero background image, garage theme heading, and skill palette with parallax zoom effect
 */
export const HeroPage: React.FC = () => {
  const { scrollY } = useScroll();
  // Create parallax zoom effect: scale from 1 at top to 1.2 when scrolled 600px
  const backgroundScale = useTransform(scrollY, [0, 600], [1, 1.2]);

  // Scroll-driven opacity for subtitle fade-out
  const subtitleOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Scroll-driven scale for title compression
  const titleScale = useTransform(scrollY, [0, 400], [1, 0.85]);

  // Scroll-driven blur effect
  const contentBlur = useTransform(scrollY, [0, 300], [0, 5]);

  return (
    <Section id="hero" className="hero-section relative overflow-hidden">
      {/* Background image with parallax zoom effect */}
      <motion.div
        className="hero-bg"
        style={{ scale: backgroundScale, willChange: 'transform' }}
      />

      {/* Backdrop with blur effect */}
      <div className="hero-backdrop" />

      <Container>
        <motion.div
          className="relative z-10 w-full h-full flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Garage Heading - Centered content */}
          <motion.div
            className="text-center space-y-6 md:space-y-8 max-w-5xl px-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Subtitle with heavy animations */}
            <motion.div
              style={{ opacity: subtitleOpacity }}
              initial={{ opacity: 0, y: -40, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <div className="hero-subtitle">
                Welcome to the Garage
              </div>
            </motion.div>

            {/* Main Title with gradient and scroll animations */}
            <motion.div
              style={{ scale: titleScale }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            >
              <motion.h1
                className="hero-title"
                animate={{
                  letterSpacing: ['0.05em', '0.08em', '0.05em']
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Rudransh's<br />Garage
              </motion.h1>
            </motion.div>

            {/* Description with glassmorphism and scroll blur */}
            <motion.div
              className="glass-card p-6 md:p-8 max-w-2xl mx-auto border border-white/20 hover:border-white/40"
              style={{ filter: contentBlur }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Paragraph size="lg" animated={false} className="text-white/90">
                Full-Stack Developer & AI/ML Enthusiast. Master of Computer Applications with expertise in React, Python, and AI/ML.
              </Paragraph>
            </motion.div>

            {/* CTA Buttons with enhanced animations */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center pt-4 md:pt-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="primary"
                  className="group bg-white/10 border border-white/30 hover:bg-white/20 backdrop-blur-sm text-white w-full sm:w-auto"
                  onClick={() => {
                    const section = document.getElementById('projects');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View My Work
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:text-white hover:border-white/60 bg-white/5 backdrop-blur-sm w-full sm:w-auto"
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
