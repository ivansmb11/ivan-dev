<script setup>
import { computed } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import { NuxtLink } from '#components'

// "BOOK A CALL" button from the references: accent rule on the left, arrow square on the right.
const props = defineProps({
  href: { type: String, default: '' },
  to: { type: String, default: '' },
  type: { type: String, default: 'button' },
  tone: { type: String, default: 'mist' },
  external: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'button'))

const attrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) {
    return props.external ? { href: props.href, target: '_blank', rel: 'noopener noreferrer' } : { href: props.href }
  }
  return { type: props.type, disabled: props.disabled }
})

const tones = {
  mist: 'bg-mist text-ink hover:bg-ink hover:text-paper',
  white: 'bg-white text-onyx hover:bg-onyx hover:text-white',
  ink: 'bg-ink text-paper hover:bg-accent-deep hover:text-white',
}
</script>

<template>
  <component
    :is="tag"
    v-bind="attrs"
    class="group inline-flex min-h-11 items-center justify-between gap-6 whitespace-nowrap rounded-[3px] border-l-[3px] border-accent py-1.5 pr-1.5 pl-4 text-sm font-medium uppercase tracking-[0.01em] transition-[background-color,color] duration-300 active:translate-y-px disabled:pointer-events-none disabled:opacity-50"
    :class="tones[tone]"
  >
    <span><slot /></span>
    <span class="grid size-8 shrink-0 place-items-center rounded-[2px] bg-accent text-white transition-transform duration-300 group-hover:rotate-45">
      <ArrowUpRight :size="16" :stroke-width="2" aria-hidden="true" />
    </span>
  </component>
</template>
