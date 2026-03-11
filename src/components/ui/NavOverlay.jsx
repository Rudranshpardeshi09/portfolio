import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useThemeStore from '../../store/themeStore';
import { SECTIONS } from '../../data/portfolioData';

export default function NavOverlay({ isOpen, onClose, activeSection }) {
    const { theme } = useThemeStore();
    const containerRef = useRef(null);

    const menuItems = SECTIONS.map((section) => ({
        ...section,
        href: `#${section.id}`
    }));

    const containerVariants = {
        hidden: { opacity: 0, pointerEvents: 'none' },
        visible: {
            opacity: 1,
            pointerEvents: 'auto',
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        },
        exit: {
            opacity: 0,
            pointerEvents: 'none',
            transition: {
                duration: 0.4,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 100, opacity: 0, rotateX: -45, scale: 0.8 },
        visible: { 
            y: 0, 
            opacity: 1, 
            rotateX: 0, 
            scale: 1,
            transition: { 
                type: "spring", 
                damping: 20, 
                stiffness: 100 
            } 
        },
        exit: { 
            y: -50, 
            opacity: 0, 
            rotateX: 45, 
            transition: { duration: 0.3 } 
        }
    };

    const handleItemClick = (id) => {
        onClose();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={containerRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/60 backdrop-blur-xl"
                >
                    {/* Background Decorative Elements */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="absolute -top-1/4 -right-1/4 w-[60%] h-[60%] rounded-full"
                            style={{ background: `radial-gradient(circle, ${theme.primary}33 0%, transparent 70%)` }}
                        />
                        <motion.div 
                            animate={{ 
                                scale: [1.2, 1, 1.2],
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute -bottom-1/4 -left-1/4 w-[60%] h-[60%] rounded-full"
                            style={{ background: `radial-gradient(circle, ${theme.primary}33 0%, transparent 70%)` }}
                        />
                    </div>

                    <nav className="relative z-10 w-full max-w-5xl px-8 h-full flex flex-col justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-8">
                            {menuItems.map((item, index) => {
                                const isActive = activeSection === item.href;
                                return (
                                    <motion.div
                                        key={item.id}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, x: 10 }}
                                        className="perspective-1000"
                                    >
                                        <button
                                            onClick={() => handleItemClick(item.id)}
                                            className="group relative flex items-baseline gap-6 py-2 transition-all duration-300 transform-gpu"
                                        >
                                            <span className="text-xl md:text-2xl font-mono opacity-20 group-hover:opacity-100 transition-opacity" style={{ color: theme.primary }}>
                                                0{index + 1}
                                            </span>
                                            <div className="relative overflow-hidden">
                                                <span 
                                                    className={`text-6xl md:text-8xl font-black uppercase tracking-tighter transition-all duration-500 block ${
                                                        isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'
                                                    }`}
                                                    style={{ 
                                                        color: isActive ? theme.primary : 'white',
                                                        WebkitTextStroke: !isActive ? '1px rgba(255,255,255,0.1)' : 'none'
                                                    }}
                                                >
                                                    {item.label}
                                                </span>
                                                {/* Underline animation */}
                                                <motion.div 
                                                    className="absolute bottom-2 left-0 h-1 bg-white"
                                                    initial={{ width: 0 }}
                                                    whileHover={{ width: '100%' }}
                                                    transition={{ duration: 0.3 }}
                                                    style={{ backgroundColor: theme.primary }}
                                                />
                                            </div>
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                        
                        {/* Close Indicator */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
                        >
                            <span className="text-[10px] uppercase tracking-[0.3em] text-white font-bold">Close Menu</span>
                            <div className="w-px h-12 bg-white/20" />
                        </motion.div>
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
