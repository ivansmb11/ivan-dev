<script setup>
import { Bot } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/stores/useThemeStore'
const { t } = useI18n()
const { theme } = useTheme()
</script>

<template>
  <router-link
    to="/agents"
    class="fixed bottom-10 right-4 z-[90] flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono shadow-lg transition-all duration-300 hover:scale-105 group border"
    :class="theme === 'dark'
      ? 'bg-zinc-900/90 backdrop-blur-sm border-zinc-700 text-zinc-400 hover:border-primary/50 hover:text-primary'
      : 'bg-white/90 backdrop-blur-sm border-zinc-200 text-zinc-500 hover:border-primary/50 hover:text-primary'"
    title="View plain-text version for AI agents"
  >
    <Bot :size="14" class="group-hover:text-primary transition-colors" />
    <span class="hidden sm:inline">{{ t('agent.fab') }}</span>
    <span class="sm:hidden">AI</span>
  </router-link>
</template>
