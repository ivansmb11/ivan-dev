<script setup>
import { ref, computed, nextTick } from 'vue'
import { ArrowLeft, Bot, GitBranch, BookOpen, ShieldCheck, ShieldAlert, FlaskConical, MessagesSquare, Code } from 'lucide-vue-next'
import PageHeader from '@/components/ui/PageHeader.vue'
import SectionChip from '@/components/ui/SectionChip.vue'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'
import { enter, reveal } from '@/motion'
import { assetUrl } from '@/assets/slots'

useSeoMeta({
  ogUrl: 'https://ivanmendoza.dev/agent-platform',
  ogImage: assetUrl('meta/og-agent-platform.jpg'),
  ogImageAlt: 'Agent Platform, multi-tenant AI support agents',
  twitterImage: assetUrl('meta/og-agent-platform.jpg'),
})

const overviewImg = assetUrl('agent-platform/overview.webp')
const architectureImg = assetUrl('agent-platform/architecture.webp')

const { t } = useI18n()

const features = [
  { key: 'agents', icon: Bot, img: assetUrl('agent-platform/agents.webp') },
  { key: 'versions', icon: GitBranch, img: assetUrl('agent-platform/versions.webp') },
  { key: 'context', icon: BookOpen, img: assetUrl('agent-platform/knowledge.webp') },
  { key: 'guardrails', icon: ShieldCheck, img: assetUrl('agent-platform/guardrails.webp') },
  { key: 'safety', icon: ShieldAlert, img: assetUrl('agent-platform/inbox.webp') },
  { key: 'evals', icon: FlaskConical, img: assetUrl('agent-platform/evals.webp') },
  { key: 'playground', icon: MessagesSquare, img: assetUrl('agent-platform/playground.webp') },
  { key: 'widget', icon: Code, img: assetUrl('agent-platform/widget.webp') },
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
  { name: 'NestJS 11', key: 'api' },
  { name: 'Prisma 7', key: 'orm' },
  { name: 'PostgreSQL + pgvector', key: 'database' },
  { name: 'Redis', key: 'cache' },
  { name: 'Gemini on Vertex AI', key: 'llm' },
  { name: 'React 19 + Vite', key: 'dashboard' },
  { name: 'React Flow', key: 'flows' },
  { name: 'Firebase Auth', key: 'auth' },
  { name: 'TypeScript, Shadow DOM', key: 'widget' },
  { name: 'Cloud Run + Cloud SQL', key: 'hosting' },
]

const steps = ['ingest', 'decide', 'retrieve', 'generate', 'act']

const frameShadow = 'shadow-[0_24px_48px_-28px_color-mix(in_oklch,var(--color-night)_45%,transparent)]'

// Keeps the decorative "(08)" counter on the same line as the last word, so it never wraps alone.
function splitLast(text) {
  const i = text.lastIndexOf(' ')
  return i < 0 ? ['', text] : [text.slice(0, i + 1), text.slice(i + 1)]
}
const featuresHeading = computed(() => splitLast(t('agentPlatform.featuresTitle')))
const stackHeading = computed(() => splitLast(t('agentPlatform.stackTitle')))

// display-lg bottoms out at 40px; long Spanish words ("FUNCIONALIDADES") need it smaller below sm.
const headingClass = 'font-display text-display-lg uppercase [overflow-wrap:anywhere] max-sm:text-[length:min(2.5rem,9.6vw)] lg:col-span-9'
const counterClass = 'ml-2 hidden align-top text-[0.28em] leading-none font-semibold tracking-normal text-graphite sm:inline-block'
</script>

<template>
  <main id="main" tabindex="-1" class="outline-none">
    <header class="container-site pt-32 md:pt-40">
      <NuxtLink
        :to="{ path: '/', hash: '#portfolio' }"
        class="group -ml-1 inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium uppercase tracking-[0.01em] text-graphite transition-colors hover:text-ink"
      >
        <ArrowLeft :size="16" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-x-0.5" />
        <span class="link-underline">{{ t('agentPlatform.back') }}</span>
      </NuxtLink>

      <PageHeader v-motion="enter(100)" class="mt-6 md:mt-8" :title="t('agentPlatform.title')" :kicker="t('agentPlatform.badge')" />

      <p v-motion="enter(250)" class="mt-10 max-w-[44rem] text-lg leading-relaxed text-graphite md:mt-14 md:text-xl">
        {{ t('agentPlatform.subtitle') }}
      </p>
    </header>

    <div class="container-site mt-12 md:mt-16">
      <figure v-motion="enter(400)" class="bg-card p-2 md:p-3" :class="frameShadow">
        <img
          :src="overviewImg"
          :alt="t('agentPlatform.heroAlt')"
          width="2400"
          height="1500"
          class="block h-auto w-full bg-mist"
          loading="eager"
          fetchpriority="high"
        />
        <figcaption class="mt-2 flex items-center justify-between gap-4 bg-mist-soft px-3 py-2 text-[13px] text-graphite md:mt-3 md:text-sm">
          <span class="flex items-center gap-1.5 uppercase text-ink">
            <AsteriskMark class="size-3 text-accent" />{{ t('agentPlatform.heroCaption') }}
          </span>
          <span class="truncate">{{ t('agentPlatform.heroNote') }}</span>
        </figcaption>
      </figure>
    </div>

    <section aria-labelledby="ap-idea" class="container-site mt-20 md:mt-32">
      <div v-motion="reveal()" class="grid gap-8 bg-mist p-6 sm:p-8 md:p-12 lg:grid-cols-12 lg:gap-10">
        <h2 id="ap-idea" class="lg:col-span-4">
          <SectionChip class="bg-card! text-ink!">{{ t('agentPlatform.ideaLabel') }}</SectionChip>
        </h2>
        <p class="max-w-[46rem] text-lg leading-[1.55] font-medium tracking-[-0.01em] text-ink md:text-[1.375rem] lg:col-span-8">
          {{ t('agentPlatform.ideaText') }}
        </p>
      </div>
    </section>

    <section aria-labelledby="ap-features" class="container-site mt-24 md:mt-40">
      <div v-motion="reveal()" class="grid gap-5 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-3 lg:pt-3">
          <SectionChip>{{ t('agentPlatform.featuresLabel') }}</SectionChip>
        </div>
        <h2 id="ap-features" :class="headingClass">
          {{ featuresHeading[0] }}<span class="sm:whitespace-nowrap">{{ featuresHeading[1] }}<span aria-hidden="true" :class="counterClass">({{ pad(features.length) }})</span></span>
        </h2>
      </div>

      <div class="mt-10 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <div
          role="tablist"
          aria-orientation="vertical"
          :aria-label="t('agentPlatform.featuresTitle')"
          class="flex flex-col gap-1.5 lg:col-span-4"
          @keydown="onTabKey"
        >
          <button
            v-for="(feature, i) in features"
            :id="`ap-tab-${feature.key}`"
            :key="feature.key"
            :ref="(el) => (tabRefs[i] = el)"
            type="button"
            role="tab"
            :aria-selected="activeFeature === i"
            aria-controls="ap-feature-panel"
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
              <span class="block text-[15px] font-semibold leading-snug">{{ t(`agentPlatform.features.${feature.key}.title`) }}</span>
              <span
                class="mt-0.5 block text-[13px] leading-snug"
                :class="activeFeature === i ? 'text-paper/70' : 'text-graphite'"
              >{{ t(`agentPlatform.features.${feature.key}.short`) }}</span>
            </span>
            <span
              aria-hidden="true"
              class="mt-0.5 shrink-0 text-xs font-medium tabular-nums"
              :class="activeFeature === i ? 'text-paper/60' : 'text-graphite'"
            >{{ pad(i + 1) }}</span>
          </button>
        </div>

        <div
          id="ap-feature-panel"
          role="tabpanel"
          tabindex="0"
          :aria-labelledby="`ap-tab-${current.key}`"
          class="min-w-0 lg:col-span-8"
        >
          <figure class="bg-card p-2 md:p-3" :class="frameShadow">
            <div class="relative aspect-[16/10] overflow-hidden bg-mist">
              <transition
                enter-active-class="transition-opacity duration-300 ease-out"
                enter-from-class="opacity-0"
                leave-active-class="absolute inset-0 transition-opacity duration-200 ease-in"
                leave-to-class="opacity-0"
              >
                <img
                  :key="current.key"
                  :src="current.img"
                  :alt="t(`agentPlatform.features.${current.key}.alt`)"
                  width="2400"
                  height="1500"
                  class="absolute inset-0 block size-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </transition>
            </div>
            <figcaption class="mt-2 flex items-center justify-between gap-4 bg-mist-soft px-3 py-2 text-[13px] text-graphite md:mt-3 md:text-sm">
              <span class="flex min-w-0 items-center gap-1.5 uppercase text-ink">
                <AsteriskMark class="size-3 shrink-0 text-accent" />
                <span class="truncate">{{ t(`agentPlatform.features.${current.key}.title`) }}</span>
              </span>
              <span class="shrink-0 tabular-nums">{{ pad(activeFeature + 1) }} / {{ pad(features.length) }}</span>
            </figcaption>
          </figure>
          <p class="mt-6 max-w-[44rem] text-base leading-relaxed text-graphite md:mt-8 md:text-lg">
            {{ t(`agentPlatform.features.${current.key}.detail`) }}
          </p>
        </div>
      </div>
    </section>

    <section aria-labelledby="ap-stack" class="container-site mt-24 md:mt-40">
      <div v-motion="reveal()" class="grid gap-5 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-3 lg:pt-3">
          <SectionChip>{{ t('agentPlatform.stackLabel') }}</SectionChip>
        </div>
        <h2 id="ap-stack" :class="headingClass">
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
          <span class="text-[13px] text-graphite">{{ t(`agentPlatform.stackCategories.${tech.key}`) }}</span>
          <span class="text-base leading-tight font-bold tracking-[-0.01em] uppercase md:text-lg">{{ tech.name }}</span>
        </li>
      </ul>
    </section>

    <section aria-labelledby="ap-arch" class="container-site mt-24 pb-24 md:mt-40 md:pb-40">
      <div v-motion="reveal()" class="grid gap-5 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-3 lg:pt-3">
          <SectionChip>{{ t('agentPlatform.archLabel') }}</SectionChip>
        </div>
        <h2 id="ap-arch" :class="headingClass">{{ t('agentPlatform.archTitle') }}</h2>
      </div>

      <div class="mt-10 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <figure v-motion="reveal()" class="min-w-0 self-start bg-card p-2 md:p-3 lg:col-span-8" :class="frameShadow">
          <img
            :src="architectureImg"
            :alt="t('agentPlatform.archAlt')"
            width="2180"
            height="880"
            class="block h-auto w-full bg-mist"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="mt-2 flex items-center gap-1.5 bg-mist-soft px-3 py-2 text-[13px] text-graphite md:mt-3 md:text-sm">
            <AsteriskMark class="size-3 shrink-0 text-accent" />
            <span class="truncate">{{ t('agentPlatform.archCaption') }}</span>
          </figcaption>
        </figure>

        <div v-motion="reveal(120)" class="min-w-0 lg:col-span-4">
          <h3 class="text-sm font-semibold uppercase tracking-[0.01em] text-ink">{{ t('agentPlatform.archStepsTitle') }}</h3>
          <ol class="mt-5 flex flex-col gap-1.5">
            <li v-for="(step, i) in steps" :key="step" class="flex gap-3.5 bg-card p-4">
              <span aria-hidden="true" class="mt-0.5 shrink-0 text-xs font-medium tabular-nums text-accent">{{ pad(i + 1) }}</span>
              <span class="text-[15px] leading-relaxed text-graphite">{{ t(`agentPlatform.archSteps.${step}`) }}</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  </main>
</template>
