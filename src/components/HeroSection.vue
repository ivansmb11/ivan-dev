<script setup>
import { useI18n } from 'vue-i18n'
import { Github, Linkedin, Twitter, Mail, Facebook, ChevronDown, MapPin } from 'lucide-vue-next'
import { useTheme } from '@/stores/useThemeStore'
import profileImg from '@/assets/me.webp'

const { t } = useI18n()
const { theme } = useTheme()

const socials = [
  { icon: Facebook, href: 'https://www.facebook.com/ivansmb11', label: 'Facebook' },
  { icon: Github, href: 'https://github.com/ivansmb11', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/iv%C3%A1n-sebasti%C3%A1n-mendoza-baca-078429231/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/ivannsmb', label: 'Twitter' },
  { icon: Mail, href: 'mailto:ivan.mendoza32@anahuac.mx', label: 'Email' },
]
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Background photo -->
    <div
      class="absolute inset-0 parallax-bg"
      :class="theme === 'dark' ? 'opacity-20' : 'opacity-10'"
      :style="{ backgroundImage: `url(${profileImg})` }"
    />

    <!-- Content -->
    <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.8 }"
        :enter="{ opacity: 1, scale: 1, transition: { delay: 200, duration: 600 } }"
        class="mb-8"
      >
        <img
          :src="profileImg"
          alt="Ivan Mendoza"
          class="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover ring-4 ring-primary/30 shadow-2xl shadow-primary/20"
        />
      </div>

      <h1
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 600 } }"
        class="text-5xl md:text-7xl font-bold tracking-tight mb-4"
        :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
      >
        {{ t('hero.greeting', { name: 'Ivan' }) }}
      </h1>

      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 600 } }"
        class="text-lg md:text-xl mb-6 leading-relaxed max-w-xl mx-auto"
        :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'"
      >
        {{ t('hero.subtitle') }}
      </p>

      <!-- Location pin -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 10 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 750, duration: 500 } }"
        class="flex items-center justify-center gap-1.5 mb-8"
      >
        <span class="relative flex items-center justify-center">
          <MapPin :size="14" class="text-primary" />
          <span class="absolute w-3 h-3 rounded-full bg-primary/30 animate-ping" />
        </span>
        <span class="text-sm font-mono" :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'">{{ t('hero.location') }}</span>
      </div>

      <!-- Social links -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 800, duration: 600 } }"
        class="flex items-center justify-center gap-4"
      >
        <a
          v-for="social in socials"
          :key="social.label"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.label"
          class="group p-3 rounded-xl border transition-all duration-300"
          :class="theme === 'dark'
            ? 'bg-zinc-800/50 hover:bg-primary/20 border-zinc-700/50 hover:border-primary/50'
            : 'bg-white/80 hover:bg-primary/10 border-zinc-200 hover:border-primary/50'"
        >
          <component
            :is="social.icon"
            :size="20"
            class="group-hover:text-primary transition-colors duration-300"
            :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'"
          />
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <a
      href="#about"
      @click.prevent="document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 hover:text-primary transition-colors animate-bounce"
      :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'"
    >
      <ChevronDown :size="28" />
    </a>
  </section>
</template>
