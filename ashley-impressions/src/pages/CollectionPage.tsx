import { useCallback, useMemo, useState } from 'react'
import { Link } from '../router'
import { findCollection, productsIn } from '../catalog'
import ProductCard from '../components/ProductCard'
import { EmptyResults, FilterButton, FilterDrawer, FilterPanel, SortSelect, useCollectionView } from '../components/Filters'
import { img } from '../asset'

export default function CollectionPage({ handle }: { handle: string }) {
  const collection = findCollection(handle)!
  const base = useMemo(() => productsIn(collection), [collection])
  const view = useCollectionView(base)
  const [drawer, setDrawer] = useState(false)
  const close = useCallback(() => setDrawer(false), [])

  return (
    <>
      <nav className="breadcrumbs breadcrumbs--center" aria-label="Breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/collections/all">Shop all</Link></li>
          <li aria-current="page">{collection.title}</li>
        </ol>
      </nav>

      <div className="container">
        <header className="col-banner">
          <img src={img(collection.banner)} alt="" />
          <div className="col-banner__body">
            <h1 className="col-banner__title">{collection.title}</h1>
            <p>{collection.description}</p>
          </div>
        </header>

        <div className="col-layout">
          <aside className="col-layout__filters" aria-label="Filters">
            <FilterPanel base={base} filters={view.filters} onChange={view.setFilters} />
          </aside>

          <div>
            <div className="col-toolbar">
              <div className="col-toolbar__mobile">
                <FilterButton count={view.active} onClick={() => setDrawer(true)} />
              </div>
              <p className="col-toolbar__count" aria-live="polite">
                {view.visible.length} {view.visible.length === 1 ? 'product' : 'products'}
              </p>
              <SortSelect sort={view.sort} onChange={view.setSort} />
            </div>

            {view.visible.length ? (
              <ul className="col-grid">
                {view.visible.map((p) => (
                  <li key={p.id}><ProductCard product={p} /></li>
                ))}
              </ul>
            ) : (
              <EmptyResults onReset={view.reset} />
            )}
          </div>
        </div>
      </div>

      <FilterDrawer
        open={drawer}
        onClose={close}
        base={base}
        filters={view.filters}
        onChange={view.setFilters}
        sort={view.sort}
        onSort={view.setSort}
        resultCount={view.visible.length}
        onReset={view.reset}
      />
    </>
  )
}
