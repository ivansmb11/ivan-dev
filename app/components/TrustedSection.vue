<script setup>
import AssetSlot from '@/components/ui/AssetSlot.vue'

const { t } = useI18n()

const logos = [
  { id: 'logo-zazpay', name: 'ZAZPAY' },
  { id: 'logo-prestavale', name: 'Presta Vale' },
  { id: 'logo-ge-aerospace', name: 'GE Aerospace' },
  { id: 'logo-anahuac', name: 'Universidad Anáhuac' },
  { id: 'logo-google-cloud', name: 'Google Cloud' },
]
</script>

<template>
  <section aria-labelledby="trusted-label" class="border-b border-line">
    <div class="container-site flex flex-col gap-8 py-10 md:flex-row md:items-center md:gap-12 md:py-12">
      <p
        id="trusted-label"
        class="max-w-[12rem] shrink-0 text-sm font-medium uppercase leading-snug tracking-[0.01em] md:text-[15px]"
      >{{ t('trusted.label') }}</p>
      <ul class="grid flex-1 grid-cols-2 items-center gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
        <li v-for="logo in logos" :key="logo.id">
          <AssetSlot
            :id="logo.id"
            :alt="logo.name"
            :fallback-text="logo.name"
            compact
            fit="contain"
            class="mx-auto h-14 w-full max-w-[11rem]"
          />
        </li>
      </ul>
    </div>
  </section>
</template>
