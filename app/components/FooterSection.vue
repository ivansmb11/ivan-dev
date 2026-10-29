<script setup>
import { scrollBehavior } from '@/motion'
import { ArrowUp, ArrowUpRight } from 'lucide-vue-next'
import { sections, socials, email } from '@/content/links'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const year = new Date().getFullYear()
const columns = ['0%', '33.333%', '66.666%', '100%']
const [emailUser, emailDomain] = email.split('@')

function hrefFor(id) {
  return router.resolve({ path: '/', hash: '#' + id }).href
}

function go(id) {
  if (route.path !== '/') {
    router.push({ path: '/', hash: '#' + id })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior() })
}

function toTop() {
  window.scrollTo({ top: 0, behavior: scrollBehavior() })
  // Otherwise focus stays on this button and the next Tab scrolls the page straight back to the footer.
  document.getElementById('main')?.focus({ preventScroll: true })
}
</script>

<template>
  <footer class="relative isolate overflow-hidden bg-ember-deep text-white">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
      <div class="container-site h-full">
        <div class="relative h-full">
          <div
            v-for="(col, i) in columns"
            :key="col"
            class="absolute inset-y-0 w-px bg-white/15"
            :class="i === 1 || i === 2 ? 'hidden md:block' : ''"
            :style="{ left: col }"
          />
        </div>
      </div>
    </div>

    <div class="container-site pt-10 pb-20 sm:pb-16 md:pt-14">
      <div class="relative grid gap-8 pb-10 md:grid-cols-3 md:gap-0 md:pb-14">
        <p class="flex items-start gap-2.5 self-start text-sm font-medium md:pr-6">
          <span aria-hidden="true" class="relative mt-1.5 flex size-2 shrink-0">
            <span class="absolute inset-0 animate-ping rounded-full bg-white/70" />
            <span class="relative size-2 rounded-full bg-white" />
          </span>
          {{ t('footer.available') }}
        </p>

        <nav aria-label="Footer" class="md:px-6">
          <!-- At md the middle column is narrower than two equal tracks need for "Achievements", so tracks never shrink below their labels. -->
          <ul class="grid grid-cols-2 gap-x-8 gap-y-1 md:grid-cols-[repeat(2,minmax(max-content,1fr))] md:gap-x-6 lg:gap-x-8">
            <li v-for="link in sections" :key="link.id">
              <a
                :href="hrefFor(link.id)"
                class="link-underline inline-block py-1 text-[15px] font-medium whitespace-nowrap"
                @click.prevent="go(link.id)"
              >{{ t(link.key) }}</a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          class="group inline-flex min-h-11 w-fit cursor-pointer items-center gap-4 self-start whitespace-nowrap rounded-[3px] bg-white py-1.5 pr-1.5 pl-4 text-sm font-medium uppercase tracking-[0.01em] text-onyx transition-colors duration-300 hover:bg-onyx hover:text-white active:translate-y-px md:justify-self-end"
          @click="toTop"
        >
          {{ t('footer.backToTop') }}
          <span class="grid size-8 place-items-center rounded-[2px] bg-accent text-white transition-transform duration-300 group-hover:-translate-y-0.5">
            <ArrowUp :size="16" :stroke-width="2" aria-hidden="true" />
          </span>
        </button>

        <span aria-hidden="true" class="absolute -inset-x-[50vw] bottom-0 h-px bg-white/15" />
        <svg
          v-for="(col, i) in columns"
          :key="col"
          aria-hidden="true"
          viewBox="0 0 12 12"
          class="absolute bottom-0 size-3 -translate-x-1/2 translate-y-1/2 text-white/75"
          :class="i === 1 || i === 2 ? 'hidden md:block' : ''"
          :style="{ left: col }"
        ><path d="M6 0v12M0 6h12" stroke="currentColor" stroke-width="1" /></svg>
      </div>

      <p class="wordmark pt-8 pb-9 font-display font-extrabold uppercase md:pt-12 md:pb-14">
        <span class="block"><span class="sr-only">Ivan </span>Mendoza</span>
      </p>

      <div class="relative grid gap-6 pt-6 text-sm md:grid-cols-3 md:gap-0 md:pt-8">
        <span aria-hidden="true" class="absolute -inset-x-[50vw] top-0 h-px bg-white/15" />
        <svg
          v-for="(col, i) in columns"
          :key="col"
          aria-hidden="true"
          viewBox="0 0 12 12"
          class="absolute top-0 size-3 -translate-x-1/2 -translate-y-1/2 text-white/75"
          :class="i === 1 || i === 2 ? 'hidden md:block' : ''"
          :style="{ left: col }"
        ><path d="M6 0v12M0 6h12" stroke="currentColor" stroke-width="1" /></svg>

        <ul class="flex flex-wrap content-start gap-x-6 gap-y-1 md:pr-6">
          <li v-for="social in socials" :key="social.label">
            <a
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="link-underline inline-block py-1 font-medium whitespace-nowrap"
            >{{ social.label }}</a>
          </li>
        </ul>

        <div class="flex flex-col items-start gap-1 md:px-6">
          <a :href="'mailto:' + email" class="link-underline inline-block py-1 font-medium [overflow-wrap:anywhere]">{{ emailUser }}<wbr />@{{ emailDomain }}</a>
          <p class="py-1">{{ t('footer.designed') }}</p>
        </div>

        <ul class="flex flex-col items-start gap-1 md:items-end md:text-right">
          <li>
            <a
              href="https://github.com/ivansmb11/ivan-dev"
              target="_blank"
              rel="noopener noreferrer"
              class="link-underline inline-flex items-center gap-1 py-1 whitespace-nowrap"
            >{{ t('footer.source') }}<ArrowUpRight :size="13" aria-hidden="true" /></a>
          </li>
          <li>
            <NuxtLink to="/blog" class="link-underline inline-block py-1">{{ t('footer.blog') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/agents" class="link-underline inline-block py-1">{{ t('footer.agents') }}</NuxtLink>
          </li>
          <li class="py-1">{{ t('footer.rights', { year }) }}</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* The global accent focus ring measures about 1.5:1 against the orange, so footer controls ring in white (5.6:1) in both themes. */
footer :focus-visible {
  outline-color: var(--color-white);
}

/* Sized against the content box, so the word spans the column at every width without overflowing. */
.wordmark {
  container-type: inline-size;
}

.wordmark > span {
  /* The negative indent cancels the M's side bearing so the ink lines up with the grid. */
  margin-left: -0.045em;
  font-size: 21.2cqw;
  line-height: 0.8;
  letter-spacing: -0.055em;
}
</style>
