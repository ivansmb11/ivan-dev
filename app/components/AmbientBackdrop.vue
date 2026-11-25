<!-- The light the glass bends. Frosted surfaces over flat paper read as flat gray, so a fixed layer of slow
     ember and amber light sits behind the whole page; cards scroll across it and pick up its color.
     Gradients only (no filter: blur), and only transform animates, so it stays on the compositor. -->
<template>
  <div class="ambient-layer pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div class="ambient-orb ambient-amber" />
    <div class="ambient-orb ambient-ember" />
    <div class="ambient-orb ambient-accent" />
  </div>
</template>

<!-- Unscoped (classes are ambient-*): these rules key off html classes, and a scoped :global(html.x) .y
     compiles to a bare html.x rule, which would hide the whole page. -->
<style>
.ambient-orb {
  position: absolute;
  width: 70vmax;
  height: 70vmax;
  border-radius: 50%;
  will-change: transform;
  animation: ambient-drift 38s ease-in-out infinite alternate;
}

.ambient-amber {
  top: -30vmax;
  left: -22vmax;
  background: radial-gradient(closest-side, oklch(84% 0.12 72 / 0.55), transparent);
}

.ambient-ember {
  top: 20vh;
  right: -32vmax;
  background: radial-gradient(closest-side, color-mix(in oklch, var(--color-ember-bright) 42%, transparent), transparent);
  animation-duration: 46s;
  animation-delay: -12s;
}

.ambient-accent {
  bottom: -38vmax;
  left: 18vw;
  background: radial-gradient(closest-side, color-mix(in oklch, var(--color-accent) 26%, transparent), transparent);
  animation-duration: 52s;
  animation-delay: -24s;
}

@keyframes ambient-drift {
  to {
    transform: translate3d(8vw, 6vh, 0) scale(1.12);
  }
}

html.dark .ambient-layer {
  opacity: 0.55;
}

/* "reduced" keeps the light but holds it still; "off" and reduced transparency remove it */
html.glass-reduced .ambient-orb {
  animation: none;
}
html.glass-off .ambient-layer {
  display: none;
}
@media (prefers-reduced-transparency: reduce) {
  .ambient-layer {
    display: none;
  }
}
</style>
