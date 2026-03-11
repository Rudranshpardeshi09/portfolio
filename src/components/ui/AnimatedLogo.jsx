import { motion } from 'framer-motion';
import { useRef, useMemo } from 'react';

export default function AnimatedLogo({ src, alt, theme }) {
    const constraintsRef = useRef(null);

    // Randomize animation slightly so logos don't all move identically
    const randomDuration = useMemo(() => 4 + Math.random() * 2, []);
    const randomY = useMemo(() => -8 - Math.random() * 4, []);

    return (
        <div className="flex flex-col items-center">
            <motion.div 
                ref={constraintsRef}
                whileHover={{ 
                    scale: 1.25, 
                    rotate: 8,
                    z: 50,
                    transition: { type: "spring", stiffness: 300 }
                }}
                animate={{
                    y: [0, randomY, 0],
                }}
                transition={{
                    duration: randomDuration,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="w-16 h-16 md:w-20 md:h-20 p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center relative group overflow-hidden transform-gpu"
                style={{
                   boxShadow: `0 8px 32px rgba(0,0,0,0.2)`,
                   transformStyle: 'preserve-3d'
                }}
            >
                {/* Glow Background */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${theme.primary} 0%, transparent 70%)` }}
                />
                
                {/* Logo */}
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-contain relative z-10 drop-shadow-md"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </motion.div>
        </div>
    );
}
