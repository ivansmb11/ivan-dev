<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowLeft } from 'lucide-vue-next'
import ConciergeDoc from '@/components/concierge/ConciergeDoc.vue'
import NetworkDiagram from '@/components/concierge/NetworkDiagram.vue'
import ConciergeChat from '@/components/concierge/ConciergeChat.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import SectionChip from '@/components/ui/SectionChip.vue'
import SplitHeading from '@/components/ui/SplitHeading.vue'
import ArrowButton from '@/components/ui/ArrowButton.vue'
import { enter, reveal } from '@/motion'

const { t } = useI18n()

const REPO_URL = 'https://github.com/ivansmb11/vip-data-concierge'
const portfolioRoute = { path: '/', hash: '#portfolio' }

const sections = computed(() => [
  {
    id: 'documentation',
    nav: t('concierge.navDocs'),
    chip: t('concierge.docsTitle'),
    lead: t('concierge.docsHeadingLead', 'Zero trust'),
    rest: t('concierge.docsHeadingRest', 'by design'),
    intro: t('concierge.docsSubtitle'),
    component: ConciergeDoc,
  },
  {
    id: 'architecture',
    nav: t('concierge.navArch'),
    chip: t('concierge.archTitle'),
    lead: t('concierge.archHeadingLead', 'One hub,'),
    rest: t('concierge.archHeadingRest', 'isolated spokes'),
    intro: t('concierge.archSubtitle'),
    component: NetworkDiagram,
  },
  {
    id: 'live-chat',
    nav: t('concierge.navDemo'),
    chip: t('concierge.demoTitle'),
    lead: t('concierge.demoHeadingLead', 'See it'),
    rest: t('concierge.demoHeadingRest', 'in action'),
    intro: t('concierge.demoSubtitle'),
    component: ConciergeChat,
  },
])

// Focus follows the scroll so the next Tab continues inside the chosen section
// instead of returning to this nav and scrolling the page back to the top.
function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  target.focus({ preventScroll: true })
}
</script>

<template>
  <main id="main" tabindex="-1" class="outline-none">
    <header class="container-site pt-32 pb-16 md:pt-40 md:pb-24">
      <router-link
        v-motion="enter(0, 12)"
        :to="portfolioRoute"
        class="group -ml-1 inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium uppercase tracking-[0.01em] text-graphite transition-colors hover:text-ink"
      >
        <ArrowLeft :size="16" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-x-0.5" />
        <span class="link-underline">{{ t('concierge.back') }}</span>
      </router-link>

      <PageHeader
        v-motion="enter(120)"
        class="mt-8 md:mt-10 max-sm:[&_h1]:text-[length:min(3.4rem,13.5vw)]"
        :title="t('concierge.title')"
        :kicker="t('concierge.badge')"
      />

      <div
        v-motion="enter(260)"
        class="mt-12 grid grid-cols-1 gap-10 border-t border-line pt-10 md:mt-16 xl:grid-cols-12 xl:gap-6"
      >
        <div class="xl:col-span-7">
          <p class="max-w-2xl text-lg leading-relaxed text-graphite md:text-xl">{{ t('concierge.subtitle') }}</p>
          <ArrowButton :href="REPO_URL" external class="mt-8">{{ t('concierge.viewSource') }}</ArrowButton>
        </div>

        <nav
          :aria-label="t('concierge.navLabel', 'On this page')"
          class="xl:col-span-5 xl:col-start-8 xl:self-end"
        >
          <ul class="flex flex-wrap gap-2 xl:justify-end">
            <li v-for="(section, i) in sections" :key="section.id">
              <button
                type="button"
                class="group inline-flex min-h-11 cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-[3px] bg-mist px-4 text-xs font-medium uppercase tracking-[0.02em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper active:translate-y-px"
                @click="scrollToSection(section.id)"
              >
                <span class="tabular-nums text-graphite transition-colors duration-300 group-hover:text-paper/60">0{{ i + 1 }}</span>
                {{ section.nav }}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <section
      v-for="section in sections"
      :id="section.id"
      :key="section.id"
      :aria-labelledby="`${section.id}-heading`"
      tabindex="-1"
      class="scroll-mt-[5.25rem] border-t border-line py-20 outline-none! md:py-28"
    >
      <div class="container-site">
        <div v-motion="reveal()" class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6">
          <SectionChip class="self-start lg:col-span-3 lg:mt-3">{{ section.chip }}</SectionChip>
          <div class="lg:col-span-9">
            <SplitHeading
              :id="`${section.id}-heading`"
              :lead="section.lead"
              :rest="section.rest"
              size="md"
              class="text-balance"
            />
            <p class="mt-6 max-w-xl text-base leading-relaxed text-graphite md:text-lg">{{ section.intro }}</p>
          </div>
        </div>

        <div class="mt-14 md:mt-20">
          <component :is="section.component" />
        </div>
      </div>
    </section>

    <div class="border-t border-line">
      <div class="container-site flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between md:py-16">
        <router-link
          :to="portfolioRoute"
          class="group -ml-1 inline-flex min-h-11 w-fit items-center gap-2 px-1 text-sm font-medium uppercase tracking-[0.01em] text-graphite transition-colors hover:text-ink"
        >
          <ArrowLeft :size="16" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span class="link-underline">{{ t('concierge.back') }}</span>
        </router-link>
        <ArrowButton :href="REPO_URL" external tone="ink" class="w-fit">{{ t('concierge.viewSource') }}</ArrowButton>
      </div>
    </div>
  </main>
</template>
