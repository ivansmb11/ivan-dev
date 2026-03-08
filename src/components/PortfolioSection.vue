<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ExternalLink, Github, FolderOpen } from 'lucide-vue-next'
import portfolioImg from '@/assets/portfolio.jpg'

const { t } = useI18n()

const projects = computed(() => [
  {
    title: 'Vibebify',
    description: t('portfolio.vibebify'),
    tags: ['Spotify API', 'Social Media', 'Web App'],
    github: 'https://github.com/ivansmb11/vibebify',
    live: 'https://vibebify.ivanmendoza.dev',
  },
  {
    title: 'ivan.dev',
    description: t('portfolio.ivanDev'),
    tags: ['Vue 3', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/ivansmb11/ivan-dev',
  },
  {
    title: t('portfolio.comingSoon'),
    description: t('portfolio.comingSoonText'),
    tags: ['In Progress'],
    placeholder: true,
  },
])
</script>

<template>
  <section id="portfolio" class="relative py-32 overflow-hidden">
    <!-- Parallax background -->
    <div
      class="absolute inset-0 parallax-bg opacity-5"
      :style="{ backgroundImage: `url(${portfolioImg})` }"
    />
    <div class="absolute inset-0 bg-zinc-950/80" />

    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <!-- Section header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="mb-16"
      >
        <p class="text-primary font-mono text-sm tracking-widest uppercase mb-3">{{ t('portfolio.label') }}</p>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight">{{ t('portfolio.title') }}</h2>
        <div class="mt-4 h-1 w-16 bg-primary rounded-full" />
      </div>

      <!-- Project cards -->
      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="(project, i) in projects"
          :key="project.title"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: i * 150 } }"
          class="group relative p-6 rounded-2xl bg-surface border border-zinc-800 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
          :class="{ 'opacity-60': project.placeholder }"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="p-2.5 rounded-xl bg-primary/10 text-primary">
              <FolderOpen :size="24" />
            </div>
            <div class="flex gap-3" v-if="!project.placeholder">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="text-zinc-500 hover:text-primary transition-colors"
              >
                <Github :size="20" />
              </a>
              <a
                v-if="project.live"
                :href="project.live"
                target="_blank"
                rel="noopener noreferrer"
                class="text-zinc-500 hover:text-primary transition-colors"
              >
                <ExternalLink :size="20" />
              </a>
            </div>
          </div>

          <h3 class="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors">
            {{ project.title }}
          </h3>
          <p class="text-sm text-zinc-400 leading-relaxed mb-6">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="text-xs font-mono px-3 py-1 rounded-full bg-zinc-800 text-zinc-400"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
