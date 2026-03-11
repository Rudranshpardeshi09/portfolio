import { motion } from 'framer-motion';

const icons = {
  frontend: (color) => (
    <motion.svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke={color} strokeWidth="2">
      <motion.path 
        d="M20 7L12 3L4 7L12 11L20 7Z" 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path 
        d="M20 12L12 16L4 12" 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.path 
        d="M20 17L12 21L4 17" 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
    </motion.svg>
  ),
  backend: (color) => (
    <motion.svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke={color} strokeWidth="2">
      <motion.rect 
        x="2" y="2" width="20" height="8" rx="2"
        animate={{ strokeWidth: [2, 3, 2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.rect 
        x="2" y="14" width="20" height="8" rx="2"
        animate={{ strokeWidth: [2, 3, 2] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      <motion.circle 
        cx="18" cy="6" r="1" fill={color}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle 
        cx="18" cy="18" r="1" fill={color}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
      />
    </motion.svg>
  ),
  data: (color) => (
    <motion.svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke={color} strokeWidth="2">
       <motion.path 
        d="M12 21C16.9706 21 21 18.3137 21 15C21 11.6863 16.9706 9 12 9C7.02944 9 3 11.6863 3 15C3 18.3137 7.02944 21 12 21Z"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path 
        d="M21 10C21 13.3137 16.9706 16 12 16C7.02944 16 3 13.3137 3 10"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
      <motion.path 
        d="M21 5C21 8.3137 16.9706 11 12 11C7.02944 11 3 8.3137 3 5C3 1.68629 7.02944 -1 12 -1C16.9706 -1 21 1.68629 21 5Z"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
      />
    </motion.svg>
  ),
  tools: (color) => (
    <motion.svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke={color} strokeWidth="2">
      <motion.path 
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  )
};

export default function LordIcon({ type, theme }) {
  const iconRenderer = icons[type] || icons.frontend;
  return (
    <div className="relative p-2">
      <motion.div 
        className="absolute inset-0 blur-lg opacity-20"
        style={{ backgroundColor: theme.primary }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {iconRenderer(theme.primary)}
    </div>
  );
}
