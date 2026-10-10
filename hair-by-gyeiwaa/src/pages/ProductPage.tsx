import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '../router'
import { img } from '../asset'
import { addToBag } from '../bag'
import { FREE_DELIVERY, LENGTH_LANDMARKS, lengthPrice, money, products, type Product } from '../data'
import ProductCard from '../components/ProductCard'

// Mockup only has one photo per product, so the gallery borrows two from the same texture/type.
function galleryFor(p: Product) {
  const others = products.filter((o) => o.id !== p.id && o.img !== p.img)
  const extra = [...others.filter((o) => o.texture === p.texture), ...others.filter((o) => o.type === p.type)].map((o) => o.img)
  return [p.img, ...[...new Set(extra)].slice(0, 2)]
}

// Nearest landmark at or above the chosen length ("falls past the shoulders").
function fallsAt(length: number) {
  const marks = LENGTH_LANDMARKS.filter((m) => m.at <= length)
  const m = marks[marks.length - 1]
  if (!m) return 'Above the chin'
  return m.at === length ? `${m.label} length` : `Just past the ${m.label.toLowerCase()}`
}

const DESCRIPTIONS: Record<Product['type'], string> = {
  Bundles:
    'Single-donor raw hair with every cuticle running the same way, so it stays soft and tangle-free. Colour, bleach and heat-style it like your own. Most full installs take three bundles.',
  Wigs: 'An HD lace unit that comes pre-plucked with baby hairs, so it melts into your skin and is ready to wear straight out of the box. Adjustable band and combs included.',
  Frontals: 'Ear-to-ear HD lace that disappears on every skin tone. Pre-plucked hairline and bleached knots for a parting you can wear any way.',
  Closures: 'A lace closure to finish your install, with a pre-plucked parting and bleached knots. Wear it middle, side or free part.',
  'Bundle deals': 'Three matching bundles with a lace closure or frontal, so the texture and shade line up perfectly. Priced together for less than buying separately.',
}

const details = (p: Product) => [
  {
    title: 'Hair details',
    body: `100% raw virgin hair, ${p.texture.toLowerCase()} texture, natural colour 1B. Each bundle weighs around 100g. Lengths are measured from the weft, worn straight.`,
  },
  {
    title: 'Care',
    body: 'Wash every 7 to 10 days with a sulphate-free shampoo, condition from mid-length to ends and let it air dry. Sleep on silk and detangle from the ends up. Looked after this way, it lasts two years or more.',
  },
  {
    title: 'Delivery & returns',
    body: `Free UK delivery on orders over £${FREE_DELIVERY}, dispatched within 24 hours. Unopened hair in its original packaging can be returned within 14 days.`,
  },
]

function Gallery({ images, name }: { images: string[]; name: string }) {
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const go = (i: number) => {
    const el = track.current
    if (!el) return
    el.scrollTo({ left: el.clientWidth * i, behavior: 'smooth' })
  }

  return (
    <div className="pgal">
      <div
        ref={track}
        className="pgal__track"
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
      >
        {images.map((src, i) => (
          <figure key={src} className={`pgal__item${i === 0 ? ' pgal__item--main' : ''}`}>
            <img src={img(src)} alt={i === 0 ? name : `${name}, view ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
          </figure>
        ))}
      </div>
      <div className="pgal__nav">
        <button aria-label="Previous photo" disabled={index === 0} onClick={() => go(index - 1)}>‹</button>
        <span aria-live="polite">
          {index + 1} / {images.length}
        </span>
        <button aria-label="Next photo" disabled={index === images.length - 1} onClick={() => go(index + 1)}>›</button>
      </div>
    </div>
  )
}

function Details({ product }: { product: Product }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="pdetails">
      {details(product).map((d, i) => (
        <div key={d.title} className="pdetails__item">
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            {d.title}
            <span aria-hidden="true">{open === i ? '–' : '+'}</span>
          </button>
          <div className={`pdetails__body${open === i ? ' is-open' : ''}`}>
            <div>
              <p>{d.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ProductPage({ product }: { product: Product }) {
  const [length, setLength] = useState(product.lengths[0])
  const [qty, setQty] = useState(1)
  const [status, setStatus] = useState('')
  const [shared, setShared] = useState(false)
  const soldOut = product.tag === 'Sold out'
  const images = useMemo(() => galleryFor(product), [product])
  const price = lengthPrice(product, length)

  const related = useMemo(
    () =>
      products
        .filter((o) => o.id !== product.id)
        .sort((a, b) => Number(b.texture === product.texture) - Number(a.texture === product.texture) || b.sales - a.sales)
        .slice(0, 4),
    [product],
  )

  useEffect(() => setStatus(''), [length, qty])

  const item = { id: product.id, name: product.name, img: product.img, length, price }

  const add = () => addToBag(item, qty)

  const buyNow = () => {
    addToBag(item, qty)
    setStatus('In the live store, this goes straight to Shopify checkout.')
  }

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: product.name, url })
      else await navigator.clipboard.writeText(url)
      setShared(true)
      window.setTimeout(() => setShared(false), 2000)
    } catch {
      /* share sheet dismissed */
    }
  }

  return (
    <>
      <section className="pdp container">
        <nav className="crumbs pdp__crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop">Shop</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="pdp__grid">
          <Gallery images={images} name={product.name} />

          <div className="pdp__info">
            <p className="pdp__kicker">
              {product.texture} {product.type === 'Bundle deals' ? 'bundle deal' : product.type.toLowerCase().replace(/s$/, '')}
            </p>
            <h1 className="pdp__title">{product.name}</h1>
            <p className="pdp__price">
              {money(price * qty)} GBP
              {qty > 1 && <span className="pdp__each">{money(price)} each</span>}
            </p>
            <p className="pdp__tax">Taxes included. Pay in 3 with Klarna.</p>

            <fieldset className="pdp__lengths">
              <legend>
                Length <span>{length}″, {fallsAt(length).toLowerCase()}</span>
              </legend>
              <div>
                {product.lengths.map((l) => (
                  <label key={l} className={l === length ? 'is-on' : undefined}>
                    <input type="radio" name="length" className="sr-only" checked={l === length} onChange={() => setLength(l)} />
                    {l}″
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="pdp__qty">
              <p className="pdp__label">Quantity</p>
              <div className="qty">
                <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span aria-live="polite">{qty}</span>
                <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
              {product.type === 'Bundles' && <p className="pdp__hint">Most full installs take 3 bundles.</p>}
            </div>

            <div className="pdp__buttons">
              <button className="btn btn--outline btn--block" disabled={soldOut} onClick={add}>
                {soldOut ? 'Sold out' : 'Add to cart'}
              </button>
              {!soldOut && (
                <button className="btn btn--solid btn--block" onClick={buyNow}>Buy it now</button>
              )}
            </div>
            <p className="pdp__status" role="status">{status}</p>

            <p className="pdp__desc">{DESCRIPTIONS[product.type]}</p>

            <Details product={product} />

            <button className="pdp__share" onClick={share}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v13M7 8l5-5 5 5M5 14v6h14v-6" />
              </svg>
              {shared ? 'Link copied' : 'Share'}
            </button>
          </div>
        </div>
      </section>

      <section className="section container related">
        <h2 className="section__title section__title--left">
          You may <em className="display-italic">also like</em>
        </h2>
        <ul className="pgrid">
          {related.map((p) => (
            <li key={p.id}><ProductCard product={p} /></li>
          ))}
        </ul>
      </section>
    </>
  )
}
