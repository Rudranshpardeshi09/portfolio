import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../store/themeStore';
import { ArrowLeft } from 'lucide-react';

export default function PageTransitionWrapper({ children, title, isContact = false }) {
    const navigate = useNavigate();
    const { theme } = useThemeStore();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen relative bg-black/50 overflow-y-auto overflow-x-hidden"
        >
            {/* Top Navigation Bar with Back Button */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
                <button
                    onClick={() => {
                        // As per requirements: contact exit -> map -> bike selection
                        // Here "Back to Map" goes to Map. For Contact, maybe goes to Map, and Map has button to selection.
                        navigate('/map');
                    }}
                    className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-all duration-300 group"
                    style={{ border: `1px solid ${theme.primary}55` }}
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium text-sm md:text-base tracking-wider uppercase">
                        Back to Map
                    </span>
                </button>

                {title && (
                    <div
                        className="pointer-events-auto px-6 py-2 rounded-full glass hidden md:block"
                        style={{ color: theme.primary, border: `1px solid ${theme.primary}55` }}
                    >
                        <span className="font-bold tracking-widest uppercase text-sm">{title}</span>
                    </div>
                )}
            </div>

            {/* Page Content Container with top padding for navbar */}
            <div className="pt-24 pb-12 w-full max-w-7xl mx-auto px-4 md:px-8">
                {children}
            </div>
        </motion.div>
    );
}
