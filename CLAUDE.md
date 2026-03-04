# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for soratobiwo (ソラトビヲ), a Japanese rock band. It's built with Nuxt v4 (Vue 3 + TypeScript) as a static site generator (SSG), deployed to Netlify.

## Essential Commands

```bash
# Start development server
npm run dev

# Build and generate static site (outputs to /dist/)
npm run generate

# Preview generated site
npm run preview

# Linting
npm run lint        # ESLint
npm run lint:fix    # ESLint with auto-fix
```

## Architecture and Key Patterns

### Directory Structure

All application code lives under `/app/`:

- `/app/pages/` - File-based routing with dynamic routes
- `/app/components/` - Vue single-file components (button, content, layout, utility)
- `/app/layouts/` - Page templates (default, thanks)
- `/app/composables/` - Composition API utilities (date formatting, mouse follow, page loading, SEO, reveal clip, tilt)
- `/app/stores/` - Pinia state management
- `/app/utils/webgl/` - Custom WebGL shader utilities (DisplacementSlider)
- `/app/assets/` - Static assets (sass, json, images, js)
- `/app/types/` - TypeScript type definitions

### Content Management System

JSON-based content system where data files in `/app/assets/json/` drive dynamic content:
- `live.json` - Concert/live event data
- `news.json` - News articles
- `music.json` - Discography
- `profile.json` - Band member profiles
- `follow.json`, `listen.json`, `special.json` - Additional content

### Styling System

Uses SCSS with Vite preprocessor:
- Global styles: `/app/assets/sass/main.scss`
- Variables and mixins are globally injected via `vite.css.preprocessorOptions` in `nuxt.config.ts`
- Aliases: `Sass` → `~/assets/sass`, `Images` → `~/assets/images`, `Js` → `~/assets/js`
- Google Fonts: Nunito & Ubuntu

### Animation and Graphics

- **Raw WebGL**: Custom shader-based effects (e.g., `DisplacementSlider` in `/app/utils/webgl/`)
- **Composables**: `useMouseFollow`, `useRevealClip`, `useTilt` for interactive animations
- Animations use Web Animations API and requestAnimationFrame (no external animation library)

### Build and Deployment

- Static site generation: `npm run generate` creates `/dist/`
- Deployed to Netlify (config in `netlify.toml`)
- Node 24 (`.nvmrc`)

## Important Implementation Details

### Dynamic Routes

Live event and news pages are dynamically generated from JSON data via `prerender:routes` hook in `nuxt.config.ts`:

```typescript
hooks: {
  async 'prerender:routes'(ctx) {
    // Generates /live/:id and /news/:id routes from JSON
  }
}
```

### Configuration

- `nuxt.config.ts` - Nuxt configuration (TypeScript)
- SSR enabled with link crawling for prerendering
- Pinia for state management (`@pinia/nuxt`)
- ESLint + Prettier for code quality
