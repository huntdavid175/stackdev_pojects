import { useState } from 'react'
import { img } from '../asset'
import { collections, eveningEdit, goodsTabs, handle, hero, MAP_QUERY, stores } from '../data'
import { Link } from '../router'
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import { ChatIcon, HeartIcon, MinusIcon, PlusIcon, SewingIcon, WorldShipIcon } from '../icons'

/* ---------- Hero ---------- */

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__slide is-active">
        {/* two portraits side by side; phones show the first one only */}
        <div className="hero__pair">
          {hero.images.map((src) => (
            <img key={src} className="hero__img" src={img(src)} alt="" fetchPriority="high" />
          ))}
        </div>
        <div className="hero__content">
          <h2 className="hero__title">{hero.title}</h2>
          <p className="hero__copy">{hero.copy}</p>
          <div className="hero__ctas">
            <Link href={hero.primary.href} className="btn btn--coral">{hero.primary.label}</Link>
            <Link href={hero.secondary.href} className="btn btn--ghost">{hero.secondary.label}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Intro ---------- */

export function Intro() {
  return (
    <section className="intro">
      <p>
        Tailored suits, evening wear and everyday essentials, made to fit the way you live. Book a fitting at the boutique or explore{' '}
        <Link href="/collections/all">the full SuitUp range</Link>.
      </p>
    </section>
  )
}

/* ---------- Get the goods (tabbed carousel) ---------- */

export function Goods() {
  const [tab, setTab] = useState(0)
  return (
    <section className="section goods">
      <h2 className="section__title">Get the goods</h2>
      <div className="tabs" role="tablist">
        {goodsTabs.map((t, n) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={n === tab}
            className={`${n === tab ? 'is-active' : ''}${t.sale ? ' is-sale' : ''}`}
            onClick={() => setTab(n)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <Carousel key={tab} className="container goods__carousel">
        {goodsTabs[tab].products.map((p) => <ProductCard key={p.id} product={p} />)}
      </Carousel>
    </section>
  )
}

/* ---------- Sale banner ---------- */

export function SaleBanner() {
  return (
    <section className="container-wide">
      <Link href="/collections/sale" className="sale">
        <img className="sale__img" src={img('sale-texture.webp')} alt="" loading="lazy" />
        <span className="sale__content">
          <span className="sale__title">Up to <br />40% off</span>
          <span className="sale__copy">Plus, free shipping on everything</span>
          <span className="btn btn--ghost">Shop the sale</span>
        </span>
      </Link>
    </section>
  )
}

/* ---------- Promises ---------- */

const promises = [
  { Icon: HeartIcon, title: 'Happiness guaranteed', copy: "If you don't feel the positive vibes after 30 days, we will refund your money, no questions asked." },
  { Icon: WorldShipIcon, title: 'Worldwide shipping', copy: "We'll have you looking great, no matter where in the world you are, with our quick delivery." },
  { Icon: ChatIcon, title: 'Tip top service', copy: 'Our customer care team is here for you, going beyond what is required to ensure your satisfaction.' },
  { Icon: SewingIcon, title: 'Free alterations', copy: "Every suit includes free alterations. Bring it in to the boutique and we'll get the fit just right." },
]

export function Promises() {
  return (
    <section className="promises">
      {promises.map(({ Icon, title, copy }) => (
        <div key={title} className="promise">
          <Icon />
          <h3>{title}</h3>
          <p>{copy}</p>
        </div>
      ))}
    </section>
  )
}

/* ---------- Image + text rows ---------- */

export function Stories() {
  return (
    <section className="stories">
      <div className="story">
        <img className="story__img" src={img('story-shirts.webp')} alt="A folded blue striped shirt with a white contrast collar and French cuffs" loading="lazy" />
        <div className="story__text">
          <h2>Favourite shirts</h2>
          <p>
            Crisp collars, fine stripes and French cuffs in easy-iron cotton. Cut to sit neatly under a jacket, they're sure to make you look sharp
            and feel fresh.
          </p>
          <Link href="/collections/shirts" className="btn btn--outline">Shop shirts</Link>
        </div>
      </div>
      <div className="story story--flip">
        <img className="story__img story__img--wide" src={img('story-detail.webp')} alt="Close-up of a navy pinstripe double-breasted suit, hands clasped at the buttons" loading="lazy" />
        <div className="story__text">
          <h2>For all occasions</h2>
          <p>From the boardroom to the wedding aisle, every SuitUp suit is cut to fit, with free alterations so it's finished just for you.</p>
          <Link href="/collections/suits" className="btn btn--outline">See the suits</Link>
        </div>
      </div>
    </section>
  )
}

/* ---------- Perfect pants ---------- */

export function EveningEdit() {
  return (
    <section className="section">
      <h2 className="section__title">The evening edit</h2>
      <Carousel className="container-narrow pants__carousel">
        {eveningEdit.map((p) => <ProductCard key={p.id} product={p} />)}
      </Carousel>
    </section>
  )
}

/* ---------- Collection tiles ---------- */

export function Collections() {
  return (
    <section className="tiles">
      {collections.map((c) => (
        <Link key={c.title} href={`/collections/${handle(c.title)}`} className="tile">
          <img src={img(c.image)} alt="" loading="lazy" />
          <span>{c.title}</span>
        </Link>
      ))}
    </section>
  )
}

/* ---------- Stores ---------- */

export function Stores() {
  const [open, setOpen] = useState(0)
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`
  return (
    <section className="stores" id="stores">
      <div className="stores__list">
        {stores.map((st, n) => (
          <div key={st.name} className={`store${n === open ? ' is-open' : ''}`}>
            <button className="store__head" aria-expanded={n === open} onClick={() => setOpen(n)}>
              {st.name}
              {n !== open && <PlusIcon />}
              {n === open && <span className="store__minus"><MinusIcon /></span>}
            </button>
            {n === open && (
              <div className="store__body">
                <div>
                  {st.address.map((l) => <p key={l}>{l}</p>)}
                  <p><a href={`tel:${st.phone.replace(/[^\d+]/g, '')}`}>{st.phone}</a></p>
                  <p><a href={`mailto:${st.email}`}>{st.email}</a></p>
                </div>
                <div className="store__hours">
                  {st.hours.map((h) => <p key={h}>{h}</p>)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="stores__map">
        <iframe
          title="Map of SuitUp in Dansoman, Accra"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a className="btn btn--coral stores__directions" href={directions} target="_blank" rel="noreferrer">Get directions</a>
      </div>
    </section>
  )
}

/* ---------- Newsletter ---------- */

export function Newsletter() {
  const [done, setDone] = useState(false)
  return (
    <section className="news">
      <div>
        <h2>Join our newsletter for 10% off</h2>
        <p>
          We'll email you a voucher worth 10% off your first order over GH₵500. By subscribing you agree to our <a href="#">Terms &amp; Conditions.</a>
        </p>
      </div>
      <form
        className="news__form"
        onSubmit={(e) => {
          e.preventDefault()
          setDone(true)
        }}
      >
        <input type="email" required placeholder="email@example.com" aria-label="Email" />
        <button className="btn btn--coral">{done ? 'Subscribed ✓' : 'Subscribe'}</button>
      </form>
    </section>
  )
}
