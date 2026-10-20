import { useEffect, useRef, useState, type ReactNode } from 'react'
import { img, isVideo, poster, vid } from '../asset'
import Media from '../components/Media'
import { alsoLike, buyItWith, describe, FREE_SHIPPING, galleryIndex, handle, money, sizeChart, type Product } from '../data'
import { Link } from '../router'
import { lockScroll, unlockScroll } from '../scrollLock'
import { addToCart } from '../store'
import ProductForm from '../components/ProductForm'
import ProductCard from '../components/ProductCard'
import { Reviews } from '../sections/Home'
import {
  BadgeCheckIcon,
  BagIcon,
  BoxIcon,
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  CloseIcon,
  DollarIcon,
  MinusIcon,
  PlusIcon,
  QuestionIcon,
  RecycleIcon,
  SearchIcon,
  ShareIcon,
} from '../icons'

/* ---------- Gallery: 2-up grid on desktop, swipe slider on phones ---------- */

function Gallery({ product, jumpTo }: { product: Product; jumpTo: { index: number; n: number } }) {
  const strip = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [zoom, setZoom] = useState<number | null>(null)

  // A colour pick brings its photo into view (scrolls the page on desktop, the slider on phones).
  useEffect(() => {
    if (jumpTo.n === 0) return
    const el = strip.current
    const item = el?.children[jumpTo.index] as HTMLElement | undefined
    if (!el || !item) return
    if (el.scrollWidth > el.clientWidth) el.scrollTo({ left: item.offsetLeft, behavior: 'smooth' })
    else item.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [jumpTo])

  const onScroll = () => {
    const el = strip.current
    if (el && el.clientWidth) setCurrent(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <div className="pdp__gallery">
      <div className="pdp__images" ref={strip} onScroll={onScroll}>
        {product.gallery.map((src, i) => (
          <button key={src} className="pdp__image" onClick={() => setZoom(i)} aria-label={`Zoom image ${i + 1}`}>
            <Media name={src} alt={i === 0 ? product.name : ''} eager={i < 2} />
            <span className="pdp__zoom"><SearchIcon size={18} /></span>
          </button>
        ))}
      </div>
      {product.gallery.length > 1 && (
        <div className="pdp__dots" aria-hidden="true">
          {product.gallery.map((src, i) => <span key={src} className={i === current ? 'is-active' : undefined} />)}
        </div>
      )}
      {zoom !== null && <Lightbox images={product.gallery} start={zoom} onClose={() => setZoom(null)} />}
    </div>
  )
}

function Lightbox({ images, start, onClose }: { images: string[]; start: number; onClose: () => void }) {
  const [i, setI] = useState(start)
  const go = (d: number) => setI((n) => (n + d + images.length) % images.length)

  useEffect(() => {
    lockScroll()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
      {isVideo(images[i]) ? (
        <video key={images[i]} src={vid(images[i])} poster={poster(images[i])} controls autoPlay muted loop playsInline />
      ) : (
        <img key={images[i]} src={img(images[i])} alt="" />
      )}
      <button className="icon-btn lightbox__close" aria-label="Close" onClick={onClose} autoFocus><CloseIcon size={26} /></button>
      {images.length > 1 && (
        <>
          <button className="qv__arrow lightbox__prev" aria-label="Previous image" onClick={() => go(-1)}><ChevronLeft /></button>
          <button className="qv__arrow lightbox__next" aria-label="Next image" onClick={() => go(1)}><ChevronRight /></button>
          <p className="lightbox__count">{i + 1} / {images.length}</p>
        </>
      )}
    </div>
  )
}

/* ---------- Info column ---------- */

// Sticks to the top while it fits; when it is taller than the screen it scrolls with the page
// until its bottom shows, then sticks there — so nothing in it is ever out of reach.
function useSmartSticky<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 76
      el.style.top = `${Math.min(header + 24, window.innerHeight - el.offsetHeight - 24)}px`
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])
  return ref
}

function BuyItWith() {
  const track = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [added, setAdded] = useState<string | null>(null)

  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(null), 1600)
    return () => clearTimeout(t)
  }, [added])

  const goTo = (i: number) => track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: 'smooth' })
  const onScroll = () => {
    const el = track.current
    if (el && el.clientWidth) setCurrent(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <div className="bundle">
      <h2 className="pdp__heading">Buy it with</h2>
      <div className="bundle__track" ref={track} onScroll={onScroll}>
        {buyItWith.map((p) => (
          <article key={p.id} className="bundle__card">
            <Link href={`/products/${p.id}`} className="bundle__img"><img src={img(p.image)} alt="" loading="lazy" /></Link>
            <div className="bundle__body">
              <h3><Link href={`/products/${p.id}`}>{p.name}</Link></h3>
              <p className="pcard__price">
                <span>{money(p.price)}</span>
                {p.compareAt && <s>{money(p.compareAt)}</s>}
              </p>
              <ul className="bundle__swatches" aria-label="Colours">
                {p.swatches.map((s) => <li key={s.name} style={{ background: s.color }} title={s.name} />)}
              </ul>
            </div>
            <button
              className="bundle__add"
              aria-label={`Add ${p.name} to cart`}
              onClick={() => {
                addToCart({ productId: p.id, color: p.swatches[0].name, size: p.sizes[0], qty: 1 })
                setAdded(p.id)
              }}
            >
              {added === p.id ? <CheckIcon /> : <BagIcon size={18} />}
            </button>
          </article>
        ))}
      </div>
      <div className="bundle__dots">
        {buyItWith.map((p, i) => (
          <button key={p.id} className={i === current ? 'is-active' : undefined} aria-label={`Show item ${i + 1}`} onClick={() => goTo(i)} />
        ))}
      </div>
    </div>
  )
}

function Accordion({ title, open, children }: { title: string; open?: boolean; children: ReactNode }) {
  return (
    <details className="acc" open={open}>
      <summary>
        {title}
        <span className="acc__plus"><PlusIcon size={16} /></span>
        <span className="acc__minus"><MinusIcon size={16} /></span>
      </summary>
      <div className="acc__body">{children}</div>
    </details>
  )
}

function ShareButton({ name }: { name: string }) {
  const [copied, setCopied] = useState(false)
  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: name, url })
      else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }
    } catch {
      /* share sheet dismissed */
    }
  }
  return (
    <button className="pdp__util" onClick={share}>
      <ShareIcon /> {copied ? 'Link copied' : 'Share'}
    </button>
  )
}

function Info({ product, swatch, onSwatch }: { product: Product; swatch: number; onSwatch: (i: number) => void }) {
  const ref = useSmartSticky<HTMLDivElement>()
  return (
    <div className="pdp__info" ref={ref}>
      <h1 className="pdp__title">{product.name}</h1>
      <p className="qv__price pdp__price">
        <span>{money(product.price)}</span>
        {product.compareAt && <s>{money(product.compareAt)}</s>}
      </p>
      <p className="pdp__intro">
        Sculpting, second-skin and squat-proof — cut to hold and celebrate every curve. <Link href="/pages/about">Our story</Link>
      </p>
      <p className={`pdp__stock${product.soldOut ? ' is-out' : ''}`}>
        <span className="pdp__stock-dot" /> {product.soldOut ? 'Out of stock — back soon' : 'In stock, ready to ship'}
      </p>

      <ProductForm product={product} swatch={swatch} onSwatch={onSwatch} />

      <div className="pdp__pickup">
        <CheckIcon />
        <div>
          <p>Pickup available at <strong>JLuxCurves Studio</strong></p>
          <p className="pdp__muted">Usually ready in 24 hours</p>
          <a href="#">View Store Information</a>
        </div>
      </div>

      <ul className="pdp__perks">
        <li><BoxIcon /> Free Shipping for orders ${FREE_SHIPPING}+</li>
        <li><DollarIcon /> Money back within 30 days for an exchange.</li>
      </ul>

      <BuyItWith />

      <div className="pdp__accs">
        <Accordion title="Core features" open>
          <p>{describe(product)}</p>
        </Accordion>
        <Accordion title="Size & specs">
          <p>True to size with a sculpting, second-skin fit. Between sizes? Size up for a relaxed feel.</p>
          <table className="sizes">
            <thead>
              <tr><th>Size</th><th>US</th><th>Waist</th><th>Hip</th></tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr key={row[0]}>{row.map((c) => <td key={c}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
          <p>Fabric: 84% recycled polyester (RPET), 16% spandex. Machine wash cold, hang to dry.</p>
        </Accordion>
        <Accordion title="Shipping & return">
          <p>
            Orders ship within 1–2 business days. Free standard shipping on orders over ${FREE_SHIPPING}. Not the right fit? Exchange or return
            unworn items within 30 days.
          </p>
        </Accordion>
      </div>

      <div className="pdp__utils">
        <ShareButton name={product.name} />
        <Link href="/pages/contact" className="pdp__util"><QuestionIcon /> Ask a question</Link>
      </div>
    </div>
  )
}

/* ---------- Below the fold ---------- */

function TrustBar() {
  const items = [
    { Icon: RecycleIcon, text: 'Made From Recycled Materials' },
    { Icon: BadgeCheckIcon, text: 'Ethically Made In Certified Factories' },
  ]
  return (
    <section className="marquee trust" aria-label="Our promise">
      <div className="marquee__inner">
        {Array.from({ length: 8 }, (_, copy) =>
          items.map(({ Icon, text }) => (
            <span key={`${copy}-${text}`} className="trust__item" aria-hidden={copy > 0}>
              <Icon /> {text}
            </span>
          )),
        )}
      </div>
    </section>
  )
}

function Sustainability() {
  return (
    <section className="green">
      <div className="green__inner container">
        <p className="eyebrow">Sustainability</p>
        <h2 className="green__title">Green is <em>charming</em></h2>
        <p>
          We are a team of artists and activists, working to reduce the negative footprints on our earth. Our sustainability practices
          are rooted in mindfulness and the power of choice — from day-to-day decisions to major resolutions. We believe that a
          collective effort of sustainability has the ability to change our trajectory towards a healthier, more verdant planet. See?
          Sexy.
        </p>
        <Link href="/pages/about" className="link-underline">Learn more</Link>
      </div>
    </section>
  )
}

function AlsoLike({ product }: { product: Product }) {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (d: number) => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (el && card) el.scrollBy({ left: d * (card.offsetWidth + 6), behavior: 'smooth' })
  }
  return (
    <section className="section container rail">
      <h2 className="h2 rail__title">You May Also Like</h2>
      <div className="rail__wrap">
        <div className="rail__track" ref={track}>
          {alsoLike(product).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <button className="qv__arrow rail__arrow rail__arrow--prev" aria-label="Previous products" onClick={() => scroll(-1)}><ChevronLeft /></button>
        <button className="qv__arrow rail__arrow rail__arrow--next" aria-label="Next products" onClick={() => scroll(1)}><ChevronRight /></button>
      </div>
    </section>
  )
}

/* ---------- Page ---------- */

export default function ProductPage({ product }: { product: Product }) {
  const [swatch, setSwatch] = useState(0)
  const [jumpTo, setJumpTo] = useState({ index: 0, n: 0 })

  useEffect(() => {
    document.title = `${product.name} – JLuxCurves`
    return () => {
      document.title = 'JLuxCurves'
    }
  }, [product])

  const pickSwatch = (i: number) => {
    setSwatch(i)
    const at = galleryIndex(product, i)
    if (at >= 0) setJumpTo((j) => ({ index: at, n: j.n + 1 }))
  }

  return (
    <>
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={12} />
          <Link href={`/collections/${handle(product.collection)}`}>{product.collection}</Link>
          <ChevronRight size={12} />
          <span aria-current="page">{product.name}</span>
        </nav>
        <div className="pdp">
          <Gallery product={product} jumpTo={jumpTo} />
          <Info product={product} swatch={swatch} onSwatch={pickSwatch} />
        </div>
      </div>
      <TrustBar />
      <Reviews />
      <Sustainability />
      <AlsoLike product={product} />
    </>
  )
}
