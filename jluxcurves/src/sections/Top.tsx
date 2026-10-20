import { useEffect, useState, type MouseEvent } from 'react'
import { img } from '../asset'
import { Link, usePath } from '../router'
import { lockScroll, unlockScroll } from '../scrollLock'
import { BagIcon, ChevronDown, CloseIcon, MenuIcon, SearchIcon, UserIcon } from '../icons'
import { handle, HERO } from '../data'
import { cartCount, openCart, useCart } from '../store'

type MenuLink = { label: string; href: string }
type Menu = { title: string; links: MenuLink[]; groups?: { title: string; links: MenuLink[] }[] }

const col = (label: string) => ({ label, href: `/collections/${handle(label)}` })

// The Shop menu is a full-width panel with three link columns and a promo photo.
const shopGroups = [
  { title: 'Categories', links: [...['Leggings', 'Bras', 'Shorts', 'Swimwears', 'Accessories'].map(col), { label: 'Shop All', href: '/collections/all' }] },
  { title: 'Discover', links: ['Best Sellers', 'New Arrivals', 'Better Basics', 'Iconic Prints', 'Swim Wears', 'Holiday Gifting'].map(col) },
  { title: 'Featured', links: ['Active Tops', 'Four-Way Tops', 'Reversible Tops', 'One Shoulder Tops'].map(col) },
]

const leftMenus: Menu[] = [
  { title: 'New In', links: ['New Arrivals', 'Best Sellers', 'Courtside Capsule', 'Back in Stock'].map(col) },
  { title: 'Shop', links: shopGroups.flatMap((g) => g.links), groups: shopGroups },
]
const rightMenus: Menu[] = [
  { title: 'Collections', links: ['Active Tops', 'Working Girl', 'Classic', 'Biker Shorts', 'Sale'].map(col) },
]

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`logo ${className}`} aria-label="JLuxCurves, home">
      JLUXCURVES
    </Link>
  )
}

export function Announcement() {
  return (
    <div className="announce">
      <p>
        New customers save 10% with code <a href="#">WELCOME</a>
      </p>
    </div>
  )
}

function Dropdown({ menu }: { menu: Menu }) {
  // Hover opens the panel; picking a link hides it until the pointer leaves, so it doesn't hang over the new page.
  const [dismissed, setDismissed] = useState(false)
  const pick = (e: MouseEvent<HTMLAnchorElement>) => {
    setDismissed(true)
    e.currentTarget.blur()
  }
  const linkList = (links: MenuLink[]) => (
    <ul>
      {links.map((l) => (
        <li key={l.label}>
          <Link href={l.href} onClick={pick}>{l.label}</Link>
        </li>
      ))}
    </ul>
  )

  return (
    <li className={`dd${menu.groups ? ' dd--mega' : ''}${dismissed ? ' is-dismissed' : ''}`} onMouseLeave={() => setDismissed(false)}>
      <button className="nav-link" aria-haspopup="true">
        {menu.title} <ChevronDown />
      </button>
      {menu.groups ? (
        <div className="mega">
          <div className="mega__inner">
            {menu.groups.map((g) => (
              <div key={g.title} className="mega__col">
                <p className="mega__title">{g.title}</p>
                {linkList(g.links)}
              </div>
            ))}
            <Link href="/collections/iconic-prints" className="mega__promo" onClick={pick}>
              <img src={img('group-garden.webp')} alt="" loading="lazy" />
              <span className="mega__promo-text">
                <span className="mega__promo-title">Made for Good Living</span>
                <span>Sustainability is well alive.</span>
                <span className="mega__promo-cta">Shop now</span>
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="dd__panel">{linkList(menu.links)}</div>
      )}
    </li>
  )
}

export function Header() {
  const path = usePath()
  const home = path === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const count = cartCount(useCart())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenu(false), [path])
  useEffect(() => {
    if (!menu) return
    lockScroll()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    document.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      document.removeEventListener('keydown', onKey)
    }
  }, [menu])

  const overlay = home && !scrolled

  return (
    <header className={`header${home ? ` header--home header--hero-${HERO.tone}` : ''}${overlay ? ' is-overlay' : ''}`}>
      <div className="header__bar">
        <button className="icon-btn header__burger" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}>
          <MenuIcon />
        </button>
        <nav className="header__nav" aria-label="Main">
          <ul>
            <li>
              <Link href="/" className="nav-link">Home</Link>
            </li>
            {leftMenus.map((m) => <Dropdown key={m.title} menu={m} />)}
          </ul>
        </nav>

        <Logo className="header__logo" />

        <div className="header__right">
          <nav className="header__nav" aria-label="More">
            <ul>{rightMenus.map((m) => <Dropdown key={m.title} menu={m} />)}</ul>
          </nav>
          <div className="header__icons">
            <button className="icon-btn" aria-label="Search"><SearchIcon /></button>
            <a href="#" className="icon-btn header__account" aria-label="Account"><UserIcon /></a>
            <button className="icon-btn cart-btn" aria-label={`Cart, ${count} items`} onClick={openCart}>
              <BagIcon />
              {count > 0 && <span className="cart-btn__count">{count}</span>}
            </button>
          </div>
        </div>
      </div>

      <div className={`drawer${menu ? ' is-open' : ''}`} aria-hidden={!menu} inert={!menu}>
        <div className="drawer__backdrop" onClick={() => setMenu(false)} />
        <div className="drawer__panel" role="dialog" aria-label="Menu">
          <div className="drawer__head">
            <Logo />
            <button className="icon-btn" aria-label="Close menu" onClick={() => setMenu(false)}><CloseIcon /></button>
          </div>
          <ul className="drawer__list">
            <li><Link href="/">Home</Link></li>
            {[...leftMenus, ...rightMenus].map((m) => (
              <li key={m.title}>
                <details>
                  <summary>{m.title} <ChevronDown size={14} /></summary>
                  <ul>
                    {m.links.map((l) => (
                      <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
          <a href="#" className="drawer__account"><UserIcon size={20} /> Log in</a>
        </div>
      </div>
    </header>
  )
}
