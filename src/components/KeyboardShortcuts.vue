<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/stores/useThemeStore'
import { X } from 'lucide-vue-next'

const { locale } = useI18n()
const { theme, toggle: toggleTheme } = useTheme()

const open = ref(false)

const shortcuts = [
  { keys: ['?'], desc: 'Toggle this modal' },
  { keys: ['1-6'], desc: 'Jump to section' },
  { keys: ['L'], desc: 'Toggle language' },
  { keys: ['T'], desc: 'Scroll to top' },
  { keys: ['D'], desc: 'Toggle dark/light theme' },
  { keys: ['Esc'], desc: 'Close modal' },
]

const sectionMap = {
  1: '#hero',
  2: '#about',
  3: '#career',
  4: '#portfolio',
  5: '#achievements',
  6: '#contact',
}

function scrollToSection(href) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function onKey(e) {
  // Don't trigger when typing in inputs
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

  if (e.key === '?') {
    e.preventDefault()
    open.value = !open.value
    return
  }

  if (e.key === 'Escape') {
    open.value = false
    return
  }

  if (open.value) return // don't process other shortcuts while modal is open

  if (e.key >= '1' && e.key <= '6') {
    scrollToSection(sectionMap[e.key])
    return
  }

  if (e.key.toLowerCase() === 'l') {
    const next = locale.value === 'en' ? 'es' : 'en'
    locale.value = next
    localStorage.setItem('locale', next)
    return
  }

  if (e.key.toLowerCase() === 't') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  if (e.key.toLowerCase() === 'd') {
    toggleTheme()
    return
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-150"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-[9000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      @click.self="open = false"
    >
      <div
        class="border rounded-xl p-6 w-full max-w-sm mx-4 shadow-2xl"
        :class="theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-200'"
      >
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-sm font-bold font-mono tracking-wide" :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'">KEYBOARD SHORTCUTS</h3>
          <button @click="open = false" class="text-zinc-500 hover:text-primary transition-colors cursor-pointer">
            <X :size="16" />
          </button>
        </div>

        <div class="space-y-2.5">
          <div
            v-for="s in shortcuts"
            :key="s.desc"
            class="flex items-center justify-between"
          >
            <span class="text-sm" :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'">{{ s.desc }}</span>
            <div class="flex gap-1">
              <kbd
                v-for="k in s.keys"
                :key="k"
                class="px-2 py-0.5 text-xs font-mono border rounded"
                :class="theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-600'"
              >{{ k }}</kbd>
            </div>
          </div>
        </div>

        <p class="mt-5 text-[10px] font-mono text-center" :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'">Press ? to toggle</p>
      </div>
    </div>
  </transition>
</template>
