<script setup>
import AsteriskMark from './AsteriskMark.vue'

defineProps({
  tone: { type: String, default: 'mist' },
})

const tones = {
  mist: 'bg-mist text-ink',
  white: 'bg-white text-onyx',
  dark: 'bg-white/10 text-white',
}
</script>

<template>
  <span
    class="inline-flex w-fit items-center gap-2 rounded-[3px] px-2.5 py-1.5 text-[11px] font-medium uppercase leading-none tracking-[0.02em] sm:text-xs"
    :class="tones[tone]"
  >
    <AsteriskMark class="size-3 shrink-0 text-accent" />
    <slot />
  </span>
</template>
