<script setup>
import { useTheme } from '@/stores/useThemeStore'
import { Shield, Network, Brain, Lock, Server, Database } from 'lucide-vue-next'

const { theme } = useTheme()

const principles = [
  {
    icon: Shield,
    title: 'Zero-Trust Networking',
    description: 'No VPC trusts another by default. Every connection is explicit, authenticated, and auditable.'
  },
  {
    icon: Network,
    title: 'Hub-and-Spoke Topology',
    description: 'A central Hub VPC connects to isolated Spoke VPCs via NCC. Adding new departments scales linearly.'
  },
  {
    icon: Brain,
    title: 'Identity-Based Routing',
    description: 'The AI Agent determines which database to query based on the authenticated user identity, not network position.'
  },
  {
    icon: Lock,
    title: 'Private Service Connect',
    description: 'Databases are accessed through PSC endpoints, never exposed to the public internet or even across VPCs directly.'
  },
]

const stack = [
  { label: 'Orchestration', value: 'Google Cloud NCC' },
  { label: 'Compute', value: 'Cloud Run (serverless)' },
  { label: 'Database', value: 'Cloud SQL PostgreSQL 15' },
  { label: 'AI Model', value: 'Vertex AI Gemini 2.5 Flash' },
  { label: 'Framework', value: 'LangChain + Function Calling' },
  { label: 'Security', value: 'IAP, VPC-SC, PSC, IAM' },
  { label: 'CI/CD', value: 'GitHub Actions + WIF' },
  { label: 'IaC', value: 'gcloud CLI scripts' },
]

const timeline = [
  { step: '1', title: 'User sends a question', detail: 'via HTTPS to Cloud Run in the Hub VPC' },
  { step: '2', title: 'IAP verifies identity', detail: 'attaches email and department claim' },
  { step: '3', title: 'Agent resolves department', detail: 'maps user to HR or Finance' },
  { step: '4', title: 'Gemini picks a tool', detail: 'via Function Calling based on the question' },
  { step: '5', title: 'Tool queries the database', detail: 'through PSC endpoint (10.0.0.50 or 10.0.0.51)' },
  { step: '6', title: 'Gemini formats the answer', detail: 'returns structured response to user' },
]
</script>

<template>
  <div>
    <h2
      class="text-2xl font-display font-bold mb-2"
      :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
    >Documentation</h2>
    <p
      class="mb-10"
      :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
    >How the VIP Data Concierge works under the hood.</p>

    <!-- Problem statement -->
    <div
      class="rounded-xl p-6 mb-10 border"
      :class="theme === 'dark'
        ? 'bg-surface-light/50 border-zinc-800'
        : 'bg-white border-zinc-200 shadow-sm'"
    >
      <h3
        class="text-lg font-bold mb-3"
        :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
      >The Problem</h3>
      <p :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'">
        Standard cloud setups often expose databases to the internet or create
        flat networks where any compromised service can access all data.
        We built a Zero-Trust architecture where an AI Agent acts as a secure
        intermediary, residing in a central Hub and accessing sensitive, isolated
        user data stored in multiple Spoke VPCs without any traffic crossing
        the public internet.
      </p>
    </div>

    <!-- Design principles -->
    <h3
      class="text-lg font-bold mb-6"
      :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
    >Design Principles</h3>
    <div class="grid sm:grid-cols-2 gap-4 mb-12">
      <div
        v-for="p in principles"
        :key="p.title"
        class="rounded-xl p-5 border transition-colors"
        :class="theme === 'dark'
          ? 'bg-surface-light/30 border-zinc-800 hover:border-primary/40'
          : 'bg-white border-zinc-200 hover:border-primary/40 shadow-sm'"
      >
        <div class="flex items-center gap-3 mb-3">
          <div
            class="w-9 h-9 rounded-lg flex items-center justify-center"
            :class="theme === 'dark' ? 'bg-primary/10' : 'bg-primary/10'"
          >
            <component :is="p.icon" :size="18" class="text-primary" />
          </div>
          <h4
            class="font-bold text-sm"
            :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
          >{{ p.title }}</h4>
        </div>
        <p
          class="text-sm leading-relaxed"
          :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
        >{{ p.description }}</p>
      </div>
    </div>

    <!-- Tech stack -->
    <h3
      class="text-lg font-bold mb-6"
      :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
    >Tech Stack</h3>
    <div
      class="rounded-xl border overflow-hidden mb-12"
      :class="theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200 shadow-sm'"
    >
      <div
        v-for="(item, i) in stack"
        :key="item.label"
        class="flex items-center px-5 py-3 text-sm"
        :class="[
          theme === 'dark'
            ? i % 2 === 0 ? 'bg-surface-light/30' : 'bg-surface/50'
            : i % 2 === 0 ? 'bg-zinc-50' : 'bg-white',
        ]"
      >
        <span
          class="w-32 shrink-0 font-mono text-xs uppercase tracking-wider"
          :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'"
        >{{ item.label }}</span>
        <span
          class="font-medium"
          :class="theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'"
        >{{ item.value }}</span>
      </div>
    </div>

    <!-- Data flow timeline -->
    <h3
      class="text-lg font-bold mb-6"
      :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
    >Request Flow</h3>
    <div class="relative pl-8 mb-4">
      <div
        class="absolute left-3 top-0 bottom-0 w-px"
        :class="theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-300'"
      />
      <div
        v-for="item in timeline"
        :key="item.step"
        class="relative mb-6 last:mb-0"
      >
        <div
          class="absolute -left-5 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          :class="theme === 'dark'
            ? 'bg-primary/20 text-primary border border-primary/30'
            : 'bg-primary/10 text-primary-dark border border-primary/20'"
        >{{ item.step }}</div>
        <h4
          class="font-bold text-sm mb-1"
          :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
        >{{ item.title }}</h4>
        <p
          class="text-sm"
          :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
        >{{ item.detail }}</p>
      </div>
    </div>
  </div>
</template>
