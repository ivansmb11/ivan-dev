<script setup>
import { ref } from 'vue'
import { Pause, Play } from 'lucide-vue-next'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'

const { t } = useI18n()

// Hover-pause alone leaves keyboard and touch users without a way to stop the motion (WCAG 2.2.2).
const paused = ref(false)

const techs = [
  'Vue.js', 'React Native', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL',
  'Tailwind CSS', 'Vite', 'REST APIs', 'Firebase', 'CI/CD', 'Git', 'Spring Boot',
  'Expo', 'JavaScript', 'Zustand', 'React Query', 'Docker', 'Python', 'Redis',
  'Neo4J', 'MCP', 'AI Agents',
]
</script>

<template>
  <section aria-labelledby="tech-ticker-label" class="relative overflow-hidden bg-ink py-7 text-paper md:py-10">
    <h2 id="tech-ticker-label" class="sr-only">{{ t('about.techStack') }}</h2>
    <!-- Words fade out before the control instead of sliding under a half-transparent button -->
    <div class="pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center bg-linear-to-l from-ink from-50% to-transparent pr-3 pl-10 md:pr-5 md:pl-16">
      <button
        type="button"
        class="pointer-events-auto grid size-11 cursor-pointer place-items-center rounded-[3px] text-paper/80 transition-colors hover:text-paper active:translate-y-px"
        :aria-label="paused ? t('about.playTicker') : t('about.pauseTicker')"
        :aria-pressed="paused"
        @click="paused = !paused"
      >
        <Play v-if="paused" :size="16" aria-hidden="true" />
        <Pause v-else :size="16" aria-hidden="true" />
      </button>
    </div>
    <!-- Two identical copies; the track slides exactly one copy (-50%) so the loop is seamless. -->
    <div
      class="flex w-max animate-marquee [animation-duration:70s] md:[animation-duration:90s] hover:[animation-play-state:paused]"
      :class="paused && '[animation-play-state:paused]'"
    >
      <ul
        v-for="copy in 2"
        :key="copy"
        :aria-hidden="copy === 2 ? 'true' : undefined"
        class="flex shrink-0 items-center"
      >
        <li
          v-for="tech in techs"
          :key="tech"
          class="flex items-center gap-6 pr-6 md:gap-10 md:pr-10"
        >
          <span class="font-display text-3xl leading-none font-bold whitespace-nowrap uppercase tracking-[-0.04em] md:text-5xl">{{ tech }}</span>
          <AsteriskMark class="size-5 shrink-0 text-accent md:size-8" :weight="2.2" />
        </li>
      </ul>
    </div>
  </section>
</template>
