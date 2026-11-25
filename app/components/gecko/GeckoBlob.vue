<script setup>
// A blob character for the Gecko story and map. Mood draws the face; `look` nudges the pupils toward whoever it talks to.
defineProps({
  tone: { type: String, required: true },
  mood: { type: String, default: 'neutral' },
  size: { type: String, default: 'md' },
  name: { type: String, default: '' },
  role: { type: String, default: '' },
  look: { type: Number, default: 0 },
  ring: { type: Boolean, default: false },
  glow: { type: Boolean, default: false },
})
</script>

<template>
  <div class="blob" :class="[`t-${tone}`, `m-${mood}`, `s-${size}`, { ring, glow }]" :style="{ '--look': `${look}px` }">
    <div class="body" aria-hidden="true">
      <div class="eyes"><i /><i /></div>
      <div class="mouth" />
    </div>
    <div v-if="name" class="mt-2.5 text-[12.5px] font-semibold leading-tight whitespace-nowrap text-ink">{{ name }}</div>
    <div v-if="role" class="text-[11px] leading-tight whitespace-nowrap text-graphite">{{ role }}</div>
  </div>
</template>

<style scoped>
.blob { display: flex; flex-direction: column; align-items: center; }
.body {
  --s: 84px;
  position: relative;
  width: var(--s);
  height: var(--s);
  background: radial-gradient(circle at 32% 28%, var(--hi), var(--c) 62%, var(--lo));
  border-radius: 44% 56% 62% 38% / 46% 40% 60% 54%;
  animation: morph 8s ease-in-out infinite, bob 4.5s ease-in-out infinite;
  box-shadow: inset -6px -10px 18px rgb(0 0 0 / 0.22), 0 14px 26px -14px var(--c);
  transition: box-shadow 0.8s;
}
.s-sm .body { --s: 62px; }
.s-xs .body { --s: 42px; }
@media (max-width: 639px) {
  .body { --s: 60px; }
  .s-sm .body { --s: 46px; }
  .s-xs .body { --s: 36px; }
}
.eyes { position: absolute; top: 34%; left: 50%; transform: translateX(-50%); display: flex; gap: calc(var(--s) * 0.16); }
.eyes i {
  position: relative;
  display: block;
  width: calc(var(--s) * 0.15);
  height: calc(var(--s) * 0.19);
  background: #fff;
  border-radius: 50%;
  animation: blink 5.5s infinite;
}
.eyes i::after {
  content: '';
  position: absolute;
  width: 52%;
  height: 52%;
  top: 28%;
  left: calc(24% + var(--look, 0px));
  background: #111;
  border-radius: 50%;
  transition: left 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.mouth {
  position: absolute;
  top: 62%;
  left: 50%;
  transform: translateX(-50%);
  width: calc(var(--s) * 0.22);
  height: calc(var(--s) * 0.1);
  border: 3px solid #141414;
  border-top: none;
  border-radius: 0 0 40px 40px;
  transition: all 0.5s;
}
.m-worried .mouth { border-top: 3px solid #141414; border-bottom: none; border-radius: 40px 40px 0 0; top: 66%; }
.m-think .mouth { width: calc(var(--s) * 0.09); height: calc(var(--s) * 0.09); border: 3px solid #141414; border-radius: 50%; }
.m-neutral .mouth { height: 0; border-bottom: 3px solid #141414; border-radius: 0; top: 66%; }
.m-sleep .eyes i { height: 3px; margin-top: 8px; background: #141414; animation: none; }
.m-sleep .eyes i::after { display: none; }
.m-sleep .mouth { height: 0; width: calc(var(--s) * 0.1); border-bottom: 3px solid #141414; border-radius: 0; }
.m-sleep { position: relative; }
.m-sleep::after {
  content: 'z z';
  position: absolute;
  top: -8px;
  right: -12px;
  font: 600 13px ui-monospace, monospace;
  color: var(--color-graphite);
  animation: zz 2.4s infinite;
}
.ring .body { animation: shake 0.5s ease-in-out infinite, morph 8s infinite; }
.glow .body { box-shadow: inset -6px -10px 18px rgb(0 0 0 / 0.22), 0 0 0 7px color-mix(in oklch, var(--c) 18%, transparent), 0 0 40px var(--c); }

.t-agent { --c: #2f8cff; --hi: #a9d3ff; --lo: #0a4fb3; }
.t-agent .body::before { content: ''; position: absolute; left: 50%; top: -14px; width: 3px; height: 16px; background: #7fbaff; transform: translateX(-50%); }
.t-agent .body::after { content: ''; position: absolute; left: 50%; top: -20px; width: 9px; height: 9px; border-radius: 50%; background: #c6e3ff; transform: translateX(-50%); box-shadow: 0 0 12px #52a8ff; animation: beacon 1.8s infinite; }
.t-client { --c: #ff6aa9; --hi: #ffd0e4; --lo: #c2276a; }
.t-client .body::before { content: ''; position: absolute; top: -7px; left: 28%; width: 30%; height: 26%; border-radius: 50% 50% 50% 0; background: #d23c7c; transform: rotate(-20deg); }
.t-lender { --c: #2fcfb3; --hi: #b8fff1; --lo: #0d7f6c; }
.t-lender .body { border-radius: 26%; animation: bob 4.5s ease-in-out infinite; }
.t-lender .body::before { content: '$'; position: absolute; bottom: 6%; left: 50%; transform: translateX(-50%); font: 700 12px ui-monospace, monospace; color: rgb(0 0 0 / 0.45); }
.t-policy { --c: #f0a92e; --hi: #ffe2a6; --lo: #a86a07; }
.t-policy .body::before { content: ''; position: absolute; top: -6px; left: 18%; right: 18%; height: 16%; background: #8a5300; border-radius: 8px 8px 3px 3px; }
.t-beat { --c: #a96cf0; --hi: #e4ccff; --lo: #6526b4; }
.t-beat .body::before, .t-beat .body::after { content: ''; position: absolute; top: -7px; width: 24%; height: 18%; border-radius: 50% 50% 0 0; background: #d9bcff; }
.t-beat .body::before { left: 12%; }
.t-beat .body::after { right: 12%; }
.t-human { --c: #ff7a45; --hi: #ffd3bf; --lo: #b33e10; }
.t-human .body::before { content: ''; position: absolute; top: -9px; left: 6%; right: 6%; height: 50%; border: 4px solid #5a1f07; border-bottom: none; border-radius: 50% 50% 0 0; }
.t-gray { --c: #7a7a7a; --hi: #d4d4d4; --lo: #3a3a3a; }
.t-note { --c: #7cc4ff; --hi: #e3f3ff; --lo: #2b78bd; }
.t-msg { --c: #4cd07a; --hi: #c9ffd9; --lo: #1a7d3d; }
.t-decision { --c: #6d7bff; --hi: #d5d9ff; --lo: #2e37b8; }

@keyframes morph {
  0%, 100% { border-radius: 44% 56% 62% 38% / 46% 40% 60% 54%; }
  33% { border-radius: 58% 42% 40% 60% / 55% 58% 42% 45%; }
  66% { border-radius: 40% 60% 52% 48% / 38% 52% 48% 62%; }
}
@keyframes bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 -5px; } }
@keyframes blink { 0%, 46%, 50%, 100% { transform: scaleY(1); } 48% { transform: scaleY(0.1); } }
@keyframes zz { 0% { opacity: 0; transform: translateY(6px); } 50% { opacity: 1; } 100% { opacity: 0; transform: translateY(-10px); } }
@keyframes shake { 0%, 100% { rotate: 0deg; } 25% { rotate: -9deg; } 75% { rotate: 9deg; } }
@keyframes beacon { 50% { box-shadow: 0 0 22px #52a8ff; background: #fff; } }

@media (prefers-reduced-motion: reduce) {
  .body, .eyes i, .m-sleep::after, .t-agent .body::after { animation: none !important; }
}
</style>
