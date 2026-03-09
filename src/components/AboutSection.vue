<script setup>
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { GraduationCap, Briefcase, MapPin } from 'lucide-vue-next'
import { useTheme } from '@/stores/useThemeStore'

const { t } = useI18n()
const { theme } = useTheme()

const highlights = computed(() => [
  { icon: GraduationCap, title: t('about.education'), text: t('about.educationText') },
  { icon: Briefcase, title: t('about.experience'), text: t('about.experienceText') },
  { icon: MapPin, title: t('about.location'), text: t('about.locationText') },
])

// Animated counters
const stats = [
  { key: 'years', value: 3, suffix: '+' },
  { key: 'companies', value: 3, suffix: '' },
  { key: 'projects', value: 5, suffix: '+' },
  { key: 'technologies', value: 15, suffix: '+' },
]

const counters = ref(stats.map(() => 0))
const counterStarted = ref(false)
const counterEl = ref(null)

function animateCounters() {
  if (counterStarted.value) return
  counterStarted.value = true
  stats.forEach((stat, i) => {
    const duration = 1500
    const start = performance.now()
    function step(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      counters.value[i] = Math.round(eased * stat.value)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) animateCounters() },
    { threshold: 0.3 }
  )
  if (counterEl.value) observer.observe(counterEl.value)
})
</script>

<template>
  <section id="about" class="relative py-32 overflow-hidden">
    <!-- Section number -->
    <span
      class="absolute top-8 right-8 text-[80px] font-bold leading-none pointer-events-none select-none"
      :class="theme === 'dark' ? 'text-zinc-800/30' : 'text-zinc-300/40'"
    >01</span>

    <div class="max-w-6xl mx-auto px-6">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="mb-16"
      >
        <p class="text-primary font-mono text-sm tracking-widest uppercase mb-3">{{ t('about.label') }}</p>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight" :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'">{{ t('about.title') }}</h2>
        <div class="mt-4 h-1 w-16 bg-primary rounded-full" />
      </div>

      <!-- Animated counters -->
      <div
        ref="counterEl"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
        class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      >
        <div
          v-for="(stat, i) in stats"
          :key="stat.key"
          class="text-center"
        >
          <p class="text-3xl md:text-4xl font-bold text-primary tabular-nums">
            {{ counters[i] }}{{ stat.suffix }}
          </p>
          <p class="text-xs font-mono uppercase tracking-wider mt-1" :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'">
            {{ t('stats.' + stat.key) }}
          </p>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-start">
        <div
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
        >
          <p class="text-lg leading-relaxed mb-6" :class="theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'">
            {{ t('about.bio1') }}
          </p>
          <p class="leading-relaxed" :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'">
            {{ t('about.bio2') }}
          </p>
        </div>

        <div class="flex flex-col gap-8">
          <div
            v-for="(item, i) in highlights"
            :key="item.title"
            v-motion
            :initial="{ opacity: 0, x: 40 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: 300 + i * 150 } }"
            class="flex items-start gap-4"
          >
            <component :is="item.icon" :size="20" class="text-primary shrink-0 mt-0.5" />
            <div>
              <h3 class="font-semibold mb-1" :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'">{{ item.title }}</h3>
              <p class="text-sm leading-relaxed" :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
