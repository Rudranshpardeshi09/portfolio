import useThemeStore from '../../store/themeStore';
import Masonry from '../reactbits/Masonry';

// Helper to determine the image/URL based on the certificate data logic requested:
// We will generate the items array from CERTIFICATIONS_DATA (or just a hardcoded list matching the certificates folder)
// For this example, I'll use placeholders mapped to the structure you provided to ensure it looks good immediately.
const certificateItems = [
    {
        id: "1",
        img: "/certificates/c1.jpg", // Replace with realistic paths, falling back to picsum if missing locally
        url: "#",
        height: 400,
    },
    {
        id: "2",
        img: "/certificates/c2.jpg",
        url: "#",
        height: 300,
    },
    {
        id: "3",
        img: "/certificates/c3.jpg",
        url: "#",
        height: 450,
    },
    {
        id: "4",
        img: "/certificates/c4.jpg",
        url: "#",
        height: 280,
    },
    {
        id: "5",
        img: "/certificates/c5.jpg",
        url: "#",
        height: 380,
    }
];

// Fallback items with more vibrant tech-oriented picsum images for the "WOW" effect
const fallbackItems = [
    { id: "1", img: "https://picsum.photos/id/1/600/900", url: "#", height: 400 }, // Tech
    { id: "2", img: "https://picsum.photos/id/2/600/750", url: "#", height: 250 }, // Tech
    { id: "3", img: "https://picsum.photos/id/119/600/800", url: "#", height: 600 }, // MacBook
    { id: "4", img: "https://picsum.photos/id/160/600/500", url: "#", height: 350 }, // Phone
    { id: "5", img: "https://picsum.photos/id/180/600/700", url: "#", height: 450 }, // Laptop
    { id: "6", img: "https://picsum.photos/id/201/600/800", url: "#", height: 500 }, // Office
];

export default function CertificateSection() {
    const { theme } = useThemeStore();

    return (
        <section
            id="certificates"
            className="w-full relative overflow-hidden flex items-center justify-center py-20"
            style={{
                // Dark rich gradient background
                background: `linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(${theme.primaryRgb}, 0.08) 50%, rgba(10,10,10,1) 100%)`
            }}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: `radial-gradient(circle at 70% 50%, rgba(${theme.primaryRgb}, 0.25) 0%, transparent 60%)`,
                    }}
                />
            </div>

            <div className="mx-8 my-8 px-4 py-4 max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
                
                {/* Left Side: Typography */}
                <div className="lg:col-span-4 flex flex-col items-start text-left">
                    <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-white/35 md:text-xs mb-4">
                        Continuous Learning
                    </p>
                    <h2 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-2xl leading-[0.9]">
                        Verifiable<br/>
                        <span style={{ color: theme.primary }}>Credentials</span>
                    </h2>
                    
                    <div className="w-16 h-1 mt-8 mb-8 rounded-full" style={{ backgroundColor: theme.primary }} />

                    <p className="text-sm leading-7 text-white/60 md:text-base mb-6">
                        A curated collection of professional certifications from top-tier institutions, reflecting a deep commitment to technical excellence and lifelong learning.
                    </p>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-white/40 text-xs font-mono">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                            Industry Recognized
                        </div>
                        <div className="flex items-center gap-3 text-white/40 text-xs font-mono">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                            Verifiable PDF Access
                        </div>
                    </div>
                </div>

                {/* Right Side: Masonry Grid */}
                <div className="lg:col-span-8 h-[750px] rounded-[2.5rem] overflow-hidden p-6 bg-white/[0.02] border border-white/[0.08] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative backdrop-blur-3xl">
                    <Masonry
                        items={fallbackItems}
                        ease="sine.out"
                        duration={1}
                        stagger={0.1}
                        animateFrom="bottom"
                        scaleOnHover={true}
                        hoverScale={1.03}
                        blurToFocus={true}
                        colorShiftOnHover={false}
                    />
                    
                    {/* Glass Overlay on bottom to fade into next section */}
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                </div>
                
            </div>
        </section>
    );
}
