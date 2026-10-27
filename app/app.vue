<script setup>
import { ref, onMounted } from 'vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import BootSequence from '@/components/BootSequence.vue'
import KeyboardShortcuts from '@/components/KeyboardShortcuts.vue'
import AgentFab from '@/components/AgentFab.vue'
import { useTheme } from '@/composables/useTheme'

const { t, locale, setLocale } = useI18n()
const { sync: syncTheme } = useTheme()

const booted = ref(false)
// The prerendered HTML can't know whether the intro will play, so nothing is inert until the client decides.
const hydrated = ref(false)
const menuOpen = ref(false)

useHead({ htmlAttrs: { lang: locale } })

onMounted(() => {
  hydrated.value = true
  syncTheme()
  const preferred = localStorage.getItem('locale') || (navigator.language.startsWith('es') ? 'es' : 'en')
  if (preferred !== locale.value) setLocale(preferred)
})

// Moves focus without adding #main to the URL and the history.
function skipToContent() {
  const main = document.getElementById('main')
  main?.focus()
  main?.scrollIntoView()
}
</script>

<template>
  <!-- inert under the intro and the menu, where it would land focus on hidden or inert content -->
  <a
    href="#main"
    :inert="(hydrated && !booted) || menuOpen ? '' : null"
    class="sr-only z-[200] bg-ink px-4 py-3 text-sm font-medium text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    @click.prevent="skipToContent"
  >{{ t('nav.skip') }}</a>

  <BootSequence v-if="!booted" @done="booted = true" />
  <KeyboardShortcuts />

  <!-- inert while the intro covers the page, so Tab starts at the loader's skip button -->
  <div :inert="hydrated && !booted ? '' : null">
    <NavbarComponent @menu-change="menuOpen = $event" />
    <!-- The full-screen menu covers the page; inert keeps Tab and screen readers inside the header and menu -->
    <div :inert="menuOpen ? '' : null">
      <NuxtPage />
      <AgentFab />
    </div>
  </div>
</template>
