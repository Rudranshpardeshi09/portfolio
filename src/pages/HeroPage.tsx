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
 * Landing page with hero section with space theme, colorful skill palette, and CTA buttons
 */
export const HeroPage: React.FC = () => {
  // Skill palette with colors and positions
  const skillPalette = [
    { color: '#ff6b35', skill: 'React', top: '10%', left: '8%' },
    { color: '#00d4ff', skill: 'TypeScript', top: '15%', right: '10%' },
    { color: '#8b5cf6', skill: 'Python', top: '40%', left: '5%' },
    { color: '#ff1493', skill: 'Django', bottom: '25%', left: '12%' },
    { color: '#40e0d0', skill: 'PostgreSQL', top: '45%', right: '8%' },
    { color: '#ffd700', skill: 'TensorFlow', bottom: '35%', right: '15%' },
    { color: '#ff4444', skill: 'OpenCV', top: '65%', left: '10%' },
    { color: '#4169e1', skill: 'Docker', bottom: '15%', right: '20%' },
  ];

  return (
    <Section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative skill circles - positioned absolutely */}
      <div className="absolute inset-0 pointer-events-none">
        {skillPalette.map((item, idx) => (
          <div
            key={idx}
            className="absolute w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-xs text-center p-1"
            style={{
              backgroundColor: item.color,
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              opacity: 0.1,
            }}
          />
        ))}
      </div>

      <Container>
        <motion.div
          className="text-center space-y-8 relative z-10"
          variants={MOTION_CONFIG.staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={MOTION_CONFIG.staggerItem}
            className="flex justify-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-primary-300">Exploring the digital universe</span>
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={MOTION_CONFIG.staggerItem} className="space-y-4">
            <Heading as="h1" className="text-white" animated={false}>
              I'm{' '}
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #00d4ff 0%, #0ea5e9 50%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Rudransh Pardeshi
              </span>
            </Heading>
            <Heading
              as="h2"
              className="text-3xl md:text-5xl text-white/80 font-normal"
              animated={false}
            >
              <TypewriterEffect text="Full-Stack Developer & AI/ML Enthusiast" />
            </Heading>
          </motion.div>

          {/* Description */}
          <motion.div variants={MOTION_CONFIG.staggerItem}>
            <Paragraph size="lg" animated={false} className="max-w-2xl mx-auto text-white/70">
              Master of Computer Applications with expertise in React, Python, and AI/ML.
              I create intelligent web solutions that combine beautiful design with powerful functionality.
              Passionate about turning ideas into reality through clean code and innovative thinking.
            </Paragraph>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={MOTION_CONFIG.staggerItem}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              variant="primary"
              className="group bg-primary-500/20 border border-primary-500 hover:bg-primary-500/30"
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
              className="border-primary-500/50 text-primary-300 hover:text-primary-200 hover:border-primary-500"
              onClick={() => {
                const section = document.getElementById('contact');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get in Touch
            </Button>
          </motion.div>

          {/* Tech Stack Pills */}
          <motion.div
            variants={MOTION_CONFIG.staggerItem}
            className="flex flex-wrap justify-center gap-3"
          >
            {['React', 'TypeScript', 'Django', 'TensorFlow', 'Tailwind'].map((tech) => (
              <motion.div
                key={tech}
                className="px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-sm text-primary-300"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 212, 255, 0.2)' }}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary-500/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-primary-500/50 rounded-full mt-2"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default HeroPage;
