import { useState } from 'react'
import { addToCart, type CartItem } from '../cart'
import { BagIcon, Check } from '../icons'
import { img } from '../asset'

const money = (n: number) => `$${n.toFixed(2)}`

type Props = { title: string; titleClass?: string; items: CartItem[] }

export default function UpsellCarousel({ title, titleClass = 'upsell__title', items }: Props) {
  const [index, setIndex] = useState(0)
  const [added, setAdded] = useState<number | null>(null)

  return (
    <div className="upsell">
      <h2 className={titleClass}>{title}</h2>
      <div className="upsell__viewport">
        <ul className="upsell__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {items.map((u, i) => (
            <li key={u.name} className="upsell__card" aria-hidden={i !== index}>
              <img src={img(u.img)} alt="" />
              <div>
                <p className="upsell__name">{u.name}</p>
                <p className="upsell__price">{money(u.price)}</p>
              </div>
              <button
                className={`upsell__add${added === i ? ' is-added' : ''}`}
                aria-label={`Add ${u.name} to cart`}
                tabIndex={i === index ? 0 : -1}
                onClick={() => {
                  addToCart(u)
                  setAdded(i)
                }}
              >
                {added === i ? <Check /> : <BagIcon size={22} />}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="dots">
        {items.map((u, i) => (
          <button key={u.name} aria-label={`Show ${u.name}`} aria-current={i === index} onClick={() => setIndex(i)} />
        ))}
      </div>
    </div>
  )
}
