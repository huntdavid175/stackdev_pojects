import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { img } from '../asset'
import { categories, handle, HERO, latestArrivals, mustHaves, findProduct } from '../data'
import { Link } from '../router'
import { ArrowRight } from '../icons'
import ProductCard from '../components/ProductCard'
import Media from '../components/Media'

/* ---------- Hero ---------- */

// The wordmark is SVG text stretched to an exact width, so it always spans the hero whatever the screen.
function Wordmark() {
  return (
    <h1 className="hero__mark">
      <span className="sr-only">JLuxCurves</span>
      <svg className="hero__mark-wide" viewBox="0 0 1000 120" aria-hidden="true">
        <text x="0" y="112" textLength="1000" lengthAdjust="spacingAndGlyphs">JLUXCURVES</text>
      </svg>
      <svg className="hero__mark-stack" viewBox="0 0 600 250" aria-hidden="true">
        <text x="90" y="112" textLength="420" lengthAdjust="spacingAndGlyphs">JLUX</text>
        <text x="0" y="240" textLength="600" lengthAdjust="spacingAndGlyphs">CURVES</text>
      </svg>
    </h1>
  )
}

export function Hero() {
  return (
    <section className={`hero hero--${HERO.tone}`} style={{ '--hero-x': HERO.focusX, '--hero-x-phone': HERO.focusXPhone } as CSSProperties}>
      <picture>
        <source media="(max-width: 989px)" srcSet={img(HERO.imagePortrait)} />
        <img className="hero__img" src={img(HERO.image)} alt={HERO.alt} fetchPriority="high" />
      </picture>
      <div className="hero__shade" />
      <Wordmark />
      <div className="hero__content">
        <p className="eyebrow">{HERO.eyebrow}</p>
        <h2 className="hero__title">
          {HERO.title[0]} <em>{HERO.title[1]}</em>
        </h2>
        <Link href={HERO.href} className="btn hero__btn">Shop now</Link>
      </div>
    </section>
  )
}

/* ---------- Intro + categories ---------- */

export function CategoryGrid({ className = '' }: { className?: string }) {
  return (
    <div className={`cats__grid ${className}`}>
      {categories.map((c) => (
        <Link key={c.title} href={`/collections/${handle(c.title)}`} className="cat">
          <img src={img(c.image)} alt="" loading="lazy" />
          <span className="cat__foot">
            <span>{c.title}</span>
            <span className="cat__arrow"><ArrowRight size={14} /></span>
          </span>
        </Link>
      ))}
    </div>
  )
}

export function Categories() {
  return (
    <section className="cats">
      <p className="cats__intro">
        Discover our world of substance and style, connect with us, and explore your luxury <em>fashion happy place.</em>
      </p>
      <CategoryGrid />
      <hr className="rule" />
    </section>
  )
}

/* ---------- Latest arrivals (tabs) ---------- */

export function LatestArrivals() {
  const tabs = Object.keys(latestArrivals) as (keyof typeof latestArrivals)[]
  const [tab, setTab] = useState(tabs[0])
  return (
    <section className="section container">
      <div className="section__head">
        <h2 className="h2">
          Our Latest <em>Arrivals</em>
        </h2>
        <div className="tabs" role="tablist">
          {tabs.map((t) => (
            <button key={t} role="tab" aria-selected={t === tab} className={t === tab ? 'is-active' : undefined} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="pgrid" role="tabpanel" key={tab}>
        {latestArrivals[tab].map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}

/* ---------- Customer favourites ---------- */

const favourites = [
  { title: 'Active Tops', image: 'fav-pink.webp' },
  { title: 'Working Girl', image: 'p-amy.webp' },
  { title: 'Classic', image: 'fav-plum.webp' },
  { title: 'Biker Shorts', image: 'fav-red.webp' },
]

export function Favourites() {
  const [active, setActive] = useState(0)
  return (
    <section className="favs">
      <div className="favs__inner container">
        <div className="favs__list">
          <p className="eyebrow">Customer favorites</p>
          <ol>
            {favourites.map((f, i) => (
              <li key={f.title}>
                <Link
                  href={`/collections/${handle(f.title)}`}
                  className={i === active ? 'is-active' : undefined}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="favs__num">{String(i + 1).padStart(2, '0')}.</span>
                  <span className="favs__name">{f.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <div className="favs__media">
          {favourites.map((f, i) => (
            <img key={f.image} src={img(f.image)} alt="" loading="lazy" className={i === active ? 'is-active' : undefined} />
          ))}
        </div>
        <div className="favs__copy">
          <h2 className="h2">
            Your style, your <em>happy place</em>
          </h2>
          <p>
            Discover the latest arrivals, solve your style dilemmas, and create the perfect outfit for any occasion—effortless
            fashion and lasting confidence start here.
          </p>
          <Link href="/collections/all" className="link-underline">Shop all items</Link>
        </div>
      </div>
    </section>
  )
}

/* ---------- Lookbook (sticky, scroll-driven on desktop) ---------- */

const looks = [
  {
    eyebrow: 'The lookbooks',
    title: <>Effortlessly elevate your <em>aesthetic</em></>,
    copy: 'Second-skin unitards in rich, grounded tones that sculpt, smooth and celebrate every curve. Made for the studio, the school run and everything in between.',
    image: 'look-duo.webp',
  },
  {
    eyebrow: 'The must-haves',
    title: <>Wardrobe staples, <em>reinvented</em></>,
    copy: 'The fashion favorites you know, reimagined for today’s trends. Designed for comfort, durability, and effortless styling, they’ll always have a place in your closet.',
    image: 'look-pool.webp',
  },
  {
    eyebrow: 'The weekend edit',
    title: <>Made to move, <em>made to stay</em></>,
    copy: 'Sets made for sunny days with your girls: soft, sculpting and cut to hold every curve, from garden brunch to the after-party.',
    image: 'group-garden.webp',
  },
]

export function Lookbook() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const update = () => {
      frame = 0
      const travel = el.offsetHeight - window.innerHeight
      if (travel <= 0) return
      const p = Math.min(Math.max(-el.getBoundingClientRect().top / travel, 0), 1) * (looks.length - 1)
      el.style.setProperty('--p', p.toFixed(4))
      setActive(Math.round(p))
    }
    const onScroll = () => (frame ||= requestAnimationFrame(update))
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const travel = el.offsetHeight - window.innerHeight
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (travel * i) / (looks.length - 1) + 1, behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="look" style={{ '--n': looks.length } as CSSProperties}>
      <div className="look__stage">
        <div className="look__texts">
          {looks.map((l, i) => (
            <div key={i} className={`look__text${i === active ? ' is-active' : ''}`} aria-hidden={i !== active}>
              <p className="eyebrow">{l.eyebrow}</p>
              <h2 className="look__title">{l.title}</h2>
              <p className="look__copy">{l.copy}</p>
              <Link href="/pages/lookbook" className={`btn ${i === 1 ? 'btn--blush' : 'btn--light'}`} tabIndex={i === active ? 0 : -1}>
                Shop now
              </Link>
            </div>
          ))}
        </div>
        <div className="look__frames">
          {looks.map((l, i) => (
            <img key={i} src={img(l.image)} alt="" loading="lazy" style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
        <div className="look__dots">
          {looks.map((_, i) => (
            <button key={i} className={i === active ? 'is-active' : undefined} aria-label={`Show look ${i + 1}`} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>

      {/* Phones and tablets: a plain stack instead of the sticky stage */}
      <div className="look__stack">
        {looks.map((l, i) => (
          <article key={i} className="look__item">
            <img src={img(l.image)} alt="" loading="lazy" />
            <p className="eyebrow">{l.eyebrow}</p>
            <h2 className="look__title">{l.title}</h2>
            <p className="look__copy">{l.copy}</p>
            <Link href="/pages/lookbook" className={`btn ${i === 1 ? 'btn--blush' : 'btn--light'}`}>Shop now</Link>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------- New collection ---------- */

const capsule = [
  { title: 'Tops', image: 'cut-tops.webp' },
  { title: 'Flares', image: 'cut-leggings.webp' },
  { title: 'Bikinis', image: 'cut-swimwear.webp' },
]

export function NewCollection() {
  return (
    <section className="section newcol">
      <div className="center-head container">
        <p className="eyebrow eyebrow--dark">New collection</p>
        <h2 className="h2">
          Psychedelic <em>Meets Sexy</em>
        </h2>
        <p>When we say we want to Make Sustainability Sexy, we truly mean it. We are a team of artists and activists.</p>
      </div>
      <div className="newcol__grid">
        {capsule.map((c) => (
          <Link key={c.title} href={`/collections/${handle(c.title)}`} className="newcol__card">
            <span className="newcol__tag">Eco - friendly</span>
            <img src={img(c.image)} alt="" loading="lazy" />
            <span className="newcol__title">{c.title}</span>
            <span className="newcol__copy">Lightweight, breathable, and perfect for any activity</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ---------- Reviews marquee ---------- */

const reviews = [
  { media: 'v-garden-duo.mp4', shape: 'tall', quote: 'Obsessed with my halter set – it hugs every curve and feels like butter!', name: 'Ama K.', product: 'halter-flare-set' },
  { media: 'p-croptee-trio.webp', shape: 'square', quote: 'We bought the crop tee set in three colours. Zero regrets!', name: 'Efua A.', product: 'crop-tee-flare-set' },
  { media: 'v-plum-tee.mp4', shape: 'tall', quote: 'Soft, stretchy and so flattering. I basically live in this set.', name: 'Abena O.', product: 'plum-tee-flare-set' },
  { media: 'p-track-trio.webp', shape: 'square', quote: 'Matching track sets for the girls – comfy and so chic.', name: 'Adjoa M.', product: 'stripe-track-set' },
  { media: 'v-fleece-trio.mp4', shape: 'tall', quote: 'The fleece zip is my new travel uniform. Cinches the waist perfectly.', name: 'Nana Y.', product: 'fleece-zip-jacket' },
  { media: 'p-catsuit-2.webp', shape: 'square', quote: 'This catsuit snatched my waist instantly. Wore it out the same day!', name: 'Esi B.', product: 'sculpt-contour-catsuit' },
]

export function Reviews() {
  return (
    <section className="section reviews">
      <div className="center-head container">
        <h2 className="h2">
          Loved by <em>100,000</em> &amp; counting
        </h2>
        <p>A world of luxury without labels. Show us your world &amp; tag @jluxcurves</p>
      </div>
      <div className="marquee reviews__track">
        <div className="marquee__inner">
          {/* Four copies: the strip slides by half its width, so each half (two copies, ~3,600px)
              is wider than any screen and the loop never shows a gap. */}
          {[0, 1, 2, 3].map((copy) =>
            reviews.map((r) => (
              <figure key={`${copy}-${r.name}`} className={`review review--${r.shape}`} aria-hidden={copy > 0}>
                <Media name={r.media} />
                <blockquote>“{r.quote}”</blockquote>
                <figcaption>
                  <strong>{r.name}</strong>
                  <Link href={`/products/${r.product}`} tabIndex={copy > 0 ? -1 : 0}>{findProduct(r.product)?.name}</Link>
                </figcaption>
              </figure>
            )),
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------- Offer banner ---------- */

export function Offer() {
  return (
    <section className="offer container">
      <div className="offer__box">
        <div className="offer__half">
          <p className="eyebrow">Special offer</p>
          <p className="offer__big">Sale 30% off</p>
          <p className="offer__small">*Ends November 30 2026, 12:00 GMT. T&amp;C’s Apply</p>
        </div>
        <div className="offer__half">
          <h2 className="h2">
            Seasonal <em>Savings Event</em>
          </h2>
          <p className="offer__small">Up to 30% Off on Must-Have Styles !</p>
          <Link href="/collections/sale" className="btn btn--light">Shop the sale</Link>
        </div>
      </div>
    </section>
  )
}

/* ---------- Must-have trends ---------- */

export function MustHaves() {
  return (
    <section className="section container">
      <div className="section__head">
        <h2 className="h2">
          Must-Have <em>Trends</em>
        </h2>
        <Link href="/collections/all" className="link-underline">Shop all products</Link>
      </div>
      <div className="pgrid">
        {mustHaves.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}

/* ---------- Spotlight + press ---------- */

export function Spotlight() {
  return (
    <section className="spot">
      <img className="spot__img" src={img('spotlight.webp')} alt="" loading="lazy" />
      <div className="spot__content">
        <p className="eyebrow">Don’t miss out</p>
        <h2 className="spot__title">Spotlight on sale</h2>
        <p>Where premium-quality activewear meets unbeatable discounts, featuring cutting-edge designs and performance-driven fabrics.</p>
        <Link href="/collections/sale" className="btn btn--light">Shop sale</Link>
      </div>
    </section>
  )
}

const press = [
  ['instyle', 'InStyle'],
  ['bustle', 'Bustle'],
  ['refinery29', 'Refinery29'],
  ['elle', 'ELLE'],
  ['marieclaire', 'Marie Claire'],
  ['libreria', 'Libreria'],
  ['forbes', 'Forbes'],
]

export function Press() {
  return (
    <section className="marquee press" aria-label="As seen in">
      <div className="marquee__inner">
        {[0, 1, 2, 3].map((copy) =>
          press.map(([file, name]) => (
            <img key={`${copy}-${file}`} src={img(`press-${file}.webp`)} alt={copy === 0 ? name : ''} loading="lazy" />
          )),
        )}
      </div>
    </section>
  )
}
