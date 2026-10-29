<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import AssetSlot from '@/components/ui/AssetSlot.vue'
import SectionChip from '@/components/ui/SectionChip.vue'
import SplitHeading from '@/components/ui/SplitHeading.vue'
import SwipeDots from '@/components/ui/SwipeDots.vue'
import { reveal } from '@/motion'

const { t } = useI18n()
const track = ref(null)

const jobs = computed(() => [
  {
    key: 'zazpay',
    slot: 'career-zazpay',
    role: t('career.zazpay.role'),
    company: t('career.zazpay.company'),
    type: t('career.zazpay.type'),
    period: t('career.zazpay.period'),
    location: t('career.zazpay.location'),
    mode: t('career.zazpay.mode'),
    description: t('career.zazpay.description'),
    skills: t('career.zazpay.skills').split(', '),
    current: true,
    previous: {
      role: t('career.zazpay.previous.role'),
      company: t('career.zazpay.company'),
      type: t('career.zazpay.type'),
      period: t('career.zazpay.previous.period'),
      duration: t('career.zazpay.previous.duration'),
      mode: t('career.zazpay.previous.mode'),
      description: t('career.zazpay.previous.description'),
      skills: t('career.zazpay.previous.skills').split(', '),
    },
  },
  {
    key: 'prestavale',
    slot: 'career-prestavale',
    role: t('career.prestavale.role'),
    company: t('career.prestavale.company'),
    type: t('career.prestavale.type'),
    period: t('career.prestavale.period'),
    duration: t('career.prestavale.duration'),
    location: t('career.prestavale.location'),
    mode: t('career.prestavale.mode'),
    description: t('career.prestavale.description'),
    skills: t('career.prestavale.skills').split(', '),
    current: false,
  },
  {
    key: 'ge',
    slot: 'career-ge-aerospace',
    role: t('career.ge.role'),
    company: t('career.ge.company'),
    type: t('career.ge.type'),
    period: t('career.ge.period'),
    duration: t('career.ge.duration'),
    location: t('career.ge.location'),
    mode: t('career.ge.mode'),
    description: t('career.ge.description'),
    skills: t('career.ge.skills').split(', '),
    current: false,
  },
])

// The ZAZPAY card is a cube: the current role on the front face, the earlier one on the side face.
const turned = ref(false)
const faceEls = ref([])
const faceHeights = ref([])
let hoverLocked = false
let lastPointer = ''
let observer

// Hover turns the cube once per visit, so the face that comes in can't turn it straight back.
function onArrowEnter(event) {
  if (event.pointerType !== 'mouse' || hoverLocked) return
  hoverLocked = true
  turned.value = !turned.value
}
function onArrowLeave() {
  hoverLocked = false
}
// Mouse users already turned it on hover; taps and the keyboard turn it on click.
function onArrowClick() {
  if (lastPointer !== 'mouse') turned.value = !turned.value
  lastPointer = ''
}

onMounted(() => {
  observer = new ResizeObserver(() => {
    faceHeights.value = faceEls.value.map((el) => el.offsetHeight)
  })
  faceEls.value.forEach((el) => observer.observe(el))
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section id="career" aria-labelledby="career-heading" class="py-16 md:py-32">
    <div class="container-site">
      <div v-motion="reveal()" class="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-3 lg:pt-[0.6rem]">
          <SectionChip>{{ t('career.label') }}</SectionChip>
        </div>
        <SplitHeading
          id="career-heading"
          :lead="t('career.headingLead')"
          :rest="t('career.headingRest')"
          size="lg"
          class="text-balance lg:col-span-9"
        />
      </div>

      <!-- Subgrid rows keep photos, roles and descriptions on shared baselines across the three cards. -->
      <ol ref="track" class="swipe-track mt-14 grid grid-cols-1 gap-x-5 gap-y-16 md:mt-20 md:grid-cols-3 md:gap-y-0 lg:gap-x-6">
        <li
          v-for="(job, i) in jobs"
          :key="job.key"
          v-motion="reveal(i * 120)"
          class="flex flex-col md:row-span-6"
          :class="job.previous
            ? 'relative z-10 md:block md:h-0 md:min-h-0'
            : 'md:grid md:grid-cols-1 md:grid-rows-subgrid md:gap-y-0'"
        >
          <AssetSlot
            :id="job.slot"
            :alt="t('career.photoAlt', { company: job.company }, `Ivan Mendoza, ${job.company}`)"
            class="aspect-[4/3] w-full rounded-[3px]"
          />

          <!-- Zero height on md+ keeps the turning cube out of the shared row sizing, so the neighbours never shift. -->
          <div
            v-if="job.previous"
            class="relative mt-6 [container-type:inline-size] [perspective:1800px] transition-[height] duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
            :style="faceHeights.length ? { height: `${faceHeights[turned ? 1 : 0]}px` } : undefined"
          >
            <button
              type="button"
              :aria-pressed="turned"
              class="group absolute top-0 right-0 z-10 inline-flex items-center gap-1.5 rounded-[2px] border border-line bg-paper px-2 py-1 text-[11px] font-semibold uppercase leading-none tracking-[0.04em] text-graphite transition-colors duration-300 hover:border-accent hover:text-accent"
              @pointerenter="onArrowEnter"
              @pointerleave="onArrowLeave"
              @pointerdown="lastPointer = $event.pointerType"
              @click="onArrowClick"
            >
              <span class="relative grid">
                <span
                  class="col-start-1 row-start-1 transition-opacity duration-500"
                  :class="turned ? 'opacity-0' : 'opacity-100'"
                  :aria-hidden="turned"
                >{{ t('career.showPrevious') }}</span>
                <span
                  class="col-start-1 row-start-1 text-right transition-opacity duration-500"
                  :class="turned ? 'opacity-100' : 'opacity-0'"
                  :aria-hidden="!turned"
                >{{ t('career.showCurrent') }}</span>
              </span>
              <ArrowRight
                :size="13"
                :stroke-width="2.25"
                aria-hidden="true"
                class="transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
                :class="turned ? '-scale-x-100' : ''"
              />
            </button>

            <div
              class="relative [transform-style:preserve-3d] transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
              :style="{ transform: `translateZ(-50cqw) rotateY(${turned ? -90 : 0}deg)` }"
            >
              <div
                v-for="(face, f) in [job, job.previous]"
                :key="f"
                ref="faceEls"
                class="bg-paper [backface-visibility:hidden]"
                :class="f === 0 ? 'relative' : 'absolute inset-x-0 top-0'"
                :style="{ transform: `rotateY(${f * 90}deg) translateZ(50cqw)` }"
                :inert="(f === 1) !== turned"
                :aria-hidden="(f === 1) !== turned"
              >
                <div class="flex min-h-[22px] items-center gap-3 pr-36 text-[13px] text-graphite">
                  <p>
                    {{ face.period }}<template v-if="face.duration"> · <span class="whitespace-nowrap">{{ face.duration }}</span></template>
                  </p>
                  <span
                    v-if="f === 0"
                    class="shrink-0 rounded-[2px] bg-accent-deep px-2 py-1 text-[11px] font-semibold uppercase leading-none tracking-[0.04em] text-white"
                  >{{ t('career.present') }}</span>
                </div>

                <h3 class="mt-3 font-display text-xl font-bold uppercase leading-[1.05] tracking-[-0.03em] lg:text-2xl">
                  {{ face.role }}
                </h3>

                <div class="mt-3 text-sm">
                  <p>
                    <span class="font-semibold">{{ face.company }}</span>
                    <span class="text-graphite"> · {{ face.type }}</span>
                  </p>
                  <p v-if="face.location || face.mode" class="mt-0.5 text-graphite">
                    {{ [face.location, face.mode].filter(Boolean).join(' · ') }}
                  </p>
                </div>

                <p class="mt-5 max-w-[34rem] text-sm leading-relaxed text-graphite">{{ face.description }}</p>

                <ul class="mt-5 flex flex-wrap content-start gap-1.5">
                  <li
                    v-for="skill in face.skills"
                    :key="skill"
                    class="rounded-[2px] bg-mist px-2 py-1 text-[11px] leading-none text-graphite"
                  >{{ skill }}</li>
                </ul>

                <!-- Fades the face that is turning away, which is what sells the depth. -->
                <span
                  aria-hidden="true"
                  class="pointer-events-none absolute inset-0 bg-paper transition-opacity duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
                  :class="(f === 1) === turned ? 'opacity-0' : 'opacity-70'"
                />
              </div>
            </div>
          </div>

          <template v-else>
            <div class="mt-6 flex items-center justify-between gap-3 text-[13px] text-graphite">
              <p>
                {{ job.period }}<template v-if="job.duration"> · {{ job.duration }}</template>
              </p>
            </div>

            <h3 class="mt-3 font-display text-xl font-bold uppercase leading-[1.05] tracking-[-0.03em] lg:text-2xl">
              {{ job.role }}
            </h3>

            <div class="mt-3 text-sm">
              <p>
                <span class="font-semibold">{{ job.company }}</span>
                <span class="text-graphite"> · {{ job.type }}</span>
              </p>
              <p v-if="job.location || job.mode" class="mt-0.5 text-graphite">
                {{ [job.location, job.mode].filter(Boolean).join(' · ') }}
              </p>
            </div>

            <p class="mt-5 max-w-[34rem] text-sm leading-relaxed text-graphite">{{ job.description }}</p>

            <ul class="mt-5 flex flex-wrap content-start gap-1.5">
              <li
                v-for="skill in job.skills"
                :key="skill"
                class="rounded-[2px] bg-mist px-2 py-1 text-[11px] leading-none text-graphite"
              >{{ skill }}</li>
            </ul>
          </template>
        </li>
      </ol>
      <SwipeDots :track="track" :count="jobs.length" :label="t('career.label')" />
    </div>
  </section>
</template>
