import { useState, type FormEvent } from 'react'
import ProductCard from '../components/ProductCard'
import { CONTACT_EMAIL, FREE_DELIVERY, SOCIAL_HANDLE, bestSellers, luxuryBundles, testimonials, textureCollections } from '../data'
import { Link } from '../router'
import { ArrowRight, InstagramIcon, Sparkle, Star } from '../icons'
import { img } from '../asset'

export function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero__satin" src={img('satin-shine.jpg')} alt="" />
      <img className="hero__model" src={img('hero.jpg')} alt="Model with long, glossy wavy hair" />
      <div className="hero__copy container">
        <p className="script hero__script">Raw Luxury Hair</p>
        <h1 className="display hero__title">
          New
          <br />
          Arrivals
        </h1>
        <Link href="/shop" className="btn btn--ghost">Shop now</Link>
      </div>
    </section>
  )
}

export function Marquee({ items, tone = 'silver' }: { items: string[]; tone?: 'silver' | 'dark' }) {
  const row = (hidden?: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {[...items, ...items].map((t, i) => (
        <li key={i}>
          {t}
          <Sparkle size={9} />
        </li>
      ))}
    </ul>
  )
  return (
    <div className={`marquee marquee--${tone}`}>
      <div className="marquee__track">
        {row()}
        {row(true)}
      </div>
    </div>
  )
}

export function Collections() {
  return (
    <section className="section" id="collections">
      <div className="container">
        <h2 className="display section__title">Our Collections</h2>
        <ul className="arches">
          {textureCollections.map((c) => (
            <li key={c.handle}>
              <Link href={`/collections/${c.handle}`} className="arch">
                <div className="arch__media">
                  <img src={img(c.img)} alt="" loading="lazy" />
                </div>
                <div className="arch__body">
                  <p className="arch__kicker">Visit our</p>
                  <h3 className="display arch__title">{c.title}</h3>
                  <p className="arch__sub">Units &amp; bundles</p>
                  <span className="pill-mini">Shop now</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function BestSellers() {
  return (
    <section className="section" id="best-sellers">
      <div className="container">
        <h2 className="section__title section__title--left">
          Our <em className="display-italic">Best Sellers</em>
        </h2>
        <ul className="pgrid">
          {bestSellers.map((p) => (
            <li key={p.id}><ProductCard product={p} /></li>
          ))}
        </ul>
        <div className="center">
          <Link href="/shop" className="btn btn--outline btn--small">View all</Link>
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <div className="about__copy">
          <h2 className="about__title">
            The best <span className="display-italic">luxury hair</span>
            <br />
            experience
          </h2>
          <p>
            Welcome to Hair by Gyeiwaa, your destination for raw bundles, HD lace frontals, closures and custom wigs. Every
            bundle is hand-selected from single donors, so the cuticles stay aligned and the hair stays soft, full and
            tangle-free for years.
          </p>
          <p>
            Not sure which texture or length suits you? Message us and we'll help you build the perfect install, from
            first bundle to finished look.
          </p>
          <a href="#contact" className="btn btn--outline btn--small">Contact us</a>
        </div>
        <div className="about__media">
          <img src={img('about.jpg')} alt="Model with long, sleek straight hair" loading="lazy" />
        </div>
      </div>
    </section>
  )
}

export function FreeDelivery() {
  return (
    <section className="delivery">
      <img src={img('satin-waves.jpg')} alt="" className="delivery__bg" />
      <div className="delivery__copy">
        <p className="script delivery__script">Free Delivery</p>
        <p className="display delivery__line">On orders over GH₵{FREE_DELIVERY.toLocaleString('en-US')}</p>
      </div>
    </section>
  )
}

export function LuxuryBundles() {
  return (
    <section className="section" id="luxury-bundles">
      <div className="lux">
        <img src={img('satin-folds.jpg')} alt="" className="lux__bg" />
        <img src={img('col-curly.jpg')} alt="Model with voluminous curly hair" className="lux__model" />
        <div className="lux__copy container">
          <p className="script lux__script">Luxury Collection</p>
          <h2 className="display lux__title">Luxury Bundles</h2>
          <Link href="/collections/bundles" className="btn btn--ghost">Shop now</Link>
        </div>
      </div>
      <div className="container">
        <ul className="pgrid pgrid--five" id="luxury-row">
          {luxuryBundles.map((p) => (
            <li key={p.id}><ProductCard product={p} /></li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function PayLater() {
  return (
    <section className="paylater">
      <img src={img('satin-shine.jpg')} alt="" className="paylater__bg" />
      <img src={img('banner-slay.jpg')} alt="Model with a full afro" className="paylater__model" />
      <div className="paylater__copy">
        <p className="script paylater__script">Slay Now</p>
        <p className="display paylater__line">Pay Later</p>
        <p className="paylater__text">Split your order into interest-free payments at checkout.</p>
        <div className="paylater__badges" aria-label="Available payment plans">
          <span className="badge-klarna">Klarna.</span>
          <span className="badge-afterpay">afterpay</span>
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="container">
        <h2 className="section__title testimonials__title">
          <Sparkle size={10} /> Testimonials <Sparkle size={10} />
        </h2>
        <ul className="tcards">
          {testimonials.map((t) => (
            <li key={t.name} className="tcard">
              <div className="stars" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
              </div>
              <blockquote>“{t.quote}”</blockquote>
              <p className="tcard__name">{t.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function VipClub() {
  const [done, setDone] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setDone(true)
  }
  return (
    <section className="section vip">
      <div className="container vip__inner">
        <h2 className="vip__title">
          Join our <span className="display-italic">VIP Club</span>
        </h2>
        <p>Be the first to hear about new collections, restocks and members-only offers.</p>
        {done ? (
          <p className="vip__done" role="status">Welcome to the club. Your 10% welcome code is on its way.</p>
        ) : (
          <form className="vip__form" onSubmit={submit}>
            <label htmlFor="vip-email" className="sr-only">Email address</label>
            <input id="vip-email" type="email" required placeholder="Email address" autoComplete="email" />
            <button type="submit" className="btn btn--solid">Join</button>
          </form>
        )}
      </div>
    </section>
  )
}

export function Selfies() {
  const tiles = ['ig-1', 'ig-2', 'ig-3', 'ig-4', 'ig-5', 'ig-6']
  return (
    <section className="selfies">
      <div className="selfies__hero">
        <img src={img('satin-folds.jpg')} alt="" className="selfies__bg" />
        <img src={img('selfie.jpg')} alt="Customer showing off her glowing look" className="selfies__model" />
        <div className="selfies__copy">
          <p className="script selfies__script">We Love Selfies!</p>
          <a href="#" className="selfies__handle">
            <InstagramIcon size={34} /> {SOCIAL_HANDLE}
          </a>
          <p className="selfies__cta">Tag us to get featured</p>
        </div>
      </div>
      <ul className="igrid">
        {tiles.map((t) => (
          <li key={t}>
            <a href="#" aria-label={`View post on Instagram ${SOCIAL_HANDLE}`}>
              <img src={img(`${t}.jpg`)} alt="" loading="lazy" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Footer() {
  const [done, setDone] = useState(false)
  return (
    <footer className="footer" id="contact">
      <Marquee items={['Tag us in your selfies', 'Get featured']} tone="dark" />
      <div className="container footer__grid">
        <div>
          <h2 className="footer__head">Quick links</h2>
          <ul className="footer__links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/collections/bundles">Bundles</Link></li>
            <li><Link href="/collections/wigs">Wigs</Link></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h2 className="footer__head">Get in touch with us</h2>
          <p className="footer__text">
            Questions about textures, lengths or your order? We usually reply within a few hours.
          </p>
          <ul className="footer__contact">
            <li>Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li>Phone: <a href="tel:+440000000000">+44 0000 000000</a></li>
          </ul>
        </div>
        <div className="footer__brand">
          <Link href="/" className="logo logo--footer" aria-label="Hair by Gyeiwaa, home">
            <span className="logo__script" aria-hidden="true">Hair by</span>
            <span className="logo__word" aria-hidden="true">Gyeiwaa</span>
          </Link>
          {done ? (
            <p className="footer__text" role="status">You're on the list.</p>
          ) : (
            <form
              className="footer__form"
              onSubmit={(e) => {
                e.preventDefault()
                setDone(true)
              }}
            >
              <label htmlFor="ft-email" className="footer__head">Subscribe to our emails</label>
              <div>
                <input id="ft-email" type="email" required placeholder="Email" autoComplete="email" />
                <button type="submit" aria-label="Subscribe"><ArrowRight size={16} /></button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© 2026, Hair by Gyeiwaa. Powered by Shopify</p>
        <p>
          <a href="#">Privacy policy</a>
          <a href="#">Refund policy</a>
          <a href="#">Terms of service</a>
        </p>
      </div>
    </footer>
  )
}
