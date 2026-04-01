<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Calendar, ExternalLink, Hash, MapPin } from 'lucide-vue-next'
import { useTheme } from '@/stores/useThemeStore'
import anahuacLogo from '@/assets/logos/anahuac.png'
import gcloudLogo from '@/assets/logos/gcloud.png'
import aieLogo from '@/assets/logos/aie-logo.png'

const { t } = useI18n()
const { theme } = useTheme()

const achievements = computed(() => [
  {
    key: 'summit',
    title: t('achievements.summit.title'),
    issuer: t('achievements.summit.issuer'),
    date: t('achievements.summit.date'),
    location: t('achievements.summit.location'),
    logo: aieLogo,
    url: '',
    credential: '',
    type: 'conference',
  },
  {
    key: 'saa',
    title: t('achievements.saa.title'),
    issuer: t('achievements.saa.issuer'),
    date: t('achievements.saa.date'),
    credential: t('achievements.saa.credential'),
    logo: anahuacLogo,
    url: 'https://wallet.xertify.co/certificates/7CC14A8DA001',
  },
  {
    key: 'gcloud',
    title: t('achievements.gcloud.title'),
    issuer: t('achievements.gcloud.issuer'),
    date: t('achievements.gcloud.date'),
    credential: t('achievements.gcloud.credential'),
    logo: gcloudLogo,
    url: 'https://www.skills.google/public_profiles/63a74ab3-4ba1-4a97-bcdc-83f0efdb5d28',
  },
])
</script>

<template>
  <section id="achievements" class="relative py-32 overflow-hidden">
    <!-- Section number -->
    <span
      class="absolute top-8 right-8 text-[80px] font-bold leading-none pointer-events-none select-none"
      :class="theme === 'dark' ? 'text-zinc-800/30' : 'text-zinc-300/40'"
    >04</span>

    <div class="max-w-4xl mx-auto px-6">
      <div v-motion :initial="{ opacity: 0, y: 30 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }" class="mb-16">
        <p class="text-primary font-mono text-sm tracking-widest uppercase mb-3">{{ t('achievements.label') }}</p>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight" :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'">{{ t('achievements.title') }}</h2>
        <div class="mt-4 h-1 w-16 bg-primary rounded-full" />
      </div>

      <div class="space-y-10">
        <div v-for="(item, i) in achievements" :key="item.key" v-motion :initial="{ opacity: 0, x: -30 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: i * 150 } }"
          class="group flex items-start gap-5">
          <img
            :src="item.logo"
            :alt="item.issuer"
            class="w-12 h-12 rounded-lg shrink-0"
            :class="item.key === 'gcloud' ? 'p-1.5 bg-white object-contain' : 'object-cover'"
          />

          <div class="min-w-0">
            <h3 class="text-lg font-semibold group-hover:text-primary transition-colors" :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'">
              {{ item.title }}
            </h3>

            <p class="text-sm text-primary/80 font-medium mb-2">{{ item.issuer }}</p>

            <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-3" :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'">
              <span class="flex items-center gap-1.5">
                <Calendar :size="13" />
                {{ item.date }}
              </span>
              <span v-if="item.location" class="flex items-center gap-1.5">
                <MapPin :size="13" />
                {{ item.location }}
              </span>
              <span v-if="item.credential" class="flex items-center gap-1.5">
                <Hash :size="13" />
                {{ item.credential }}
              </span>
            </div>

            <a v-if="item.url" :href="item.url" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-primary transition-colors">
              {{ t('achievements.verify') }}
              <ExternalLink :size="12" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
