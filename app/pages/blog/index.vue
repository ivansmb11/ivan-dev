<script setup>
import { computed } from 'vue'
import { ArrowLeft, ArrowUpRight } from 'lucide-vue-next'
import PageHeader from '@/components/ui/PageHeader.vue'
import AssetSlot from '@/components/ui/AssetSlot.vue'
import { enter, reveal } from '@/motion'
import { posts, readMinutes } from '@/content/blog'

const { t, locale } = useI18n()

useSeoMeta({
  title: () => `${t('blog.title')} | Ivan Mendoza`,
  description: () => t('blog.intro'),
  ogUrl: 'https://ivanmendoza.dev/blog',
  ogTitle: () => `${t('blog.title')} | Ivan Mendoza`,
  ogDescription: () => t('blog.intro'),
})

const entries = computed(() => {
  const format = new Intl.DateTimeFormat(locale.value, { dateStyle: 'long', timeZone: 'UTC' })
  return posts.map((post) => {
    const entry = post[locale.value] ?? post.en
    return { ...post, entry, minutes: readMinutes(entry), dateLabel: format.format(new Date(`${post.date}T00:00:00Z`)) }
  })
})
</script>

<template>
  <main id="main" tabindex="-1" class="outline-none">
    <div class="container-site pt-32 pb-24 md:pt-40 md:pb-40">
      <NuxtLink
        to="/"
        class="group -ml-1 inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium uppercase tracking-[0.01em] text-graphite transition-colors hover:text-ink"
      >
        <ArrowLeft :size="16" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-x-0.5" />
        <span class="link-underline">{{ t('blog.backHome') }}</span>
      </NuxtLink>

      <PageHeader v-motion="enter(100)" class="mt-6 md:mt-8" :title="t('blog.title')" :kicker="t('blog.kicker')" />

      <p v-motion="enter(250)" class="mt-10 max-w-[44rem] text-lg leading-relaxed text-graphite md:mt-14 md:text-xl">
        {{ t('blog.intro') }}
      </p>

      <ul class="mt-16 flex flex-col gap-3 md:mt-24">
        <li v-for="post in entries" :key="post.slug" v-motion="reveal()">
          <NuxtLink
            :to="`/blog/${post.slug}`"
            class="group grid gap-6 bg-card p-3 transition-colors hover:bg-mist md:grid-cols-12 md:gap-10 md:p-4"
          >
            <AssetSlot :id="post.cover" :alt="post.entry.title" class="aspect-[16/10] w-full md:col-span-5" />
            <div class="flex flex-col gap-4 px-2 pb-3 md:col-span-7 md:px-0 md:py-4 md:pr-4">
              <p class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-graphite">
                <span class="rounded-[2px] bg-mist px-2 py-1 leading-none text-ink group-hover:bg-card">{{ post.entry.kicker }}</span>
                <time :datetime="post.date">{{ post.dateLabel }}</time>
                <span aria-hidden="true" class="text-muted">/</span>
                <span>{{ t('blog.minRead', { n: post.minutes }) }}</span>
              </p>
              <h2 class="text-2xl leading-tight font-bold tracking-[-0.02em] uppercase md:text-[2rem]">{{ post.entry.title }}</h2>
              <p class="max-w-[36rem] text-base leading-relaxed text-graphite">{{ post.entry.description }}</p>
              <span class="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium uppercase tracking-[0.01em]">
                <span class="link-underline group-hover:bg-[length:100%_1px]">{{ t('blog.read') }}</span>
                <ArrowUpRight :size="16" :stroke-width="2" aria-hidden="true" class="transition-[color,translate] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </main>
</template>
