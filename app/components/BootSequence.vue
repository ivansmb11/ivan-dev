<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'

const { t } = useI18n()
const emit = defineEmits(['done'])

const COUNT_MS = 1350

// Rendered into the prerendered HTML so first-time visitors never see the page before the intro.
// Visitors who skip it never see it either: CSS hides it before paint (see the style block).
const visible = ref(true)
const count = ref(0)

let frame = 0
let timer = 0
let start = 0

function finish() {
  if (!visible.value) return
  cancelAnimationFrame(frame)
  clearTimeout(timer)
  sessionStorage.setItem('boot-done', '1')
  document.documentElement.style.overflow = ''
  count.value = 100
  visible.value = false
}

function skip() {
  finish()
}

function step(now) {
  start ||= now
  const p = Math.min((now - start) / COUNT_MS, 1)
  count.value = Math.round(100 * (1 - Math.pow(1 - p, 3)))
  if (p < 1) frame = requestAnimationFrame(step)
  else timer = setTimeout(finish, 220)
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (sessionStorage.getItem('boot-done') || reduceMotion) {
    sessionStorage.setItem('boot-done', '1')
    emit('done')
    return
  }
  document.documentElement.style.overflow = 'hidden'
  frame = requestAnimationFrame(step)
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  clearTimeout(timer)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <transition
    leave-active-class="transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
    leave-to-class="-translate-y-full"
    @after-leave="emit('done')"
  >
    <div
      v-if="visible"
      class="boot-bg fixed inset-0 z-[9999] flex flex-col text-white"
      aria-busy="true"
    >
      <div class="container-site flex h-[5.25rem] items-center">
        <p class="flex items-start text-lg font-bold tracking-tight sm:text-xl">
          Ivan Mendoza<AsteriskMark class="ml-0.5 size-2.5" :weight="2.4" />
        </p>
      </div>

      <div class="container-site mt-auto flex items-end justify-between gap-6 pb-6 md:pb-10">
        <p aria-hidden="true" class="font-display text-display-hero tabular-nums">{{ count }}</p>
        <button
          type="button"
          class="min-h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-[3px] bg-ember-deep px-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-onyx focus-visible:outline-white! active:translate-y-px"
          @click="skip"
        >[{{ t('boot.skip') }}]</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.boot-bg {
  background:
    radial-gradient(40% 55% at 62% 50%, var(--color-ember-bright), transparent 70%),
    linear-gradient(90deg, var(--color-ember-deep), var(--color-ember));
}

/* Hidden before hydration for anyone onMounted will skip: html.booted comes from the before-paint script */
html.booted .boot-bg {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .boot-bg {
    display: none;
  }
}
</style>
