// Every image the layout needs. To fill a slot, drop `<id>.<ext>` into src/assets/images/
// and AssetSlot picks it up on the next build. Until then it renders a labeled placeholder.
const files = import.meta.glob('./images/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  import: 'default',
})

export const slots = {
  'hero-portrait': { label: 'Hero portrait, transparent cutout', size: '1231 × 1278' },
  'hero-featured-project': { label: 'Hero featured project card (Vibebify)', size: '1200 × 1400' },

  'logo-zazpay': { label: 'ZAZPAY logo, single color', size: 'SVG, 160 × 40' },
  'logo-prestavale': { label: 'Presta Vale logo, single color', size: 'SVG, 160 × 40' },
  'logo-ge-aerospace': { label: 'GE Aerospace logo, single color', size: 'SVG, 160 × 40' },
  'logo-anahuac': { label: 'Universidad Anáhuac logo, single color', size: 'SVG, 160 × 40' },
  'logo-google-cloud': { label: 'Google Cloud logo, single color', size: 'SVG, 160 × 40' },
  'logo-ai-engineer': { label: 'AI Engineer logo, single color', size: 'SVG, 160 × 40' },

  'about-portrait': { label: 'About portrait, motion blur', size: '900 × 1080' },
  'about-texture': { label: 'Stats card background texture', size: '1000 × 1400' },
  'about-role-card': { label: 'Role card image', size: '1200 × 1040' },

  'career-zazpay': { label: 'Career photo, ZAZPAY era', size: '1600 × 1200' },
  'career-prestavale': { label: 'Career photo, Presta Vale era', size: '1600 × 1200' },
  'career-ge-aerospace': { label: 'Career photo, GE Aerospace era', size: '1600 × 1200' },

  'project-vibebify': { label: 'Project cover, Vibebify', size: '1600 × 1200' },
  'project-concierge': { label: 'Video poster, VIP Data Concierge', size: '1600 × 1200' },
  'project-ivan-dev': { label: 'Project cover, ivanmendoza.dev', size: '1600 × 1200' },

  'contact-backdrop': { label: 'Contact form backdrop', size: '2400 × 1400' },
}

export function slotSrc(id) {
  const key = Object.keys(files).find((path) => path.slice('./images/'.length).replace(/\.[^.]+$/, '') === id)
  return key ? files[key] : null
}
