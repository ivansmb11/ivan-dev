<script setup>
import { scrollBehavior } from '@/motion'
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { X } from 'lucide-vue-next'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'
import { sections } from '@/content/links'
import { useTheme } from '@/stores/useThemeStore'

const { t, locale } = useI18n()
const { toggle: toggleTheme } = useTheme()
const router = useRouter()
const route = useRoute()

const open = ref(false)
const closeButton = ref(null)
let lastFocus = null

const shortcuts = [
  { keys: ['?'], desc: 'shortcuts.toggle' },
  { keys: ['1-6'], desc: 'shortcuts.jump' },
  { keys: ['L'], desc: 'shortcuts.language' },
  { keys: ['D'], desc: 'shortcuts.theme' },
  { keys: ['T'], desc: 'shortcuts.top' },
  { keys: ['Esc'], desc: 'shortcuts.close' },
]

function jumpTo(id) {
  if (route.path !== '/') {
    router.push({ path: '/', hash: '#' + id })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior() })
}

function isTyping(el) {
  return el?.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el?.tagName)
}

function onKey(e) {
  if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return

  if (e.key === '?') {
    e.preventDefault()
    open.value = !open.value
    return
  }

  if (e.key === 'Escape') {
    // Opened over the full-screen menu, Escape should close only this panel, not the menu underneath too.
    if (open.value) e.stopImmediatePropagation()
    open.value = false
    return
  }

  if (open.value) {
    // The close button is the only control, so Tab stays on it.
    if (e.key === 'Tab') e.preventDefault()
    return
  }

  if (e.key >= '1' && e.key <= '6') {
    jumpTo(sections[Number(e.key) - 1].id)
    return
  }

  const key = e.key.toLowerCase()

  if (key === 'l') {
    const next = locale.value === 'en' ? 'es' : 'en'
    locale.value = next
    localStorage.setItem('locale', next)
    return
  }

  if (key === 'd') {
    toggleTheme()
    return
  }

  if (key === 't') {
    window.scrollTo({ top: 0, behavior: scrollBehavior() })
  }
}

watch(open, async (value) => {
  if (value) {
    lastFocus = document.activeElement
    await nextTick()
    closeButton.value?.focus()
  } else {
    lastFocus?.focus?.({ preventScroll: true })
    lastFocus = null
  }
})

// Capture phase, so this runs before the navbar's own Escape listener.
onMounted(() => window.addEventListener('keydown', onKey, true))
onUnmounted(() => window.removeEventListener('keydown', onKey, true))
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
      class="fixed inset-0 z-[9000] flex items-center justify-center bg-onyx/50 p-4"
      @click.self="open = false"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
        class="w-full max-w-sm rounded-md border border-line bg-card p-6 text-ink shadow-[0_24px_60px_-28px_var(--color-night)]"
      >
        <div class="flex items-center justify-between gap-4">
          <h2 id="shortcuts-title" class="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.01em]">
            <AsteriskMark class="size-3.5 text-accent" :weight="2.2" />
            {{ t('shortcuts.title') }}
          </h2>
          <button
            ref="closeButton"
            type="button"
            :aria-label="t('nav.close')"
            class="-mr-2 grid size-11 cursor-pointer place-items-center rounded-[3px] text-graphite transition-colors hover:bg-mist hover:text-ink active:bg-line"
            @click="open = false"
          >
            <X :size="18" aria-hidden="true" />
          </button>
        </div>

        <dl class="mt-4 divide-y divide-line border-y border-line">
          <div v-for="s in shortcuts" :key="s.desc" class="flex items-center justify-between gap-4 py-2.5">
            <dt class="text-sm text-graphite">{{ t(s.desc) }}</dt>
            <dd class="flex gap-1">
              <kbd
                v-for="k in s.keys"
                :key="k"
                class="min-w-7 rounded-[3px] bg-mist px-2 py-1 text-center font-sans text-xs font-semibold text-ink"
              >{{ k }}</kbd>
            </dd>
          </div>
        </dl>

        <p class="mt-4 text-center text-xs text-graphite">{{ t('shortcuts.hint') }}</p>
      </div>
    </div>
  </transition>
</template>
