// Builds every project folder (anything next to hub/ with a package.json) so the hub can serve its dist/.
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const only = process.argv[2] // optional: build a single project, e.g. `npm run build -- hair-by-gyeiwaa`

const projects = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('.') && d.name !== 'hub' && d.name !== 'node_modules')
  .map((d) => d.name)
  .filter((name) => fs.existsSync(path.join(ROOT, name, 'package.json')))
  .filter((name) => !only || name === only)

let failed = 0
for (const name of projects) {
  console.log(`\n▸ Building ${name}`)
  const dir = path.join(ROOT, name)
  if (!fs.existsSync(path.join(dir, 'node_modules'))) {
    spawnSync('npm', ['install'], { cwd: dir, stdio: 'inherit', shell: true })
  }
  const r = spawnSync('npm', ['run', 'build'], { cwd: dir, stdio: 'inherit', shell: true })
  if (r.status !== 0) failed++
}

// Refresh the directory listing (hub/projects.json) from every built project.
function readMeta(html) {
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim()
  const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1]?.trim()
  return { title, description }
}

const manifestPath = path.join(ROOT, 'hub', 'projects.json')
const previous = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : []
const manifest = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('.') && d.name !== 'hub' && d.name !== 'node_modules')
  .map(({ name: slug }) => {
    const index = path.join(ROOT, slug, 'dist', 'index.html')
    if (!fs.existsSync(index)) return previous.find((p) => p.slug === slug) ?? null
    const { title, description } = readMeta(fs.readFileSync(index, 'utf8'))
    const images = path.join(ROOT, slug, 'dist', 'images')
    let cover = null
    if (fs.existsSync(path.join(images, 'hero.jpg'))) cover = 'images/hero.jpg'
    else if (fs.existsSync(images)) {
      const first = fs.readdirSync(images).find((f) => /\.(jpe?g|png|webp)$/i.test(f))
      if (first) cover = `images/${first}`
    }
    return { slug, title: title || slug, description: description || '', cover, updated: fs.statSync(index).mtime.toISOString() }
  })
  .filter(Boolean)
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Directory lists ${manifest.length} project(s).`)

console.log(failed ? `\n${failed} project(s) failed to build.` : `\nBuilt ${projects.length} project(s).`)
process.exit(failed ? 1 : 0)
