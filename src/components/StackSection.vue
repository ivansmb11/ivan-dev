<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import stackImg from '@/assets/stack.jpg'

const { t } = useI18n()

const categories = computed(() => [
  {
    name: t('stack.languages'),
    items: [
      { name: 'JavaScript', logo: 'js', url: 'https://www.javascript.com/' },
      { name: 'TypeScript', logo: 'typescript', url: 'https://www.typescriptlang.org/' },
      { name: 'Java', logo: 'java', url: 'https://www.java.com/en/' },
      { name: 'Python', logo: 'python', url: 'https://www.python.org/' },
    ]
  },
  {
    name: t('stack.frontend'),
    items: [
      { name: 'Vue.js', logo: 'vue', url: 'https://vuejs.org/' },
      { name: 'Vuetify', logo: 'vuetify', url: 'https://vuetifyjs.com/en/' },
      { name: 'Bootstrap', logo: 'bootstrap', url: 'https://getbootstrap.com/' },
    ]
  },
  {
    name: t('stack.backend'),
    items: [
      { name: 'Node.js', logo: 'node', url: 'https://nodejs.org/en/' },
      { name: 'Spring Boot', logo: 'springb', url: 'https://spring.io/projects/spring-boot' },
      { name: 'Docker', logo: 'docker', url: 'https://www.docker.com/' },
    ]
  },
  {
    name: t('stack.databases'),
    items: [
      { name: 'PostgreSQL', logo: 'postgres', url: 'https://www.postgresql.org/' },
      { name: 'MongoDB', logo: 'mongo', url: 'https://www.mongodb.com/' },
    ]
  },
  {
    name: t('stack.tools'),
    items: [
      { name: 'Git', logo: 'git', url: 'https://git-scm.com/' },
      { name: 'GitHub', logo: 'github', url: 'https://github.com/' },
      { name: 'VS Code', logo: 'visual', url: 'https://code.visualstudio.com/' },
      { name: 'Postman', logo: 'postman', url: 'https://www.postman.com/' },
    ]
  },
])

// Import all logo images
const logos = import.meta.glob('@/assets/logos/*.png', { eager: true })

function getLogoSrc(name) {
  const key = Object.keys(logos).find(k => k.includes(`/${name}.png`))
  return key ? logos[key].default : ''
}
</script>

<template>
  <section id="stack" class="relative py-32 overflow-hidden">
    <!-- Parallax background -->
    <div
      class="absolute inset-0 parallax-bg opacity-5"
      :style="{ backgroundImage: `url(${stackImg})` }"
    />

    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <!-- Section header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="mb-16"
      >
        <p class="text-primary font-mono text-sm tracking-widest uppercase mb-3">{{ t('stack.label') }}</p>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight">{{ t('stack.title') }}</h2>
        <div class="mt-4 h-1 w-16 bg-primary rounded-full" />
      </div>

      <!-- Category groups -->
      <div class="space-y-12">
        <div
          v-for="(category, ci) in categories"
          :key="category.name"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: ci * 100 } }"
        >
          <h3 class="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">
            {{ category.name }}
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <a
              v-for="(item, ii) in category.items"
              :key="item.name"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              v-motion
              :initial="{ opacity: 0, scale: 0.8 }"
              :visible-once="{ opacity: 1, scale: 1, transition: { duration: 400, delay: ci * 100 + ii * 80 } }"
              class="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-surface border border-zinc-800 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              <img
                :src="getLogoSrc(item.logo)"
                :alt="item.name"
                class="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span class="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                {{ item.name }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
