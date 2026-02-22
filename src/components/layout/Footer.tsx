import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components';
import { useThemeStore, getThemeConfig } from '@/store/useThemeStore';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

/**
 * Footer Component
 * Navigation footer with social links
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { activeTheme } = useThemeStore();
  const theme = getThemeConfig(activeTheme);

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: 'https://github.com/Rudranshpardeshi09',
      label: 'GitHub',
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://linkedin.com/in/rudransh-pardeshi',
      label: 'LinkedIn',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: 'mailto:rudransh.pardeshi@gmail.com',
      label: 'Email',
    },
  ];

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer style={{
      borderTopColor: theme.primaryColor,
      borderTopWidth: '1px',
      background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5))',
    }}>
      <Container className="py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h3 className="text-xl font-bold" style={{
              color: theme.primaryColor,
              textShadow: `0 0 15px ${theme.glowColor}`,
            }}>Rudransh Pardeshi</h3>
            <p className="text-white/70">Full Stack Developer & AI/ML Enthusiast</p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <h4 className="font-semibold text-white">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-white/70 transition-colors"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    whileHover={{
                      color: theme.primaryColor,
                      textShadow: `0 0 10px ${theme.glowColor}`,
                    }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h4 className="font-semibold text-white">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                  whileHover={{
                    backgroundColor: `rgba(${parseInt(theme.primaryColor.slice(1, 3), 16)}, ${parseInt(theme.primaryColor.slice(3, 5), 16)}, ${parseInt(theme.primaryColor.slice(5, 7), 16)}, 0.2)`,
                    color: theme.primaryColor,
                    boxShadow: `0 0 12px ${theme.glowColor}`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70"
          style={{
            borderTopColor: theme.primaryColor,
            borderTopWidth: '1px',
          }}
        >
          <p>© {currentYear} Rudransh Pardeshi. All rights reserved.</p>
          <p>Built with React, Tailwind, and Framer Motion</p>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;
