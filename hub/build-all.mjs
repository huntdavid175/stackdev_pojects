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

console.log(failed ? `\n${failed} project(s) failed to build.` : `\nBuilt ${projects.length} project(s).`)
process.exit(failed ? 1 : 0)
