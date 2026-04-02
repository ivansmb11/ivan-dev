<script setup>
import { useTheme } from '@/stores/useThemeStore'
import { Shield, Users, DollarSign, ShieldAlert } from 'lucide-vue-next'

const { theme } = useTheme()
const YOUTUBE_ID = '3ATSpNSdtiw'

const scenarios = [
  {
    icon: Users,
    label: 'HR User',
    email: 'hr@example.com',
    color: 'emerald',
    description: 'Queries employee records, salaries, and department summaries from the HR database via PSC endpoint 10.0.0.50',
  },
  {
    icon: DollarSign,
    label: 'Finance User',
    email: 'finance@example.com',
    color: 'blue',
    description: 'Queries invoices, budgets, and overdue payments from the Finance database via PSC endpoint 10.0.0.51',
  },
  {
    icon: ShieldAlert,
    label: 'Unauthorized User',
    email: 'hacker@evil.com',
    color: 'red',
    description: 'Rejected immediately with 401. No database access, no tools loaded, no data exposed.',
  },
]
</script>

<template>
  <div>
    <h2
      class="text-2xl font-display font-bold mb-2"
      :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
    >Live Demo</h2>
    <p
      class="mb-8"
      :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
    >Watch the agent route queries to isolated databases based on user identity.</p>

    <!-- Scenario cards -->
    <div class="grid sm:grid-cols-3 gap-3 mb-8">
      <div
        v-for="s in scenarios"
        :key="s.label"
        class="rounded-xl p-4 border transition-colors"
        :class="theme === 'dark'
          ? 'bg-surface-light/30 border-zinc-800'
          : 'bg-white border-zinc-200 shadow-sm'"
      >
        <div class="flex items-center gap-2.5 mb-2">
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center"
            :class="s.color === 'emerald' ? 'bg-emerald-500/10' : s.color === 'blue' ? 'bg-blue-500/10' : 'bg-red-500/10'"
          >
            <component
              :is="s.icon"
              :size="16"
              :class="s.color === 'emerald' ? 'text-emerald-400' : s.color === 'blue' ? 'text-blue-400' : 'text-red-400'"
            />
          </div>
          <div>
            <h4
              class="text-sm font-bold"
              :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
            >{{ s.label }}</h4>
            <span
              class="text-xs font-mono"
              :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
            >{{ s.email }}</span>
          </div>
        </div>
        <p
          class="text-xs leading-relaxed"
          :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
        >{{ s.description }}</p>
      </div>
    </div>

    <!-- YouTube embed -->
    <div
      class="rounded-xl border overflow-hidden"
      :class="theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200 shadow-sm'"
    >
      <iframe
        :src="`https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0`"
        class="w-full aspect-video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>

    <!-- Security note -->
    <div
      class="mt-4 flex items-start gap-2 text-xs"
      :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
    >
      <Shield :size="12" class="mt-0.5 shrink-0" />
      <span>
        This demo uses simulated identity headers (X-User-Email).
        In production, IAP would inject verified Google identity claims.
        The agent cannot access databases outside the authenticated user's department.
      </span>
    </div>
  </div>
</template>
