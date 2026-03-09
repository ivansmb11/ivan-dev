<script setup>
import { useI18n } from 'vue-i18n'
import { Github, Linkedin, Twitter, Mail, Facebook, ArrowUpRight } from 'lucide-vue-next'
import { useTheme } from '@/stores/useThemeStore'

const { t } = useI18n()
const { theme } = useTheme()

const year = new Date().getFullYear()

const socials = [
  { icon: Facebook, href: 'https://www.facebook.com/ivansmb11', label: 'Facebook' },
  { icon: Github, href: 'https://github.com/ivansmb11', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/iv%C3%A1n-sebasti%C3%A1n-mendoza-baca-078429231/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/ivannsmb', label: 'Twitter' },
  { icon: Mail, href: 'mailto:ivan.mendoza32@anahuac.mx', label: 'Email' },
]

const navLinks = [
  { key: 'nav.home', href: '#hero' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.career', href: '#career' },
  { key: 'nav.portfolio', href: '#portfolio' },
  { key: 'nav.contact', href: '#contact' },
]

function scrollTo(href) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative pt-24 pb-12 overflow-hidden">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Top area -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">
        <div>
          <p class="font-mono text-xs text-primary tracking-widest uppercase mb-4 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {{ t('footer.available') }}
          </p>
          <h2 class="text-4xl md:text-6xl font-bold tracking-tight leading-none" :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'">
            Ivan<br />
            <span :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'">Mendoza</span>
          </h2>
        </div>

        <nav class="flex flex-col gap-2">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click.prevent="scrollTo(link.href)"
            class="nav-link text-sm transition-colors w-fit"
            :class="theme === 'dark' ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-zinc-900'"
          >
            {{ t(link.key) }}
          </a>
        </nav>
      </div>

      <div class="border-t mb-8" :class="theme === 'dark' ? 'border-zinc-800/60' : 'border-zinc-200'" />

      <!-- Bottom bar -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-5">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.label"
            class="hover:text-primary transition-colors duration-300"
            :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
          >
            <component :is="social.icon" :size="18" />
          </a>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3 text-xs" :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'">
          <span>{{ t('footer.designed') }}</span>
          <span class="hidden sm:inline" :class="theme === 'dark' ? 'text-zinc-800' : 'text-zinc-300'">/</span>
          <a
            href="https://github.com/ivansmb11/ivan-dev"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 hover:text-primary transition-colors"
            :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'"
          >
            {{ t('footer.source') }}
            <ArrowUpRight :size="12" />
          </a>
          <span class="hidden sm:inline" :class="theme === 'dark' ? 'text-zinc-800' : 'text-zinc-300'">/</span>
          <span>{{ t('footer.rights', { year }) }}</span>
        </div>
      </div>

    </div>
  </footer>
</template>
