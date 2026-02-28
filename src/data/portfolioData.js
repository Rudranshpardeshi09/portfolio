export const SECTIONS = [
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🔧' },
    { id: 'experience', label: 'Experience', icon: '🏆' },
    { id: 'contact', label: 'Contact', icon: '📬' },
];

export const ABOUT_DATA = {
    title: "Full-Stack Developer & Bike Enthusiast",
    bio: "Hey there! I'm Rudransh. I started my journey writing simple code, and along the way, I fell in love with both the precision of building seamless web applications and the thrill of super-bikes. When I'm not debugging or optimizing backend APIs, you'll probably find me dreaming about hitting the apex on a track day.",
    bio2: "I believe that writing code is a lot like tuning a high-performance machine — every component matters, and efficiency is everything. Let's build something fast, reliable, and beautifully designed together.",
    stats: [
        { label: 'Projects Completed', value: '30+' },
        { label: 'Years Experience', value: '4+' },
        { label: 'Technologies', value: '20+' },
        { label: 'Cups of Chai', value: '∞' },
    ],
};

export const SKILLS_DATA = [
    {
        category: 'Frontend',
        icon: '🎨',
        skills: [
            { name: 'React / Next.js', level: 92 },
            { name: 'Three.js / R3F', level: 78 },
            { name: 'GSAP / Framer Motion', level: 85 },
            { name: 'Tailwind CSS', level: 95 },
            { name: 'TypeScript', level: 88 },
        ],
    },
    {
        category: 'Backend',
        icon: '⚙️',
        skills: [
            { name: 'Node.js / Express', level: 90 },
            { name: 'Python / FastAPI', level: 82 },
            { name: 'PostgreSQL / MongoDB', level: 85 },
            { name: 'REST & GraphQL APIs', level: 88 },
            { name: 'Docker / AWS', level: 75 },
        ],
    },
    {
        category: 'Tools & More',
        icon: '🛠️',
        skills: [
            { name: 'Git / GitHub', level: 94 },
            { name: 'CI/CD Pipelines', level: 80 },
            { name: 'Figma / UI Design', level: 78 },
            { name: 'Linux / Shell', level: 82 },
            { name: 'AI/ML Integration', level: 72 },
        ],
    },
];

export const PROJECTS_DATA = [
    {
        id: 1,
        title: 'AI Video Detector',
        description: 'A deepfake detection platform using advanced ML models to identify AI-generated video content with real-time analysis.',
        tech: ['Python', 'TensorFlow', 'React', 'FastAPI'],
        color: '#FF6B6B',
        link: '#',
    },
    {
        id: 2,
        title: 'Smart Attendance',
        description: 'Facial recognition-based attendance system with WebSocket real-time updates and admin dashboard.',
        tech: ['Node.js', 'OpenCV', 'React', 'WebSocket'],
        color: '#4ECDC4',
        link: '#',
    },
    {
        id: 3,
        title: 'Garage Portfolio',
        description: 'This very portfolio — a 3D scrollytelling experience with dynamic bike themes and interactive navigation.',
        tech: ['React', 'Three.js', 'GSAP', 'Tailwind'],
        color: '#FFE66D',
        link: '#',
    },
    {
        id: 4,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration, inventory management, and analytics dashboard.',
        tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
        color: '#A78BFA',
        link: '#',
    },
    {
        id: 5,
        title: 'Real-Time Chat App',
        description: 'End-to-end encrypted messaging platform with file sharing, group chats, and video calls.',
        tech: ['React', 'Socket.io', 'WebRTC', 'MongoDB'],
        color: '#F97316',
        link: '#',
    },
    {
        id: 6,
        title: 'DevOps Dashboard',
        description: 'Unified monitoring dashboard for CI/CD pipelines, server health, and deployment analytics.',
        tech: ['Vue.js', 'Docker', 'Grafana', 'Go'],
        color: '#06B6D4',
        link: '#',
    },
];

export const EXPERIENCE_DATA = [
    {
        role: 'Full-Stack Developer',
        company: 'Freelance',
        period: '2023 — Present',
        description: 'Building high-performance web applications for clients worldwide. Specializing in React/Next.js frontends with Node.js backends.',
        highlights: ['Led 10+ client projects', 'Built real-time systems', '99.9% uptime record'],
    },
    {
        role: 'Frontend Developer Intern',
        company: 'Tech Startup',
        period: '2022 — 2023',
        description: 'Developed responsive UIs and integrated REST APIs. Improved page load times by 40% through optimization.',
        highlights: ['React & TypeScript', 'Performance optimization', 'Agile workflow'],
    },
    {
        role: 'Open Source Contributor',
        company: 'Various Projects',
        period: '2021 — Present',
        description: 'Active contributor to open-source projects in the React and Node.js ecosystems.',
        highlights: ['50+ contributions', 'Documentation improvements', 'Bug fixes & features'],
    },
];

export const CONTACT_DATA = {
    email: 'rudransh@example.com',
    socials: [
        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
        { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
        { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
        { name: 'Instagram', url: 'https://instagram.com', icon: '📸' },
    ],
};
