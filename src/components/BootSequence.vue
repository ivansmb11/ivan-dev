<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['done'])

const lines = [
  '> initializing system...',
  '> loading modules: vue@3.5, vite@6.2, tailwind@4.1',
  '> connecting to ivanmendoza.dev',
  '> compiling portfolio assets...',
  '> mounting components...',
  '> establishing secure connection...',
  '> system ready.',
]

const visibleLines = ref([])
const progress = ref(0)
const done = ref(false)
const skipped = ref(false)

function skip() {
  skipped.value = true
  done.value = true
  sessionStorage.setItem('boot-done', '1')
  emit('done')
}

onMounted(() => {
  if (sessionStorage.getItem('boot-done')) {
    skip()
    return
  }

  let i = 0
  const lineInterval = setInterval(() => {
    if (skipped.value) { clearInterval(lineInterval); return }
    if (i < lines.length) {
      visibleLines.value.push(lines[i])
      progress.value = ((i + 1) / lines.length) * 100
      i++
    } else {
      clearInterval(lineInterval)
      setTimeout(() => {
        if (!skipped.value) {
          done.value = true
          sessionStorage.setItem('boot-done', '1')
          emit('done')
        }
      }, 400)
    }
  }, 280)
})
</script>

<template>
  <transition
    leave-active-class="transition-opacity duration-500"
    leave-to-class="opacity-0"
  >
    <div
      v-if="!done"
      class="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center px-6"
    >
      <!-- Scanline overlay -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]" />

      <div class="w-full max-w-md">
        <!-- Terminal lines -->
        <div class="font-mono text-sm space-y-2 mb-8">
          <p
            v-for="(line, i) in visibleLines"
            :key="i"
            class="text-primary/80 animate-[fadeSlide_0.3s_ease-out]"
            :class="i === visibleLines.length - 1 && visibleLines.length === lines.length ? 'text-primary font-bold' : ''"
          >
            {{ line }}
          </p>
          <span v-if="visibleLines.length < lines.length" class="inline-block w-2 h-4 bg-primary/70 animate-pulse" />
        </div>

        <!-- Progress bar -->
        <div class="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mb-6">
          <div
            class="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            :style="{ width: progress + '%' }"
          />
        </div>

        <!-- Skip -->
        <button
          @click="skip"
          class="text-xs font-mono text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
        >
          [skip]
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@keyframes fadeSlide {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
