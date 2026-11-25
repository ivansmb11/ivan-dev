<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import GeckoBlob from './GeckoBlob.vue'
import { mapNodes, mapEdges, mapText } from '@/content/gecko'

const { locale } = useI18n()
const copy = computed(() => mapText[locale.value] ?? mapText.en)

const map = ref(null)
const size = ref({ w: 760, h: 440 })
const selected = ref(null)
const cardOut = ref(false)
let touched = false

const ids = Object.keys(mapNodes)

const edges = computed(() => {
  const { w, h } = size.value
  return mapEdges.map(([a, b, label], i) => {
    const A = mapNodes[a]
    const B = mapNodes[b]
    const x1 = (A.x / 100) * w
    const y1 = (A.y / 100) * h - 8
    const x2 = (B.x / 100) * w
    const y2 = (B.y / 100) * h - 8
    const dx = x2 - x1
    const dy = y2 - y1
    const len = Math.hypot(dx, dy) || 1
    const bend = 0.12 * len
    const cx = (x1 + x2) / 2 - (dy / len) * bend
    const cy = (y1 + y2) / 2 + (dx / len) * bend
    const text = copy.value.edges[label]
    return {
      i, a, b, text,
      d: `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`,
      lx: (x1 + 2 * cx + x2) / 4,
      ly: (y1 + 2 * cy + y2) / 4,
      tw: text.length * 6.4 + 14,
      hot: selected.value && (a === selected.value || b === selected.value),
    }
  })
})

const hotNodes = computed(() => {
  if (!selected.value) return null
  const set = new Set([selected.value])
  for (const [a, b] of mapEdges) if (a === selected.value || b === selected.value) { set.add(a); set.add(b) }
  return set
})

const card = computed(() => {
  if (!selected.value) return null
  const [name, group, desc, never] = copy.value.nodes[selected.value]
  const rels = mapEdges
    .filter(([a, b]) => a === selected.value || b === selected.value)
    .map(([a, b, l]) => [copy.value.nodes[a][0], copy.value.edges[l], copy.value.nodes[b][0]])
  return { name, group, desc, never, rels }
})

function select(id, fromUser = true) {
  if (fromUser) touched = true
  if (id === selected.value) return
  cardOut.value = true
  setTimeout(() => {
    selected.value = id
    cardOut.value = false
  }, 220)
}

let ro
let io
let timer
onMounted(() => {
  ro = new ResizeObserver(([e]) => { size.value = { w: e.contentRect.width, h: e.contentRect.height } })
  ro.observe(map.value)
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // A short guided tour the first time the map is on screen; any tap ends it.
  io = new IntersectionObserver(async (es) => {
    if (!es[0].isIntersecting) return
    io.disconnect()
    const tour = ['engagement', 'agent', 'decision', 'heartbeat', 'gateway']
    let k = 0
    const step = () => {
      if (touched || k >= tour.length) return
      select(tour[k++], false)
      timer = setTimeout(step, 3000)
    }
    step()
  }, { threshold: 0.4 })
  io.observe(map.value)
})
onBeforeUnmount(() => { ro?.disconnect(); io?.disconnect(); clearTimeout(timer) })
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-12 lg:gap-5">
    <div class="glass min-w-0 rounded-glass p-2 md:p-3 lg:col-span-8">
      <div class="no-scrollbar overflow-x-auto rounded-glass-inner glass-tint">
        <div ref="map" class="relative h-[440px] min-w-[760px] md:h-[480px]">
          <svg class="absolute inset-0 size-full" :viewBox="`0 0 ${size.w} ${size.h}`" aria-hidden="true">
            <g v-for="e in edges" :key="e.i">
              <path :d="e.d" class="edge" :class="{ hot: e.hot, cold: selected && !e.hot }" />
              <path v-if="e.hot" :d="e.d" class="flow" />
            </g>
            <g v-for="e in edges.filter((x) => x.hot)" :key="`l-${e.i}`" class="label">
              <rect :x="e.lx - e.tw / 2" :y="e.ly - 10" :width="e.tw" height="19" rx="6" />
              <text :x="e.lx" :y="e.ly + 3.5" text-anchor="middle">{{ e.text }}</text>
            </g>
          </svg>
          <button
            v-for="id in ids"
            :key="id"
            type="button"
            class="node absolute cursor-pointer"
            :class="{ cold: hotNodes && !hotNodes.has(id), sel: selected === id }"
            :style="{ left: `${mapNodes[id].x}%`, top: `${mapNodes[id].y}%` }"
            :aria-pressed="selected === id"
            @click="select(id)"
          >
            <GeckoBlob :tone="mapNodes[id].tone" :mood="selected === id ? 'happy' : 'neutral'" size="xs" :name="copy.nodes[id][0]" />
          </button>
        </div>
      </div>
    </div>

    <div class="glass min-w-0 rounded-glass p-5 md:p-7 lg:col-span-4" aria-live="polite">
      <div class="card" :class="{ out: cardOut }">
        <template v-if="card">
          <span class="inline-block rounded-full glass-tint px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.02em] text-graphite">{{ card.group }}</span>
          <h3 class="mt-3 text-2xl leading-tight font-bold tracking-[-0.02em] text-ink">{{ card.name }}</h3>
          <p class="mt-3 text-[15px] leading-relaxed text-graphite">{{ card.desc }}</p>
          <p v-if="card.never" class="mt-4 inline-block rounded-full bg-accent/12 px-2.5 py-1 text-[12px] font-medium text-accent-deep dark:text-accent">✕ {{ card.never }}</p>
          <p class="mt-6 text-[12px] font-medium uppercase tracking-[0.02em] text-ink">{{ copy.relations }}</p>
          <ul class="mt-2 flex flex-col gap-1 text-[14px] text-graphite">
            <li v-for="(r, i) in card.rels" :key="i"><b class="font-semibold text-ink">{{ r[0] }}</b> {{ r[1] }} <b class="font-semibold text-ink">{{ r[2] }}</b></li>
          </ul>
          <p class="mt-5 text-[13px] text-muted">{{ copy.hint }}</p>
        </template>
        <template v-else>
          <span class="inline-block rounded-full glass-tint px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.02em] text-graphite">{{ copy.intro[0] }}</span>
          <h3 class="mt-3 text-2xl leading-tight font-bold tracking-[-0.02em] text-ink">{{ copy.intro[1] }}</h3>
          <p class="mt-3 text-[15px] leading-relaxed text-graphite">{{ copy.intro[2] }}</p>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.node { transform: translate(-50%, -50%); transition: opacity 0.4s, filter 0.4s; border-radius: 1rem; padding: 4px 6px; }
.node.cold { opacity: 0.3; filter: grayscale(0.6); }
.node:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
.node.sel :deep(.body) { box-shadow: inset -6px -10px 18px rgb(0 0 0 / 0.22), 0 0 0 6px color-mix(in oklch, var(--c) 22%, transparent), 0 0 34px var(--c); }

.edge { fill: none; stroke: var(--color-line); stroke-width: 1.5; transition: stroke 0.3s, opacity 0.3s; }
.dark .edge { stroke: oklch(40% 0 0); }
.edge.hot { stroke: var(--color-accent); stroke-width: 2; }
.edge.cold { opacity: 0.35; }
.flow { fill: none; stroke: var(--color-accent); stroke-width: 2.5; stroke-dasharray: 3 13; stroke-linecap: round; animation: flow 1s linear infinite; }
.label rect { fill: var(--color-card); stroke: var(--color-accent); stroke-width: 1; }
.label text { fill: var(--color-ink); font-size: 11px; font-weight: 500; }
@keyframes flow { to { stroke-dashoffset: -32; } }

.card { transition: opacity 0.22s, translate 0.22s; }
.card.out { opacity: 0; translate: 0 6px; }
.no-scrollbar { scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }

@media (prefers-reduced-motion: reduce) {
  .flow { animation: none; }
}
</style>
