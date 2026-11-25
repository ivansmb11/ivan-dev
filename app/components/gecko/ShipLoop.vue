<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { GitCommitHorizontal, Package, ShieldCheck, Rocket, ClipboardCheck, Sparkles, Undo2 } from 'lucide-vue-next'
import { shipLoop } from '@/content/gecko'

// Code push to Reflection and back: the active step walks the track, and the eval gate counts its Scenarios.
const { t, locale } = useI18n()
const steps = computed(() => shipLoop[locale.value] ?? shipLoop.en)
const icons = [GitCommitHorizontal, Package, ShieldCheck, Rocket, ClipboardCheck, Sparkles]
const active = ref(0)
const passed = ref(30)
const root = ref(null)
let timer
let counter
let visible = false
let reduce = false

const badges = computed(() => [
  'git push',
  'sha256:a3f9…',
  `${passed.value}/30 critical ✓`,
  'cohort 5% → 100%',
  t('gecko.shipAgree'),
  t('gecko.shipScenario'),
])

function countUp() {
  clearInterval(counter)
  if (reduce) return
  passed.value = 0
  counter = setInterval(() => {
    passed.value++
    if (passed.value >= 30) clearInterval(counter)
  }, 55)
}

function show(i) {
  active.value = i
  if (i === 2) countUp()
}

let io
onMounted(() => {
  reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  io = new IntersectionObserver((es) => { visible = es[0].isIntersecting }, { threshold: 0.3 })
  io.observe(root.value)
  if (reduce) return
  timer = setInterval(() => { if (visible && !document.hidden) show((active.value + 1) % 6) }, 2600)
})
onBeforeUnmount(() => { clearInterval(timer); clearInterval(counter); io?.disconnect() })
</script>

<template>
  <div ref="root">
    <div class="relative hidden h-1 overflow-hidden rounded-full bg-line lg:block" aria-hidden="true">
      <div class="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-700 ease-out-quint" :style="{ width: `${((active + 1) / 6) * 100}%` }" />
    </div>
    <ol class="mt-0 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:mt-4 lg:grid-cols-6 lg:gap-2">
      <li v-for="(s, i) in steps" :key="i">
        <button
          type="button"
          class="flex h-full w-full cursor-pointer flex-col gap-4 rounded-glass p-4 text-left transition-all duration-500 lg:min-h-64"
          :class="active === i ? 'bg-ink text-paper lg:-translate-y-1' : 'glass text-ink'"
          @click="show(i)"
        >
          <span class="flex items-center justify-between">
            <component :is="icons[i]" :size="20" aria-hidden="true" :class="active === i ? 'text-accent' : 'text-graphite'" />
            <span class="text-xs font-medium tabular-nums" :class="active === i ? 'text-paper/60' : 'text-graphite'">{{ String(i + 1).padStart(2, '0') }}</span>
          </span>
          <span class="text-[15px] font-semibold leading-snug">{{ s[0] }}</span>
          <span class="text-[13.5px] leading-snug" :class="active === i ? 'text-paper/75' : 'text-graphite'">{{ s[1] }}</span>
          <span
            class="mt-auto w-fit rounded-full px-2.5 py-1 font-mono text-[11px] transition-all duration-500"
            :class="active === i ? 'bg-accent/25 text-paper opacity-100' : 'glass-tint text-graphite opacity-70'"
          >{{ badges[i] }}</span>
        </button>
      </li>
    </ol>
    <p class="mt-4 flex items-center gap-2 text-[13px] text-graphite">
      <Undo2 :size="15" aria-hidden="true" class="shrink-0 text-accent" :class="{ 'animate-pulse': active === 5 }" />
      {{ t('gecko.shipBack') }}
    </p>
  </div>
</template>
