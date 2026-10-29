import { Github, Linkedin, Twitter, Facebook } from 'lucide-vue-next'

export const email = 'ivanmendozabaca@gmail.com'

export const socials = [
  { icon: Github, href: 'https://github.com/ivansmb11', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/iv%C3%A1n-sebasti%C3%A1n-mendoza-baca-078429231/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/ivannsmb', label: 'X / Twitter' },
  { icon: Facebook, href: 'https://www.facebook.com/ivansmb11', label: 'Facebook' },
]

export const sections = [
  { key: 'nav.home', id: 'hero' },
  { key: 'nav.about', id: 'about' },
  { key: 'nav.career', id: 'career' },
  { key: 'nav.portfolio', id: 'portfolio' },
  { key: 'nav.achievements', id: 'achievements' },
  { key: 'nav.contact', id: 'contact' },
]

// Standalone pages, listed in the menu after the home sections.
export const pages = [{ key: 'nav.blog', to: '/blog' }]
