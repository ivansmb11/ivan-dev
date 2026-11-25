<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { GraduationCap, MapPin } from 'lucide-vue-next'
import ArrowButton from '@/components/ui/ArrowButton.vue'
import AssetSlot from '@/components/ui/AssetSlot.vue'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'
import SectionChip from '@/components/ui/SectionChip.vue'
import SplitHeading from '@/components/ui/SplitHeading.vue'
import { reveal, scrollBehavior } from '@/motion'

const { t } = useI18n()
const router = useRouter()

const highlights = computed(() => [
  { key: 'education', icon: GraduationCap, title: t('about.education'), text: t('about.educationText') },
  { key: 'location', icon: MapPin, title: t('about.location'), text: t('about.locationText') },
])

const stats = [
  { key: 'years', value: 4, suffix: '+' },
  { key: 'companies', value: 3, suffix: '' },
  { key: 'projects', value: 5, suffix: '+' },
  { key: 'technologies', value: 15, suffix: '+' },
]

const counters = ref(stats.map(() => 0))
const counterStarted = ref(false)
const counterEl = ref(null)
let observer = null

function animateCounters() {
  if (counterStarted.value) return
  counterStarted.value = true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counters.value = stats.map((stat) => stat.value)
    return
  }
  stats.forEach((stat, i) => {
    const duration = 1500
    const start = performance.now()
    function step(now) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      counters.value[i] = Math.round(eased * stat.value)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      animateCounters()
      observer?.disconnect()
    },
    { threshold: 0.3 },
  )
  if (counterEl.value) observer.observe(counterEl.value)
})

onBeforeUnmount(() => observer?.disconnect())

// Resolved through the router so open-in-new-tab lands on the home route, not a bogus '#contact' path.
const contactHref = router.resolve({ path: '/', hash: '#contact' }).href

function toContact() {
  const contact = document.getElementById('contact')
  contact?.scrollIntoView({ behavior: scrollBehavior() })
  contact?.focus({ preventScroll: true })
}
</script>

<template>
  <section id="about" aria-labelledby="about-heading" class="py-16 sm:py-24 md:py-36">
    <div class="container-site">
      <div v-motion="reveal()" class="max-w-[60rem]">
        <SectionChip>{{ t('about.label') }}</SectionChip>
        <!-- Below sm the display minimum would split "CONFIABLES" mid-word at 320px -->
        <SplitHeading
          id="about-heading"
          class="mt-5 text-balance max-sm:text-[clamp(2rem,10.5vw,2.5rem)]"
          :lead="t('about.headingLead')"
          :rest="t('about.headingRest')"
          size="lg"
        />
      </div>

      <div class="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-8">
        <figure v-motion="reveal(100)" class="w-full max-w-[26rem] lg:col-span-5 lg:max-w-none">
          <div class="bg-card p-2 shadow-[0_18px_40px_-24px_var(--color-night)] shadow-night/35 sm:p-3 lg:sticky lg:top-28">
            <AssetSlot id="about-portrait" alt="Ivan Mendoza" class="aspect-[5/6] w-full" />
            <figcaption class="mt-2 flex items-center justify-between gap-3 bg-mist-soft px-3 py-2.5 text-[13px] text-graphite sm:mt-3 sm:text-[15px]">
              <span class="flex min-w-0 items-center gap-2 uppercase text-ink">
                <AsteriskMark class="size-3.5 shrink-0 text-accent" />
                <span class="truncate">Ivan Mendoza</span>
              </span>
              <span class="shrink-0">/{{ t('hero.location') }}</span>
            </figcaption>
          </div>
        </figure>

        <div class="flex min-w-0 flex-col gap-12 md:gap-16 lg:col-span-7 lg:pl-4 xl:pl-10">
          <!-- onyx, not ink: ink flips to near-white in the dark theme and would wash out the white text -->
          <div
            v-motion="reveal(150)"
            class="relative isolate flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-[4px] p-6 text-white md:min-h-[24rem] md:p-10 dark:border dark:border-line"
          >
            <AssetSlot id="about-role-card" tone="dark" compact alt="" class="absolute inset-0 -z-20" />
            <div aria-hidden="true" class="absolute inset-0 -z-10 bg-linear-to-t from-onyx/90 via-onyx/55 to-onyx/10" />
            <p class="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.02em] text-white/80">
              <AsteriskMark class="size-3 text-accent" :weight="2" />{{ t('hero.role') }}
            </p>
            <p class="mt-4 max-w-[22ch] font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold uppercase leading-[1.02] tracking-[-0.035em] text-balance">
              {{ t('about.thesis') }}
            </p>
            <p class="mt-4 max-w-[34rem] text-sm leading-relaxed text-white/80 md:text-[15px]">{{ t('about.roleCardText') }}</p>
          </div>

          <div v-motion="reveal()" class="max-w-[40rem]">
            <p class="text-lg leading-[1.5] font-medium tracking-[-0.01em] text-ink md:text-xl">{{ t('about.bio1') }}</p>
            <p class="mt-6 text-base leading-relaxed text-graphite">{{ t('about.bio2') }}</p>
            <ArrowButton :href="contactHref" class="mt-8" @click.prevent="toContact">{{ t('hero.letsTalk') }}</ArrowButton>
          </div>

          <div
            ref="counterEl"
            v-motion="reveal()"
            class="relative isolate overflow-hidden rounded-[4px] bg-card p-6 md:p-8"
          >
            <AssetSlot id="about-texture" tone="white" compact class="absolute inset-0 -z-20" />
            <div aria-hidden="true" class="absolute inset-0 -z-10 bg-linear-to-r from-card/85 via-card/60 to-card/30" />
            <p class="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.01em] text-ink">
              <AsteriskMark class="size-3.5 text-accent" :weight="2" />{{ t('about.statsLabel') }}
            </p>
            <dl class="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
              <div v-for="(stat, i) in stats" :key="stat.key" class="flex flex-col border-t border-ink/15 pt-4">
                <dt class="mt-2 text-sm leading-snug text-graphite">{{ t('stats.' + stat.key) }}</dt>
                <dd class="order-first font-display text-5xl leading-none font-bold tracking-[-0.045em] text-ink tabular-nums">
                  <!-- Screen readers get the final value, not the ticking intermediate numbers -->
                  <span aria-hidden="true">{{ counters[i] }}{{ stat.suffix }}</span>
                  <span class="sr-only">{{ stat.value }}{{ stat.suffix }}</span>
                </dd>
              </div>
            </dl>
          </div>

          <dl class="grid gap-10 sm:grid-cols-2 sm:gap-8">
            <div
              v-for="(item, i) in highlights"
              :key="item.key"
              v-motion="reveal(i * 80)"
              class="flex flex-col border-t border-line pt-6"
            >
              <dt class="flex items-center gap-2.5 text-[15px] font-semibold uppercase tracking-[0.01em] text-ink">
                <component :is="item.icon" :size="18" :stroke-width="1.75" class="shrink-0 text-accent" aria-hidden="true" />
                {{ item.title }}
              </dt>
              <dd class="mt-3 text-sm leading-relaxed text-graphite">
                {{ item.text }}
                <AssetSlot
                  v-if="item.key === 'location'"
                  id="about-location-map"
                  class="mt-5 aspect-[1000/626] w-full max-w-[18rem]"
                  fit="contain"
                />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>
