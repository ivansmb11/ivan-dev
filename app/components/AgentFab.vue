<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { Bot } from 'lucide-vue-next'

const { t } = useI18n()
const route = useRoute()

const pastHero = ref(false)

// On home it would sit on top of the hero's "Let's talk" card, so it waits until the hero is mostly scrolled away.
// On phones the home page's MobileDock carries the same link, so the badge stays out of its way there.
const visible = computed(() => route.path !== '/' || pastHero.value)

function onScroll() {
  pastHero.value = window.scrollY > window.innerHeight * 0.6
}

watch(() => route.path, () => nextTick(onScroll))

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <transition
    enter-active-class="ease-out"
    enter-from-class="translate-y-3 opacity-0"
    leave-active-class="ease-in"
    leave-to-class="translate-y-3 opacity-0"
  >
    <NuxtLink
      v-if="visible"
      to="/agents"
      :title="t('footer.agents')"
      :class="route.path === '/' && 'max-md:hidden'"
      class="group fixed right-4 bottom-4 z-30 flex items-center gap-2 whitespace-nowrap rounded-md bg-card px-3 py-2 text-xs font-medium text-ink shadow-[0_6px_20px_-8px_var(--color-night)] ring-1 ring-ink/10 transition-[opacity,translate,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-paper active:translate-y-0"
    >
      <Bot :size="15" :stroke-width="2" aria-hidden="true" class="text-accent transition-colors group-hover:text-paper" />
      <span class="hidden sm:inline">{{ t('agent.fab') }}</span>
      <span class="sm:hidden" aria-hidden="true">AI</span>
      <span class="sr-only sm:hidden">{{ t('agent.fab') }}</span>
    </NuxtLink>
  </transition>
</template>
