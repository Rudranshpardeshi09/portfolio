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


prompt 
you are a professional frontend developer and ui/ux expert.
now i want :-
1. when the user load the page the text that is appearing "welcome to my garage" should be in white color with that ducati image. and the font should be changed . instead of making it slant use straight  fonts.
2. in the nav bar that icon with the rg text should be selected from the icons that i have in my  portfolio\public\bike icons , 
i want this icon to be selected dynamically. 
so for that you have to :-
create a small circle at the bottom left of the page that will be floating . this button will provide the functionality of changing the theme of the whole project like for eg:( the default one will be duggati means - red, 
no wwhen the user clicks the circle there should be option like bmw refers to whhite, hayabusa refers to yellow , kawasaki ninja h2 refers to neon , mv augusta refers to blue.)
so based on the user selection the of this whole project shoul d be changed. also it should persist until the user chosses another. and all those options will also be floating near that main circle.
funtions :-
if the user chosses kawasaki ninja then the theme should be black + neon and the nav bar icon should be changed to ninja icon.
if user chooses bmw then the theme should be based on black blue white color and icon shouldbe changed to bmw icon.
3. now the hero section 
in this the background image should be placed from public\hero-sec.png this path. the image at the background should be backdroped with appropriate value. and the heading "Rudransh's
Garage" should be designed and placed according to the background image(position it at bottom and center of the semi circle formed by the bikes ).
that text should compliment the background image.
4. i want timeline 3d animations for this as the user scroll thimgs would come in   , out ,rotate, flip,etc from diffrent directions.
5. use glass morphism white text combo so some creativity and do the things
