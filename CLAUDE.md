# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Armando Picón (devpicon) currently undergoing a complete redesign from Jekyll to Next.js. The project is in the `feature/redesign-2025` branch and aims to create a modern, minimalist, and professional digital presence showcasing Android development expertise, content creation (YouTube, podcasts, blog), and social media presence.

**Current State**: The repository is in transition. Most legacy Jekyll files have been deleted, and the Next.js foundation has been established with `package.json` configured.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Tech Stack

- **Framework**: Next.js 14+ (App Router) with SSG/hybrid rendering
- **Language**: TypeScript
- **Styling**: Tailwind CSS (centralized configuration in `tailwind.config.ts`)
- **Animations**:
  - Framer Motion (for typing animation effects)
  - Lucide React (iconography)
- **Internationalization**: next-intl (Spanish and English support required)

## Architecture & Design Guidelines

### Visual Design System
- **Color Palette** (centralized in Tailwind config):
  - Background: `#0b0f19`
  - Text: `#e5e5e5`
  - Primary accent: Blue `#3b82f6`
  - Secondary accent: Yellow `#facc15`
- **Typography**: Sans-serif (Inter, Manrope, or Poppins)
- **Dark mode**: Default theme (with light mode toggle in topbar)
- **Max 3 main colors, max 2 typefaces**

### Component Structure
Expected component organization under `/components` or `/src/components`:
- `Navbar` - Sticky topbar with responsive hamburger menu for mobile
- `HeroSection` - Landing section with avatar and animated typing text
- `AnimatedText` - Typing animation cycling through professional roles
- `ContentCard` - Reusable card for displaying latest content (YouTube, podcast, blog)
- `Footer` - Social media links and copyright

### Key Features
1. **Hero Section**: Avatar with animated typing text cycling through: "Mobile Developer", "Android Engineer", "Technical Leader", "Speaker", "Designer", "Content Creator"
2. **Latest Content Section**: Three content cards displaying:
   - Latest YouTube video (via RSS/API v3)
   - Latest podcast episode (Spotify/RSS feed)
   - Latest blog post (Dev.to API: `https://dev.to/api/articles?username=devpicon`)
3. **Responsive Design**: Desktop (3-column grid) → Tablet (2-column) → Mobile (1-column)

### i18n Implementation
- Store translations in `/locales/es/common.json` and `/locales/en/common.json`
- Auto-detect language from `navigator.language`
- All static text must be translatable

### Performance Requirements
- Lighthouse score > 90
- Initial load < 1s (desktop), < 2s (mobile)
- Use `clamp()` for dynamic text scaling
- Optimize images, use web fonts efficiently

## Deployment

- **Host**: GitHub Pages
- **Repository**: `devpicon.github.io`
- **Domain**: `picon.dev` (configured via CNAME)
- **CI/CD**: GitHub Actions workflow for automatic deployment on push to `main`
- **Branch Strategy**: Work on `feature/redesign-2025`, merge to `main` for deployment

## Accessibility

- Use `aria-labels` on all interactive elements
- Provide descriptive `alt` text for images
- Follow WCAG guidelines
- Ensure keyboard navigation works properly

## Important Files & Assets

- Logo assets (in `tmp_init/images/`):
  - `devpicon-logo-blanco.png` (dark mode)
  - `devpicon-logo-negro.png` (light mode)
  - `avatar_con_fondoblanco.png` (requires background removal for transparency)
- Design specifications in `tmp_init/development/lineamientos_tech_stack.md`
- Detailed task breakdown in `tmp_init/development/tareas_detalladas.md`

## Navigation Links

- Acerca de (About)
- Podcast
- Mis Redes (My Networks/Social Media)
- Contacto (Contact)

## Footer Social Links

Include icons for: GitHub, LinkedIn, Instagram, Twitter (X), YouTube

## Design Principles

- **Minimalist and professional**: Clean interface, limited color palette, proper use of whitespace
- **Smooth transitions**: 150-300ms for hover/focus states
- **Consistent visual identity**: Maintain cohesive branding throughout
- **Component reusability**: Build modular, DRY components
- **Responsive-first**: Mobile-first approach with fluid adaptability
