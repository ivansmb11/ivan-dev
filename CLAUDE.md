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
- **vue-i18n** for English/Spanish (`src/i18n/`)
- Font: Inter (variable, `opsz` axis) via Google Fonts; large sizes switch to the display cut automatically

### Structure

```
src/
├── App.vue                      # Root: skip link, intro loader, shortcuts, navbar, router-view, agent badge
├── main.js                      # Entry: Vue + MotionPlugin + router + i18n
├── style.css                    # Tailwind import, design tokens (@theme), dark palette (html.dark), utilities
├── motion.js                    # reveal() / enter() variants for v-motion (respect reduced motion)
├── router/index.js              # /, /concierge, /vibebify, /agents (hash history)
├── stores/useThemeStore.js      # Light default, opt-in dark; toggles html.dark
├── content/links.js             # Email, socials, home section ids
├── assets/
│   ├── slots.js                 # Image slot manifest (id → label, recommended size)
│   └── images/                  # Files named <slot-id>.<ext> fill the matching slot
├── components/
│   ├── ui/                      # AssetSlot, AsteriskMark, SectionChip, SplitHeading, ArrowButton, PageHeader
│   ├── HeroSection.vue … FooterSection.vue   # Home sections, in HomeView order
│   ├── concierge/, vibebify/    # Case-study page components
│   └── BootSequence.vue, KeyboardShortcuts.vue, AgentFab.vue
└── views/                       # HomeView, ConciergeView, VibebifyView, AgentsView
```

### Design System

Visual source of truth: a Framer "Personal Portfolio" reference (orange hero, off-white paper, heavy uppercase display type, gray chips with a red-orange asterisk).
- Tokens live in `src/style.css` `@theme`: `paper`, `card`, `mist`, `mist-soft`, `line`, `muted`, `graphite`, `ink` (neutrals), `onyx` (fixed near-black), `ember-deep` / `ember` / `ember-bright` (hero and footer orange), `accent` / `accent-deep`, `night`. Display sizes: `text-display-hero|xl|lg|md`. Utilities: `container-site`, `link-underline`, `placeholder-hatch`.
- Light is the default. Dark mode is opt-in (navbar toggle, menu, `D` key): `html.dark` overrides only the neutral tokens. To stay dark-safe, use `bg-card` (not `bg-white`) for raised surfaces, `text-paper` on `bg-ink`, and fixed colors (`text-white`, `bg-onyx`, `text-onyx`) only on the orange hero/footer, photos and `bg-night`. No `theme === 'dark'` branches in components.
- Images go through `AssetSlot` with an id from `src/assets/slots.js`. Until `src/assets/images/<id>.<ext>` exists it renders a labeled placeholder. Vibebify's product screenshots and diagram tech logos are real files imported directly.

### Animations

Use `v-motion="reveal(delay)"` for scroll reveals and `v-motion="enter(delay)"` above the fold (`src/motion.js`); both turn off under `prefers-reduced-motion`.

## Content Sync Rules (CRITICAL)

When updating portfolio content, **ALL** of the following must be kept in sync:

| Source | What it contains |
|--------|-----------------|
| `src/i18n/en.js` | English text for all sections |
| `src/i18n/es.js` | Spanish text for all sections (must mirror en.js structure) |
| `src/views/AgentsView.vue` | Hardcoded plain-text version of all content for AI agents/crawlers |
| `index.html` | Page `<title>` and `<meta name="description">` |

Additionally, some content is hardcoded in Vue components (not i18n):
- `src/components/TechTicker.vue`: tech list array
- `src/components/AboutSection.vue`: stats counter values (years, companies, projects, technologies)
- `src/components/AchievementsSection.vue`: achievement entries array (URLs, credentials, logo slot ids)
- `src/components/CareerSection.vue`: job entries array (image slot ids)
- `src/components/PortfolioSection.vue`: project entries (tags, GitHub and case-study links)
- `src/components/TrustedSection.vue`: logo strip entries

**Never update content in only one place.** Always check all locations above.

## Style Rules

- Never use em dashes (—) in any user-facing text. Use commas or pipes instead.

## Deployment

Firebase Hosting (project: `ivan-d3277`). GitHub Actions auto-deploy on push to master and on PRs. Build output goes to `dist/`.
