import bucket from './bucket.json'

// Every image the layout needs. Images are served from the Supabase `assets` bucket: to fill a slot, put
// `images/<id>.<ext>` in the bucket (or in app/assets/images/) and run `npm run assets:sync`. Until then
// AssetSlot renders a labeled placeholder. An optional `<id>-dark.<ext>` is shown instead in dark mode.

export const slots = {
  'hero-portrait': { label: 'Hero portrait, transparent cutout', size: '1231 × 1278' },
  'hero-featured-project': { label: 'Hero featured project card (Vibebify)', size: '1200 × 1400' },

  'logo-zazpay': { label: 'ZAZPAY logo, transparent PNG', size: 'max 600 × 160' },
  'logo-prestavale': { label: 'Presta Vale logo, transparent PNG', size: 'max 600 × 160' },
  'logo-ge-aerospace': { label: 'GE Aerospace logo, transparent PNG', size: 'max 600 × 160' },
  'logo-anahuac': { label: 'Universidad Anáhuac logo, transparent PNG', size: 'max 600 × 160' },
  'logo-google-cloud': { label: 'Google Cloud logo, transparent PNG', size: 'max 600 × 160' },
  'logo-ai-engineer': { label: 'AI Engineer logo, transparent PNG', size: 'max 600 × 160' },

  'about-portrait': { label: 'About portrait, motion blur', size: '900 × 1080' },
  'about-texture': { label: 'Stats card background texture', size: '1000 × 1400' },
  'about-role-card': { label: 'Role card image', size: '1200 × 1040' },

  'career-zazpay': { label: 'Career photo, ZAZPAY era', size: '1600 × 1200' },
  'career-prestavale': { label: 'Career photo, Presta Vale era', size: '1600 × 1200' },
  'career-ge-aerospace': { label: 'Career photo, GE Aerospace era', size: '1600 × 1200' },

  'project-vibebify': { label: 'Project cover, Vibebify', size: '1600 × 1200' },
  'project-concierge': { label: 'Video poster, VIP Data Concierge', size: '1600 × 1200' },
  'project-agent-platform': { label: 'Project cover, Agent Platform', size: '1600 × 1200' },
  'project-coming-soon': { label: 'Coming soon card, workbench line drawing', size: '1600 × 1200' },
  'concierge-problem': { label: 'Flat network with one compromised server', size: '900 × 900' },
  'concierge-principle-hub-spoke': { label: 'Full mesh vs hub-and-spoke comparison', size: '1600 × 600' },
  'concierge-hero': { label: 'Concierge page hero, hub-and-spoke illustration', size: '1659 × 948' },

  'about-location-map': { label: 'Line map of Mexico, Sinaloa to CDMX, transparent', size: '1000 × 626' },
  'contact-map-cdmx': { label: 'Line street map of central CDMX, transparent', size: '1000 × 626' },
  'achievement-stamp': { label: 'Decorative stamp with asterisk, transparent', size: '600 × 600' },
  'vibebify-receipt': { label: 'Receipt cutout with lightning sticker, transparent', size: '600 × 1451' },

  'contact-backdrop': { label: 'Contact form backdrop', size: '2400 × 1400' },
}

// The ?v= is the file's ETag, so replacing a file under the same name gets past the CDN cache.
export function assetUrl(path) {
  const version = bucket.files[path]
  return version ? `${bucket.base}/${path}?v=${version}` : null
}

export function slotSrc(id) {
  const path = Object.keys(bucket.files).find((p) => p.startsWith('images/') && p.slice(7).replace(/\.[^.]+$/, '') === id)
  return path ? assetUrl(path) : null
}
