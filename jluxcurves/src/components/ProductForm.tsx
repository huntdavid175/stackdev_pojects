import { useState } from 'react'
import type { Product } from '../data'
import { addToCart } from '../store'
import { MinusIcon, PlusIcon } from '../icons'

// Colour, size, quantity and the buy buttons — shared by the quick view and the product page.
export default function ProductForm({ product, swatch, onSwatch }: { product: Product; swatch: number; onSwatch: (i: number) => void }) {
  const [size, setSize] = useState(product.sizes[0])
  const [qty, setQty] = useState(1)
  const color = product.swatches[swatch]

  const add = () => addToCart({ productId: product.id, color: color.name, size, qty })

  return (
    <div className="pform">
      <fieldset className="pform__option">
        <legend><strong>Color:</strong> {color.name}</legend>
        <div className="pform__swatches">
          {product.swatches.map((s, i) => (
            <button
              key={s.name}
              className={i === swatch ? 'is-active' : undefined}
              style={{ background: s.color }}
              aria-label={s.name}
              aria-pressed={i === swatch}
              onClick={() => onSwatch(i)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="pform__option">
        <legend><strong>Size:</strong> {size}</legend>
        <div className="pform__sizes">
          {product.sizes.map((s) => (
            <button key={s} className={s === size ? 'is-active' : undefined} aria-pressed={s === size} onClick={() => setSize(s)}>
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="pform__option">
        <label htmlFor={`qty-${product.id}`} className="pform__label">Quantity</label>
        <div className="qty">
          <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty === 1}><MinusIcon /></button>
          <input
            id={`qty-${product.id}`}
            inputMode="numeric"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value.replace(/\D/g, '')) || 1)))}
          />
          <button aria-label="Increase quantity" onClick={() => setQty(Math.min(99, qty + 1))}><PlusIcon /></button>
        </div>
      </div>

      <div className="pform__buy">
        <button className="pform__add" onClick={add} disabled={product.soldOut}>{product.soldOut ? 'Sold out' : 'Add to cart'}</button>
        <button className="pform__shop" disabled={product.soldOut}>Buy with <span className="pform__shop-logo">shop</span></button>
        <a href="#" className="pform__more">More Payment Options</a>
      </div>
    </div>
  )
}
