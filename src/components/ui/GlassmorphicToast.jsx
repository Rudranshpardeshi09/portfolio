import { useState, useEffect, useRef, useCallback } from 'react';
import useThemeStore from '../../store/themeStore';
import { SECTIONS } from '../../data/portfolioData';

export default function GlassmorphicToast() {
    const { theme } = useThemeStore();
    const [toasts, setToasts] = useState([]);
    const visitedSections = useRef(new Set());
    const skippedSections = useRef(new Set());
    const toastIdCounter = useRef(0);

    const addToast = useCallback(
        (sectionLabel) => {
            const id = ++toastIdCounter.current;
            setToasts((prev) => [...prev, { id, label: sectionLabel }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 4000);
        },
        []
    );

    useEffect(() => {
        const sectionEls = SECTIONS.map(({ id }) => ({
            id,
            el: document.getElementById(id),
        })).filter((s) => s.el);

        // Track time spent in each section
        const timeInSection = {};
        let currentSection = null;
        let enterTime = 0;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const sectionId = entry.target.id;
                    const sectionData = SECTIONS.find((s) => s.id === sectionId);

                    if (entry.isIntersecting) {
                        currentSection = sectionId;
                        enterTime = Date.now();
                    } else if (currentSection === sectionId) {
                        // Section exited
                        const timeSpent = Date.now() - enterTime;
                        timeInSection[sectionId] = (timeInSection[sectionId] || 0) + timeSpent;

                        // If user spent at least 2 seconds, consider it "visited"
                        if (timeInSection[sectionId] > 2000) {
                            visitedSections.current.add(sectionId);
                        } else if (
                            !visitedSections.current.has(sectionId) &&
                            !skippedSections.current.has(sectionId)
                        ) {
                            // User scrolled past without spending time
                            skippedSections.current.add(sectionId);
                            if (sectionData) {
                                addToast(sectionData.label);
                            }
                        }
                        currentSection = null;
                    }
                });
            },
            { threshold: 0.3 }
        );

        sectionEls.forEach(({ el }) => observer.observe(el));
        return () => observer.disconnect();
    }, [addToast]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="glass-strong rounded-2xl px-5 py-4 flex items-center gap-4 animate-slide-up"
                    style={{
                        borderColor: `rgba(${theme.primaryRgb}, 0.15)`,
                        boxShadow: `0 10px 40px rgba(0,0,0,0.4), 0 0 20px rgba(${theme.primaryRgb}, 0.1)`,
                    }}
                >
                    {/* Bike Icon */}
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
                        style={{
                            background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                            boxShadow: `0 0 15px rgba(${theme.primaryRgb}, 0.3)`,
                        }}
                    >
                        🏍️
                    </div>

                    {/* Text */}
                    <div>
                        <p className="text-sm text-gray-300 leading-snug">
                            <span className="font-semibold text-white">{toast.label}</span> is left —
                            you should visit it once!
                        </p>
                    </div>

                    {/* Dismiss */}
                    <button
                        onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                        className="text-gray-600 hover:text-gray-400 ml-auto flex-shrink-0 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
}
