<script setup>
import { useI18n } from 'vue-i18n'
import { Github, Linkedin, Twitter, Mail, Facebook, ArrowUpRight } from 'lucide-vue-next'

const { t } = useI18n()

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
  <footer class="relative pt-24 pb-8 overflow-hidden">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Top area -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">
        <!-- Big name + tagline -->
        <div>
          <p class="font-mono text-xs text-primary tracking-widest uppercase mb-4 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {{ t('footer.available') }}
          </p>
          <h2 class="text-4xl md:text-6xl font-bold tracking-tight leading-none">
            Ivan<br />
            <span class="text-zinc-600">Mendoza</span>
          </h2>
        </div>

        <!-- Nav links column -->
        <nav class="flex flex-col gap-2">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click.prevent="scrollTo(link.href)"
            class="text-sm text-zinc-500 hover:text-white transition-colors"
          >
            {{ t(link.key) }}
          </a>
        </nav>
      </div>

      <!-- Divider -->
      <div class="border-t border-zinc-800/60 mb-8" />

      <!-- Bottom bar -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
        <!-- Socials -->
        <div class="flex items-center gap-5">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.label"
            class="text-zinc-600 hover:text-primary transition-colors duration-300"
          >
            <component :is="social.icon" :size="18" />
          </a>
        </div>

        <!-- Credits -->
        <div class="flex flex-col sm:flex-row items-center gap-3 text-xs text-zinc-600">
          <span>{{ t('footer.designed') }}</span>
          <span class="hidden sm:inline text-zinc-800">/</span>
          <a
            href="https://github.com/ivansmb11/ivan-dev"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-zinc-500 hover:text-primary transition-colors"
          >
            {{ t('footer.source') }}
            <ArrowUpRight :size="12" />
          </a>
          <span class="hidden sm:inline text-zinc-800">/</span>
          <span>{{ t('footer.rights', { year }) }}</span>
        </div>
      </div>

    </div>
  </footer>
</template>
