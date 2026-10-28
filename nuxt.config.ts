import tailwindcss from '@tailwindcss/vite'
import { assetUrl } from './app/assets/slots'

const title = 'Ivan Mendoza | AI Engineer | Mobile & Frontend Lead'
const description =
  'AI Engineer and Mobile & Frontend Lead building fintech products, from AI agents and MCP servers to mobile apps and scalable platforms.'

const fonts = 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..900&display=swap'

// Runs before first paint. Old hash-router links (/#/concierge) jump to the real page before anything
// renders, and the saved theme and the intro's "already seen" flag apply without a flash. The prerendered
// HTML can't know either one, so components read them back only after hydration.
const beforePaint = `(function(){var d=document.documentElement,h=location.hash;if(h.indexOf('#/')===0){location.replace(h.slice(1));return}try{if(localStorage.getItem('theme-choice')==='dark')d.classList.add('dark');if(sessionStorage.getItem('boot-done'))d.classList.add('booted')}catch(e){}})()`

export default defineNuxtConfig({
  compatibilityDate: '2026-10-27',

  modules: ['@nuxtjs/i18n', '@vueuse/motion/nuxt'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: { include: ['lucide-vue-next'] },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title,
      meta: [
        { name: 'description', content: description },
        { name: 'theme-color', content: '#d2643a' },
        // Link previews (LinkedIn, X, Slack). The bucket URL is absolute, which og:image requires.
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Ivan Mendoza' },
        { property: 'og:url', content: 'https://ivanmendoza.dev/' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: assetUrl('meta/og-home.jpg') },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Ivan Mendoza, AI Engineer, Mobile & Frontend Lead' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: assetUrl('meta/og-home.jpg') },
      ],
      link: [
        { rel: 'icon', href: assetUrl('meta/favicon.ico') },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: assetUrl('meta/favicon-32x32.png') },
        { rel: 'apple-touch-icon', href: assetUrl('meta/apple-touch-icon.png') },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preload', as: 'style', href: fonts },
        { rel: 'stylesheet', href: fonts },
      ],
      script: [{ innerHTML: beforePaint, tagPriority: 'critical' }],
    },
  },

  // Same URL in both languages, as before: English is prerendered and app.vue switches to the saved or
  // browser language after hydration.
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    locales: [
      { code: 'en', language: 'en', file: 'en.js' },
      { code: 'es', language: 'es', file: 'es.js' },
    ],
  },

  // Static output for Firebase Hosting. `concierge.html` rather than `concierge/index.html`, so
  // cleanUrls serves /concierge without a trailing-slash redirect.
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/', '/concierge', '/vibebify', '/agents'],
      autoSubfolderIndex: false,
    },
  },
})
