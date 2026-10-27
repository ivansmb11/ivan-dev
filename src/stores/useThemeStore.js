import { ref, watch } from 'vue'

// Light is the reference look and the default; dark is opt-in. A new key so the old site's
// auto-saved 'theme' value doesn't silently put returning visitors in dark mode.
const STORAGE_KEY = 'theme-choice'

const theme = ref(localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light')

watch(theme, (value) => {
  document.documentElement.classList.toggle('dark', value === 'dark')
}, { immediate: true })

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem(STORAGE_KEY, theme.value)
  }
  return { theme, toggle }
}
