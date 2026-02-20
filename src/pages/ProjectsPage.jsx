import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: 'StudyMind AI',
        description: 'An AI-powered study assistant that analyzes PDFs and provides intelligent responses using LLM technology.',
        tech: ['React', 'Python', 'FastAPI', 'LLM'],
        status: 'Completed',
        link: '#',
    },
    {
        title: 'Face Recognition Attendance',
        description: 'Automated attendance system using real-time face recognition with DeepFace embeddings and liveness detection.',
        tech: ['React', 'Python', 'OpenCV', 'FastAPI'],
        status: 'Completed',
        link: '#',
    },
    {
        title: 'AI Video Detector',
        description: 'Deep learning system to detect AI-generated and deepfake videos with high accuracy and confidence scoring.',
        tech: ['Python', 'TensorFlow', 'React', 'Flask'],
        status: 'In Progress',
        link: '#',
    },
    {
        title: 'Portfolio Website',
        description: 'This very site — a bike-themed portfolio built with React, Framer Motion, and Tailwind CSS.',
        tech: ['React', 'Tailwind', 'GSAP', 'Framer Motion'],
        status: 'Completed',
        link: '#',
    },
];

/**
 * ProjectsPage Component
 * Dashboard-style project cards with red accent borders
 */
const ProjectsPage = () => {
    return (
        <section id="projects" className="relative py-24 px-4 bg-garage-dark overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title">My Builds</h2>
                    <p className="text-gray-400 mt-6 font-body text-lg">
                        Custom-engineered digital machines — crafted with precision
                    </p>
                    <div className="glow-line w-20 mx-auto mt-4" />
                </motion.div>

                {/* Projects grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            className="dashboard-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            {/* Status badge */}
                            <div className="flex items-center justify-between mb-4">
                                <span className={`px-3 py-1 text-xs font-heading tracking-wider uppercase rounded-full ${project.status === 'Completed'
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                    }`}>
                                    {project.status}
                                </span>

                                {/* RPM indicator dots */}
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-2 h-2 rounded-full ${i < 4 ? 'bg-red-500' : 'bg-red-500/30'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="font-racing text-2xl text-white mb-3 group-hover:text-red-500 transition-colors">
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 font-body text-base leading-relaxed mb-6">
                                {project.description}
                            </p>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 text-xs font-heading tracking-wider uppercase bg-garage-darkest text-red-400 border border-garage-border rounded"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* View project link */}
                            <a
                                href={project.link}
                                className="inline-flex items-center gap-2 text-sm font-heading tracking-wider uppercase text-white/60 hover:text-red-500 transition-colors"
                            >
                                <span>View Build</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>

                            {/* Decorative bottom line */}
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsPage;
