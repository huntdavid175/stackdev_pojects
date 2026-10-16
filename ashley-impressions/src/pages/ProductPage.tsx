import { useState } from 'react'
import { Link, PRODUCT_URL } from '../router'
import { addToCart } from '../cart'
import { ChevronLeft, ChevronRight, Check, Plus, ShareIcon, HelpIcon, TruckIcon, BoxIcon, Star } from '../icons'
import UpsellCarousel from '../components/UpsellCarousel'
import { img } from '../asset'

const gallery = [
  { src: 'products/anua-heartleaf-foam.webp', alt: 'Anua Heartleaf Quercetinol pore deep cleansing foam, tube and box' },
  { src: 'pdp-2.webp', alt: 'Cleanser foam in an open palm' },
  { src: 'pdp-3.webp', alt: 'Woman in a hair towel applying cleanser' },
  { src: 'pdp-5.webp', alt: 'Hands being rinsed under a tap' },
]

const BRAND = 'Anua'
const PRODUCT = 'Heartleaf Quercetinol pore deep cleansing foam'

const sizes: { label: string; price: number; compareAt?: number }[] = [{ label: '150ml', price: 250 }]

const upsells = [
  { name: 'Skin1004 Centella soothing cream', price: 290, img: 'products/centella-soothing-cream.webp' },
  { name: 'Hatomugi UV milky gel SPF50+', price: 200, img: 'products/hatomugi-uv-gel.webp' },
  { name: 'Makari Argan & Carrot toning glycerin', price: 800, img: 'products/makari-toning-glycerin.webp' },
]

const details = [
  {
    title: 'Core features',
    body: 'Anua’s low-pH Korean foam cleanser that lathers into a soft, dense foam to lift away sebum, sunscreen and the day’s grime from deep in the pores, without leaving skin tight. Gentle enough for morning and evening use.',
  },
  {
    title: 'Ingredients',
    body: 'Key ingredients: heartleaf (Houttuynia cordata) extract to soothe and calm, BHA to clear pores, and Quercetinol™ for a clearer-looking complexion. 150ml / 5.07 fl. oz.',
  },
  {
    title: 'Shipping & return',
    body: 'Free delivery across Ghana on orders over GH₵600, usually within 1-3 business days. Unopened products can be returned within 30 days for a refund or exchange.',
  },
]

const related: { brand: string; name: string; img: string; price: number; compareAt?: number; badge?: string }[] = [
  { brand: 'Skin1004', name: 'Madagascar Centella soothing cream', img: 'products/centella-soothing-cream.webp', price: 290, badge: 'New' },
  { brand: '7 Days', name: 'Turmeric & Carrot exfoliating shower gel', img: 'products/exfoliating-shower-gel.webp', price: 140 },
  { brand: 'Hatomugi', name: 'UV milky gel SPF50+', img: 'products/hatomugi-uv-gel.webp', price: 200 },
  { brand: 'Makari', name: 'Extreme Argan & Carrot Oil toning glycerin', img: 'products/makari-toning-glycerin.webp', price: 800 },
]

const money = (n: number) => `GH₵${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function deliveryWindow() {
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const day = (n: number) => new Date(Date.now() + n * 86400000)
  return `${fmt(day(5))} - ${fmt(day(9))}`
}

function Gallery() {
  const [index, setIndex] = useState(0)
  const go = (d: number) => setIndex((i) => (i + d + gallery.length) % gallery.length)

  return (
    <div className="pdp-gallery">
      <div className="pdp-gallery__main">
        {gallery.map((g, i) => (
          <img key={g.src} src={img(g.src)} alt={g.alt} className={i === index ? 'is-active' : undefined} />
        ))}
        <button className="pdp-gallery__arrow pdp-gallery__arrow--prev" aria-label="Previous image" onClick={() => go(-1)}>
          <ChevronLeft />
        </button>
        <button className="pdp-gallery__arrow pdp-gallery__arrow--next" aria-label="Next image" onClick={() => go(1)}>
          <ChevronRight />
        </button>
      </div>
      <ul className="pdp-gallery__thumbs">
        {gallery.map((g, i) => (
          <li key={g.src}>
            <button
              className={i === index ? 'is-active' : undefined}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
            >
              <img src={img(g.src)} alt="" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Details() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="pdp-details">
      {details.map((d, i) => {
        const isOpen = open === i
        return (
          <div key={d.title} className="pdp-details__item">
            <h3>
              <button aria-expanded={isOpen} aria-controls={`pdp-d-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                {d.title}
                <Plus open={isOpen} />
              </button>
            </h3>
            <div id={`pdp-d-${i}`} className={`pdp-details__body${isOpen ? ' is-open' : ''}`}>
              <div>
                <p>{d.body}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function ProductPage() {
  const [size, setSize] = useState(0)
  const [added, setAdded] = useState(false)
  const v = sizes[size]
  const save = v.compareAt && Math.round((1 - v.price / v.compareAt) * 100)

  return (
    <>
      <section className="pdp container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/collections/cleansers">Cleansers</Link></li>
            <li aria-current="page">{PRODUCT}</li>
          </ol>
        </nav>

        <div className="pdp__grid">
          <Gallery />

          <div className="pdp__info">
            <p className="pdp__brand">{BRAND}</p>
            <h1 className="pdp__title">{PRODUCT}</h1>
            <div className="pdp__price">
              <span>{money(v.price)}</span>
              {v.compareAt && <s>{money(v.compareAt)}</s>}
              {save ? <span className="badge-inline">Save {save}%</span> : null}
            </div>
            <a href="#reviews" className="pdp__rating" aria-label="Rated 5 out of 5, 2 reviews">
              <span className="stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
              </span>
              (2)
            </a>

            {sizes.length === 1 ? (
              <p className="pdp__size-single">
                <strong>Size:</strong> {v.label}
              </p>
            ) : (
              <fieldset className="pdp__sizes">
                <legend>
                  <strong>Size:</strong> {v.label}
                </legend>
                <div className="pdp__size-list">
                  {sizes.map((s, i) => (
                    <label key={s.label} className={i === size ? 'is-active' : undefined}>
                      <input
                        type="radio"
                        name="size"
                        className="sr-only"
                        checked={i === size}
                        onChange={() => {
                          setSize(i)
                          setAdded(false)
                        }}
                      />
                      {s.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <button
              className="btn-pill btn-pill--dark btn-pill--block pdp__atc"
              onClick={() => {
                addToCart({ name: `${BRAND} ${PRODUCT}`, img: 'products/anua-heartleaf-foam.webp', price: v.price, variant: v.label })
                setAdded(true)
              }}
            >
              {added ? 'Added to cart' : 'Add to cart'}
            </button>

            <div className="pdp__pickup">
              <Check />
              <div>
                <p>Pickup available at the Ashley's Impression shop</p>
                <p>Usually ready in 24 hours</p>
                <a href="#" className="pdp__store-link">View Store Information</a>
              </div>
            </div>

            <ul className="pdp__perks">
              <li><TruckIcon /> Estimated delivery: {deliveryWindow()}</li>
              <li><BoxIcon /> Unopened products can be returned within 30 days.</li>
            </ul>

            <UpsellCarousel title="Buy it with" items={upsells} />
            <Details />

            <div className="pdp__actions">
              <button><ShareIcon /> Share</button>
              <button><HelpIcon /> Ask a question</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section related">
        <div className="container container--wide">
          <h2 className="h2 related__title">You may also like</h2>
          <ul className="product-grid">
            {related.map((p) => (
              <li key={p.name}>
                <Link href={PRODUCT_URL} className="product-card">
                  <div className="product-card__media">
                    <img src={img(p.img)} alt={p.name} loading="lazy" />
                    {p.badge && <span className={`badge badge--${p.badge === 'New' ? 'new' : 'sale'}`}>{p.badge}</span>}
                  </div>
                  <p className="product-card__brand">{p.brand}</p>
                  <h3 className="product-card__name">{p.name}</h3>
                  <p className="product-card__price">
                    {money(p.price)}
                    {p.compareAt && <s>{money(p.compareAt)}</s>}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
