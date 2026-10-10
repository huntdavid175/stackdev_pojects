import { useState } from 'react'
import { Link, PRODUCT_URL } from '../router'
import { addToCart } from '../cart'
import { ChevronLeft, ChevronRight, Check, Plus, ShareIcon, HelpIcon, TruckIcon, BoxIcon, Star } from '../icons'
import UpsellCarousel from '../components/UpsellCarousel'
import { img } from '../asset'

const gallery = [
  { src: 'pdp-1.jpg', alt: 'Deep Clean micellar water and Exfoliating daily cleanser bottles' },
  { src: 'pdp-2.jpg', alt: 'Cleanser foam in an open palm' },
  { src: 'pdp-3.jpg', alt: 'Woman in a hair towel applying cleanser' },
  { src: 'pdp-4.jpg', alt: 'Smiling woman wearing a pore strip' },
  { src: 'pdp-5.jpg', alt: 'Hands being rinsed under a tap' },
]

const sizes = [
  { label: '50ml', price: 1910, compareAt: 2280 },
  { label: '75ml', price: 2270, compareAt: 2700 },
  { label: '100ml', price: 2630, compareAt: 3120 },
]

const upsells = [
  { name: 'Natural body wash', price: 2520, img: 'pdp-upsell-1.jpg' },
  { name: 'Exfoliating daily cleanser', price: 900, img: 'related-2.jpg' },
  { name: 'Smooth whipped body treatment', price: 600, img: 'related-4.jpg' },
]

const details = [
  {
    title: 'Core features',
    body: 'A two-step routine: the micellar water lifts make-up and sunscreen without rubbing, then the AHA cleanser clears pores and smooths texture. Fragrance free and suitable for daily use.',
  },
  {
    title: 'Ingredients',
    body: 'Micellar water: aqua, glycerin, poloxamer 184, aloe barbadensis leaf juice, panthenol. Daily cleanser: aqua, cocamidopropyl betaine, glycolic acid, lactic acid, niacinamide, allantoin.',
  },
  {
    title: 'Shipping & return',
    body: 'Free delivery across Ghana on orders over GH₵600, delivered in 2-4 business days. Unopened products can be returned within 30 days for a full refund or exchange.',
  },
]

const related = [
  { name: 'Deep clean micellar water', img: 'related-1.jpg', price: 1070, compareAt: 1200, badge: '-11%' },
  { name: 'Exfoliating daily cleanser', img: 'related-2.jpg', price: 900 },
  { name: 'The comfy kit', img: 'related-3.jpg', price: 1920 },
  { name: 'Smooth whipped exfoliating body treatment', img: 'related-4.jpg', price: 600 },
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
  const save = Math.round((1 - v.price / v.compareAt) * 100)

  return (
    <>
      <section className="pdp container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/collections/cleansers">Cleansers</Link></li>
            <li aria-current="page">Deep clean kit</li>
          </ol>
        </nav>

        <div className="pdp__grid">
          <Gallery />

          <div className="pdp__info">
            <h1 className="pdp__title">Deep clean kit</h1>
            <div className="pdp__price">
              <span>{money(v.price)}</span>
              <s>{money(v.compareAt)}</s>
              <span className="badge-inline">Save {save}%</span>
            </div>
            <a href="#reviews" className="pdp__rating" aria-label="Rated 5 out of 5, 2 reviews">
              <span className="stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
              </span>
              (2)
            </a>

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

            <button
              className="btn-pill btn-pill--dark btn-pill--block pdp__atc"
              onClick={() => {
                addToCart({ name: 'Deep clean kit', img: 'pdp-1.jpg', price: v.price, variant: v.label })
                setAdded(true)
              }}
            >
              {added ? 'Added to cart' : 'Add to cart'}
            </button>

            <div className="pdp__pickup">
              <Check />
              <div>
                <p>Pickup available at Ashley's Impression Studio</p>
                <p>Usually ready in 24 hours</p>
                <a href="#" className="pdp__store-link">View Store Information</a>
              </div>
            </div>

            <ul className="pdp__perks">
              <li><TruckIcon /> Estimated delivery: {deliveryWindow()}</li>
              <li><BoxIcon /> Money back within 30 days for an exchange.</li>
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
                    {p.badge && <span className="badge badge--sale">{p.badge}</span>}
                  </div>
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
