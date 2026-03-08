<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { GraduationCap, Briefcase, MapPin } from 'lucide-vue-next'
import aboutImg from '@/assets/about.jpg'

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
    <!-- Parallax background -->
    <div
      class="absolute inset-0 parallax-bg opacity-10"
      :style="{ backgroundImage: `url(${aboutImg})` }"
    />
    <div class="absolute inset-0 bg-zinc-950/90" />

    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <!-- Section header -->
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
        <!-- Text -->
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

        <!-- Highlight cards -->
        <div class="flex flex-col gap-4">
          <div
            v-for="(item, i) in highlights"
            :key="item.title"
            v-motion
            :initial="{ opacity: 0, x: 40 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: 300 + i * 150 } }"
            class="group p-5 rounded-2xl bg-surface border border-zinc-800 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
          >
            <div class="flex items-start gap-4">
              <div class="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                <component :is="item.icon" :size="22" />
              </div>
              <div>
                <h3 class="font-semibold text-white mb-1">{{ item.title }}</h3>
                <p class="text-sm text-zinc-400 leading-relaxed">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
