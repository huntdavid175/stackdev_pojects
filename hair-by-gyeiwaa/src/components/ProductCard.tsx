import { lengthPrice, money, type Product } from '../data'
import { img } from '../asset'
import { Link } from '../router'

// `length`: the length picked in the shop filters; the card then prices at that length.
export default function ProductCard({ product, length }: { product: Product; length?: number | null }) {
  const soldOut = product.tag === 'Sold out'
  const atLength = length != null && product.lengths.includes(length) ? length : undefined
  const href = `/products/${product.id}`

  return (
    <article className="pcard">
      <Link href={href} className="pcard__link">
        <div className="pcard__media">
          <img src={img(product.img)} alt={`${product.name} hair`} loading="lazy" />
          {product.tag && <span className={`pcard__tag${soldOut ? ' is-out' : ''}`}>{product.tag}</span>}
        </div>
        <h3 className="pcard__name">{product.name}</h3>
      </Link>
      <p className="pcard__price">
        {atLength ? `${money(lengthPrice(product, atLength))} at ${atLength}″` : `From ${money(product.basePrice)}`}
      </p>
      <Link href={href} className={`btn btn--outline btn--block pcard__btn${soldOut ? ' is-out' : ''}`} aria-label={`Choose options for ${product.name}`}>
        {soldOut ? 'Sold out' : 'Choose options'}
      </Link>
    </article>
  )
}
