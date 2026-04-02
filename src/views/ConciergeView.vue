<script setup>
import { useI18n } from 'vue-i18n'
import ConciergeDoc from '@/components/concierge/ConciergeDoc.vue'
import NetworkDiagram from '@/components/concierge/NetworkDiagram.vue'
import ConciergeChat from '@/components/concierge/ConciergeChat.vue'
import { useTheme } from '@/stores/useThemeStore'
import { ArrowLeft, Github } from 'lucide-vue-next'

const { t } = useI18n()
const { theme } = useTheme()

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
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
        {{ t('concierge.back') }}
      </router-link>

      <!-- Hero -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <span
            class="text-xs font-mono uppercase tracking-widest"
            :class="theme === 'dark' ? 'text-primary' : 'text-primary-dark'"
          >{{ t('concierge.badge') }}</span>
        </div>
        <h1
          class="text-4xl sm:text-5xl font-display font-bold mb-4"
          :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
        >
          {{ t('concierge.title') }}
        </h1>
        <p
          class="text-lg max-w-2xl mb-5"
          :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
        >
          {{ t('concierge.subtitle') }}
        </p>
        <a
          href="https://github.com/ivansmb11/vip-data-concierge"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
          :class="theme === 'dark'
            ? 'bg-surface-light border-zinc-700 text-zinc-300 hover:text-white hover:border-primary/40'
            : 'bg-white border-zinc-300 text-zinc-700 hover:text-zinc-900 hover:border-primary/40 shadow-sm'"
        >
          <Github :size="16" />
          {{ t('concierge.viewSource') }}
        </a>
      </div>

      <!-- Section nav -->
      <div
        class="flex gap-1 p-1 rounded-lg mb-12 w-fit"
        :class="theme === 'dark' ? 'bg-surface-light' : 'bg-zinc-200'"
      >
        <button
          v-for="{ labelKey, id } in [
            { labelKey: 'concierge.navDocs', id: 'documentation' },
            { labelKey: 'concierge.navArch', id: 'architecture' },
            { labelKey: 'concierge.navDemo', id: 'live-chat' },
          ]"
          :key="id"
          @click="scrollToSection(id)"
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
          :class="theme === 'dark'
            ? 'text-zinc-400 hover:text-white hover:bg-surface-lighter'
            : 'text-zinc-600 hover:text-zinc-900 hover:bg-white'"
        >{{ t(labelKey) }}</button>
      </div>

      <!-- Documentation -->
      <section id="documentation" class="mb-20">
        <ConciergeDoc />
      </section>

      <!-- Architecture Diagram -->
      <section id="architecture" class="mb-20">
        <NetworkDiagram />
      </section>

      <!-- Demo -->
      <section id="live-chat">
        <ConciergeChat />
      </section>
    </div>
  </div>
</template>
