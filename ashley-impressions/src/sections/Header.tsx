import { useEffect, useRef, useState } from 'react'
import { BagIcon, ChevronDown, MenuIcon, SearchIcon, UserIcon, CloseIcon } from '../icons'
import { Link, usePath } from '../router'
import { linkFor } from '../catalog'
import { openCart, totals, useCart } from '../cart'
import { img } from '../asset'

type MenuId = 'skin' | 'shop' | 'collections'

const skinTypes = ['Dry Skin', 'Oily Skin', 'Combination', 'Sensitive', 'Mature Skin']
const CONTACT_URL = 'mailto:hello@ashleysimpression.com'

const shopColumns = [
  { title: 'Categories', links: ['Serums', 'Cleansers', 'Toners', 'Body & Hands', 'Masks', 'Moisturizer', 'Shop All'] },
  { title: 'Discover', links: ['Best Sellers', 'New Arrivals', 'Essential Routine', 'Oil Remover', 'Holiday Gifting'] },
  { title: 'Featured', links: ['Power Couple Kit', 'Natural Body Wash', 'Bio-retinol Mask', 'Pure free oil cleanser'] },
]

const collections = [
  { title: 'New Arrivals', img: 'menu-col-1.webp' },
  { title: 'Skincares', img: 'menu-col-2.webp' },
  { title: 'On Sale', img: 'menu-col-3.webp' },
  { title: 'Season Pick', img: 'menu-col-4.webp' },
]

type NavItem = { id?: MenuId; label: string; href?: string }

const left: NavItem[] = [
  { label: 'Home' },
  { id: 'skin', label: 'Skin type' },
  { id: 'shop', label: 'Shop' },
]
const right: NavItem[] = [
  { id: 'collections', label: 'Collections' },
  { label: 'Contact', href: CONTACT_URL },
]

function ShopPanel() {
  return (
    <div className="mega__inner container mega-shop">
      {shopColumns.map((col) => (
        <div key={col.title} className="mega-shop__col">
          <p className="mega__head">{col.title}</p>
          <ul>
            {col.links.map((l) => (
              <li key={l}><Link href={linkFor(l)}>{l}</Link></li>
            ))}
          </ul>
        </div>
      ))}
      <Link href={linkFor('Serums')} className="mega-promo">
        <img src={img('menu-promo.webp')} alt="" />
        <div className="mega-promo__body">
          <p className="mega-promo__title">Sensitive Skin</p>
          <p className="mega-promo__text">Sustainability is well alive.</p>
          <span className="mega-link">Shop now</span>
        </div>
      </Link>
    </div>
  )
}

function CollectionsPanel() {
  return (
    <ul className="mega__inner container mega-cols">
      {collections.map((c) => (
        <li key={c.title}>
          <Link href={linkFor(c.title)} className="mega-card">
            <img src={img(c.img)} alt="" />
            <div className="mega-card__body">
              <p className="mega-card__title">{c.title}</p>
              <span className="mega-link">Shop now</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function SimpleList({ items }: { items: string[] }) {
  return (
    <ul className="dropdown">
      {items.map((l) => (
        <li key={l}><Link href={linkFor(l)}>{l}</Link></li>
      ))}
    </ul>
  )
}

export default function Header() {
  const [open, setOpen] = useState<MenuId | null>(null)
  const cartCount = totals(useCart()).count
  const path = usePath()

  // close any open menu once a menu link navigates
  useEffect(() => setOpen(null), [path])
  const [drawer, setDrawer] = useState(false)
  const [drawerSection, setDrawerSection] = useState<MenuId | null>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null)
        setDrawer(false)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
  }, [drawer])

  const hoverOpen = (id: MenuId | null) => {
    window.clearTimeout(closeTimer.current)
    setOpen(id)
  }
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setOpen(null), 150)
  }

  const renderItem = (item: NavItem) => {
    if (!item.id) {
      return (
        <li key={item.label}>
          {item.href ? (
            <a href={item.href} className="nav__link" onMouseEnter={() => hoverOpen(null)}>{item.label}</a>
          ) : (
            <Link href="/" className="nav__link" onMouseEnter={() => hoverOpen(null)}>{item.label}</Link>
          )}
        </li>
      )
    }
    const id = item.id
    const isOpen = open === id
    const isMega = id === 'shop' || id === 'collections'
    return (
      <li key={id} className={isMega ? undefined : 'nav__item--relative'} onMouseEnter={() => hoverOpen(id)}>
        <button
          className={`nav__link${isOpen ? ' is-open' : ''}`}
          aria-expanded={isOpen}
          aria-controls={`menu-${id}`}
          onClick={() => setOpen(isOpen ? null : id)}
        >
          {item.label}
          <ChevronDown size={14} />
        </button>
        {!isMega && (
          <div id={`menu-${id}`} className={`dropdown-wrap${isOpen ? ' is-open' : ''}`}>
            <SimpleList items={skinTypes} />
          </div>
        )}
      </li>
    )
  }

  const drawerGroups: { id: MenuId; label: string; links: string[] }[] = [
    { id: 'skin', label: 'Skin type', links: skinTypes },
    { id: 'shop', label: 'Shop', links: shopColumns.flatMap((c) => c.links) },
    { id: 'collections', label: 'Collections', links: collections.map((c) => c.title) },
  ]

  return (
    <header ref={headerRef} className="site-header" onMouseLeave={hoverClose} onMouseEnter={() => window.clearTimeout(closeTimer.current)}>
      <div className="site-header__bar container container--wide">
        <button className="icon-btn site-header__menu" aria-label="Open menu" onClick={() => setDrawer(true)}>
          <MenuIcon />
        </button>

        <nav className="nav nav--left" aria-label="Main">
          <ul>{left.map(renderItem)}</ul>
        </nav>

        <Link href="/" className="logo" onMouseEnter={() => hoverOpen(null)}>Ashley's Impression</Link>

        <div className="site-header__right">
          <nav className="nav nav--right" aria-label="Shop">
            <ul>{right.map(renderItem)}</ul>
          </nav>
          <div className="site-header__icons" onMouseEnter={() => hoverOpen(null)}>
            <button className="icon-btn" aria-label="Search"><SearchIcon /></button>
            <a href="#" className="icon-btn site-header__account" aria-label="Account"><UserIcon /></a>
            <button className="icon-btn cart-btn" aria-label={`Cart, ${cartCount} items`} onClick={openCart}>
              <BagIcon />
              {cartCount > 0 && <span className="cart-btn__count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>

      <div id="menu-shop" className={`mega${open === 'shop' ? ' is-open' : ''}`} onMouseEnter={() => hoverOpen('shop')}>
        <ShopPanel />
      </div>
      <div id="menu-collections" className={`mega${open === 'collections' ? ' is-open' : ''}`} onMouseEnter={() => hoverOpen('collections')}>
        <CollectionsPanel />
      </div>

      {/* Mobile drawer */}
      <div className={`drawer${drawer ? ' is-open' : ''}`} aria-hidden={!drawer}>
        <div className="drawer__backdrop" onClick={() => setDrawer(false)} />
        <div className="drawer__panel" role="dialog" aria-label="Menu">
          <div className="drawer__top">
            <span className="logo logo--small">Ashley's Impression</span>
            <button className="icon-btn" aria-label="Close menu" onClick={() => setDrawer(false)}>
              <CloseIcon />
            </button>
          </div>
          <ul className="drawer__list">
            <li><Link href="/" className="drawer__link" onClick={() => setDrawer(false)}>Home</Link></li>
            {drawerGroups.map((g) => {
              const isOpen = drawerSection === g.id
              return (
                <li key={g.id}>
                  <button className="drawer__link" aria-expanded={isOpen} onClick={() => setDrawerSection(isOpen ? null : g.id)}>
                    {g.label}
                    <ChevronDown size={16} />
                  </button>
                  <div className={`drawer__sub${isOpen ? ' is-open' : ''}`}>
                    <ul>
                      {g.links.map((l) => (
                        <li key={l}>
                          <Link href={linkFor(l)} onClick={() => setDrawer(false)}>{l}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
            <li><a href={CONTACT_URL} className="drawer__link">Contact</a></li>
          </ul>
        </div>
      </div>
    </header>
  )
}
