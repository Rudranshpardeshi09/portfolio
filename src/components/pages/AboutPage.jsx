import { useState } from 'react';
import PageTransitionWrapper from '../ui/PageTransitionWrapper';
import AboutSection from '../sections/AboutSection';
import AboutIntro from '../ui/AboutIntro';
import useThemeStore from '../../store/themeStore';

export default function AboutPage() {
    const [showIntro, setShowIntro] = useState(true);
    const { theme } = useThemeStore();

    return (
        <div className="min-h-screen bg-transparent theme-transition overflow-hidden">
            {showIntro && <AboutIntro onComplete={() => setShowIntro(false)} />}

            <PageTransitionWrapper title="About">
                <main className={`transition-all duration-1000 ${showIntro ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
                    <AboutSection />
                </main>
            </PageTransitionWrapper>

            {/* Force white text globally for this page as requested */}
            <style jsx="true" global="true">{`
                #about, #about p, #about h2, #about h3, #about div {
                    color: white !important;
                }
                #about .text-gray-400, #about .text-gray-500 {
                    color: rgba(255, 255, 255, 0.8) !important;
                }
                #about .section-title::after {
                    background: white !important;
                }
            `}</style>
        </div>
    );
}
