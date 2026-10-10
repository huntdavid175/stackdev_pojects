import { useEffect, useRef, useState } from 'react'
import { bagCount, bagSubtotal, closeBag, removeLine, setQty, useBag } from '../bag'
import { FREE_DELIVERY, money } from '../data'
import { Link } from '../router'
import { img } from '../asset'
import { CloseIcon } from '../icons'

export default function BagDrawer() {
  const bag = useBag()
  const count = bagCount(bag)
  const subtotal = bagSubtotal(bag)
  const remaining = Math.max(0, FREE_DELIVERY - subtotal)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [checkout, setCheckout] = useState(false)

  useEffect(() => {
    if (!bag.open) return
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeBag()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      prev?.focus()
      setCheckout(false)
    }
  }, [bag.open])

  return (
    <div className={`bag${bag.open ? ' is-open' : ''}`} aria-hidden={!bag.open}>
      <div className="bag__backdrop" onClick={closeBag} />
      <aside className="bag__panel" role="dialog" aria-modal="true" aria-labelledby="bag-title">
        <div className="bag__head">
          <h2 id="bag-title" className="bag__title">Your bag ({count})</h2>
          <button ref={closeRef} className="icon-btn" aria-label="Close bag" onClick={closeBag}>
            <CloseIcon />
          </button>
        </div>

        {count === 0 ? (
          <div className="bag__empty">
            <p className="script bag__empty-script">Empty for now</p>
            <p>Pick a texture and length, and it will show up here.</p>
            <Link href="/shop" className="btn btn--solid" onClick={closeBag}>Shop all hair</Link>
          </div>
        ) : (
          <>
            <div className="bag__body">
              <div className="bag__ship" aria-live="polite">
                <p>{remaining > 0 ? `Spend ${money(remaining)} more for free delivery` : 'Your order ships free'}</p>
                <div className="bag__bar" aria-hidden="true">
                  <span style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY) * 100)}%` }} />
                </div>
              </div>

              <ul className="bag__lines">
                {bag.lines.map((l) => (
                  <li key={l.key} className="bline">
                    <Link href={`/products/${l.id}`} className="bline__img" onClick={closeBag}>
                      <img src={img(l.img)} alt="" />
                    </Link>
                    <div className="bline__info">
                      <Link href={`/products/${l.id}`} className="bline__name" onClick={closeBag}>{l.name}</Link>
                      <p className="bline__meta">Length {l.length}″</p>
                      <div className="qty qty--small">
                        <button aria-label={`Decrease quantity of ${l.name}`} onClick={() => setQty(l.key, l.qty - 1)}>−</button>
                        <span aria-live="polite">{l.qty}</span>
                        <button aria-label={`Increase quantity of ${l.name}`} onClick={() => setQty(l.key, l.qty + 1)}>+</button>
                      </div>
                    </div>
                    <div className="bline__side">
                      <p>{money(l.price * l.qty)}</p>
                      <button className="bline__remove" onClick={() => removeLine(l.key)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bag__foot">
              <p className="bag__subtotal">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </p>
              <p className="bag__note">Taxes included. Delivery calculated at checkout.</p>
              <button className="btn btn--solid btn--block" onClick={() => setCheckout(true)}>Check out</button>
              <p className="bag__klarna">or 3 interest-free payments of {money(subtotal / 3)} with Klarna</p>
              {checkout && (
                <p className="bag__note" role="status">In the live store, this opens Shopify's secure checkout.</p>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
