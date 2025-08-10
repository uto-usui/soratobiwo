# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for soratobiwo (ソラトビヲ), a Japanese rock band. It's built with Nuxt.js v2.15.6 as a static site generator (SSG) using Vue.js components.

## Essential Commands

### Development
```bash
# Start development server (port 8080)
npm run dev:development

# Start development server on localhost only
npm run dev:development_localhost

# Build and generate static site
npm run generate

# Run linting
npm run lint        # ESLint for JS/Vue files
npm run lintcss     # Stylelint for SCSS/Vue styles

# Run tests
npm test           # Jest tests (minimal coverage)
```

## Architecture and Key Patterns

### Content Management System
The site uses a JSON-based content system where data files in `/assets/json/` drive dynamic content:
- `live.json` - Concert/live event data
- `news.json` - News articles
- `music.json` - Discography
- `profile.json` - Band member profiles

Live events can be authored in markdown format (`live.md`) and converted to JSON.

### Component Architecture
- **Pages** (`/pages/`): File-based routing with dynamic routes for live events
- **Components** (`/components/`): Reusable Vue single-file components
- **Layouts** (`/layouts/`): Page templates (default, thanks)

### Styling System
Uses SCSS with an ITCSS-inspired architecture:
- Global styles auto-imported via `styleResources` in nuxt.config.js
- Webpack aliases: `Sass` → `/assets/sass/`
- Japanese typography with custom Yu Gothic font configuration

### Animation and Graphics
- **GSAP**: Primary animation library for complex animations
- **PIXI.js**: WebGL graphics for advanced visual effects
- Custom animation utilities in `/assets/js/`

### Build and Deployment
- Static site generation: `npm run generate` creates `/dist/`
- PWA features with custom service worker and Workbox caching strategies
- Deploy scripts use `copy` and `clean` commands for file management

## Important Implementation Details

### Dynamic Routes
Live event pages are dynamically generated from `live.json` data. Route generation happens in `nuxt.config.js`:
```javascript
generate: {
  routes() {
    // Generates routes for each live event
  }
}
```

### Asset Management
Custom webpack aliases for imports:
- `Images` → `/assets/images/`
- `Js` → `/assets/js/`
- `Sass` → `/assets/sass/`

### PWA Configuration
Service worker with custom caching strategies for:
- Static assets (images, fonts)
- API responses
- Offline functionality

### Browser Support
Targets last 2 browser versions, Android 4.4.4+, and IE 11 (via babel configuration).

## Testing Approach
Jest with Vue Test Utils, though test coverage is minimal. Test files go in `/test/` directory.