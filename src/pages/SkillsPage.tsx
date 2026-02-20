import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Heading, Section, SkillCard, Badge } from '@/components';
import { MOTION_CONFIG } from '@/config/motion.config';
import {
  Code,
  Database,
  Globe,
  Cloud,
  Palette,
  Zap,
} from 'lucide-react';

/**
 * SkillsPage Component
 * Displays skills organized by category
 */
export const SkillsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | string>('all');

  const categories = [
    { id: 'frontend', label: 'Frontend', icon: <Palette className="w-4 h-4" /> },
    { id: 'backend', label: 'Backend', icon: <Database className="w-4 h-4" /> },
    { id: 'tools', label: 'Tools', icon: <Zap className="w-4 h-4" /> },
    { id: 'devops', label: 'DevOps', icon: <Cloud className="w-4 h-4" /> },
  ];

  const skills = [
    // Frontend
    {
      category: 'frontend',
      name: 'React/React Native',
      icon: <Code className="w-6 h-6 text-blue-400" />,
      proficiency: 95,
      description: 'Hooks, Context, Performance optimization',
    },
    {
      category: 'frontend',
      name: 'TypeScript',
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      proficiency: 90,
      description: 'Advanced types, generics, utilities',
    },
    {
      category: 'frontend',
      name: 'Tailwind CSS',
      icon: <Palette className="w-6 h-6 text-cyan-400" />,
      proficiency: 92,
      description: 'Custom configs, responsive design',
    },
    {
      category: 'frontend',
      name: 'Framer Motion',
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      proficiency: 88,
      description: 'Complex animations, interactions',
    },
    // Backend
    {
      category: 'backend',
      name: 'Node.js/Express',
      icon: <Database className="w-6 h-6 text-green-400" />,
      proficiency: 87,
      description: 'RESTful APIs, middleware, auth',
    },
    {
      category: 'backend',
      name: 'PostgreSQL',
      icon: <Database className="w-6 h-6 text-orange-400" />,
      proficiency: 85,
      description: 'Complex queries, indexing, optimization',
    },
    // Tools
    {
      category: 'tools',
      name: 'Git & GitHub',
      icon: <Code className="w-6 h-6 text-gray-400" />,
      proficiency: 93,
      description: 'Branching, CI/CD, pull requests',
    },
    {
      category: 'tools',
      name: 'Webpack/Vite',
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      proficiency: 85,
      description: 'Bundling, optimization, dev server',
    },
    // DevOps
    {
      category: 'devops',
      name: 'Docker',
      icon: <Cloud className="w-6 h-6 text-blue-500" />,
      proficiency: 80,
      description: 'Containerization, docker-compose',
    },
    {
      category: 'devops',
      name: 'AWS',
      icon: <Cloud className="w-6 h-6 text-orange-500" />,
      proficiency: 78,
      description: 'EC2, S3, Lambda, RDS',
    },
  ];

  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter((skill) => skill.category === activeCategory);

  return (
    <Section id="skills" className="relative">
      <Container>
        <Heading as="h2" className="mb-12 text-center">
          Skills & Expertise
        </Heading>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge
            variant={activeCategory === 'all' ? 'primary' : 'accent'}
            className="cursor-pointer"
            onClick={() => setActiveCategory('all')}
          >
            All Skills
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={activeCategory === category.id ? 'primary' : 'accent'}
              className="cursor-pointer flex items-center gap-2"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon}
              {category.label}
            </Badge>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={MOTION_CONFIG.staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filtered.map((skill) => (
            <motion.div
              key={skill.name}
              variants={MOTION_CONFIG.staggerItem}
            >
              <SkillCard
                icon={skill.icon}
                name={skill.name}
                proficiency={skill.proficiency}
                description={skill.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};

export default SkillsPage;
