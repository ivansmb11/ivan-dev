<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { GraduationCap, Briefcase, MapPin } from 'lucide-vue-next'
const { t } = useI18n()

const highlights = computed(() => [
  {
    icon: GraduationCap,
    title: t('about.education'),
    text: t('about.educationText'),
  },
  {
    icon: Briefcase,
    title: t('about.experience'),
    text: t('about.experienceText'),
  },
  {
    icon: MapPin,
    title: t('about.location'),
    text: t('about.locationText'),
  }
])
</script>

<template>
  <section id="about" class="relative py-32 overflow-hidden">

    <div class="max-w-6xl mx-auto px-6">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="mb-16"
      >
        <p class="text-primary font-mono text-sm tracking-widest uppercase mb-3">{{ t('about.label') }}</p>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight">{{ t('about.title') }}</h2>
        <div class="mt-4 h-1 w-16 bg-primary rounded-full" />
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-start">
        <div
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
        >
          <p class="text-zinc-300 text-lg leading-relaxed mb-6">
            {{ t('about.bio1') }}
          </p>
          <p class="text-zinc-400 leading-relaxed">
            {{ t('about.bio2') }}
          </p>
        </div>

        <div class="flex flex-col gap-8">
          <div
            v-for="(item, i) in highlights"
            :key="item.title"
            v-motion
            :initial="{ opacity: 0, x: 40 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: 300 + i * 150 } }"
            class="flex items-start gap-4"
          >
            <component :is="item.icon" :size="20" class="text-primary shrink-0 mt-0.5" />
            <div>
              <h3 class="font-semibold text-white mb-1">{{ item.title }}</h3>
              <p class="text-sm text-zinc-400 leading-relaxed">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
