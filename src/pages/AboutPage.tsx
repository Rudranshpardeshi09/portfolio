import React from 'react';
import { motion } from 'framer-motion';
import { Container, Heading, Paragraph, Section, GlassCard } from '@/components';
import { MOTION_CONFIG } from '@/config/motion.config';
import { Award, Briefcase, BookOpen } from 'lucide-react';

/**
 * Timeline Item Component
 */
const TimelineItem: React.FC<{
  year: string;
  title: string;
  description: string;
  index: number;
}> = ({ year, title, description, index }) => (
  <motion.div
    className="relative pl-8 pb-12"
    variants={MOTION_CONFIG.staggerItem}
  >
    {/* Timeline dot */}
    <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary-500 border-4 border-black" />

    {/* Timeline line */}
    {index < 2 && (
      <div className="absolute left-[7px] top-4 w-0.5 h-12 bg-gradient-to-b from-primary-500 to-transparent" />
    )}

    {/* Content */}
    <div className="space-y-1">
      <p className="text-sm font-semibold text-primary-400">{year}</p>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  </motion.div>
);

/**
 * InfoCard Component
 */
const InfoCard: React.FC<{ icon: React.ReactNode; title: string; content: string }> = ({
  icon,
  title,
  content,
}) => (
  <motion.div
    className="p-6 rounded-xl border border-primary-500/20 bg-primary-500/5"
    variants={MOTION_CONFIG.staggerItem}
  >
    <div className="flex items-start gap-4">
      <div className="text-primary-500 mt-1">{icon}</div>
      <div>
        <h3 className="font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-white/70">{content}</p>
      </div>
    </div>
  </motion.div>
);

/**
 * AboutPage Component
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
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={MOTION_CONFIG.staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left side - Text */}
          <motion.div className="space-y-6" variants={MOTION_CONFIG.staggerItem}>
            <Heading as="h2">About Me</Heading>
            <Paragraph>
              I'm Rudransh Pardeshi, a passionate full-stack developer and AI/ML enthusiast from India. Currently pursuing my Master of Computer Applications at IIPS-DAVV with a focus on intelligent systems and modern web technologies.
            </Paragraph>
            <Paragraph>
              My journey spans cutting-edge domains including facial recognition systems, AI-powered forecasting, inventory management, and interactive web applications. I'm driven by the challenge of building solutions that combine elegant design with powerful functionality, always staying at the forefront of technology innovation.
            </Paragraph>
          </motion.div>

          {/* Right side - Timeline */}
          <motion.div
            className="space-y-4"
            variants={MOTION_CONFIG.staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {timeline.map((item, index) => (
              <TimelineItem key={item.year} {...item} index={index} />
            ))}
          </motion.div>
        </motion.div>

        {/* Info Cards Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-16"
          variants={MOTION_CONFIG.staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <InfoCard
            icon={<BookOpen className="w-6 h-6" />}
            title="Education"
            content="Master of Computer Applications (5-year integrated) at IIPS-DAVV. CGPA: 8.05"
          />
          <InfoCard
            icon={<Briefcase className="w-6 h-6" />}
            title="Experience"
            content="AI/ML Intern at Robotronix. Web Dev Intern at IIPS-DAVV. Hands-on experience with production systems"
          />
          <InfoCard
            icon={<Award className="w-6 h-6" />}
            title="Certifications"
            content="NVIDIA (AI & Anomaly Detection), Red Hat, Google Cloud (Prompt Design in Vertex AI)"
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-12"
          variants={MOTION_CONFIG.staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            { label: 'Projects Built', value: '5+' },
            { label: 'Skills Mastered', value: '15+' },
            { label: 'Years Coding', value: '3+' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={MOTION_CONFIG.staggerItem}
            >
              <GlassCard className="text-center">
                <h3 className="text-4xl font-bold text-primary-500 mb-2">
                  {stat.value}
                </h3>
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
