import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Heading, Section, ProjectCard, Modal } from '@/components';
import { MOTION_CONFIG } from '@/config/motion.config';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  details?: string;
  metrics?: { label: string; value: string }[];
}

/**
 * ProjectsPage Component
 * Grid of projects with modal details
 */
export const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      title: 'Auto-Attendance System',
      description: 'Automate student attendance tracking using facial recognition and liveness detection',
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=300&fit=crop',
      tags: ['TypeScript', 'Python', 'React', 'FastAPI', 'OpenCV', 'Deep Learning'],
      featured: true,
      link: '#projects',
      github: 'https://github.com/Rudranshpardeshi09/Auto-Attendance-system',
      details: 'A full-stack educational system featuring facial recognition technology with anti-spoofing liveness detection. Built with React frontend and FastAPI backend, supporting real-time WebSocket synchronization for live attendance tracking.',
      metrics: [
        { label: 'Accuracy', value: '98%+' },
        { label: 'Real-time', value: 'WebSocket' },
        { label: 'Tech Stack', value: 'Full Stack' },
      ],
    },
    {
      id: '2',
      title: 'Inventory Management System',
      description: 'Production-ready inventory management with real-time dashboards and audit trails',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
      tags: ['Django', 'Python', 'Bootstrap', 'PostgreSQL', 'AJAX'],
      featured: true,
      link: '#projects',
      github: 'https://github.com/Rudranshpardeshi09/inventory_management',
      details: 'Enterprise-grade inventory management system with real-time dashboards, bulk CSV/Excel import, transaction audit trails, and role-based access control. Built with Django 5.2 and Bootstrap 5.',
      metrics: [
        { label: 'Features', value: '7+' },
        { label: 'Production Ready', value: 'Yes' },
        { label: 'Forks', value: '3' },
      ],
    },
    {
      id: '3',
      title: 'Ecommerce Sales Forecast AI',
      description: 'AI-powered sales forecasting with advanced analytics and price optimization',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
      tags: ['Python', 'Prophet', 'Streamlit', 'Plotly', 'Scikit-learn', 'Google Gemini'],
      featured: true,
      link: '#projects',
      github: 'https://github.com/Rudranshpardeshi09/Ecommerce-Sales-Forecast-AI',
      details: 'Enterprise ML platform combining Facebook Prophet with ensemble models for time-series forecasting. Features AI-powered insights via Google Gemini, price elasticity analysis, and what-if scenario modeling with interactive Streamlit dashboard.',
      metrics: [
        { label: 'Models', value: 'Ensemble' },
        { label: 'Accuracy', value: 'High' },
        { label: 'AI Integration', value: 'Gemini' },
      ],
    },
    {
      id: '4',
      title: 'StudyMind-AI',
      description: 'Full-stack AI-powered interactive study assistant and learning management system',
      image: 'https://images.unsplash.com/photo-1516534775068-bb57e39c1a29?w=500&h=300&fit=crop',
      tags: ['JavaScript', 'Python', 'React', 'AI', 'NLP'],
      featured: true,
      github: 'https://github.com/Rudranshpardeshi09/StudyMind-AI',
      details: 'An intelligent AI-powered study platform combining modern web technologies with machine learning for personalized learning experiences. Features real-time collaboration and AI-driven study recommendations.',
      metrics: [
        { label: 'Type', value: 'Full Stack' },
        { label: 'AI Powered', value: 'Yes' },
        { label: 'Status', value: 'Active' },
      ],
    },
    {
      id: '5',
      title: 'Certificate Generator',
      description: 'Digital certificate generation with dynamic creation and management',
      image: 'https://images.unsplash.com/photo-1516534775068-bb57e39c1a29?w=500&h=300&fit=crop',
      tags: ['JavaScript', 'Python', 'React', 'Vercel'],
      github: 'https://github.com/Rudranshpardeshi09/Certificate-Generator',
      link: 'https://certificate-generator-beta-ashy.vercel.app',
      details: 'Full-stack certificate generation web application enabling dynamic creation of digital certificates for internships and courses. Deployed on Vercel with 234 commits.',
      metrics: [
        { label: 'Deployment', value: 'Vercel' },
        { label: 'Commits', value: '234' },
        { label: 'Status', value: 'Live' },
      ],
    },
  ];

  return (
    <Section id="projects" className="relative">
      <Container>
        {/* Enhanced Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Heading as="h2" className="text-white">My Builds</Heading>
          <motion.p
            className="text-white/60 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Featured projects showcasing full-stack development expertise
          </motion.p>
        </motion.div>

        {/* Projects Grid with 3D flip animations */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{
                opacity: 0,
                rotateY: index % 2 === 0 ? -90 : 90,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                rotateY: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: (index % 3) * 0.12,
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                scale: 1.05,
                rotateX: 5,
                y: -10,
              }}
              onClick={() => setSelectedProject(project)}
              style={{
                perspective: '1200px',
                cursor: 'pointer',
              }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                link={project.link}
                github={project.github}
                featured={project.featured}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Project Details Modal */}
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject?.title}
          size="lg"
        >
          {selectedProject && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <motion.img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg"
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.5 }}
              />

              {/* Description */}
              <motion.p
                className="text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {selectedProject.details || selectedProject.description}
              </motion.p>

              {/* Metrics */}
              {selectedProject.metrics && (
                <motion.div
                  className="grid md:grid-cols-3 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {selectedProject.metrics.map((metric, idx) => (
                    <motion.div
                      key={metric.label}
                      className="p-4 bg-white/10 rounded-lg border border-white/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="text-sm text-white/70">{metric.label}</p>
                      <p className="text-2xl font-bold gradient-text">{metric.value}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Tags */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {selectedProject.tags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    className="px-3 py-1.5 bg-white/10 text-white/80 rounded-full text-sm border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </Modal>
      </Container>
    </Section>
  );
};

export default ProjectsPage;
