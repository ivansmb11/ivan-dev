<script setup>
import ConciergeDoc from '@/components/concierge/ConciergeDoc.vue'
import NetworkDiagram from '@/components/concierge/NetworkDiagram.vue'
import ConciergeChat from '@/components/concierge/ConciergeChat.vue'
import { useTheme } from '@/stores/useThemeStore'
import { ArrowLeft } from 'lucide-vue-next'

const { theme } = useTheme()
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
        Back to Portfolio
      </router-link>

      <!-- Hero -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <span
            class="text-xs font-mono uppercase tracking-widest"
            :class="theme === 'dark' ? 'text-primary' : 'text-primary-dark'"
          >Live Demo</span>
        </div>
        <h1
          class="text-4xl sm:text-5xl font-display font-bold mb-4"
          :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
        >
          VIP Data Concierge
        </h1>
        <p
          class="text-lg max-w-2xl"
          :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
        >
          A Zero-Trust AI Agent that routes queries to isolated databases
          based on user identity. Built on GCP with Hub-and-Spoke networking,
          Private Service Connect, and Vertex AI.
        </p>
      </div>

      <!-- Section nav -->
      <div
        class="flex gap-1 p-1 rounded-lg mb-12 w-fit"
        :class="theme === 'dark' ? 'bg-surface-light' : 'bg-zinc-200'"
      >
        <a
          v-for="section in ['Documentation', 'Architecture', 'Live Chat']"
          :key="section"
          :href="'#' + section.toLowerCase().replace(' ', '-')"
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          :class="theme === 'dark'
            ? 'text-zinc-400 hover:text-white hover:bg-surface-lighter'
            : 'text-zinc-600 hover:text-zinc-900 hover:bg-white'"
        >{{ section }}</a>
      </div>

      <!-- Documentation -->
      <section id="documentation" class="mb-20">
        <ConciergeDoc />
      </section>

      <!-- Architecture Diagram -->
      <section id="architecture" class="mb-20">
        <NetworkDiagram />
      </section>

      <!-- Live Chat -->
      <section id="live-chat">
        <ConciergeChat />
      </section>
    </div>
  </div>
</template>
