import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: 'Fellow Developer',
        role: 'Team Lead',
        text: "Rudransh's attention to detail and passion for clean code makes him an excellent collaborator. Every project he touches gets a creative edge.",
        avatar: '🏍️',
    },
    {
        name: 'Project Partner',
        role: 'Designer',
        text: "Working with Rudransh is like riding a well-tuned machine — smooth, efficient, and always gets you to the destination on time.",
        avatar: '🔧',
    },
    {
        name: 'Mentor',
        role: 'Senior Engineer',
        text: "A fast learner with the right throttle control. Rudransh balances speed with quality, which is rare in a developer at his stage.",
        avatar: '⚡',
    },
];

/**
 * TestimonialsPage Component
 * Garage-themed testimonial cards
 */
const TestimonialsPage = () => {
    return (
        <section id="testimonials" className="relative py-24 px-4 bg-garage-darkest overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title">Pit Crew Says</h2>
                    <p className="text-gray-400 mt-6 font-body text-lg">
                        Words from the people I've worked with on the road
                    </p>
                    <div className="glow-line w-20 mx-auto mt-4" />
                </motion.div>

                {/* Testimonials grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.name}
                            className="garage-card relative"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            {/* Quote mark */}
                            <div className="absolute -top-3 -left-1 text-5xl text-red-500/20 font-racing">
                                "
                            </div>

                            <p className="text-gray-300 font-body text-base leading-relaxed mb-6 italic">
                                {t.text}
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-gray-700/50">
                                <span className="text-3xl">{t.avatar}</span>
                                <div>
                                    <h4 className="font-heading text-sm text-white">{t.name}</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsPage;
