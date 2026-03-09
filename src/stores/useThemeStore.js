import { ref, watch } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'dark')

function applyTheme(t) {
  document.documentElement.classList.toggle('dark', t === 'dark')
  document.documentElement.classList.toggle('light', t === 'light')
}

watch(theme, (val) => {
  localStorage.setItem('theme', val)
  applyTheme(val)
}, { immediate: true })

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggle }
}
