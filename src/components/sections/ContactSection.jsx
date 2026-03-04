import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { CONTACT_DATA } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const formRef = useRef(null);
    const inputRefs = useRef([]);
    const socialRefs = useRef([]);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title — split character stagger animation
            if (titleRef.current) {
                const chars = titleRef.current.querySelectorAll('.char');
                gsap.fromTo(chars,
                    { opacity: 0, rotateX: -90, y: 30 },
                    {
                        opacity: 1, rotateX: 0, y: 0,
                        duration: 0.6,
                        stagger: 0.04,
                        ease: 'back.out(1.5)',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 70%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            // Form card — spring bounce entry
            if (formRef.current) {
                gsap.fromTo(formRef.current,
                    { opacity: 0, y: 100, scale: 0.9, rotateX: 15 },
                    {
                        opacity: 1, y: 0, scale: 1, rotateX: 0,
                        duration: 1.2, ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: formRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            // Input fields slide in one by one from alternating sides
            inputRefs.current.forEach((input, i) => {
                if (!input) return;
                gsap.fromTo(input,
                    { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
                    {
                        opacity: 1, x: 0,
                        duration: 0.7, ease: 'power3.out',
                        delay: 0.3 + i * 0.1,
                        scrollTrigger: {
                            trigger: formRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

            // Social icons — orbit then settle
            socialRefs.current.forEach((icon, i) => {
                if (!icon) return;
                const angle = (i / socialRefs.current.length) * Math.PI * 2;
                const radius = 60;

                gsap.fromTo(icon,
                    {
                        opacity: 0,
                        x: Math.cos(angle) * radius,
                        y: Math.sin(angle) * radius,
                        scale: 0,
                        rotation: 360,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotation: 0,
                        duration: 0.8,
                        ease: 'back.out(1.5)',
                        delay: 0.8 + i * 0.1,
                        scrollTrigger: {
                            trigger: formRef.current,
                            start: 'top 70%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    // Split text into individual characters for animation
    const titleText = "Get In Touch";
    const titleChars = titleText.split('');

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="section-container"
            style={{ perspective: '1200px' }}
        >
            <div className="section-inner">
                <div className="text-center mb-12">
                    {/* Character-by-character animated title */}
                    <h2
                        ref={titleRef}
                        className="section-title text-gradient mx-auto inline-flex flex-wrap justify-center"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {titleChars.map((char, i) => (
                            <span
                                key={i}
                                className="char inline-block"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    marginRight: char === ' ' ? '0.3em' : '0',
                                }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </h2>
                    <p className="text-gray-400 mt-6 max-w-lg mx-auto">
                        Have a project in mind or just want to chat about bikes? Drop me a line.
                    </p>
                </div>

                <div
                    ref={formRef}
                    className="max-w-2xl mx-auto glass rounded-3xl p-8 sm:p-10"
                    style={{
                        borderColor: `rgba(${theme.primaryRgb}, 0.1)`,
                        transformStyle: 'preserve-3d',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                    }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div ref={(el) => (inputRefs.current[0] = el)}>
                                <label className="block text-sm text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none transition-all duration-300"
                                    onFocus={(e) => {
                                        e.target.style.borderColor = theme.primary;
                                        e.target.style.boxShadow = `0 0 20px rgba(${theme.primaryRgb}, 0.2)`;
                                        gsap.to(e.target, { scale: 1.02, duration: 0.2 });
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(55,65,81,0.5)';
                                        e.target.style.boxShadow = 'none';
                                        gsap.to(e.target, { scale: 1, duration: 0.2 });
                                    }}
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div ref={(el) => (inputRefs.current[1] = el)}>
                                <label className="block text-sm text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none transition-all duration-300"
                                    onFocus={(e) => {
                                        e.target.style.borderColor = theme.primary;
                                        e.target.style.boxShadow = `0 0 20px rgba(${theme.primaryRgb}, 0.2)`;
                                        gsap.to(e.target, { scale: 1.02, duration: 0.2 });
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(55,65,81,0.5)';
                                        e.target.style.boxShadow = 'none';
                                        gsap.to(e.target, { scale: 1, duration: 0.2 });
                                    }}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>
                        <div ref={(el) => (inputRefs.current[2] = el)}>
                            <label className="block text-sm text-gray-400 mb-2">Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={5}
                                className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none transition-all duration-300 resize-none"
                                onFocus={(e) => {
                                    e.target.style.borderColor = theme.primary;
                                    e.target.style.boxShadow = `0 0 20px rgba(${theme.primaryRgb}, 0.2)`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(55,65,81,0.5)';
                                    e.target.style.boxShadow = 'none';
                                }}
                                placeholder="Tell me about your project or your favorite bike..."
                                required
                            />
                        </div>
                        <div ref={(el) => (inputRefs.current[3] = el)}>
                            <button
                                type="submit"
                                className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] cursor-pointer relative overflow-hidden group"
                                style={{
                                    background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                                    boxShadow: `0 0 25px rgba(${theme.primaryRgb}, 0.25)`,
                                    color: theme.key === 'bmw' ? '#000' : '#fff',
                                }}
                            >
                                {/* Neon pulse overlay */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 70%)`,
                                    }}
                                />
                                <span className="relative z-10">
                                    {submitted ? '✓ Message Sent!' : 'Send Message'}
                                </span>
                            </button>
                        </div>
                    </form>

                    {/* Social Links */}
                    <div className="mt-8 pt-6 border-t border-gray-800/50">
                        <div className="flex justify-center gap-4">
                            {CONTACT_DATA.socials.map((social, i) => (
                                <a
                                    key={social.name}
                                    ref={(el) => (socialRefs.current[i] = el)}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 group/social"
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = `rgba(${theme.primaryRgb}, 0.1)`;
                                        e.currentTarget.style.borderColor = `rgba(${theme.primaryRgb}, 0.3)`;
                                        e.currentTarget.style.boxShadow = `0 0 25px rgba(${theme.primaryRgb}, 0.2)`;
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
