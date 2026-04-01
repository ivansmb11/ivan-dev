<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, X, Languages, Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '@/stores/useThemeStore'

const { t, locale } = useI18n()
const { theme, toggle: toggleTheme } = useTheme()

const links = [
  { key: 'nav.home', href: '#hero' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.career', href: '#career' },
  { key: 'nav.portfolio', href: '#portfolio' },
  { key: 'nav.achievements', href: '#achievements' },
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
    :class="scrolled
      ? theme === 'dark'
        ? 'bg-zinc-950/90 backdrop-blur-md shadow-lg shadow-black/20'
        : 'bg-white/90 backdrop-blur-md shadow-lg shadow-black/5'
      : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <a
        href="#hero"
        @click.prevent="scrollTo('#hero')"
        class="text-xl font-bold font-display tracking-tight text-primary hover:text-primary-light transition-colors"
      >
        ivanmendoza<span :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'">.dev</span>
      </a>

      <!-- Desktop links -->
      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          @click.prevent="scrollTo(link.href)"
          class="nav-link text-sm font-medium transition-colors"
          :class="theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'"
        >
          {{ t(link.key) }}
        </a>

        <!-- Theme toggle -->
        <button
          @click="toggleTheme"
          class="transition-colors cursor-pointer"
          :class="theme === 'dark' ? 'text-zinc-400 hover:text-primary' : 'text-zinc-500 hover:text-primary'"
          :title="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="theme === 'dark'" :size="16" />
          <Moon v-else :size="16" />
        </button>

        <!-- Language toggle -->
        <button
          @click="toggleLocale"
          class="flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer"
          :class="theme === 'dark' ? 'text-zinc-400 hover:text-primary' : 'text-zinc-500 hover:text-primary'"
          :title="locale === 'en' ? 'Cambiar a Español' : 'Switch to English'"
        >
          <Languages :size="16" />
          <span class="uppercase">{{ locale }}</span>
        </button>
      </div>

      <!-- Mobile toggle -->
      <button
        class="md:hidden transition-colors"
        :class="theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'"
        @click="mobileOpen = !mobileOpen"
        :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
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
        class="md:hidden backdrop-blur-md border-t"
        :class="theme === 'dark'
          ? 'bg-zinc-950/95 border-zinc-800'
          : 'bg-white/95 border-zinc-200'"
      >
        <div class="px-6 py-4 flex flex-col gap-4">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            @click.prevent="scrollTo(link.href)"
            class="text-sm font-medium transition-colors"
            :class="theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'"
          >
            {{ t(link.key) }}
          </a>

          <div class="flex items-center gap-4">
            <button
              @click="toggleTheme"
              class="flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer"
              :class="theme === 'dark' ? 'text-zinc-400 hover:text-primary' : 'text-zinc-500 hover:text-primary'"
            >
              <Sun v-if="theme === 'dark'" :size="16" />
              <Moon v-else :size="16" />
              <span>{{ theme === 'dark' ? 'Light' : 'Dark' }}</span>
            </button>

            <button
              @click="toggleLocale"
              class="flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer"
              :class="theme === 'dark' ? 'text-zinc-400 hover:text-primary' : 'text-zinc-500 hover:text-primary'"
            >
              <Languages :size="16" />
              <span>{{ locale === 'en' ? 'Español' : 'English' }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>
