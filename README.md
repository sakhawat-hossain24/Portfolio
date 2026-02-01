# Portfolio - Creative Developer

Personal portfolio website showcasing projects, skills, and professional experience as a creative developer.

## 🚀 Features

- **Modern Design**: Built with SvelteKit and TailwindCSS for a sleek, responsive interface
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Smooth Animations**: Floating elements, gradient animations, and micro-interactions
- **Mobile Responsive**: Optimized for all screen sizes with mobile navigation
- **Performance Optimized**: Fast loading with lazy loading and efficient rendering
- **Accessibility**: Semantic HTML with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Framework**: SvelteKit 2.50.1
- **Language**: TypeScript
- **Styling**: TailwindCSS 4.1.18
- **Icons**: Lucide Svelte
- **Animations**: CSS animations and transitions
- **Deployment**: Static site generation with SvelteKit

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/sakhawat-hossain24/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser (optional)
npm run dev -- --open
```

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check

# Type checking with watch mode
npm run check:watch
```

## 📁 Project Structure

```
src/
├── lib/           # Reusable components and utilities
├── routes/        # SvelteKit pages and layouts
│   ├── +layout.svelte    # Root layout with navigation
│   ├── +page.svelte      # Main portfolio page
│   └── +page.js          # Page configuration
├── app.css        # Global styles and theme variables
├── app.html       # HTML template
└── hooks.server.ts # Server-side hooks
```

## 🎨 Theme System

The portfolio uses a custom theme system with CSS variables:

- **Dark Theme**: Deep blue/purple gradient background
- **Light Theme**: Clean white background with subtle colors
- **Accent Colors**: Green (#00d4aa) and Blue (#00a8ff)

## 🚀 Deployment

This project is configured for static deployment and can be hosted on:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

The build process generates optimized static files in the `build/` directory.

## 🤝 Contributing

This is a personal portfolio project. For suggestions or improvements, feel free to open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ and [SvelteKit](https://kit.svelte.dev/)
