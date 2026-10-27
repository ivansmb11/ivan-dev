<script setup>
import AsteriskMark from './AsteriskMark.vue'

// The "MICHAEL® / CONTACT ME / ©2026 [Scroll to Explore]" header from the references.
defineProps({
  title: { type: String, required: true },
  kicker: { type: String, default: 'Ivan Mendoza' },
  as: { type: String, default: 'h1' },
})

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <div>
    <p class="flex items-start gap-0.5 text-sm font-bold uppercase tracking-tight sm:text-base">
      {{ kicker }}<AsteriskMark class="size-2.5 text-accent" :weight="2.2" />
    </p>
    <div class="mt-1 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
      <component :is="as" class="min-w-0 font-display text-display-xl uppercase [overflow-wrap:anywhere]">
        {{ title }}
      </component>
      <p class="flex shrink-0 items-baseline gap-2 text-sm lg:pb-[0.6em]">
        <span class="text-base font-bold">©{{ year }}</span>
        <span class="text-graphite">[{{ t('hero.scroll') }}]</span>
      </p>
    </div>
    <slot />
  </div>
</template>
