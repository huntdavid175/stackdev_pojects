import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  FREE_SHIPPING_AT,
  GIFT_WRAP_PRICE,
  applyDiscount,
  clearDiscount,
  closeCart,
  removeLine,
  setGiftWrap,
  setNote,
  setQty,
  totals,
  useCart,
} from '../cart'
import { CloseIcon, Plus } from '../icons'
import UpsellCarousel from './UpsellCarousel'
import { img } from '../asset'

const money = (n: number) => `$${n.toFixed(2)}`

const recommendations = [
  { name: 'Elements of comfort body oil', price: 120, img: 'cart-upsell-1.jpg' },
  { name: 'Smooth whipped body treatment', price: 50, img: 'related-4.jpg' },
  { name: 'Exfoliating daily cleanser', price: 75, img: 'related-2.jpg' },
]

function Minus() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M5 12h14" />
    </svg>
  )
}

function Expander({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="cart-extra">
      <button className="cart-extra__toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        {label}
        <Plus open={open} />
      </button>
      <div className={`cart-extra__body${open ? ' is-open' : ''}`}>
        <div>{children}</div>
      </div>
    </div>
  )
}

function DiscountForm() {
  const cart = useCart()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (applyDiscount(code)) {
      setCode('')
      setError('')
    } else {
      setError(`"${code.trim()}" isn't a valid code. Check the spelling and try again.`)
    }
  }

  if (cart.discount) {
    return (
      <p className="cart-discount-applied">
        <span>{cart.discount.code} applied ({cart.discount.pct}% off)</span>
        <button className="link-btn" onClick={clearDiscount}>Remove</button>
      </p>
    )
  }

  return (
    <form className="cart-inline-form" onSubmit={submit}>
      <label htmlFor="cart-code" className="sr-only">Discount code</label>
      <input id="cart-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Discount code" required />
      <button type="submit" className="btn-pill btn-pill--dark">Apply</button>
      {error && <p className="cart-error" role="alert">{error}</p>}
      <p className="cart-hint">Try WELCOME10 for 10% off.</p>
    </form>
  )
}

export default function CartDrawer() {
  const cart = useCart()
  const t = totals(cart)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [checkoutMsg, setCheckoutMsg] = useState(false)

  useEffect(() => {
    if (!cart.open) return
    const prevFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      prevFocus?.focus()
      setCheckoutMsg(false)
    }
  }, [cart.open])

  const remaining = Math.max(0, FREE_SHIPPING_AT - t.items)
  const progress = Math.min(100, (t.items / FREE_SHIPPING_AT) * 100)

  return (
    <div className={`cart${cart.open ? ' is-open' : ''}`} aria-hidden={!cart.open}>
      <div className="cart__backdrop" onClick={closeCart} />
      <aside className="cart__panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="cart__head">
          <h2 id="cart-title" className="cart__title">Your cart ({t.count})</h2>
          <button ref={closeRef} className="icon-btn" aria-label="Close cart" onClick={closeCart}>
            <CloseIcon />
          </button>
        </div>

        {t.count === 0 ? (
          <div className="cart__empty">
            <p className="cart__empty-title">Your cart is empty</p>
            <p>Add a product and it will show up here.</p>
            <button className="btn-pill btn-pill--dark" onClick={closeCart}>Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="cart__body">
              <div className="cart-shipping" aria-live="polite">
                <p>
                  {remaining > 0 ? (
                    <>Spend {money(remaining)} more for free shipping</>
                  ) : (
                    <>Your order ships free</>
                  )}
                </p>
                <div className="cart-shipping__bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Progress to free shipping">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>

              <ul className="cart-lines">
                {cart.lines.map((l) => (
                  <li key={l.id} className="cart-line">
                    <img src={img(l.img)} alt="" />
                    <div className="cart-line__info">
                      <p className="cart-line__name">{l.name}</p>
                      {l.variant && <p className="cart-line__variant">Size: {l.variant}</p>}
                      <div className="qty">
                        <button aria-label={`Decrease quantity of ${l.name}`} onClick={() => setQty(l.id, l.qty - 1)}>
                          <Minus />
                        </button>
                        <span aria-live="polite" aria-label={`Quantity ${l.qty}`}>{l.qty}</span>
                        <button aria-label={`Increase quantity of ${l.name}`} onClick={() => setQty(l.id, l.qty + 1)}>
                          <Plus open={false} />
                        </button>
                      </div>
                    </div>
                    <div className="cart-line__side">
                      <p className="cart-line__price">{money(l.price * l.qty)}</p>
                      <button className="link-btn" onClick={() => removeLine(l.id)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>

              <UpsellCarousel
                title="You may also like"
                titleClass="cart__subtitle"
                items={recommendations.filter((r) => !cart.lines.some((l) => l.name === r.name))}
              />
            </div>

            <div className="cart__foot">
              <label className="cart-wrap">
                <input type="checkbox" checked={cart.giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} />
                <span>For {money(GIFT_WRAP_PRICE)} please wrap the products in this order.</span>
              </label>

              <Expander label="Add order note">
                <label htmlFor="cart-note" className="sr-only">Order note</label>
                <textarea
                  id="cart-note"
                  className="cart-note"
                  rows={3}
                  value={cart.note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Special instructions for your order"
                />
              </Expander>

              <Expander label="Add discount code">
                <DiscountForm />
              </Expander>

              <div className="cart-total">
                {t.discount > 0 && (
                  <p className="cart-total__row cart-total__row--muted">
                    <span>Discount ({cart.discount?.code})</span>
                    <span>-{money(t.discount)}</span>
                  </p>
                )}
                {t.wrap > 0 && (
                  <p className="cart-total__row cart-total__row--muted">
                    <span>Gift wrap</span>
                    <span>{money(t.wrap)}</span>
                  </p>
                )}
                <p className="cart-total__row">
                  <span>Subtotal:</span>
                  <span>{money(t.subtotal)}</span>
                </p>
                <p className="cart-total__note">Taxes and shipping calculated at checkout</p>
              </div>

              <div className="cart__buttons">
                <button className="btn-pill btn-pill--sand" onClick={closeCart}>View cart</button>
                <button className="btn-pill btn-pill--dark" onClick={() => setCheckoutMsg(true)}>Check out</button>
              </div>
              {checkoutMsg && (
                <p className="cart-hint cart-hint--center" role="status">
                  Checkout opens Shopify's secure checkout in the live store.
                </p>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
