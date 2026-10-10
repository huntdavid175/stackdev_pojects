import { Link } from '../router'
import { img } from '../asset'
import { products, typeCollections } from '../data'
import Listing from '../components/Listing'

export default function ShopPage() {
  return (
    <>
      <section className="pbanner pbanner--shop">
        <img src={img('satin-folds.webp')} alt="" className="pbanner__bg" />
        <div className="pbanner__copy container">
          <p className="script pbanner__script">The Shop</p>
          <h1 className="display pbanner__title">All Hair</h1>
          <p className="pbanner__text">Every bundle, wig, frontal and closure we carry, in one place.</p>
        </div>
      </section>

      <nav className="rail container" aria-label="Shop by category">
        <ul>
          {typeCollections.map((c) => (
            <li key={c.handle}>
              <Link href={`/collections/${c.handle}`} className="rail__item">
                <span className="rail__img">
                  <img src={img(c.img)} alt="" loading="lazy" />
                </span>
                <span className="rail__name">{c.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Listing base={products} />
    </>
  )
}
