import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import useThemeStore from '../../store/themeStore';

const CERTIFICATES = [
    {
        id: '1',
        title: 'NVIDIA Deep Learning',
        company: 'NVIDIA',
        img: '/certificates/My Learning _ NVIDIA_page-0001.jpg',
        color: '#76B900',
        category: 'AI and Deep Learning',
        year: '2025',
    },
    {
        id: '2',
        title: 'Red Hat System Admin',
        company: 'Red Hat',
        img: '/certificates/Red Hat System Administration I (RH124 - RHA) - Ver. 9.3_page-0001.jpg',
        color: '#EE0000',
        category: 'Linux and Infrastructure',
        year: '2025',
    },
    {
        id: '3',
        title: 'Microsoft Azure Fundamentals',
        company: 'Microsoft',
        img: '/certificates/certificate 2 microsoft_page-0001.jpg',
        color: '#00A4EF',
        category: 'Cloud Foundations',
        year: '2025',
    },
    {
        id: '4',
        title: 'Google Cybersecurity',
        company: 'Google',
        img: '/certificates/google cert.png',
        color: '#4285F4',
        category: 'Security and Operations',
        year: '2025',
    },
    {
        id: '5',
        title: 'Django Development',
        company: 'GFG',
        img: '/certificates/django gfg_page-0001.jpg',
        color: '#2F8D46',
        category: 'Backend Development',
        year: '2024',
    },
];

function CertificateCard({ cert, theme, onOpen }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.35 }}
            className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl"
        >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-30" />

            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={cert.img}
                    alt={cert.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040404] via-black/10 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col gap-5 p-6">
                <div className="space-y-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/35">
                        {cert.category}
                    </p>
                    <h3 className="text-lg font-semibold leading-tight text-white">
                        {cert.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/55">
                        Verified learning credential issued by {cert.company}.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => onOpen(cert)}
                    className="mt-auto inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
                    style={{
                        background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}cc)`,
                        color: '#050505',
                        boxShadow: `0 18px 40px rgba(${theme.primaryRgb}, 0.24)`,
                    }}
                >
                    Open Full Certificate
                </button>
            </div>
        </motion.article>
    );
}

function CertificateModal({ cert, onClose }) {
    const details = useMemo(
        () => [
            { label: 'Issuer', value: cert.company },
            { label: 'Area', value: cert.category },
            { label: 'Year', value: cert.year },
            { label: 'Status', value: 'Verified' },
        ],
        [cert],
    );

    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] overflow-y-auto bg-[rgba(4,4,6,0.88)] p-4 backdrop-blur-2xl sm:p-6"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-label={`${cert.title} certificate preview`}
        >
            <div className="flex min-h-full items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="relative grid w-full max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[#09090c] shadow-[0_40px_120px_rgba(0,0,0,0.55)] lg:grid-cols-[340px_minmax(0,1fr)]"
                    onClick={(event) => event.stopPropagation()}
                >
                    <aside className="relative flex flex-col justify-between border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                        <div className="space-y-6">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/35">
                                    Certificate Preview
                                </p>
                                <h3 className="mt-3 pr-12 text-2xl font-semibold leading-tight text-white">
                                    {cert.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/55">
                                    Clean full-size preview with responsive containment, so the document stays readable without overlapping surrounding UI.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                                {details.map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
                                    >
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
                                            {item.label}
                                        </p>
                                        <p className="mt-2 text-sm font-medium text-white/88">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="mt-8 rounded-[24px] border p-5"
                            style={{
                                borderColor: `${cert.color}40`,
                                background: `linear-gradient(180deg, ${cert.color}18, rgba(255,255,255,0.02))`,
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="h-3 w-3 rounded-full"
                                    style={{ backgroundColor: cert.color }}
                                />
                                <p className="text-sm font-semibold text-white">
                                    Verified credential archive
                                </p>
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-white/60">
                                The preview is contained inside the modal and can scroll independently on smaller screens, which prevents clipping and text collisions.
                            </p>
                        </div>
                    </aside>

                    <div className="relative bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)] p-3 sm:p-5 lg:p-6">
                        <div className="mb-4 flex items-center justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white hover:text-black"
                                aria-label={`Close ${cert.title} certificate preview`}
                            >
                                Close
                            </button>
                        </div>
                        <div className="flex max-h-[calc(100vh-3rem)] min-h-[420px] items-center justify-center overflow-auto rounded-[28px] border border-white/8 bg-[#050505] p-3 shadow-inner sm:min-h-[520px] sm:p-5">
                            <img
                                src={cert.img}
                                alt={cert.title}
                                className="block h-auto max-h-full w-auto max-w-full rounded-2xl bg-white object-contain shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function CertificateSection() {
    const { theme } = useThemeStore();
    const [activeCert, setActiveCert] = useState(null);

    return (
        <section
            id="certificates"
            className="relative flex w-full items-center justify-center overflow-hidden py-24 md:py-28"
            style={{
                background: `linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(${theme.primaryRgb}, 0.05) 50%, rgba(10,10,10,1) 100%)`,
            }}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(${theme.primaryRgb}, 0.2) 0%, transparent 70%)`,
                    }}
                />
                <div
                    className="absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full blur-[120px]"
                    style={{ background: `rgba(${theme.primaryRgb}, 0.12)` }}
                />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 md:px-8">
                <div className="mx-auto mb-16 flex w-full max-w-5xl flex-col items-center text-center md:mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-white/30"
                    >
                        Verified Credentials and Lifelong Learning
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl"
                    >
                        Professional
                        <br />
                        <span style={{ color: theme.primary }}>Certifications</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base"
                    >
                        A curated record of cloud, systems, cybersecurity, and software engineering credentials presented in a structured gallery with full-resolution previews.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mx-auto mt-8 h-[2px] w-24 rounded-full"
                        style={{ backgroundColor: theme.primary }}
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {CERTIFICATES.map((cert) => (
                        <CertificateCard
                            key={cert.id}
                            cert={cert}
                            theme={theme}
                            onOpen={setActiveCert}
                        />
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/20"
                >
                    Open any credential to inspect the original certificate without leaving this section
                </motion.p>
            </div>

            <AnimatePresence>
                {activeCert && (
                    <CertificateModal
                        cert={activeCert}
                        onClose={() => setActiveCert(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
