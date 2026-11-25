<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import GeckoBlob from './GeckoBlob.vue'
import { runLoop } from '@/content/gecko'

// The wake loop as a ring: a pulse travels station to station, and the caption follows it.
const { t, locale } = useI18n()
const steps = computed(() => runLoop[locale.value] ?? runLoop.en)
const n = 6
const moods = ['sleep', 'happy', 'think', 'think', 'neutral', 'sleep']
const active = ref(0)
const turns = ref(0)
const paused = ref(false)
let timer

const R = 150
const C = 200
const pos = (i) => {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) }
}
const angle = computed(() => (turns.value * n + active.value) * (360 / n))

function advance() {
  if (active.value === n - 1) turns.value++
  active.value = (active.value + 1) % n
}
function pick(i) {
  paused.value = true
  if (i < active.value) turns.value++
  active.value = i
}

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => { if (!paused.value && !document.hidden) advance() }, 2600)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="grid items-center gap-8 md:grid-cols-2 md:gap-10">
    <div class="relative mx-auto aspect-square w-full max-w-[400px]">
      <svg viewBox="0 0 400 400" class="absolute inset-0 size-full" aria-hidden="true">
        <circle :cx="C" :cy="C" :r="R" class="track" />
        <circle :cx="C" :cy="C" :r="R" class="track-flow" />
        <g class="orbit" :style="{ transform: `rotate(${angle}deg)` }">
          <circle :cx="C" :cy="C - R" r="9" class="pulse" />
          <circle :cx="C" :cy="C - R" r="5" class="dot" />
        </g>
      </svg>
      <button
        v-for="(s, i) in steps"
        :key="i"
        type="button"
        class="station absolute flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[13px] font-bold tabular-nums transition-all duration-500"
        :class="active === i ? 'scale-110 bg-ink text-paper' : 'glass text-ink hover:scale-105'"
        :style="{ left: `${pos(i).x / 4}%`, top: `${pos(i).y / 4}%` }"
        :aria-label="s[0]"
        :aria-pressed="active === i"
        @click="pick(i)"
      >{{ String(i + 1).padStart(2, '0') }}</button>
      <div class="absolute inset-[26%] flex flex-col items-center justify-center text-center">
        <GeckoBlob tone="agent" :mood="moods[active]" size="sm" />
        <p class="mt-2 text-[11px] font-medium uppercase tracking-[0.04em] text-graphite">{{ t('gecko.loopCenter') }}</p>
      </div>
    </div>

    <ol class="flex flex-col gap-1.5">
      <li v-for="(s, i) in steps" :key="i">
        <button
          type="button"
          class="flex w-full cursor-pointer gap-3.5 rounded-glass px-4 py-3 text-left transition-all duration-500"
          :class="active === i ? 'bg-ink text-paper' : 'glass text-ink'"
          @click="pick(i)"
        >
          <span class="mt-0.5 shrink-0 text-xs font-medium tabular-nums" :class="active === i ? 'text-accent' : 'text-graphite'">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="min-w-0">
            <span class="block text-[15px] font-semibold leading-snug">{{ s[0] }}</span>
            <span
              class="grid transition-[grid-template-rows,opacity] duration-500"
              :class="active === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
            ><span class="overflow-hidden text-[14px] leading-snug text-paper/75">{{ s[1] }}</span></span>
          </span>
        </button>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.track { fill: none; stroke: var(--color-line); stroke-width: 2; }
.track-flow { fill: none; stroke: var(--color-accent); stroke-width: 2; stroke-dasharray: 2 14; stroke-linecap: round; opacity: 0.55; animation: flow 1.4s linear infinite; }
.orbit { transform-origin: 200px 200px; transition: transform 1.2s cubic-bezier(0.65, 0, 0.35, 1); }
.dot { fill: var(--color-accent); }
.pulse { fill: var(--color-accent); opacity: 0.25; animation: pulse 1.3s ease-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes flow { to { stroke-dashoffset: -32; } }
@keyframes pulse { 0% { transform: scale(0.6); opacity: 0.5; } 100% { transform: scale(2.2); opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .track-flow, .pulse { animation: none; }
  .orbit { transition: none; }
}
</style>
