<script setup>
import { computed, ref } from 'vue'
import { ArrowUp, Plus } from 'lucide-vue-next'
import AssetSlot from '@/components/ui/AssetSlot.vue'
import SectionChip from '@/components/ui/SectionChip.vue'
import SplitHeading from '@/components/ui/SplitHeading.vue'
import { reveal } from '@/motion'

const { t } = useI18n()
// The earlier role starts collapsed so the ZAZPAY card stays as tall as its neighbours.
const previousOpen = ref(false)

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
      period: t('career.zazpay.previous.period'),
      duration: t('career.zazpay.previous.duration'),
      mode: t('career.zazpay.previous.mode'),
      description: t('career.zazpay.previous.description'),
      skills: t('career.zazpay.previous.skills'),
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
</script>

<template>
  <section id="career" aria-labelledby="career-heading" class="py-24 md:py-32">
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
      <ol class="mt-14 grid grid-cols-1 gap-x-5 gap-y-16 md:mt-20 md:grid-cols-3 md:gap-y-0 lg:gap-x-6">
        <li
          v-for="(job, i) in jobs"
          :key="job.key"
          v-motion="reveal(i * 120)"
          class="flex flex-col md:row-span-6 md:grid md:grid-cols-1 md:grid-rows-subgrid md:gap-y-0"
        >
          <AssetSlot
            :id="job.slot"
            :alt="t('career.photoAlt', { company: job.company }, `Ivan Mendoza, ${job.company}`)"
            class="aspect-[4/3] w-full rounded-[3px]"
          />

          <div class="mt-6 flex items-center justify-between gap-3 text-[13px] text-graphite">
            <p>
              {{ job.period }}<template v-if="job.duration"> · {{ job.duration }}</template>
            </p>
            <span
              v-if="job.current"
              class="shrink-0 rounded-[2px] bg-accent-deep px-2 py-1 text-[11px] font-semibold uppercase leading-none tracking-[0.04em] text-white"
            >{{ t('career.present') }}</span>
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

          <!-- One wrapper so an earlier role at the same company stays inside the card's last subgrid row. -->
          <div>
            <ul class="mt-5 flex flex-wrap content-start gap-1.5">
              <li
                v-for="skill in job.skills"
                :key="skill"
                class="rounded-[2px] bg-mist px-2 py-1 text-[11px] leading-none text-graphite"
              >{{ skill }}</li>
            </ul>

            <div v-if="job.previous" class="mt-8 border-t border-line pt-5">
              <p class="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-accent">
                <ArrowUp :size="12" :stroke-width="2.5" aria-hidden="true" />{{ t('career.promotedFrom') }}
              </p>
              <button
                type="button"
                :aria-expanded="previousOpen"
                :aria-controls="`${job.key}-previous`"
                class="group mt-2 flex w-full items-start justify-between gap-4 text-left"
                @click="previousOpen = !previousOpen"
              >
                <span>
                  <span class="block text-base font-bold uppercase leading-[1.1] tracking-[-0.02em]">{{ job.previous.role }}</span>
                  <span class="mt-1 block text-[13px] text-graphite">
                    {{ [`${job.previous.period} · ${job.previous.duration}`, job.previous.mode].join(' · ') }}
                  </span>
                  <span class="sr-only">{{ t('career.previousDetails') }}</span>
                </span>
                <span class="grid size-8 shrink-0 place-items-center rounded-full border border-line text-graphite transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                  <Plus
                    :size="16"
                    aria-hidden="true"
                    class="transition-transform duration-500 ease-out-quint motion-reduce:transition-none"
                    :class="previousOpen ? 'rotate-45' : ''"
                  />
                </span>
              </button>
              <div
                :id="`${job.key}-previous`"
                class="grid transition-[grid-template-rows] duration-500 ease-out-quint motion-reduce:transition-none"
                :class="previousOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
              >
                <div class="overflow-hidden" :inert="!previousOpen">
                  <p class="mt-3 max-w-[34rem] text-sm leading-relaxed text-graphite">{{ job.previous.description }}</p>
                  <p class="mt-3 text-[12px] leading-relaxed text-graphite">{{ job.previous.skills }}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
