<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ExternalLink, Github } from 'lucide-vue-next'
import { useTheme } from '@/stores/useThemeStore'
import vibebifyImg from '@/assets/vibebify.webp'
import ivanmendozaImg from '@/assets/ivanmendoza.webp'

const { t } = useI18n()
const { theme } = useTheme()

const projects = computed(() => [
  {
    title: 'Vibebify',
    description: t('portfolio.vibebify'),
    tags: ['Next.js 16', 'Supabase', 'PostgreSQL', 'Spotify API', 'Social Media'],
    github: 'https://github.com/ivansmb11/vibebify',
    live: '#/vibebify',
    image: vibebifyImg,
  },
  {
    title: 'ivanmendoza.dev',
    description: t('portfolio.ivanDev'),
    tags: ['Vue 3', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/ivansmb11/ivan-dev',
    image: ivanmendozaImg,
  },
  {
    title: 'VIP Data Concierge',
    description: t('portfolio.vipConcierge'),
    tags: ['GCP', 'Vertex AI', 'LangChain', 'Cloud Run', 'PostgreSQL', 'Zero-Trust'],
    github: 'https://github.com/ivansmb11/vip-data-concierge',
    live: '#/concierge',
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
    <!-- Section number -->
    <span
      class="absolute top-8 right-8 text-[80px] font-bold leading-none pointer-events-none select-none"
      :class="theme === 'dark' ? 'text-zinc-800/30' : 'text-zinc-300/40'"
    >03</span>

    <div class="max-w-6xl mx-auto px-6">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="mb-16"
      >
        <p class="text-primary font-mono text-sm tracking-widest uppercase mb-3">{{ t('portfolio.label') }}</p>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight" :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'">{{ t('portfolio.title') }}</h2>
        <div class="mt-4 h-1 w-16 bg-primary rounded-full" />
      </div>

      <div class="space-y-16">
        <div
          v-for="(project, i) in projects"
          :key="project.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: i * 150 } }"
          class="group"
          :class="{ 'opacity-50': project.placeholder }"
        >
          <div class="flex flex-col md:flex-row md:items-start md:gap-8">
            <!-- Content (left) -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-xl font-semibold transition-colors" :class="theme === 'dark' ? 'text-white group-hover:text-primary' : 'text-zinc-900 group-hover:text-primary'">
                  {{ project.title }}
                </h3>
                <div class="flex gap-3 shrink-0 ml-4" v-if="!project.placeholder">
                  <a
                    v-if="project.github"
                    :href="project.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="project.title + ' source code on GitHub'"
                    class="text-zinc-500 hover:text-primary transition-colors"
                  >
                    <Github :size="18" />
                  </a>
                  <a
                    v-if="project.live"
                    :href="project.live"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="project.title + ' live demo'"
                    class="text-zinc-500 hover:text-primary transition-colors"
                  >
                    <ExternalLink :size="18" />
                  </a>
                </div>
              </div>

              <p class="text-sm leading-relaxed mb-3" :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'">
                {{ project.description }}
              </p>

              <div class="flex flex-wrap gap-x-2 gap-y-1">
                <span
                  v-for="(tag, ti) in project.tags"
                  :key="tag"
                  class="text-xs font-mono" :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'"
                >{{ tag }}<span v-if="ti < project.tags.length - 1" :class="theme === 'dark' ? 'text-zinc-700' : 'text-zinc-300'"> &middot;</span></span>
              </div>
            </div>

            <!-- Screenshot (right) -->
            <div
              v-if="project.image"
              class="mt-4 md:mt-0 w-full md:w-64 shrink-0 rounded-xl overflow-hidden border transition-colors duration-300"
              :class="theme === 'dark' ? 'border-zinc-800/60 group-hover:border-primary/30' : 'border-zinc-200 group-hover:border-primary/30'"
            >
              <img
                :src="project.image"
                :alt="project.title + ' preview'"
                loading="lazy"
                decoding="async"
                width="256"
                height="160"
                class="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div v-if="i < projects.length - 1" class="mt-12 border-b" :class="theme === 'dark' ? 'border-zinc-800/50' : 'border-zinc-200'" />
        </div>
      </div>
    </div>
  </section>
</template>
