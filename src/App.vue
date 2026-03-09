<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import BootSequence from '@/components/BootSequence.vue'

import StatusBar from '@/components/StatusBar.vue'
import KeyboardShortcuts from '@/components/KeyboardShortcuts.vue'
import AgentFab from '@/components/AgentFab.vue'
import { useTheme } from '@/stores/useThemeStore'

const { theme } = useTheme()

const booted = ref(!!sessionStorage.getItem('boot-done'))

const glyphs = '01{}();<>=$/|#&!?*+-_[]:.~%@^アイウエオカキクケコサシスセソタチツテトナニヌネノ'.split('')

const columns = ref([])
let interval = null

function randomChar() {
  return glyphs[Math.floor(Math.random() * glyphs.length)]
}

function createColumn(id, x) {
  const charCount = 8 + Math.floor(Math.random() * 16)
  return {
    id,
    x,
    chars: Array.from({ length: charCount }, () => randomChar()),
    duration: 8 + Math.random() * 14,
    delay: Math.random() * -20,
    opacity: 0.04 + Math.random() * 0.06,
    size: 11 + Math.random() * 4,
  }
}

onMounted(() => {
  const count = 20
  columns.value = Array.from({ length: count }, (_, i) =>
    createColumn(i, Math.random() * 100)
  )

  interval = setInterval(() => {
    const col = columns.value[Math.floor(Math.random() * columns.value.length)]
    if (col) {
      const idx = Math.floor(Math.random() * col.chars.length)
      col.chars[idx] = randomChar()
    }
  }, 300)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <!-- Boot sequence -->
  <BootSequence v-if="!booted" @done="booted = true" />


  <!-- Keyboard shortcuts -->
  <KeyboardShortcuts />

  <!-- Animated background -->
  <div
    class="fixed inset-0 -z-10 overflow-hidden transition-colors duration-500"
    :class="theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-100'"
  >
    <!-- Blurred lights -->
    <div class="light light-1" />
    <div class="light light-2" />
    <div class="light light-3" />
    <div class="light light-4" />

    <!-- Matrix rain columns (dark mode only) -->
    <template v-if="theme === 'dark'">
      <div
        v-for="col in columns"
        :key="col.id"
        class="rain-column font-mono select-none pointer-events-none"
        :style="{
          left: col.x + '%',
          fontSize: col.size + 'px',
          opacity: col.opacity,
          animationDuration: col.duration + 's',
          animationDelay: col.delay + 's',
        }"
      ><span
          v-for="(ch, ci) in col.chars"
          :key="ci"
          class="block leading-tight"
          :style="{ opacity: 1 - (ci / col.chars.length) * 0.7 }"
        >{{ ch }}</span>
      </div>
    </template>
  </div>

  <NavbarComponent />
  <router-view />

  <!-- Agent FAB -->
  <AgentFab />

  <!-- Status bar -->
  <StatusBar />
</template>

<style scoped>
.light {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  will-change: transform;
  transition: opacity 0.5s;
}

/* Dark mode lights */
:root:not(.light) .light { opacity: 0.15; }
/* Light mode lights — much subtler */
.light { opacity: 0.08; }

.light-1 {
  width: 600px;
  height: 600px;
  background: #10b981;
  top: -10%;
  left: -5%;
  animation: drift1 20s ease-in-out infinite;
}

.light-2 {
  width: 500px;
  height: 500px;
  background: #6366f1;
  top: 40%;
  right: -10%;
  animation: drift2 25s ease-in-out infinite;
}

.light-3 {
  width: 450px;
  height: 450px;
  background: #8b5cf6;
  bottom: -5%;
  left: 30%;
  animation: drift3 22s ease-in-out infinite;
}

.light-4 {
  width: 350px;
  height: 350px;
  background: #14b8a6;
  top: 60%;
  left: -8%;
  animation: drift4 18s ease-in-out infinite;
}

.rain-column {
  position: absolute;
  top: -20%;
  color: #10b981;
  animation: rain linear infinite;
  will-change: transform;
  text-align: center;
  width: 1em;
}

@keyframes rain {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(120vh); }
}

@keyframes drift1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(80px, 60px) scale(1.1); }
  50% { transform: translate(40px, 120px) scale(0.95); }
  75% { transform: translate(-30px, 50px) scale(1.05); }
}

@keyframes drift2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-70px, -40px) scale(1.08); }
  50% { transform: translate(-100px, 30px) scale(0.92); }
  75% { transform: translate(-40px, -60px) scale(1.04); }
}

@keyframes drift3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(50px, -70px) scale(1.06); }
  50% { transform: translate(-60px, -40px) scale(0.97); }
  75% { transform: translate(30px, -90px) scale(1.1); }
}

@keyframes drift4 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(60px, -30px) scale(1.12); }
  50% { transform: translate(90px, 50px) scale(0.9); }
  75% { transform: translate(20px, 70px) scale(1.05); }
}
</style>
