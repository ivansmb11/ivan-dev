import { createI18n } from 'vue-i18n'
import en from './en.js'
import es from './es.js'

const savedLocale = localStorage.getItem('locale')
const browserLocale = navigator.language.startsWith('es') ? 'es' : 'en'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale || browserLocale,
  fallbackLocale: 'en',
  messages: { en, es },
})
