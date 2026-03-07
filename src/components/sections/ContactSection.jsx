import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { CONTACT_DATA } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const FLOATING_ICONS = ['✉', '⚡', '⌁', '✦', '◆'];

export default function ContactSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const leftRef = useRef(null);
    const formRef = useRef(null);
    const iconRefs = useRef([]);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 45, filter: 'blur(10px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            gsap.fromTo(
                leftRef.current,
                { opacity: 0, x: -60, rotateY: -14 },
                {
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: leftRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            gsap.fromTo(
                formRef.current,
                { opacity: 0, x: 60, rotateY: 14 },
                {
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            iconRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.to(el, {
                    y: '+=12',
                    x: i % 2 === 0 ? '+=5' : '-=5',
                    duration: 1.8 + i * 0.2,
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

    return (
        <section id="contact" ref={sectionRef} className="section-container relative overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none opacity-15"
                style={{
                    background: `radial-gradient(circle at 20% 20%, rgba(${theme.primaryRgb}, 0.25), transparent 45%),
                    radial-gradient(circle at 80% 70%, rgba(${theme.primaryRgb}, 0.2), transparent 50%)`
                }}
            />

            <div className="section-inner relative z-10">
                <div ref={titleRef} className="text-center mb-8 md:mb-12">
                    <h2 className="section-title text-gradient mx-auto">Get In Touch</h2>
                    <p className="text-gray-300/90 mt-4 max-w-2xl mx-auto text-sm md:text-base">
                        Let&apos;s build something that feels fast, refined, and memorable.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 w-full">
                    <div ref={leftRef} className="glass rounded-[28px] p-5 md:p-7 relative overflow-hidden min-h-[420px]">
                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-3xl" style={{ background: theme.primary }} />
                        <h3 className="text-white text-2xl md:text-3xl font-black mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                            Let&apos;s Collaborate
                        </h3>
                        <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
                            Reach out for full-stack builds, AI-powered products, and performance-focused interfaces.
                        </p>

                        <div className="space-y-4 mb-6">
                            <a
                                href={`mailto:${CONTACT_DATA.email}`}
                                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-all duration-300 hover:bg-white/[0.08]"
                            >
                                <span className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `rgba(${theme.primaryRgb}, 0.18)` }}>✉</span>
                                <div className="text-left">
                                    <p className="text-xs text-white/60 uppercase tracking-widest">Email</p>
                                    <p className="text-white text-sm md:text-base">{CONTACT_DATA.email}</p>
                                </div>
                            </a>
                            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                                <span className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `rgba(${theme.primaryRgb}, 0.18)` }}>📍</span>
                                <div className="text-left">
                                    <p className="text-xs text-white/60 uppercase tracking-widest">Location</p>
                                    <p className="text-white text-sm md:text-base">Pune, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            {CONTACT_DATA.socials.map((social, i) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl border border-white/15 bg-white/[0.04] flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
                                    style={{ boxShadow: `0 0 20px rgba(${theme.primaryRgb}, 0.15)` }}
                                    ref={(el) => (iconRefs.current[i] = el)}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        {FLOATING_ICONS.map((icon, i) => (
                            <div
                                key={`float-${icon}-${i}`}
                                ref={(el) => (iconRefs.current[i + CONTACT_DATA.socials.length] = el)}
                                className="absolute text-white/30 text-sm md:text-base pointer-events-none"
                                style={{
                                    left: `${12 + i * 16}%`,
                                    top: `${62 + (i % 2) * 10}%`
                                }}
                            >
                                {icon}
                            </div>
                        ))}
                    </div>

                    <div ref={formRef} className="glass rounded-[28px] p-5 md:p-7 relative overflow-hidden">
                        <div className="absolute -bottom-12 -left-8 w-44 h-44 rounded-full opacity-20 blur-3xl" style={{ background: theme.primary }} />
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-5">Drop a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Your Name"
                                    required
                                    className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white focus:outline-none transition-all"
                                    onFocus={(e) => {
                                        e.target.style.borderColor = theme.primary;
                                        e.target.style.boxShadow = `0 0 0 2px rgba(${theme.primaryRgb},0.2)`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white focus:outline-none transition-all"
                                    onFocus={(e) => {
                                        e.target.style.borderColor = theme.primary;
                                        e.target.style.boxShadow = `0 0 0 2px rgba(${theme.primaryRgb},0.2)`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>

                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={6}
                                placeholder="Tell me about your project..."
                                required
                                className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white focus:outline-none transition-all resize-none"
                                onFocus={(e) => {
                                    e.target.style.borderColor = theme.primary;
                                    e.target.style.boxShadow = `0 0 0 2px rgba(${theme.primaryRgb},0.2)`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />

                            <button
                                type="submit"
                                className="w-full py-3.5 rounded-xl font-semibold tracking-wide uppercase transition-all duration-300 hover:scale-[1.02]"
                                style={{
                                    background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                                    boxShadow: `0 0 26px rgba(${theme.primaryRgb}, 0.3)`,
                                    color: '#fff'
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
