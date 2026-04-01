# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal developer portfolio site built with Vue 3 + Vite + Tailwind CSS v4, deployed to Firebase Hosting.

## Commands

```bash
npm run dev        # Start dev server (Vite)
npm run build      # Production build → dist/
npm run preview    # Preview production build on port 4173
```

## Architecture

- **Vue 3.5** with `<script setup>`, **Vue Router 4** with hash history
- **Vite 6** as build tool, path alias `@` → `./src`
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **@vueuse/motion** for scroll-triggered animations (`v-motion` directive)
- **Lucide Vue Next** for icons
- Fonts: Inter (body), JetBrains Mono (accents) via Google Fonts

### Structure

```
src/
├── App.vue                      # Root: navbar + router-view
├── main.js                      # Entry: Vue + MotionPlugin + router
├── style.css                    # Tailwind import + custom theme (colors, fonts, scrollbar)
├── router/index.js              # Single route (/) with smooth scroll behavior
├── components/
│   ├── NavbarComponent.vue      # Fixed top nav, transparent → blur on scroll, mobile hamburger
│   ├── HeroSection.vue          # Full-screen parallax hero with photo + social links
│   ├── AboutSection.vue         # Bio + highlight cards (education, experience, location)
│   ├── StackSection.vue         # Tech stack grid grouped by category, logos from assets/logos/
│   ├── PortfolioSection.vue     # Project cards with tags + links
│   └── ContactSection.vue       # Social links + CTA + footer
├── views/HomeView.vue           # Composes all sections into single-page scroll
└── assets/                      # Profile photo, background images, tech logos
```

### Design System

Theme colors defined in `src/style.css` under `@theme`:
- `primary` (emerald green), `surface` / `surface-light` / `surface-lighter` (zinc grays)
- Dark-only design on `zinc-950` background

### Animations

All sections use `v-motion` with `:visible-once` for scroll-reveal animations. Hero uses `:enter` for load animations. Parallax backgrounds use `background-attachment: fixed` via `.parallax-bg` class.

## Content Sync Rules (CRITICAL)

When updating portfolio content, **ALL** of the following must be kept in sync:

| Source | What it contains |
|--------|-----------------|
| `src/i18n/en.js` | English text for all sections |
| `src/i18n/es.js` | Spanish text for all sections (must mirror en.js structure) |
| `src/views/AgentsView.vue` | Hardcoded plain-text version of all content for AI agents/crawlers |
| `index.html` | Page `<title>` and `<meta name="description">` |

Additionally, some content is hardcoded in Vue components (not i18n):
- `src/components/TechTicker.vue` — tech list array
- `src/components/AboutSection.vue` — stats counter values (years, companies, projects, technologies)
- `src/components/AchievementsSection.vue` — achievement entries array (logos, URLs, type)
- `src/components/CareerSection.vue` — job entries array (logos, git metadata)

**Never update content in only one place.** Always check all locations above.

## Style Rules

- Never use em dashes (—) in any user-facing text. Use commas or pipes instead.

## Deployment

Firebase Hosting (project: `ivan-d3277`). GitHub Actions auto-deploy on push to master and on PRs. Build output goes to `dist/`.
