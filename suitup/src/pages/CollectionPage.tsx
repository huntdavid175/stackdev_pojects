import { useEffect, useMemo, useState } from 'react'
import { img } from '../asset'
import { collections, handle, money, type Product } from '../data'
import { Link } from '../router'
import { lockScroll, unlockScroll } from '../scrollLock'
import ProductCard from '../components/ProductCard'
import { ChevronLeft, ChevronRight, CloseIcon, FilterIcon } from '../icons'

type Collection = { handle: string; title: string; products: Product[] }

const PER_PAGE = 6
const SORTS = {
  featured: 'Featured',
  'best-selling': 'Best selling',
  'title-asc': 'Alphabetically, A-Z',
  'title-desc': 'Alphabetically, Z-A',
  'price-asc': 'Price, low to high',
  'price-desc': 'Price, high to low',
} as const
type Sort = keyof typeof SORTS
type Filters = { inStock: boolean; onSale: boolean; organic: boolean; min: string; max: string }
const EMPTY: Filters = { inStock: false, onSale: false, organic: false, min: '', max: '' }

function sortList(list: Product[], sort: Sort, all: Product[]) {
  const out = [...list]
  if (sort === 'title-asc') out.sort((a, b) => a.name.localeCompare(b.name))
  if (sort === 'title-desc') out.sort((a, b) => b.name.localeCompare(a.name))
  if (sort === 'price-asc') out.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') out.sort((a, b) => b.price - a.price)
  if (sort === 'best-selling') out.sort((a, b) => b.badges.length - a.badges.length || all.indexOf(a) - all.indexOf(b))
  return out
}

export default function CollectionPage({ collection }: { collection: Collection }) {
  const [filters, setFilters] = useState<Filters>(EMPTY)
  const [sort, setSort] = useState<Sort>('featured')
  const [page, setPage] = useState(1)
  const [panel, setPanel] = useState(false)

  useEffect(() => {
    document.title = `${collection.title} – SuitUp`
    return () => {
      document.title = 'SuitUp'
    }
  }, [collection.title])

  useEffect(() => {
    if (!panel) return
    lockScroll()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPanel(false)
    document.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      document.removeEventListener('keydown', onKey)
    }
  }, [panel])

  const shown = useMemo(() => {
    const min = Number(filters.min) || 0
    const max = Number(filters.max) || Infinity
    const list = collection.products.filter(
      (p) =>
        (!filters.onSale || p.compareAt) &&
        (!filters.organic || p.badges.includes('organic')) &&
        p.price >= min &&
        p.price <= max,
    )
    return sortList(list, sort, collection.products)
  }, [collection.products, filters, sort])

  const pages = Math.max(1, Math.ceil(shown.length / PER_PAGE))
  const current = Math.min(page, pages)
  const pageItems = shown.slice((current - 1) * PER_PAGE, current * PER_PAGE)
  const active = (filters.onSale ? 1 : 0) + (filters.organic ? 1 : 0) + (filters.inStock ? 1 : 0) + (filters.min || filters.max ? 1 : 0)
  const update = (f: Filters) => {
    setFilters(f)
    setPage(1)
  }
  const goPage = (n: number) => {
    setPage(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // the other collections, as tiles above the grid (the current one is left out)
  const order = ['Suits', 'Evening Wear', 'Shirts', 'Knitwear', 'Three-Piece Suits', 'Trousers']
  const tiles = order
    .map((t) => collections.find((c) => c.title === t)!)
    .filter((c) => handle(c.title) !== collection.handle)
    .slice(0, 4)

  return (
    <div className="coll">
      <div className="coll__tiles">
        {tiles.map((c) => (
          <Link key={c.title} href={`/collections/${handle(c.title)}`} className="tile tile--small">
            <img src={img(c.image)} alt="" loading="lazy" />
            <span>{c.title}</span>
          </Link>
        ))}
      </div>

      <h1 className="coll__title">{collection.title}</h1>

      <div className="coll__bar">
        <button className="coll__filter" onClick={() => setPanel(true)}>
          <FilterIcon /> Filter and sort{active ? ` (${active})` : ''}
        </button>
        <p>{shown.length} {shown.length === 1 ? 'product' : 'products'}</p>
      </div>

      {pageItems.length ? (
        <div className="coll__grid">
          {pageItems.map((p) => <ProductCard key={p.id} product={p} list />)}
        </div>
      ) : (
        <div className="coll__empty">
          <p>{collection.products.length ? 'No products match those filters.' : `${collection.title} are landing soon.`}</p>
          {collection.products.length ? (
            <button className="btn btn--outline" onClick={() => update(EMPTY)}>Clear filters</button>
          ) : (
            <Link href="/collections/suits" className="btn btn--outline">Shop suits</Link>
          )}
        </div>
      )}

      {pages > 1 && (
        <nav className="pager" aria-label="Pagination">
          {current > 1 && <button aria-label="Previous page" onClick={() => goPage(current - 1)}><ChevronLeft size={16} /></button>}
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button key={n} className={n === current ? 'is-active' : undefined} aria-current={n === current ? 'page' : undefined} onClick={() => goPage(n)}>
              {n}
            </button>
          ))}
          {current < pages && <button aria-label="Next page" onClick={() => goPage(current + 1)}><ChevronRight size={16} /></button>}
        </nav>
      )}

      <div className={`fpanel${panel ? ' is-open' : ''}`} aria-hidden={!panel} inert={!panel}>
        <div className="fpanel__backdrop" onClick={() => setPanel(false)} />
        <div className="fpanel__body" role="dialog" aria-label="Filter and sort">
          <div className="fpanel__head">
            <h2>Filter and sort</h2>
            <button className="icon-btn" aria-label="Close" onClick={() => setPanel(false)}><CloseIcon /></button>
          </div>
          <div className="fpanel__scroll">
            <fieldset>
              <legend>Sort by</legend>
              {(Object.keys(SORTS) as Sort[]).map((k) => (
                <label key={k} className="fcheck">
                  <input type="radio" name="sort" checked={sort === k} onChange={() => setSort(k)} />
                  {SORTS[k]}
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Availability</legend>
              <label className="fcheck">
                <input type="checkbox" checked={filters.inStock} onChange={(e) => update({ ...filters, inStock: e.target.checked })} />
                In stock ({collection.products.length})
              </label>
            </fieldset>
            <fieldset>
              <legend>Product</legend>
              <label className="fcheck">
                <input type="checkbox" checked={filters.onSale} onChange={(e) => update({ ...filters, onSale: e.target.checked })} />
                On sale ({collection.products.filter((p) => p.compareAt).length})
              </label>
              <label className="fcheck">
                <input type="checkbox" checked={filters.organic} onChange={(e) => update({ ...filters, organic: e.target.checked })} />
                Organic ({collection.products.filter((p) => p.badges.includes('organic')).length})
              </label>
            </fieldset>
            <fieldset>
              <legend>Price</legend>
              <div className="fprice">
                <label>GH₵ <input inputMode="numeric" placeholder="0" value={filters.min} onChange={(e) => update({ ...filters, min: e.target.value.replace(/\D/g, '') })} aria-label="Minimum price" /></label>
                <span>to</span>
                <label>GH₵ <input inputMode="numeric" placeholder={String(Math.max(0, ...collection.products.map((p) => p.price)))} value={filters.max} onChange={(e) => update({ ...filters, max: e.target.value.replace(/\D/g, '') })} aria-label="Maximum price" /></label>
              </div>
              <p className="fprice__hint">Highest price is {money(Math.max(0, ...collection.products.map((p) => p.price)))}</p>
            </fieldset>
          </div>
          <div className="fpanel__foot">
            <button className="btn btn--outline" onClick={() => update(EMPTY)}>Clear all</button>
            <button className="btn btn--coral" onClick={() => setPanel(false)}>Show {shown.length} {shown.length === 1 ? 'product' : 'products'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
