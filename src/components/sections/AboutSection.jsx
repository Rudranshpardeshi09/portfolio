import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useThemeStore from '../../store/themeStore';
import { ABOUT_DATA } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const { theme } = useThemeStore();
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                imageRef.current,
                { opacity: 0, x: -80, scale: 0.9 },
                {
                    opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', end: 'top 25%', toggleActions: 'play none none reverse' },
                }
            );
            gsap.fromTo(
                textRef.current,
                { opacity: 0, x: 80 },
                {
                    opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', end: 'top 25%', toggleActions: 'play none none reverse' },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="section-container">
            <div className="section-inner">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-0 py-16 min-h-screen px-4 md:px-0">
                    {/* Image Left - 50% split */}
                    <div ref={imageRef} className="lg:w-1/2 flex justify-center items-center">
                        <div className="relative group">
                            {/* Tire frame around image - slightly more subtle but large */}
                            <div
                                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[480px] lg:h-[480px] rounded-full p-4 mx-auto flex items-center justify-center transition-all duration-700"
                                style={{
                                    background: `conic-gradient(from 180deg, rgba(255,255,255,0.2), #1a1a1a, rgba(255,255,255,0.2), #1a1a1a, rgba(255,255,255,0.2))`,
                                    boxShadow: `0 30px 60px rgba(0,0,0,0.5)`,
                                }}
                            >
                                <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden border-[12px] border-gray-800 animate-float relative shadow-inner">
                                    <img
                                        src="/my-pfp/pfp.jpg"
                                        alt="Rudransh"
                                        className="w-full h-full object-cover object-[center_10%] opacity-100 transition-all duration-1000"
                                    />
                                    {/* Matte finish overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                                </div>
                            </div>
                            {/* Decorative ring - more refined */}
                            <div
                                className="absolute -inset-8 rounded-full border border-white/20 opacity-50 animate-[spin_40s_linear_infinite]"
                                style={{ borderStyle: 'double', borderWidth: '4px' }}
                            />
                        </div>
                    </div>

                    {/* Text Right - Expanded width with Matte Glass Card */}
                    <div ref={textRef} className="lg:w-[55%] flex flex-col justify-center px-8 lg:px-8">
                        <div className="w-full mt-4 mb-4 lg:mt-4 lg:mb-4 glass-strong p-10 lg:p-14 rounded-[40px] border-white/10 relative overflow-hidden group/card shadow-2xl transition-all duration-500 hover:shadow-white/5"
                            style={{
                                background: 'rgba(20, 20, 20, 0.75)',
                                backdropFilter: 'blur(30px) saturate(150%)',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}>
                            {/* Creative Heading - Animation Removed */}
                            <div className="relative mb-10 inline-block">
                                <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter"
                                    style={{
                                        WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                                        color: 'transparent',
                                    }}>
                                    About Me
                                </h2>
                                <h2 className="absolute top-0 left-0 text-5xl lg:text-7xl font-black uppercase tracking-tighter"
                                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', color: 'var(--color-primary)' }}>
                                    About Me
                                </h2>
                                <div className="h-1 w-20 mt-2" style={{ background: 'var(--color-primary)' }}></div>
                            </div>

                            <h3 className="text-3xl sm:text-4xl font-black mb-8 text-white leading-tight font-display tracking-tight"
                                style={{ fontFamily: 'var(--font-display)' }}>
                                {ABOUT_DATA.title}
                            </h3>

                            <div className="space-y-6">
                                <p className="text-white/90 text-xl leading-relaxed font-medium tracking-tight">
                                    {ABOUT_DATA.bio}
                                </p>
                                <p className="text-white/70 text-lg leading-relaxed font-light italic">
                                    {ABOUT_DATA.bio2}
                                </p>
                            </div>

                            {/* Stats - updated grid layout */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                                {ABOUT_DATA.stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="p-4 text-center border-l border-white/10 hover:border-white transition-all duration-300"
                                    >
                                        <div
                                            className="text-3xl font-black mb-1 text-white"
                                            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.05em' }}
                                        >
                                            {stat.value}
                                        </div>
                                        <div className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em]">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
