<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import PageHeader from '@/components/ui/PageHeader.vue'
</script>

<template>
  <main id="main" tabindex="-1" class="outline-none">
    <div class="container-site pt-32 pb-24 md:pt-40 md:pb-32">
      <PageHeader title="Agent context" kicker="ivanmendoza.dev" />

      <div class="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-4">
          <div class="flex flex-col gap-5 lg:sticky lg:top-32">
            <p class="max-w-[28rem] text-base leading-relaxed text-graphite md:text-lg">
              This page provides structured plain-text information about Ivan Mendoza for AI agents, crawlers, and assistants.
            </p>
            <NuxtLink
              to="/"
              class="group -ml-1 inline-flex min-h-11 w-fit items-center gap-2 px-1 text-sm font-medium uppercase tracking-[0.01em] text-graphite transition-colors hover:text-ink"
            >
              <ArrowLeft :size="16" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-x-0.5" />
              <span class="link-underline">Back to site</span>
            </NuxtLink>
          </div>
        </div>

        <pre class="block min-w-0 border border-line bg-card p-5 font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-ink [overflow-wrap:anywhere] md:p-8 lg:col-span-8">
# Ivan Mendoza
## Lead Software Engineer

Location: Mexico City, MX
Email: ivanmendozabaca@gmail.com
GitHub: https://github.com/ivansmb11
LinkedIn: https://www.linkedin.com/in/iván-sebastián-mendoza-baca-078429231/
Twitter: https://twitter.com/ivannsmb
Facebook: https://www.facebook.com/ivansmb11
Website: https://ivanmendoza.dev

---

## Summary

Lead Software Engineer at a Mexican BNPL and commercial-lending fintech, owning mobile and frontend architecture while contributing across the full stack and backend services. Drives engineering process improvements and code quality standards across teams. AI engineer with a focus on enterprise-grade agentic coding and agentic-first solutions to accelerate delivery and elevate developer productivity.

---

## Education

Bachelor of Engineering in IT and Digital Business
Universidad Anahuac, Queretaro (Aug 2019 - May 2023)
Elected student council leader for the Engineering program.

---

## Career

### v3.0 | ZAZPAY | Lead Software Engineer (Full-time)
Period: Jun 2023 - Present
Location: Mexico City Metropolitan Area | Hybrid
Description: Lead mobile and frontend engineering for a BNPL fintech, owning the Expo codebase and shipping releases across Play Store, App Store, and App Gallery. Drove engineering process improvements, championed AI-assisted development adoption (Cursor, Claude Code), and represented the team at the AI Engineer Code Summit in NYC.
Skills: React Native, Expo, TypeScript, Node.js, NestJS, PostgreSQL, Docker, CI/CD, AI Agents, MCP

### v2.0 | PRESTA VALE | Software Engineer (Full-time)
Period: Jun 2023 - Dec 2024 (1 yr 7 mos)
Mode: Hybrid
Description: Software engineer at Presta Vale, a micro-lending financial institution, where I developed and maintained mobile and web applications for credit origination, loan management, and collections. Focused on delivering reliable user experiences for both borrowers and internal operations teams.
Skills: React Native, TypeScript, REST APIs, Mobile Development, CI/CD

### v1.0 | GE Aerospace | Software Developer Intern
Period: Jun 2022 - Jun 2023 (1 yr)
Location: El Marques, Queretaro, Mexico
Description: Developed backend services for aviation and engineering operations using Spring Boot, Java, and PostgreSQL. Worked alongside senior engineers in a high-standards environment emphasizing clean architecture, thorough code reviews, and disciplined Git workflows.
Skills: Spring Boot, Java, PostgreSQL, Vue.js, Agile/Lean

---

## Projects

### Vibebify
A music-focused social media web app with a punk/rock aesthetic. Sign in with Spotify, explore your listening stats, share posts about songs, follow other users, view your Genre DNA, compete in song duels, and maintain daily posting streaks. Early-inspired by Receiptify (https://github.com/michellexliu/receiptify) by Michelle Liu. Built with Next.js 16, TypeScript, Supabase (PostgreSQL + RLS), Spotify OAuth, React Aria, Tailwind CSS v4, Zod v4, Bun, and deployed on Vercel. Client-first architecture with direct Supabase calls, only 3 API routes for server secrets.
Tech: Next.js 16, Supabase, PostgreSQL, Spotify API, Social Media
GitHub: https://github.com/ivansmb11/vibebify
Live: https://vibebify.ivanmendoza.dev
Showcase: https://ivanmendoza.dev/vibebify

### VIP Data Concierge
A Zero-Trust AI Agent on GCP that routes queries to isolated databases based on user identity. Hub-and-Spoke VPC networking with NCC, Private Service Connect, Vertex AI Gemini, and LangChain Function Calling.
Tech: GCP, Vertex AI, LangChain, Cloud Run, PostgreSQL, Zero-Trust
GitHub: https://github.com/ivansmb11/vip-data-concierge
Showcase: https://ivanmendoza.dev/concierge

### ivanmendoza.dev
Bilingual personal portfolio built with Nuxt 4, Vue 3, and Tailwind CSS v4. A bold, type-led layout with scroll-reveal animations and a plain-text page for AI agents.
Tech: Nuxt 4, Vue 3, Tailwind CSS v4, Nuxt i18n
GitHub: https://github.com/ivansmb11/ivan-dev
Live: https://ivanmendoza.dev

---

## Achievements

### AI Engineer Code Summit
Issuer: AI Engineer
Date: 2025
Location: New York City

### Sociedad de Alumnos Anahuac
Issuer: Universidad Anahuac Queretaro
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

Vue.js, React Native, TypeScript, Node.js, NestJS, PostgreSQL, Tailwind CSS, Vite, REST APIs, Firebase, CI/CD, Git, Spring Boot, Expo, JavaScript, Zustand, React Query, Docker, Python, Redis, Neo4J, MCP, AI Agents

---

## Skills
Languages: TypeScript, Java, Python
Tools/Frameworks: NestJS, Expo, Spring, Docker, MCP
Databases: PostgreSQL, Neo4J, Redis
Other: Leadership, AI Agents, Cloud services (GCP)

---

## Conference
AI Engineer Code Summit, New York City, 2025

---

## Stats
- 4+ Years of Experience
- 3 Companies
- 5+ Projects Built
- 15+ Technologies

---

## Availability
Status: Available for new opportunities
Contact: ivanmendozabaca@gmail.com</pre>
      </div>
    </div>
  </main>
</template>
