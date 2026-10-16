import { useState } from 'react'
import { ChevronDown } from '../icons'
import { addToCart } from '../cart'
import { img } from '../asset'

type Item = { name: string; img: string; sizes: { label: string; price: number }[] }

// A three-step routine built from products the shop stocks.
const items: Item[] = [
  {
    name: 'Anua Heartleaf pore deep cleansing foam',
    img: 'products/anua-heartleaf-foam.webp',
    sizes: [{ label: '150ml', price: 250 }],
  },
  {
    name: 'Makari Argan & Carrot toning glycerin',
    img: 'products/makari-toning-glycerin.webp',
    sizes: [{ label: '500ml', price: 800 }],
  },
  {
    name: 'Hatomugi UV milky gel SPF50+',
    img: 'products/hatomugi-uv-gel.webp',
    sizes: [{ label: '250ml', price: 200 }],
  },
]

const money = (n: number) => `GH₵${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default function Bundle() {
  const [sizes, setSizes] = useState(items.map(() => 0))
  const [hover, setHover] = useState<number | null>(null)
  const [added, setAdded] = useState(false)

  const setSize = (i: number, s: number) => {
    setSizes((prev) => prev.map((v, j) => (j === i ? s : v)))
    setAdded(false)
  }

  return (
    <section className="section bundle">
      <div className="container bundle__grid">
        <div className="bundle__copy">
          <p className="eyebrow">Daily routine</p>
          <h2 className="h-serif">
            Cleanse, tone, <em>protect</em>
          </h2>

          <ol className="bundle__list">
            {items.map((item, i) => (
              <li
                key={item.name}
                className={hover === i ? 'is-highlight' : undefined}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <span className="num-dot">{i + 1}</span>
                <img src={img(item.img)} alt="" className="bundle__thumb" loading="lazy" />
                <div className="bundle__info">
                  <p className="bundle__name">{item.name}</p>
                  {item.sizes.length === 1 ? (
                    <p className="bundle__size-text">{item.sizes[0].label}</p>
                  ) : (
                    <label className="bundle__size">
                      <span className="sr-only">Size for {item.name}</span>
                      <select value={sizes[i]} onChange={(e) => setSize(i, Number(e.target.value))}>
                        {item.sizes.map((s, si) => (
                          <option key={s.label} value={si}>{s.label}</option>
                        ))}
                      </select>
                      <ChevronDown />
                    </label>
                  )}
                </div>
                <p className="bundle__price">{money(item.sizes[sizes[i]].price)}</p>
              </li>
            ))}
          </ol>

          <button
            className="btn-pill btn-pill--dark btn-pill--block"
            onClick={() => {
              addToCart(items.map((it, i) => ({ name: it.name, img: it.img, variant: it.sizes[sizes[i]].label, price: it.sizes[sizes[i]].price })))
              setAdded(true)
            }}
            aria-live="polite"
          >
            {added ? 'Added to cart' : 'Add all to cart'}
          </button>
        </div>

        <div className="bundle__media">
          <img src={img('bundle.webp')} alt="Three women each holding a skincare product" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
