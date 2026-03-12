import { motion } from 'framer-motion';

const MotionDiv = motion.div;

function getAnimationSeed(value) {
    return Array.from(value).reduce((total, char) => total + char.charCodeAt(0), 0);
}

export default function AnimatedLogo({ src, alt, theme }) {
    const seed = getAnimationSeed(alt);
    const floatDuration = 4 + (seed % 3) * 0.6;
    const floatOffset = -8 - (seed % 5);

    return (
        <div className="flex flex-col items-center">
            <MotionDiv
                whileHover={{
                    scale: 1.25,
                    rotate: 8,
                    z: 50,
                    transition: { type: 'spring', stiffness: 300 }
                }}
                animate={{
                    y: [0, floatOffset, 0],
                }}
                transition={{
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
                className="w-16 h-16 md:w-20 md:h-20 p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center relative group overflow-hidden transform-gpu"
                style={{
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    transformStyle: 'preserve-3d'
                }}
            >
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${theme.primary} 0%, transparent 70%)` }}
                />

                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-contain relative z-10 drop-shadow-md"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </MotionDiv>
        </div>
    );
}
