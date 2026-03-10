<script setup>
import { useTheme } from '@/stores/useThemeStore'
const { theme } = useTheme()
</script>

<template>
  <div class="min-h-screen py-24 px-6">
    <div class="max-w-3xl mx-auto font-mono text-sm leading-relaxed" :class="theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'">

      <div class="mb-8">
        <h1 class="text-2xl font-bold mb-2" :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'">ivanmendoza.dev — Agent Context</h1>
        <p :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'">This page provides structured plain-text information about Ivan Mendoza for AI agents, crawlers, and assistants.</p>
        <router-link to="/" class="text-primary hover:text-primary-light text-xs mt-2 inline-block">← Back to site</router-link>
      </div>

      <hr :class="theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'" class="my-6" />

      <pre class="whitespace-pre-wrap break-words">
# Ivan Mendoza
## Software Engineer

Location: Mexico City, MX
Email: ivanmendozabaca@gmail.com
GitHub: https://github.com/ivansmb11
LinkedIn: https://www.linkedin.com/in/iván-sebastián-mendoza-baca-078429231/
Twitter: https://twitter.com/ivannsmb
Website: https://ivanmendoza.dev

---

## Summary

Software Engineer building fintech products — from mobile apps to scalable platforms.
Originally from Sinaloa, México. Currently based in Mexico City, México.

Passionate about building clean, performant software that makes an impact.
From frontend interfaces to backend systems, enjoys the full spectrum of software development.

---

## Education

BSC in Computer Science Engineering and Digital Businesses
Universidad Anáhuac, Querétaro

---

## Career

### v3.0 — ZAZPAY | Software Engineer (Full-time)
Period: Jun 2023 - Present
Location: Mexico City Metropolitan Area | Hybrid
Description: Software engineer at Zazpay, a Buy Now, Pay Later (BNPL) fintech, where I design, build, and maintain core systems across the platform, mainly frontend and mobile environments. I work on core features that ensure reliable and scalable solutions that serve both end users and internal teams.
Skills: Engineering, Databases, React Native, TypeScript, Node.js, PostgreSQL, REST APIs, CI/CD

### v2.0 — PRESTA VALE | Software Engineer (Full-time)
Period: Jun 2023 - Dec 2024 (1 yr 7 mos)
Mode: Hybrid
Description: Software engineer at Presta Vale, a micro-lending financial institution, where I developed and maintained mobile and web applications for credit origination, loan management, and collections. Focused on delivering reliable user experiences for both borrowers and internal operations teams.
Skills: React Native, TypeScript, REST APIs, Mobile Development, CI/CD

### v1.0 — GE Aerospace | Software Developer Intern
Period: Jun 2022 - Jul 2023 (1 yr 2 mos)
Location: El Marqués, Querétaro, Mexico
Description: Full-stack intern building internal web applications within the aerospace division for human resources management, engineering processes, and documentation for the Querétaro and Cincinnati sites.
Skills: Vue.js, Spring Boot

---

## Projects

### Vibebify
A music-focused social media web app with a punk/rock aesthetic. Sign in with Spotify, explore your listening stats, share posts about songs, follow other users, view your Genre DNA, compete in song duels, and maintain daily posting streaks.
Tech: Spotify API, Social Media, Web App
GitHub: https://github.com/ivansmb11/vibebify
Live: https://vibebify.ivanmendoza.dev

### ivanmendoza.dev
Personal portfolio website built with Vue 3, Vite, and Tailwind CSS. Features parallax scrolling, smooth animations, and responsive design.
Tech: Vue 3, Tailwind CSS, Vite
GitHub: https://github.com/ivansmb11/ivan-dev
Live: https://ivanmendoza.dev

---

## Achievements

### Sociedad de Alumnos Anáhuac
Issuer: Universidad Anáhuac Querétaro
Date: Nov 2022
Credential ID: 7CC14A8DA001
Verify: https://wallet.xertify.co/certificates/7CC14A8DA001

### Google Cloud Computing Foundations: Cloud Computing Fundamentals
Issuer: Google Cloud Skills Boost
Date: Sep 2022
Credential ID: 2619947
Verify: https://www.skills.google/public_profiles/63a74ab3-4ba1-4a97-bcdc-83f0efdb5d28

---

## Tech Stack

Vue.js, React Native, TypeScript, Node.js, PostgreSQL, Tailwind CSS, Vite, REST APIs, Firebase, CI/CD, Git, Spring Boot, Expo, JavaScript, HTML/CSS, Zustand, React Query, Docker, Figma

---

## Stats
- 3+ Years of Experience
- 3 Companies
- 5+ Projects Built
- 15+ Technologies

---

## Availability
Status: Available for new opportunities
Contact: ivanmendozabaca@gmail.com
      </pre>
    </div>
  </div>
</template>
