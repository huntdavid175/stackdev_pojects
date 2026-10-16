import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  SIZES,
  SORTS,
  applyFilters,
  emptyFilters,
  sortProducts,
  type Filters,
  type Product,
  type ProductType,
  type SortId,
} from '../catalog'
import { ChevronDown, CloseIcon } from '../icons'
import { lockScroll, unlockScroll } from '../scrollLock'

// ---- state hook shared by the collection + shop-all pages ----

export function useCollectionView(base: Product[]) {
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [sort, setSort] = useState<SortId>('featured')
  const visible = useMemo(() => sortProducts(applyFilters(base, filters), sort), [base, filters, sort])
  const active = filters.types.length + filters.sizes.length + (filters.min > 0 || filters.max !== null ? 1 : 0)
  return { filters, setFilters, sort, setSort, visible, active, reset: () => setFilters(emptyFilters) }
}

// ---- type icons ----

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round', strokeLinecap: 'round' } as const

const typeIcons: Record<ProductType, ReactNode> = {
  Serums: (
    <svg width="44" height="76" viewBox="0 0 44 76" {...stroke}>
      <path d="M18 4h8v14h-8zM15 18h14v10H15zM12 28h20a2 2 0 0 1 2 2v40a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V30a2 2 0 0 1 2-2zM10 44h24M10 62h24" />
    </svg>
  ),
  Toners: (
    <svg width="44" height="76" viewBox="0 0 44 76" {...stroke}>
      <path d="M15 4h14v8H15zM13 12h18M11 16c0-2 2-4 4-4h14c2 0 4 2 4 4v54a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2zM11 30h22M11 60h22" />
    </svg>
  ),
  'Body & Hands': (
    <svg width="48" height="76" viewBox="0 0 48 76" {...stroke}>
      <path d="M16 4h12M22 4v10M28 4c4 0 8 2 10 6M17 14h10v10H17zM14 24h16v6H14zM12 36c0-3 2-6 5-6h10c3 0 5 3 5 6v34a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2z" />
    </svg>
  ),
  Moisturizer: (
    <svg width="60" height="64" viewBox="0 0 60 64" {...stroke}>
      <path d="M10 28h40v28a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4zM10 40h40M12 28v-6c0-2 2-4 4-4h28c2 0 4 2 4 4v6M18 18c2-6 8-10 14-10s10 3 10 8" />
    </svg>
  ),
  Cleansers: (
    <svg width="44" height="76" viewBox="0 0 44 76" {...stroke}>
      <path d="M17 4h10l6 4M22 4v8M16 12h12v8H16zM12 26c0-3 2-6 5-6h10c3 0 5 3 5 6v44a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2zM12 40h20M12 62h20" />
    </svg>
  ),
  Masks: (
    <svg width="44" height="76" viewBox="0 0 44 76" {...stroke}>
      <path d="M10 4h24l-4 54H14zM14 58h16v6H14zM17 64h10v8H17zM12 18h20" />
    </svg>
  ),
  Supplements: (
    <svg width="48" height="76" viewBox="0 0 48 76" {...stroke}>
      <path d="M12 6h24v12H12zM10 18h28a2 2 0 0 1 2 2v50a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V20a2 2 0 0 1 2-2zM8 32h32M8 58h32M20 42h8a3 3 0 0 1 0 6h-8a3 3 0 0 1 0-6z" />
    </svg>
  ),
}

// ---- panel ----

function Section({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="filter-section">
      <h3>
        <button className="filter-section__toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
          {title}
          <span className="filter-section__icon" aria-hidden="true">{open ? '–' : '+'}</span>
        </button>
      </h3>
      <div className={`filter-section__body${open ? ' is-open' : ''}`}>
        <div>{children}</div>
      </div>
    </div>
  )
}

function PriceRange({ bound, filters, onChange }: { bound: number; filters: Filters; onChange: (f: Filters) => void }) {
  const max = filters.max ?? bound
  const [minText, setMinText] = useState(String(filters.min))
  const [maxText, setMaxText] = useState(String(max))

  useEffect(() => setMinText(String(filters.min)), [filters.min])
  useEffect(() => setMaxText(String(max)), [max])

  const setMin = (v: number) => onChange({ ...filters, min: Math.max(0, Math.min(v, max)) })
  const setMax = (v: number) => {
    const clamped = Math.min(bound, Math.max(v, filters.min))
    onChange({ ...filters, max: clamped >= bound ? null : clamped })
  }

  return (
    <div className="price-range">
      <div className="price-range__slider">
        <span className="price-range__fill" style={{ left: `${(filters.min / bound) * 100}%`, right: `${100 - (max / bound) * 100}%` }} />
        <input type="range" min={0} max={bound} step={1} value={filters.min} aria-label="Minimum price" onChange={(e) => setMin(Number(e.target.value))} />
        <input type="range" min={0} max={bound} step={1} value={max} aria-label="Maximum price" onChange={(e) => setMax(Number(e.target.value))} />
      </div>
      <div className="price-range__inputs">
        <label>
          <span aria-hidden="true">GH₵</span>
          <span className="sr-only">From</span>
          <input
            inputMode="decimal"
            value={minText}
            onChange={(e) => setMinText(e.target.value)}
            onBlur={() => setMin(Number(minText) || 0)}
            onKeyDown={(e) => e.key === 'Enter' && setMin(Number(minText) || 0)}
          />
        </label>
        <span>To</span>
        <label>
          <span aria-hidden="true">GH₵</span>
          <span className="sr-only">To</span>
          <input
            inputMode="decimal"
            value={maxText}
            onChange={(e) => setMaxText(e.target.value)}
            onBlur={() => setMax(Number(maxText) || bound)}
            onKeyDown={(e) => e.key === 'Enter' && setMax(Number(maxText) || bound)}
          />
        </label>
      </div>
    </div>
  )
}

export function FilterPanel({ base, filters, onChange }: { base: Product[]; filters: Filters; onChange: (f: Filters) => void }) {
  const types = useMemo(() => [...new Set(base.map((p) => p.type))], [base])
  const bound = useMemo(() => Math.ceil(Math.max(...base.map((p) => p.price))), [base])
  const forTypes = applyFilters(base, filters, 'types')
  const forSizes = applyFilters(base, filters, 'sizes')
  const sizes = SIZES.filter((s) => base.some((p) => p.sizes.includes(s)))

  const toggle = <K extends 'types' | 'sizes'>(key: K, value: Filters[K][number]) => {
    const list = filters[key] as string[]
    onChange({ ...filters, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] })
  }

  return (
    <div className="filters">
      <Section title="Product type">
        <ul className="type-grid">
          {types.map((t) => {
            const on = filters.types.includes(t)
            return (
              <li key={t}>
                <button className={`type-tile${on ? ' is-active' : ''}`} aria-pressed={on} onClick={() => toggle('types', t)}>
                  <span className="type-tile__icon" aria-hidden="true">{typeIcons[t]}</span>
                  {t} ({forTypes.filter((p) => p.type === t).length})
                </button>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section title="Price">
        <PriceRange bound={bound} filters={filters} onChange={onChange} />
      </Section>

      <Section title="Size">
        <ul className="size-list">
          {sizes.map((s) => (
            <li key={s}>
              <label className="check">
                <input type="checkbox" checked={filters.sizes.includes(s)} onChange={() => toggle('sizes', s)} />
                <span>
                  {s} ({forSizes.filter((p) => p.sizes.includes(s)).length})
                </span>
              </label>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}

export function SortSelect({ sort, onChange }: { sort: SortId; onChange: (s: SortId) => void }) {
  return (
    <label className="sort-select">
      <span className="sr-only">Sort by</span>
      <select value={sort} onChange={(e) => onChange(e.target.value as SortId)}>
        {SORTS.map((s) => (
          <option key={s.id} value={s.id}>{s.label}</option>
        ))}
      </select>
      <ChevronDown size={16} />
    </label>
  )
}

export function FilterButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button className="filter-btn" onClick={onClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" {...stroke} strokeWidth={1.6} aria-hidden="true">
        <path d="M5 3v18M12 3v18M19 3v18M2.5 8h5M9.5 15h5M16.5 10h5" />
      </svg>
      Filter &amp; sort
      {count > 0 && <span className="filter-btn__count">{count}</span>}
    </button>
  )
}

export function FilterDrawer(props: {
  open: boolean
  onClose: () => void
  base: Product[]
  filters: Filters
  onChange: (f: Filters) => void
  sort: SortId
  onSort: (s: SortId) => void
  resultCount: number
  onReset: () => void
}) {
  const { open, onClose } = props

  useEffect(() => {
    if (!open) return
    lockScroll()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div className={`fdrawer${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <div className="fdrawer__backdrop" onClick={onClose} />
      <aside className="fdrawer__panel" role="dialog" aria-modal="true" aria-labelledby="fdrawer-title">
        <div className="fdrawer__head">
          <h2 id="fdrawer-title" className="fdrawer__title">Filter &amp; sort</h2>
          <button className="icon-btn" aria-label="Close filters" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="fdrawer__body">
          <div className="fdrawer__sort">
            <p className="filter-section__label">Sort by</p>
            <SortSelect sort={props.sort} onChange={props.onSort} />
          </div>
          <FilterPanel base={props.base} filters={props.filters} onChange={props.onChange} />
        </div>
        <div className="fdrawer__foot">
          <button className="btn-pill btn-pill--sand" onClick={props.onReset}>Clear all</button>
          <button className="btn-pill btn-pill--dark" onClick={onClose}>
            Show {props.resultCount} {props.resultCount === 1 ? 'product' : 'products'}
          </button>
        </div>
      </aside>
    </div>
  )
}

export function EmptyResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="empty-results">
      <p className="empty-results__title">No products match these filters</p>
      <p>Remove a filter or widen the price range to see more.</p>
      <button className="btn-pill btn-pill--dark" onClick={onReset}>Clear filters</button>
    </div>
  )
}
