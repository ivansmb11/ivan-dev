<script setup>
import { ref } from 'vue'
import { useTheme } from '@/stores/useThemeStore'

const { theme } = useTheme()
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
</script>

<template>
  <div>
    <h2
      class="text-2xl font-display font-bold mb-2"
      :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
    >Architecture</h2>
    <p
      class="mb-6"
      :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
    >Click any component to learn more. All traffic stays on Google's private backbone.</p>

    <!-- Info panel -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="activeNode"
        class="rounded-lg p-4 mb-6 border"
        :class="theme === 'dark'
          ? 'bg-primary/5 border-primary/20'
          : 'bg-primary/5 border-primary/20'"
      >
        <h4 class="font-bold text-sm text-primary mb-1">{{ nodes[activeNode]?.title }}</h4>
        <p
          class="text-sm"
          :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
        >{{ nodes[activeNode]?.description }}</p>
      </div>
    </transition>

    <!-- SVG Diagram -->
    <div
      class="rounded-xl border overflow-hidden p-4 sm:p-8"
      :class="theme === 'dark'
        ? 'bg-surface-light/20 border-zinc-800'
        : 'bg-white border-zinc-200 shadow-sm'"
    >
      <svg
        viewBox="0 0 800 520"
        class="w-full h-auto"
        :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 7" refX="10" refY="3.5"
            markerWidth="8" markerHeight="6" orient="auto-start-reverse">
            <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
          </marker>
          <marker id="arrow-dim" viewBox="0 0 10 7" refX="10" refY="3.5"
            markerWidth="8" markerHeight="6" orient="auto-start-reverse">
            <polygon points="0 0, 10 3.5, 0 7" :fill="theme === 'dark' ? '#3f3f46' : '#a1a1aa'" />
          </marker>
        </defs>

        <!-- Internet / User -->
        <text x="400" y="25" text-anchor="middle" font-size="12" font-family="Inter" font-weight="600"
          :fill="theme === 'dark' ? '#fafafa' : '#18181b'">User / Internet</text>

        <!-- Arrow down to IAP -->
        <line x1="400" y1="32" x2="400" y2="52" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow)" />

        <!-- IAP Box -->
        <g @click="activeNode = activeNode === 'iap' ? null : 'iap'" class="cursor-pointer">
          <rect x="320" y="55" width="160" height="36" rx="6"
            :fill="activeNode === 'iap' ? (theme === 'dark' ? '#064e3b' : '#d1fae5') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="activeNode === 'iap' ? '#10b981' : (theme === 'dark' ? '#3f3f46' : '#d4d4d8')" stroke-width="1.5" />
          <text x="400" y="77" text-anchor="middle" font-size="11" font-family="Inter" font-weight="600"
            :fill="activeNode === 'iap' ? '#10b981' : (theme === 'dark' ? '#fafafa' : '#18181b')">IAP</text>
        </g>

        <!-- Arrow IAP to Hub VPC -->
        <line x1="400" y1="91" x2="400" y2="115" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow)" />

        <!-- Hub VPC container -->
        <g @click="activeNode = activeNode === 'vpc_hub' ? null : 'vpc_hub'" class="cursor-pointer">
          <rect x="100" y="118" width="600" height="160" rx="10"
            :fill="theme === 'dark' ? '#18181b' : '#fafafa'"
            :stroke="activeNode === 'vpc_hub' ? '#10b981' : (theme === 'dark' ? '#3f3f46' : '#d4d4d8')" stroke-width="1.5" stroke-dasharray="6 3" />
          <text x="120" y="138" font-size="10" font-family="JetBrains Mono" font-weight="500"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">vpc-hub 10.0.0.0/24</text>
        </g>

        <!-- Cloud Run -->
        <g @click="activeNode = activeNode === 'cloudrun' ? null : 'cloudrun'" class="cursor-pointer">
          <rect x="310" y="148" width="180" height="44" rx="6"
            :fill="activeNode === 'cloudrun' ? (theme === 'dark' ? '#064e3b' : '#d1fae5') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="activeNode === 'cloudrun' ? '#10b981' : (theme === 'dark' ? '#52525b' : '#d4d4d8')" stroke-width="1.5" />
          <text x="400" y="165" text-anchor="middle" font-size="10" font-family="Inter" font-weight="600"
            :fill="activeNode === 'cloudrun' ? '#10b981' : (theme === 'dark' ? '#fafafa' : '#18181b')">Cloud Run Agent</text>
          <text x="400" y="180" text-anchor="middle" font-size="9" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">Gemini 2.5 Flash + LangChain</text>
        </g>

        <!-- PSC HR -->
        <g @click="activeNode = activeNode === 'psc_hr' ? null : 'psc_hr'" class="cursor-pointer">
          <rect x="140" y="218" width="140" height="40" rx="6"
            :fill="activeNode === 'psc_hr' ? (theme === 'dark' ? '#064e3b' : '#d1fae5') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="activeNode === 'psc_hr' ? '#10b981' : (theme === 'dark' ? '#52525b' : '#d4d4d8')" stroke-width="1.5" />
          <text x="210" y="234" text-anchor="middle" font-size="10" font-family="Inter" font-weight="500"
            :fill="activeNode === 'psc_hr' ? '#10b981' : (theme === 'dark' ? '#fafafa' : '#18181b')">PSC Endpoint</text>
          <text x="210" y="248" text-anchor="middle" font-size="9" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">10.0.0.50</text>
        </g>

        <!-- PSC FIN -->
        <g @click="activeNode = activeNode === 'psc_fin' ? null : 'psc_fin'" class="cursor-pointer">
          <rect x="520" y="218" width="140" height="40" rx="6"
            :fill="activeNode === 'psc_fin' ? (theme === 'dark' ? '#064e3b' : '#d1fae5') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="activeNode === 'psc_fin' ? '#10b981' : (theme === 'dark' ? '#52525b' : '#d4d4d8')" stroke-width="1.5" />
          <text x="590" y="234" text-anchor="middle" font-size="10" font-family="Inter" font-weight="500"
            :fill="activeNode === 'psc_fin' ? '#10b981' : (theme === 'dark' ? '#fafafa' : '#18181b')">PSC Endpoint</text>
          <text x="590" y="248" text-anchor="middle" font-size="9" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">10.0.0.51</text>
        </g>

        <!-- NCC Hub -->
        <g @click="activeNode = activeNode === 'ncc' ? null : 'ncc'" class="cursor-pointer">
          <rect x="340" y="218" width="120" height="40" rx="6"
            :fill="activeNode === 'ncc' ? (theme === 'dark' ? '#064e3b' : '#d1fae5') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="activeNode === 'ncc' ? '#10b981' : (theme === 'dark' ? '#52525b' : '#d4d4d8')" stroke-width="1.5" />
          <text x="400" y="234" text-anchor="middle" font-size="10" font-family="Inter" font-weight="600"
            :fill="activeNode === 'ncc' ? '#10b981' : (theme === 'dark' ? '#fafafa' : '#18181b')">NCC Hub</text>
          <text x="400" y="248" text-anchor="middle" font-size="9" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">Route Exchange</text>
        </g>

        <!-- Lines from Cloud Run to PSC/NCC -->
        <line x1="360" y1="192" x2="210" y2="218" :stroke="theme === 'dark' ? '#3f3f46' : '#a1a1aa'" stroke-width="1" marker-end="url(#arrow-dim)" />
        <line x1="400" y1="192" x2="400" y2="218" :stroke="theme === 'dark' ? '#3f3f46' : '#a1a1aa'" stroke-width="1" marker-end="url(#arrow-dim)" />
        <line x1="440" y1="192" x2="590" y2="218" :stroke="theme === 'dark' ? '#3f3f46' : '#a1a1aa'" stroke-width="1" marker-end="url(#arrow-dim)" />

        <!-- Lines from Hub down to Spokes -->
        <line x1="210" y1="278" x2="210" y2="320" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arrow)" />
        <line x1="590" y1="278" x2="590" y2="320" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arrow)" />

        <!-- Labels on lines -->
        <text x="180" y="302" font-size="8" font-family="JetBrains Mono" fill="#10b981">PSC tunnel</text>
        <text x="558" y="302" font-size="8" font-family="JetBrains Mono" fill="#10b981">PSC tunnel</text>

        <!-- HR Spoke VPC -->
        <g @click="activeNode = activeNode === 'vpc_hr' ? null : 'vpc_hr'" class="cursor-pointer">
          <rect x="100" y="323" width="260" height="110" rx="10"
            :fill="theme === 'dark' ? '#18181b' : '#fafafa'"
            :stroke="activeNode === 'vpc_hr' ? '#10b981' : (theme === 'dark' ? '#3f3f46' : '#d4d4d8')" stroke-width="1.5" stroke-dasharray="6 3" />
          <text x="120" y="343" font-size="10" font-family="JetBrains Mono" font-weight="500"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">vpc-spoke-hr 10.1.0.0/24</text>
        </g>

        <!-- HR DB -->
        <g @click="activeNode = activeNode === 'db_hr' ? null : 'db_hr'" class="cursor-pointer">
          <rect x="145" y="358" width="170" height="55" rx="6"
            :fill="activeNode === 'db_hr' ? (theme === 'dark' ? '#064e3b' : '#d1fae5') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="activeNode === 'db_hr' ? '#10b981' : (theme === 'dark' ? '#52525b' : '#d4d4d8')" stroke-width="1.5" />
          <text x="230" y="376" text-anchor="middle" font-size="10" font-family="Inter" font-weight="600"
            :fill="activeNode === 'db_hr' ? '#10b981' : (theme === 'dark' ? '#fafafa' : '#18181b')">Cloud SQL (HR)</text>
          <text x="230" y="390" text-anchor="middle" font-size="9" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">PostgreSQL 15 | 10.1.1.3</text>
          <text x="230" y="404" text-anchor="middle" font-size="8" font-family="Inter"
            :fill="theme === 'dark' ? '#52525b' : '#a1a1aa'">employees, salaries, reviews</text>
        </g>

        <!-- Fin Spoke VPC -->
        <g @click="activeNode = activeNode === 'vpc_fin' ? null : 'vpc_fin'" class="cursor-pointer">
          <rect x="440" y="323" width="260" height="110" rx="10"
            :fill="theme === 'dark' ? '#18181b' : '#fafafa'"
            :stroke="activeNode === 'vpc_fin' ? '#10b981' : (theme === 'dark' ? '#3f3f46' : '#d4d4d8')" stroke-width="1.5" stroke-dasharray="6 3" />
          <text x="460" y="343" font-size="10" font-family="JetBrains Mono" font-weight="500"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">vpc-spoke-fin 10.2.0.0/24</text>
        </g>

        <!-- Fin DB -->
        <g @click="activeNode = activeNode === 'db_fin' ? null : 'db_fin'" class="cursor-pointer">
          <rect x="485" y="358" width="170" height="55" rx="6"
            :fill="activeNode === 'db_fin' ? (theme === 'dark' ? '#064e3b' : '#d1fae5') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="activeNode === 'db_fin' ? '#10b981' : (theme === 'dark' ? '#52525b' : '#d4d4d8')" stroke-width="1.5" />
          <text x="570" y="376" text-anchor="middle" font-size="10" font-family="Inter" font-weight="600"
            :fill="activeNode === 'db_fin' ? '#10b981' : (theme === 'dark' ? '#fafafa' : '#18181b')">Cloud SQL (Finance)</text>
          <text x="570" y="390" text-anchor="middle" font-size="9" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">PostgreSQL 15 | 10.2.1.3</text>
          <text x="570" y="404" text-anchor="middle" font-size="8" font-family="Inter"
            :fill="theme === 'dark' ? '#52525b' : '#a1a1aa'">invoices, budgets, transactions</text>
        </g>

        <!-- Firewall labels -->
        <text x="400" y="468" text-anchor="middle" font-size="9" font-family="JetBrains Mono"
          :fill="theme === 'dark' ? '#52525b' : '#a1a1aa'">
          Firewall: Spokes accept only Hub (10.0.0.0/24) | 0.0.0.0/0 blocked everywhere
        </text>

        <!-- X between spokes (no direct communication) -->
        <line x1="360" y1="385" x2="440" y2="385" :stroke="theme === 'dark' ? '#3f3f46' : '#d4d4d8'" stroke-width="1" stroke-dasharray="3 3" />
        <text x="400" y="382" text-anchor="middle" font-size="14" font-weight="bold" fill="#ef4444">X</text>
        <text x="400" y="398" text-anchor="middle" font-size="7" font-family="Inter" fill="#ef4444">No direct path</text>

        <!-- VPC-SC perimeter -->
        <rect x="60" y="490" width="680" height="24" rx="4"
          :fill="theme === 'dark' ? '#27272a' : '#f4f4f5'"
          :stroke="theme === 'dark' ? '#3f3f46' : '#d4d4d8'" stroke-width="1" />
        <text x="400" y="506" text-anchor="middle" font-size="9" font-family="Inter" font-weight="500"
          :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">VPC Service Controls Perimeter | No data exfiltration</text>
      </svg>
    </div>
  </div>
</template>
