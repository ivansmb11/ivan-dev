<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/stores/useThemeStore'

const { locale } = useI18n()
const { theme } = useTheme()

const scrollPercent = ref(0)
const currentTime = ref('')
const currentSection = ref('hero')

const sections = ['hero', 'about', 'career', 'portfolio', 'achievements', 'contact']
const sectionNames = {
  hero: 'index',
  about: 'about',
  career: 'career',
  portfolio: 'portfolio',
  achievements: 'achievements',
  contact: 'contact',
}

function updateScroll() {
  const h = document.documentElement.scrollHeight - window.innerHeight
  scrollPercent.value = h > 0 ? Math.round((window.scrollY / h) * 100) : 0

  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i])
    if (el && el.getBoundingClientRect().top <= 200) {
      currentSection.value = sections[i]
      break
    }
  }
}

function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

let scrollHandler, timeInterval
onMounted(() => {
  updateScroll()
  updateTime()
  scrollHandler = () => updateScroll()
  window.addEventListener('scroll', scrollHandler, { passive: true })
  timeInterval = setInterval(updateTime, 10000)
})
onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler)
  clearInterval(timeInterval)
})

const filePath = computed(() => `~/ivanmendoza.dev/src/${sectionNames[currentSection.value]}.vue`)
const modeLabel = computed(() => theme.value === 'dark' ? 'DARK' : 'LIGHT')
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 z-[100] h-6 flex items-center justify-between px-3 font-mono text-[10px] tracking-wide border-t select-none backdrop-blur-sm"
    :class="theme === 'dark'
      ? 'bg-zinc-900/95 text-zinc-500 border-zinc-800'
      : 'bg-white/95 text-zinc-400 border-zinc-200'"
  >
    <!-- Left -->
    <div class="flex items-center gap-3">
      <span class="text-primary font-bold">{{ modeLabel }}</span>
      <span :class="theme === 'dark' ? 'text-zinc-700' : 'text-zinc-300'">|</span>
      <span :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'">{{ filePath }}</span>
    </div>

    <!-- Right -->
    <div class="flex items-center gap-3">
      <span class="uppercase">{{ locale }}</span>
      <span :class="theme === 'dark' ? 'text-zinc-700' : 'text-zinc-300'">|</span>

      <!-- Scroll progress -->
      <div class="flex items-center gap-1.5">
        <div class="w-16 h-1 rounded-full overflow-hidden" :class="theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'">
          <div class="h-full bg-primary/60 rounded-full transition-all duration-150" :style="{ width: scrollPercent + '%' }" />
        </div>
        <span class="w-7 text-right tabular-nums">{{ scrollPercent }}%</span>
      </div>

      <span :class="theme === 'dark' ? 'text-zinc-700' : 'text-zinc-300'">|</span>
      <span class="tabular-nums">{{ currentTime }}</span>
    </div>
  </div>
</template>
