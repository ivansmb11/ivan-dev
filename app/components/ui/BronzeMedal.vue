<script setup>
import { slotSrc } from '@/assets/slots'

defineProps({
  place: { type: [String, Number], default: 3 },
})

// Gradient ids must be unique per instance: the medal shows on the post and on its /blog card.
const id = useId()
const url = (name) => `url(#${id}-${name})`

// The rendered medal from the bucket; the SVG below is the fallback until it is synced.
const src = slotSrc('medal-bronze')
</script>

<template>
  <img v-if="src" :src="src" alt="" width="299" height="360" decoding="async" class="object-contain" />
  <svg v-else viewBox="0 0 64 88" fill="none" aria-hidden="true">
    <defs>
      <linearGradient :id="`${id}-strap`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#EA580C" />
        <stop offset="1" stop-color="#9A3412" />
      </linearGradient>
      <linearGradient :id="`${id}-fold`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7C2D12" />
        <stop offset="1" stop-color="#431407" />
      </linearGradient>
      <linearGradient :id="`${id}-rim`" x1="0.15" y1="0" x2="0.85" y2="1">
        <stop offset="0" stop-color="#FFE0BD" />
        <stop offset="0.35" stop-color="#D08A4B" />
        <stop offset="0.7" stop-color="#8A4B22" />
        <stop offset="1" stop-color="#5A2E12" />
      </linearGradient>
      <radialGradient :id="`${id}-face`" cx="0.38" cy="0.32" r="0.75">
        <stop offset="0" stop-color="#F3BE8A" />
        <stop offset="0.5" stop-color="#C47A3D" />
        <stop offset="1" stop-color="#7E441D" />
      </radialGradient>
      <linearGradient :id="`${id}-bevel`" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0" stop-color="#6B3817" />
        <stop offset="1" stop-color="#FFD9B0" />
      </linearGradient>
      <linearGradient :id="`${id}-digit`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FFE7CC" />
        <stop offset="0.55" stop-color="#E0A26A" />
        <stop offset="1" stop-color="#A9622D" />
      </linearGradient>
      <linearGradient :id="`${id}-gloss`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.55" />
        <stop offset="1" stop-color="#FFFFFF" stop-opacity="0" />
      </linearGradient>
      <clipPath :id="`${id}-faceclip`">
        <circle cx="32" cy="58" r="21" />
      </clipPath>
    </defs>

    <!-- Ribbon: two striped straps meeting behind the medal, darker where they fold under -->
    <path d="M23 34 33 48h-6L17 34z" :fill="url('fold')" />
    <path d="M41 34 31 48h6l10-14z" :fill="url('fold')" />
    <path d="M6 0h18l13 36H19z" :fill="url('strap')" />
    <path d="M58 0H40L27 36h18z" :fill="url('strap')" />
    <path d="M12 0h4.5l12 36H24z" fill="#FFEDD5" opacity="0.9" />
    <path d="M52 0h-4.5l-12 36H40z" fill="#FFEDD5" opacity="0.9" />
    <path d="M6 0h2.5l13 36H19z" fill="#431407" opacity="0.25" />
    <path d="M58 0h-2.5l-13 36H45z" fill="#431407" opacity="0.25" />

    <!-- Ring that holds the medal -->
    <rect x="27" y="29.5" width="10" height="6" rx="3" stroke="#8A4B22" stroke-width="2.25" />
    <rect x="27" y="29.5" width="10" height="6" rx="3" stroke="#F3C08F" stroke-width="0.9" />

    <!-- Medal: milled edge, rim, bevel, face -->
    <circle cx="32" cy="58" r="28.5" fill="#5A2E12" />
    <circle cx="32" cy="58" r="27.25" stroke="#3B1D0B" stroke-width="2.5" stroke-dasharray="1.4 1.4" opacity="0.55" />
    <circle cx="32" cy="58" r="26" :fill="url('rim')" />
    <circle cx="32" cy="58" r="22.5" :fill="url('bevel')" />
    <circle cx="32" cy="58" r="21" :fill="url('face')" />
    <circle cx="32" cy="58" r="17.5" stroke="#5A2E12" stroke-opacity="0.35" stroke-width="0.8" stroke-dasharray="0.1 2.6" stroke-linecap="round" />

    <!-- Embossed number: shadow below, highlight above, then the face -->
    <g font-family="Inter, system-ui, sans-serif" font-size="27" font-weight="900" text-anchor="middle">
      <text x="32.9" y="68.4" fill="#4A230B" opacity="0.75">{{ place }}</text>
      <text x="31.4" y="66.8" fill="#FFF3E4" opacity="0.6">{{ place }}</text>
      <text x="32" y="67.6" :fill="url('digit')">{{ place }}</text>
    </g>

    <!-- Gloss across the top of the face -->
    <g :clip-path="url('faceclip')">
      <ellipse cx="25" cy="44" rx="22" ry="11" transform="rotate(-20 25 44)" :fill="url('gloss')" />
    </g>
    <path d="M10.5 50a23 23 0 0 1 13-14" stroke="#FFF1E0" stroke-opacity="0.8" stroke-width="1.6" stroke-linecap="round" />
  </svg>
</template>
