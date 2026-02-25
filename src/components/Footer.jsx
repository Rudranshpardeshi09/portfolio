import React from 'react';

/**
 * Footer Component
 * Dark footer with red accents and bike-themed social links
 */
export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-garage-border py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Top section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🏍️</span>
                        <span className="font-racing text-2xl text-white">
                            Rudransh's <span className="text-gradient-red">Garage</span>
                        </span>
                    </div>

                    {/* Social links */}
                    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
                        {[
                            { label: 'GitHub', icon: '💻', url: '#' },
                            { label: 'LinkedIn', icon: '🔗', url: '#' },
                            { label: 'Twitter', icon: '🐦', url: '#' },
                            { label: 'Instagram', icon: '📸', url: '#' },
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.url}
                                className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm font-heading uppercase tracking-wider"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>{social.icon}</span>
                                <span className="hidden sm:inline">{social.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="glow-line w-full opacity-30" />

                {/* Bottom section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 text-center md:text-left">
                    <p className="text-gray-500 text-sm font-body">
                        © {currentYear} Rudransh's Garage. Built with ❤️ and high octane fuel.
                    </p>
                    <p className="text-gray-600 text-xs font-heading tracking-wider uppercase">
                        Ride fast • Code faster
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
