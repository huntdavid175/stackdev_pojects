import { useCallback, useState } from 'react'
import type { Product } from '../data'
import ProductCard from './ProductCard'
import { ActiveFilters, FilterDrawer, FilterPanel, SortSelect, useListing } from './Filters'

export default function Listing({ base }: { base: Product[] }) {
  const view = useListing(base)
  const [drawer, setDrawer] = useState(false)
  const close = useCallback(() => setDrawer(false), [])
  const n = view.visible.length
  const panel = <FilterPanel base={base} filters={view.filters} onChange={view.setFilters} />

  return (
    <div className="listing container">
      <aside className="listing__filters" aria-label="Filters">{panel}</aside>

      <div className="listing__main">
        <div className="toolbar">
          <button className="btn btn--outline btn--small toolbar__filter" onClick={() => setDrawer(true)}>Filter</button>
          <p className="toolbar__count" aria-live="polite">
            {n} {n === 1 ? 'style' : 'styles'}
          </p>
          <SortSelect sort={view.sort} onChange={view.setSort} />
        </div>
        <ActiveFilters filters={view.filters} onChange={view.setFilters} onReset={view.reset} />

        {n ? (
          <ul className="pgrid pgrid--three">
            {view.visible.map((p) => (
              <li key={p.id}><ProductCard product={p} length={view.filters.length} /></li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p className="display-italic empty__title">Nothing matches yet</p>
            <p>No styles fit every filter you've chosen. Remove one, or pick a different length.</p>
            <button className="btn btn--outline btn--small" onClick={view.reset}>Clear all filters</button>
          </div>
        )}
      </div>

      <FilterDrawer open={drawer} onClose={close} resultCount={n}>{panel}</FilterDrawer>
    </div>
  )
}
