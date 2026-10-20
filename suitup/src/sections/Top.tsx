import { useEffect, useState } from 'react'
import { img } from '../asset'
import { announcements, collections, handle } from '../data'
import { Link, usePath } from '../router'
import { lockScroll, unlockScroll } from '../scrollLock'
import { cartCount, openCart, useCart } from '../store'
import { BagIcon, ChevronDown, ChevronLeft, ChevronRight, CloseIcon, MenuIcon, SearchIcon, ShipIcon, UserIcon } from '../icons'

const nav = [
  { label: 'Store', href: '/collections/all' },
  { label: 'Collections', mega: true },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'Our stores', href: '#stores' },
  { label: 'Sale', href: '/collections/sale', sale: true },
]

export function Announcement() {
  const [i, setI] = useState(0)
  const go = (d: number) => setI((n) => (n + d + announcements.length) % announcements.length)
  useEffect(() => {
    const t = setInterval(() => go(1), 5000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="announce">
      <button className="announce__arrow" aria-label="Previous message" onClick={() => go(-1)}><ChevronLeft size={16} /></button>
      <p key={i} className="announce__text"><ShipIcon /> {announcements[i]}</p>
      <button className="announce__arrow" aria-label="Next message" onClick={() => go(1)}><ChevronRight size={16} /></button>
    </div>
  )
}

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="SuitUp, home">
      SUITUP
    </Link>
  )
}

export function Header() {
  const path = usePath()
  const home = path === '/'
  const count = cartCount(useCart())
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState(false)
  const [drawer, setDrawer] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    setMega(false)
    setDrawer(false)
  }, [path])
  useEffect(() => {
    if (!drawer) return
    lockScroll()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawer(false)
    document.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      document.removeEventListener('keydown', onKey)
    }
  }, [drawer])

  // Over the hero the bar floats with rounded corners; scrolled or with the menu open it docks full width.
  const floating = home && !scrolled && !mega

  return (
    <header className={`header${home ? ' header--home' : ''}${floating ? ' is-floating' : ''}${mega ? ' is-mega' : ''}`} onMouseLeave={() => setMega(false)}>
      <div className="header__bar">
        <button className="icon-btn header__burger" aria-label="Open menu" onClick={() => setDrawer(true)}><MenuIcon /></button>
        <Logo />
        <nav className="header__nav" aria-label="Main">
          <ul>
            {nav.map((n) =>
              n.mega ? (
                <li key={n.label} onMouseEnter={() => setMega(true)}>
                  <button className={`nav-link${mega ? ' is-active' : ''}`} aria-expanded={mega} onClick={() => setMega(!mega)} onFocus={() => setMega(true)}>
                    {n.label}
                  </button>
                </li>
              ) : (
                <li key={n.label} onMouseEnter={() => setMega(false)}>
                  <Link href={n.href!} className={`nav-link${n.sale ? ' nav-link--sale' : ''}`}>{n.label}</Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="header__tools">
          <button className="header__select">Ghana (GHS ₵) <ChevronDown /></button>
          <button className="header__select">English <ChevronDown /></button>
          <a href="#" className="icon-btn header__account" aria-label="Account"><UserIcon /></a>
          <button className="icon-btn cart-btn" aria-label={`Cart, ${count} items`} onClick={openCart}>
            <BagIcon />
            <span className="cart-btn__count">{count}</span>
          </button>
          <button className="icon-btn" aria-label="Search"><SearchIcon /></button>
        </div>
      </div>

      <div className="mega" aria-hidden={!mega} inert={!mega}>
        <div className="mega__grid">
          {collections.map((c) => (
            <Link key={c.title} href={`/collections/${handle(c.title)}`} className="mega__card">
              <span className="mega__img"><img src={img(c.image)} alt="" loading="lazy" /></span>
              <span className="mega__label">{c.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className={`drawer${drawer ? ' is-open' : ''}`} aria-hidden={!drawer} inert={!drawer}>
        <div className="drawer__backdrop" onClick={() => setDrawer(false)} />
        <div className="drawer__panel" role="dialog" aria-label="Menu">
          <div className="drawer__head">
            <Logo />
            <button className="icon-btn" aria-label="Close menu" onClick={() => setDrawer(false)}><CloseIcon /></button>
          </div>
          <ul className="drawer__list">
            {nav.map((n) =>
              n.mega ? (
                <li key={n.label}>
                  <details>
                    <summary>{n.label} <ChevronDown size={12} /></summary>
                    <div className="drawer__cols">
                      {collections.map((c) => (
                        <Link key={c.title} href={`/collections/${handle(c.title)}`} className="drawer__card">
                          <img src={img(c.image)} alt="" loading="lazy" />
                          <span>{c.title}</span>
                        </Link>
                      ))}
                    </div>
                  </details>
                </li>
              ) : (
                <li key={n.label}>
                  <Link href={n.href!} className={n.sale ? 'is-sale' : undefined} onClick={() => setDrawer(false)}>{n.label}</Link>
                </li>
              ),
            )}
          </ul>
          <div className="drawer__foot">
            <a href="#"><UserIcon size={18} /> Log in</a>
            <span>Ghana (GHS ₵) · English</span>
          </div>
        </div>
      </div>
    </header>
  )
}
