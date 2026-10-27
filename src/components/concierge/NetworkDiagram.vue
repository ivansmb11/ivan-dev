<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Plus } from 'lucide-vue-next'

const { t } = useI18n()
const activeNode = ref(null)

const nodes = {
  iap: {
    title: 'Identity-Aware Proxy',
    description: 'Authenticates users via Google identity. Attaches email and department claims to every request. No VPN required.'
  },
  cloudrun: {
    title: 'Cloud Run (Agent)',
    description: 'Serverless container in vpc-hub running the Python Flask agent. Uses Vertex AI Gemini with Function Calling to route queries.'
  },
  ncc: {
    title: 'NCC Hub',
    description: 'Network Connectivity Center. Central router that exchanges routes between all spoke VPCs automatically via BGP.'
  },
  psc_hr: {
    title: 'PSC Endpoint (HR)',
    description: 'Private Service Connect endpoint at 10.0.0.50. Tunnels traffic from the Hub to the HR Cloud SQL instance without crossing VPC boundaries.'
  },
  psc_fin: {
    title: 'PSC Endpoint (Finance)',
    description: 'Private Service Connect endpoint at 10.0.0.51. Tunnels traffic from the Hub to the Finance Cloud SQL instance privately.'
  },
  db_hr: {
    title: 'Cloud SQL (HR)',
    description: 'PostgreSQL 15 in vpc-spoke-hr (10.1.0.0/24). Private IP only. Contains employee records, salaries, and reviews. No public IP exposure.'
  },
  db_fin: {
    title: 'Cloud SQL (Finance)',
    description: 'PostgreSQL 15 in vpc-spoke-fin (10.2.0.0/24). Private IP only. Contains invoices, budgets, and transactions. Fully isolated from HR.'
  },
  vpc_hub: {
    title: 'vpc-hub (10.0.0.0/24)',
    description: 'Central Hub VPC. Hosts the AI Agent, PSC endpoints, and NCC Hub. All spoke access flows through here.'
  },
  vpc_hr: {
    title: 'vpc-spoke-hr (10.1.0.0/24)',
    description: 'Isolated HR spoke. Only accepts inbound traffic from the Hub (10.0.0.0/24). Blocked from internet and other spokes.'
  },
  vpc_fin: {
    title: 'vpc-spoke-fin (10.2.0.0/24)',
    description: 'Isolated Finance spoke. Only accepts inbound traffic from the Hub (10.0.0.0/24). Cannot communicate with HR spoke directly.'
  },
}

// Index order follows a request from the edge down to the data.
const order = ['iap', 'vpc_hub', 'cloudrun', 'ncc', 'psc_hr', 'psc_fin', 'vpc_hr', 'db_hr', 'vpc_fin', 'db_fin']

const zones = [
  { id: 'vpc_hub', x: 100, y: 118, w: 600, h: 160, label: 'vpc-hub 10.0.0.0/24' },
  { id: 'vpc_hr', x: 100, y: 323, w: 260, h: 110, label: 'vpc-spoke-hr 10.1.0.0/24' },
  { id: 'vpc_fin', x: 440, y: 323, w: 260, h: 110, label: 'vpc-spoke-fin 10.2.0.0/24' },
]

const boxes = [
  { id: 'iap', x: 320, y: 55, w: 160, h: 36, lines: ['IAP'] },
  { id: 'cloudrun', x: 300, y: 146, w: 200, h: 46, lines: ['Cloud Run Agent', 'Gemini 2.5 Flash + LangChain'] },
  { id: 'psc_hr', x: 135, y: 216, w: 150, h: 44, lines: ['PSC Endpoint', '10.0.0.50'] },
  { id: 'ncc', x: 335, y: 216, w: 130, h: 44, lines: ['NCC Hub', 'Route Exchange'] },
  { id: 'psc_fin', x: 515, y: 216, w: 150, h: 44, lines: ['PSC Endpoint', '10.0.0.51'] },
  { id: 'db_hr', x: 140, y: 356, w: 180, h: 60, lines: ['Cloud SQL (HR)', 'PostgreSQL 15 | 10.1.1.3', 'employees, salaries, reviews'] },
  { id: 'db_fin', x: 480, y: 356, w: 180, h: 60, lines: ['Cloud SQL (Finance)', 'PostgreSQL 15 | 10.2.1.3', 'invoices, budgets, transactions'] },
]

const lineOffsets = { 1: [4], 2: [-3, 12], 3: [-9, 6, 20] }
const lineStyles = [
  { size: 12, weight: 600, mono: false },
  { size: 9.5, weight: 400, mono: true },
  { size: 9, weight: 400, mono: false },
]

function lineY(box, i) {
  return box.y + box.h / 2 + lineOffsets[box.lines.length][i]
}

function toggle(id) {
  activeNode.value = activeNode.value === id ? null : id
}

// On narrow screens the index sits below the diagram, so bring the opened entry into view.
// Scroll the whole row, not just its button, or the description opens below the fold.
async function selectFromDiagram(id) {
  toggle(id)
  if (!activeNode.value || window.matchMedia('(min-width: 1280px)').matches) return
  await nextTick()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(`node-${id}-toggle`)?.closest('li')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' })
}

// On narrow screens the canvas scrolls sideways; start centred on the request path.
const canvas = ref(null)
onMounted(() => {
  const el = canvas.value
  if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
})

const corners = [
  'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
  'top-0 right-0 translate-x-1/2 -translate-y-1/2',
  'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
  'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
]

const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
    <div class="relative min-w-0 xl:col-span-9">
      <svg
        v-for="corner in corners"
        :key="corner"
        viewBox="0 0 12 12"
        aria-hidden="true"
        class="pointer-events-none absolute z-10 size-3 text-graphite"
        :class="corner"
      ><path d="M6 0v12M0 6h12" stroke="currentColor" stroke-width="1" /></svg>

      <div ref="canvas" class="canvas-grid overflow-x-auto rounded-[3px] border border-line bg-card">
        <svg
          viewBox="50 0 700 522"
          role="img"
          aria-labelledby="concierge-diagram-title"
          class="block h-auto w-full min-w-[44rem] p-4 sm:p-6 md:min-w-0 lg:p-8"
        >
          <title id="concierge-diagram-title">{{ t('concierge.title') }} | {{ t('concierge.archTitle') }}</title>
          <defs>
            <marker id="cd-arrow" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" class="fill-ink" />
            </marker>
            <marker id="cd-arrow-dim" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" class="fill-muted" />
            </marker>
            <marker id="cd-arrow-accent" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" class="fill-accent" />
            </marker>
          </defs>

          <text x="400" y="24" text-anchor="middle" font-size="11" font-weight="600" letter-spacing="0.04em" class="fill-ink">USER / INTERNET</text>
          <line x1="400" y1="32" x2="400" y2="52" stroke-width="1.5" marker-end="url(#cd-arrow)" class="stroke-ink" />
          <line x1="400" y1="91" x2="400" y2="115" stroke-width="1.5" marker-end="url(#cd-arrow)" class="stroke-ink" />

          <g
            v-for="zone in zones"
            :key="zone.id"
            class="group cursor-pointer"
            @click="selectFromDiagram(zone.id)"
          >
            <rect
              :x="zone.x" :y="zone.y" :width="zone.w" :height="zone.h" rx="4"
              stroke-width="1.25" stroke-dasharray="6 4"
              class="transition-[fill,stroke] duration-300"
              :class="activeNode === zone.id ? 'fill-accent/[0.07] stroke-accent' : 'fill-paper stroke-muted group-hover:stroke-ink'"
            />
            <text
              :x="zone.x + 16" :y="zone.y + 21" font-size="10" font-weight="500"
              class="font-mono transition-[fill] duration-300"
              :class="activeNode === zone.id ? 'fill-ink' : 'fill-graphite'"
            >{{ zone.label }}</text>
          </g>

          <line x1="360" y1="192" x2="215" y2="216" stroke-width="1" marker-end="url(#cd-arrow-dim)" class="stroke-muted" />
          <line x1="400" y1="192" x2="400" y2="216" stroke-width="1" marker-end="url(#cd-arrow-dim)" class="stroke-muted" />
          <line x1="440" y1="192" x2="585" y2="216" stroke-width="1" marker-end="url(#cd-arrow-dim)" class="stroke-muted" />

          <line x1="210" y1="278" x2="210" y2="320" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cd-arrow-accent)" class="stroke-accent" />
          <line x1="590" y1="278" x2="590" y2="320" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cd-arrow-accent)" class="stroke-accent" />
          <text x="220" y="303" font-size="9" class="font-mono fill-graphite">PSC tunnel</text>
          <text x="600" y="303" font-size="9" class="font-mono fill-graphite">PSC tunnel</text>

          <line x1="360" y1="386" x2="440" y2="386" stroke-width="1" stroke-dasharray="3 3" class="stroke-muted" />
          <g aria-hidden="true">
            <rect x="389" y="375" width="22" height="22" rx="2" class="fill-accent" />
            <path d="M395 381l10 10M405 381l-10 10" stroke-width="1.75" stroke-linecap="round" class="stroke-white" />
          </g>
          <text x="400" y="412" text-anchor="middle" font-size="9" font-weight="500" class="fill-graphite">No direct path</text>

          <g
            v-for="box in boxes"
            :key="box.id"
            class="group cursor-pointer"
            @click="selectFromDiagram(box.id)"
          >
            <rect
              :x="box.x" :y="box.y" :width="box.w" :height="box.h" rx="3"
              stroke-width="1.25"
              class="transition-[fill,stroke] duration-300"
              :class="activeNode === box.id ? 'fill-accent-deep stroke-accent-deep' : 'fill-card stroke-line group-hover:stroke-accent'"
            />
            <text
              v-for="(text, i) in box.lines"
              :key="i"
              :x="box.x + box.w / 2"
              :y="lineY(box, i)"
              text-anchor="middle"
              :font-size="lineStyles[i].size"
              :font-weight="lineStyles[i].weight"
              class="transition-[fill] duration-300"
              :class="[
                lineStyles[i].mono ? 'font-mono' : '',
                activeNode === box.id ? (i === 0 ? 'fill-white' : 'fill-white/90') : (i === 0 ? 'fill-ink' : 'fill-graphite'),
              ]"
            >{{ text }}</text>
          </g>

          <text x="400" y="466" text-anchor="middle" font-size="9.5" class="font-mono fill-graphite">
            Firewall: Spokes accept only Hub (10.0.0.0/24) | 0.0.0.0/0 blocked everywhere
          </text>

          <rect x="60" y="486" width="680" height="28" rx="3" class="fill-ink" />
          <text x="400" y="504" text-anchor="middle" font-size="10" font-weight="600" letter-spacing="0.03em" class="fill-paper">VPC SERVICE CONTROLS PERIMETER | NO DATA EXFILTRATION</text>
        </svg>
      </div>
    </div>

    <ol class="grid grid-cols-1 self-start border-t border-line sm:grid-cols-2 sm:gap-x-8 xl:col-span-3 xl:grid-cols-1">
      <li v-for="(id, i) in order" :key="id" class="scroll-mb-16 border-b border-line">
        <button
          :id="`node-${id}-toggle`"
          type="button"
          class="group flex min-h-11 w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left text-sm font-medium transition-colors duration-300"
          :class="activeNode === id ? 'bg-ink text-paper' : 'hover:bg-mist'"
          :aria-expanded="activeNode === id"
          :aria-controls="`node-${id}-detail`"
          @click="toggle(id)"
        >
          <span class="w-5 shrink-0 text-xs tabular-nums" :class="activeNode === id ? 'text-paper/60' : 'text-graphite'">{{ pad(i + 1) }}</span>
          <span class="min-w-0 flex-1">{{ nodes[id].title }}</span>
          <Plus
            :size="16"
            aria-hidden="true"
            class="shrink-0 transition-transform duration-300"
            :class="activeNode === id ? 'rotate-45 text-accent' : 'text-graphite group-hover:text-ink'"
          />
        </button>
        <div
          v-if="activeNode === id"
          :id="`node-${id}-detail`"
          class="bg-ink px-3 pb-4 pl-11 text-sm leading-relaxed text-paper/75"
        >{{ nodes[id].description }}</div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.canvas-grid {
  background-image:
    linear-gradient(var(--color-mist-soft) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-mist-soft) 1px, transparent 1px);
  background-size: 24px 24px;
}
</style>
