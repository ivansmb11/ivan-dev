<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Briefcase, MapPin, Calendar, Tag } from 'lucide-vue-next'

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
    current: false,
  },
])
</script>

<template>
  <section id="career" class="relative py-32 overflow-hidden">
    <div class="absolute inset-0 bg-zinc-950/90" />

    <div class="relative z-10 max-w-4xl mx-auto px-6">
      <!-- Section header -->
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
        <!-- Vertical line -->
        <div class="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-px bg-zinc-800" />

        <div class="space-y-12">
          <div
            v-for="(job, i) in jobs"
            :key="job.key"
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: i * 150 } }"
            class="relative pl-12 md:pl-16"
          >
            <!-- Timeline dot -->
            <div
              class="absolute left-0 top-1.5 flex items-center justify-center"
            >
              <div
                class="w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-full border-2"
                :class="job.current
                  ? 'bg-primary border-primary shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                  : 'bg-zinc-950 border-zinc-600'"
              />
              <!-- Ping animation for current job -->
              <div
                v-if="job.current"
                class="absolute w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-full bg-primary/50 animate-ping"
              />
            </div>

            <!-- Card -->
            <div
              class="group p-6 rounded-2xl bg-surface border border-zinc-800 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <!-- Header -->
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 class="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                    {{ job.role }}
                  </h3>
                  <p class="text-primary/80 font-medium text-sm">
                    {{ job.company }}
                    <span class="text-zinc-500"> &middot; {{ job.type }}</span>
                  </p>
                </div>
                <span
                  v-if="job.current"
                  class="inline-flex items-center self-start gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold whitespace-nowrap"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-primary" />
                  {{ t('career.present') }}
                </span>
              </div>

              <!-- Meta -->
              <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500 mb-4">
                <span class="flex items-center gap-1.5">
                  <Calendar :size="14" />
                  {{ job.period }}
                  <span v-if="job.duration" class="text-zinc-600">&middot; {{ job.duration }}</span>
                </span>
                <span v-if="job.location" class="flex items-center gap-1.5">
                  <MapPin :size="14" />
                  {{ job.location }}
                </span>
                <span v-if="job.mode" class="text-zinc-600">{{ job.mode }}</span>
              </div>

              <!-- Description -->
              <p v-if="job.description" class="text-sm text-zinc-400 leading-relaxed mb-4">
                {{ job.description }}
              </p>

              <!-- Skills -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="skill in job.skills"
                  :key="skill"
                  class="text-xs font-mono px-2.5 py-1 rounded-full bg-zinc-800/80 text-zinc-400"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
