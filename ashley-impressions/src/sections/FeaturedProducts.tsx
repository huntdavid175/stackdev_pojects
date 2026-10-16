import { useState } from 'react'
import { Link, PRODUCT_URL } from '../router'
import { img } from '../asset'

type Badge = { label: string; tone: 'sale' | 'new' | 'best' }
type Product = { name: string; img: string; price: number; compareAt?: number; badge?: Badge }

const products: Record<'skin' | 'body', Product[]> = {
  skin: [
    { name: 'Anua Heartleaf pore deep cleansing foam', img: 'products/anua-heartleaf-foam.webp', price: 250, badge: { label: 'Bestseller', tone: 'best' } },
    { name: 'Skin1004 Centella soothing cream', img: 'products/centella-soothing-cream.webp', price: 290, badge: { label: 'New', tone: 'new' } },
    { name: 'Hatomugi UV milky gel SPF50+', img: 'products/hatomugi-uv-gel.webp', price: 200 },
    { name: 'Makari Argan & Carrot toning glycerin', img: 'products/makari-toning-glycerin.webp', price: 800 },
  ],
  body: [
    { name: 'Makari Argan & Carrot body oil', img: 'products/makari-body-oil.webp', price: 400, badge: { label: 'Bestseller', tone: 'best' } },
    { name: 'Advanced Korean Skin body oil', img: 'products/korean-body-oil.webp', price: 150, badge: { label: 'New', tone: 'new' } },
    { name: 'Veetgold Vitamin C body corrector oil', img: 'products/veetgold-vitamin-c-oil.webp', price: 170 },
    { name: 'Bismid Clear & Glow whitening lotion', img: 'products/bismid-whitening-lotion.webp', price: 200 },
  ],
}

const money = (n: number) => `GH₵${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

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
