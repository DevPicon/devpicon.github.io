# AGENTS.md

Context file for AI Assistants (ChatGPT, GitHub Copilot, Codex) working with this repository.

## Overview

Personal portfolio site for **Armando Picón** (@devpicon) - Android Developer, Content Creator, and Technical Leader.

**Tech Stack**: Next.js 14 + TypeScript + Tailwind CSS + next-intl (i18n)
**Status**: Production (Live at https://devpicon.github.io)
**Last Major Update**: 2025-10-31 (Complete redesign + i18n implementation)

## Quick Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm start            # Serve production build
npm run lint         # Run ESLint
```

## Project Architecture

```
Next.js 14 (App Router)
├── SSG (Static Site Generation)
├── TypeScript
├── Tailwind CSS
└── Framer Motion (animations)
```

### Directory Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with theme provider
│   └── page.tsx         # Homepage
├── components/
│   ├── Navbar.tsx       # Navigation with mobile menu
│   ├── HeroSection.tsx  # Hero with typing animation
│   ├── AnimatedText.tsx # Typing effect component
│   ├── ContentCard.tsx  # Reusable content card
│   ├── ThemeToggle.tsx  # Dark/light mode toggle
│   └── Footer.tsx       # Footer with social links
└── styles/
    └── globals.css      # Global styles + Tailwind

public/
├── avatar.webp          # Optimized profile image
├── devpicon-logo-*.webp # Optimized logos
└── latest-content.json  # Auto-updated content data

.github/workflows/
├── deploy.yml           # Auto-deploy to GitHub Pages
└── update-content.yml   # Fetch latest content (manual)
```

## Key Features

### 1. Theme System
- Dark mode (default)
- Light mode toggle
- Uses `next-themes` library
- Smooth transitions

### 2. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Hamburger menu on mobile
- Grid: 3-col → 2-col → 1-col

### 3. Content Automation
- YouTube videos (via API)
- Dev.to articles (via API)
- Medium posts (via RSS)
- Stored in `public/latest-content.json`
- GitHub Actions fetches & updates

### 4. Animations
- Typing effect in hero (Framer Motion)
- Hover transitions (150-300ms)
- Theme toggle fade
- Smooth page loads

## Content Sources

| Source | API/Method | Update Frequency |
|--------|-----------|------------------|
| YouTube | Data API v3 | Manual trigger |
| Spotify | Web API + OAuth | Manual trigger |
| Dev.to | REST API | Manual trigger |
| Medium | RSS Feed | Manual trigger |

### YouTube Configuration
- **Channel ID**: `UCX9NJ471o7Wie1DQe94RVIg`
- **API Key**: Stored in GitHub Secrets
- **Fetch**: Most recent video

### Spotify Configuration
- **Show ID**: `1iyrRtXu0hrOQJyA7vdGiX`
- **Client ID & Secret**: Stored in GitHub Secrets
- **Auth Method**: Client Credentials OAuth flow
- **Fetch**: Latest podcast episode with metadata

## GitHub Actions

### Deploy Workflow
- **File**: `.github/workflows/deploy.yml`
- **Trigger**: Push to `master`
- **Actions**: Build → Deploy to `gh-pages` branch
- **Status**: Automated

### Update Content Workflow
- **File**: `.github/workflows/update-content.yml`
- **Trigger**: Manual (workflow_dispatch)
- **Actions**: Fetch APIs → Create PR with updates
- **Security**: Uses GitHub Secrets for API keys

## Configuration Files

### `next.config.js`
```javascript
{
  output: 'export',              // Static export for GitHub Pages
  images: { unoptimized: true }, // Required for static export
  reactStrictMode: true
}
```

### `tailwind.config.ts`
Custom colors, fonts, and breakpoints defined here.

### `tsconfig.json`
TypeScript configuration with path aliases:
- `@/components/*`
- `@/app/*`
- `@/styles/*`

## Styling Guidelines

### Color Palette
```css
--bg-dark:    #0b0f19
--text:       #e5e5e5
--blue:       #3b82f6
--yellow:     #facc15
```

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: Responsive with `clamp()`
- **Line Height**: 1.5-1.6 for body text

### Components
- Use Tailwind utility classes
- Follow mobile-first approach
- Consistent spacing: p-4, p-6, p-8
- Border radius: rounded-lg

## Image Optimization

All images optimized with Sharp:
- Format: WebP
- Quality: 80%
- Reduction: 96% (10.5 MB → 459 KB)

**Script**: `scripts/optimize-images.js`

## API Integration

### YouTube Data API v3
```javascript
const response = await fetch(
  `https://www.googleapis.com/youtube/v3/search?` +
  `part=snippet&channelId=${CHANNEL_ID}&` +
  `maxResults=3&order=date&type=video&` +
  `key=${API_KEY}`
);
```

### Dev.to API
```javascript
const response = await fetch(
  'https://dev.to/api/articles?username=devpicon'
);
```

### Medium RSS
```javascript
const response = await fetch(
  'https://medium.com/feed/@devpicon'
);
// Parse XML to JSON
```

## Deployment

- **Host**: GitHub Pages
- **Domain**: picon.dev (CNAME configured)
- **SSL**: Enabled (automatic)
- **Branch**: gh-pages (auto-generated)
- **Build**: Triggered on push to master

## Environment Variables

Required for GitHub Actions:
```bash
YOUTUBE_API_KEY=your_youtube_api_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

**Setup**: Repository Settings → Secrets and variables → Actions

## Common Tasks

### Add New Component
```bash
# Create file in src/components/
touch src/components/NewComponent.tsx
```

```typescript
// Template
import React from 'react';

export default function NewComponent() {
  return (
    <div className="p-4">
      {/* Component content */}
    </div>
  );
}
```

### Update Content Manually
1. Go to GitHub Actions tab
2. Select "Update Latest Content"
3. Click "Run workflow"
4. Review and merge PR

### Add New API Integration
1. Update `scripts/fetch-content.js` (if exists)
2. Add API fetch logic
3. Update `latest-content.json` schema
4. Update `ContentCard.tsx` to display new content

## Troubleshooting

### Build Fails
- Check Node version (requires 20+)
- Clear `.next` and `node_modules`
- Run `npm install` again

### Images Not Showing
- Ensure images are in `public/`
- Use absolute paths: `/image.webp`
- Check WebP browser support

### API Not Fetching
- Verify GitHub Secrets configured
- Check API key quotas
- Review workflow logs

### Theme Not Switching
- Ensure `next-themes` installed
- Verify ThemeProvider in layout
- Check localStorage for theme value

## Code Style

### TypeScript
- Use interfaces over types for objects
- Explicit return types for functions
- Strict mode enabled

### React
- Functional components only
- Hooks for state management
- Props typing required

### Tailwind
- Utility-first approach
- Use @apply sparingly
- Custom classes in globals.css

## Testing

Currently no automated tests configured.

**Future**: Add Jest + React Testing Library

## Performance

- **Target Lighthouse Score**: 90+
- **Image Optimization**: Complete (96% reduction)
- **Code Splitting**: Automatic (Next.js)
- **Lazy Loading**: Images and components

## Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Alt text on all images
- Color contrast: WCAG AA compliant

## Documentation

| File | Purpose |
|------|---------|
| `API_SETUP.md` | Complete API setup guide |
| `GITHUB_SECRETS_SETUP.md` | GitHub Secrets configuration |
| `YOUTUBE_QUICKSTART.md` | Quick YouTube API setup |
| `IMAGE_OPTIMIZATION.md` | Image optimization guide |
| `CONTENT_GUIDE.md` | Content management guide |
| `CLAUDE.md` | Claude Code context |
| `GEMINI.md` | Google Gemini context |
| `AGENTS.md` | This file (AI assistants) |

## Social Links

- **GitHub**: https://github.com/devpicon
- **LinkedIn**: https://linkedin.com/in/devpicon
- **Twitter**: https://twitter.com/devpicon
- **YouTube**: https://youtube.com/@devpicon
- **Instagram**: https://instagram.com/devpicon

## Latest Session Work (2025-10-31 Evening)

### Internationalization Implementation - COMPLETE
- Integrated next-intl for full Spanish/English support
- Created translation files: `/messages/es.json`, `/messages/en.json`
- Added language switcher with flag icons (ES/EN)
- Browser language auto-detection
- Locale routing: `/es/*` and `/en/*`
- Translated all pages (Home, Contact)
- SEO metadata in both languages

### Mailchimp Newsletter Integration - COMPLETE
- Email subscription form on Contact page
- Simplified form (email only)
- Working Mailchimp submission
- Success/error messages translated
- Proper form validation

### Navigation Updates
- Fixed links to include locale prefix
- Added special note in English about Spanish content
- Mobile menu fully translated

### Commit
- `056db57` - Complete i18n implementation with next-intl

## Known Issues

None currently. All features working as expected.

## Future Enhancements

1. ~~Complete Spanish/English i18n~~ ✅ DONE
2. ~~Add Contact form~~ ✅ DONE (with newsletter)
3. ~~Newsletter signup~~ ✅ DONE (Mailchimp)
4. Add About page
5. Implement podcast integration (dedicated page)
6. Add blog section (MDX)
7. Analytics integration
8. Dark mode persistence improvement

## Git Workflow

```bash
# Feature development
git checkout -b feature/feature-name
# Make changes
git add .
git commit -m "feat: description"
git push origin feature/feature-name
# Create PR → Review → Merge to master → Auto-deploy
```

## Dependencies (Key)

```json
{
  "next": "14.2.21",
  "react": "18.3.1",
  "typescript": "5.7.2",
  "tailwindcss": "3.4.17",
  "framer-motion": "11.15.0",
  "next-themes": "0.4.4",
  "lucide-react": "0.469.0"
}
```

## Support

For questions or issues, refer to documentation files or check GitHub Issues.

---

**Last Updated**: 2025-10-31 (Evening Session)
**Status**: Production Ready with i18n
**Version**: 1.1.0 (Redesign + Internationalization Complete)
