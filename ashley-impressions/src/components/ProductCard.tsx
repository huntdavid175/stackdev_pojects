import { Link, PRODUCT_URL } from '../router'
import { badgeFor, money, type Product } from '../catalog'
import { img } from '../asset'

export default function ProductCard({ product }: { product: Product }) {
  const badge = badgeFor(product)
  return (
    <Link href={PRODUCT_URL} className="product-card">
      <div className="product-card__media">
        <img src={img(product.img)} alt={product.name} loading="lazy" />
        {badge && <span className={`badge badge--${badge.tone}`}>{badge.label}</span>}
      </div>
      <p className="product-card__brand">{product.brand}</p>
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">
        {money(product.price)}
        {product.compareAt && <s>{money(product.compareAt)}</s>}
      </p>
    </Link>
  )
}
