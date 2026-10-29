<script setup>
import { computed, ref } from 'vue'
import { ArrowUpRight, Play } from 'lucide-vue-next'
import { NuxtLink } from '#components'
import AssetSlot from '@/components/ui/AssetSlot.vue'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'
import SectionChip from '@/components/ui/SectionChip.vue'
import SplitHeading from '@/components/ui/SplitHeading.vue'
import ArrowButton from '@/components/ui/ArrowButton.vue'
import SwipeDots from '@/components/ui/SwipeDots.vue'
import { reveal } from '@/motion'

const { t } = useI18n()
const year = new Date().getFullYear()
const track = ref(null)

const projects = computed(() => [
  {
    key: 'agentPlatform',
    kind: 'framed',
    slot: 'project-agent-platform',
    title: 'Agent Platform',
    description: t('portfolio.agentPlatform'),
    tags: ['NestJS', 'React 19', 'Vertex AI', 'pgvector', 'RAG', 'Evals'],
    caseStudy: '/agent-platform',
  },
  {
    key: 'vibebify',
    kind: 'framed',
    slot: 'project-vibebify',
    title: 'Vibebify',
    description: t('portfolio.vibebify'),
    tags: ['Next.js 16', 'Supabase', 'PostgreSQL', 'Spotify API', 'Social Media'],
    github: 'https://github.com/ivansmb11/vibebify',
    caseStudy: '/vibebify',
  },
  {
    key: 'concierge',
    kind: 'video',
    slot: 'project-concierge',
    title: 'VIP Data Concierge',
    description: t('portfolio.vipConcierge'),
    tags: ['GCP', 'Vertex AI', 'LangChain', 'Cloud Run', 'PostgreSQL', 'Zero-Trust'],
    github: 'https://github.com/ivansmb11/vip-data-concierge',
    caseStudy: '/concierge',
  },
  {
    key: 'soon',
    kind: 'soon',
    title: t('portfolio.comingSoon'),
    description: t('portfolio.comingSoonText'),
    tags: [t('portfolio.inProgress', 'In progress')],
  },
])
</script>

<template>
  <section id="portfolio" aria-labelledby="portfolio-heading" class="py-16 md:py-32">
    <div class="container-site">
      <div v-motion="reveal()" class="flex flex-col gap-5 md:gap-6">
        <SectionChip>{{ t('portfolio.label') }}</SectionChip>
        <SplitHeading
          id="portfolio-heading"
          :lead="t('portfolio.headingLead')"
          :rest="t('portfolio.headingRest')"
          size="lg"
          class="max-w-[16ch] text-balance"
        />
      </div>

      <!-- Each project spans two subgrid rows (media, text) so both cards in a row share heights. -->
      <ul ref="track" class="swipe-track mt-14 grid grid-cols-1 gap-x-5 md:mt-20 md:grid-cols-2 lg:gap-x-8">
        <li
          v-for="(project, i) in projects"
          :key="project.key"
          v-motion="reveal((i % 2) * 140)"
          class="flex flex-col md:row-span-2 md:grid md:grid-cols-1 md:grid-rows-subgrid md:gap-y-0"
          :class="i >= 2 ? 'md:mt-20 lg:mt-24' : ''"
        >
          <component
            v-if="project.kind === 'framed'"
            :is="project.caseStudy ? NuxtLink : 'div'"
            v-bind="project.caseStudy ? { to: project.caseStudy, tabindex: -1, 'aria-hidden': 'true' } : {}"
            class="group block bg-card p-2 shadow-[0_18px_40px_-24px_var(--color-night)] shadow-night/35 sm:p-3"
          >
            <span class="block overflow-hidden">
              <AssetSlot
                :id="project.slot"
                :alt="`${project.title} preview`"
                class="aspect-[4/3] w-full transition-transform duration-700 ease-out-quint"
                :class="project.caseStudy ? 'group-hover:scale-[1.02]' : ''"
              />
            </span>
            <span class="mt-2 flex items-center justify-between gap-3 bg-mist-soft px-3 py-2.5 text-[13px] text-graphite sm:mt-3 sm:text-[15px]">
              <span class="flex min-w-0 items-center gap-2 uppercase text-ink">
                <AsteriskMark class="size-3.5 shrink-0 text-accent" />
                <span class="truncate">{{ project.title }}</span>
              </span>
              <span class="shrink-0">/{{ t('portfolio.sideProject') }}</span>
            </span>
          </component>

          <NuxtLink
            v-else-if="project.kind === 'video'"
            :to="project.caseStudy"
            :aria-label="`${project.title}: ${t('portfolio.watchDemo')}`"
            class="group relative isolate block aspect-[4/3] overflow-hidden rounded-md bg-night text-white md:aspect-auto"
          >
            <!-- The play button sits dead center, so the placeholder's slot label moves to the top edge (no effect once the image exists). -->
            <AssetSlot
              :id="project.slot"
              tone="dark"
              compact
              class="absolute inset-0 -z-20 transition-transform duration-700 ease-out-quint group-hover:scale-[1.03] [&>div]:justify-start [&>div]:pt-3"
            />
            <span aria-hidden="true" class="absolute inset-0 -z-10 bg-linear-to-t from-night/70 via-night/10 to-night/20" />
            <span class="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span class="grid size-14 place-items-center rounded-full bg-white text-onyx shadow-[0_10px_30px_-10px_var(--color-night)] transition-transform duration-500 ease-out-quint group-hover:scale-110 group-active:scale-100">
                <Play :size="18" fill="currentColor" :stroke-width="0" class="translate-x-px" aria-hidden="true" />
              </span>
              <span class="text-[15px] font-semibold tracking-[-0.01em]">{{ t('portfolio.watchDemo') }}</span>
            </span>
            <span class="absolute bottom-5 left-5 text-[13px] font-semibold sm:bottom-6 sm:left-6">©{{ year }} {{ project.title }}</span>
          </NuxtLink>

          <div
            v-else
            class="relative isolate flex aspect-[4/3] flex-col items-center max-md:aspect-auto max-md:min-h-[20rem] max-md:flex-1 justify-start gap-4 overflow-hidden rounded-md border border-dashed border-muted/60 p-8 pt-14 text-center md:pt-20"
          >
            <AssetSlot id="project-coming-soon" class="absolute inset-0 -z-10" position="bottom" />
            <span class="absolute top-4 left-4 rounded-[2px] bg-mist px-2 py-1 text-[11px] font-medium uppercase leading-none tracking-[0.02em] text-graphite">
              {{ project.tags[0] }}
            </span>
            <h3 class="font-display text-2xl font-bold uppercase leading-none tracking-[-0.035em] md:text-[1.75rem]">
              {{ project.title }}
            </h3>
            <p class="max-w-[22rem] text-sm leading-relaxed text-graphite">{{ project.description }}</p>
          </div>

          <div v-if="project.kind !== 'soon'" class="flex flex-col items-start pt-6">
            <h3 class="font-display text-2xl font-bold uppercase leading-none tracking-[-0.035em] md:text-[1.75rem]">
              {{ project.title }}
            </h3>
            <p class="mt-3 max-w-[38rem] text-[15px] leading-relaxed text-graphite">{{ project.description }}</p>
            <ul class="mt-5 flex flex-wrap gap-1.5">
              <li
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-[2px] bg-mist px-2 py-1 text-[11px] leading-none text-graphite"
              >{{ tag }}</li>
            </ul>
            <div class="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
              <ArrowButton v-if="project.caseStudy" :to="project.caseStudy">
                {{ t('portfolio.caseStudy') }}<span class="sr-only">: {{ project.title }}</span>
              </ArrowButton>
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="group/src inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap text-sm font-medium uppercase tracking-[0.01em]"
              >
                <span class="link-underline group-hover/src:bg-[length:100%_1px]">{{ t('portfolio.source') }}</span>
                <ArrowUpRight :size="16" :stroke-width="2" aria-hidden="true" class="transition-[color,translate] duration-300 group-hover/src:-translate-y-0.5 group-hover/src:translate-x-0.5 group-hover/src:text-accent" />
                <span class="sr-only">: {{ project.title }} (GitHub)</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
      <SwipeDots :track="track" :count="projects.length" :label="t('portfolio.label')" />
    </div>
  </section>
</template>
