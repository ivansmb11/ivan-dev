<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Bot, MessageCircle, Share2 } from 'lucide-vue-next'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'
import { sections } from '@/content/links'
import { scrollBehavior } from '@/motion'

// Phones only, home only: reading progress, the section you're in, and the three things worth one tap.
// It replaces AgentFab there, which would otherwise sit on top of it.
const { t } = useI18n()

const pastHero = ref(false)
const typing = ref(false)
const readingDown = ref(false)
const progress = ref(0)
const current = ref(0)
const copied = ref(false)
let observer = null
let frame = 0
let copiedTimer = 0
let lastY = 0

// The on-screen keyboard and a fixed bar fight over the bottom of the screen, so the dock steps aside.
// It also hides while scrolling down, where it would cover what's being read, and returns on the first scroll up.
const visible = computed(() => pastHero.value && !typing.value && !readingDown.value)

function measure() {
  frame = 0
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
  pastHero.value = window.scrollY > window.innerHeight * 0.6
  const y = window.scrollY
  // The last stretch of the page is the footer, which leaves room for it.
  if (max - y < 120) readingDown.value = false
  else if (Math.abs(y - lastY) > 8) readingDown.value = y > lastY
  else return
  lastY = y
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(measure)
}

function onFocus(e) {
  typing.value = e.type === 'focusin' && e.target.matches?.('input, textarea, select')
}

function tap() {
  navigator.vibrate?.(8)
}

function toContact() {
  tap()
  const contact = document.getElementById('contact')
  contact?.scrollIntoView({ behavior: scrollBehavior() })
  contact?.focus({ preventScroll: true })
}

async function share() {
  tap()
  const url = window.location.origin + '/'
  if (navigator.share) {
    // Dismissing the share sheet rejects; that's not an error worth surfacing.
    await navigator.share({ title: document.title, url }).catch(() => {})
    return
  }
  try {
    await navigator.clipboard.writeText(url)
    copied.value = true
    clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => (copied.value = false), 2000)
  } catch {}
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('focusin', onFocus)
  document.addEventListener('focusout', onFocus)

  // The section crossing the middle band of the screen is the one being read.
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) current.value = sections.findIndex((s) => s.id === entry.target.id)
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  sections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('focusin', onFocus)
  document.removeEventListener('focusout', onFocus)
  observer?.disconnect()
  cancelAnimationFrame(frame)
  clearTimeout(copiedTimer)
})

const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-out-quint"
    enter-from-class="translate-y-4 opacity-0"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="translate-y-4 opacity-0"
  >
    <nav
      v-if="visible"
      :aria-label="t('dock.label')"
      class="fixed inset-x-3 z-30 overflow-hidden rounded-md bg-onyx text-white shadow-[0_14px_34px_-12px_var(--color-night)] ring-1 ring-white/10 md:hidden [&_:focus-visible]:outline-white!"
      :style="{ bottom: 'max(0.75rem, env(safe-area-inset-bottom))' }"
    >
      <span
        aria-hidden="true"
        class="absolute inset-x-0 top-0 h-[2px] origin-left bg-accent"
        :style="{ transform: `scaleX(${progress})` }"
      />

      <div class="flex h-14 items-center gap-1 pr-2 pl-3 min-[375px]:pl-4">
        <p class="flex min-w-0 flex-1 items-center gap-2 min-[375px]:gap-2.5">
          <AsteriskMark
            class="size-4 shrink-0 text-accent"
            :weight="2.4"
            :style="{ transform: `rotate(${progress * 360}deg)` }"
          />
          <span class="min-w-0 leading-tight">
            <span class="block text-[11px] tabular-nums text-white/60" aria-hidden="true">
              {{ pad(current + 1) }} / {{ pad(sections.length) }}
            </span>
            <span class="block truncate text-sm font-semibold" aria-hidden="true">
              {{ copied ? t('dock.copied') : t(sections[current].key) }}
            </span>
          </span>
          <!-- Announces only the copy confirmation, not every section change while scrolling -->
          <span class="sr-only" aria-live="polite">{{ copied ? t('dock.copied') : '' }}</span>
        </p>

        <button
          type="button"
          class="flex h-11 cursor-pointer items-center gap-2 rounded-[3px] bg-white px-3 text-[13px] font-semibold text-onyx active:translate-y-px"
          @click="toContact"
        >
          <MessageCircle :size="16" :stroke-width="2" aria-hidden="true" />
          <!-- Below 375px the text would squeeze the section name down to a couple of letters -->
          <span class="max-[374px]:sr-only">{{ t('hero.letsTalk') }}</span>
        </button>
        <button
          type="button"
          class="grid size-11 cursor-pointer place-items-center text-white/85 active:translate-y-px"
          :aria-label="t('dock.share')"
          @click="share"
        >
          <Share2 :size="18" :stroke-width="2" aria-hidden="true" />
        </button>
        <NuxtLink
          to="/agents"
          class="grid size-11 place-items-center text-white/85 active:translate-y-px"
          :aria-label="t('agent.fab')"
          @click="tap"
        >
          <Bot :size="18" :stroke-width="2" aria-hidden="true" />
        </NuxtLink>
      </div>
    </nav>
  </transition>
</template>
