<script setup>
defineProps({
  weight: { type: Number, default: 1.6 },
})
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="weight" aria-hidden="true" focusable="false">
    <path
      d="M12 1.5v7.25M12 15.25v7.25M1.5 12h7.25M15.25 12h7.25M4.58 4.58l5.13 5.13M14.29 14.29l5.13 5.13M19.42 4.58l-5.13 5.13M9.71 14.29l-5.13 5.13"
    />
  </svg>
</template>
