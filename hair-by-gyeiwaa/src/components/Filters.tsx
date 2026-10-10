import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ALL_LENGTHS, LENGTH_LANDMARKS, type Product, type ProductType, type Texture } from '../data'
import { CloseIcon } from '../icons'

// ---------- state ----------

export type PriceBand = 'under-2500' | '2500-5000' | 'over-5000'
export type Filters = { types: ProductType[]; textures: Texture[]; length: number | null; price: PriceBand | null; inStock: boolean }
export const emptyFilters: Filters = { types: [], textures: [], length: null, price: null, inStock: false }

const PRICE_BANDS: { id: PriceBand; label: string; test: (n: number) => boolean }[] = [
  { id: 'under-2500', label: 'Under GH₵2,500', test: (n) => n < 2500 },
  { id: '2500-5000', label: 'GH₵2,500 to GH₵5,000', test: (n) => n >= 2500 && n <= 5000 },
  { id: 'over-5000', label: 'Over GH₵5,000', test: (n) => n > 5000 },
]

export const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'best', label: 'Best selling' },
  { id: 'new', label: 'Newest' },
  { id: 'price-asc', label: 'Price, low to high' },
  { id: 'price-desc', label: 'Price, high to low' },
  { id: 'az', label: 'Name, A to Z' },
] as const
export type SortId = (typeof SORTS)[number]['id']

type Group = keyof Filters

function matches(pr: Product, f: Filters, skip?: Group) {
  return (
    (skip === 'types' || !f.types.length || f.types.includes(pr.type)) &&
    (skip === 'textures' || !f.textures.length || f.textures.includes(pr.texture)) &&
    (skip === 'length' || f.length === null || pr.lengths.includes(f.length)) &&
    (skip === 'price' || f.price === null || PRICE_BANDS.find((b) => b.id === f.price)!.test(pr.basePrice)) &&
    (skip === 'inStock' || !f.inStock || pr.tag !== 'Sold out')
  )
}

const sorters: Record<SortId, (a: Product, b: Product) => number> = {
  featured: () => 0,
  best: (a, b) => b.sales - a.sales,
  new: (a, b) => a.added - b.added,
  'price-asc': (a, b) => a.basePrice - b.basePrice,
  'price-desc': (a, b) => b.basePrice - a.basePrice,
  az: (a, b) => a.name.localeCompare(b.name),
}

export function useListing(base: Product[]) {
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [sort, setSort] = useState<SortId>('featured')
  const visible = useMemo(() => base.filter((pr) => matches(pr, filters)).sort(sorters[sort]), [base, filters, sort])
  return { filters, setFilters, sort, setSort, visible, reset: () => setFilters(emptyFilters) }
}

// ---------- strand glyphs for textures ----------

const STRANDS: Record<Texture, { amp: number; waves: number; kinky?: boolean }> = {
  Straight: { amp: 0, waves: 0 },
  'Loose wave': { amp: 2.5, waves: 1.5 },
  'Body wave': { amp: 3.5, waves: 2.5 },
  'Deep wave': { amp: 4, waves: 4 },
  Curly: { amp: 4.5, waves: 6 },
  'Kinky curly': { amp: 4, waves: 9, kinky: true },
}

function Strand({ texture }: { texture: Texture }) {
  const { amp, waves, kinky } = STRANDS[texture]
  const pts: string[] = []
  for (let i = 0; i <= 80; i++) {
    const t = i / 80
    const phase = waves * t
    const wave = kinky ? (2 * Math.abs(2 * (phase - Math.floor(phase + 0.5)))) - 1 : Math.sin(2 * Math.PI * phase)
    pts.push(`${(9 + amp * wave).toFixed(2)},${(3 + t * 42).toFixed(2)}`)
  }
  return (
    <svg width="18" height="48" viewBox="0 0 18 48" aria-hidden="true">
      <polyline points={pts.join(' ')} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ---------- groups ----------

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="fgroup">
      <legend className="fgroup__title">{title}</legend>
      {children}
    </fieldset>
  )
}

function LengthRuler({ value, counts, onChange }: { value: number | null; counts: Record<number, number>; onChange: (l: number | null) => void }) {
  const fill = value === null ? 0 : ((ALL_LENGTHS.indexOf(value) + 0.5) / ALL_LENGTHS.length) * 100
  return (
    <div className="ruler">
      <span className="ruler__strand" style={{ height: `${fill}%` }} aria-hidden="true" />
      <ul>
        {ALL_LENGTHS.map((l) => {
          const landmark = LENGTH_LANDMARKS.find((m) => m.at === l)
          const on = value === l
          const count = counts[l] ?? 0
          return (
            <li key={l}>
              <button
                className={`ruler__row${on ? ' is-on' : ''}${value !== null && l < value ? ' is-above' : ''}`}
                aria-pressed={on}
                aria-label={`${l} inches${landmark ? `, ${landmark.label.toLowerCase()} length` : ''}, ${count} ${count === 1 ? 'style' : 'styles'}`}
                disabled={count === 0 && !on}
                onClick={() => onChange(on ? null : l)}
              >
                <span className="ruler__len">{l}″</span>
                <span className={`ruler__tick${landmark ? ' is-major' : ''}`} aria-hidden="true" />
                <span className="ruler__mark">{landmark?.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function FilterPanel({ base, filters, onChange }: { base: Product[]; filters: Filters; onChange: (f: Filters) => void }) {
  const types = [...new Set(base.map((p) => p.type))]
  const textures = (Object.keys(STRANDS) as Texture[]).filter((t) => base.some((p) => p.texture === t))
  const count = (skip: Group, test: (p: Product) => boolean) => base.filter((p) => matches(p, filters, skip) && test(p)).length
  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v])

  const lengthCounts = Object.fromEntries(ALL_LENGTHS.map((l) => [l, count('length', (p) => p.lengths.includes(l))]))

  return (
    <div className="filters">
      <Group title="Length">
        <p className="fgroup__hint">Measured from the root, worn straight.</p>
        <LengthRuler value={filters.length} counts={lengthCounts} onChange={(length) => onChange({ ...filters, length })} />
      </Group>

      {textures.length > 1 && (
        <Group title="Texture">
          <div className="strands">
            {textures.map((t) => {
              const on = filters.textures.includes(t)
              const n = count('textures', (p) => p.texture === t)
              return (
                <button
                  key={t}
                  className={`strand${on ? ' is-on' : ''}`}
                  aria-pressed={on}
                  disabled={n === 0 && !on}
                  onClick={() => onChange({ ...filters, textures: toggle(filters.textures, t) })}
                >
                  <Strand texture={t} />
                  <span className="strand__name">{t}</span>
                  <span className="strand__count">{n}</span>
                </button>
              )
            })}
          </div>
        </Group>
      )}

      {types.length > 1 && (
        <Group title="Category">
          <ul className="checks">
            {types.map((t) => (
              <li key={t}>
                <label className="check">
                  <input type="checkbox" checked={filters.types.includes(t)} onChange={() => onChange({ ...filters, types: toggle(filters.types, t) })} />
                  <span>{t}</span>
                  <span className="check__count">{count('types', (p) => p.type === t)}</span>
                </label>
              </li>
            ))}
          </ul>
        </Group>
      )}

      <Group title="Price">
        <div className="bands">
          {PRICE_BANDS.map((b) => {
            const on = filters.price === b.id
            return (
              <button key={b.id} className={`band${on ? ' is-on' : ''}`} aria-pressed={on} onClick={() => onChange({ ...filters, price: on ? null : b.id })}>
                {b.label}
              </button>
            )
          })}
        </div>
      </Group>

      <Group title="Availability">
        <label className="switch">
          <input type="checkbox" checked={filters.inStock} onChange={(e) => onChange({ ...filters, inStock: e.target.checked })} />
          <span className="switch__track" aria-hidden="true" />
          <span>Hide sold out</span>
        </label>
      </Group>
    </div>
  )
}

// ---------- toolbar pieces ----------

export function ActiveFilters({ filters, onChange, onReset }: { filters: Filters; onChange: (f: Filters) => void; onReset: () => void }) {
  const chips: { label: string; remove: () => Filters }[] = [
    ...(filters.length !== null ? [{ label: `${filters.length}″`, remove: () => ({ ...filters, length: null }) }] : []),
    ...filters.textures.map((t) => ({ label: t, remove: () => ({ ...filters, textures: filters.textures.filter((x) => x !== t) }) })),
    ...filters.types.map((t) => ({ label: t, remove: () => ({ ...filters, types: filters.types.filter((x) => x !== t) }) })),
    ...(filters.price ? [{ label: PRICE_BANDS.find((b) => b.id === filters.price)!.label, remove: () => ({ ...filters, price: null }) }] : []),
    ...(filters.inStock ? [{ label: 'In stock', remove: () => ({ ...filters, inStock: false }) }] : []),
  ]
  if (!chips.length) return null
  return (
    <div className="chips">
      {chips.map((c) => (
        <button key={c.label} className="chip" onClick={() => onChange(c.remove())} aria-label={`Remove filter: ${c.label}`}>
          {c.label}
          <CloseIcon size={13} />
        </button>
      ))}
      <button className="chips__clear" onClick={onReset}>Clear all</button>
    </div>
  )
}

export function SortSelect({ sort, onChange }: { sort: SortId; onChange: (s: SortId) => void }) {
  return (
    <label className="sort">
      <span className="sort__label">Sort</span>
      <select value={sort} onChange={(e) => onChange(e.target.value as SortId)}>
        {SORTS.map((s) => (
          <option key={s.id} value={s.id}>{s.label}</option>
        ))}
      </select>
    </label>
  )
}

export function FilterDrawer({ open, onClose, resultCount, children }: { open: boolean; onClose: () => void; resultCount: number; children: ReactNode }) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div className={`fdrawer${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <div className="fdrawer__backdrop" onClick={onClose} />
      <aside className="fdrawer__panel" role="dialog" aria-modal="true" aria-label="Filters">
        <div className="fdrawer__head">
          <p className="fdrawer__title">Filter</p>
          <button className="icon-btn" aria-label="Close filters" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="fdrawer__body">{children}</div>
        <div className="fdrawer__foot">
          <button className="btn btn--solid btn--block" onClick={onClose}>
            Show {resultCount} {resultCount === 1 ? 'style' : 'styles'}
          </button>
        </div>
      </aside>
    </div>
  )
}
