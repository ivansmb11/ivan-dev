<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ExternalLink, Github } from 'lucide-vue-next'
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
    <div class="max-w-6xl mx-auto px-6">
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

      <div class="space-y-12">
        <div
          v-for="(project, i) in projects"
          :key="project.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: i * 150 } }"
          class="group"
          :class="{ 'opacity-50': project.placeholder }"
        >
          <div class="flex items-start justify-between mb-2">
            <h3 class="text-xl font-semibold text-white group-hover:text-primary transition-colors">
              {{ project.title }}
            </h3>
            <div class="flex gap-3 shrink-0 ml-4" v-if="!project.placeholder">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="text-zinc-500 hover:text-primary transition-colors"
              >
                <Github :size="18" />
              </a>
              <a
                v-if="project.live"
                :href="project.live"
                target="_blank"
                rel="noopener noreferrer"
                class="text-zinc-500 hover:text-primary transition-colors"
              >
                <ExternalLink :size="18" />
              </a>
            </div>
          </div>

          <p class="text-sm text-zinc-400 leading-relaxed mb-3 max-w-2xl">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-x-2 gap-y-1">
            <span
              v-for="(tag, ti) in project.tags"
              :key="tag"
              class="text-xs font-mono text-zinc-500"
            >{{ tag }}<span v-if="ti < project.tags.length - 1" class="text-zinc-700"> &middot;</span></span>
          </div>

          <div v-if="i < projects.length - 1" class="mt-10 border-b border-zinc-800/50" />
        </div>
      </div>
    </div>
  </section>
</template>
