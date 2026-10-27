<script setup>
import { ref, computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, Music, Users, Dna, Swords, Flame, Search } from 'lucide-vue-next'
import ArchitectureDiagram from '@/components/vibebify/ArchitectureDiagram.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import SectionChip from '@/components/ui/SectionChip.vue'
import ArrowButton from '@/components/ui/ArrowButton.vue'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'
import { enter, reveal } from '@/motion'

import landingImg from '@/assets/vibebify/landing.webp'
import feedImg from '@/assets/vibebify/feed.webp'
import dnaImg from '@/assets/vibebify/dna.webp'
import duelsImg from '@/assets/vibebify/duels.webp'
import statsImg from '@/assets/vibebify/stats.webp'
import profileImg from '@/assets/vibebify/profile.webp'
import composeImg from '@/assets/vibebify/compose.webp'

const { t } = useI18n()

const features = [
  { key: 'spotify', icon: Music, img: statsImg },
  { key: 'feed', icon: Users, img: feedImg },
  { key: 'dna', icon: Dna, img: dnaImg },
  { key: 'duels', icon: Swords, img: duelsImg },
  { key: 'streaks', icon: Flame, img: profileImg },
  { key: 'compose', icon: Search, img: composeImg },
]

const activeFeature = ref(0)
const current = computed(() => features[activeFeature.value])
const tabRefs = ref([])

const pad = (n) => String(n).padStart(2, '0')

async function selectFeature(i, focus = false) {
  activeFeature.value = (i + features.length) % features.length
  if (focus) {
    await nextTick()
    tabRefs.value[activeFeature.value]?.focus()
  }
}

function onTabKey(e) {
  const moves = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
  if (e.key in moves) selectFeature(activeFeature.value + moves[e.key], true)
  else if (e.key === 'Home') selectFeature(0, true)
  else if (e.key === 'End') selectFeature(features.length - 1, true)
  else return
  e.preventDefault()
}

const stack = [
  { name: 'Next.js 16', key: 'framework', category: 'Framework' },
  { name: 'TypeScript', key: 'language', category: 'Language' },
  { name: 'Supabase', key: 'backend', category: 'Backend' },
  { name: 'PostgreSQL', key: 'database', category: 'Database' },
  { name: 'Spotify OAuth', key: 'auth', category: 'Auth' },
  { name: 'React Aria', key: 'ui', category: 'UI' },
  { name: 'Tailwind CSS v4', key: 'styling', category: 'Styling' },
  { name: 'Zod v4', key: 'validation', category: 'Validation' },
  { name: 'Bun', key: 'runtime', category: 'Runtime' },
  { name: 'Vercel', key: 'hosting', category: 'Hosting' },
]

const frameShadow = 'shadow-[0_24px_48px_-28px_color-mix(in_oklch,var(--color-night)_45%,transparent)]'

// Keeps the decorative "(06)" counter on the same line as the last word, so it never wraps alone.
function splitLast(text) {
  const i = text.lastIndexOf(' ')
  return i < 0 ? ['', text] : [text.slice(0, i + 1), text.slice(i + 1)]
}
const featuresHeading = computed(() => splitLast(t('vibebify.featuresTitle')))
const stackHeading = computed(() => splitLast(t('vibebify.stackTitle')))

// display-lg bottoms out at 40px; long Spanish words ("FUNCIONALIDADES") need it smaller below sm.
const headingClass = 'font-display text-display-lg uppercase [overflow-wrap:anywhere] max-sm:text-[length:min(2.5rem,9.6vw)] lg:col-span-9'
const counterClass = 'ml-2 hidden align-top text-[0.28em] leading-none font-semibold tracking-normal text-graphite sm:inline-block'
</script>

<template>
  <main id="main" tabindex="-1" class="outline-none">
    <header class="container-site pt-32 md:pt-40">
      <router-link
        :to="{ path: '/', hash: '#portfolio' }"
        class="group -ml-1 inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium uppercase tracking-[0.01em] text-graphite transition-colors hover:text-ink"
      >
        <ArrowLeft :size="16" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-x-0.5" />
        <span class="link-underline">{{ t('vibebify.back') }}</span>
      </router-link>

      <PageHeader v-motion="enter(100)" class="mt-6 md:mt-8" :title="t('vibebify.title')" :kicker="t('vibebify.badge')" />

      <div v-motion="enter(250)" class="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end">
        <p class="max-w-[40rem] text-lg leading-relaxed text-graphite md:text-xl lg:col-span-7">
          {{ t('vibebify.subtitle') }}
        </p>
        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
          <ArrowButton class="w-full sm:w-auto" href="https://github.com/ivansmb11/vibebify" external>{{ t('vibebify.viewSource') }}</ArrowButton>
          <ArrowButton class="w-full sm:w-auto" href="https://vibebify.ivanmendoza.dev" tone="ink" external>{{ t('vibebify.liveApp') }}</ArrowButton>
        </div>
      </div>
    </header>

    <div class="container-site mt-12 md:mt-16">
      <figure v-motion="enter(400)" class="bg-card p-2 md:p-3" :class="frameShadow">
        <img
          :src="landingImg"
          :alt="t('vibebify.landingAlt', 'Vibebify landing page')"
          width="3020"
          height="1724"
          class="block h-auto w-full bg-mist"
          loading="eager"
          fetchpriority="high"
        />
        <figcaption class="mt-2 flex items-center justify-between gap-4 bg-mist-soft px-3 py-2 text-[13px] text-graphite md:mt-3 md:text-sm">
          <span class="flex items-center gap-1.5 uppercase text-ink">
            <AsteriskMark class="size-3 text-accent" />Vibebify
          </span>
          <span class="truncate">/vibebify.ivanmendoza.dev</span>
        </figcaption>
      </figure>
    </div>

    <section aria-labelledby="vb-origin" class="container-site mt-20 md:mt-32">
      <div v-motion="reveal()" class="grid gap-8 bg-mist p-6 sm:p-8 md:p-12 lg:grid-cols-12 lg:gap-10">
        <div class="flex flex-col justify-between gap-10 lg:col-span-4">
          <h2 id="vb-origin">
            <SectionChip class="bg-card! text-ink!">{{ t('vibebify.inspirationLabel') }}</SectionChip>
          </h2>
          <AsteriskMark class="hidden size-24 text-muted/45 lg:block" :weight="1.1" />
        </div>
        <p class="max-w-[46rem] text-lg leading-[1.55] font-medium tracking-[-0.01em] text-ink md:text-[1.375rem] lg:col-span-8">
          {{ t('vibebify.inspirationText') }}<a
            href="https://github.com/michellexliu/receiptify"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent-deep"
          >Receiptify</a>{{ t('vibebify.inspirationBy') }}
        </p>
      </div>
    </section>

    <section aria-labelledby="vb-features" class="container-site mt-24 md:mt-40">
      <div v-motion="reveal()" class="grid gap-5 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-3 lg:pt-3">
          <SectionChip>{{ t('vibebify.featuresLabel') }}</SectionChip>
        </div>
        <h2 id="vb-features" :class="headingClass">
          {{ featuresHeading[0] }}<span class="sm:whitespace-nowrap">{{ featuresHeading[1] }}<span aria-hidden="true" :class="counterClass">({{ pad(features.length) }})</span></span>
        </h2>
      </div>

      <div class="mt-10 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <div
          role="tablist"
          aria-orientation="vertical"
          :aria-label="t('vibebify.featuresTitle')"
          class="flex flex-col gap-1.5 lg:col-span-4"
          @keydown="onTabKey"
        >
          <button
            v-for="(feature, i) in features"
            :id="`vb-tab-${feature.key}`"
            :key="feature.key"
            :ref="(el) => (tabRefs[i] = el)"
            type="button"
            role="tab"
            :aria-selected="activeFeature === i"
            aria-controls="vb-feature-panel"
            :tabindex="activeFeature === i ? 0 : -1"
            class="group flex min-h-11 w-full cursor-pointer items-start gap-3.5 rounded-[3px] border-l-[3px] px-4 py-3.5 text-left transition-colors duration-200 active:translate-y-px"
            :class="activeFeature === i
              ? 'border-accent bg-ink text-paper'
              : 'border-transparent bg-card text-ink hover:border-line hover:bg-mist'"
            @click="selectFeature(i)"
          >
            <component
              :is="feature.icon"
              :size="18"
              aria-hidden="true"
              class="mt-0.5 shrink-0 transition-colors"
              :class="activeFeature === i ? 'text-accent' : 'text-graphite group-hover:text-ink'"
            />
            <span class="min-w-0 flex-1">
              <span class="block text-[15px] font-semibold leading-snug">{{ t(`vibebify.features.${feature.key}.title`) }}</span>
              <span
                class="mt-0.5 block text-[13px] leading-snug"
                :class="activeFeature === i ? 'text-paper/70' : 'text-graphite'"
              >{{ t(`vibebify.features.${feature.key}.short`) }}</span>
            </span>
            <span
              aria-hidden="true"
              class="mt-0.5 shrink-0 text-xs font-medium tabular-nums"
              :class="activeFeature === i ? 'text-paper/60' : 'text-graphite'"
            >{{ pad(i + 1) }}</span>
          </button>
        </div>

        <div
          id="vb-feature-panel"
          role="tabpanel"
          tabindex="0"
          :aria-labelledby="`vb-tab-${current.key}`"
          class="min-w-0 lg:col-span-8"
        >
          <figure class="bg-card p-2 md:p-3" :class="frameShadow">
            <div class="relative aspect-[3020/1720] overflow-hidden bg-mist">
              <transition
                enter-active-class="transition-opacity duration-300 ease-out"
                enter-from-class="opacity-0"
                leave-active-class="absolute inset-0 transition-opacity duration-200 ease-in"
                leave-to-class="opacity-0"
              >
                <img
                  :key="current.key"
                  :src="current.img"
                  :alt="t(`vibebify.features.${current.key}.title`)"
                  width="3020"
                  height="1720"
                  class="absolute inset-0 block size-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </transition>
            </div>
            <figcaption class="mt-2 flex items-center justify-between gap-4 bg-mist-soft px-3 py-2 text-[13px] text-graphite md:mt-3 md:text-sm">
              <span class="flex min-w-0 items-center gap-1.5 uppercase text-ink">
                <AsteriskMark class="size-3 shrink-0 text-accent" />
                <span class="truncate">{{ t(`vibebify.features.${current.key}.title`) }}</span>
              </span>
              <span class="shrink-0 tabular-nums">{{ pad(activeFeature + 1) }} / {{ pad(features.length) }}</span>
            </figcaption>
          </figure>
          <p class="mt-6 max-w-[44rem] text-base leading-relaxed text-graphite md:mt-8 md:text-lg">
            {{ t(`vibebify.features.${current.key}.detail`) }}
          </p>
        </div>
      </div>
    </section>

    <section aria-labelledby="vb-stack" class="container-site mt-24 md:mt-40">
      <div v-motion="reveal()" class="grid gap-5 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-3 lg:pt-3">
          <SectionChip>{{ t('vibebify.stackLabel') }}</SectionChip>
        </div>
        <h2 id="vb-stack" :class="headingClass">
          {{ stackHeading[0] }}<span class="sm:whitespace-nowrap">{{ stackHeading[1] }}<span aria-hidden="true" :class="counterClass">({{ pad(stack.length) }})</span></span>
        </h2>
      </div>

      <!-- 10 items only divide evenly into 2 or 5 columns; 3 would orphan the last card. -->
      <ul v-motion="reveal(120)" class="mt-10 grid grid-cols-2 gap-2 md:mt-16 md:gap-3 lg:grid-cols-5">
        <li
          v-for="tech in stack"
          :key="tech.name"
          class="flex min-h-32 flex-col justify-between gap-6 bg-card p-4 md:p-5 lg:min-h-40"
        >
          <span class="text-[13px] text-graphite">{{ t(`vibebify.stackCategories.${tech.key}`, tech.category) }}</span>
          <span class="text-base leading-tight font-bold tracking-[-0.01em] uppercase md:text-lg">{{ tech.name }}</span>
        </li>
      </ul>
    </section>

    <section aria-labelledby="vb-arch" class="container-site mt-24 pb-24 md:mt-40 md:pb-40">
      <ArchitectureDiagram heading-id="vb-arch" />
    </section>
  </main>
</template>
