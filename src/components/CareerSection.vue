<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { MapPin, Calendar, GitCommit, GitBranch, GitMerge } from 'lucide-vue-next'
import { useTheme } from '@/stores/useThemeStore'
import zazpayLogo from '@/assets/logos/zazpay.png'
import prestavaleLogo from '@/assets/logos/prestavale.png'
import geLogo from '@/assets/logos/ge.jpg'

const { t } = useI18n()
const { theme } = useTheme()

const jobs = computed(() => [
  {
    key: 'zazpay',
    version: 'v3.0',
    branch: 'main',
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
    commits: 3,
  },
  {
    key: 'prestavale',
    version: 'v2.0',
    branch: 'feature/prestavale',
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
    commits: 2,
  },
  {
    key: 'ge',
    version: 'v1.0',
    branch: 'feature/ge-aerospace',
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
    commits: 2,
  },
])
</script>

<template>
  <section id="career" class="relative py-32 overflow-hidden">
    <!-- Section number -->
    <span
      class="absolute top-8 right-8 text-[80px] font-bold leading-none pointer-events-none select-none"
      :class="theme === 'dark' ? 'text-zinc-800/30' : 'text-zinc-300/40'"
    >02</span>

    <div class="max-w-4xl mx-auto px-6">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="mb-16"
      >
        <p class="text-primary font-mono text-sm tracking-widest uppercase mb-3">{{ t('career.label') }}</p>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight" :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'">{{ t('career.title') }}</h2>
        <div class="mt-4 h-1 w-16 bg-primary rounded-full" />
      </div>

      <!-- Git tree -->
      <div class="relative git-tree">
        <!-- Main trunk line -->
        <div class="absolute left-[23px] md:left-[27px] top-0 bottom-0 w-[2px]" :class="theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300'" />

        <div class="space-y-0">
          <div
            v-for="(job, i) in jobs"
            :key="job.key"
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: i * 150 } }"
            class="relative"
          >
            <!-- === BRANCH OUT (curve from trunk to the right) === -->
            <div class="relative pl-16 md:pl-20 pb-4">
              <!-- Branch curve SVG -->
              <svg
                class="absolute left-[14px] md:left-[18px] top-0 pointer-events-none"
                width="40" height="30" viewBox="0 0 40 30" fill="none"
              >
                <!-- Curve from trunk out to branch -->
                <path
                  d="M10 0 V8 Q10 18 20 18 H40"
                  :stroke="job.current ? '#10b981' : theme === 'dark' ? '#52525b' : '#a1a1aa'"
                  stroke-width="2"
                  fill="none"
                />
              </svg>

              <!-- Branch commit dot on trunk -->
              <div class="absolute left-[17px] md:left-[21px] top-[-3px] flex items-center justify-center z-10">
                <div
                  class="w-[14px] h-[14px] md:w-[16px] md:h-[16px] rounded-full border-[2.5px] flex items-center justify-center"
                  :class="job.current
                    ? 'bg-primary border-primary shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                    : theme === 'dark' ? 'bg-zinc-900 border-zinc-600' : 'bg-white border-zinc-400'"
                >
                  <div v-if="job.current" class="w-[6px] h-[6px] rounded-full bg-white" />
                </div>
                <div
                  v-if="job.current"
                  class="absolute w-[14px] h-[14px] md:w-[16px] md:h-[16px] rounded-full bg-primary/40 animate-ping"
                />
              </div>

              <!-- Branch label (like git branch name) -->
              <div class="flex items-center gap-2 mb-3 mt-1">
                <GitBranch :size="12" :class="job.current ? 'text-primary' : theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'" />
                <span class="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full"
                  :class="job.current
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : theme === 'dark' ? 'bg-zinc-800 text-zinc-500 border border-zinc-700' : 'bg-zinc-100 text-zinc-500 border border-zinc-200'"
                >{{ job.branch }}</span>
                <span class="font-mono text-[10px] px-1.5 py-0.5 rounded"
                  :class="theme === 'dark' ? 'bg-zinc-800/60 text-zinc-400' : 'bg-zinc-100 text-zinc-500'"
                >{{ job.version }}</span>
              </div>

              <!-- Commit row: simulated small commits along the branch -->
              <div class="flex items-center gap-2 mb-3 ml-0.5">
                <div v-for="c in job.commits" :key="c" class="flex items-center gap-2">
                  <div
                    class="w-2 h-2 rounded-full"
                    :class="job.current ? 'bg-primary/60' : theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300'"
                  />
                  <div v-if="c < job.commits" class="w-4 h-[2px]" :class="theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'" />
                </div>
                <GitCommit :size="11" :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'" />
                <span class="font-mono text-[9px]" :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'">
                  {{ job.skills.length }} changes
                </span>
              </div>

              <!-- Content card -->
              <div
                class="rounded-lg border p-4 md:p-5"
                :class="theme === 'dark'
                  ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                  : 'bg-white/60 border-zinc-200 hover:border-zinc-300'"
                style="transition: border-color 0.3s;"
              >
                <!-- Header with logo -->
                <div class="flex items-center gap-3 mb-2">
                  <img
                    :src="job.logo"
                    :alt="job.company"
                    loading="lazy"
                    decoding="async"
                    class="w-7 h-7 rounded-md shrink-0 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    :class="job.key === 'ge' ? 'p-1 bg-white object-contain' : 'object-cover'"
                  />
                  <div class="min-w-0 flex-1">
                    <h3 class="text-lg font-semibold leading-tight" :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'">
                      {{ job.role }}
                      <span
                        v-if="job.current"
                        class="inline-flex items-center gap-1 text-xs font-semibold text-primary ml-2 align-middle"
                      >
                        <span class="w-1.5 h-1.5 rounded-full bg-primary" />
                        {{ t('career.present') }}
                      </span>
                    </h3>
                    <p class="text-primary/80 font-medium text-sm">
                      {{ job.company }}
                      <span :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"> &middot; {{ job.type }}</span>
                    </p>
                  </div>
                </div>

                <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-3" :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'">
                  <span class="flex items-center gap-1.5">
                    <Calendar :size="13" />
                    {{ job.period }}
                    <span v-if="job.duration" :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'">&middot; {{ job.duration }}</span>
                  </span>
                  <span v-if="job.location" class="flex items-center gap-1.5">
                    <MapPin :size="13" />
                    {{ job.location }}
                  </span>
                  <span v-if="job.mode" :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'">{{ job.mode }}</span>
                </div>

                <p v-if="job.description" class="text-sm leading-relaxed mb-3" :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'">
                  {{ job.description }}
                </p>

                <div class="flex flex-wrap gap-x-2 gap-y-1">
                  <span
                    v-for="(skill, si) in job.skills"
                    :key="skill"
                    class="text-xs font-mono" :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'"
                  >{{ skill }}<span v-if="si < job.skills.length - 1" :class="theme === 'dark' ? 'text-zinc-700' : 'text-zinc-300'"> &middot;</span></span>
                </div>
              </div>
            </div>

            <!-- Merge / HEAD label -->
            <div class="relative pl-16 md:pl-20 pb-6 pt-2">
              <!-- Small merge dot on trunk -->
              <div class="absolute left-[21px] md:left-[25px] top-[10px] w-[6px] h-[6px] rounded-full z-10"
                :class="job.current ? 'bg-primary' : theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300'"
              />
              <div v-if="job.current" class="flex items-center gap-1.5">
                <span class="font-mono text-[10px] px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/30">HEAD</span>
                <span class="font-mono text-[9px] text-primary/60">→ main</span>
              </div>
              <span v-else class="font-mono text-[9px]" :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'">
                git merge {{ job.branch }}
              </span>
            </div>
          </div>
        </div>

        <!-- Initial commit at bottom -->
        <div class="relative pl-16 md:pl-20 pt-2">
          <div class="absolute left-[17px] md:left-[21px] top-2 flex items-center justify-center z-10">
            <div
              class="w-[14px] h-[14px] md:w-[16px] md:h-[16px] rounded-full border-[2.5px]"
              :class="theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-300'"
            />
          </div>
          <span class="font-mono text-[9px]" :class="theme === 'dark' ? 'text-zinc-700' : 'text-zinc-300'">
            initial commit — career.init()
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
