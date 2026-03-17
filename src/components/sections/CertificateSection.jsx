import { motion } from 'framer-motion';
import useThemeStore from '../../store/themeStore';

const CERTIFICATES = [
    {
        id: "1",
        title: "NVIDIA Deep Learning",
        company: "NVIDIA",
        img: "/certificates/My Learning _ NVIDIA_page-0001.jpg",
        color: "#76B900" 
    },
    {
        id: "2",
        title: "Red Hat System Admin",
        company: "Red Hat",
        img: "/certificates/Red Hat System Administration I (RH124 - RHA) - Ver. 9.3_page-0001.jpg",
        color: "#EE0000"
    },
    {
        id: "3",
        title: "Microsoft Azure Fundamentals",
        company: "Microsoft",
        img: "/certificates/certificate 2 microsoft_page-0001.jpg",
        color: "#00A4EF"
    },
    {
        id: "4",
        title: "Google Cybersecurity",
        company: "Google",
        img: "/certificates/google cert.png",
        color: "#4285F4"
    },
    {
        id: "5",
        title: "Django Development",
        company: "GFG",
        img: "/certificates/django gfg_page-0001.jpg",
        color: "#2F8D46"
    },
    {
        id: "6",
        title: "Software Engineering Intern",
        company: "Internship",
        img: "/certificates/internship certificate_page-0001.jpg",
        color: "#FFB800"
    }
];

function Creative3DGallery() {
    const { theme } = useThemeStore();

    return (
        <div className="relative w-full h-full flex items-center justify-center [perspective:1500px]">
            {CERTIFICATES.map((cert, index) => {
                const rotation = (index - (CERTIFICATES.length - 1) / 2) * 12; // Fan spread
                const xOffset = (index - (CERTIFICATES.length - 1) / 2) * 45; // Staggered x
                
                return (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 100, rotate: 0 }}
                        whileInView={{ 
                            opacity: 1, 
                            y: 0, 
                            rotate: rotation,
                            x: xOffset,
                            z: -index * 20
                        }}
                        viewport={{ once: true }}
                        whileHover={{ 
                            scale: 1.15, 
                            rotate: 0, 
                            z: 100,
                            x: xOffset, // keep its x position but pop forward
                            transition: { duration: 0.4, ease: "circOut" }
                        }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 100, 
                            damping: 20,
                            delay: index * 0.1 
                        }}
                        className="absolute w-[240px] md:w-[320px] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer group bg-[#111]"
                        style={{
                            originY: "100%", // Rotate from bottom
                        }}
                    >
                        {/* Certificate Image */}
                        <img 
                            src={cert.img} 
                            alt={cert.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Company Tag */}
                        <div 
                            className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg backdrop-blur-md"
                            style={{ backgroundColor: `${cert.color}99`, border: `1px solid ${cert.color}` }}
                        >
                            {cert.company}
                        </div>

                        {/* Title Info on Hover */}
                        <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <h3 className="text-white font-black text-lg leading-tight uppercase tracking-tight">
                                {cert.title}
                            </h3>
                            <div className="w-8 h-1 mt-2 rounded-full" style={{ backgroundColor: cert.color }} />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

export default function CertificateSection() {
    const { theme } = useThemeStore();

    return (
        <section
            id="certificates"
            className="w-full relative overflow-hidden flex items-center justify-center py-32"
            style={{
                background: `linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(${theme.primaryRgb}, 0.05) 50%, rgba(10,10,10,1) 100%)`
            }}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(${theme.primaryRgb}, 0.2) 0%, transparent 70%)`,
                    }}
                />
            </div>

            <div className="mx-auto w-full px-6 max-w-[1400px] flex flex-col items-center relative z-10">
                
                {/* Header Section */}
                <div className="w-full max-w-4xl text-center mb-24">
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/30 md:text-xs mb-6"
                    >
                        Verified Credentials & Lifelong Learning
                    </motion.p>
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl font-black uppercase tracking-tighter text-white sm:text-7xl md:text-8xl drop-shadow-2xl leading-[0.85]"
                    >
                        Professional<br/>
                        <span style={{ color: theme.primary }}>Certifications</span>
                    </motion.h2>
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="w-32 h-1.5 mx-auto mt-10 rounded-full" 
                        style={{ backgroundColor: theme.primary }} 
                    />
                </div>

                {/* 3D Gallery Container */}
                <div className="w-full h-[500px] md:h-[650px] relative mt-10">
                    <Creative3DGallery />
                </div>
                
                {/* Subtle Footer Note */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="mt-20 text-[10px] font-mono tracking-widest text-white/20 uppercase"
                >
                    Hover to inspect original issuance documents
                </motion.p>
            </div>
        </section>
    );
}
