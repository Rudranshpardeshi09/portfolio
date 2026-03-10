import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Send, User, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
import useThemeStore from '../../store/themeStore';
import { CONTACT_DATA } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const formRef = useRef(null);
    const cardsRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Cards Animation
            const cards = cardsRef.current.children;
            gsap.fromTo(
                cards,
                { opacity: 0, y: 20, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'back.out(1.4)',
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Form Animation
            gsap.fromTo(
                formRef.current,
                { opacity: 0, x: 20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
    };

    const socials = CONTACT_DATA.socials.map((social) => ({
        ...social,
        icon: social.name.toLowerCase() === 'github' ? <Github size={24} /> : <Linkedin size={24} />
    }));

    return (
        <section id="contact" ref={sectionRef} className="section-container relative min-h-screen flex items-center py-24 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20"
                    style={{ background: theme.primary }}
                />
                <div
                    className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-10"
                    style={{ background: theme.primary }}
                />
            </div>

            <div className="section-inner relative z-10 w-full">
                <div ref={titleRef} className="max-w-3xl mb-16 px-4 md:px-0">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">
                        Let's build <span className="text-gradient"> something </span> <br />
                        extraordinary together.
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
                        Currently available for freelance projects and full-time opportunities. Send me a message and let's chat.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 px-4 md:px-0">
                    {/* Left Side: Contact Cards */}
                    <div ref={cardsRef} className="lg:col-span-5 space-y-6">
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block p-8 rounded-[32px] border border-white/5 bg-white/[0.03] backdrop-blur-xl hover:border-white/20 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <ExternalLink size={20} className="text-white/40" />
                                </div>

                                <div className="flex items-center gap-6">
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                                        style={{ background: `rgba(${theme.primaryRgb}, 0.1)`, color: theme.primary }}
                                    >
                                        {social.icon}
                                    </div>
                                    <div>
                                        <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{social.name}</div>
                                        <div className="text-white text-xl font-bold">{social.url.replace('https://', '')}</div>
                                    </div>
                                </div>
                            </a>
                        ))}

                        <a
                            href={`mailto:${CONTACT_DATA.email}`}
                            className="group relative block p-8 rounded-[32px] border border-white/5 bg-white/[0.03] backdrop-blur-xl hover:border-white/20 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8">
                                <ArrowRight size={20} className="text-white/40 group-hover:translate-x-1 group-hover:text-white transition-all" />
                            </div>

                            <div className="flex items-center gap-6">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                                    style={{ background: `rgba(${theme.primaryRgb}, 0.1)`, color: theme.primary }}
                                >
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Email</div>
                                    <div className="text-white text-xl font-bold">{CONTACT_DATA.email}</div>
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div ref={formRef} className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Doe"
                                            required
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-14 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="john@example.com"
                                            required
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-14 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Your Message</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-5 text-white/20 group-focus-within:text-white transition-colors">
                                        <MessageSquare size={18} />
                                    </div>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={6}
                                        placeholder="I'd love to chat about a project..."
                                        required
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-14 py-5 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-full inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl py-5 font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50"
                                style={{
                                    background: theme.primary,
                                    color: '#000',
                                }}
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative z-10 flex items-center gap-3">
                                    {isSubmitting ? 'Sending...' : (submitted ? 'Message Sent' : 'Send Message')}
                                    {!submitted && !isSubmitting && <Send size={18} />}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
