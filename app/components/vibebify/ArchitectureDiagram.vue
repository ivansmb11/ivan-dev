<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { X, MoveHorizontal } from 'lucide-vue-next'
import SectionChip from '@/components/ui/SectionChip.vue'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'
import { reveal } from '@/motion'
import reactLogo from '@/assets/logos/react.svg'
import supabaseLogo from '@/assets/logos/supabase.svg'
import postgresLogo from '@/assets/logos/postgres.svg'
import nextLogo from '@/assets/logos/next.svg'
import spotifyLogo from '@/assets/logos/spotify.svg'
import musicbrainzLogo from '@/assets/logos/musicbrainz.svg'

defineProps({
  headingId: { type: String, default: 'vb-arch' },
})

const { t, tm } = useI18n()
const activeNode = ref(null)

const nodes = {
  browser: {
    title: 'Browser (React 19)',
    description: 'Single-page client component. app/page.tsx renders LandingPage or Dashboard based on auth state. All tab navigation is client-side.',
  },
  supabase_auth: {
    title: 'Supabase Auth',
    description: 'Spotify OAuth provider. Handles login, session tokens, and provider_token storage. Middleware refreshes sessions on every request.',
  },
  db_direct: {
    title: 'lib/db.ts (Service Layer)',
    description: '18 direct Supabase operations: posts, likes, comments, follows, profiles, duels. No API middleman. The browser Supabase client calls PostgreSQL directly with RLS enforcing permissions.',
  },
  postgres: {
    title: 'PostgreSQL + RLS',
    description: 'Supabase-managed PostgreSQL. Row Level Security on every table: profiles are publicly readable, posts/likes/comments require auth, duels are status-gated. All authorization happens at the database level.',
  },
  db_functions: {
    title: 'DB Functions (plpgsql)',
    description: 'Server-side functions for atomic operations. accept_duel() uses row locking to prevent race conditions. Triggers auto-update streak counts, like counts, and comment counts.',
  },
  api_routes: {
    title: 'Next.js API Routes',
    description: 'Only 3 routes remain, all requiring server-side secrets: /api/spotify/recently-played, /api/spotify/top, and /api/search/music. Auto token refresh on Spotify 401s.',
  },
  spotify: {
    title: 'Spotify Web API',
    description: 'Fetches recently played tracks, top artists, and top tracks across 3 time ranges. OAuth tokens stored in Supabase user metadata, refreshed automatically on expiry.',
  },
  musicbrainz: {
    title: 'MusicBrainz API',
    description: 'Fallback song search when a track is not in Spotify recents. Searches recordings by title/artist. Proxied through an API route to protect credentials.',
  },
  zod: {
    title: 'Zod v4 Validation',
    description: 'All user inputs validated before reaching the database. Schemas for creating posts (500 char limit), comments (300 char), duels, and profile updates.',
  },
  vercel: {
    title: 'Vercel',
    description: 'Hosting and deployment. Next.js 16 with Turbopack for fast dev builds. API routes run as serverless functions with access to environment secrets.',
  },
}

const nodeKeys = Object.keys(nodes)
const activeIndex = computed(() => nodeKeys.indexOf(activeNode.value) + 1)
const pad = (n) => String(n).padStart(2, '0')

const info = ref(null)

// Below lg the info panel sits under the diagram, so a tap would otherwise change nothing visible.
async function revealInfo() {
  if (!activeNode.value || window.matchMedia('(min-width: 1024px)').matches) return
  await nextTick()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  info.value?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' })
}

function toggle(key) {
  activeNode.value = activeNode.value === key ? null : key
  revealInfo()
}

function isActive(key) {
  return activeNode.value === key
}

const diagram = ref(null)

// The close button unmounts on click; hand focus back to the node it described.
async function closeInfo() {
  const key = activeNode.value
  activeNode.value = null
  await nextTick()
  diagram.value?.querySelector(`[data-node="${key}"]`)?.focus()
}

function onEscape(e) {
  if (e.key !== 'Escape' || !activeNode.value) return
  e.preventDefault()
  closeInfo()
}

// SVG groups act as buttons, so they need keyboard activation as well as clicks.
function nodeAttrs(key) {
  return {
    role: 'button',
    tabindex: 0,
    'data-node': key,
    'aria-pressed': isActive(key) ? 'true' : 'false',
    'aria-label': nodes[key].title,
    onClick: () => toggle(key),
    onKeydown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggle(key)
      }
    },
  }
}

const box = (key) => (isActive(key) ? 'fill-ink stroke-accent' : 'fill-card stroke-line group-hover:stroke-graphite')
const label = (key) => (isActive(key) ? 'fill-paper' : 'fill-ink')
const sub = (key) => (isActive(key) ? 'fill-paper/65' : 'fill-graphite')

// vue-i18n reads "|" as a plural separator and would drop the second half of this line.
const footnote = computed(() => {
  const raw = tm('vibebify.archFootnote')
  return typeof raw === 'string' ? raw : t('vibebify.archFootnote')
})

const legend = [
  { key: 'archLegendDirect', swatch: 'border-t-2 border-accent' },
  { key: 'archLegendServer', swatch: 'border-t-2 border-ink' },
  { key: 'archLegendInternal', swatch: 'border-t-2 border-dashed border-graphite' },
]

const corners = ['top-0 left-0', 'top-0 left-full', 'top-full left-0', 'top-full left-full']

// Below lg the diagram keeps a readable min width and may scroll sideways. Show a hint only then,
// and start centred on the User -> Browser spine so both cut edges read as "there is more".
const scroller = ref(null)
const scrollable = ref(false)
let observer

onMounted(() => {
  const el = scroller.value
  if (!el || typeof ResizeObserver === 'undefined') return
  observer = new ResizeObserver(() => {
    const was = scrollable.value
    scrollable.value = el.scrollWidth > el.clientWidth + 1
    if (scrollable.value && !was) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
  })
  observer.observe(el)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div>
    <div v-motion="reveal()" class="grid gap-5 lg:grid-cols-12 lg:gap-10">
      <div class="lg:col-span-3 lg:pt-3">
        <SectionChip>{{ t('vibebify.archLabel') }}</SectionChip>
      </div>
      <h2
        :id="headingId"
        class="font-display text-display-lg uppercase [overflow-wrap:anywhere] max-sm:text-[length:min(2.5rem,9.6vw)] lg:col-span-9"
      >{{ t('vibebify.archTitle') }}</h2>
    </div>

    <figure class="mt-10 md:mt-16" @keydown="onEscape">
      <p
        v-if="scrollable"
        aria-hidden="true"
        class="mb-3 flex items-center justify-end gap-1.5 text-xs text-graphite"
      >
        <MoveHorizontal :size="14" aria-hidden="true" />{{ t('hero.scroll') }}
      </p>
      <div class="grid gap-3 lg:grid-cols-12">
        <div class="relative min-w-0 border border-line bg-mist-soft lg:col-span-8">
          <svg
            v-for="corner in corners"
            :key="corner"
            viewBox="0 0 12 12"
            aria-hidden="true"
            class="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 text-muted"
            :class="corner"
          ><path d="M6 0v12M0 6h12" stroke="currentColor" stroke-width="1" /></svg>

          <div ref="scroller" class="overflow-x-auto p-4 sm:p-6 md:p-8">
            <svg
              ref="diagram"
              viewBox="40 0 720 460"
              class="block h-auto w-full min-w-[37.5rem] lg:min-w-0"
              role="group"
              :aria-label="t('vibebify.archTitle')"
            >
              <defs>
                <marker id="vb-arrow" viewBox="0 0 10 7" refX="10" refY="3.5"
                  markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                  <polygon points="0 0, 10 3.5, 0 7" class="fill-accent" />
                </marker>
                <marker id="vb-arrow-ink" viewBox="0 0 10 7" refX="10" refY="3.5"
                  markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                  <polygon points="0 0, 10 3.5, 0 7" class="fill-ink" />
                </marker>
                <marker id="vb-arrow-dim" viewBox="0 0 10 7" refX="10" refY="3.5"
                  markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                  <polygon points="0 0, 10 3.5, 0 7" class="fill-graphite" />
                </marker>
              </defs>

              <text x="400" y="22" text-anchor="middle" font-size="12" font-weight="600" class="fill-ink font-sans">User</text>
              <line x1="400" y1="30" x2="400" y2="52" stroke-width="1.5" class="stroke-accent" marker-end="url(#vb-arrow)" />

              <g v-bind="nodeAttrs('browser')" class="node group cursor-pointer">
                <rect x="280" y="55" width="240" height="42" rx="4" stroke-width="1.5" class="transition-colors" :class="box('browser')" />
                <image :href="reactLogo" x="296" y="65" width="22" height="22" />
                <text x="326" y="73" font-size="12" font-weight="600" class="font-sans" :class="label('browser')">Browser (React)</text>
                <text x="326" y="87" font-size="9" class="font-mono" :class="sub('browser')">Dashboard + Tab Navigation</text>
              </g>

              <line x1="340" y1="97" x2="220" y2="140" stroke-width="1.5" class="stroke-accent" marker-end="url(#vb-arrow)" />
              <text x="286" y="113" text-anchor="end" font-size="9" class="fill-ink font-mono">direct calls</text>

              <line x1="460" y1="97" x2="580" y2="140" stroke-width="1.5" class="stroke-ink" marker-end="url(#vb-arrow-ink)" />
              <text x="518" y="113" font-size="9" class="fill-ink font-mono">server secrets</text>

              <line x1="400" y1="97" x2="400" y2="140" stroke-width="1" stroke-dasharray="4 3" class="stroke-graphite" marker-end="url(#vb-arrow-dim)" />
              <text x="408" y="124" font-size="9" class="fill-graphite font-mono">auth</text>

              <g v-bind="nodeAttrs('db_direct')" class="node group cursor-pointer">
                <rect x="100" y="143" width="200" height="42" rx="4" stroke-width="1.5" class="transition-colors" :class="box('db_direct')" />
                <text x="200" y="161" text-anchor="middle" font-size="12" font-weight="600" class="font-sans" :class="label('db_direct')">lib/db.ts</text>
                <text x="200" y="175" text-anchor="middle" font-size="9" class="font-mono" :class="sub('db_direct')">18 operations</text>
              </g>

              <g v-bind="nodeAttrs('supabase_auth')" class="node group cursor-pointer">
                <rect x="330" y="143" width="140" height="42" rx="4" stroke-width="1.5" class="transition-colors" :class="box('supabase_auth')" />
                <image :href="supabaseLogo" x="364" y="150" width="15" height="15" />
                <text x="385" y="162" font-size="11" font-weight="600" class="font-sans" :class="label('supabase_auth')">Auth</text>
                <text x="400" y="176" text-anchor="middle" font-size="9" class="font-mono" :class="sub('supabase_auth')">Spotify OAuth</text>
              </g>

              <g v-bind="nodeAttrs('api_routes')" class="node group cursor-pointer">
                <rect x="500" y="143" width="200" height="42" rx="4" stroke-width="1.5" class="transition-colors" :class="box('api_routes')" />
                <image :href="nextLogo" x="552" y="150" width="15" height="15" :class="isActive('api_routes') ? 'invert dark:invert-0' : 'dark:invert'" />
                <text x="573" y="162" font-size="11" font-weight="600" class="font-sans" :class="label('api_routes')">API Routes</text>
                <text x="600" y="176" text-anchor="middle" font-size="9" class="font-mono" :class="sub('api_routes')">only 3 routes</text>
              </g>

              <g v-bind="nodeAttrs('zod')" class="node group cursor-pointer">
                <rect x="100" y="200" width="200" height="28" rx="3" stroke-width="1" class="transition-colors"
                  :class="isActive('zod') ? 'fill-ink stroke-accent' : 'fill-paper stroke-line group-hover:stroke-graphite'" />
                <text x="200" y="218" text-anchor="middle" font-size="9.5" font-weight="500" class="font-mono"
                  :class="isActive('zod') ? 'fill-paper' : 'fill-graphite'">Zod v4 validation</text>
              </g>
              <line x1="200" y1="185" x2="200" y2="200" stroke-width="1" class="stroke-graphite" marker-end="url(#vb-arrow-dim)" />

              <rect x="60" y="250" width="380" height="200" rx="6" stroke-width="1.5" stroke-dasharray="8 4"
                class="animate-dash fill-paper stroke-muted" />
              <image :href="supabaseLogo" x="78" y="262" width="16" height="16" />
              <text x="100" y="275" font-size="12" font-weight="700" class="fill-ink font-sans">Supabase</text>

              <line x1="200" y1="228" x2="200" y2="250" stroke-width="1.5" class="stroke-accent" marker-end="url(#vb-arrow)" />

              <g v-bind="nodeAttrs('postgres')" class="node group cursor-pointer">
                <rect x="90" y="295" width="200" height="55" rx="4" stroke-width="1.5" class="transition-colors" :class="box('postgres')" />
                <image :href="postgresLogo" x="104" y="305" width="20" height="20" />
                <text x="132" y="318" font-size="12" font-weight="600" class="font-sans" :class="label('postgres')">PostgreSQL</text>
                <text x="132" y="331" font-size="8.5" class="font-mono" :class="sub('postgres')">profiles, posts, likes</text>
                <text x="132" y="343" font-size="8.5" class="font-mono" :class="sub('postgres')">comments, follows, duels</text>
              </g>

              <rect x="246" y="289" width="38" height="16" rx="2" stroke-width="1" class="fill-accent-deep stroke-accent-deep" />
              <text x="265" y="300.5" text-anchor="middle" font-size="8" font-weight="700" class="fill-white font-mono">RLS</text>

              <g v-bind="nodeAttrs('db_functions')" class="node group cursor-pointer">
                <rect x="90" y="370" width="200" height="55" rx="4" stroke-width="1.5" class="transition-colors" :class="box('db_functions')" />
                <text x="104" y="397" font-size="13" font-weight="700" class="fill-accent font-mono">f()</text>
                <text x="143" y="393" font-size="11" font-weight="600" class="font-sans" :class="label('db_functions')">DB Functions</text>
                <text x="143" y="406" font-size="8.5" class="font-mono" :class="sub('db_functions')">accept_duel, streaks</text>
                <text x="143" y="417" font-size="8.5" class="font-mono" :class="sub('db_functions')">upsert_song, upsert_artist</text>
              </g>

              <line x1="190" y1="350" x2="190" y2="370" stroke-width="1" class="stroke-graphite" marker-end="url(#vb-arrow-dim)" />

              <rect x="305" y="380" width="120" height="40" rx="3" stroke-width="1" class="fill-card stroke-line" />
              <text x="365" y="397" text-anchor="middle" font-size="9" font-weight="500" class="fill-ink font-mono">7 triggers</text>
              <text x="365" y="410" text-anchor="middle" font-size="8" class="fill-graphite font-mono">streaks, counts, signup</text>
              <line x1="290" y1="400" x2="305" y2="400" stroke-width="1" stroke-dasharray="3 2" class="stroke-graphite" />

              <line x1="600" y1="185" x2="600" y2="250" stroke-width="1.5" class="stroke-ink" marker-end="url(#vb-arrow-ink)" />

              <rect x="470" y="250" width="270" height="120" rx="6" stroke-width="1.5" stroke-dasharray="8 4"
                class="animate-dash fill-paper stroke-muted" />
              <text x="490" y="271" font-size="10" font-weight="500" class="fill-graphite font-mono">External APIs</text>

              <g v-bind="nodeAttrs('spotify')" class="node group cursor-pointer">
                <rect x="490" y="280" width="230" height="36" rx="4" stroke-width="1.5" class="transition-colors" :class="box('spotify')" />
                <image :href="spotifyLogo" x="502" y="289" width="18" height="18" />
                <text x="528" y="296" font-size="11" font-weight="600" class="font-sans" :class="label('spotify')">Spotify Web API</text>
                <text x="528" y="309" font-size="8.5" class="font-mono" :class="sub('spotify')">top tracks, artists, recents</text>
              </g>

              <g v-bind="nodeAttrs('musicbrainz')" class="node group cursor-pointer">
                <rect x="490" y="324" width="230" height="36" rx="4" stroke-width="1.5" class="transition-colors" :class="box('musicbrainz')" />
                <image :href="musicbrainzLogo" x="502" y="333" width="18" height="18" />
                <text x="528" y="340" font-size="11" font-weight="600" class="font-sans" :class="label('musicbrainz')">MusicBrainz API</text>
                <text x="528" y="353" font-size="8.5" class="font-mono" :class="sub('musicbrainz')">song search fallback</text>
              </g>

              <g v-bind="nodeAttrs('vercel')" class="node group cursor-pointer">
                <rect x="470" y="395" width="270" height="35" rx="4" stroke-width="1.5" class="transition-colors" :class="box('vercel')" />
                <polygon points="494,420 504,403 514,420" :class="label('vercel')" />
                <text x="524" y="417" font-size="11" font-weight="600" class="font-sans" :class="label('vercel')">Vercel</text>
                <text x="578" y="417" font-size="9" class="font-mono" :class="sub('vercel')">Next.js 16 + Turbopack</text>
              </g>
            </svg>
          </div>
        </div>

        <aside
          ref="info"
          class="flex min-h-56 scroll-mb-16 flex-col bg-onyx p-6 text-white md:p-8 lg:col-span-4 dark:border dark:border-line"
          aria-live="polite"
        >
          <template v-if="activeNode">
            <div class="flex items-start justify-between gap-4">
              <p class="pt-1 text-xs font-medium tabular-nums text-white/60">{{ pad(activeIndex) }} / {{ pad(nodeKeys.length) }}</p>
              <button
                type="button"
                class="-mt-2.5 -mr-2.5 grid size-11 shrink-0 cursor-pointer place-items-center text-white/70 transition-colors hover:text-white active:translate-y-px"
                @click="closeInfo"
              >
                <X :size="18" aria-hidden="true" />
                <span class="sr-only">{{ t('nav.close') }}</span>
              </button>
            </div>
            <h3 class="mt-auto pt-10 text-2xl leading-tight font-bold tracking-[-0.02em] md:text-[1.75rem]">{{ nodes[activeNode].title }}</h3>
            <p class="mt-3 text-[15px] leading-relaxed text-white/75">{{ nodes[activeNode].description }}</p>
          </template>
          <template v-else>
            <AsteriskMark class="size-7 text-accent" :weight="1.8" />
            <p class="mt-auto pt-10 text-lg leading-snug font-medium text-white/85 md:text-xl">{{ t('vibebify.archSubtitle') }}</p>
          </template>
        </aside>
      </div>

      <figcaption class="mt-4 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between xl:gap-10">
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="item in legend"
            :key="item.key"
            class="inline-flex items-center gap-2 rounded-[3px] bg-mist px-2.5 py-1.5 text-xs font-medium text-ink"
          >
            <span aria-hidden="true" class="w-5 shrink-0" :class="item.swatch" />
            {{ t(`vibebify.${item.key}`) }}
          </li>
        </ul>
        <p class="max-w-[36rem] text-[13px] leading-snug text-graphite xl:pt-1.5 xl:text-right">{{ footnote }}</p>
      </figcaption>
    </figure>
  </div>
</template>

<style scoped>
.animate-dash {
  animation: dash-spin 20s linear infinite;
}

@keyframes dash-spin {
  to {
    stroke-dashoffset: -240;
  }
}

/* Chrome paints its UA ring on mouse-focused SVG groups; keyboard focus keeps the global outline. */
.node:focus:not(:focus-visible) {
  outline: none;
}

.node:focus-visible > rect:first-child {
  stroke: var(--color-accent);
  stroke-width: 2.5px;
}
</style>
