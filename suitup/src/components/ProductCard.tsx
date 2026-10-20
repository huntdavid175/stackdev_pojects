import { img } from '../asset'
import { badgesOf, defaultVariant, money, type Product } from '../data'
import { Link } from '../router'
import { addToCart } from '../store'
import { BagPlusIcon } from '../icons'

export default function ProductCard({ product, list }: { product: Product; list?: boolean }) {
  const href = `/products/${product.id}`
  const photo = (list && product.listImage) || product.image
  return (
    <article className="pcard">
      <div className="pcard__media">
        <Link href={href} aria-label={product.name}>
          <img src={img(photo)} alt="" loading="lazy" />
        </Link>
        <span className="pcard__badges">
          {badgesOf(product).map((b) => (
            <span key={b} className={`pill${b === 'on sale' ? ' pill--sale' : ''}`}>{b}</span>
          ))}
        </span>
        <button className="pcard__add" aria-label={`Add ${product.name} to cart`} onClick={() => addToCart({ productId: product.id, name: product.name, image: product.colors?.[0]?.image ?? photo, variant: defaultVariant(product), price: product.price })}>
          <BagPlusIcon />
        </button>
      </div>
      <h3 className="pcard__title"><Link href={href}>{product.name}</Link></h3>
      <p className="pcard__price">
        <span className={product.compareAt ? 'is-sale' : undefined}>{money(product.price)}</span>
        {product.compareAt && <s>{money(product.compareAt)}</s>}
      </p>
      <ul className="pcard__swatches" aria-label="Colours">
        {product.swatches.map((c) => <li key={c} style={{ background: c }} />)}
        {product.extraSwatches && <li className="pcard__more">+{product.extraSwatches}</li>}
      </ul>
    </article>
  )
}
