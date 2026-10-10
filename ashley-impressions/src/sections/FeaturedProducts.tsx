import { useState } from 'react'
import { Link, PRODUCT_URL } from '../router'
import { img } from '../asset'

type Badge = { label: string; tone: 'sale' | 'new' | 'best' }
type Product = { name: string; img: string; price: number; compareAt?: number; badge?: Badge }

const products: Record<'skin' | 'body', Product[]> = {
  skin: [
    { name: 'Ultimate Facelift Day Cream', img: 'product-1.jpg', price: 27, compareAt: 30, badge: { label: '-10%', tone: 'sale' } },
    { name: 'Ultimate Facelift Day Cream', img: 'product-2.jpg', price: 30, badge: { label: 'New', tone: 'new' } },
    { name: 'Intense Repair Body Cream', img: 'product-3.jpg', price: 30, badge: { label: 'Bestseller', tone: 'best' } },
    { name: 'Intense Repair Body Cream', img: 'product-4.jpg', price: 25, compareAt: 30, badge: { label: '-16%', tone: 'sale' } },
  ],
  body: [
    { name: 'Intense Repair Body Cream', img: 'product-4.jpg', price: 25, compareAt: 30, badge: { label: '-16%', tone: 'sale' } },
    { name: 'Nourishing Body Wash', img: 'product-3.jpg', price: 30, badge: { label: 'Bestseller', tone: 'best' } },
    { name: 'Avocado Rescue Moisturiser', img: 'product-2.jpg', price: 30, badge: { label: 'New', tone: 'new' } },
    { name: 'Purifying Hand & Body Wash', img: 'product-1.jpg', price: 27, compareAt: 30, badge: { label: '-10%', tone: 'sale' } },
  ],
}

const money = (n: number) => `$${n.toFixed(2)}`

export default function FeaturedProducts() {
  const [tab, setTab] = useState<'skin' | 'body'>('skin')

  return (
    <section id="featured" className="section featured">
      <div className="container container--wide">
        <div className="featured__head">
          <h2 className="h2">Featured Products</h2>
          <div className="tabs" role="tablist" aria-label="Product category">
            {(['skin', 'body'] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                className="tabs__tab"
                onClick={() => setTab(t)}
              >
                {t === 'skin' ? 'Skin care' : 'Body care'}
              </button>
            ))}
          </div>
        </div>

        <ul className="product-grid" role="tabpanel">
          {products[tab].map((p, i) => (
            <li key={tab + i}>
              <Link href={PRODUCT_URL} className="product-card">
                <div className="product-card__media">
                  <img src={img(p.img)} alt={p.name} loading="lazy" />
                  {p.badge && <span className={`badge badge--${p.badge.tone}`}>{p.badge.label}</span>}
                </div>
                <h3 className="product-card__name">{p.name}</h3>
                <p className="product-card__price">
                  {money(p.price)}
                  {p.compareAt && <s>{money(p.compareAt)}</s>}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
