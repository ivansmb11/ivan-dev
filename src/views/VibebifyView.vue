<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/stores/useThemeStore'
import { ArrowLeft, Github, ExternalLink, Music, Users, Dna, Swords, Flame, Search } from 'lucide-vue-next'
import ArchitectureDiagram from '@/components/vibebify/ArchitectureDiagram.vue'

import landingImg from '@/assets/vibebify/landing.webp'
import feedImg from '@/assets/vibebify/feed.webp'
import dnaImg from '@/assets/vibebify/dna.webp'
import duelsImg from '@/assets/vibebify/duels.webp'
import statsImg from '@/assets/vibebify/stats.webp'
import profileImg from '@/assets/vibebify/profile.webp'
import composeImg from '@/assets/vibebify/compose.webp'

const { t } = useI18n()
const { theme } = useTheme()

const features = [
  { key: 'spotify', icon: Music, img: statsImg },
  { key: 'feed', icon: Users, img: feedImg },
  { key: 'dna', icon: Dna, img: dnaImg },
  { key: 'duels', icon: Swords, img: duelsImg },
  { key: 'streaks', icon: Flame, img: profileImg },
  { key: 'compose', icon: Search, img: composeImg },
]

const activeFeature = ref(0)

const stack = [
  { name: 'Next.js 16', category: 'Framework' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Spotify OAuth', category: 'Auth' },
  { name: 'React Aria', category: 'UI' },
  { name: 'Tailwind CSS v4', category: 'Styling' },
  { name: 'Zod v4', category: 'Validation' },
  { name: 'Bun', category: 'Runtime' },
  { name: 'Vercel', category: 'Hosting' },
]
</script>

<template>
  <div class="min-h-screen pt-24 pb-16 px-4 sm:px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Back link -->
      <router-link
        to="/"
        class="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors"
        :class="theme === 'dark' ? 'text-zinc-400 hover:text-primary' : 'text-zinc-500 hover:text-primary'"
      >
        <ArrowLeft :size="16" />
        {{ t('vibebify.back') }}
      </router-link>

      <!-- Hero -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-3 h-3 rounded-full bg-pink-500 animate-pulse" />
          <span
            class="text-xs font-mono uppercase tracking-widest"
            :class="theme === 'dark' ? 'text-pink-400' : 'text-pink-600'"
          >{{ t('vibebify.badge') }}</span>
        </div>
        <h1
          class="text-4xl sm:text-5xl font-display font-bold mb-4"
          :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
        >
          {{ t('vibebify.title') }}
        </h1>
        <p
          class="text-lg max-w-2xl mb-5"
          :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
        >
          {{ t('vibebify.subtitle') }}
        </p>
        <div class="flex gap-3">
          <a
            href="https://github.com/ivansmb11/vibebify"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
            :class="theme === 'dark'
              ? 'bg-surface-light border-zinc-700 text-zinc-300 hover:text-white hover:border-pink-500/40'
              : 'bg-white border-zinc-300 text-zinc-700 hover:text-zinc-900 hover:border-pink-500/40 shadow-sm'"
          >
            <Github :size="16" />
            {{ t('vibebify.viewSource') }}
          </a>
          <a
            href="https://vibebify.ivanmendoza.dev"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
            :class="theme === 'dark'
              ? 'bg-pink-500/10 border-pink-500/30 text-pink-400 hover:bg-pink-500/20 hover:border-pink-500/50'
              : 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100 hover:border-pink-300'"
          >
            <ExternalLink :size="16" />
            {{ t('vibebify.liveApp') }}
          </a>
        </div>
      </div>

      <!-- Landing screenshot -->
      <div class="mb-20">
        <div
          class="rounded-xl overflow-hidden border"
          :class="theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'"
        >
          <img
            :src="landingImg"
            alt="Vibebify Landing Page"
            class="w-full h-auto"
            loading="eager"
          />
        </div>
      </div>

      <!-- Inspiration -->
      <section class="mb-20">
        <div
          class="rounded-xl p-6 border"
          :class="theme === 'dark'
            ? 'bg-surface-light/50 border-zinc-800'
            : 'bg-zinc-50 border-zinc-200'"
        >
          <p
            class="text-sm font-mono uppercase tracking-widest mb-3"
            :class="theme === 'dark' ? 'text-pink-400' : 'text-pink-600'"
          >{{ t('vibebify.inspirationLabel') }}</p>
          <p
            class="text-sm leading-relaxed"
            :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
          >
            {{ t('vibebify.inspirationText') }}
            <a
              href="https://github.com/michellexliu/receiptify"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium transition-colors"
              :class="theme === 'dark' ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'"
            >Receiptify</a>
            {{ t('vibebify.inspirationBy') }}
          </p>
        </div>
      </section>

      <!-- Features showcase -->
      <section class="mb-20">
        <p
          class="text-sm font-mono uppercase tracking-widest mb-3"
          :class="theme === 'dark' ? 'text-pink-400' : 'text-pink-600'"
        >{{ t('vibebify.featuresLabel') }}</p>
        <h2
          class="text-3xl font-bold mb-2"
          :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
        >{{ t('vibebify.featuresTitle') }}</h2>
        <div class="mt-4 h-1 w-16 bg-pink-500 rounded-full mb-12" />

        <!-- Feature tabs -->
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Tab list -->
          <div class="lg:w-80 shrink-0 space-y-2">
            <button
              v-for="(feature, i) in features"
              :key="feature.key"
              @click="activeFeature = i"
              class="w-full text-left px-4 py-3 rounded-lg transition-all cursor-pointer flex items-start gap-3"
              :class="activeFeature === i
                ? theme === 'dark'
                  ? 'bg-pink-500/10 border border-pink-500/30'
                  : 'bg-pink-50 border border-pink-200'
                : theme === 'dark'
                  ? 'hover:bg-surface-light border border-transparent'
                  : 'hover:bg-zinc-100 border border-transparent'"
            >
              <component
                :is="feature.icon"
                :size="18"
                class="mt-0.5 shrink-0"
                :class="activeFeature === i
                  ? theme === 'dark' ? 'text-pink-400' : 'text-pink-600'
                  : theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'"
              />
              <div>
                <p
                  class="font-medium text-sm"
                  :class="activeFeature === i
                    ? theme === 'dark' ? 'text-white' : 'text-zinc-900'
                    : theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'"
                >{{ t(`vibebify.features.${feature.key}.title`) }}</p>
                <p
                  class="text-xs mt-0.5"
                  :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'"
                >{{ t(`vibebify.features.${feature.key}.short`) }}</p>
              </div>
            </button>
          </div>

          <!-- Active feature content -->
          <div class="flex-1 min-w-0">
            <div
              class="rounded-xl overflow-hidden border mb-4"
              :class="theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'"
            >
              <img
                :src="features[activeFeature].img"
                :alt="t(`vibebify.features.${features[activeFeature].key}.title`)"
                class="w-full h-auto"
                loading="lazy"
              />
            </div>
            <p
              class="text-sm leading-relaxed"
              :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
            >{{ t(`vibebify.features.${features[activeFeature].key}.detail`) }}</p>
          </div>
        </div>
      </section>

      <!-- Tech Stack -->
      <section class="mb-20">
        <p
          class="text-sm font-mono uppercase tracking-widest mb-3"
          :class="theme === 'dark' ? 'text-pink-400' : 'text-pink-600'"
        >{{ t('vibebify.stackLabel') }}</p>
        <h2
          class="text-3xl font-bold mb-2"
          :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
        >{{ t('vibebify.stackTitle') }}</h2>
        <div class="mt-4 h-1 w-16 bg-pink-500 rounded-full mb-10" />

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <div
            v-for="tech in stack"
            :key="tech.name"
            class="rounded-lg p-3 border text-center transition-colors"
            :class="theme === 'dark'
              ? 'bg-surface-light border-zinc-800 hover:border-pink-500/30'
              : 'bg-white border-zinc-200 hover:border-pink-300 shadow-sm'"
          >
            <p
              class="text-sm font-medium"
              :class="theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'"
            >{{ tech.name }}</p>
            <p
              class="text-xs mt-1"
              :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'"
            >{{ tech.category }}</p>
          </div>
        </div>
      </section>

      <!-- Architecture Diagram -->
      <section class="mb-20">
        <ArchitectureDiagram />
      </section>
    </div>
  </div>
</template>
