import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { CONTACT_DATA } from '../../data/portfolioData';
import MagicBento from '../reactbits/MagicBento';

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

            // Form card container entry
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

    const bentoItems = [
        {
            className: "md:col-span-2 md:row-span-2",
            content: (
                <div className="h-full flex flex-col justify-center p-2 relative z-10 w-full" onClick={(e) => e.stopPropagation()}>
                    <h3 className="text-2xl font-bold mb-6" style={{ color: theme.primary }}>Drop a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 w-full cursor-auto relative z-20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div ref={(el) => (inputRefs.current[0] = el)}>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none transition-all duration-300 pointer-events-auto"
                                    onFocus={(e) => {
                                        e.target.style.borderColor = theme.primary;
                                        e.target.style.boxShadow = `0 0 20px rgba(${theme.primaryRgb}, 0.2)`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(55,65,81,0.5)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div ref={(el) => (inputRefs.current[1] = el)}>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none transition-all duration-300 pointer-events-auto"
                                    onFocus={(e) => {
                                        e.target.style.borderColor = theme.primary;
                                        e.target.style.boxShadow = `0 0 20px rgba(${theme.primaryRgb}, 0.2)`;
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
                        <div ref={(el) => (inputRefs.current[2] = el)}>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none transition-all duration-300 resize-none pointer-events-auto relative z-20"
                                onFocus={(e) => {
                                    e.target.style.borderColor = theme.primary;
                                    e.target.style.boxShadow = `0 0 20px rgba(${theme.primaryRgb}, 0.2)`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(55,65,81,0.5)';
                                    e.target.style.boxShadow = 'none';
                                }}
                                placeholder="Tell me about your project..."
                                required
                            />
                        </div>
                        <div ref={(el) => (inputRefs.current[3] = el)}>
                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] cursor-pointer relative overflow-hidden group pointer-events-auto relative z-20"
                                style={{
                                    background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                                    boxShadow: `0 0 25px rgba(${theme.primaryRgb}, 0.25)`,
                                    color: theme.key === 'bmw' ? '#000' : '#fff',
                                }}
                            >
                                <span className="relative z-10">
                                    {submitted ? '✓ Message Sent!' : 'Send Message'}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            )
        },
        {
            className: "md:col-span-1 md:row-span-1 flex flex-col justify-center items-center group/email cursor-pointer",
            content: (
                <div className="h-full flex flex-col justify-center items-center text-center p-2 relative z-10 w-full pointer-events-none" onClick={(e) => { e.stopPropagation(); window.location.href = "mailto:hello@rudransh.dev"; }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform group-hover/email:scale-110" style={{ background: `rgba(${theme.primaryRgb}, 0.1)`, color: theme.primary }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <h4 className="text-white font-bold mb-1">Direct Email</h4>
                    <p className="text-gray-400 text-sm">hello@rudransh.dev</p>
                </div>
            )
        },
        {
            className: "md:col-span-1 md:row-span-1 flex flex-col justify-center items-center",
            content: (
                <div className="h-full flex flex-col justify-center items-center text-center p-2 relative z-10 w-full">
                    <h4 className="text-white font-bold mb-4">Connect Here</h4>
                    <div className="flex gap-3 flex-wrap justify-center relative z-20 pointer-events-auto">
                        {CONTACT_DATA.socials.map((social, i) => (
                            <a
                                key={social.name}
                                ref={(el) => (socialRefs.current[i] = el)}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-300 hover:scale-110 relative z-20 group/social pointer-events-auto"
                                onClick={(e) => e.stopPropagation()}
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
            )
        },
        {
            className: "md:col-span-2 md:row-span-1",
            content: (
                <div className="h-full flex flex-col justify-center items-center text-center p-2 relative z-10 w-full pointer-events-none">
                    <h4 className="text-white font-bold mb-2">Based In</h4>
                    <p className="text-gray-400 text-sm mb-4">Pune, India 🇮🇳</p>
                    <div className="w-full h-1 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }} />
                    <p className="mt-4 text-xs text-gray-500">Built with 🏍️ and ❤️ by Rudransh</p>
                </div>
            )
        }
    ];

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="section-container"
            style={{ perspective: '1200px' }}
        >
            <div className="section-inner relative z-10 w-full">
                <div className="text-center mb-8 md:mb-12">
                    {/* Character-by-character animated title */}
                    <h2
                        ref={titleRef}
                        className="section-title mx-auto inline-flex flex-wrap justify-center"
                        style={{ color: theme.primary, transformStyle: 'preserve-3d' }}
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
                    <p className="text-gray-400 mt-4 md:mt-6 max-w-lg mx-auto text-sm md:text-base">
                        Have a project in mind or just want to chat about bikes? Drop me a line.
                    </p>
                </div>

                <div
                    ref={formRef}
                    className="w-full flex justify-center"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <MagicBento
                        bentoData={bentoItems}
                        glowColor={theme.primaryRgb}
                        particleCount={15}
                        enableTilt={true}
                        clickEffect={true}
                        enableMagnetism={false} // Disable magnetism as it interferes with form input
                    />
                </div>
            </div>
        </section>
    );
}
