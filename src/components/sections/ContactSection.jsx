import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { CONTACT_DATA } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" ref={sectionRef} className="section-container">
            <div className="section-inner">
                <div className="text-center mb-12">
                    <h2 className="section-title text-gradient mx-auto">Get In Touch</h2>
                    <p className="text-gray-400 mt-6 max-w-lg mx-auto">
                        Have a project in mind or just want to chat about bikes? Drop me a line.
                    </p>
                </div>

                <div
                    ref={formRef}
                    className="max-w-2xl mx-auto glass rounded-3xl p-8 sm:p-10"
                    style={{ borderColor: `rgba(${theme.primaryRgb}, 0.1)` }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none transition-all duration-300"
                                    style={{
                                        focusBorderColor: theme.primary,
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = theme.primary;
                                        e.target.style.boxShadow = `0 0 15px rgba(${theme.primaryRgb}, 0.15)`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(55,65,81,0.5)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none transition-all duration-300"
                                    onFocus={(e) => {
                                        e.target.style.borderColor = theme.primary;
                                        e.target.style.boxShadow = `0 0 15px rgba(${theme.primaryRgb}, 0.15)`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(55,65,81,0.5)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={5}
                                className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none transition-all duration-300 resize-none"
                                onFocus={(e) => {
                                    e.target.style.borderColor = theme.primary;
                                    e.target.style.boxShadow = `0 0 15px rgba(${theme.primaryRgb}, 0.15)`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(55,65,81,0.5)';
                                    e.target.style.boxShadow = 'none';
                                }}
                                placeholder="Tell me about your project or your favorite bike..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                            style={{
                                background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                                boxShadow: `0 0 25px rgba(${theme.primaryRgb}, 0.25)`,
                                color: theme.key === 'bmw' ? '#000' : '#fff',
                            }}
                        >
                            {submitted ? '✓ Message Sent!' : 'Send Message'}
                        </button>
                    </form>

                    {/* Social Links */}
                    <div className="mt-8 pt-6 border-t border-gray-800/50">
                        <div className="flex justify-center gap-4">
                            {CONTACT_DATA.socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 hover:scale-110"
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = `rgba(${theme.primaryRgb}, 0.1)`;
                                        e.currentTarget.style.borderColor = `rgba(${theme.primaryRgb}, 0.3)`;
                                        e.currentTarget.style.boxShadow = `0 0 20px rgba(${theme.primaryRgb}, 0.15)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    title={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-16 text-gray-600 text-sm">
                    <p>
                        Built with 🏍️ and ❤️ by{' '}
                        <span style={{ color: theme.primary }}>Rudransh</span>
                    </p>
                    <p className="mt-1 text-xs text-gray-700">© 2026 All rights reserved.</p>
                </div>
            </div>
        </section>
    );
}
