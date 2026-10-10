// Preview hub for client mockups.
//
//   /                  -> project directory, locked behind an access code (checked server-side)
//   /<project-name>/   -> that project's built site (public, so a prospect can open the link we send)
//
// The directory lists the projects in projects.json, which `npm run build` (hub/build-all.mjs) regenerates.
// Locally this server also serves each project's dist/; on Vercel the projects are separate services
// (see ../vercel.json) and this file only handles /, /login and /logout.
// Run `npm run build` in the repo root first, then `npm start`.
// Config (env): HUB_CODE (default 1967), PORT (default 5174), HUB_SECRET (recommended when hosted; signs the login cookie),
//               HUB_TRUST_PROXY=1 when behind a proxy that sets X-Forwarded-For (automatic on Vercel).

import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath, pathToFileURL } from 'node:url'
import manifest from './projects.json' with { type: 'json' }

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PORT = Number(process.env.PORT) || 5174
const CODE = process.env.HUB_CODE || '1967'
// Serverless instances don't share memory, so the signing key must be stable: fall back to one derived from the code.
const SECRET = process.env.HUB_SECRET || crypto.createHash('sha256').update(`hub-session:${CODE}`).digest('hex')
const COOKIE = 'hub_session'
const SESSION_DAYS = 7
const MAX_ATTEMPTS = 5
const LOCK_MS = 5 * 60 * 1000
const TRUST_PROXY = process.env.HUB_TRUST_PROXY === '1' || Boolean(process.env.VERCEL)
const SKIP = new Set(['hub', 'node_modules'])

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
}

// ---------- auth ----------

const sign = (expires) => crypto.createHmac('sha256', SECRET).update(`hub:${expires}`).digest('hex')

function makeSession() {
  const expires = Date.now() + SESSION_DAYS * 86400000
  return `${expires}.${sign(expires)}`
}

function cookies(req) {
  const out = {}
  for (const part of (req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=')
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim())
  }
  return out
}

function isAuthed(req) {
  const [expires, mac] = (cookies(req)[COOKIE] || '').split('.')
  if (!expires || !mac || Number(expires) < Date.now()) return false
  const expected = sign(expires)
  return mac.length === expected.length && crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))
}

function codeMatches(input) {
  const a = crypto.createHash('sha256').update(String(input)).digest()
  const b = crypto.createHash('sha256').update(CODE).digest()
  return crypto.timingSafeEqual(a, b)
}

const attempts = new Map() // ip -> { count, lockedUntil }
// Only trust X-Forwarded-For behind a known proxy; otherwise anyone could spoof it to dodge the lockout.
const clientIp = (req) =>
  (TRUST_PROXY && (req.headers['x-forwarded-for'] || '').split(',')[0].trim()) || req.socket.remoteAddress

function lockRemaining(ip) {
  const a = attempts.get(ip)
  return a && a.lockedUntil > Date.now() ? a.lockedUntil - Date.now() : 0
}

function recordFailure(ip) {
  const a = attempts.get(ip) || { count: 0, lockedUntil: 0 }
  a.count += 1
  if (a.count >= MAX_ATTEMPTS) {
    a.count = 0
    a.lockedUntil = Date.now() + LOCK_MS
  }
  attempts.set(ip, a)
}

const secureFlag = (req) => (req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : '')

// ---------- projects ----------

function listProjects() {
  return manifest.map((p) => ({ ...p, updated: new Date(p.updated) })).sort((a, b) => b.updated - a.updated)
}

// ---------- pages ----------

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const baseStyles = `
  :root { --bg:#f6f5f2; --ink:#161514; --muted:#6f6b66; --line:#e3e0da; --card:#fff; }
  @media (prefers-color-scheme: dark) { :root { --bg:#121211; --ink:#f1efea; --muted:#9a958e; --line:#2a2927; --card:#1b1a19; } }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--ink); font:16px/1.55 system-ui, -apple-system, "Segoe UI", sans-serif; -webkit-font-smoothing:antialiased; }
  a { color:inherit; }
  :focus-visible { outline:2px solid var(--ink); outline-offset:3px; }
  button, input { font:inherit; color:inherit; }
`

function page(title, body, extraStyles = '') {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><title>${esc(title)}</title><style>${baseStyles}${extraStyles}</style></head><body>${body}</body></html>`
}

function loginPage({ error = '', locked = 0 } = {}) {
  const message = locked
    ? `Too many attempts. Try again in ${Math.ceil(locked / 60000)} minute${locked > 60000 ? 's' : ''}.`
    : error
  return page(
    'Client previews',
    `<main class="login">
      <h1>Client previews</h1>
      <p class="sub">Enter the access code to see all projects.</p>
      <form method="post" action="/login">
        <label for="code" class="sr">Access code</label>
        <input id="code" name="code" type="password" inputmode="numeric" autocomplete="off" placeholder="Access code" required autofocus ${locked ? 'disabled' : ''}>
        <button type="submit" ${locked ? 'disabled' : ''}>Open</button>
      </form>
      ${message ? `<p class="err" role="alert">${esc(message)}</p>` : ''}
    </main>`,
    `
    .login { min-height:100vh; display:flex; flex-direction:column; justify-content:center; width:min(100% - 32px, 360px); margin:0 auto; }
    h1 { margin:0; font-size:28px; font-weight:600; letter-spacing:-0.02em; }
    .sub { margin:6px 0 24px; color:var(--muted); }
    form { display:flex; gap:8px; }
    input { flex:1; min-width:0; height:48px; padding:0 16px; border:1px solid var(--line); border-radius:10px; background:var(--card); font-size:18px; letter-spacing:0.3em; }
    input::placeholder { letter-spacing:normal; font-size:16px; color:var(--muted); }
    button { height:48px; padding:0 22px; border:0; border-radius:10px; background:var(--ink); color:var(--bg); font-weight:600; cursor:pointer; }
    button:disabled, input:disabled { opacity:.5; cursor:not-allowed; }
    .err { margin:14px 0 0; color:#c2410c; font-size:14px; }
    .sr { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); }
    `,
  )
}

function directoryPage(projects) {
  const fmt = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  const cards = projects.length
    ? projects
        .map(
          (p) => `<li class="card">
        <a class="cover" href="/${esc(p.slug)}/" target="_blank" rel="noopener">
          ${p.cover ? `<img src="/${esc(p.slug)}/${esc(p.cover)}" alt="" loading="lazy">` : ''}
        </a>
        <div class="body">
          <h2>${esc(p.title)}</h2>
          ${p.description ? `<p class="desc">${esc(p.description)}</p>` : ''}
          <p class="meta"><code>/${esc(p.slug)}/</code> <span>Built ${fmt(p.updated)}</span></p>
          <div class="actions">
            <a class="btn" href="/${esc(p.slug)}/" target="_blank" rel="noopener">Open</a>
            <button class="btn ghost" type="button" data-copy="/${esc(p.slug)}/">Copy link</button>
          </div>
        </div>
      </li>`,
        )
        .join('')
    : `<li class="empty">No built projects yet. Run <code>npm run build</code> in the project folder.</li>`

  return page(
    'Client previews',
    `<header class="top">
      <div>
        <h1>Client previews</h1>
        <p class="sub">${projects.length} project${projects.length === 1 ? '' : 's'}. Links to a project open without the code.</p>
      </div>
      <form method="post" action="/logout"><button class="link" type="submit">Lock</button></form>
    </header>
    <ul class="grid">${cards}</ul>
    <script>
      document.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-copy]'); if (!b) return
        const url = location.origin + b.dataset.copy
        try { await navigator.clipboard.writeText(url); b.textContent = 'Copied' }
        catch { prompt('Copy this link:', url) }
        setTimeout(() => (b.textContent = 'Copy link'), 1600)
      })
    </script>`,
    `
    .top { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; width:min(100% - 32px, 1120px); margin:48px auto 28px; }
    h1 { margin:0; font-size:28px; font-weight:600; letter-spacing:-0.02em; }
    .sub { margin:4px 0 0; color:var(--muted); }
    .link { background:none; border:0; padding:8px 0; color:var(--muted); text-decoration:underline; text-underline-offset:3px; cursor:pointer; }
    .grid { list-style:none; margin:0 auto 64px; padding:0; width:min(100% - 32px, 1120px); display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:20px; }
    .card { display:flex; flex-direction:column; background:var(--card); border:1px solid var(--line); border-radius:14px; overflow:hidden; }
    .cover { display:block; aspect-ratio:16/10; background:var(--line); overflow:hidden; }
    .cover img { width:100%; height:100%; object-fit:cover; object-position:center 25%; display:block; transition:transform .5s ease; }
    .cover:hover img { transform:scale(1.03); }
    .body { display:flex; flex-direction:column; flex:1; padding:18px 18px 20px; }
    h2 { margin:0; font-size:19px; font-weight:600; }
    .desc { margin:6px 0 0; color:var(--muted); font-size:15px; }
    .meta { display:flex; flex-wrap:wrap; gap:4px 12px; margin:14px 0 0; font-size:13px; color:var(--muted); }
    code { font:13px ui-monospace, Menlo, Consolas, monospace; color:var(--ink); }
    .actions { display:flex; gap:8px; margin-top:auto; padding-top:18px; }
    .btn { display:inline-flex; align-items:center; height:40px; padding:0 18px; border-radius:9px; background:var(--ink); color:var(--bg); border:1px solid var(--ink); font-size:14px; font-weight:600; text-decoration:none; cursor:pointer; }
    .btn.ghost { background:transparent; color:var(--ink); border-color:var(--line); }
    .empty { color:var(--muted); }
    @media (prefers-reduced-motion: reduce) { .cover img { transition:none; } }
    `,
  )
}

// ---------- server ----------

function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'X-Robots-Tag': 'noindex, nofollow', ...headers })
  res.end(body)
}

const html = (res, status, body, headers = {}) =>
  send(res, status, body, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store', ...headers })

function readBody(req, limit = 2048) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (c) => {
      data += c
      if (data.length > limit) reject(new Error('too large'))
    })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

function serveProject(req, res, slug, rest) {
  const dist = path.join(ROOT, slug, 'dist')
  if (SKIP.has(slug) || slug.startsWith('.') || !fs.existsSync(path.join(dist, 'index.html'))) return false

  let rel
  try {
    rel = decodeURIComponent(rest)
  } catch {
    return send(res, 400, 'Bad request'), true
  }
  const file = path.normalize(path.join(dist, rel))
  if (!file.startsWith(dist)) return send(res, 403, 'Forbidden'), true

  let target = file
  if (!fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    // client-side routes (e.g. /ashley-impressions/products/x) fall back to the app shell
    target = path.extname(rel) ? null : path.join(dist, 'index.html')
  }
  if (!target) return send(res, 404, 'Not found'), true

  const ext = path.extname(target).toLowerCase()
  const cache = target.includes(`${path.sep}assets${path.sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache'
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': cache, 'X-Robots-Tag': 'noindex, nofollow' })
  if (req.method === 'HEAD') return res.end(), true
  fs.createReadStream(target).pipe(res)
  return true
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://hub')
  const p = url.pathname
  if (process.env.HUB_LOG === '1') {
    res.on('finish', () => console.log(`${new Date().toISOString().slice(11, 19)} ${req.method} ${req.url} -> ${res.statusCode}${res.getHeader('Location') ? ` ${res.getHeader('Location')}` : ''}  [${(req.headers['user-agent'] || '').slice(0, 60)}]`))
  }

  if (p === '/' && (req.method === 'GET' || req.method === 'HEAD')) {
    if (isAuthed(req)) return html(res, 200, directoryPage(listProjects()))
    return html(res, 200, loginPage({ locked: lockRemaining(clientIp(req)) }))
  }

  if (p === '/login' && req.method === 'POST') {
    const ip = clientIp(req)
    const locked = lockRemaining(ip)
    if (locked) return html(res, 429, loginPage({ locked }))
    let code = ''
    try {
      code = new URLSearchParams(await readBody(req)).get('code') || ''
    } catch {
      return send(res, 413, 'Payload too large')
    }
    if (!codeMatches(code)) {
      recordFailure(ip)
      const nowLocked = lockRemaining(ip)
      return html(res, nowLocked ? 429 : 401, loginPage({ error: "That code isn't right. Try again.", locked: nowLocked }))
    }
    attempts.delete(ip)
    return send(res, 303, '', {
      Location: '/',
      'Set-Cookie': `${COOKIE}=${makeSession()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}${secureFlag(req)}`,
    })
  }

  if (p === '/logout' && req.method === 'POST') {
    return send(res, 303, '', { Location: '/', 'Set-Cookie': `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secureFlag(req)}` })
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    const [, slug, ...restParts] = p.split('/')
    if (slug) {
      // temporary redirect so browsers don't memorise it
      if (restParts.length === 0) return send(res, 302, '', { Location: `/${slug}/`, 'Cache-Control': 'no-store' }) // /name -> /name/
      if (serveProject(req, res, slug, restParts.join('/'))) return
    }
  }

  html(res, 404, page('Not found', '<main style="padding:48px 24px;text-align:center"><h1>Page not found</h1><p>Check the link you were sent.</p></main>'))
})

// Vercel invokes the exported handler; locally, `node hub/server.mjs` starts a server.
export default server.listeners('request')[0]

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  server.listen(PORT, () => {
    console.log(`Preview hub running at http://localhost:${PORT}/  (access code set${process.env.HUB_CODE ? ' via HUB_CODE' : ''})`)
    for (const pr of listProjects()) console.log(`  /${pr.slug}/  ${pr.title}`)
  })
}
