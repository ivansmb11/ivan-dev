<script setup>
import { useTheme } from '@/stores/useThemeStore'
const { theme } = useTheme()

const techs = [
  'Vue.js', 'React Native', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL',
  'Tailwind CSS', 'Vite', 'REST APIs', 'Firebase', 'CI/CD', 'Git', 'Spring Boot',
  'Expo', 'JavaScript', 'Zustand', 'React Query', 'Docker', 'Python', 'Redis',
  'Neo4J', 'MCP', 'AI Agents',
]
// Duplicate for seamless loop
const tickerItems = [...techs, ...techs]
</script>

<template>
  <div class="relative overflow-hidden py-6 border-y" :class="theme === 'dark' ? 'border-zinc-800/40' : 'border-zinc-200'">
    <div class="ticker-track flex gap-8 whitespace-nowrap">
      <span
        v-for="(tech, i) in tickerItems"
        :key="i"
        class="text-sm font-mono shrink-0"
        :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
      >{{ tech }} <span :class="theme === 'dark' ? 'text-zinc-800' : 'text-zinc-300'" class="mx-2">•</span></span>
    </div>
  </div>
</template>

<style scoped>
.ticker-track {
  animation: ticker 40s linear infinite;
  width: max-content;
}

@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.ticker-track:hover {
  animation-play-state: paused;
}
</style>
