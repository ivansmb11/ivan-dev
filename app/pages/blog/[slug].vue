<script setup>
import { computed } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import PageHeader from '@/components/ui/PageHeader.vue'
import AssetSlot from '@/components/ui/AssetSlot.vue'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'
import { enter, reveal } from '@/motion'
import { findPost, readMinutes } from '@/content/blog'
import { slotSrc } from '@/assets/slots'

const route = useRoute()
const { t, locale } = useI18n()

const post = findPost(route.params.slug)
if (!post) throw createError({ statusCode: 404, statusMessage: 'Post not found' })

const entry = computed(() => post[locale.value] ?? post.en)
const minutes = computed(() => readMinutes(entry.value))
// UTC so the prerendered date and the hydrated one can't land on different days.
const date = computed(() =>
  new Intl.DateTimeFormat(locale.value, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${post.date}T00:00:00Z`)),
)

const coverSrc = slotSrc(post.cover)
useSeoMeta({
  title: () => `${entry.value.title} | Ivan Mendoza`,
  description: () => entry.value.description,
  ogType: 'article',
  ogUrl: `https://ivanmendoza.dev/blog/${post.slug}`,
  ogTitle: () => entry.value.title,
  ogDescription: () => entry.value.description,
  ...(coverSrc && { ogImage: coverSrc, twitterImage: coverSrc }),
  articlePublishedTime: post.date,
})

const frameShadow = 'shadow-[0_24px_48px_-28px_color-mix(in_oklch,var(--color-night)_45%,transparent)]'
</script>

<template>
  <main id="main" tabindex="-1" class="outline-none">
    <article>
      <header class="container-site pt-32 md:pt-40">
        <NuxtLink
          to="/blog"
          class="group -ml-1 inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium uppercase tracking-[0.01em] text-graphite transition-colors hover:text-ink"
        >
          <ArrowLeft :size="16" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span class="link-underline">{{ t('blog.back') }}</span>
        </NuxtLink>

        <PageHeader v-motion="enter(100)" class="mt-6 md:mt-8" :title="entry.title" :kicker="entry.kicker" />

        <p v-motion="enter(200)" class="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-graphite md:mt-10">
          <time :datetime="post.date">{{ date }}</time>
          <span aria-hidden="true" class="text-muted">/</span>
          <span>{{ t('blog.minRead', { n: minutes }) }}</span>
        </p>

        <p v-motion="enter(250)" class="mt-6 max-w-[44rem] text-lg leading-relaxed text-graphite md:text-xl">
          {{ entry.lede }}
        </p>
      </header>

      <div class="container-site mt-16 pb-24 md:mt-24 md:pb-40">
        <div class="mx-auto max-w-[44rem]">
          <template v-for="(block, i) in entry.blocks" :key="i">
            <h2
              v-if="block.type === 'h'"
              v-motion="reveal()"
              class="mt-16 flex items-start gap-2 text-2xl leading-tight font-bold tracking-[-0.02em] uppercase first:mt-0 md:mt-20 md:text-[2rem]"
            >
              <AsteriskMark class="mt-[0.3em] size-3.5 shrink-0 text-accent" />{{ block.text }}
            </h2>

            <p v-else-if="block.type === 'p'" class="mt-6 text-[17px] leading-[1.7] text-ink md:text-lg">
              {{ block.text }}
            </p>

            <figure v-else-if="block.type === 'quote'" v-motion="reveal()" class="my-12 border-l-[3px] border-accent bg-mist px-6 py-7 md:px-10 md:py-9">
              <blockquote class="text-xl leading-snug font-semibold tracking-[-0.01em] text-ink md:text-2xl">
                "{{ block.text }}"
              </blockquote>
              <figcaption class="mt-4 text-sm uppercase tracking-[0.01em] text-graphite">{{ block.cite }}</figcaption>
            </figure>

            <figure
              v-else-if="block.type === 'photo'"
              v-motion="reveal()"
              class="my-12 bg-card p-2 md:my-16 md:p-3"
              :class="[frameShadow, block.tall ? 'mx-auto max-w-[26rem]' : 'md:-mx-16 lg:-mx-32']"
            >
              <AssetSlot :id="block.slot" :alt="block.caption" class="w-full" :class="block.tall ? 'aspect-[3/4]' : 'aspect-[3/2]'" />
              <figcaption class="mt-2 flex items-center gap-1.5 bg-mist-soft px-3 py-2 text-[13px] text-graphite md:mt-3 md:text-sm">
                <AsteriskMark class="size-3 shrink-0 text-accent" />
                <span>{{ block.caption }}</span>
              </figcaption>
            </figure>

            <div v-else-if="block.type === 'gallery'" v-motion="reveal()" class="my-12 grid grid-cols-2 gap-2 md:-mx-16 md:my-16 md:gap-3 lg:-mx-32">
              <figure v-for="photo in block.photos" :key="photo.slot" class="flex flex-col bg-card p-1.5 md:p-2.5" :class="frameShadow">
                <AssetSlot :id="photo.slot" :alt="photo.caption" class="aspect-[3/4] w-full" />
                <figcaption class="mt-1.5 flex flex-1 items-start gap-1.5 bg-mist-soft px-2.5 py-2 text-xs leading-snug text-graphite md:mt-2.5 md:text-[13px]">
                  <AsteriskMark class="mt-[0.2em] size-2.5 shrink-0 text-accent" />
                  <span>{{ photo.caption }}</span>
                </figcaption>
              </figure>
            </div>
          </template>

          <div class="mt-20 border-t border-line pt-8">
            <NuxtLink
              to="/blog"
              class="group -ml-1 inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium uppercase tracking-[0.01em] text-graphite transition-colors hover:text-ink"
            >
              <ArrowLeft :size="16" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-x-0.5" />
              <span class="link-underline">{{ t('blog.back') }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </article>
  </main>
</template>
