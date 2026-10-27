<script setup>
import { scrollBehavior } from '@/motion'
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { Sun, Moon } from 'lucide-vue-next'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'
import { sections, socials, email } from '@/content/links'
import { useTheme } from '@/stores/useThemeStore'

const emit = defineEmits(['menu-change'])

const { t, locale } = useI18n()
const { theme, toggle: toggleTheme } = useTheme()
const router = useRouter()
const route = useRoute()

const inlineLinks = sections.filter((s) => s.id !== 'achievements')

const scrolled = ref(false)
const menuOpen = ref(false)
const menuButton = ref(null)
const menuPanel = ref(null)

const overHero = computed(() => route.path === '/' && !scrolled.value && !menuOpen.value)

function hrefFor(id) {
  return router.resolve({ path: '/', hash: '#' + id }).href
}

function onScroll() {
  scrolled.value = window.scrollY > window.innerHeight - 90
}

function go(id) {
  menuOpen.value = false
  if (route.path !== '/') {
    router.push({ path: '/', hash: '#' + id })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior() })
}

function setLocale(value) {
  locale.value = value
  localStorage.setItem('locale', value)
}

function onKey(e) {
  if (e.key === 'Escape' && menuOpen.value) menuOpen.value = false
}

watch(menuOpen, async (open) => {
  emit('menu-change', open)
  document.documentElement.style.overflow = open ? 'hidden' : ''
  await nextTick()
  if (open) menuPanel.value?.querySelector('a, button')?.focus()
  else menuButton.value?.focus({ preventScroll: true })
})

watch(() => route.path, () => {
  menuOpen.value = false
  nextTick(onScroll)
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-300"
    :class="overHero
      ? 'text-white [&_:focus-visible]:outline-white!'
      : menuOpen
        ? 'text-ink'
        : 'bg-paper/85 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-md'"
  >
    <nav class="container-site flex h-[5.25rem] items-center justify-between gap-6" aria-label="Primary">
      <a
        :href="hrefFor('hero')"
        class="flex shrink-0 items-start text-lg font-bold tracking-tight sm:text-xl"
        @click.prevent="go('hero')"
      >
        Ivan Mendoza<AsteriskMark class="ml-0.5 size-2.5" :class="overHero ? 'text-white' : 'text-accent'" :weight="2.4" />
      </a>

      <ul class="hidden flex-1 items-center justify-evenly lg:flex">
        <li v-for="link in inlineLinks" :key="link.id">
          <a
            :href="hrefFor(link.id)"
            class="link-underline pb-0.5 text-[15px] font-medium"
            @click.prevent="go(link.id)"
          >{{ t(link.key) }}</a>
        </li>
      </ul>

      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Active language is underlined, not dimmed: dimmed white on the hero orange drops to ~2.6:1 -->
        <div class="flex items-center gap-1.5 text-sm font-medium max-[359px]:hidden" role="group" :aria-label="t('nav.language')">
          <button
            type="button"
            class="cursor-pointer px-0.5 decoration-[1.5px] underline-offset-[5px]"
            :class="locale === 'en' ? 'underline' : 'hover:underline hover:decoration-current/40'"
            :aria-pressed="locale === 'en'"
            @click="setLocale('en')"
          >EN</button>
          <span aria-hidden="true" class="opacity-40">/</span>
          <button
            type="button"
            class="cursor-pointer px-0.5 decoration-[1.5px] underline-offset-[5px]"
            :class="locale === 'es' ? 'underline' : 'hover:underline hover:decoration-current/40'"
            :aria-pressed="locale === 'es'"
            @click="setLocale('es')"
          >ES</button>
        </div>

        <button
          type="button"
          class="grid size-11 cursor-pointer place-items-center transition-opacity hover:opacity-70"
          :aria-label="theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')"
          :title="theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')"
          @click="toggleTheme"
        >
          <Sun v-if="theme === 'dark'" :size="18" aria-hidden="true" />
          <Moon v-else :size="18" aria-hidden="true" />
        </button>

        <button
          ref="menuButton"
          type="button"
          class="flex h-11 w-11 cursor-pointer flex-col items-end justify-center gap-[7px]"
          aria-controls="site-menu"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <span class="sr-only">{{ menuOpen ? t('nav.close') : t('nav.menu') }}</span>
          <span
            class="block h-[2px] w-9 bg-current transition-transform duration-300"
            :class="menuOpen && 'translate-y-[4.5px] rotate-45'"
          />
          <span
            class="block h-[2px] w-9 bg-current transition-transform duration-300"
            :class="menuOpen && '-translate-y-[4.5px] -rotate-45'"
          />
        </button>
      </div>
    </nav>
  </header>

  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-3"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="opacity-0 -translate-y-3"
  >
    <!-- No aria-modal: the close button lives in the header, outside this element, and would be hidden from
         screen readers. App.vue makes the page behind inert instead. -->
    <div
      v-if="menuOpen"
      id="site-menu"
      ref="menuPanel"
      class="fixed inset-0 z-40 overflow-y-auto bg-paper text-ink"
      role="dialog"
      :aria-label="t('nav.menu')"
    >
      <div class="container-site flex min-h-full flex-col justify-between gap-12 pt-28 pb-10">
        <ul class="flex flex-col">
          <li v-for="link in sections" :key="link.id" class="border-b border-line">
            <a
              :href="hrefFor(link.id)"
              class="group flex items-center justify-between py-3 font-display text-display-md uppercase transition-colors hover:text-accent"
              @click.prevent="go(link.id)"
            >
              {{ t(link.key) }}
              <AsteriskMark class="size-6 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </li>
        </ul>

        <div class="flex flex-col gap-5 text-sm sm:flex-row sm:items-end sm:justify-between">
          <div class="flex flex-col gap-4">
            <div class="flex flex-wrap items-center gap-x-4 font-medium">
              <div class="flex items-center gap-1.5" role="group" :aria-label="t('nav.language')">
                <button
                  type="button"
                  class="min-h-11 cursor-pointer px-1"
                  :class="locale === 'en' ? 'text-ink' : 'text-graphite hover:text-ink'"
                  :aria-pressed="locale === 'en'"
                  @click="setLocale('en')"
                >English</button>
                <span aria-hidden="true" class="text-muted">/</span>
                <button
                  type="button"
                  class="min-h-11 cursor-pointer px-1"
                  :class="locale === 'es' ? 'text-ink' : 'text-graphite hover:text-ink'"
                  :aria-pressed="locale === 'es'"
                  @click="setLocale('es')"
                >Español</button>
              </div>
              <button
                type="button"
                class="flex min-h-11 cursor-pointer items-center gap-2 whitespace-nowrap text-graphite hover:text-ink"
                @click="toggleTheme"
              >
                <Sun v-if="theme === 'dark'" :size="16" aria-hidden="true" />
                <Moon v-else :size="16" aria-hidden="true" />
                {{ theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode') }}
              </button>
            </div>
            <a :href="`mailto:${email}`" class="link-underline w-fit text-base font-medium">{{ email }}</a>
          </div>
          <ul class="flex flex-wrap gap-x-6 gap-y-2">
            <li v-for="social in socials" :key="social.label">
              <a
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="link-underline font-medium text-graphite hover:text-ink"
              >{{ social.label }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>
