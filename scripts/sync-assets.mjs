// Uploads the site's images to the public `assets` bucket in Supabase and rewrites
// app/assets/bucket.json, the list of files the site reads its image URLs from.
//
//   SUPABASE_SERVICE_ROLE_KEY=... npm run assets:sync
//
// app/assets/** goes to the same path in the bucket, the favicons and web manifest in public/ go to meta/.
// Files uploaded straight to the bucket (dashboard, another machine) end up in bucket.json too, since it is
// rebuilt from the bucket listing, not from the local folders.
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative, extname } from 'node:path'

const SUPABASE_URL = process.env.SUPABASE_URL ?? 'https://ctqzhlionfyyhujzzped.supabase.co'
const BUCKET = 'assets'
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const types = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
}

const META = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'site.webmanifest',
]

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` }

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)])),
  )
  return files.flat()
}

async function upload(file, path) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': types[extname(file)], 'x-upsert': 'true' },
    body: await readFile(file),
  })
  if (!res.ok) throw new Error(`${path}: ${res.status} ${await res.text()}`)
  console.log(`  ↑ ${path}`)
}

// The list endpoint is one level deep; folders come back with a null id.
async function list(prefix = '') {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ prefix, limit: 1000, sortBy: { column: 'name', order: 'asc' } }),
  })
  if (!res.ok) throw new Error(`list ${prefix}: ${res.status} ${await res.text()}`)
  const items = await res.json()
  const nested = await Promise.all(
    items.map((item) => {
      const path = prefix ? `${prefix}/${item.name}` : item.name
      return item.id ? [[path, item.metadata.eTag.replaceAll('"', '').slice(0, 8)]] : list(path)
    }),
  )
  return nested.flat()
}

if (!KEY) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY (Supabase dashboard → Project Settings → API keys).')
  process.exit(1)
}

const local = (await walk('app/assets'))
  .map((file) => [file, relative('app/assets', file)])
  .filter(([file]) => types[extname(file)])
const meta = META.map((name) => [join('public', name), `meta/${name}`])

console.log(`Uploading ${local.length + meta.length} files to ${BUCKET}`)
for (const [file, path] of [...local, ...meta]) await upload(file, path)

const files = Object.fromEntries(await list())
await writeFile(
  'app/assets/bucket.json',
  `${JSON.stringify({ base: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`, files }, null, 2)}\n`,
)
console.log(`Wrote app/assets/bucket.json (${Object.keys(files).length} files)`)
