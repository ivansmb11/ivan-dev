<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import AssetSlot from '@/components/ui/AssetSlot.vue'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'
import { enter, scrollBehavior } from '@/motion'

const { t } = useI18n()
const contactHref = useRouter().resolve({ path: '/', hash: '#contact' }).href
const year = new Date().getFullYear()

const columns = ['0%', '33.333%', '66.666%', '100%']
const rows = ['5.25rem', '35%', '70%']

function toContact() {
  const contact = document.getElementById('contact')
  contact?.scrollIntoView({ behavior: scrollBehavior() })
  contact?.focus({ preventScroll: true })
}
</script>

<template>
  <!-- The global accent focus ring is ~1:1 against this orange, so focus turns white in here -->
  <section id="hero" class="relative isolate overflow-hidden text-white [&_:focus-visible]:outline-white!">
    <div aria-hidden="true" class="hero-bg absolute inset-0 -z-30" />

    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-20">
      <div
        v-for="row in rows"
        :key="row"
        class="absolute inset-x-0 h-px bg-white/15"
        :style="{ top: row }"
      />
      <div class="container-site h-full">
        <div class="relative h-full">
          <div
            v-for="(col, i) in columns"
            :key="col"
            class="absolute inset-y-0 w-px bg-white/15"
            :class="i === 1 || i === 2 ? 'hidden md:block' : ''"
            :style="{ left: col }"
          />
          <template v-for="row in rows" :key="row">
            <svg
              v-for="(col, i) in columns"
              :key="row + col"
              viewBox="0 0 12 12"
              class="absolute size-3 -translate-x-1/2 -translate-y-1/2 text-white/75"
              :class="i === 1 || i === 2 ? 'hidden md:block' : ''"
              :style="{ left: col, top: row }"
            ><path d="M6 0v12M0 6h12" stroke="currentColor" stroke-width="1" /></svg>
          </template>
        </div>
      </div>
    </div>

    <p
      aria-hidden="true"
      class="ghost-name pointer-events-none absolute inset-x-0 hidden md:block top-[calc(5.25rem+0.5rem)] -z-10 select-none text-center font-display font-extrabold uppercase text-white/[0.09]"
    >Mendoza</p>

    <div class="container-site relative flex min-h-[100svh] flex-col pt-[6.5rem] pb-6 md:pt-[calc(35svh+1.25rem)] md:pb-10">
      <div class="relative z-10 flex items-start justify-between gap-8">
        <p
          v-motion="enter(150)"
          class="hero-tagline text-[15px] font-semibold uppercase leading-[1.35] tracking-[-0.01em] lg:text-[17px]"
        >{{ t('hero.tagline') }}</p>

        <router-link
          v-motion="enter(500)"
          to="/vibebify"
          class="group hidden w-[clamp(10.5rem,13vw,14rem)] shrink-0 bg-white p-2 text-onyx shadow-2xl shadow-onyx/40 transition-transform duration-500 hover:-translate-y-1 md:block max-lg:portrait:hidden [@media(max-height:719px)]:hidden"
        >
          <AssetSlot id="hero-featured-project" alt="Vibebify" tone="ember" class="aspect-[6/7] w-full" />
          <span class="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 bg-onyx/[0.06] px-2 py-1.5 text-[13px] text-onyx/70">
            <span class="flex items-center gap-1.5 uppercase">
              <AsteriskMark class="size-3 text-accent" />Vibebify
            </span>
            <span class="whitespace-nowrap">/{{ t('hero.featuredType') }}</span>
          </span>
        </router-link>
      </div>

      <div class="pointer-events-none relative mt-auto flex h-[min(64svh,34rem)] justify-center md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:h-[91%]">
        <AssetSlot
          id="hero-portrait"
          alt="Ivan Mendoza"
          tone="ember"
          fit="contain"
          position="50% 100%"
          eager
          class="aspect-[1231/1278] h-full shrink-0"
        />
      </div>

      <div class="relative z-10 -mt-[9.5rem] flex flex-col gap-5 md:mt-auto md:flex-row md:items-end md:justify-between">
        <div v-motion="enter(300)">
          <p class="text-xl font-bold tracking-tight md:text-2xl">©{{ year }}</p>
          <h1 class="mt-1 font-display text-display-hero uppercase">
            Ivan<span class="sr-only"> Mendoza, {{ t('hero.role') }}</span>
          </h1>
        </div>

        <a
          v-motion="enter(650)"
          :href="contactHref"
          class="group flex w-full gap-3 bg-onyx p-2 text-white md:w-[clamp(19rem,25vw,23.5rem)]"
          @click.prevent="toContact"
        >
          <span class="relative aspect-[1/0.95] w-[36%] shrink-0 overflow-hidden bg-ember">
            <AssetSlot
              id="hero-portrait"
              tone="ember"
              fit="contain"
              compact
              class="absolute top-[3%] left-1/2 aspect-[1231/1278] w-[155%] -translate-x-1/2"
            />
          </span>
          <span class="flex min-w-0 flex-1 flex-col justify-between py-1 pr-1">
            <span class="flex items-start justify-between gap-2">
              <span class="text-[13px] text-white/70">{{ t('hero.letsTalk') }}</span>
              <AsteriskMark class="size-4 text-white/80" />
            </span>
            <span class="flex items-end justify-between gap-3">
              <span class="min-w-0">
                <span class="block truncate text-[15px] font-bold leading-tight sm:text-[17px]">Ivan Mendoza</span>
                <span class="block text-[13px] leading-tight text-white/70">{{ t('hero.role') }}</span>
              </span>
              <span class="grid size-9 shrink-0 place-items-center bg-white text-onyx transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <ArrowUpRight :size="16" :stroke-width="2" aria-hidden="true" />
              </span>
            </span>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Deep-to-ember across the full width, like the reference. The glow stays behind the portrait so the
   tagline and nav keep white text at 4.5:1 or better. BootSequence uses the same gradient. */
.hero-bg {
  --hero-shade: linear-gradient(to bottom, oklch(0% 0 0 / 0.2), transparent 16%);
  background:
    var(--hero-shade),
    radial-gradient(40% 55% at 62% 50%, var(--color-ember-bright), transparent 70%),
    linear-gradient(90deg, var(--color-ember-deep), var(--color-ember));
}

/* On phones the tagline sits right under the nav and spans the full width, into the brighter orange */
@media (max-width: 47.99rem) {
  .hero-bg {
    --hero-shade: linear-gradient(to bottom, oklch(0% 0 0 / 0.26), oklch(0% 0 0 / 0.16) 18%, transparent 32%);
  }
}

.hero-tagline {
  max-width: 20rem;
}

/* From md the cutout is centered and 91% of the hero tall, so at the tagline's height the face starts
   about 17svh left of the viewport center. The tagline stops 1.5rem short of it instead of running over it. */
@media (min-width: 48rem) {
  .hero-tagline {
    max-width: clamp(9.5rem, calc(50vw - 17svh - clamp(1.25rem, 4vw, 3.5rem) - 1.5rem), 20rem);
  }
}

@media (min-width: 64rem) {
  .hero-tagline {
    max-width: clamp(9.5rem, calc(50vw - 17svh - clamp(1.25rem, 4vw, 3.5rem) - 1.5rem), 22rem);
  }
}

.ghost-name {
  font-size: clamp(4.5rem, 18.5vw, 17rem);
  line-height: 0.82;
  letter-spacing: -0.05em;
}
</style>
