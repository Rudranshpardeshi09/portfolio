# Rudransh's Professional Portfolio

A stunning, production-ready portfolio website featuring heavy animations, interactive backgrounds, and modern web technologies. Built with Vite + React, Tailwind CSS, and Framer Motion.

Live Demo: https://portfolio-demo.vercel.app (Coming Soon)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The site opens at `http://localhost:5173`

## Tech Stack

- **Framework**: Vite + React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion for UI motion
- **Background**: Canvas-based particle system with cursor tracking
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Features

✨ Hero section with typewriter animation
📖 About page with timeline and stats
💻 Skills showcase with progress bars
🚀 Featured projects grid with modals
💬 Contact form with validation
🗣️ Testimonials carousel
🎨 Interactive particle background
🔗 Social links footer

## Real Projects Included

- [Auto-Attendance System](https://github.com/Rudranshpardeshi09/Auto-Attendance-system) - Facial recognition + liveness detection
- [Inventory Management](https://github.com/Rudranshpardeshi09/inventory_management) - Django enterprise app
- [Sales Forecast AI](https://github.com/Rudranshpardeshi09/Ecommerce-Sales-Forecast-AI) - ML/Data science
- [StudyMind-AI](https://github.com/Rudranshpardeshi09/StudyMind-AI) - Full-stack AI app
- [Certificate Generator](https://github.com/Rudranshpardeshi09/Certificate-Generator) - Web app on Vercel

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components (Hero, About, Skills, etc.)
├── config/           # Animation tokens and config
├── lib/              # Utility functions
├── App.jsx           # Main app
└── index.css         # Global styles
```

## Key Files

- `src/config/motion.config.ts` - Centralized animation tokens
- `src/components/ButtonGlassCard.tsx` - Core reusable components
- `src/components/AnimatedBackground.tsx` - Interactive particle background
- `tailwind.config.js` - Design tokens and theme config
- `vite.config.js` - Path aliases (@) configuration

## Customization

### Update Content
- Hero: `src/pages/HeroPage.tsx`
- About: `src/pages/AboutPage.tsx`
- Skills: `src/pages/SkillsPage.tsx`
- Projects: `src/pages/ProjectsPage.tsx` (update projects array)
- Contact: `src/pages/ContactPage.tsx`
- Footer: `src/components/Footer.tsx`

### Modify Design
- Colors: `tailwind.config.js` (primary, accent, colors section)
- Fonts: `tailwind.config.js` (fontSize)
- Animations: `src/config/motion.config.ts` (durations, easings)

## Accessibility

✅ Keyboard navigation (Tab, Enter, Escape)
✅ ARIA labels and semantic HTML
✅ Respects `prefers-reduced-motion`
✅ WCAG AA color contrast
✅ Focus states on all interactive elements

## Performance

- Canvas particles disabled on mobile
- GPU-accelerated animations with `transform`
- HTML image lazy-loading
- Efficient re-renders
- Lighthouse target: Performance >50, Accessibility >90

## Deployment

### Vercel (Easiest)
1. Push to GitHub
2. Go to vercel.com → Connect repo → Deploy
3. Auto-detects Vite configuration

### Build & Deploy Anywhere
```bash
npm run build  # Creates dist/ folder
# Upload dist/ to any static hosting
```

### Other Platforms
- Netlify: `netlify deploy --prod --dir=dist`
- GitHub Pages: Update `vite.config.js` base path
- Firebase: `firebase deploy`

## Troubleshooting

**Port 5173 in use**: `npm run dev -- --port 3000`

**Module errors**: `rm -rf node_modules && npm install`

**Cursor/animations not showing**: Check browser console, disable extensions

**Build fails**: Ensure Node.js 16+ installed

## Browser Support

✅ Chrome 90+, Firefox 88+, Safari 14+, Mobile browsers
❌ IE 11

## Contact

- GitHub: [@Rudranshpardeshi09](https://github.com/Rudranshpardeshi09)
- LinkedIn: [Rudransh Pardeshi](https://linkedin.com/in/rudransh-pardeshi)
- Email: hello@example.com

---

**Built with React, Tailwind CSS, and Framer Motion**
