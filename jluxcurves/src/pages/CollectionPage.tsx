import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { typeLabel, type Product } from '../data'
import { Link } from '../router'
import { lockScroll, unlockScroll } from '../scrollLock'
import ProductCard from '../components/ProductCard'
import { CategoryGrid } from '../sections/Home'
import { ChevronDown, ChevronRight, CloseIcon, FilterIcon, MinusIcon, PlusIcon } from '../icons'

type Collection = { handle: string; title: string; copy: string; products: Product[] }

type Filters = { types: string[]; colors: string[]; sizes: string[]; avail: string[]; min: number; max: number }

const SORTS = {
  featured: 'Featured',
  'best-selling': 'Best selling',
  'title-asc': 'Alphabetically, A-Z',
  'title-desc': 'Alphabetically, Z-A',
  'price-asc': 'Price, low to high',
  'price-desc': 'Price, high to low',
  'created-desc': 'Date, new to old',
  'created-asc': 'Date, old to new',
} as const
type Sort = keyof typeof SORTS

const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const AVAIL = { in: 'In stock', out: 'Out of stock' } as const

const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v])
const round2 = (n: number) => Math.round(n * 100) / 100

function sortProducts(list: Product[], sort: Sort, all: Product[]) {
  const order = (p: Product) => all.indexOf(p)
  const out = [...list]
  switch (sort) {
    case 'title-asc': return out.sort((a, b) => a.name.localeCompare(b.name))
    case 'title-desc': return out.sort((a, b) => b.name.localeCompare(a.name))
    case 'price-asc': return out.sort((a, b) => a.price - b.price)
    case 'price-desc': return out.sort((a, b) => b.price - a.price)
    case 'best-selling': return out.sort((a, b) => Number(b.badge === 'Bestseller') - Number(a.badge === 'Bestseller') || order(a) - order(b))
    case 'created-desc': return out.sort((a, b) => order(b) - order(a))
    case 'created-asc':
    case 'featured':
      return out.sort((a, b) => order(a) - order(b))
  }
}

/* ---------- Facets ---------- */

function Facet({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="facet" open>
      <summary>
        {title}
        <span className="acc__plus"><PlusIcon size={16} /></span>
        <span className="acc__minus"><MinusIcon size={16} /></span>
      </summary>
      <div className="facet__body">{children}</div>
    </details>
  )
}

function Check({ label, count, checked, onChange }: { label: string; count: number; checked: boolean; onChange: () => void }) {
  return (
    <label className={`check${count === 0 && !checked ? ' is-empty' : ''}`}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={count === 0 && !checked} />
      <span>{label} ({count})</span>
    </label>
  )
}

// Typed prices stay as typed while editing and are formatted ("71.40") once the field is left.
function PriceInput({ value, label, onCommit }: { value: number; label: string; onCommit: (v: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null)
  const commit = () => {
    if (draft !== null) onCommit(round2(Number(draft.replace(/[^\d.]/g, '')) || 0))
    setDraft(null)
  }
  return (
    <label className="price__field">
      <span>$</span>
      <input
        inputMode="decimal"
        aria-label={label}
        value={draft ?? value.toFixed(2)}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === 'Enter' && commit()}
      />
    </label>
  )
}

function PriceRange({ ceiling, min, max, onChange }: { ceiling: number; min: number; max: number; onChange: (min: number, max: number) => void }) {
  const pct = (v: number) => (ceiling ? (v / ceiling) * 100 : 0)
  const clamp = (v: number) => Math.max(0, Math.min(ceiling, v))
  return (
    <div className="price">
      <div className="price__slider" style={{ '--lo': `${pct(min)}%`, '--hi': `${pct(max)}%` } as CSSProperties}>
        <input type="range" min={0} max={ceiling} step="0.01" value={min} aria-label="Minimum price" onChange={(e) => onChange(Math.min(Number(e.target.value), max), max)} />
        <input type="range" min={0} max={ceiling} step="0.01" value={max} aria-label="Maximum price" onChange={(e) => onChange(min, Math.max(Number(e.target.value), min))} />
      </div>
      <div className="price__fields">
        <PriceInput value={min} label="From price" onCommit={(v) => onChange(Math.min(clamp(v), max), max)} />
        <span>To</span>
        <PriceInput value={max} label="To price" onCommit={(v) => onChange(min, Math.max(clamp(v), min))} />
      </div>
    </div>
  )
}

function FilterPanel({ products, filters, ceiling, set }: { products: Product[]; filters: Filters; ceiling: number; set: (f: Filters) => void }) {
  const [moreColors, setMoreColors] = useState(false)

  const types = Object.entries(typeLabel)
    .map(([kind, label]) => ({ label, count: products.filter((p) => p.kind === kind).length }))
    .filter((t) => t.count > 0)
    .sort((a, b) => a.label.localeCompare(b.label))
  const colors = [...new Map(products.flatMap((p) => p.swatches).map((s) => [s.name, s.color])).entries()]
  const sizes = SIZE_ORDER.map((s) => ({ label: s, count: products.filter((p) => p.sizes.includes(s)).length })).filter((s) => s.count > 0)
  const visibleColors = moreColors ? colors : colors.slice(0, 10)

  return (
    <div className="filters">
      <Facet title="Product type">
        {types.map((t) => (
          <Check key={t.label} label={t.label} count={t.count} checked={filters.types.includes(t.label)} onChange={() => set({ ...filters, types: toggle(filters.types, t.label) })} />
        ))}
      </Facet>
      <Facet title="Price">
        <PriceRange ceiling={ceiling} min={filters.min} max={filters.max} onChange={(min, max) => set({ ...filters, min, max })} />
      </Facet>
      <Facet title="Color">
        <div className="facet__colors">
          {visibleColors.map(([name, color]) => (
            <button
              key={name}
              className={filters.colors.includes(name) ? 'is-active' : undefined}
              style={{ background: color }}
              title={name}
              aria-label={name}
              aria-pressed={filters.colors.includes(name)}
              onClick={() => set({ ...filters, colors: toggle(filters.colors, name) })}
            />
          ))}
        </div>
        {colors.length > 10 && (
          <button className="facet__more" onClick={() => setMoreColors(!moreColors)}>{moreColors ? '− Show less' : '+ Show more'}</button>
        )}
      </Facet>
      <Facet title="Size">
        {sizes.map((s) => (
          <Check key={s.label} label={s.label} count={s.count} checked={filters.sizes.includes(s.label)} onChange={() => set({ ...filters, sizes: toggle(filters.sizes, s.label) })} />
        ))}
      </Facet>
      <Facet title="Availability">
        {(Object.keys(AVAIL) as (keyof typeof AVAIL)[]).map((k) => (
          <Check
            key={k}
            label={AVAIL[k]}
            count={products.filter((p) => (k === 'out' ? p.soldOut : !p.soldOut)).length}
            checked={filters.avail.includes(k)}
            onChange={() => set({ ...filters, avail: toggle(filters.avail, k) })}
          />
        ))}
      </Facet>
    </div>
  )
}

/* ---------- Page ---------- */

export default function CollectionPage({ collection }: { collection: Collection }) {
  const all = collection.products
  const ceiling = round2(Math.max(0, ...all.map((p) => p.price)))
  const empty: Filters = { types: [], colors: [], sizes: [], avail: [], min: 0, max: ceiling }
  const [filters, setFilters] = useState<Filters>(empty)
  const [sort, setSort] = useState<Sort>('title-asc')
  const [drawer, setDrawer] = useState(false)

  useEffect(() => {
    document.title = `${collection.title} – JLuxCurves`
    return () => {
      document.title = 'JLuxCurves'
    }
  }, [collection.title])

  useEffect(() => {
    if (!drawer) return
    lockScroll()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawer(false)
    document.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      document.removeEventListener('keydown', onKey)
    }
  }, [drawer])

  const shown = useMemo(() => {
    const kindOf = (p: Product) => typeLabel[p.kind]
    const list = all.filter(
      (p) =>
        (!filters.types.length || filters.types.includes(kindOf(p))) &&
        (!filters.colors.length || p.swatches.some((s) => filters.colors.includes(s.name))) &&
        (!filters.sizes.length || p.sizes.some((s) => filters.sizes.includes(s))) &&
        (!filters.avail.length || (filters.avail.includes('in') && !p.soldOut) || (filters.avail.includes('out') && !!p.soldOut)) &&
        p.price >= filters.min &&
        p.price <= filters.max,
    )
    return sortProducts(list, sort, all)
  }, [all, filters, sort])

  // Removable chips for everything that is filtering right now.
  const chips = [
    ...filters.types.map((v) => ({ label: v, clear: () => setFilters({ ...filters, types: toggle(filters.types, v) }) })),
    ...filters.colors.map((v) => ({ label: v, clear: () => setFilters({ ...filters, colors: toggle(filters.colors, v) }) })),
    ...filters.sizes.map((v) => ({ label: `Size ${v}`, clear: () => setFilters({ ...filters, sizes: toggle(filters.sizes, v) }) })),
    ...filters.avail.map((v) => ({ label: AVAIL[v as keyof typeof AVAIL], clear: () => setFilters({ ...filters, avail: toggle(filters.avail, v) }) })),
    ...(filters.min > 0 || filters.max < ceiling
      ? [{ label: `$${filters.min.toFixed(2)} – $${filters.max.toFixed(2)}`, clear: () => setFilters({ ...filters, min: 0, max: ceiling }) }]
      : []),
  ]
  const clearAll = () => setFilters(empty)
  const count = (n: number) => `${n} product${n === 1 ? '' : 's'}`

  return (
    <div className="container coll">
      <nav className="crumbs crumbs--center" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={12} />
        <span aria-current="page">{collection.title}</span>
      </nav>

      <CategoryGrid className="cats__grid--contained" />

      <header className="coll__head">
        <h1 className="coll__title">{collection.title}</h1>
        <p>{collection.copy}</p>
      </header>

      <div className="coll__body">
        <aside className="coll__side" aria-label="Filters">
          <FilterPanel products={all} filters={filters} ceiling={ceiling} set={setFilters} />
        </aside>

        <div className="coll__main">
          <div className="coll__bar">
            <button className="coll__filter-btn" onClick={() => setDrawer(true)}>
              <FilterIcon /> Filter{chips.length ? ` (${chips.length})` : ''}
            </button>
            <p className="coll__count">{count(shown.length)}</p>
            <label className="sort">
              <span className="sr-only">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                {Object.entries(SORTS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              <ChevronDown size={12} />
            </label>
          </div>

          {chips.length > 0 && (
            <div className="chips">
              {chips.map((c) => (
                <button key={c.label} className="chip" onClick={c.clear}>
                  {c.label} <CloseIcon size={14} />
                </button>
              ))}
              <button className="chips__clear" onClick={clearAll}>Remove all</button>
            </div>
          )}

          {shown.length ? (
            <div className="coll__grid">
              {shown.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="coll__empty">
              {all.length ? (
                <>
                  <p className="coll__empty-title">No products match those filters</p>
                  <button className="btn coll__empty-btn" onClick={clearAll}>Clear filters</button>
                </>
              ) : (
                <>
                  <p className="coll__empty-title">This collection is coming soon</p>
                  <Link href="/collections/all" className="btn coll__empty-btn">Shop all</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Phones and tablets: filters slide in from the left */}
      <div className={`fdrawer${drawer ? ' is-open' : ''}`} aria-hidden={!drawer} inert={!drawer}>
        <div className="fdrawer__backdrop" onClick={() => setDrawer(false)} />
        <div className="fdrawer__panel" role="dialog" aria-label="Filters">
          <div className="fdrawer__head">
            <p className="fdrawer__title">Filter</p>
            <button className="icon-btn" aria-label="Close filters" onClick={() => setDrawer(false)}><CloseIcon /></button>
          </div>
          <div className="fdrawer__scroll">
            <FilterPanel products={all} filters={filters} ceiling={ceiling} set={setFilters} />
          </div>
          <div className="fdrawer__foot">
            <button className="btn fdrawer__clear" onClick={clearAll}>Clear all</button>
            <button className="btn fdrawer__apply" onClick={() => setDrawer(false)}>View {count(shown.length)}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
