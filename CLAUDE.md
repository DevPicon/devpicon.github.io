# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Armando Picón (devpicon) built with Next.js 14, TypeScript, and Tailwind CSS. The project showcases Android development expertise, content creation (YouTube, podcasts, blog), and social media presence.

**Current State**: The complete redesign from Jekyll to Next.js is COMPLETE and deployed. The site is live at https://devpicon.github.io (picon.dev) with automated content fetching from YouTube, Dev.to, and Medium via GitHub Actions.

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
- **Theme Management**: next-themes (dark/light mode toggle)
- **Internationalization**: next-intl (Spanish and English support - in progress)
- **Content Automation**: GitHub Actions with YouTube Data API v3, Dev.to API, Medium RSS

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

## Deployment & Automation

- **Host**: GitHub Pages
- **Repository**: `devpicon.github.io`
- **Domain**: `picon.dev` (configured via CNAME)
- **CI/CD**: Two GitHub Actions workflows:
  1. **Deploy workflow** (`.github/workflows/deploy.yml`): Builds and deploys to GitHub Pages on push to `master`
  2. **Update Content workflow** (`.github/workflows/update-content.yml`): Fetches latest content from YouTube, Dev.to, and Medium
     - Trigger: Manual only (workflow_dispatch)
     - Security: Uses GitHub Secrets for API keys (YOUTUBE_API_KEY)
     - Process: Creates a PR for review instead of direct push to master
- **Branch Strategy**: Work on feature branches, merge to `master` for deployment
- **Live Site**: https://devpicon.github.io

## GitHub Secrets Configuration

The following secrets must be configured in repository settings:
- `YOUTUBE_API_KEY`: YouTube Data API v3 key for fetching channel videos
- `SPOTIFY_CLIENT_ID`: Spotify API Client ID for fetching podcast episodes
- `SPOTIFY_CLIENT_SECRET`: Spotify API Client Secret for OAuth authentication
- Configure via: Repository Settings > Secrets and variables > Actions > New repository secret

See `GITHUB_SECRETS_SETUP.md` and `YOUTUBE_QUICKSTART.md` for detailed setup instructions.

## Accessibility

- Use `aria-labels` on all interactive elements
- Provide descriptive `alt` text for images
- Follow WCAG guidelines
- Ensure keyboard navigation works properly

## Important Files & Assets

- Logo assets in `public/`:
  - `devpicon-logo-blanco.webp` (optimized, light version for dark backgrounds)
  - `devpicon-logo-negro.webp` (optimized, dark version for light backgrounds)
  - `avatar.webp` (optimized profile avatar)
- All images have been optimized using Sharp (96% size reduction):
  - Original: 10.5 MB
  - Optimized: 459 KB
  - Format: WebP with 80% quality
- Content data stored in `public/latest-content.json` (auto-updated by GitHub Actions)
- Helper script: `scripts/optimize-images.js` for batch image optimization
- See `IMAGE_OPTIMIZATION.md` for details on optimization process

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

## Recent Updates (2025-10-31)

### Complete Redesign from Jekyll to Next.js
- Migrated entire site from Jekyll static site generator to Next.js 14 with TypeScript
- Implemented modern component architecture with Tailwind CSS
- Added dark/light theme toggle with smooth transitions
- Created responsive navigation with mobile hamburger menu

### Image Optimization
- Batch optimized all images using Sharp library
- Converted PNG images to WebP format
- Reduced total image size by 96% (10.5 MB to 459 KB)
- Improved page load performance significantly

### Automated Content Fetching System
- Implemented GitHub Actions workflow to fetch latest content from:
  - YouTube Data API v3 (personal channel videos)
  - Dev.to API (latest blog posts)
  - Medium RSS feed (latest articles)
- Configured secure API key management via GitHub Secrets
- Changed workflow to create PRs instead of direct push for better security
- Set to manual trigger only (removed daily schedule)

### YouTube API Configuration
- Fixed YouTube Channel ID to fetch from correct personal channel
- Channel ID: UCX9NJ471o7Wie1DQe94RVIg
- Successfully tested and verified video fetching
- Created comprehensive setup documentation (YOUTUBE_QUICKSTART.md)

### Deployment & CI/CD
- Configured GitHub Pages deployment via GitHub Actions
- Automated build and deploy on push to master branch
- Site successfully deployed and live at https://devpicon.github.io
- Custom domain picon.dev configured

### Spotify API Integration (Latest - 2025-10-31)
- Implemented complete Spotify API integration using Client Credentials OAuth flow
- Added automatic token management and authentication
- Configured SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in GitHub Secrets
- Successfully fetches latest podcast episode with title, description, URL, date, and cover image
- Tested and verified working correctly with show ID: 1iyrRtXu0hrOQJyA7vdGiX
- All 4 content sources now fully automated:
  - YouTube (video) - YouTube Data API v3
  - Spotify (podcast) - Spotify Web API with OAuth
  - Dev.to (blog) - Dev.to REST API
  - Medium (blog) - Medium RSS feed

### Documentation Created
- `API_SETUP.md`: Comprehensive API configuration guide
- `GITHUB_SECRETS_SETUP.md`: GitHub Secrets setup instructions
- `YOUTUBE_QUICKSTART.md`: Quick YouTube API setup guide with helper script
- `IMAGE_OPTIMIZATION.md`: Image optimization process documentation
- `CONTENT_GUIDE.md`: Content fetching and management guide

### Key Technical Decisions
- Manual workflow trigger: Changed from daily automated runs to manual dispatch for better control
- PR-based updates: Content updates now create PRs for review before merging
- WebP format: Standardized on WebP for all images for optimal performance
- Master branch deployment: Simplified from feature branch workflow to direct master deployment
