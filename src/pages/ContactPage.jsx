import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ContactPage Component
 * Garage-themed contact form with red submit button
 */
const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        alert('Message sent! Thanks for reaching out.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="relative py-24 px-4 bg-garage-dark overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                {/* Section title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title">Drop a Message</h2>
                    <p className="text-gray-400 mt-6 font-body text-lg">
                        Got a project in mind? Let's build something legendary together.
                    </p>
                    <div className="glow-line w-20 mx-auto mt-4" />
                </motion.div>

                {/* Contact form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="garage-card space-y-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-heading text-gray-400 mb-2 uppercase tracking-wider">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="garage-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-heading text-gray-400 mb-2 uppercase tracking-wider">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                className="garage-input"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-heading text-gray-400 mb-2 uppercase tracking-wider">
                            Message
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell me about your project or just say hi..."
                            rows={5}
                            className="garage-input resize-none"
                            required
                        />
                    </div>

                    <div className="flex justify-center pt-4">
                        <button type="submit" className="garage-btn">
                            🏍️ Send It
                        </button>
                    </div>
                </motion.form>

                {/* Contact info */}
                <motion.div
                    className="grid grid-cols-3 gap-6 mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {[
                        { icon: '📧', label: 'Email', value: 'rudransh@email.com' },
                        { icon: '📍', label: 'Location', value: 'India' },
                        { icon: '💼', label: 'Status', value: 'Available' },
                    ].map((item) => (
                        <div key={item.label} className="text-center">
                            <span className="text-2xl block mb-2">{item.icon}</span>
                            <p className="text-xs font-heading text-gray-500 uppercase tracking-wider">{item.label}</p>
                            <p className="text-sm text-white font-body">{item.value}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ContactPage;
