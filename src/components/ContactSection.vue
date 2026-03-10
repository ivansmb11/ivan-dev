<script setup>
import { useI18n } from 'vue-i18n'
import { Github, Linkedin, Twitter, Mail, Facebook } from 'lucide-vue-next'
import { useTheme } from '@/stores/useThemeStore'

const { t } = useI18n()
const { theme } = useTheme()

const socials = [
  { icon: Facebook, href: 'https://www.facebook.com/ivansmb11', label: 'Facebook' },
  { icon: Github, href: 'https://github.com/ivansmb11', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/iv%C3%A1n-sebasti%C3%A1n-mendoza-baca-078429231/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/ivannsmb', label: 'Twitter' },
  { icon: Mail, href: 'mailto:ivanmendozabaca@gmail.com', label: 'Email' },
]
</script>

<template>
  <section id="contact" class="relative py-32 overflow-hidden">
    <!-- Section number -->
    <span
      class="absolute top-8 right-8 text-[80px] font-bold leading-none pointer-events-none select-none"
      :class="theme === 'dark' ? 'text-zinc-800/30' : 'text-zinc-300/40'"
    >05</span>

    <div class="max-w-3xl mx-auto px-6 text-center">
      <!-- Availability badge -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 10 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 400 } }"
        class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border"
        :class="theme === 'dark' ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200'"
      >
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span class="text-xs font-mono" :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'">{{ t('contact.available') }}</span>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <p class="text-primary font-mono text-sm tracking-widest uppercase mb-3">{{ t('contact.label') }}</p>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight mb-6" :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'">{{ t('contact.title') }}</h2>
        <div class="mx-auto h-1 w-16 bg-primary rounded-full mb-8" />
      </div>

      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
        class="text-lg leading-relaxed mb-10"
        :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'"
      >
        {{ t('contact.text') }}
      </p>

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 400 } }"
        class="flex items-center justify-center gap-6 mb-8"
      >
        <a
          v-for="social in socials"
          :key="social.label"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.label"
          class="text-zinc-500 hover:text-primary transition-colors duration-300"
        >
          <component :is="social.icon" :size="22" />
        </a>
      </div>

      <a
        href="mailto:ivanmendozabaca@gmail.com"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :visible-once="{ opacity: 1, scale: 1, transition: { duration: 400, delay: 600 } }"
        class="btn-sweep inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary hover:bg-primary-dark text-zinc-950 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
      >
        <Mail :size="18" />
        {{ t('contact.cta') }}
      </a>
    </div>
  </section>
</template>
