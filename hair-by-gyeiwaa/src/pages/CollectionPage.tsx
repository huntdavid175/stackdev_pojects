import { useMemo } from 'react'
import { Link } from '../router'
import { img } from '../asset'
import { collections, products, type Collection } from '../data'
import Listing from '../components/Listing'

export default function CollectionPage({ collection }: { collection: Collection }) {
  const base = useMemo(() => products.filter(collection.match), [collection])
  const others = collections.filter((c) => c.handle !== collection.handle)

  return (
    <>
      <section className="pbanner pbanner--collection">
        <img src={img('satin-shine.webp')} alt="" className="pbanner__bg" />
        <img src={img(collection.img)} alt="" className="pbanner__model" />
        <div className="pbanner__copy container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/shop">Shop</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{collection.title}</span>
          </nav>
          <p className="script pbanner__script">{collection.script}</p>
          <h1 className="display pbanner__title">{collection.title}</h1>
          <p className="pbanner__text">{collection.description}</p>
        </div>
      </section>

      <Listing base={base} />

      <nav className="more container" aria-label="Other collections">
        <p className="display-italic more__title">Keep browsing</p>
        <ul>
          {others.map((c) => (
            <li key={c.handle}>
              <Link href={`/collections/${c.handle}`} className="more__link">{c.title}</Link>
            </li>
          ))}
          <li>
            <Link href="/shop" className="more__link">All hair</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
