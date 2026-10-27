<script setup>
// Two-tone display heading from the references: lead words in ink, the rest in graphite.
defineProps({
  lead: { type: String, required: true },
  rest: { type: String, default: '' },
  as: { type: String, default: 'h2' },
  size: { type: String, default: 'lg' },
  tone: { type: String, default: 'ink' },
})

const sizes = {
  xl: 'text-display-xl',
  lg: 'text-display-lg',
  md: 'text-display-md',
}

const tones = {
  ink: ['text-ink', 'text-graphite'],
  light: ['text-white', 'text-white/60'],
}
</script>

<template>
  <component
    :is="as"
    class="min-w-0 font-display uppercase [overflow-wrap:anywhere]"
    :class="sizes[size]"
  >
    <span :class="tones[tone][0]">{{ lead }}</span>
    <template v-if="rest">{{ ' ' }}<span :class="tones[tone][1]">{{ rest }}</span></template>
  </component>
</template>
