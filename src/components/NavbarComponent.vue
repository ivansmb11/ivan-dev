<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, X, Languages } from 'lucide-vue-next'

const { t, locale } = useI18n()

const links = [
  { key: 'nav.home', href: '#hero' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.stack', href: '#stack' },
  { key: 'nav.portfolio', href: '#portfolio' },
  { key: 'nav.career', href: '#career' },
  { key: 'nav.contact', href: '#contact' },
]

const scrolled = ref(false)
const mobileOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 50
}

function scrollTo(href) {
  mobileOpen.value = false
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function toggleLocale() {
  const next = locale.value === 'en' ? 'es' : 'en'
  locale.value = next
  localStorage.setItem('locale', next)
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-zinc-950/90 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <a
        href="#hero"
        @click.prevent="scrollTo('#hero')"
        class="text-xl font-bold font-mono tracking-tight text-primary hover:text-primary-light transition-colors"
      >
        ivan.dev
      </a>

      <!-- Desktop links -->
      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          @click.prevent="scrollTo(link.href)"
          class="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          {{ t(link.key) }}
        </a>

        <!-- Language toggle -->
        <button
          @click="toggleLocale"
          class="flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-primary transition-colors cursor-pointer"
          :title="locale === 'en' ? 'Cambiar a Español' : 'Switch to English'"
        >
          <Languages :size="16" />
          <span class="uppercase">{{ locale }}</span>
        </button>
      </div>

      <!-- Mobile toggle -->
      <button
        class="md:hidden text-zinc-400 hover:text-white transition-colors"
        @click="mobileOpen = !mobileOpen"
      >
        <Menu v-if="!mobileOpen" :size="24" />
        <X v-else :size="24" />
      </button>
    </div>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800"
      >
        <div class="px-6 py-4 flex flex-col gap-4">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            @click.prevent="scrollTo(link.href)"
            class="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            {{ t(link.key) }}
          </a>

          <button
            @click="toggleLocale"
            class="flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-primary transition-colors cursor-pointer"
          >
            <Languages :size="16" />
            <span>{{ locale === 'en' ? 'Español' : 'English' }}</span>
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>
