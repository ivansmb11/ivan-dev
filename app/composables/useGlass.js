// Visitor control over the glass material: 'on' (default), 'reduced' (near-opaque, still light) or 'off'
// (solid surfaces). Applied as html.glass-reduced / html.glass-off, read before paint like the theme.
const STORAGE_KEY = 'glass'
export const GLASS_LEVELS = ['on', 'reduced', 'off']

export function useGlass() {
  // 'on' on the server and during hydration, so controls render the same markup on both.
  const glass = useState('glass', () => 'on')

  function apply(level) {
    glass.value = level
    const root = document.documentElement
    root.classList.toggle('glass-reduced', level === 'reduced')
    root.classList.toggle('glass-off', level === 'off')
    if (level === 'on') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, level)
  }

  // The before-paint script in nuxt.config already set the class from storage; this catches the state up.
  function sync() {
    const root = document.documentElement
    glass.value = root.classList.contains('glass-off') ? 'off' : root.classList.contains('glass-reduced') ? 'reduced' : 'on'
  }

  function cycle() {
    apply(GLASS_LEVELS[(GLASS_LEVELS.indexOf(glass.value) + 1) % GLASS_LEVELS.length])
  }

  return { glass, apply, cycle, sync }
}
