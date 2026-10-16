import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { FREE_SHIPPING_AT, addToCart, applyDiscount, clearDiscount, closeCart, removeLine, setQty, totals, useCart } from '../cart'
import { CloseIcon, Plus } from '../icons'
import { img } from '../asset'

const money = (n: number) => `GH₵${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const recommendations = [
  { name: 'Makari Argan & Carrot body oil', price: 400, img: 'products/makari-body-oil.webp' },
  { name: 'Hatomugi UV milky gel SPF50+', price: 200, img: 'products/hatomugi-uv-gel.webp' },
  { name: 'Exfoliating shower gel', price: 140, img: 'products/exfoliating-shower-gel.webp' },
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
  const recs = recommendations.filter((r) => !cart.lines.some((l) => l.name === r.name))

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
                      <div className="cart-line__top">
                        <p className="cart-line__name">{l.name}</p>
                        <p className="cart-line__price">{money(l.price * l.qty)}</p>
                      </div>
                      {l.variant && <p className="cart-line__variant">{l.variant}</p>}
                      <div className="cart-line__actions">
                        <div className="qty">
                          <button aria-label={`Decrease quantity of ${l.name}`} onClick={() => setQty(l.id, l.qty - 1)}>
                            <Minus />
                          </button>
                          <span aria-live="polite" aria-label={`Quantity ${l.qty}`}>{l.qty}</span>
                          <button aria-label={`Increase quantity of ${l.name}`} onClick={() => setQty(l.id, l.qty + 1)}>
                            <Plus open={false} />
                          </button>
                        </div>
                        <button className="link-btn" onClick={() => removeLine(l.id)}>Remove</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {recs.length > 0 && (
                <div className="cart-recs">
                  <h3 className="cart__subtitle">Add to your order</h3>
                  <ul className="cart-recs__list">
                    {recs.map((r) => (
                      <li key={r.name} className="cart-rec">
                        <img src={img(r.img)} alt="" />
                        <div>
                          <p className="cart-rec__name">{r.name}</p>
                          <p className="cart-rec__price">{money(r.price)}</p>
                        </div>
                        <button className="cart-rec__add" aria-label={`Add ${r.name} to cart`} onClick={() => addToCart(r)}>
                          <Plus open={false} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="cart__foot">
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
                <p className="cart-total__row">
                  <span>Subtotal</span>
                  <span>{money(t.subtotal)}</span>
                </p>
                <p className="cart-total__note">Taxes and shipping calculated at checkout</p>
              </div>

              <button className="btn-pill btn-pill--dark btn-pill--block cart__checkout" onClick={() => setCheckoutMsg(true)}>
                Check out
              </button>
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
