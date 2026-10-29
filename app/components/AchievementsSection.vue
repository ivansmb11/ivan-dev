<script setup>
import { computed, ref } from 'vue'
import { ArrowRight, ArrowUpRight, Hash, MapPin } from 'lucide-vue-next'
import AssetSlot from '@/components/ui/AssetSlot.vue'
import SectionChip from '@/components/ui/SectionChip.vue'
import SplitHeading from '@/components/ui/SplitHeading.vue'
import SwipeDots from '@/components/ui/SwipeDots.vue'
import { slotSrc } from '@/assets/slots'
import { reveal } from '@/motion'

const { t } = useI18n()
const track = ref(null)

// A labeled placeholder needs more room than the final logo to stay legible.
const logoBox = (id) => (slotSrc(id) ? 'h-10 w-36' : 'h-20 w-48')

const achievements = computed(() => [
  {
    key: 'nyc2026',
    slot: 'logo-ai-engineer',
    brand: 'AI Engineer',
    title: t('achievements.nyc2026.title'),
    issuer: t('achievements.nyc2026.issuer'),
    date: t('achievements.nyc2026.date'),
    location: t('achievements.nyc2026.location'),
    url: '',
    to: '/blog/ai-engineer-2026',
    linkLabel: t('achievements.readPost'),
    credential: '',
    type: 'conference',
  },
  {
    key: 'summit',
    slot: 'logo-ai-engineer',
    brand: 'AI Engineer',
    title: t('achievements.summit.title'),
    issuer: t('achievements.summit.issuer'),
    date: t('achievements.summit.date'),
    location: t('achievements.summit.location'),
    url: '',
    credential: '',
    type: 'conference',
  },
  {
    key: 'saa',
    slot: 'logo-anahuac',
    brand: 'Anáhuac',
    title: t('achievements.saa.title'),
    issuer: t('achievements.saa.issuer'),
    date: t('achievements.saa.date'),
    credential: t('achievements.saa.credential'),
    url: 'https://wallet.xertify.co/certificates/7CC14A8DA001',
  },
  {
    key: 'gcloud',
    slot: 'logo-google-cloud',
    brand: 'Google Cloud',
    title: t('achievements.gcloud.title'),
    issuer: t('achievements.gcloud.issuer'),
    date: t('achievements.gcloud.date'),
    url: 'https://www.skills.google/public_profiles/63a74ab3-4ba1-4a97-bcdc-83f0efdb5d28',
    linkLabel: t('achievements.gcloud.linkLabel'),
  },
])
</script>

<template>
  <section id="achievements" aria-labelledby="achievements-heading" class="py-16 md:py-32">
    <div class="container-site">
      <div v-motion="reveal()" class="flex flex-col gap-5 md:gap-6">
        <SectionChip>{{ t('achievements.label') }}</SectionChip>
        <SplitHeading
          id="achievements-heading"
          :lead="t('achievements.headingLead')"
          :rest="t('achievements.headingRest')"
          size="lg"
          class="text-balance"
        />
      </div>

      <!-- Subgrid rows keep logos, titles and certificate links level across cards whose titles differ in length. -->
      <ul ref="track" class="swipe-track mt-14 grid grid-cols-1 gap-4 md:mt-20 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-0">
        <li
          v-for="(item, i) in achievements"
          :key="item.key"
          v-motion="reveal(i * 120)"
          class="group relative isolate flex flex-col overflow-hidden rounded-[3px] bg-card p-6 sm:p-7 lg:row-span-3 lg:nth-[n+3]:mt-6 lg:grid lg:grid-cols-1 lg:grid-rows-subgrid lg:gap-y-0"
        >
          <AssetSlot
            id="achievement-stamp"
            class="pointer-events-none absolute -right-8 -bottom-8 -z-10 size-36 rotate-12 opacity-15 transition-opacity duration-500 group-hover:opacity-30 md:size-44"
            fit="contain"
          />
          <div class="flex items-start justify-between gap-4">
            <AssetSlot
              :id="item.slot"
              :alt="item.issuer"
              :fallback-text="item.brand"
              compact
              fit="contain"
              position="left center"
              class="min-w-0"
              :class="logoBox(item.slot)"
            />
            <span class="shrink-0 whitespace-nowrap rounded-[2px] bg-mist px-2 py-1 text-xs leading-none text-ink">{{ item.date }}</span>
          </div>

          <div class="mt-8 md:mt-10">
            <h3 class="text-[17px] font-bold uppercase leading-[1.2] tracking-[-0.02em] [overflow-wrap:anywhere]">
              {{ item.title }}
            </h3>
            <p class="mt-3 text-sm font-medium">{{ item.issuer }}</p>
            <p
              v-if="item.location || item.credential"
              class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-graphite"
            >
              <span v-if="item.location" class="inline-flex items-center gap-1.5">
                <MapPin :size="13" aria-hidden="true" />{{ item.location }}
              </span>
              <span v-if="item.credential" class="inline-flex items-center gap-1.5">
                <Hash :size="13" aria-hidden="true" />{{ item.credential }}
              </span>
            </p>
          </div>

          <div v-if="item.to" class="mt-6 flex items-end max-md:mt-auto max-md:pt-6">
            <NuxtLink
              :to="item.to"
              class="group/link -mb-2 inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap text-sm max-md:whitespace-normal font-medium uppercase tracking-[0.01em]"
            >
              <span class="link-underline group-hover/link:bg-[length:100%_1px]">{{ item.linkLabel }}</span>
              <ArrowRight :size="16" :stroke-width="2" aria-hidden="true" class="transition-[color,translate] duration-300 group-hover/link:translate-x-0.5 group-hover/link:text-accent" />
              <span class="sr-only">: {{ item.title }}</span>
            </NuxtLink>
          </div>
          <div v-else-if="item.url" class="mt-6 flex items-end max-md:mt-auto max-md:pt-6">
            <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group/link -mb-2 inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap text-sm max-md:whitespace-normal font-medium uppercase tracking-[0.01em]"
            >
              <span class="link-underline group-hover/link:bg-[length:100%_1px]">{{ item.linkLabel ?? t('achievements.verify') }}</span>
              <ArrowUpRight :size="16" :stroke-width="2" aria-hidden="true" class="transition-[color,translate] duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-accent" />
              <span class="sr-only">: {{ item.title }}</span>
            </a>
          </div>
        </li>
      </ul>
      <SwipeDots :track="track" :count="achievements.length" :label="t('achievements.label')" />
    </div>
  </section>
</template>
