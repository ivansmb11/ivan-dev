// Light is the reference look and the default; dark is opt-in. A new key so the old site's
// auto-saved 'theme' value doesn't silently put returning visitors in dark mode.
const STORAGE_KEY = 'theme-choice'

export function useTheme() {
  // Starts 'light' on the server and during hydration, so the toggle renders the same markup on both.
  const theme = useState('theme', () => 'light')

  // The before-paint script in nuxt.config already set html.dark from storage; this catches the state up.
  function sync() {
    theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  }

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', theme.value === 'dark')
    localStorage.setItem(STORAGE_KEY, theme.value)
  }

  return { theme, toggle, sync }
}
