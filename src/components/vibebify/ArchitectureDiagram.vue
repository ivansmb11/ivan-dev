<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/stores/useThemeStore'
import reactLogo from '@/assets/logos/react.svg'
import supabaseLogo from '@/assets/logos/supabase.svg'
import postgresLogo from '@/assets/logos/postgres.svg'
import nextLogo from '@/assets/logos/next.svg'
import spotifyLogo from '@/assets/logos/spotify.svg'
import musicbrainzLogo from '@/assets/logos/musicbrainz.svg'

const { t } = useI18n()
const { theme } = useTheme()
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

function toggle(key) {
  activeNode.value = activeNode.value === key ? null : key
}

function isActive(key) {
  return activeNode.value === key
}
</script>

<template>
  <div>
    <p
      class="text-sm font-mono uppercase tracking-widest mb-3"
      :class="theme === 'dark' ? 'text-pink-400' : 'text-pink-600'"
    >{{ t('vibebify.archLabel') }}</p>
    <h2
      class="text-3xl font-bold mb-2"
      :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
    >{{ t('vibebify.archTitle') }}</h2>
    <div class="mt-4 h-1 w-16 bg-pink-500 rounded-full mb-4" />
    <p
      class="mb-6 text-sm"
      :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
    >{{ t('vibebify.archSubtitle') }}</p>

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
          ? 'bg-pink-500/5 border-pink-500/20'
          : 'bg-pink-50/50 border-pink-200'"
      >
        <h4 class="font-bold text-sm text-pink-500 mb-1">{{ nodes[activeNode]?.title }}</h4>
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
        viewBox="0 0 800 560"
        class="w-full h-auto"
      >
        <defs>
          <marker id="vb-arrow" viewBox="0 0 10 7" refX="10" refY="3.5"
            markerWidth="8" markerHeight="6" orient="auto-start-reverse">
            <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
          </marker>
          <marker id="vb-arrow-dim" viewBox="0 0 10 7" refX="10" refY="3.5"
            markerWidth="8" markerHeight="6" orient="auto-start-reverse">
            <polygon points="0 0, 10 3.5, 0 7" :fill="theme === 'dark' ? '#3f3f46' : '#a1a1aa'" />
          </marker>
          <marker id="vb-arrow-cyan" viewBox="0 0 10 7" refX="10" refY="3.5"
            markerWidth="8" markerHeight="6" orient="auto-start-reverse">
            <polygon points="0 0, 10 3.5, 0 7" fill="#00f0ff" />
          </marker>
        </defs>

        <!-- ==================== ROW 1: User ==================== -->
        <text x="400" y="25" text-anchor="middle" font-size="12" font-family="Inter" font-weight="600"
          :fill="theme === 'dark' ? '#fafafa' : '#18181b'">User</text>

        <!-- Arrow down to Browser -->
        <line x1="400" y1="32" x2="400" y2="52" stroke="#ec4899" stroke-width="1.5" marker-end="url(#vb-arrow)" />

        <!-- ==================== ROW 2: Browser (y=55 h=42 center=76) ==================== -->
        <g @click="toggle('browser')" class="cursor-pointer">
          <rect x="280" y="55" width="240" height="42" rx="8"
            :fill="isActive('browser') ? (theme === 'dark' ? '#500724' : '#fce7f3') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="isActive('browser') ? '#ec4899' : (theme === 'dark' ? '#3f3f46' : '#d4d4d8')" stroke-width="1.5" />
          <image :href="reactLogo" x="296" y="62" width="22" height="22" />
          <text x="324" y="72" font-size="11" font-family="Inter" font-weight="600"
            :fill="isActive('browser') ? '#ec4899' : (theme === 'dark' ? '#fafafa' : '#18181b')">Browser (React)</text>
          <text x="324" y="86" font-size="9" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">Dashboard + Tab Navigation</text>
        </g>

        <!-- ==================== Split arrows ==================== -->

        <!-- Left arrow: Browser to lib/db.ts -->
        <line x1="340" y1="97" x2="220" y2="140" stroke="#ec4899" stroke-width="1.5" marker-end="url(#vb-arrow)" />
        <text x="248" y="112" font-size="8" font-family="JetBrains Mono"
          :fill="theme === 'dark' ? '#fafafa' : '#18181b'">direct calls</text>

        <!-- Right arrow: Browser to API Routes -->
        <line x1="460" y1="97" x2="580" y2="140" stroke="#00f0ff" stroke-width="1.5" marker-end="url(#vb-arrow-cyan)" />
        <text x="498" y="112" font-size="8" font-family="JetBrains Mono"
          :fill="theme === 'dark' ? '#fafafa' : '#18181b'">server secrets</text>

        <!-- Auth arrow from Browser -->
        <line x1="400" y1="97" x2="400" y2="140" :stroke="theme === 'dark' ? '#52525b' : '#a1a1aa'" stroke-width="1" stroke-dasharray="4 3" marker-end="url(#vb-arrow-dim)" />
        <text x="410" y="123" font-size="8" font-family="JetBrains Mono"
          :fill="theme === 'dark' ? '#71717a' : '#71717a'">auth</text>

        <!-- ==================== ROW 3: Three columns ==================== -->

        <!-- LEFT: lib/db.ts -->
        <g @click="toggle('db_direct')" class="cursor-pointer">
          <rect x="100" y="143" width="200" height="42" rx="8"
            :fill="isActive('db_direct') ? (theme === 'dark' ? '#500724' : '#fce7f3') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="isActive('db_direct') ? '#ec4899' : (theme === 'dark' ? '#3f3f46' : '#d4d4d8')" stroke-width="1.5" />
          <text x="200" y="161" text-anchor="middle" font-size="11" font-family="Inter" font-weight="600"
            :fill="isActive('db_direct') ? '#ec4899' : (theme === 'dark' ? '#fafafa' : '#18181b')">lib/db.ts</text>
          <text x="200" y="175" text-anchor="middle" font-size="9" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">18 operations</text>
        </g>

        <!-- CENTER: Supabase Auth (y=143 h=42 center=164) -->
        <g @click="toggle('supabase_auth')" class="cursor-pointer">
          <rect x="330" y="143" width="140" height="42" rx="8"
            :fill="isActive('supabase_auth') ? (theme === 'dark' ? '#500724' : '#fce7f3') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="isActive('supabase_auth') ? '#ec4899' : (theme === 'dark' ? '#3f3f46' : '#d4d4d8')" stroke-width="1.5" />
          <image :href="supabaseLogo" x="365" y="149" width="16" height="16" />
          <text x="387" y="161" font-size="10" font-family="Inter" font-weight="600"
            :fill="isActive('supabase_auth') ? '#ec4899' : (theme === 'dark' ? '#fafafa' : '#18181b')">Auth</text>
          <text x="400" y="175" text-anchor="middle" font-size="9" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">Spotify OAuth</text>
        </g>

        <!-- RIGHT: API Routes (y=143 h=42 center=164) -->
        <g @click="toggle('api_routes')" class="cursor-pointer">
          <rect x="500" y="143" width="200" height="42" rx="8"
            :fill="isActive('api_routes') ? (theme === 'dark' ? '#500724' : '#fce7f3') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="isActive('api_routes') ? '#ec4899' : (theme === 'dark' ? '#3f3f46' : '#d4d4d8')" stroke-width="1.5" />
          <image :href="nextLogo" x="526" y="149" width="16" height="16"
            :style="theme === 'dark' ? 'filter: invert(1)' : ''" />
          <text x="548" y="161" font-size="10" font-family="Inter" font-weight="600"
            :fill="isActive('api_routes') ? '#ec4899' : (theme === 'dark' ? '#fafafa' : '#18181b')">API Routes</text>
          <text x="600" y="175" text-anchor="middle" font-size="9" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">only 3 routes</text>
        </g>

        <!-- ==================== Zod validation ==================== -->
        <g @click="toggle('zod')" class="cursor-pointer">
          <rect x="100" y="200" width="200" height="28" rx="5"
            :fill="isActive('zod') ? (theme === 'dark' ? '#500724' : '#fce7f3') : (theme === 'dark' ? '#1a1a1e' : '#fafafa')"
            :stroke="isActive('zod') ? '#ec4899' : (theme === 'dark' ? '#3f3f46' : '#e4e4e7')" stroke-width="1" />
          <text x="200" y="219" text-anchor="middle" font-size="9" font-family="JetBrains Mono" font-weight="500"
            :fill="isActive('zod') ? '#ec4899' : (theme === 'dark' ? '#71717a' : '#a1a1aa')">Zod v4 validation</text>
        </g>

        <line x1="200" y1="185" x2="200" y2="200" :stroke="theme === 'dark' ? '#3f3f46' : '#a1a1aa'" stroke-width="1" marker-end="url(#vb-arrow-dim)" />

        <!-- ==================== Supabase container (spinning border) ==================== -->
        <rect x="60" y="250" width="380" height="200" rx="12"
          :fill="theme === 'dark' ? '#18181b' : '#fafafa'"
          :stroke="theme === 'dark' ? '#3f3f46' : '#d4d4d8'" stroke-width="1.5"
          stroke-dasharray="8 4" class="animate-dash" />

        <!-- Supabase logo + label -->
        <image :href="supabaseLogo" x="78" y="259" width="18" height="18" />
        <text x="101" y="273" font-size="11" font-family="Inter" font-weight="700"
          fill="#3ecf8e">Supabase</text>

        <!-- Arrow from lib/db.ts to Supabase -->
        <line x1="200" y1="228" x2="200" y2="250" stroke="#ec4899" stroke-width="1.5" marker-end="url(#vb-arrow)" />

        <!-- PostgreSQL -->
        <g @click="toggle('postgres')" class="cursor-pointer">
          <rect x="90" y="295" width="200" height="55" rx="8"
            :fill="isActive('postgres') ? (theme === 'dark' ? '#500724' : '#fce7f3') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="isActive('postgres') ? '#ec4899' : (theme === 'dark' ? '#52525b' : '#d4d4d8')" stroke-width="1.5" />
          <image :href="postgresLogo" x="104" y="304" width="20" height="20" />
          <text x="130" y="317" font-size="11" font-family="Inter" font-weight="600"
            :fill="isActive('postgres') ? '#ec4899' : (theme === 'dark' ? '#fafafa' : '#18181b')">PostgreSQL</text>
          <text x="130" y="330" font-size="8" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">profiles, posts, likes</text>
          <text x="130" y="342" font-size="8" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">comments, follows, duels</text>
        </g>

        <!-- RLS badge (top-right corner of PostgreSQL box) -->
        <rect x="248" y="291" width="36" height="16" rx="4"
          fill="#3ecf8e" opacity="0.15" stroke="#3ecf8e" stroke-width="0.8" />
        <text x="266" y="302" text-anchor="middle" font-size="7" font-family="JetBrains Mono" font-weight="600"
          fill="#3ecf8e">RLS</text>

        <!-- DB Functions -->
        <g @click="toggle('db_functions')" class="cursor-pointer">
          <rect x="90" y="370" width="200" height="55" rx="8"
            :fill="isActive('db_functions') ? (theme === 'dark' ? '#500724' : '#fce7f3') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="isActive('db_functions') ? '#ec4899' : (theme === 'dark' ? '#52525b' : '#d4d4d8')" stroke-width="1.5" />
          <text x="118" y="396" font-size="13" font-weight="bold"
            :fill="theme === 'dark' ? '#a78bfa' : '#7c3aed'">f()</text>
          <text x="143" y="393" font-size="10" font-family="Inter" font-weight="600"
            :fill="isActive('db_functions') ? '#ec4899' : (theme === 'dark' ? '#fafafa' : '#18181b')">DB Functions</text>
          <text x="143" y="406" font-size="8" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">accept_duel, streaks</text>
          <text x="143" y="417" font-size="8" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">upsert_song, upsert_artist</text>
        </g>

        <!-- Arrow PostgreSQL to DB Functions -->
        <line x1="190" y1="350" x2="190" y2="370" :stroke="theme === 'dark' ? '#3f3f46' : '#a1a1aa'" stroke-width="1" marker-end="url(#vb-arrow-dim)" />

        <!-- Triggers -->
        <rect x="305" y="380" width="120" height="40" rx="6"
          :fill="theme === 'dark' ? '#1a1a1e' : '#fafafa'"
          :stroke="theme === 'dark' ? '#3f3f46' : '#e4e4e7'" stroke-width="1" />
        <text x="365" y="397" text-anchor="middle" font-size="8" font-family="JetBrains Mono" font-weight="500"
          :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">7 triggers</text>
        <text x="365" y="410" text-anchor="middle" font-size="7" font-family="JetBrains Mono"
          :fill="theme === 'dark' ? '#52525b' : '#a1a1aa'">streaks, counts, signup</text>
        <line x1="290" y1="400" x2="305" y2="400" :stroke="theme === 'dark' ? '#3f3f46' : '#a1a1aa'" stroke-width="1" stroke-dasharray="3 2" />

        <!-- ==================== External APIs container (spinning border) ==================== -->

        <!-- Arrow from API Routes down -->
        <line x1="600" y1="185" x2="600" y2="250" stroke="#00f0ff" stroke-width="1.5" marker-end="url(#vb-arrow-cyan)" />

        <rect x="470" y="250" width="270" height="120" rx="12"
          :fill="theme === 'dark' ? '#18181b' : '#fafafa'"
          :stroke="theme === 'dark' ? '#3f3f46' : '#d4d4d8'" stroke-width="1.5"
          stroke-dasharray="8 4" class="animate-dash" />
        <text x="490" y="270" font-size="10" font-family="JetBrains Mono" font-weight="500"
          :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">External APIs</text>

        <!-- Spotify -->
        <g @click="toggle('spotify')" class="cursor-pointer">
          <rect x="490" y="280" width="230" height="36" rx="6"
            :fill="isActive('spotify') ? (theme === 'dark' ? '#500724' : '#fce7f3') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="isActive('spotify') ? '#ec4899' : (theme === 'dark' ? '#52525b' : '#d4d4d8')" stroke-width="1.5" />
          <image :href="spotifyLogo" x="502" y="286" width="18" height="18" />
          <text x="526" y="296" font-size="10" font-family="Inter" font-weight="600"
            :fill="isActive('spotify') ? '#ec4899' : (theme === 'dark' ? '#fafafa' : '#18181b')">Spotify Web API</text>
          <text x="526" y="309" font-size="8" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">top tracks, artists, recents</text>
        </g>

        <!-- MusicBrainz -->
        <g @click="toggle('musicbrainz')" class="cursor-pointer">
          <rect x="490" y="324" width="230" height="36" rx="6"
            :fill="isActive('musicbrainz') ? (theme === 'dark' ? '#500724' : '#fce7f3') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="isActive('musicbrainz') ? '#ec4899' : (theme === 'dark' ? '#52525b' : '#d4d4d8')" stroke-width="1.5" />
          <image :href="musicbrainzLogo" x="502" y="330" width="18" height="18" />
          <text x="526" y="340" font-size="10" font-family="Inter" font-weight="600"
            :fill="isActive('musicbrainz') ? '#ec4899' : (theme === 'dark' ? '#fafafa' : '#18181b')">MusicBrainz API</text>
          <text x="526" y="353" font-size="8" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">song search fallback</text>
        </g>

        <!-- Vercel -->
        <g @click="toggle('vercel')" class="cursor-pointer">
          <rect x="470" y="395" width="270" height="35" rx="6"
            :fill="isActive('vercel') ? (theme === 'dark' ? '#500724' : '#fce7f3') : (theme === 'dark' ? '#27272a' : '#f4f4f5')"
            :stroke="isActive('vercel') ? '#ec4899' : (theme === 'dark' ? '#3f3f46' : '#d4d4d8')" stroke-width="1.5" />
          <polygon points="494,420 504,403 514,420" :fill="theme === 'dark' ? '#fafafa' : '#18181b'" />
          <text x="524" y="416" font-size="10" font-family="Inter" font-weight="600"
            :fill="isActive('vercel') ? '#ec4899' : (theme === 'dark' ? '#fafafa' : '#18181b')">Vercel</text>
          <text x="580" y="416" font-size="9" font-family="JetBrains Mono"
            :fill="theme === 'dark' ? '#71717a' : '#a1a1aa'">Next.js 16 + Turbopack</text>
        </g>

        <!-- ==================== Legend ==================== -->
        <g transform="translate(60, 480)">
          <line x1="0" y1="8" x2="25" y2="8" stroke="#ec4899" stroke-width="1.5" />
          <text x="32" y="12" font-size="9" font-family="Inter"
            :fill="theme === 'dark' ? '#a1a1aa' : '#71717a'">{{ t('vibebify.archLegendDirect') }}</text>

          <line x1="200" y1="8" x2="225" y2="8" stroke="#00f0ff" stroke-width="1.5" />
          <text x="232" y="12" font-size="9" font-family="Inter"
            :fill="theme === 'dark' ? '#a1a1aa' : '#71717a'">{{ t('vibebify.archLegendServer') }}</text>

          <line x1="420" y1="8" x2="445" y2="8" :stroke="theme === 'dark' ? '#52525b' : '#a1a1aa'" stroke-width="1" stroke-dasharray="4 3" />
          <text x="452" y="12" font-size="9" font-family="Inter"
            :fill="theme === 'dark' ? '#a1a1aa' : '#71717a'">{{ t('vibebify.archLegendInternal') }}</text>
        </g>

        <!-- Key insight -->
        <text x="400" y="530" text-anchor="middle" font-size="9" font-family="JetBrains Mono"
          :fill="theme === 'dark' ? '#52525b' : '#a1a1aa'">
          {{ t('vibebify.archFootnote') }}
        </text>
      </svg>
    </div>
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
</style>
