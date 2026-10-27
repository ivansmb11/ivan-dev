import tailwindcss from '@tailwindcss/vite'

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
      title: 'Ivan Mendoza | Lead Software Engineer',
      meta: [
        {
          name: 'description',
          content: 'Lead Software Engineer building fintech products, from mobile apps to scalable platforms. AI engineer focused on agentic coding and developer productivity.',
        },
        { name: 'theme-color', content: '#d2643a' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
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
