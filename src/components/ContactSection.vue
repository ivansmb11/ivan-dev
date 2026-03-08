<script setup>
import { useI18n } from 'vue-i18n'
import { Github, Linkedin, Twitter, Mail, Facebook, Heart } from 'lucide-vue-next'

const { t } = useI18n()

const socials = [
  { icon: Facebook, href: 'https://www.facebook.com/ivansmb11', label: 'Facebook' },
  { icon: Github, href: 'https://github.com/ivansmb11', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/iv%C3%A1n-sebasti%C3%A1n-mendoza-baca-078429231/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/ivannsmb', label: 'Twitter' },
  { icon: Mail, href: 'mailto:ivan.mendoza32@anahuac.mx', label: 'Email' },
]
</script>

<template>
  <section id="contact" class="relative py-32 overflow-hidden">
    <div class="max-w-3xl mx-auto px-6 text-center">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <p class="text-primary font-mono text-sm tracking-widest uppercase mb-3">{{ t('contact.label') }}</p>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight mb-6">{{ t('contact.title') }}</h2>
        <div class="mx-auto h-1 w-16 bg-primary rounded-full mb-8" />
      </div>

      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
        class="text-zinc-400 text-lg leading-relaxed mb-10"
      >
        {{ t('contact.text') }}
      </p>

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 400 } }"
        class="flex items-center justify-center gap-4 mb-8"
      >
        <a
          v-for="social in socials"
          :key="social.label"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.label"
          class="group p-4 rounded-2xl bg-surface border border-zinc-800 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
        >
          <component
            :is="social.icon"
            :size="22"
            class="text-zinc-400 group-hover:text-primary transition-colors duration-300"
          />
        </a>
      </div>

      <a
        href="mailto:ivan.mendoza32@anahuac.mx"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :visible-once="{ opacity: 1, scale: 1, transition: { duration: 400, delay: 600 } }"
        class="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary hover:bg-primary-dark text-zinc-950 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
      >
        <Mail :size="18" />
        {{ t('contact.cta') }}
      </a>
    </div>

    <!-- Footer -->
    <div class="mt-24 pt-8 border-t border-zinc-800/50 text-center">
      <p class="text-sm text-zinc-600 flex items-center justify-center gap-1">
        {{ t('footer.built', { icon: '' }) }}
        <Heart :size="14" class="text-primary" />
      </p>
    </div>
  </section>
</template>
