import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { CONTACT_DATA } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

function AnimatedIcon({ type }) {
    if (type === 'github') {
        return (
            <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.41-4.04-1.41a3.2 3.2 0 0 0-1.34-1.77c-1.09-.74.08-.73.08-.73a2.53 2.53 0 0 1 1.84 1.24a2.58 2.58 0 0 0 3.52 1a2.57 2.57 0 0 1 .77-1.61c-2.67-.31-5.48-1.33-5.48-5.93a4.63 4.63 0 0 1 1.23-3.22a4.3 4.3 0 0 1 .12-3.18s1-.32 3.3 1.23a11.35 11.35 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23a4.3 4.3 0 0 1 .12 3.18a4.62 4.62 0 0 1 1.22 3.22c0 4.61-2.81 5.61-5.49 5.92a2.88 2.88 0 0 1 .82 2.24v3.31c0 .32.22.7.82.58A12 12 0 0 0 12 .5Z" />
            </svg>
        );
    }

    if (type === 'linkedin') {
        return (
            <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04c-1.85 0-2.13 1.45-2.13 2.95v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85c3.62 0 4.29 2.39 4.29 5.49v6.25ZM5.34 7.44a2.07 2.07 0 1 1 0-4.14a2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.97 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0Z" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 7l8-5H4l8 5Z" />
        </svg>
    );
}

export default function ContactSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const iconRefs = useRef([]);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 30, filter: 'blur(8px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 78%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            gsap.fromTo(leftRef.current, { opacity: 0, x: -40 }, {
                opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: { trigger: leftRef.current, start: 'top 84%', toggleActions: 'play none none reverse' }
            });

            gsap.fromTo(rightRef.current, { opacity: 0, x: 40 }, {
                opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: { trigger: rightRef.current, start: 'top 84%', toggleActions: 'play none none reverse' }
            });

            iconRefs.current.forEach((icon, i) => {
                if (!icon) return;
                gsap.to(icon, {
                    y: '+=8',
                    duration: 1.6 + i * 0.15,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut'
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2500);
        setFormData({ name: '', email: '', message: '' });
    };

    const socialWithIcons = CONTACT_DATA.socials.map((social) => ({
        ...social,
        type: social.name.toLowerCase() === 'github' ? 'github' : 'linkedin'
    }));

    return (
        <section id="contact" ref={sectionRef} className="section-container relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                background: `radial-gradient(circle at 15% 20%, rgba(${theme.primaryRgb},0.28), transparent 40%),
                radial-gradient(circle at 85% 80%, rgba(${theme.primaryRgb},0.22), transparent 44%)`
            }} />

            <div className="section-inner relative z-10">
                <div ref={titleRef} className="text-center mb-8 md:mb-12">
                    <h2 className="section-title text-gradient mx-auto">Get In Touch</h2>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-sm md:text-base">
                        Open to AI/ML engineering roles, collaborations, and product-focused consulting.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-8 w-full">
                    <aside ref={leftRef} className="glass rounded-[28px] p-5 md:p-6 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-30 blur-3xl" style={{ background: theme.primary }} />
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                            Contact Channels
                        </h3>
                        <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
                            Use the channels below or send a direct message with your project scope.
                        </p>

                        <div className="space-y-3">
                            {socialWithIcons.map((social, i) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-all duration-300 hover:bg-white/[0.08]"
                                >
                                    <span
                                        ref={(el) => (iconRefs.current[i] = el)}
                                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                                        style={{
                                            background: `rgba(${theme.primaryRgb},0.22)`,
                                            color: '#fff',
                                            boxShadow: `0 0 14px rgba(${theme.primaryRgb},0.35)`
                                        }}
                                    >
                                        <AnimatedIcon type={social.type} />
                                    </span>
                                    <div className="text-left">
                                        <p className="text-xs uppercase tracking-wider text-white/60">{social.name}</p>
                                        <p className="text-white text-sm">{social.url.replace('https://', '')}</p>
                                    </div>
                                </a>
                            ))}

                            <a
                                href={`mailto:${CONTACT_DATA.email}`}
                                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-all duration-300 hover:bg-white/[0.08]"
                            >
                                <span
                                    ref={(el) => (iconRefs.current[socialWithIcons.length] = el)}
                                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                                    style={{ background: `rgba(${theme.primaryRgb},0.22)`, color: '#fff' }}
                                >
                                    <AnimatedIcon type="mail" />
                                </span>
                                <div className="text-left">
                                    <p className="text-xs uppercase tracking-wider text-white/60">Email</p>
                                    <p className="text-white text-sm">{CONTACT_DATA.email}</p>
                                </div>
                            </a>
                        </div>
                    </aside>

                    <div ref={rightRef} className="glass rounded-[28px] p-5 md:p-6">
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-5">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Your Name"
                                    required
                                    className="rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white focus:outline-none"
                                />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="your@email.com"
                                    required
                                    className="rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white focus:outline-none"
                                />
                            </div>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={6}
                                placeholder="Tell me about your project..."
                                required
                                className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white focus:outline-none resize-none"
                            />
                            <button
                                type="submit"
                                className="w-full py-3.5 rounded-xl font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-[1.02]"
                                style={{
                                    background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                                    color: '#fff',
                                    boxShadow: `0 0 26px rgba(${theme.primaryRgb},0.3)`
                                }}
                            >
                                {submitted ? 'Message Sent' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
