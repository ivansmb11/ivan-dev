<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { MapPin, Calendar } from 'lucide-vue-next'
import zazpayLogo from '@/assets/logos/zazpay.png'
import prestavaleLogo from '@/assets/logos/prestavale.png'
import geLogo from '@/assets/logos/ge.jpg'

const { t } = useI18n()

const jobs = computed(() => [
  {
    key: 'zazpay',
    role: t('career.zazpay.role'),
    company: t('career.zazpay.company'),
    type: t('career.zazpay.type'),
    period: t('career.zazpay.period'),
    location: t('career.zazpay.location'),
    mode: t('career.zazpay.mode'),
    description: t('career.zazpay.description'),
    skills: t('career.zazpay.skills').split(', '),
    logo: zazpayLogo,
    current: true,
  },
  {
    key: 'prestavale',
    role: t('career.prestavale.role'),
    company: t('career.prestavale.company'),
    type: t('career.prestavale.type'),
    period: t('career.prestavale.period'),
    duration: t('career.prestavale.duration'),
    location: t('career.prestavale.location'),
    mode: t('career.prestavale.mode'),
    description: t('career.prestavale.description'),
    skills: t('career.prestavale.skills').split(', '),
    logo: prestavaleLogo,
    current: false,
  },
  {
    key: 'ge',
    role: t('career.ge.role'),
    company: t('career.ge.company'),
    type: t('career.ge.type'),
    period: t('career.ge.period'),
    duration: t('career.ge.duration'),
    location: t('career.ge.location'),
    mode: t('career.ge.mode'),
    description: t('career.ge.description'),
    skills: t('career.ge.skills').split(', '),
    logo: geLogo,
    current: false,
  },
])
</script>

<template>
  <section id="career" class="relative py-32 overflow-hidden">
    <div class="max-w-4xl mx-auto px-6">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="mb-16"
      >
        <p class="text-primary font-mono text-sm tracking-widest uppercase mb-3">{{ t('career.label') }}</p>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight">{{ t('career.title') }}</h2>
        <div class="mt-4 h-1 w-16 bg-primary rounded-full" />
      </div>

      <!-- Timeline -->
      <div class="relative">
        <div class="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-px bg-zinc-800" />

        <div class="space-y-14">
          <div
            v-for="(job, i) in jobs"
            :key="job.key"
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: i * 150 } }"
            class="relative pl-12 md:pl-16"
          >
            <!-- Timeline dot -->
            <div class="absolute left-0 top-1.5 flex items-center justify-center">
              <div
                class="w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-full border-2"
                :class="job.current
                  ? 'bg-primary border-primary shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                  : 'bg-zinc-950 border-zinc-600'"
              />
              <div
                v-if="job.current"
                class="absolute w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-full bg-primary/50 animate-ping"
              />
            </div>

            <!-- Content -->
            <div>
              <!-- Header with logo -->
              <div class="flex items-start gap-4 mb-2">
                <img
                  :src="job.logo"
                  :alt="job.company"
                  class="w-8 h-8 rounded-md shrink-0 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  :class="job.key === 'ge' ? 'p-1.5 bg-white object-contain' : 'object-cover'"
                />
                <div class="min-w-0">
                  <div class="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                    <h3 class="text-lg font-semibold text-white">{{ job.role }}</h3>
                    <span
                      v-if="job.current"
                      class="inline-flex items-center gap-1.5 text-xs font-semibold text-primary"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-primary" />
                      {{ t('career.present') }}
                    </span>
                  </div>
                  <p class="text-primary/80 font-medium text-sm">
                    {{ job.company }}
                    <span class="text-zinc-600"> &middot; {{ job.type }}</span>
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500 mb-3">
                <span class="flex items-center gap-1.5">
                  <Calendar :size="13" />
                  {{ job.period }}
                  <span v-if="job.duration" class="text-zinc-600">&middot; {{ job.duration }}</span>
                </span>
                <span v-if="job.location" class="flex items-center gap-1.5">
                  <MapPin :size="13" />
                  {{ job.location }}
                </span>
                <span v-if="job.mode" class="text-zinc-600">{{ job.mode }}</span>
              </div>

              <p v-if="job.description" class="text-sm text-zinc-400 leading-relaxed mb-3">
                {{ job.description }}
              </p>

              <div class="flex flex-wrap gap-x-2 gap-y-1">
                <span
                  v-for="(skill, si) in job.skills"
                  :key="skill"
                  class="text-xs font-mono text-zinc-500"
                >{{ skill }}<span v-if="si < job.skills.length - 1" class="text-zinc-700"> &middot;</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
