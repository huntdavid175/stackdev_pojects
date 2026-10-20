import { useEffect, useRef, useState } from 'react'
import { img } from '../asset'
import { FREE_SHIPPING, money, products } from '../data'
import { Link, navigate } from '../router'
import { lockScroll, unlockScroll } from '../scrollLock'
import {
  cartCount,
  cartSubtotal,
  closeCart,
  GIFT_WRAP_PRICE,
  removeLine,
  setGiftWrap,
  setNote,
  setQty,
  useCart,
} from '../store'
import { ChevronLeft, ChevronRight, CloseIcon, GiftIcon, LockIcon, MinusIcon, PlusIcon, TrashIcon, TruckIcon } from '../icons'

function Upsell({ exclude }: { exclude: string[] }) {
  const items = products.filter((p) => !exclude.includes(p.id)).slice(0, 5)
  const track = useRef<HTMLDivElement>(null)
  const go = (d: number) => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (el && card) el.scrollBy({ left: d * (card.offsetWidth + 16), behavior: 'smooth' })
  }
  if (!items.length) return null
  return (
    <div className="upsell">
      <div className="upsell__head">
        <h3>You may also like...</h3>
        <div>
          <button aria-label="Previous suggestion" onClick={() => go(-1)}><ChevronLeft /></button>
          <button aria-label="Next suggestion" onClick={() => go(1)}><ChevronRight /></button>
        </div>
      </div>
      <div className="upsell__track" ref={track}>
        {items.map((p) => (
          <article key={p.id} className="upsell__card">
            <img src={img(p.listImage ?? p.image)} alt="" loading="lazy" />
            <div>
              <h4>{p.name}</h4>
              <p>{money(p.price)}</p>
              <Link href={`/products/${p.id}`} onClick={closeCart}>Quick view</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default function CartDrawer() {
  const cart = useCart()
  const { lines, giftWrap, note, open } = cart
  const count = cartCount(cart)
  const subtotal = cartSubtotal(cart)
  const left = Math.max(0, FREE_SHIPPING - subtotal)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [checkout, setCheckout] = useState(false)

  useEffect(() => {
    if (!open) return
    lockScroll()
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (!checkout) return
    const t = setTimeout(() => setCheckout(false), 2600)
    return () => clearTimeout(t)
  }, [checkout])

  return (
    <div className={`cart${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="cart__backdrop" onClick={closeCart} />
      <aside className="cart__panel" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="cart__head">
          <h2>Shopping Cart <span>({count} {count === 1 ? 'item' : 'items'})</span></h2>
          <button ref={closeRef} className="icon-btn" aria-label="Close cart" onClick={closeCart}><CloseIcon size={30} /></button>
        </div>

        {lines.length === 0 ? (
          <div className="cart__empty">
            <p>Your cart is empty</p>
            <button
              className="btn btn--coral"
              onClick={() => {
                closeCart()
                navigate('/collections/all')
              }}
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="cart__scroll">
            <div className="cart__inner">
              <div className="cart__ship">
                <p>
                  <TruckIcon size={22} />{' '}
                  <span>{left > 0 ? <>Spend <strong>{money(left).replace('.00', '')} more</strong> to get free shipping</> : <>You've unlocked <strong>free shipping</strong>!</>}</span>
                </p>
                <span className="cart__bar"><span style={{ width: `${Math.min(1, subtotal / FREE_SHIPPING) * 100}%` }} /></span>
              </div>

              <ul className="cart__lines">
                {lines.map((l) => (
                  <li key={l.key} className="cline">
                    <Link href={`/products/${l.productId}`} onClick={closeCart} className="cline__img"><img src={img(l.image)} alt="" /></Link>
                    <div className="cline__body">
                      <div className="cline__top">
                        <h3><Link href={`/products/${l.productId}`} onClick={closeCart}>{l.name}</Link></h3>
                        <span>{money(l.price * l.qty)}</span>
                      </div>
                      <p className="cline__variant">{l.variant}</p>
                      <div className="cline__actions">
                        <div className="qty">
                          <button aria-label="Decrease quantity" onClick={() => setQty(l.key, l.qty - 1)}>–</button>
                          <input
                            aria-label={`Quantity of ${l.name}`}
                            inputMode="numeric"
                            value={l.qty}
                            onChange={(e) => setQty(l.key, Math.min(99, Number(e.target.value.replace(/\D/g, '')) || 1))}
                          />
                          <button aria-label="Increase quantity" onClick={() => setQty(l.key, Math.min(99, l.qty + 1))}>+</button>
                        </div>
                        <button className="cline__remove" aria-label={`Remove ${l.name}`} onClick={() => removeLine(l.key)}><TrashIcon /></button>
                      </div>
                    </div>
                  </li>
                ))}
                {giftWrap && (
                  <li className="cline cline--wrap">
                    <span className="cline__img cline__gift"><GiftIcon size={30} /></span>
                    <div className="cline__body">
                      <div className="cline__top">
                        <h3>Gift wrap</h3>
                        <span>{money(GIFT_WRAP_PRICE)}</span>
                      </div>
                      <p className="cline__variant">Recycled paper, hand-tied ribbon</p>
                      <div className="cline__actions">
                        <button className="cline__remove" aria-label="Remove gift wrap" onClick={() => setGiftWrap(false)}><TrashIcon /></button>
                      </div>
                    </div>
                  </li>
                )}
              </ul>

              {!giftWrap && (
                <div className="giftwrap">
                  <p><GiftIcon /> Gift wrap your items for just {money(GIFT_WRAP_PRICE).replace('.00', '')}?</p>
                  <button className="btn btn--coral" onClick={() => setGiftWrap(true)}>Add to cart</button>
                </div>
              )}
            </div>

            <Upsell exclude={lines.map((l) => l.productId)} />
          </div>
        )}

        {lines.length > 0 && (
          <div className="cart__foot">
            <details className="cart__notes">
              <summary>
                Order notes
                <span className="acc__plus"><PlusIcon size={16} /></span>
                <span className="acc__minus"><MinusIcon size={16} /></span>
              </summary>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Add a note to your order" aria-label="Order notes" />
            </details>
            <div className="cart__totals">
              <p className="cart__subtotal"><span>Subtotal</span><span>{money(subtotal)}</span></p>
              <p className="cart__taxes">Taxes and shipping calculated at checkout</p>
              <div className="cart__ctas">
                <button className="btn btn--outline" onClick={closeCart}>View cart</button>
                <button className="btn btn--coral" onClick={() => setCheckout(true)}><LockIcon /> {checkout ? 'Checkout opens on the live store' : 'Check Out'}</button>
              </div>
              <img className="cart__pay" src={img('payments.webp')} alt="We accept Visa, Mastercard, American Express, PayPal, Diners Club and Discover" />
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
