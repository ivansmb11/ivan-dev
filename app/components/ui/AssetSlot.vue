<script setup>
import { computed } from 'vue'
import { slots, slotSrc } from '@/assets/slots'

// The caller sizes the box (aspect-* or explicit height); the image or placeholder fills it.
const props = defineProps({
  id: { type: String, required: true },
  alt: { type: String, default: '' },
  tone: { type: String, default: 'light' },
  fit: { type: String, default: 'cover' },
  position: { type: String, default: 'center' },
  fallbackText: { type: String, default: '' },
  compact: { type: Boolean, default: false },
  eager: { type: Boolean, default: false },
})

const src = computed(() => slotSrc(props.id))
const meta = computed(() => slots[props.id] ?? { label: props.id, size: '' })

const tones = {
  light: 'bg-mist text-graphite',
  white: 'bg-card text-graphite',
  dark: 'bg-night text-white/75',
  ember: 'bg-ember-deep/45 text-white/85',
}
</script>

<template>
  <div class="overflow-hidden" :class="src ? '' : tones[tone]">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      decoding="async"
      class="block size-full"
      :style="{ objectFit: fit, objectPosition: position }"
    />
    <div
      v-else
      :role="alt ? 'img' : undefined"
      :aria-label="alt ? `${alt} (image placeholder)` : undefined"
      :aria-hidden="alt ? undefined : 'true'"
      :title="`${id}: ${meta.label} · ${meta.size}`"
      class="placeholder-hatch flex size-full flex-col border border-dashed border-current/25 font-mono text-[10px] leading-tight uppercase tracking-wide"
      :class="compact ? 'items-center justify-center gap-0.5 p-1.5 text-center' : 'justify-between gap-2 p-2.5'"
    >
      <template v-if="compact">
        <span
          v-if="fallbackText"
          class="max-w-full truncate font-sans text-sm font-bold normal-case tracking-tight opacity-75"
        >{{ fallbackText }}</span>
        <span class="max-w-full text-[9px] opacity-80 [overflow-wrap:anywhere]">IMG · {{ id }}</span>
      </template>
      <template v-else>
        <span class="w-fit max-w-full bg-current/10 px-1.5 py-0.5 [overflow-wrap:anywhere]">IMG · {{ id }}</span>
        <span
          v-if="fallbackText"
          class="self-center text-center font-sans text-base font-bold normal-case tracking-tight opacity-70"
        >{{ fallbackText }}</span>
        <span class="opacity-80">{{ meta.label }}<br />{{ meta.size }}</span>
      </template>
    </div>
  </div>
</template>
