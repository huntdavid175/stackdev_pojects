import { useState } from 'react'
import { ChevronDown } from '../icons'
import { addToCart } from '../cart'
import { img } from '../asset'

type Item = { name: string; img: string; sizes: { label: string; price: number }[]; spot: { x: number; y: number } }

const items: Item[] = [
  {
    name: 'Hyaluronic sea serum',
    img: 'bundle-1.jpg',
    sizes: [{ label: '30ml', price: 130 }, { label: '50ml', price: 180 }],
    spot: { x: 30, y: 51 },
  },
  {
    name: 'Ultimate Facelift Day Cream',
    img: 'bundle-2.jpg',
    sizes: [{ label: '45ml', price: 30 }, { label: '90ml', price: 52 }],
    spot: { x: 50, y: 62 },
  },
  {
    name: 'Ultimate Blanca Hair Oil',
    img: 'bundle-3.jpg',
    sizes: [{ label: '45ml', price: 30 }, { label: '90ml', price: 52 }],
    spot: { x: 68, y: 61 },
  },
]

const money = (n: number) => `$${n.toFixed(2)}`

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
          <p className="eyebrow">Product bundle</p>
          <h2 className="h-serif">
            Favorite <em>Packs</em>
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
                  <label className="bundle__size">
                    <span className="sr-only">Size for {item.name}</span>
                    <select value={sizes[i]} onChange={(e) => setSize(i, Number(e.target.value))}>
                      {item.sizes.map((s, si) => (
                        <option key={s.label} value={si}>{s.label}</option>
                      ))}
                    </select>
                    <ChevronDown />
                  </label>
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
          <img src={img('bundle.jpg')} alt="Three amber serum bottles on a stone plinth" loading="lazy" />
          {items.map((item, i) => (
            <span
              key={item.name}
              className={`hotspot${hover === i ? ' is-active' : ''}`}
              style={{ left: `${item.spot.x}%`, top: `${item.spot.y}%` }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              aria-hidden="true"
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
