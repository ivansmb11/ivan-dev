<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import NavbarComponent from '@/components/NavbarComponent.vue'
import BootSequence from '@/components/BootSequence.vue'
import KeyboardShortcuts from '@/components/KeyboardShortcuts.vue'
import AgentFab from '@/components/AgentFab.vue'

const { t, locale } = useI18n()

const booted = ref(!!sessionStorage.getItem('boot-done'))
const menuOpen = ref(false)

watch(locale, (value) => { document.documentElement.lang = value }, { immediate: true })

// Hash routing owns the URL fragment, so the skip link moves focus instead of navigating.
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
    :inert="booted && !menuOpen ? null : ''"
    class="sr-only z-[200] bg-ink px-4 py-3 text-sm font-medium text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    @click.prevent="skipToContent"
  >{{ t('nav.skip') }}</a>

  <BootSequence v-if="!booted" @done="booted = true" />
  <KeyboardShortcuts />

  <!-- inert while the intro covers the page, so Tab starts at the loader's skip button -->
  <div :inert="booted ? null : ''">
    <NavbarComponent @menu-change="menuOpen = $event" />
    <!-- The full-screen menu covers the page; inert keeps Tab and screen readers inside the header and menu -->
    <div :inert="menuOpen ? '' : null">
      <router-view />
      <AgentFab />
    </div>
  </div>
</template>
