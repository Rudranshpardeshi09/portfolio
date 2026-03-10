import { Mail, Github, Linkedin, ArrowUpRight, Shield, Heart } from 'lucide-react';
import DecryptText from '../reactbits/DecryptText';
import useThemeStore from '../../store/themeStore';
import { SECTIONS, CONTACT_DATA } from '../../data/portfolioData';

export default function Footer() {
    const { theme } = useThemeStore();
    const currentYear = new Date().getFullYear();

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="relative z-10 px-4 pb-12 pt-6 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                {/* Main Footer Block */}
                <div className="glass-strong relative overflow-hidden rounded-[40px] border border-white/10 p-8 md:p-12 lg:p-16">
                    {/* Background Glow */}
                    <div
                        className="absolute inset-0 opacity-40 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 50% -20%, rgba(${theme.primaryRgb}, 0.25), transparent 70%)` }}
                    />

                    <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {/* Brand Column */}
                        <div className="lg:col-span-1">
                            <div className="text-2xl font-black uppercase tracking-tighter text-white mb-6">
                                RP<span style={{ color: theme.primary }}>.</span>Portfolio
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
                                Designing and building digital products with a focus on AI, ML, and exceptional user experiences.
                            </p>
                            <div className="flex items-center gap-4">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: theme.primary }} />
                                    <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: theme.primary }} />
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-widest text-white/80">Available for Opportunities</span>
                            </div>
                        </div>

                        {/* Navigation Column */}
                        <div>
                            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Navigation</h4>
                            <ul className="space-y-4">
                                {SECTIONS.map((section) => (
                                    <li key={section.id}>
                                        <button
                                            onClick={() => scrollToSection(section.id)}
                                            className="group flex items-center text-white/50 hover:text-white transition-colors text-sm"
                                        >
                                            <span className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                                                —
                                            </span>
                                            {section.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Column */}
                        <div>
                            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Socials</h4>
                            <ul className="space-y-4">
                                {CONTACT_DATA.socials.map((social) => (
                                    <li key={social.name}>
                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center text-white/50 hover:text-white transition-colors text-sm"
                                        >
                                            {social.name === 'LinkedIn' && <Linkedin size={16} className="mr-3" />}
                                            {social.name === 'GitHub' && <Github size={16} className="mr-3" />}
                                            {social.name}
                                            <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <a
                                        href={`mailto:${CONTACT_DATA.email}`}
                                        className="group flex items-center text-white/50 hover:text-white transition-colors text-sm"
                                    >
                                        <Mail size={16} className="mr-3" />
                                        Email
                                        <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* CTA Column */}
                        <div className="lg:col-span-1">
                            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Let's Connect</h4>
                            <div className="relative p-6 rounded-[24px] border border-white/10 bg-white/5 overflow-hidden group hover:border-white/20 transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative z-10">
                                    <div className="text-lg font-bold text-white mb-2">Have a project?</div>
                                    <p className="text-white/60 text-xs mb-4">I'm always open to discussing new projects and creative ideas.</p>
                                    <button
                                        onClick={() => scrollToSection('contact')}
                                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                                        style={{ color: theme.primary }}
                                    >
                                        Get in touch <ArrowUpRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="relative z-20 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6 order-2 md:order-1">
                            <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">
                                © {currentYear} Rudransh Pardeshi. All rights reserved.
                            </p>
                        </div>

                        <div className="flex items-center gap-6 order-1 md:order-2">
                            <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest font-medium">
                                <Shield size={10} /> Privacy Policy
                            </div>
                            <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest font-medium">
                                Made with <Heart size={10} style={{ fill: theme.primary, color: theme.primary }} /> in India
                            </div>
                        </div>
                    </div>
                </div>

                {/* Big Decrypted Text Footer */}
                <div className="mt-12 text-center opacity-20 hover:opacity-100 transition-opacity duration-700 pointer-events-none select-none">
                    <div className="text-[12vw] font-black uppercase tracking-tighter leading-none text-white whitespace-nowrap overflow-hidden">
                        <DecryptText text="PARDESHI" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
