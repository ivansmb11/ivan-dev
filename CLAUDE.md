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

## Deployment

Firebase Hosting (project: `ivan-d3277`). GitHub Actions auto-deploy on push to master and on PRs. Build output goes to `dist/`.
