<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { HandCoins, IdCard, RefreshCw, CalendarClock, LifeBuoy } from 'lucide-vue-next'
import GeckoBlob from './GeckoBlob.vue'
import { uses } from '@/content/gecko'

// Same platform, different agent: switching tabs re-labels the primitives and replays a sample week.
const { t, locale } = useI18n()
const icons = { HandCoins, IdCard, RefreshCw, CalendarClock, LifeBuoy }
const active = ref(0)
const shown = ref(5)
const tabRefs = ref([])
const root = ref(null)
let timer
let reduce = false
let started = false

const current = computed(() => {
  const u = uses[active.value]
  return { key: u.key, icon: icons[u.icon], ...(u[locale.value] ?? u.en) }
})

function play() {
  clearInterval(timer)
  if (reduce) { shown.value = 5; return }
  shown.value = 0
  timer = setInterval(() => {
    shown.value++
    if (shown.value >= current.value.week.length) clearInterval(timer)
  }, 650)
}

async function select(i, focus = false) {
  active.value = (i + uses.length) % uses.length
  play()
  if (focus) { await nextTick(); tabRefs.value[active.value]?.focus() }
}

function onKey(e) {
  const moves = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
  if (!(e.key in moves)) return
  e.preventDefault()
  select(active.value + moves[e.key], true)
}

let io
onMounted(() => {
  reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  io = new IntersectionObserver((es) => {
    if (es[0].isIntersecting && !started) { started = true; io.disconnect(); play() }
  }, { threshold: 0.3 })
  io.observe(root.value)
})
onBeforeUnmount(() => { clearInterval(timer); io?.disconnect() })
</script>

<template>
  <div ref="root">
    <div role="tablist" :aria-label="t('gecko.usesTitle')" class="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1" @keydown="onKey">
      <button
        v-for="(u, i) in uses"
        :id="`use-tab-${u.key}`"
        :key="u.key"
        :ref="(el) => (tabRefs[i] = el)"
        type="button"
        role="tab"
        :aria-selected="active === i"
        aria-controls="use-panel"
        :tabindex="active === i ? 0 : -1"
        class="flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 text-[14px] font-medium whitespace-nowrap transition-colors"
        :class="active === i ? 'bg-ink text-paper' : 'glass text-ink hover:text-accent'"
        @click="select(i)"
      >
        <component :is="icons[u.icon]" :size="16" aria-hidden="true" :class="active === i ? 'text-accent' : 'text-graphite'" />
        {{ (u[locale] ?? u.en).name }}
      </button>
    </div>

    <div id="use-panel" role="tabpanel" :aria-labelledby="`use-tab-${current.key}`" class="mt-4 grid gap-4 lg:grid-cols-12 lg:gap-5">
      <div class="glass min-w-0 rounded-glass p-5 md:p-7 lg:col-span-7">
        <Transition name="swap" mode="out-in">
          <div :key="current.key">
            <div class="flex flex-wrap items-center gap-3">
              <h3 class="text-2xl leading-tight font-bold tracking-[-0.02em] text-ink md:text-3xl">{{ current.name }}</h3>
              <span
                class="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.02em]"
                :class="current.key === 'collections' ? 'bg-accent text-white' : 'glass-tint text-graphite'"
              >{{ current.tag }}</span>
            </div>
            <p class="mt-3 max-w-[40rem] text-[15px] leading-relaxed text-graphite md:text-base">{{ current.pitch }}</p>
            <dl class="mt-6 flex flex-col gap-1.5">
              <div
                v-for="(row, i) in current.rows"
                :key="row[0]"
                class="row grid gap-1 rounded-glass-inner glass-tint px-3.5 py-2.5 sm:grid-cols-[10rem_1fr] sm:gap-4"
                :style="{ '--d': `${i * 70}ms` }"
              >
                <dt class="text-[12px] font-medium uppercase tracking-[0.02em] text-graphite sm:pt-0.5">{{ row[0] }}</dt>
                <dd class="text-[14px] leading-snug text-ink" :class="{ 'font-mono text-[13px]': i === 0 || i === 4 }">{{ row[1] }}</dd>
              </div>
            </dl>
          </div>
        </Transition>
      </div>

      <div class="glass min-w-0 rounded-glass p-5 md:p-7 lg:col-span-5">
        <div class="flex items-center gap-3">
          <GeckoBlob tone="agent" :mood="shown >= current.week.length ? 'happy' : 'think'" size="xs" />
          <p class="text-[12px] font-medium uppercase tracking-[0.02em] text-ink">{{ t('gecko.usesWeek') }}</p>
        </div>
        <ol class="relative mt-6 flex flex-col gap-4 pl-7">
          <span class="absolute top-1.5 bottom-1.5 left-[7px] w-0.5 rounded-full bg-line" aria-hidden="true" />
          <span
            class="absolute top-1.5 left-[7px] w-0.5 rounded-full bg-accent transition-[height] duration-500 ease-out-quint"
            :style="{ height: `calc(${(Math.max(shown, 1) - 1) / (current.week.length - 1)} * (100% - 0.75rem))` }"
            aria-hidden="true"
          />
          <li
            v-for="(w, i) in current.week"
            :key="`${current.key}-${i}`"
            class="beat relative transition-all duration-500"
            :class="i < shown ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-25'"
          >
            <span
              class="absolute top-1 -left-7 size-4 rounded-full border-2 transition-colors duration-300"
              :class="i < shown ? 'border-accent bg-accent' : 'border-line bg-card'"
              aria-hidden="true"
            />
            <span v-if="i === shown - 1 && shown < current.week.length" class="ping absolute top-1 -left-7 size-4 rounded-full bg-accent" aria-hidden="true" />
            <span class="block text-[12px] font-medium tabular-nums text-graphite">{{ w[0] }}</span>
            <span class="block text-[15px] font-semibold leading-snug text-ink">{{ w[1] }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swap-enter-active, .swap-leave-active { transition: opacity 0.25s, translate 0.25s; }
.swap-enter-from { opacity: 0; translate: 0 8px; }
.swap-leave-to { opacity: 0; translate: 0 -4px; }
.swap-enter-active .row { animation: rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; animation-delay: var(--d); }
@keyframes rise { from { opacity: 0; translate: 0 8px; } }
.ping { animation: ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite; }
@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
.no-scrollbar { scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }
@media (prefers-reduced-motion: reduce) {
  .swap-enter-active .row, .ping { animation: none; }
}
</style>
