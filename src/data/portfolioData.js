export const SECTIONS = [
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🔧' },
    { id: 'experience', label: 'Experience', icon: '🏆' },
    { id: 'certificates', label: 'Certificates', icon: '📜' },
    { id: 'contact', label: 'Contact', icon: '📬' },
];

export const ABOUT_DATA = {
    title: 'MCA Candidate & Full-Stack Developer',
    bio: 'Motivated MCA candidate with expertise in Full Stack Development and Artificial Intelligence, supported by hands-on experience building responsive web applications using React.js and Django. Experience integrating advanced technologies such as Computer Vision and Retrieval-Augmented Generation (RAG) architectures.',
    bio2: 'Certified by NVIDIA and Red Hat, with practical exposure to workflow automation and delivery of scalable software solutions during internships. Strong analytical thinking, problem-solving abilities, and a collaborative mindset suited for dynamic engineering teams.',
    stats: [
        { label: 'Projects', value: '10+' },
        { label: 'Certifications', value: '3' },
        { label: 'Technologies', value: '15+' },
        { label: 'Learning Mindset', value: '100%' },
    ],
};

export const SKILLS_DATA = [
    {
        category: 'Programming Languages',
        icon: 'code',
        summary: 'Core languages used for application logic, interfaces, and problem solving across full-stack builds.',
        skills: [
            { name: 'Python', level: 90 },
            { name: 'C++', level: 85 },
            { name: 'JavaScript', level: 88 },
            { name: 'HTML5', level: 90 },
            { name: 'CSS3', level: 88 },
        ],
    },
    {
        category: 'AI/ML & Data',
        icon: 'ai',
        summary: 'Tooling for predictive models, computer vision, retrieval workflows, and data preparation.',
        skills: [
            { name: 'Scikit-learn', level: 82 },
            { name: 'TensorFlow', level: 75 },
            { name: 'OpenCV', level: 80 },
            { name: 'NumPy', level: 85 },
            { name: 'Pandas', level: 85 },
            { name: 'Matplotlib', level: 82 },
            { name: 'LangChain', level: 78 },
            { name: 'Hugging Face', level: 76 },
        ],
    },
    {
        category: 'Web Frameworks',
        icon: 'web',
        summary: 'Frameworks used to build responsive frontends, APIs, and production-ready application flows.',
        skills: [
            { name: 'Django', level: 88 },
            { name: 'FastAPI', level: 82 },
            { name: 'React', level: 90 },
            { name: 'Tailwind CSS', level: 88 },
            { name: 'Vite', level: 86 },
        ],
    },
    {
        category: 'Databases',
        icon: 'database',
        summary: 'Relational systems for storing transactional data, analytics outputs, and application state.',
        skills: [
            { name: 'PostgreSQL', level: 80 },
            { name: 'MySQL', level: 82 },
        ],
    },
    {
        category: 'Tools & Platforms',
        icon: 'tools',
        summary: 'Daily delivery tooling for version control, debugging, collaboration, and experimentation.',
        skills: [
            { name: 'Git', level: 90 },
            { name: 'GitHub', level: 92 },
            { name: 'Postman', level: 85 },
            { name: 'Jira', level: 75 },
            { name: 'Jupyter Notebook', level: 80 },
        ],
    },
];

export const PROJECTS_DATA = [
    {
        id: 1,
        title: 'Study-Mind-AI (RAG Architecture)',
        label: 'Academic Project',
        period: 'Resume project',
        overview: 'Retrieval-augmented study assistant built to return grounded answers from academic PDFs with page-level traceability.',
        outcomes: [
            'Integrated LangChain pipelines with Google Gemini API to improve contextual answer relevance by 35%.',
            'Engineered semantic search workflows for multi-document PDF ingestion and precise citation mapping.',
        ],
        experience: [
            'Applied AI workflow design for grounded responses and document reasoning.',
            'Combined backend retrieval logic with a React-based user-facing product flow.',
        ],
        tech: ['Python', 'LangChain', 'Gemini API', 'React'],
        color: '#FF6B6B',
        link: '#',
    },
    {
        id: 2,
        title: 'Auto-Attendance System',
        label: 'Academic Project',
        period: 'Resume project',
        overview: 'Computer-vision attendance platform designed for fast capture, fraud resistance, and real-time classroom operations.',
        outcomes: [
            'Constructed an AI-powered attendance workflow with FastAPI, React, and OpenCV, improving automation efficiency by 80%.',
            'Implemented facial recognition with real-time liveness detection to block spoofing attempts during check-in.',
        ],
        experience: [
            'Shipped a full-stack AI product that connects real-time vision inference with frontend operations.',
            'Focused on security-minded UX through liveness checks and automated attendance flow.',
        ],
        tech: ['FastAPI', 'React', 'OpenCV'],
        color: '#4ECDC4',
        link: '#',
    },
    {
        id: 3,
        title: 'Inventory Management System',
        label: 'Robotronix Internship',
        period: '08/2025 - 01/2026',
        overview: 'Operational dashboard and stock-control system built during the AI/ML internship to reduce manual work and improve data accuracy.',
        outcomes: [
            'Engineered a Django-based inventory management system that reduced manual data entry errors by 40%.',
            'Improved stock tracking efficiency by 30% with cleaner workflows and structured operational visibility.',
        ],
        experience: [
            'Translated internship operations into a maintainable web product with measurable business impact.',
            'Worked across backend logic, data handling, and admin-oriented interface design.',
        ],
        tech: ['Django', 'Python', 'PostgreSQL'],
        color: '#F59E0B',
        link: '#',
    },
    {
        id: 4,
        title: 'Sales Forecasting Dashboard',
        label: 'Robotronix Internship',
        period: '08/2025 - 01/2026',
        overview: 'Forecasting and reporting workflow that turned predictive modeling output into practical business-facing dashboards.',
        outcomes: [
            'Improved sales forecast accuracy by 18-22% using regression and ensemble learning models in Python and Scikit-learn.',
            'Developed interactive data visualization dashboards that reduced reporting time by 30% for faster decision-making.',
        ],
        experience: [
            'Connected ML experimentation to decision-ready reporting instead of stopping at model output.',
            'Framed data science work around forecast quality, reporting speed, and executive usability.',
        ],
        tech: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
        color: '#8B5CF6',
        link: '#',
    },
    {
        id: 5,
        title: 'Certificate Generator Platform',
        label: 'IIPS-DAVV Internship',
        period: '05/2025 - 07/2025',
        overview: 'Full-stack event automation platform created for university certificate generation and bulk participant delivery.',
        outcomes: [
            'Built and deployed a certificate generator used for university events, automating delivery for 500+ participants.',
            'Reduced administrative processing time by 90% through CSV-to-template mapping and validation workflows.',
        ],
        experience: [
            'Delivered a practical product for large-scale administrative automation, not just a demo feature set.',
            'Balanced reliability, data validation, and template workflow design for real event usage.',
        ],
        tech: ['React', 'Django', 'CSV Processing', 'Automation'],
        color: '#22C55E',
        link: '#',
    },
];

export const EXPERIENCE_DATA = [
    {
        role: 'AI/ML Intern',
        company: 'Robotronix',
        period: '08/2025 - 01/2026',
        summary: 'Built predictive and operational systems that improved forecasting quality, inventory control, and executive visibility.',
        achievements: [
            'Increased sales forecast accuracy by 18-22% using regression and ensemble learning models in Python and Scikit-learn.',
            'Engineered a Django-based inventory management system that reduced manual data entry errors by 40% and improved stock tracking efficiency by 30%.',
            'Developed interactive data dashboards that cut reporting time by 30% for faster decision-making.',
        ],
        highlights: ['Sales Forecasting', 'Inventory Management', 'Data Dashboards'],
    },
    {
        role: 'Web Development Intern',
        company: 'IIPS-DAVV',
        period: '05/2025 - 07/2025',
        summary: 'Delivered an event automation platform that turned repetitive certificate operations into a fast, production-ready workflow.',
        achievements: [
            'Built and deployed a full-stack certificate generator for university events, automating delivery for 500+ participants.',
            'Reduced administrative processing time by 90% with CSV-to-template mapping and validation workflows.',
        ],
        highlights: ['Certificate Generator', 'Workflow Automation', 'Full-stack Dev'],
    },
];

export const CERTIFICATIONS_DATA = [
    {
        name: 'Applications of AI for Anomaly Detection',
        issuer: 'NVIDIA',
        date: 'Feb 2026',
    },
    {
        name: 'Red Hat System Administration I (RH124)',
        issuer: 'Red Hat',
        date: 'June 2025',
    },
    {
        name: 'Django Web Development',
        issuer: 'GeeksforGeeks',
        date: 'March 2026',
    },
];

export const CONTACT_DATA = {
    email: 'rudranshpardeshi12@gmail.com',
    socials: [
        { name: 'LinkedIn', url: 'https://linkedin.com/in/rudransh-pardeshi-', icon: 'in' },
        { name: 'GitHub', url: 'https://github.com/Rudranshpardeshi09', icon: 'gh' },
    ],
};
