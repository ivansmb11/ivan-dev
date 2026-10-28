<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { GraduationCap, Briefcase, MapPin } from 'lucide-vue-next'
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
  { key: 'experience', icon: Briefcase, title: t('about.experience'), text: t('about.experienceText') },
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
  <section id="about" class="py-24 md:py-36">
    <div class="container-site">
      <div class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-10 md:flex md:items-end md:gap-8">
        <!-- 63% keeps "BUILDING FINTECH" on one line at every lg+ width, like the reference's 3-line heading -->
        <div v-motion="reveal()" class="col-span-2 min-w-0 md:flex-1 lg:flex-none lg:basis-[63%]">
          <SectionChip>{{ t('about.label') }}</SectionChip>
          <!-- Below sm the display minimum would split "CONSTRUYENDO" mid-word at 320px -->
          <SplitHeading
            class="mt-5 max-sm:text-[clamp(2rem,10.5vw,2.5rem)]"
            :lead="t('about.headingLead')"
            :rest="t('about.headingRest')"
            size="lg"
          />
        </div>

        <div class="flex min-w-0 justify-center md:hidden lg:mt-12 lg:flex lg:flex-1 lg:self-center">
          <AsteriskMark class="size-[clamp(4.5rem,7vw,6.5rem)] text-line" :weight="2.6" />
        </div>

        <AssetSlot
          v-motion="reveal(150)"
          id="about-portrait"
          alt="Ivan Mendoza"
          class="aspect-[5/6] w-[10.5rem] shrink-0 self-end rounded-[3px] sm:w-[12rem] lg:w-[11rem] xl:w-[13.5rem]"
        />
      </div>

      <!-- Bio sits beside the bento only from xl; below that the 2-col bento needs the full width -->
      <div class="mt-16 grid gap-12 md:mt-24 xl:grid-cols-12 xl:gap-8">
        <div v-motion="reveal()" class="xl:col-span-4 xl:pr-6">
          <div class="grid gap-6 lg:grid-cols-2 lg:gap-8 xl:sticky xl:top-28 xl:block">
            <p class="text-xl leading-[1.4] font-medium tracking-[-0.015em] text-ink md:text-2xl md:leading-[1.35]">
              {{ t('about.bio1') }}
            </p>
            <div class="xl:mt-6">
              <p class="max-w-[34rem] text-base leading-relaxed text-graphite">
                {{ t('about.bio2') }}
              </p>
              <ArrowButton :href="contactHref" class="mt-10" @click.prevent="toContact">{{ t('hero.letsTalk') }}</ArrowButton>
            </div>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 xl:col-span-8">
          <div
            ref="counterEl"
            v-motion="reveal(100)"
            class="relative isolate flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[4px] bg-card p-6 pt-9 sm:row-span-2 sm:min-h-[26rem] md:p-8 md:pt-10"
          >
            <AssetSlot id="about-texture" tone="white" compact class="absolute inset-0 -z-20" />
            <div aria-hidden="true" class="absolute inset-0 -z-10 bg-linear-to-b from-card/55 via-card/25 to-card/85" />

            <p class="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.01em] text-ink">
              <AsteriskMark class="size-3.5 text-accent" :weight="2" />{{ t('about.statsLabel') }}
            </p>

            <dl class="mt-16 grid grid-cols-2 gap-x-4 gap-y-8">
              <div v-for="(stat, i) in stats" :key="stat.key" class="flex flex-col border-t border-ink/15 pt-4">
                <dt class="mt-2 text-sm leading-snug text-graphite">{{ t('stats.' + stat.key) }}</dt>
                <dd class="order-first font-display text-5xl leading-none font-bold tracking-[-0.045em] text-ink tabular-nums md:text-6xl">
                  <!-- Screen readers get the final value, not the ticking intermediate numbers -->
                  <span aria-hidden="true">{{ counters[i] }}{{ stat.suffix }}</span>
                  <span class="sr-only">{{ stat.value }}{{ stat.suffix }}</span>
                </dd>
              </div>
            </dl>
          </div>

          <!-- dark:border: the onyx-shaded bottom is ~1:1 against the dark page, so the card edge needs a rule there -->
          <div
            v-motion="reveal(180)"
            class="relative isolate flex aspect-[7/6] flex-col items-center justify-between overflow-hidden rounded-[4px] p-6 pt-9 text-center text-white md:pt-10 dark:border dark:border-line"
          >
            <AssetSlot id="about-role-card" tone="dark" compact alt="" class="absolute inset-0 -z-20" />
            <!-- onyx, not ink: ink flips to near-white in the dark theme and would wash out the white text -->
            <div aria-hidden="true" class="absolute inset-0 -z-10 bg-linear-to-t from-onyx/80 via-onyx/15 to-onyx/35" />

            <p class="flex items-start gap-0.5 text-lg font-bold tracking-tight">
              Ivan Mendoza<AsteriskMark class="size-2.5 text-white/85" :weight="2.4" />
            </p>
            <div>
              <p class="text-lg font-bold uppercase tracking-[-0.01em] md:text-xl">{{ t('hero.role') }}</p>
              <p class="mt-1.5 text-sm text-white/80">{{ t('about.roleCardText') }}</p>
            </div>
          </div>

          <div
            v-for="(item, i) in highlights"
            :key="item.key"
            v-motion="reveal(220 + i * 60)"
            class="flex flex-col rounded-[4px] bg-card p-6 md:p-8"
          >
            <component :is="item.icon" :size="22" :stroke-width="1.75" class="shrink-0 text-accent" aria-hidden="true" />
            <h3 class="mt-7 text-[15px] font-semibold uppercase tracking-[0.01em] text-ink">{{ item.title }}</h3>
            <p class="mt-2.5 text-sm leading-relaxed text-graphite">{{ item.text }}</p>
            <AssetSlot
              v-if="item.key === 'location'"
              id="about-location-map"
              class="mt-auto aspect-[1000/626] w-full pt-6"
              fit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
