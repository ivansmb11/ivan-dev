<script setup>
import GeckoBlob from './GeckoBlob.vue'

// Portfolio cover for Gecko: the story's cast on a loop, with a parcel shuttling lender → agent → client.
</script>

<template>
  <div class="cover relative overflow-hidden bg-night" aria-hidden="true">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_110%,color-mix(in_oklch,var(--color-ember)_55%,transparent),transparent_60%)]" />
    <div class="absolute inset-x-[8%] top-[52%] border-t border-dashed border-white/15" />
    <div class="seat" style="left: 32%; top: 28%"><GeckoBlob tone="policy" mood="happy" size="xs" /></div>
    <div class="seat" style="left: 68%; top: 28%"><GeckoBlob tone="beat" mood="sleep" size="xs" /></div>
    <div class="seat" style="left: 16%; top: 72%"><GeckoBlob tone="lender" mood="happy" size="sm" /></div>
    <div class="seat" style="left: 50%; top: 72%"><GeckoBlob tone="agent" mood="think" size="sm" /></div>
    <div class="seat" style="left: 84%; top: 72%"><GeckoBlob tone="client" mood="happy" size="sm" /></div>
    <span class="parcel">✉</span>
    <span class="absolute bottom-[6%] left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.08em] text-white/50 uppercase">event → decision → policy → outcome</span>
  </div>
</template>

<style scoped>
.seat { position: absolute; transform: translate(-50%, -50%); }
.parcel {
  position: absolute;
  top: 72%;
  translate: -50% -50%;
  display: grid;
  place-items: center;
  width: 30px;
  height: 22px;
  border-radius: 999px;
  background: white;
  color: var(--color-onyx);
  font-size: 12px;
  box-shadow: 0 6px 16px -4px rgb(0 0 0 / 0.5);
  animation: shuttle 6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
@keyframes shuttle {
  0%, 8% { left: 16%; top: 72%; opacity: 0; }
  12% { opacity: 1; }
  30%, 38% { left: 50%; top: 72%; }
  52%, 58% { left: 32%; top: 28%; }
  74%, 86% { left: 84%; top: 72%; opacity: 1; }
  92%, 100% { left: 84%; top: 72%; opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .parcel { animation: none; left: 50%; }
}
</style>
