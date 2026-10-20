import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { img, isVideo, still } from '../asset'
import Media from '../components/Media'
import {
  alsoLike,
  collectionOf,
  colorsOf,
  descriptionOf,
  FREE_SHIPPING,
  galleryOf,
  handle,
  looksGoodWith,
  money,
  chartOf,
  sizesOf,
  type Product,
} from '../data'
import { Link } from '../router'
import { lockScroll, unlockScroll } from '../scrollLock'
import { addToCart, cartSubtotal, useCart } from '../store'
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CloseIcon,
  DiamondIcon,
  FacebookIcon,
  InstagramBig,
  IronIcon,
  MailIcon,
  MedalIcon,
  MinusIcon,
  PinterestIcon,
  PlusIcon,
  ReceiptIcon,
  ShirtIcon,
  TruckIcon,
  WasherIcon,
  XIcon,
} from '../icons'

/* ---------- Gallery: thumbnail rail + main image ---------- */

function Gallery({ product, index, onIndex }: { product: Product; index: number; onIndex: (i: number) => void }) {
  const images = galleryOf(product)
  const rail = useRef<HTMLDivElement>(null)
  const many = images.length > 1
  const go = (d: number) => onIndex((index + d + images.length) % images.length)

  // keep the active thumbnail in view
  useEffect(() => {
    const el = rail.current?.children[index] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }, [index])

  return (
    <div className={`gallery${many ? '' : ' gallery--single'}`}>
      {many && (
        <div className="gallery__rail">
          <button className="gallery__step" aria-label="Previous image" onClick={() => go(-1)}><ChevronUp /></button>
          <div className="gallery__thumbs" ref={rail}>
            {images.map((src, i) => (
              <button key={src} className={i === index ? 'is-active' : undefined} aria-label={`Show ${isVideo(src) ? 'video' : 'image'} ${i + 1}`} onClick={() => onIndex(i)}>
                <img src={still(src)} alt="" />
                {isVideo(src) && <span className="thumb-play" aria-hidden="true" />}
              </button>
            ))}
          </div>
          <button className="gallery__step" aria-label="Next image" onClick={() => go(1)}><ChevronDown size={18} /></button>
        </div>
      )}
      <div className="gallery__main">
        {images.map((src, i) => (
          <Media key={src} name={src} alt={i === 0 ? product.name : ''} className={i === index ? 'is-active' : undefined} eager={i === 0} />
        ))}
        {many && (
          <>
            <button className="gallery__arrow gallery__arrow--prev" aria-label="Previous image" onClick={() => go(-1)}><ChevronLeft /></button>
            <button className="gallery__arrow gallery__arrow--next" aria-label="Next image" onClick={() => go(1)}><ChevronRight /></button>
            <div className="gallery__dots" aria-hidden="true">
              {images.map((src, i) => <span key={src} className={i === index ? 'is-active' : undefined} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ---------- Bits of the info column ---------- */

function SizeGuide({ product, onClose }: { product: Product; onClose: () => void }) {
  const chart = chartOf(product)
  useEffect(() => {
    lockScroll()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Size guide">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__panel">
        <button className="icon-btn modal__close" aria-label="Close" onClick={onClose} autoFocus><CloseIcon /></button>
        <h2>Size guide</h2>
        <p>{chart.note}</p>
        <table className="chart">
          <thead>
            <tr>{chart.head.map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {chart.rows.map((r) => <tr key={r[0]}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Accordion({ Icon, title, children }: { Icon: () => ReactNode; title: string; children: ReactNode }) {
  return (
    <details className="acc">
      <summary>
        <span className="acc__title"><Icon /> {title}</span>
        <span className="acc__plus"><PlusIcon size={16} /></span>
        <span className="acc__minus"><MinusIcon size={16} /></span>
      </summary>
      <div className="acc__body">{children}</div>
    </details>
  )
}

function ShippingMeter() {
  const subtotal = cartSubtotal(useCart())
  const left = Math.max(0, FREE_SHIPPING - subtotal)
  return (
    <div className="meter">
      <p>
        <TruckIcon />{' '}
        <span>{left > 0 ? <>Spend <strong>{money(left).replace('.00', '')}</strong> to get free shipping</> : <>You've unlocked <strong>free shipping</strong></>}</span>
      </p>
      <span className="meter__bar"><span style={{ width: `${Math.min(1, subtotal / FREE_SHIPPING) * 100}%` }} /></span>
    </div>
  )
}

function Share({ name }: { name: string }) {
  const url = typeof window === 'undefined' ? '' : window.location.href
  const enc = encodeURIComponent
  return (
    <ul className="share" aria-label="Share">
      <li><a href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook"><FacebookIcon /></a></li>
      <li><a href={`https://x.com/intent/post?url=${enc(url)}&text=${enc(name)}`} target="_blank" rel="noreferrer" aria-label="Share on X"><XIcon /></a></li>
      <li><a href={`https://pinterest.com/pin/create/button/?url=${enc(url)}&description=${enc(name)}`} target="_blank" rel="noreferrer" aria-label="Pin on Pinterest"><PinterestIcon /></a></li>
      <li><a href={`mailto:?subject=${enc(name)}&body=${enc(url)}`} aria-label="Share by email"><MailIcon /></a></li>
    </ul>
  )
}

/* ---------- Info column ---------- */

function Info({ product, onColor }: { product: Product; onColor: (image?: string) => void }) {
  const colors = colorsOf(product)
  const sizes = sizesOf(product)
  const [size, setSize] = useState(sizes[0])
  const [color, setColor] = useState(0)
  const [qty, setQty] = useState(1)
  const [guide, setGuide] = useState(false)
  const current = colors[color]

  const pick = (i: number) => {
    setColor(i)
    onColor(colors[i].image)
  }
  const add = () =>
    addToCart({ productId: product.id, name: product.name, image: current.image ?? product.image, variant: `${size} / ${current.name}`, price: product.price }, qty)

  return (
    <div className="info">
      <h1 className="info__title">{product.name}</h1>
      <p className="info__price">
        <span className={product.compareAt ? 'is-sale' : undefined}>{money(product.price)}</span>
        {product.compareAt && <s>{money(product.compareAt)}</s>}
      </p>

      <div className="opt">
        <div className="opt__head">
          <span>Size</span>
          <button className="opt__link" onClick={() => setGuide(true)}>Size guide</button>
        </div>
        <div className="sizes">
          {sizes.map((s) => (
            <button key={s} className={s === size ? 'is-active' : undefined} aria-pressed={s === size} onClick={() => setSize(s)}>{s}</button>
          ))}
        </div>
      </div>

      <div className="opt">
        <div className="opt__head"><span>Color: <span className="opt__value">{current.name}</span></span></div>
        <div className="colors">
          {colors.map((c, i) => (
            <button
              key={c.name}
              className={`${i === color ? 'is-active' : ''}${c.soldOut ? ' is-out' : ''}`}
              style={{ '--c': c.color } as CSSProperties}
              aria-label={`${c.name}${c.soldOut ? ' (sold out)' : ''}`}
              aria-pressed={i === color}
              title={c.name}
              onClick={() => pick(i)}
            />
          ))}
        </div>
      </div>

      <p className={`stock${current.soldOut ? ' is-out' : ''}`}><span /> {current.soldOut ? 'Sold out in this colour' : 'In stock'}</p>

      <div className="opt">
        <div className="opt__head"><span>Quantity</span></div>
        <div className="qty">
          <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>–</button>
          <input aria-label="Quantity" inputMode="numeric" value={qty} onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value.replace(/\D/g, '')) || 1)))} />
          <button aria-label="Increase quantity" onClick={() => setQty(Math.min(99, qty + 1))}>+</button>
        </div>
      </div>

      <div className="buy">
        <button className="btn btn--outline buy__btn" onClick={add} disabled={current.soldOut}>{current.soldOut ? 'Sold out' : 'Add to cart'}</button>
        <button className="btn btn--coral buy__btn" onClick={add} disabled={current.soldOut}>Buy it now</button>
      </div>

      <ShippingMeter />

      <p className="info__desc">{descriptionOf(product)}</p>

      <Share name={product.name} />

      <div className="about">
        <span className="about__mark" aria-hidden="true">
          <span>S</span><span className="about__dot">·</span><span /><span>U</span>
        </span>
        <div>
          <h2>About this product</h2>
          <p>
            Designed in-house by SuitUp and made in small runs by partner workshops we know by name. <Link href="/about">Read our story</Link>.
          </p>
        </div>
      </div>

      <div className="accs">
        <Accordion Icon={() => <ReceiptIcon />} title="Premier delivery">
          <p>Free standard delivery on orders over {money(FREE_SHIPPING).replace('.00', '')}. Next-day delivery is available at checkout, and every order ships in recyclable packaging.</p>
        </Accordion>
        <Accordion Icon={() => <MedalIcon />} title="Our guarantee">
          <p>Not quite right? Return or exchange unworn items within 30 days. And if something gives out from normal wear, bring it in and we'll repair it for free.</p>
        </Accordion>
      </div>

      <div className="pairs">
        <h2>Looks good with</h2>
        <Carousel className="pairs__carousel">
          {looksGoodWith(product).map((p) => <ProductCard key={p.id} product={p} />)}
        </Carousel>
      </div>

      {guide && <SizeGuide product={product} onClose={() => setGuide(false)} />}
    </div>
  )
}

/* ---------- Below the fold ---------- */

const features = [
  { Icon: WasherIcon, title: 'Made to measure', copy: 'Every suit is cut and finished for you. Book a fitting at the boutique and we will take it from there.' },
  { Icon: DiamondIcon, title: 'Premium fabrics', copy: 'Fine wool blends, jacquards and velvets, chosen to drape well, breathe and last for years.' },
  { Icon: IronIcon, title: 'Free alterations', copy: 'Sleeves, hems and waist: alterations are on us, so your suit fits the way it should.' },
  { Icon: ShirtIcon, title: 'Suits everybody', copy: 'Our jackets and trousers have a clever, flattering cut that suits all body types. No gym membership needed.' },
]

const quotes = [
  { text: 'The overshirt fits like it was made for me. Sharp enough for the office, easy enough for the weekend.', name: 'Kwame Asante', source: 'Instagram' },
  { text: 'You guys seem to be in tune with both my outlook on business and my fashion sense too. Happy I found you and long may you continue!', name: 'Michael Davis', source: 'Instagram' },
  { text: 'Third order this year. The fabric holds up wash after wash and the service is always spot on.', name: 'Daniel Mensah', source: 'Instagram' },
]

function Quotes() {
  const [i, setI] = useState(1)
  const go = (d: number) => setI((n) => (n + d + quotes.length) % quotes.length)
  const q = quotes[i]
  return (
    <section className="quotes">
      <button className="quotes__arrow" aria-label="Previous review" onClick={() => go(-1)}><ChevronLeft size={34} /></button>
      <figure key={i} className="quotes__body">
        <InstagramBig />
        <blockquote>"{q.text}"</blockquote>
        <figcaption>
          <strong>{q.name}</strong>
          <span>{q.source}</span>
        </figcaption>
      </figure>
      <button className="quotes__arrow" aria-label="Next review" onClick={() => go(1)}><ChevronRight size={34} /></button>
      <div className="quotes__dots">
        {quotes.map((x, n) => <button key={x.name} className={n === i ? 'is-active' : undefined} aria-label={`Show review ${n + 1}`} onClick={() => setI(n)} />)}
      </div>
    </section>
  )
}

/* ---------- Page ---------- */

export default function ProductPage({ product }: { product: Product }) {
  const images = galleryOf(product)
  const [index, setIndex] = useState(0)
  const collection = collectionOf(product)

  useEffect(() => {
    document.title = `${product.name} – SuitUp`
    return () => {
      document.title = 'SuitUp'
    }
  }, [product])

  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={11} />
        <Link href={`/collections/${handle(collection)}`}>{collection}</Link>
        <ChevronRight size={11} />
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="pdp">
        <Gallery product={product} index={index} onIndex={setIndex} />
        <Info
          product={product}
          onColor={(image) => {
            const at = image ? images.indexOf(image) : -1
            if (at >= 0) setIndex(at)
          }}
        />
      </div>

      <section className="features">
        {features.map(({ Icon, title, copy }) => (
          <div key={title} className="feature">
            <Icon />
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </section>

      <section className="cuffs">
        <img src={img('banner-horse.webp')} alt="" loading="lazy" />
        <div className="cuffs__content">
          <p>Jacquard, brocade and velvet, cut sharp and finished by hand. Evening wear made for the nights you will remember.</p>
          <Link href="/collections/evening-wear" className="btn btn--ghost">Shop evening wear</Link>
        </div>
      </section>

      <Quotes />

      <section className="stories pdp-stories">
        <div className="story">
          <img className="story__img" src={img('story-boutique.webp')} alt="An espresso double-breasted suit on a mannequin in the SuitUp boutique" loading="lazy" />
          <div className="story__text">
            <h2>Visit the boutique</h2>
            <p>
              Come in for a fitting and our tailors will help you find the right cut, fabric and finish, then make sure it fits perfectly before it
              leaves the shop.
            </p>
            <a href="#stores" className="btn btn--outline">Book a fitting</a>
          </div>
        </div>
        <div className="story story--flip story--right">
          <img className="story__img" src={img('story-studio.webp')} alt="A man in a navy double-breasted suit against a warm studio backdrop" loading="lazy" />
          <div className="story__text">
            <h2>Built to last</h2>
            <p>
              Good tailoring is an investment. We choose fabrics and construction that hold their shape season after season, and we will keep your
              suit in shape with free alterations.
            </p>
            <Link href="/collections/suits" className="btn btn--outline">Shop suits</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">You may also like</h2>
        <Carousel className="container-narrow pants__carousel">
          {alsoLike(product).map((p) => <ProductCard key={p.id} product={p} />)}
        </Carousel>
      </section>
    </>
  )
}
