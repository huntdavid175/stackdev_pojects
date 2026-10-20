import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { img } from '../asset'
import { DISCOUNTS, findProduct, FREE_SHIPPING, GIFT_WRAP, money, products } from '../data'
import { Link } from '../router'
import { lockScroll, unlockScroll } from '../scrollLock'
import { addToCart, cartCount, closeCart, lineKey, removeLine, setLineQty, useCart, useCartOpen, type CartLine } from '../store'
import { BagIcon, CloseIcon, MinusIcon, PlusIcon } from '../icons'

function Line({ line }: { line: CartLine }) {
  const product = findProduct(line.productId)
  if (!product) return null
  const image = product.swatches.find((s) => s.name === line.color)?.image ?? product.image
  const href = `/products/${product.id}`
  return (
    <li className="cline">
      <Link href={href} className="cline__img" onClick={closeCart}><img src={img(image)} alt="" /></Link>
      <div className="cline__body">
        <div className="cline__top">
          <h3><Link href={href} onClick={closeCart}>{product.name}</Link></h3>
          <p className="cline__price">{money(product.price * line.qty)}</p>
        </div>
        <p className="cline__meta">Color: {line.color}</p>
        <p className="cline__meta">Size: {line.size}</p>
        <div className="cline__actions">
          <div className="qty qty--sm">
            <button aria-label="Decrease quantity" onClick={() => setLineQty(line, line.qty - 1)}><MinusIcon /></button>
            <input
              aria-label={`Quantity of ${product.name}`}
              inputMode="numeric"
              value={line.qty}
              onChange={(e) => setLineQty(line, Math.min(99, Number(e.target.value.replace(/\D/g, '')) || 1))}
            />
            <button aria-label="Increase quantity" onClick={() => setLineQty(line, Math.min(99, line.qty + 1))}><PlusIcon /></button>
          </div>
          <button className="cline__remove" onClick={() => removeLine(line)}>Remove</button>
        </div>
      </div>
    </li>
  )
}

function Upsell({ exclude }: { exclude: string[] }) {
  const items = products.filter((p) => !exclude.includes(p.id)).slice(0, 3)
  const track = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  if (!items.length) return null

  const onScroll = () => {
    const el = track.current
    if (el && el.clientWidth) setCurrent(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <div className="cart__upsell">
      <h3 className="cart__upsell-title">You may also like</h3>
      <div className="bundle__track" ref={track} onScroll={onScroll}>
        {items.map((p) => (
          <article key={p.id} className="bundle__card">
            <Link href={`/products/${p.id}`} className="bundle__img" onClick={closeCart}><img src={img(p.image)} alt="" loading="lazy" /></Link>
            <div className="bundle__body">
              <h3><Link href={`/products/${p.id}`} onClick={closeCart}>{p.name}</Link></h3>
              <p className="pcard__price">
                <span>{money(p.price)}</span>
                {p.compareAt && <s>{money(p.compareAt)}</s>}
              </p>
            </div>
            <button
              className="bundle__add"
              aria-label={`Add ${p.name} to cart`}
              onClick={() => addToCart({ productId: p.id, color: p.swatches[0].name, size: p.sizes[0], qty: 1 })}
            >
              <BagIcon size={18} />
            </button>
          </article>
        ))}
      </div>
      <div className="bundle__dots">
        {items.map((p, i) => (
          <button
            key={p.id}
            className={i === current ? 'is-active' : undefined}
            aria-label={`Show suggestion ${i + 1}`}
            onClick={() => track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: 'smooth' })}
          />
        ))}
      </div>
    </div>
  )
}

function Extra({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="cart__extra">
      <summary>
        {title}
        <span className="acc__plus"><PlusIcon size={18} /></span>
        <span className="acc__minus"><MinusIcon size={18} /></span>
      </summary>
      <div className="cart__extra-body">{children}</div>
    </details>
  )
}

export default function CartDrawer() {
  const open = useCartOpen()
  const lines = useCart()
  const [wrap, setWrap] = useState(false)
  const [note, setNote] = useState('')
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState<string | null>(null)
  const [codeError, setCodeError] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

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

  const count = cartCount(lines)
  const items = lines.reduce((sum, l) => sum + (findProduct(l.productId)?.price ?? 0) * l.qty, 0)
  const discount = applied ? (items * DISCOUNTS[applied]) / 100 : 0
  const subtotal = items - discount + (wrap && count ? GIFT_WRAP : 0)
  const toGo = Math.max(0, FREE_SHIPPING - items)
  const progress = Math.min(1, items / FREE_SHIPPING)

  const apply = (e: FormEvent) => {
    e.preventDefault()
    const c = code.trim().toUpperCase()
    if (DISCOUNTS[c]) {
      setApplied(c)
      setCodeError(false)
    } else setCodeError(true)
  }

  return (
    <div className={`cart${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="cart__backdrop" onClick={closeCart} />
      <aside className="cart__panel" role="dialog" aria-modal="true" aria-label="Your cart">
        <div className="cart__head">
          <h2 className="cart__title">Your cart ({count})</h2>
          <button ref={closeRef} className="icon-btn" aria-label="Close cart" onClick={closeCart}><CloseIcon size={26} /></button>
        </div>

        {count === 0 ? (
          <div className="cart__empty">
            <p className="cart__title">Your cart is empty</p>
            <Link href="/" className="btn cart__continue" onClick={closeCart}>Continue shopping</Link>
          </div>
        ) : (
          <>
            <div className="cart__scroll">
              <div className="cart__ship">
                <p>{toGo > 0 ? <>Spend <strong>{money(toGo)}</strong> more for free shipping</> : <>You’ve unlocked <strong>free shipping</strong>!</>}</p>
                <div className="cart__bar" role="progressbar" aria-valuemin={0} aria-valuemax={FREE_SHIPPING} aria-valuenow={Math.min(items, FREE_SHIPPING)}>
                  <span style={{ width: `${progress * 100}%` }} />
                </div>
              </div>
              <ul className="cart__lines">
                {lines.map((l) => <Line key={lineKey(l)} line={l} />)}
              </ul>
              <Upsell exclude={lines.map((l) => l.productId)} />
            </div>

            <div className="cart__foot">
              <label className="cart__wrap">
                <input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} />
                For {money(GIFT_WRAP)} please wrap the products in this order.
              </label>
              <Extra title="Add order note">
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="How can we help you?" aria-label="Order note" />
              </Extra>
              <Extra title="Add discount code">
                <form className="cart__code" onSubmit={apply}>
                  <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Discount code" aria-label="Discount code" />
                  <button className="btn">Apply</button>
                </form>
                {codeError && <p className="cart__code-msg is-error">That code isn’t valid.</p>}
                {applied && <p className="cart__code-msg">{applied} applied — {DISCOUNTS[applied]}% off.</p>}
              </Extra>
              {discount > 0 && (
                <p className="cart__row cart__row--small"><span>Discount ({applied})</span><span>−{money(discount)}</span></p>
              )}
              <p className="cart__row"><span>Subtotal:</span><span>{money(subtotal)}</span></p>
              <p className="cart__taxes">Taxes and <a href="#">shipping</a> calculated at checkout</p>
              <div className="cart__ctas">
                <button className="btn cart__view" onClick={closeCart}>View cart</button>
                <button className="btn cart__checkout">Check out</button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
