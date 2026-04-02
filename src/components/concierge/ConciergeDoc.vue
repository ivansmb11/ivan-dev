<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/stores/useThemeStore'
import { Shield, Network, Brain, Lock, ChevronDown } from 'lucide-vue-next'

const { t } = useI18n()
const { theme } = useTheme()

const expandedCard = ref(null)

function toggleCard(id) {
  expandedCard.value = expandedCard.value === id ? null : id
}

const principles = [
  { id: 'zeroTrust', icon: Shield },
  { id: 'hubSpoke', icon: Network },
  { id: 'identityRouting', icon: Brain },
  { id: 'psc', icon: Lock },
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

const flowSteps = ['s1', 's2', 's3', 's4', 's5', 's6']
</script>

<template>
  <div>
    <h2
      class="text-2xl font-display font-bold mb-2"
      :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
    >{{ t('concierge.docsTitle') }}</h2>
    <p
      class="mb-10"
      :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
    >{{ t('concierge.docsSubtitle') }}</p>

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
      >{{ t('concierge.problemTitle') }}</h3>
      <p
        class="text-sm leading-relaxed"
        :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
      >{{ t('concierge.problemText') }}</p>
    </div>

    <!-- Design principles (expandable cards) -->
    <h3
      class="text-lg font-bold mb-6"
      :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
    >{{ t('concierge.principlesTitle') }}</h3>

    <div class="space-y-4 mb-12">
      <div
        v-for="p in principles"
        :key="p.id"
        class="rounded-xl border overflow-hidden transition-colors"
        :class="theme === 'dark'
          ? expandedCard === p.id
            ? 'bg-surface-light/50 border-primary/30'
            : 'bg-surface-light/30 border-zinc-800 hover:border-zinc-700'
          : expandedCard === p.id
            ? 'bg-white border-primary/30 shadow-md'
            : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'"
      >
        <!-- Card header (always visible) -->
        <button
          @click="toggleCard(p.id)"
          class="w-full flex items-center gap-4 p-5 cursor-pointer text-left"
        >
          <div
            class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            :class="expandedCard === p.id ? 'bg-primary/20' : 'bg-primary/10'"
          >
            <component
              :is="p.icon"
              :size="20"
              class="text-primary"
            />
          </div>
          <div class="flex-1 min-w-0">
            <h4
              class="font-bold text-sm"
              :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
            >{{ t(`concierge.${p.id}.title`) }}</h4>
          </div>
          <ChevronDown
            :size="18"
            class="shrink-0 transition-transform duration-300"
            :class="[
              expandedCard === p.id ? 'rotate-180' : '',
              theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
            ]"
          />
        </button>

        <!-- Expanded content -->
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-[600px] opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="max-h-[600px] opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div
            v-if="expandedCard === p.id"
            class="overflow-hidden"
          >
            <div class="px-5 pb-5 space-y-4">
              <!-- Divider -->
              <div
                class="border-t"
                :class="theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'"
              />

              <!-- Why -->
              <div>
                <span
                  class="text-xs font-mono uppercase tracking-widest mb-2 block"
                  :class="theme === 'dark' ? 'text-primary' : 'text-primary-dark'"
                >Why</span>
                <p
                  class="text-sm leading-relaxed"
                  :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
                >{{ t(`concierge.${p.id}.why`) }}</p>
              </div>

              <!-- How it works here -->
              <div>
                <span
                  class="text-xs font-mono uppercase tracking-widest mb-2 block"
                  :class="theme === 'dark' ? 'text-primary' : 'text-primary-dark'"
                >How it works in this project</span>
                <p
                  class="text-sm leading-relaxed"
                  :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
                >{{ t(`concierge.${p.id}.how`) }}</p>
              </div>

              <!-- Other use cases -->
              <div>
                <span
                  class="text-xs font-mono uppercase tracking-widest mb-2 block"
                  :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'"
                >Other use cases</span>
                <p
                  class="text-sm leading-relaxed italic"
                  :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
                >{{ t(`concierge.${p.id}.useCases`) }}</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Tech stack -->
    <h3
      class="text-lg font-bold mb-6"
      :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
    >{{ t('concierge.stackTitle') }}</h3>
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
    >{{ t('concierge.flowTitle') }}</h3>
    <div class="space-y-6 mb-4">
      <div
        v-for="(key, i) in flowSteps"
        :key="key"
        class="flex items-start gap-4"
      >
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
          :class="theme === 'dark'
            ? 'bg-primary/20 text-primary border border-primary/30'
            : 'bg-primary/10 text-primary-dark border border-primary/20'"
        >{{ i + 1 }}</div>
        <div>
          <h4
            class="font-bold text-sm mb-0.5"
            :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
          >{{ t(`concierge.flow.${key}.title`) }}</h4>
          <p
            class="text-sm"
            :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
          >{{ t(`concierge.flow.${key}.detail`) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
