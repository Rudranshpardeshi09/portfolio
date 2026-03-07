export const SECTIONS = [
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🔧' },
    { id: 'experience', label: 'Experience', icon: '🏆' },
    { id: 'contact', label: 'Contact', icon: '📬' },
];

export const ABOUT_DATA = {
    title: "MCA Candidate & Full-Stack Developer",
    bio: "Motivated MCA candidate with expertise in Full Stack Development and Artificial Intelligence, supported by hands-on experience building responsive web applications using React.js and Django. Experience integrating advanced technologies such as Computer Vision and Retrieval-Augmented Generation (RAG) architectures.",
    bio2: "Certified by NVIDIA and Red Hat, with practical exposure to workflow automation and delivery of scalable software solutions during internships. Strong analytical thinking, problem-solving abilities, and a collaborative mindset suited for dynamic engineering teams.",
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
        icon: '💻',
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
        icon: '🤖',
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
        icon: '🌐',
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
        icon: '🗄️',
        skills: [
            { name: 'PostgreSQL', level: 80 },
            { name: 'MySQL', level: 82 },
        ],
    },
    {
        category: 'Tools & Platforms',
        icon: '🛠️',
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
        description: 'Developed a Retrieval-Augmented Generation (RAG) system integrating LangChain pipelines and Google Gemini API, improving contextual answer relevance by 35%. Engineered semantic search workflows enabling multi-document PDF ingestion and precise page-level citation mapping.',
        tech: ['Python', 'LangChain', 'Gemini API', 'React'],
        color: '#FF6B6B',
        link: '#',
    },
    {
        id: 2,
        title: 'Auto-Attendance System',
        description: 'Constructed an AI-powered attendance tracking system using FastAPI, React, and OpenCV, increasing attendance automation efficiency by 80%. Executed deep learning-based facial recognition with real-time liveness detection to prevent spoofing attempts.',
        tech: ['FastAPI', 'React', 'OpenCV'],
        color: '#4ECDC4',
        link: '#',
    },
];

export const EXPERIENCE_DATA = [
    {
        role: 'AI/ML Intern',
        company: 'Robotronix',
        period: '08/2025 — 01/2026',
        description: 'Increased sales forecast accuracy by 18-22% by applying regression and ensemble learning models using Python and Scikit-learn. Engineered a Django-based Inventory Management System that reduced manual data entry errors by 40% and improved stock tracking efficiency by 30%. Developed interactive data visualization dashboards, decreasing reporting time by 30%.',
        highlights: ['Sales Forecasting', 'Inventory Management', 'Data Dashboards'],
    },
    {
        role: 'Web Development Intern',
        company: 'IIPS-DAVV',
        period: '06/2025 — 07/2025',
        description: 'Built and deployed a full-stack Certificate Generator platform used for university events, automating bulk certificate distribution for 500+ participants. Decreased administrative processing time by 90% by developing automated CSV-to-template mapping and validation workflows.',
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
        date: 'March 2024',
    },
];

export const CONTACT_DATA = {
    email: 'rudranshpardeshi12@gmail.com',
    socials: [
        { name: 'LinkedIn', url: 'https://linkedin.com/in/rudransh-pardeshi-', icon: '💼' },
        { name: 'GitHub', url: 'https://github.com/Rudranshpardeshi09', icon: '🐙' },
    ],
};

