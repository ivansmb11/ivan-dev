<script setup>
import { computed } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import PageHeader from '@/components/ui/PageHeader.vue'
import SectionChip from '@/components/ui/SectionChip.vue'
import RunLoop from '@/components/gecko/RunLoop.vue'
import StoryPlayer from '@/components/gecko/StoryPlayer.vue'
import OntologyMap from '@/components/gecko/OntologyMap.vue'
import UseCases from '@/components/gecko/UseCases.vue'
import ShipLoop from '@/components/gecko/ShipLoop.vue'
import { enter, reveal } from '@/motion'

const { t } = useI18n()

useSeoMeta({
  title: 'Gecko | Ivan Mendoza',
  description: 'Gecko, an agent platform for long-running work: Events wake agents, Policies guard every tool call, and evals gate every release.',
  ogUrl: 'https://ivanmendoza.dev/gecko',
  ogTitle: 'Gecko | Ivan Mendoza',
})


const reasons = ['problem', 'sleep', 'judge', 'truth', 'code', 'name']

const sections = computed(() => ({
  loop: { label: t('gecko.loopLabel'), title: t('gecko.loopTitle'), intro: t('gecko.loopIntro') },
  story: { label: t('gecko.storyLabel'), title: t('gecko.storyTitle'), intro: t('gecko.storyIntro') },
  map: { label: t('gecko.mapLabel'), title: t('gecko.mapTitle'), intro: t('gecko.mapIntro') },
  uses: { label: t('gecko.usesLabel'), title: t('gecko.usesTitle'), intro: t('gecko.usesIntro') },
  ship: { label: t('gecko.shipLabel'), title: t('gecko.shipTitle'), intro: t('gecko.shipIntro') },
}))
</script>

<template>
  <main id="main" tabindex="-1" class="outline-none">
    <header class="container-site pt-32 md:pt-40">
      <NuxtLink
        :to="{ path: '/', hash: '#portfolio' }"
        class="group -ml-1 inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium uppercase tracking-[0.01em] text-graphite transition-colors hover:text-ink"
      >
        <ArrowLeft :size="16" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-x-0.5" />
        <span class="link-underline">{{ t('gecko.back') }}</span>
      </NuxtLink>

      <PageHeader v-motion="enter(100)" class="mt-6 md:mt-8" :title="t('gecko.title')" :kicker="t('gecko.badge')" />

      <p v-motion="enter(250)" class="mt-10 max-w-[46rem] text-lg leading-relaxed text-graphite md:mt-14 md:text-xl">
        {{ t('gecko.subtitle') }}
      </p>
    </header>

    <section aria-labelledby="gk-loop" class="container-site mt-20 md:mt-32">
      <div v-motion="reveal()" class="glass rounded-glass p-6 sm:p-8 md:p-12">
        <div class="grid gap-5 lg:grid-cols-12 lg:gap-10">
          <div class="lg:col-span-4">
            <SectionChip tone="tint">{{ sections.loop.label }}</SectionChip>
            <h2 id="gk-loop" class="mt-5 text-3xl leading-[1.05] font-bold tracking-[-0.03em] text-ink md:text-4xl">{{ sections.loop.title }}</h2>
            <p class="mt-4 text-[15px] leading-relaxed text-graphite md:text-base">{{ sections.loop.intro }}</p>
          </div>
          <div class="lg:col-span-8">
            <RunLoop />
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="gk-idea" class="container-site mt-12 md:mt-16">
      <div v-motion="reveal()" class="glass grid gap-8 rounded-glass p-6 sm:p-8 md:p-12 lg:grid-cols-12 lg:gap-10">
        <h2 id="gk-idea" class="lg:col-span-4">
          <SectionChip tone="tint">{{ t('gecko.ideaLabel') }}</SectionChip>
        </h2>
        <div class="flex flex-col gap-5 lg:col-span-8">
          <p class="max-w-[46rem] text-lg leading-[1.55] font-medium tracking-[-0.01em] text-ink md:text-[1.375rem]">{{ t('gecko.ideaText') }}</p>
          <p class="max-w-[46rem] text-[15px] leading-relaxed text-graphite md:text-base">{{ t('gecko.ideaMore') }}</p>
        </div>
      </div>
    </section>

    <section
      v-for="key in ['story', 'map', 'uses', 'ship']"
      :key="key"
      :aria-labelledby="`gk-${key}`"
      class="container-site mt-24 md:mt-40"
    >
      <div v-motion="reveal()" class="grid gap-5 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-3 lg:pt-3">
          <SectionChip>{{ sections[key].label }}</SectionChip>
        </div>
        <div class="lg:col-span-9">
          <h2 :id="`gk-${key}`" class="font-display text-display-lg uppercase [overflow-wrap:anywhere] max-sm:text-[length:min(2.5rem,9.6vw)]">{{ sections[key].title }}</h2>
          <p class="mt-5 max-w-[44rem] text-base leading-relaxed text-graphite md:mt-6 md:text-lg">{{ sections[key].intro }}</p>
        </div>
      </div>
      <div class="mt-10 md:mt-14">
        <StoryPlayer v-if="key === 'story'" />
        <OntologyMap v-else-if="key === 'map'" />
        <UseCases v-else-if="key === 'uses'" />
        <ShipLoop v-else />
      </div>
    </section>

    <section aria-labelledby="gk-why" class="container-site mt-24 pb-24 md:mt-40 md:pb-40">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div v-motion="reveal()" class="lg:col-span-5">
          <div class="lg:sticky lg:top-28">
            <SectionChip>{{ t('gecko.whyLabel') }}</SectionChip>
            <h2 id="gk-why" class="mt-5 font-display text-display-lg uppercase [overflow-wrap:anywhere] max-sm:text-[length:min(2.5rem,9.6vw)]">{{ t('gecko.whyTitle') }}</h2>
            <blockquote class="mt-8 border-l-[3px] border-accent pl-5 text-xl leading-snug font-semibold tracking-[-0.015em] text-ink md:text-2xl">
              {{ t('gecko.whyQuote') }}
            </blockquote>
          </div>
        </div>
        <ol class="flex flex-col gap-2 lg:col-span-7 md:gap-3">
          <li
            v-for="(r, i) in reasons"
            :key="r"
            v-motion="reveal(80)"
            class="glass rounded-glass p-6 md:p-8"
          >
            <p class="flex items-baseline gap-3">
              <span class="text-xs font-medium tabular-nums text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="text-xl leading-tight font-bold tracking-[-0.02em] text-ink md:text-2xl">{{ t(`gecko.why.${r}.title`) }}</span>
            </p>
            <p class="mt-3 text-[15px] leading-relaxed text-graphite md:text-base">{{ t(`gecko.why.${r}.text`) }}</p>
          </li>
        </ol>
      </div>
    </section>
  </main>
</template>
