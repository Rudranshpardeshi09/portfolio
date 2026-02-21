import React from 'react';
import { motion } from 'framer-motion';
import { Container, Heading, Paragraph, Section, GlassCard } from '@/components';
import { MOTION_CONFIG } from '@/config/motion.config';
import { Award, Briefcase, BookOpen } from 'lucide-react';

/**
 * Timeline Item Component with 3D scroll animations
 */
const TimelineItem: React.FC<{
  year: string;
  title: string;
  description: string;
  index: number;
}> = ({ year, title, description, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="relative pl-8 pb-12"
      initial={{ opacity: 0, x: isEven ? -50 : 50, rotateY: isEven ? -45 : 45 }}
      whileInView={{
        opacity: 1,
        x: 0,
        rotateY: 0,
      }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.5 }}
      style={{ perspective: '1200px' }}
    >
      {/* Timeline dot with pulse animation */}
      <motion.div
        className="absolute left-0 top-0 w-4 h-4 rounded-full bg-white border-4 border-black"
        animate={{
          boxShadow: [
            '0 0 0 0px rgba(255, 255, 255, 0.7)',
            '0 0 0 12px rgba(255, 255, 255, 0)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          borderColor: 'var(--theme-primary)',
          backgroundColor: 'var(--theme-primary)'
        }}
      />

      {/* Timeline line */}
      {index < 2 && (
        <motion.div
          className="absolute left-[7px] top-4 w-0.5 bg-gradient-to-b from-theme-primary to-transparent"
          initial={{ height: 0 }}
          whileInView={{ height: '48px' }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true, amount: 0.5 }}
          style={{
            backgroundImage: 'linear-gradient(to bottom, var(--theme-primary), transparent)',
            boxShadow: '0 0 10px var(--theme-glow)'
          }}
        />
      )}

      {/* Content with glassmorphism */}
      <motion.div
        className="space-y-1 glass-card p-4 ml-2"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <p className="text-sm font-semibold" style={{ color: 'var(--theme-primary)' }}>{year}</p>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-white/70">{description}</p>
      </motion.div>
    </motion.div>
  );
};

/**
 * InfoCard Component with 3D flip animation
 */
const InfoCard: React.FC<{ icon: React.ReactNode; title: string; content: string; index: number }> = ({
  icon,
  title,
  content,
  index,
}) => {
  const directions = ['fromLeft', 'fromTop', 'fromRight'];
  const direction = directions[index % 3];

  const getInitialState = () => {
    switch(direction) {
      case 'fromLeft': return { opacity: 0, x: -100, rotateZ: -45 };
      case 'fromTop': return { opacity: 0, y: -100, rotateX: -90 };
      case 'fromRight': return { opacity: 0, x: 100, rotateZ: 45 };
      default: return { opacity: 0 };
    }
  };

  return (
    <motion.div
      className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
      initial={getInitialState()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateZ: 0,
      }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 30px var(--theme-glow)',
      }}
      style={{
        perspective: '1200px',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="p-6">
        <motion.div
          className="text-white mb-3"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>
        <h3 className="font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-white/70">{content}</p>
      </div>
    </motion.div>
  );
};

/**
 * AboutPage Component with enhanced 3D scroll animations
 */
export const AboutPage: React.FC = () => {
  const timeline = [
    {
      year: '2024',
      title: 'AI/ML Intern at Robotronix',
      description: 'Developed machine learning models for computer vision and AI anomaly detection systems.',
    },
    {
      year: '2023-2024',
      title: 'Web Dev Intern at IIPS-DAVV',
      description: 'Built full-stack web applications using React, Django, and PostgreSQL. Gained hands-on experience in modern web development practices.',
    },
    {
      year: '2019-Present',
      title: 'MCA at IIPS-DAVV',
      description: 'Master of Computer Applications (5-year integrated program). CGPA: 8.05. Specialized in AI/ML, Web Development, and Data Science.',
    },
  ];

  return (
    <Section id="about" className="relative">
      <Container>
        {/* Section heading with animation */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Heading as="h2" className="text-white">About the Rider</Heading>
          <motion.div
            className="w-16 h-1 bg-gradient-to-r mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              backgroundImage: 'linear-gradient(to right, var(--theme-primary), var(--theme-secondary))',
              boxShadow: '0 0 10px var(--theme-glow)',
              margin: '1rem auto 0'
            }}
          />
        </motion.div>

        {/* Main content grid with 3D animations */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left side - Text with slide animation */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -100, rotateY: -30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            style={{ perspective: '1200px' }}
          >
            <Paragraph className="text-white/90">
              I'm Rudransh Pardeshi, a passionate full-stack developer and AI/ML enthusiast from India. Currently pursuing my Master of Computer Applications at IIPS-DAVV with a focus on intelligent systems and modern web technologies.
            </Paragraph>
            <Paragraph className="text-white/80">
              My journey spans cutting-edge domains including facial recognition systems, AI-powered forecasting, inventory management, and interactive web applications. I'm driven by the challenge of building solutions that combine elegant design with powerful functionality, always staying at the forefront of technology innovation.
            </Paragraph>
          </motion.div>

          {/* Right side - Timeline with 3D animations */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {timeline.map((item, index) => (
              <TimelineItem key={item.year} {...item} index={index} />
            ))}
          </motion.div>
        </motion.div>

        {/* Info Cards Section with directional animations */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <InfoCard
            icon={<BookOpen className="w-6 h-6" />}
            title="Engine Specs"
            content="Master of Computer Applications (5-year integrated) at IIPS-DAVV. CGPA: 8.05"
            index={0}
          />
          <InfoCard
            icon={<Briefcase className="w-6 h-6" />}
            title="Miles Traveled"
            content="AI/ML Intern at Robotronix. Web Dev Intern at IIPS-DAVV. Hands-on experience with production systems"
            index={1}
          />
          <InfoCard
            icon={<Award className="w-6 h-6" />}
            title="Trophies"
            content="NVIDIA (AI & Anomaly Detection), Red Hat, Google Cloud (Prompt Design in Vertex AI)"
            index={2}
          />
        </motion.div>

        {/* Stats Section with rotating cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            { label: 'Projects Built', value: '5+' },
            { label: 'Skills Mastered', value: '15+' },
            { label: 'Years Coding', value: '3+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, rotateY: -90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.08, rotateZ: 5 }}
              style={{ perspective: '1200px' }}
            >
              <GlassCard className="text-center border border-white/10">
                <motion.h3
                  className="text-4xl font-bold mb-2"
                  style={{ color: 'var(--theme-primary)' }}
                  whileHover={{ scale: 1.2 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-white/70">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};

export default AboutPage;
