<script setup>
import { computed } from 'vue'

// Known weaknesses BREACH found, of 51, in each saved production run on November 9, 2026 (Mexico City time),
// plus the local-lab measurement with a logged-in session. Every run had 0 false alarms of 7.
const runs = [
  ['16:58', 10],
  ['16:59', 11],
  ['17:03', 12],
  ['17:06', 12],
  ['17:37', 10],
  ['17:56', 27],
  ['18:20', 28],
]
const lab = ['18:17', 34]
const deadline = '20:00'

const copy = {
  en: {
    title: 'Known weaknesses found, of 51',
    note: 'Each point is a run in production on November 9, Mexico City time. Zero false alarms in every run.',
    restart: 'server restart',
    jump: '16 AI-written checks approved',
    prod: '28 in production',
    lab: '34 in the lab, with a logged-in session',
    deadline: 'Deadline',
    legendProd: 'Production, as an outside attacker',
    legendLab: 'Local lab, logged in',
  },
  es: {
    title: 'Debilidades conocidas encontradas, de 51',
    note: 'Cada punto es una corrida en producción el 9 de noviembre, hora de Ciudad de México. Cero falsas alarmas en todas.',
    restart: 'reinicio del servidor',
    jump: '16 checks escritos por la IA, aprobados',
    prod: '28 en producción',
    lab: '34 en el laboratorio, con sesión iniciada',
    deadline: 'Cierre',
    legendProd: 'Producción, como atacante externo',
    legendLab: 'Laboratorio local, con sesión',
  },
}

const { locale } = useI18n()
const c = computed(() => copy[locale.value] ?? copy.en)

const W = 640
const H = 340
const L = 36
const R = 20
const T = 20
const B = 34
const minutes = (hm) => {
  const [h, m] = hm.split(':').map(Number)
  return h * 60 + m
}
const t0 = minutes('16:40')
const t1 = minutes('20:10')
const x = (hm) => L + ((minutes(hm) - t0) / (t1 - t0)) * (W - L - R)
const y = (v) => H - B - (v / 51) * (H - T - B)

const path = computed(() => {
  let d = ''
  runs.forEach(([t, v], i) => {
    d += i ? ` H${x(t)} V${y(v)}` : `M${x(t)} ${y(v)}`
  })
  return `${d} H${x(deadline)}`
})
const grid = [0, 10, 20, 30, 40, 51]
const hours = ['17:00', '18:00', '19:00', '20:00']
</script>

<template>
  <div>
    <p class="text-sm font-bold uppercase tracking-[0.01em] text-ink md:text-base">{{ c.title }}</p>
    <p class="mt-1.5 text-[13px] leading-snug text-graphite md:text-sm">{{ c.note }}</p>

    <svg :viewBox="`0 0 ${W} ${H}`" class="mt-5 w-full" role="img" :aria-label="`${c.title}. ${c.prod}. ${c.lab}.`">
      <g v-for="v in grid" :key="v">
        <line :x1="L" :x2="W - R" :y1="y(v)" :y2="y(v)" class="stroke-line" :stroke-dasharray="v === 51 ? '3 4' : undefined" />
        <text :x="L - 8" :y="y(v) + 4" text-anchor="end" class="fill-graphite text-[11px]">{{ v }}</text>
      </g>
      <g v-for="h in hours" :key="h">
        <line :x1="x(h)" :x2="x(h)" :y1="H - B" :y2="H - B + 5" class="stroke-muted" />
        <text :x="x(h)" :y="H - B + 20" text-anchor="middle" class="fill-graphite text-[11px]">{{ h }}</text>
      </g>

      <line :x1="x(deadline)" :x2="x(deadline)" :y1="T" :y2="H - B" class="stroke-ink" stroke-dasharray="4 4" />
      <text :x="x(deadline) - 6" :y="T + 10" text-anchor="end" class="fill-ink text-[11px] font-semibold uppercase">{{ c.deadline }}</text>

      <path :d="path" fill="none" class="stroke-accent" stroke-width="2.5" stroke-linejoin="round" />
      <circle v-for="[t, v] in runs" :key="t" :cx="x(t)" :cy="y(v)" r="3.5" class="fill-accent" />

      <text :x="x('17:37')" :y="y(10) + 18" text-anchor="middle" class="fill-graphite text-[10px]">{{ c.restart }}</text>
      <text :x="x('17:56') - 8" :y="y(19)" text-anchor="end" class="fill-graphite text-[10px]">{{ c.jump }}</text>
      <text :x="x('18:20') + 10" :y="y(28) + 18" class="fill-ink text-[12px] font-semibold">{{ c.prod }}</text>

      <line :x1="x(lab[0])" :x2="x(lab[0])" :y1="y(lab[1]) + 6" :y2="y(28) - 6" class="stroke-ink" stroke-dasharray="2 3" />
      <circle :cx="x(lab[0])" :cy="y(lab[1])" r="5" fill="none" class="stroke-ink" stroke-width="2" />
      <text :x="x(lab[0]) + 10" :y="y(lab[1]) + 4" class="fill-ink text-[12px] font-semibold">{{ c.lab }}</text>
    </svg>

    <div class="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-graphite md:text-[13px]">
      <span class="inline-flex items-center gap-2"><span class="h-[3px] w-4 rounded-full bg-accent" />{{ c.legendProd }}</span>
      <span class="inline-flex items-center gap-2"><span class="size-2.5 rounded-full border-2 border-ink" />{{ c.legendLab }}</span>
    </div>
  </div>
</template>
