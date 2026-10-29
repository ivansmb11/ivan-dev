<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { scrollBehavior } from '@/motion'

// Counter and dots under a `.swipe-track` list. Phones only, like the track itself.
const props = defineProps({
  track: { type: Object, default: null },
  count: { type: Number, required: true },
  label: { type: String, required: true },
})

const { t } = useI18n()
const index = ref(0)
let frame = 0

function measure() {
  frame = 0
  const el = props.track
  const [first, second] = el?.children ?? []
  if (!first || !second) return
  const step = second.offsetLeft - first.offsetLeft
  // The last card can't snap to the start edge, so the end of the scroll range counts as reaching it.
  const next = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2
    ? props.count - 1
    : Math.min(props.count - 1, Math.round(el.scrollLeft / step))
  if (next === index.value) return
  index.value = next
  // A tick on Android as the swipe passes into the next card. Chrome blocks it before the first tap, so
  // it waits for one; browsers without the API just skip it.
  if (navigator.userActivation?.hasBeenActive !== false) navigator.vibrate?.(6)
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(measure)
}

function go(i) {
  const el = props.track
  const items = el?.children
  if (!items?.[i]) return
  el.scrollTo({ left: items[i].offsetLeft - items[0].offsetLeft, behavior: scrollBehavior() })
}

watch(
  () => props.track,
  (el, old) => {
    old?.removeEventListener('scroll', onScroll)
    el?.addEventListener('scroll', onScroll, { passive: true })
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  props.track?.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(frame)
})

const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <div class="mt-5 flex items-center justify-between gap-4 md:hidden">
    <p class="text-[13px] font-semibold tabular-nums tracking-[0.02em] text-graphite" aria-hidden="true">
      <span class="text-ink">{{ pad(index + 1) }}</span> / {{ pad(count) }}
    </p>
    <div class="-mr-1.5 flex items-center" role="group" :aria-label="label">
      <button
        v-for="i in count"
        :key="i"
        type="button"
        class="grid h-11 min-w-6 cursor-pointer place-items-center px-1.5"
        :aria-label="t('swipe.goTo', { n: i, total: count })"
        :aria-current="index === i - 1 ? 'true' : undefined"
        @click="go(i - 1)"
      >
        <span
          class="block h-1.5 rounded-full transition-[width,background-color] duration-500 ease-out-quint"
          :class="index === i - 1 ? 'w-6 bg-accent' : 'w-1.5 bg-ink/20'"
        />
      </button>
    </div>
  </div>
</template>
