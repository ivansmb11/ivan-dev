<script setup>
import { useI18n } from 'vue-i18n'
import { Shield, Users, DollarSign, ShieldAlert } from 'lucide-vue-next'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'
import { reveal } from '@/motion'

const { t } = useI18n()
const YOUTUBE_ID = '3ATSpNSdtiw'

const scenarios = [
  {
    icon: Users,
    label: 'HR User',
    labelKey: 'concierge.scenarioHrLabel',
    email: 'hr@example.com',
    descKey: 'concierge.scenarioHr',
  },
  {
    icon: DollarSign,
    label: 'Finance User',
    labelKey: 'concierge.scenarioFinLabel',
    email: 'finance@example.com',
    descKey: 'concierge.scenarioFin',
  },
  {
    icon: ShieldAlert,
    label: 'Unauthorized User',
    labelKey: 'concierge.scenarioHackerLabel',
    email: 'hacker@evil.com',
    descKey: 'concierge.scenarioHacker',
    denied: true,
  },
]
</script>

<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
    <figure v-motion="reveal()" class="rounded-[3px] bg-onyx p-2 text-white lg:col-span-8 dark:ring-1 dark:ring-line">
      <iframe
        :src="`https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0`"
        :title="`${t('concierge.title')} | ${t('concierge.demoTitle')}`"
        class="block aspect-video w-full rounded-[2px] border-0 bg-night"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <figcaption class="flex items-center justify-between gap-4 px-1.5 pt-2.5 pb-1 text-[13px]">
        <span class="flex min-w-0 items-center gap-1.5 font-medium uppercase">
          <AsteriskMark class="size-3 shrink-0 text-accent" />
          <span class="truncate">{{ t('concierge.title') }}</span>
        </span>
        <span class="shrink-0 text-white/70">/{{ t('concierge.demoTitle') }}</span>
      </figcaption>
    </figure>

    <ul class="grid grid-cols-1 gap-3 md:grid-cols-3 lg:col-span-4 lg:grid-cols-1 lg:grid-rows-3">
      <li
        v-for="s in scenarios"
        :key="s.label"
        class="flex min-h-[11rem] flex-col justify-between gap-6 rounded-[3px] bg-mist p-5 lg:min-h-0"
      >
        <div class="flex items-start justify-between gap-3">
          <h3 class="text-sm text-graphite">{{ t(s.labelKey, s.label) }}:</h3>
          <component
            :is="s.icon"
            :size="18"
            :stroke-width="1.75"
            aria-hidden="true"
            class="shrink-0"
            :class="s.denied ? 'text-accent' : 'text-ink'"
          />
        </div>
        <div>
          <p class="text-lg leading-tight font-bold tracking-[-0.02em] [overflow-wrap:anywhere] md:max-lg:text-base">{{ s.email }}</p>
          <p class="mt-2 text-[13px] leading-relaxed text-graphite">{{ t(s.descKey) }}</p>
        </div>
      </li>
    </ul>

    <p class="flex items-start gap-3 rounded-[3px] border border-l-[3px] border-line border-l-accent bg-card p-4 text-sm leading-relaxed text-graphite sm:p-5 lg:col-span-8">
      <Shield :size="18" :stroke-width="1.75" aria-hidden="true" class="mt-0.5 shrink-0 text-accent" />
      <span>{{ t('concierge.securityNote') }}</span>
    </p>
  </div>
</template>
