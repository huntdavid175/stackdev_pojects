import { useCallback, useState } from 'react'
import { Link } from '../router'
import { SHOP_ALL, collectionUrl, products } from '../catalog'
import ProductCard from '../components/ProductCard'
import { EmptyResults, FilterButton, FilterDrawer, SortSelect, useCollectionView } from '../components/Filters'
import { ArrowRight } from '../icons'
import { img } from '../asset'

const tiles = [
  { title: 'Masks', handle: 'masks', img: 'ig-2.jpg' },
  { title: 'Serums', handle: 'serums', img: 'promo-summer.jpg' },
  { title: 'Hands & Body', handle: 'body-hands', img: 'menu-col-1.jpg' },
  { title: 'Cleansers', handle: 'cleansers', img: 'promo-resilient.jpg' },
  { title: 'Toners', handle: 'toners', img: 'ig-6.jpg' },
]

export default function ShopAllPage() {
  const view = useCollectionView(products)
  const [drawer, setDrawer] = useState(false)
  const close = useCallback(() => setDrawer(false), [])

  return (
    <>
      <nav className="breadcrumbs breadcrumbs--center" aria-label="Breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li aria-current="page">Shop All</li>
        </ol>
      </nav>

      <div className="container container--wide">
        <ul className="shop-tiles">
          {tiles.map((t) => (
            <li key={t.handle}>
              <Link href={collectionUrl(t.handle)} className="shop-tile">
                <img src={img(t.img)} alt="" />
                <span className="shop-tile__label">{t.title}</span>
                <span className="shop-tile__arrow" aria-hidden="true"><ArrowRight size={18} /></span>
              </Link>
            </li>
          ))}
        </ul>

        <header className="shop-intro">
          <h1 className="h2">{SHOP_ALL.title}</h1>
          <p>{SHOP_ALL.description}</p>
        </header>

        <div className="col-toolbar">
          <FilterButton count={view.active} onClick={() => setDrawer(true)} />
          <p className="col-toolbar__count col-toolbar__count--right" aria-live="polite">
            {view.visible.length} {view.visible.length === 1 ? 'product' : 'products'}
          </p>
          <SortSelect sort={view.sort} onChange={view.setSort} />
        </div>

        {view.visible.length ? (
          <ul className="col-grid col-grid--wide">
            {view.visible.map((p) => (
              <li key={p.id}><ProductCard product={p} /></li>
            ))}
          </ul>
        ) : (
          <EmptyResults onReset={view.reset} />
        )}
      </div>

      <FilterDrawer
        open={drawer}
        onClose={close}
        base={products}
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
