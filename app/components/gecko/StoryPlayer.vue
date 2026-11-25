<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { ChevronLeft, ChevronRight, RotateCcw, Play, Pause } from 'lucide-vue-next'
import GeckoBlob from './GeckoBlob.vue'
import { cast, castText, story } from '@/content/gecko'

const { t, locale } = useI18n()
const copy = computed(() => story[locale.value] ?? story.en)
const names = computed(() => castText[locale.value] ?? castText.en)
const chapters = computed(() => copy.value.chapters)

const cur = ref(0)
const ending = ref(null)
const seen = reactive(new Set([0]))
const autoplay = ref(false)
const panelOut = ref(false)
let gen = 0
let reduce = false

const moods = reactive({})
const presence = reactive({})
const looks = reactive({})
const ringing = reactive(new Set())
const glowing = reactive(new Set())
const bubbles = reactive({})
const parcels = ref([])
const chat = ref([])
const scan = ref(-1)
const picked = ref(-1)
const choicesShown = ref(0)
const stage = ref(null)
const chatBox = ref(null)
const root = ref(null)
let uid = 0

const view = computed(() => {
  if (ending.value) {
    const e = copy.value.endings[ending.value]
    return { when: `${chapters.value.at(-1).when.split('·')[0]}· ${e.label}`, title: e.title, body: e.body, chips: e.chips }
  }
  const c = chapters.value[cur.value]
  return { when: c.when, title: c.title, body: c.body, chips: c.chips }
})
const isLast = computed(() => cur.value === chapters.value.length - 1)
const options = computed(() => chapters.value[cur.value].options ?? null)

const sleep = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms))
const rowY = (id) => (cast[id].row === 'top' ? 27 : 70)

function setCast(c) {
  for (const id of Object.keys(cast)) {
    moods[id] = c[id] ?? 'neutral'
    presence[id] = c[id] ? '' : id === 'human' ? 'gone' : 'dim'
    looks[id] = 0
    delete bubbles[id]
  }
  ringing.clear()
  glowing.clear()
  parcels.value = []
}

function bubbleStyle(id) {
  const x = cast[id].x
  const style = { bottom: `calc(${100 - rowY(id)}% + ${cast[id].small ? 44 : 54}px)` }
  if (x < 30) Object.assign(style, { left: `max(6px, calc(${x}% - 36px))`, '--tail': `min(36px, ${x}%)` })
  else if (x > 70) Object.assign(style, { right: `max(6px, calc(${100 - x}% - 36px))`, '--tail': 'calc(100% - 36px)' })
  else Object.assign(style, { left: `${x}%`, transform: 'translateX(-50%)', '--tail': '50%' })
  return style
}

function wake(id) {
  presence[id] = ''
}

async function say(id, html, kind, g) {
  wake(id)
  glowing.add(id)
  const key = ++uid
  bubbles[id] = { html, kind, key, show: false }
  await nextTick()
  requestAnimationFrame(() => { if (bubbles[id]?.key === key) bubbles[id].show = true })
  setTimeout(() => { if (g === gen) glowing.delete(id) }, 1400)
}

async function send(a, b, label, g) {
  looks[a] = cast[b].x > cast[a].x ? 3 : -3
  looks[b] = cast[a].x > cast[b].x ? 3 : -3
  wake(b)
  const p = { key: ++uid, label, x: cast[a].x, y: rowY(a), fade: false }
  parcels.value.push(p)
  await sleep(60)
  if (g !== gen) return
  const live = parcels.value.find((q) => q.key === p.key)
  if (!live) return
  live.x = cast[b].x
  live.y = rowY(b)
  await sleep(1650)
  if (g !== gen) return
  live.fade = true
  setTimeout(() => { parcels.value = parcels.value.filter((q) => q.key !== p.key) }, 500)
}

function addChat(who, text, kind) {
  chat.value.push({ key: ++uid, who, text, kind })
  nextTick(() => {
    const el = chatBox.value
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  })
}

function rebuildChat(upto) {
  chat.value = []
  for (let i = 0; i < upto; i++) {
    for (const s of chapters.value[i].steps) if (s[0] === 'chat') chat.value.push({ key: ++uid, who: s[1], text: s[2], kind: s[3] })
  }
  nextTick(() => { if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight })
}

async function runSteps(steps, g) {
  for (const s of steps) {
    if (g !== gen) return
    const [op] = s
    if (op === 'say') { await say(s[1], s[2], s[3], g); await sleep(1900) }
    else if (op === 'send') { await send(s[1], s[2], s[3], g); await sleep(450) }
    else if (op === 'mood') { wake(s[1]); moods[s[1]] = s[2]; await sleep(650) }
    else if (op === 'ring') { ringing.add(s[1]); glowing.add(s[1]); await sleep(1200) }
    else if (op === 'unring') { ringing.delete(s[1]); glowing.delete(s[1]) }
    else if (op === 'chat') { addChat(s[1], s[2], s[3]); await sleep(1500) }
    else if (op === 'options') await scanOptions(g)
    else if (op === 'choices') await showChoices(g)
  }
}

async function scanOptions(g) {
  const n = options.value?.length ?? 0
  for (let r = 0; r < 2; r++) {
    for (let i = 0; i < n; i++) {
      if (g !== gen) return
      scan.value = i
      await sleep(340)
    }
  }
  scan.value = -1
  picked.value = chapters.value[cur.value].pick
  await sleep(900)
}

async function showChoices(g) {
  for (let i = 1; i <= 3; i++) {
    if (g !== gen) return
    choicesShown.value = i
    await sleep(240)
  }
}

async function swapPanel(update) {
  panelOut.value = true
  await sleep(380)
  update()
  panelOut.value = false
}

async function go(i) {
  const g = ++gen
  const next = Math.max(0, Math.min(chapters.value.length - 1, i))
  await swapPanel(() => {
    cur.value = next
    ending.value = null
    seen.add(next)
    scan.value = -1
    picked.value = -1
    choicesShown.value = 0
    setCast(chapters.value[next].cast)
    rebuildChat(next)
  })
  if (g !== gen) return
  await sleep(500)
  await runSteps(chapters.value[next].steps, g)
  if (g !== gen) return
  if (autoplay.value && next < chapters.value.length - 1) {
    await sleep(3200)
    if (autoplay.value && g === gen) go(next + 1)
  } else if (autoplay.value) autoplay.value = false
}

async function pickEnding(key) {
  const g = ++gen
  const e = copy.value.endings[key]
  autoplay.value = false
  await swapPanel(() => {
    ending.value = key
    choicesShown.value = 3
    setCast(e.cast)
    rebuildChat(chapters.value.length - 1)
  })
  if (g !== gen) return
  await sleep(400)
  await runSteps(e.steps, g)
}

function replay() {
  if (ending.value) pickEnding(ending.value)
  else go(cur.value)
}

function toggleAuto() {
  autoplay.value = !autoplay.value
  if (autoplay.value) go(ending.value ? 0 : cur.value)
}

function onKey(e) {
  if (!root.value || e.target.closest?.('input, textarea')) return
  const r = root.value.getBoundingClientRect()
  if (r.top > innerHeight * 0.6 || r.bottom < innerHeight * 0.3) return
  if (e.key === 'ArrowRight') go(cur.value + 1)
  else if (e.key === 'ArrowLeft') go(cur.value - 1)
}

let io
onMounted(() => {
  reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  setCast(chapters.value[0].cast)
  io = new IntersectionObserver((es) => {
    if (es[0].isIntersecting) { io.disconnect(); go(0) }
  }, { threshold: 0.35 })
  io.observe(stage.value)
  addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  gen++
  io?.disconnect()
  removeEventListener('keydown', onKey)
})

const castIds = Object.keys(cast)
const chapterBar = ref(null)
watch(cur, (i) => {
  const bar = chapterBar.value
  const el = bar?.children[i]
  if (el) bar.scrollTo({ left: el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' })
})
</script>

<template>
  <div ref="root">
    <div ref="chapterBar" class="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1" role="tablist" :aria-label="t('gecko.storyLabel')">
      <button
        v-for="(c, i) in chapters"
        :key="i"
        type="button"
        role="tab"
        :aria-selected="i === cur && !ending"
        class="min-h-9 shrink-0 cursor-pointer rounded-full px-3.5 text-[13px] font-medium whitespace-nowrap transition-colors"
        :class="i === cur ? 'bg-ink text-paper' : seen.has(i) ? 'glass text-ink' : 'glass text-graphite hover:text-ink'"
        @click="go(i)"
      >
        <span class="tabular-nums opacity-60">{{ i + 1 }}.</span> {{ c.title }}
      </button>
    </div>

    <div class="mt-4 grid gap-4 lg:grid-cols-12 lg:gap-5">
      <div class="min-w-0 lg:col-span-8">
        <div class="glass rounded-glass p-2 md:p-3">
          <div ref="stage" class="stage relative h-[330px] overflow-hidden rounded-glass-inner glass-tint sm:h-[400px]">
            <div class="pointer-events-none absolute inset-x-0 top-[48%] border-t border-dashed border-line" aria-hidden="true" />
            <div
              v-for="id in castIds"
              :key="id"
              class="seat absolute"
              :class="presence[id]"
              :style="{ left: `${cast[id].x}%`, top: `${rowY(id)}%` }"
            >
              <GeckoBlob
                :tone="cast[id].tone"
                :mood="moods[id]"
                :size="cast[id].small ? 'sm' : 'md'"
                :name="names[id][0]"
                :role="names[id][1]"
                :look="looks[id]"
                :ring="ringing.has(id)"
                :glow="glowing.has(id)"
              />
            </div>

            <template v-for="id in castIds" :key="`b-${id}`">
              <div
                v-if="bubbles[id]"
                :key="bubbles[id].key"
                class="bubble"
                :class="[bubbles[id].kind, { show: bubbles[id].show }]"
                :style="bubbleStyle(id)"
              >
                <small>{{ names[id][0] }}</small>
                <span v-html="bubbles[id].html" />
              </div>
            </template>

            <div
              v-for="p in parcels"
              :key="p.key"
              class="parcel"
              :class="{ fade: p.fade }"
              :style="{ left: `${p.x}%`, top: `${p.y}%` }"
              aria-hidden="true"
            >{{ p.label }}</div>
          </div>

          <div class="mt-2 flex flex-wrap items-center gap-1.5 md:mt-3">
            <button type="button" class="ctrl" :disabled="cur === 0 && !ending" :aria-label="t('gecko.prev')" @click="go(ending ? cur : cur - 1)">
              <ChevronLeft :size="16" aria-hidden="true" /><span class="max-sm:hidden">{{ t('gecko.prev') }}</span>
            </button>
            <button type="button" class="ctrl" :aria-label="t('gecko.replay')" @click="replay">
              <RotateCcw :size="15" aria-hidden="true" /><span class="max-sm:hidden">{{ t('gecko.replay') }}</span>
            </button>
            <button type="button" class="ctrl" :aria-pressed="autoplay" @click="toggleAuto">
              <component :is="autoplay ? Pause : Play" :size="15" aria-hidden="true" />{{ autoplay ? t('gecko.pause') : t('gecko.playAll') }}
            </button>
            <span class="ml-auto px-2 text-[13px] tabular-nums text-graphite">{{ cur + 1 }} / {{ chapters.length }}</span>
            <button type="button" class="ctrl ctrl-primary" :disabled="isLast" @click="go(cur + 1)">
              {{ t('gecko.next') }}<ChevronRight :size="16" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div class="panel glass mt-4 rounded-glass p-5 md:p-7" :class="{ out: panelOut }" aria-live="polite">
          <p class="text-[12px] font-medium uppercase tracking-[0.02em] text-accent">{{ view.when }}</p>
          <h3 class="mt-2 text-2xl leading-tight font-bold tracking-[-0.02em] text-ink md:text-3xl">{{ view.title }}</h3>
          <p class="prose-story mt-3 max-w-[46rem] text-[15px] leading-relaxed text-graphite md:text-base" v-html="view.body" />
          <div class="mt-4 flex flex-wrap gap-1.5">
            <span
              v-for="chip in view.chips"
              :key="Array.isArray(chip) ? chip[0] : chip"
              class="rounded-full px-2.5 py-1 text-[12px] font-medium"
              :class="Array.isArray(chip) ? 'bg-accent/12 text-accent-deep dark:text-accent' : 'glass-tint text-ink'"
            >{{ Array.isArray(chip) ? `✕ ${chip[0]}` : chip }}</span>
          </div>

          <div v-if="options && !ending" class="mt-5 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            <div
              v-for="(o, i) in options"
              :key="o"
              class="rounded-glass-inner px-3 py-2.5 text-[13px] font-medium transition-all duration-200"
              :class="picked === i ? 'bg-ink text-paper scale-[1.03]' : scan === i ? 'bg-accent/15 text-ink' : picked >= 0 ? 'glass-tint text-graphite opacity-50' : 'glass-tint text-ink'"
            >{{ o }}</div>
          </div>

          <div v-if="isLast" class="mt-5 grid gap-2 sm:grid-cols-3">
            <button
              v-for="([key, e], i) in Object.entries(copy.endings)"
              :key="key"
              type="button"
              class="choice cursor-pointer rounded-glass-inner p-3.5 text-left transition-all duration-500"
              :class="[ending === key ? 'bg-ink text-paper' : 'glass-tint text-ink hover:bg-accent/10', choicesShown > i ? 'opacity-100 translate-y-0' : 'pointer-events-none translate-y-2 opacity-0']"
              @click="pickEnding(key)"
            >
              <span class="block text-[14px] font-semibold leading-snug">{{ e.label }}</span>
              <span class="mt-1 block text-[12px]" :class="ending === key ? 'text-paper/70' : 'text-graphite'">{{ e.sub }}</span>
            </button>
          </div>

          <div v-if="ending && ending !== 'pay'" class="mt-6">
            <p class="text-[12px] font-medium uppercase tracking-[0.02em] text-ink">{{ copy.handoffTitle }}</p>
            <ul class="mt-3 grid gap-x-6 gap-y-1.5 text-[14px] text-graphite sm:grid-cols-2">
              <li v-for="h in copy.handoff" :key="h" class="flex gap-2"><span class="text-accent" aria-hidden="true">→</span>{{ h }}</li>
            </ul>
          </div>
        </div>
      </div>

      <aside class="min-w-0 lg:col-span-4" :aria-label="copy.phone">
        <div class="glass flex h-[440px] flex-col rounded-glass p-2 md:p-3 lg:sticky lg:top-24 lg:h-[min(640px,calc(100svh-8rem))]">
          <div class="flex items-center gap-3 rounded-glass-inner glass-tint px-3 py-2.5">
            <GeckoBlob tone="client" mood="neutral" size="xs" />
            <div class="min-w-0">
              <p class="text-[14px] font-semibold leading-tight text-ink">{{ copy.phone }}</p>
              <p class="text-[12px] leading-tight text-graphite">{{ copy.phoneSub }}</p>
            </div>
          </div>
          <div ref="chatBox" class="no-scrollbar mt-2 flex flex-1 flex-col gap-2 overflow-y-auto rounded-glass-inner bg-mist-soft p-3">
            <p v-if="!chat.length" class="m-auto max-w-[16rem] text-center text-[13px] text-graphite">{{ copy.phoneEmpty }}</p>
            <TransitionGroup name="msg">
              <div
                v-for="m in chat"
                :key="m.key"
                class="max-w-[86%] rounded-2xl px-3 py-2 text-[13.5px] leading-snug"
                :class="m.who === 'client' ? 'self-end rounded-br-md bg-[#d9fdd3] text-onyx' : 'self-start rounded-bl-md bg-card text-ink'"
              >
                <span v-if="m.kind === 'disclosure'" class="mb-1 inline-block rounded-full bg-accent/15 px-2 py-0.5 text-[10.5px] font-semibold uppercase text-accent-deep dark:text-accent">{{ copy.meta.disclosure }}</span>
                <span class="block">{{ m.text }}</span>
                <span class="mt-1 block text-[10.5px] opacity-55">{{ m.who === 'client' ? copy.meta.client : copy.meta.agent }}</span>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.seat { transform: translate(-50%, -50%); transition: opacity 0.8s, filter 0.8s; z-index: 2; }
.seat.dim { opacity: 0.25; filter: grayscale(0.7); }
.seat.gone { opacity: 0; pointer-events: none; }

.bubble {
  position: absolute;
  z-index: 5;
  max-width: min(230px, 62%);
  padding: 8px 12px;
  border-radius: 14px;
  background: var(--color-ink);
  color: var(--color-paper);
  font-size: 13px;
  line-height: 1.4;
  opacity: 0;
  translate: 0 8px;
  scale: 0.96;
  transition: opacity 0.5s, translate 0.5s cubic-bezier(0.22, 1, 0.36, 1), scale 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.bubble.show { opacity: 1; translate: 0 0; scale: 1; }
.bubble::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: var(--tail, 50%);
  width: 11px;
  height: 11px;
  background: inherit;
  transform: translateX(-50%) rotate(45deg);
  border-radius: 2px;
}
.bubble small { display: block; margin-bottom: 1px; font-size: 10.5px; opacity: 0.6; }
.bubble.ok { background: #0f5132; color: #d1f7e3; }
.bubble.deny { background: #7f1d1d; color: #ffe1de; }
.bubble.blocked :deep(s) { color: #ff8a7a; text-decoration-thickness: 2px; }

.parcel {
  position: absolute;
  z-index: 6;
  transform: translate(-50%, -50%);
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--color-card);
  color: var(--color-ink);
  font: 500 11.5px ui-monospace, SFMono-Regular, Menlo, monospace;
  white-space: nowrap;
  box-shadow: 0 6px 18px -6px rgb(0 0 0 / 0.35), 0 0 0 1px var(--color-line);
  transition: left 1.6s cubic-bezier(0.65, 0, 0.35, 1), top 1.6s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.45s;
}
.parcel.fade { opacity: 0; }

.panel { transition: opacity 0.38s, translate 0.38s cubic-bezier(0.22, 1, 0.36, 1); }
.panel.out { opacity: 0; translate: 0 6px; }
.prose-story :deep(b) { color: var(--color-ink); font-weight: 600; }

.ctrl {
  display: inline-flex;
  min-height: 2.5rem;
  cursor: pointer;
  align-items: center;
  gap: 0.375rem;
  border-radius: 999px;
  padding: 0 0.9rem;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-ink);
  background: var(--glass-tint);
  transition: background-color 0.2s, opacity 0.2s;
}
.ctrl:hover:not(:disabled) { background: color-mix(in oklch, var(--color-accent) 14%, transparent); }
.ctrl:disabled { cursor: default; opacity: 0.4; }
.ctrl-primary { background: var(--color-ink); color: var(--color-paper); }
.ctrl-primary:hover:not(:disabled) { background: var(--color-accent-deep); color: white; }

.msg-enter-active { transition: opacity 0.45s, translate 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
.msg-enter-from { opacity: 0; translate: 0 10px; }

.no-scrollbar { scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }

@media (prefers-reduced-motion: reduce) {
  .parcel, .bubble, .panel, .seat { transition: none; }
}
</style>
