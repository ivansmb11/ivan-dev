<script setup>
import { ref } from 'vue'
import { Shield, Network, Brain, Lock, Plus } from 'lucide-vue-next'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'
import AssetSlot from '@/components/ui/AssetSlot.vue'
import { reveal } from '@/motion'

const { t } = useI18n()

const expandedCard = ref(null)

function toggleCard(id) {
  expandedCard.value = expandedCard.value === id ? null : id
}

const principles = [
  { id: 'zeroTrust', icon: Shield },
  { id: 'hubSpoke', icon: Network, figure: 'concierge-principle-hub-spoke' },
  { id: 'identityRouting', icon: Brain },
  { id: 'psc', icon: Lock },
]

const details = [
  { key: 'why', labelKey: 'concierge.whyLabel', fallback: 'Why' },
  { key: 'how', labelKey: 'concierge.howLabel', fallback: 'How it works in this project' },
  { key: 'useCases', labelKey: 'concierge.useCasesLabel', fallback: 'Other use cases' },
]

const stack = [
  { key: 'orchestration', label: 'Orchestration', value: 'Google Cloud NCC' },
  { key: 'compute', label: 'Compute', value: 'Cloud Run (serverless)' },
  { key: 'database', label: 'Database', value: 'Cloud SQL PostgreSQL 15' },
  { key: 'aiModel', label: 'AI Model', value: 'Vertex AI Gemini 2.5 Flash' },
  { key: 'framework', label: 'Framework', value: 'LangChain + Function Calling' },
  { key: 'security', label: 'Security', value: 'IAP, VPC-SC, PSC, IAM' },
  { key: 'cicd', label: 'CI/CD', value: 'GitHub Actions + WIF' },
  { key: 'iac', label: 'IaC', value: 'gcloud CLI scripts' },
]

const flowSteps = ['s1', 's2', 's3', 's4', 's5', 's6']

const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <div class="flex flex-col gap-20 md:gap-28">
    <div
      v-motion="reveal()"
      class="grid grid-cols-1 gap-6 rounded-[3px] bg-mist p-6 sm:p-8 md:p-10 lg:grid-cols-12 lg:gap-6 lg:p-12"
    >
      <div class="flex flex-col justify-between gap-8 lg:col-span-3">
        <h3 class="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.02em] lg:items-start">
          <AsteriskMark class="size-3.5 shrink-0 text-accent lg:mt-0.5" />{{ t('concierge.problemTitle') }}
        </h3>
        <!-- Blending drops the image's own gray background into the card's, in both themes. -->
        <AssetSlot
          id="concierge-problem"
          class="hidden aspect-square w-full max-w-60 mix-blend-multiply lg:block dark:mix-blend-lighten"
          fit="contain"
        />
      </div>
      <p class="text-lg leading-[1.45] font-medium tracking-[-0.01em] text-ink md:text-2xl md:leading-[1.4] lg:col-span-9">
        {{ t('concierge.problemText') }}
      </p>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
      <h3 class="text-sm font-semibold uppercase tracking-[0.02em] lg:sticky lg:top-28 lg:col-span-3 lg:self-start">
        <span aria-hidden="true" class="mr-2 tabular-nums text-graphite">01</span>{{ t('concierge.principlesTitle') }}
      </h3>

      <ul class="flex flex-col gap-3 lg:col-span-9">
        <li
          v-for="(p, i) in principles"
          :key="p.id"
          class="rounded-[3px] border bg-card transition-[border-color,box-shadow] duration-300"
          :class="expandedCard === p.id
            ? 'border-ink shadow-[0_18px_40px_-28px_color-mix(in_oklch,var(--color-onyx)_35%,transparent)]'
            : 'border-line hover:border-graphite'"
        >
          <button
            :id="`principle-${p.id}-toggle`"
            type="button"
            class="group flex w-full cursor-pointer items-center gap-4 p-4 text-left sm:gap-5 sm:p-6"
            :aria-expanded="expandedCard === p.id"
            :aria-controls="`principle-${p.id}-panel`"
            @click="toggleCard(p.id)"
          >
            <span class="grid size-11 shrink-0 place-items-center rounded-[3px] bg-mist text-accent">
              <component :is="p.icon" :size="20" :stroke-width="1.75" aria-hidden="true" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block text-xs tabular-nums text-graphite">{{ pad(i + 1) }}</span>
              <span class="mt-0.5 block text-base font-bold uppercase leading-tight tracking-[-0.01em] sm:text-lg">
                {{ t(`concierge.${p.id}.title`) }}
              </span>
            </span>
            <span
              class="grid size-8 shrink-0 place-items-center rounded-[2px] transition-colors duration-300"
              :class="expandedCard === p.id ? 'bg-accent text-white' : 'bg-mist text-ink group-hover:bg-ink group-hover:text-paper'"
            >
              <Plus
                :size="16"
                :stroke-width="2"
                aria-hidden="true"
                class="transition-transform duration-300"
                :class="expandedCard === p.id ? 'rotate-45' : ''"
              />
            </span>
          </button>

          <transition
            enter-active-class="transition-all duration-300 ease-out overflow-hidden"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-[900px] opacity-100"
            leave-active-class="transition-all duration-200 ease-in overflow-hidden"
            leave-from-class="max-h-[900px] opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div
              v-if="expandedCard === p.id"
              :id="`principle-${p.id}-panel`"
              role="region"
              :aria-labelledby="`principle-${p.id}-toggle`"
            >
              <AssetSlot
                v-if="p.figure"
                :id="p.figure"
                :alt="t(`concierge.${p.id}.figureAlt`)"
                class="mx-4 mb-2 aspect-[8/3] border-t border-line pt-6 mix-blend-multiply sm:mx-6 dark:mix-blend-lighten"
                fit="contain"
              />
              <dl class="mx-4 grid grid-cols-1 gap-6 border-t border-line pt-6 pb-6 sm:mx-6 md:grid-cols-3 md:gap-8 md:pb-8">
                <div v-for="d in details" :key="d.key">
                  <dt class="text-xs font-semibold uppercase tracking-[0.02em] text-ink">{{ t(d.labelKey, d.fallback) }}</dt>
                  <dd class="mt-2.5 text-sm leading-relaxed text-graphite">{{ t(`concierge.${p.id}.${d.key}`) }}</dd>
                </div>
              </dl>
            </div>
          </transition>
        </li>
      </ul>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
      <h3 class="text-sm font-semibold uppercase tracking-[0.02em] lg:col-span-3">
        <span aria-hidden="true" class="mr-2 tabular-nums text-graphite">02</span>{{ t('concierge.stackTitle') }}
      </h3>

      <dl class="grid grid-cols-1 border-t border-line lg:col-span-9 xl:grid-cols-2 xl:gap-x-10">
        <div
          v-for="item in stack"
          :key="item.key"
          class="grid grid-cols-1 gap-1 border-b border-line py-4 min-[400px]:grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] min-[400px]:items-baseline min-[400px]:gap-4 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]"
        >
          <dt class="text-xs font-medium uppercase tracking-[0.02em] text-graphite">{{ t(`concierge.stackLabels.${item.key}`, item.label) }}</dt>
          <dd class="text-[15px] font-semibold tracking-[-0.01em] text-ink">{{ item.value }}</dd>
        </div>
      </dl>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
      <h3 class="text-sm font-semibold uppercase tracking-[0.02em] lg:col-span-3">
        <span aria-hidden="true" class="mr-2 tabular-nums text-graphite">03</span>{{ t('concierge.flowTitle') }}
      </h3>

      <ol class="border-t border-line lg:col-span-9">
        <li
          v-for="(key, i) in flowSteps"
          :key="key"
          class="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-1 border-b border-line py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] md:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1fr)] md:items-baseline md:gap-x-8"
        >
          <span class="row-span-2 font-display text-3xl leading-none font-bold tracking-[-0.04em] text-accent tabular-nums md:row-span-1 md:text-4xl">{{ pad(i + 1) }}</span>
          <span class="text-base font-bold uppercase leading-snug tracking-[-0.01em] md:text-lg">{{ t(`concierge.flow.${key}.title`) }}</span>
          <span class="text-sm leading-relaxed text-graphite md:text-[15px]">{{ t(`concierge.flow.${key}.detail`) }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>
