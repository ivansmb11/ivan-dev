const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Read at call time so a user changing the OS setting mid-session is respected.
export function scrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

// Scroll-reveal variants for v-motion: `v-motion="reveal(150)"`.
export function reveal(delay = 0, distance = 28) {
  if (reduceMotion) return { initial: { opacity: 1 }, visibleOnce: { opacity: 1 } }
  return {
    initial: { opacity: 0, y: distance },
    visibleOnce: { opacity: 1, y: 0, transition: { duration: 700, delay } },
  }
}

// Load-time variants for above-the-fold elements.
export function enter(delay = 0, distance = 24) {
  if (reduceMotion) return { initial: { opacity: 1 }, enter: { opacity: 1 } }
  return {
    initial: { opacity: 0, y: distance },
    enter: { opacity: 1, y: 0, transition: { duration: 800, delay } },
  }
}
