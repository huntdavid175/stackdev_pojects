import { useEffect, useRef, useState } from 'react'
import { bagCount, openBag, useBag } from '../bag'
import { Link, usePath } from '../router'
import { BagIcon, CloseIcon, FacebookIcon, InstagramIcon, MenuIcon, SearchIcon, TiktokIcon, UserIcon, YoutubeIcon } from '../icons'
import { FREE_DELIVERY, typeCollections, textureCollections } from '../data'

const menuCollections = [...typeCollections, ...textureCollections]

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`logo ${className}`} aria-label="Hair by Gyeiwaa, home">
      <span className="logo__script" aria-hidden="true">Hair by</span>
      <span className="logo__word" aria-hidden="true">Gyeiwaa</span>
    </Link>
  )
}

export function Socials() {
  return (
    <ul className="socials">
      <li><a href="#" aria-label="Instagram"><InstagramIcon size={15} /></a></li>
      <li><a href="#" aria-label="TikTok"><TiktokIcon size={15} /></a></li>
      <li><a href="#" aria-label="Facebook"><FacebookIcon size={15} /></a></li>
      <li><a href="#" aria-label="YouTube"><YoutubeIcon size={15} /></a></li>
    </ul>
  )
}

export function Announcement() {
  return (
    <div className="announce">
      <div className="announce__inner container">
        <Socials />
        <p>Free UK delivery on orders over £{FREE_DELIVERY}</p>
        <p className="announce__right">Pay in 3 with Klarna</p>
      </div>
    </div>
  )
}

function CollectionsMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)
  const path = usePath()

  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <li ref={ref} className="menu" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className={`menu__btn${path.startsWith('/collections') ? ' is-current' : ''}`} aria-expanded={open} onClick={() => setOpen(!open)}>
        Collections
      </button>
      <div className={`menu__panel${open ? ' is-open' : ''}`}>
        <div className="menu__cols">
          <ul>
            {typeCollections.map((c) => (
              <li key={c.handle}><Link href={`/collections/${c.handle}`}>{c.title}</Link></li>
            ))}
          </ul>
          <ul>
            {textureCollections.map((c) => (
              <li key={c.handle}><Link href={`/collections/${c.handle}`}>{c.title}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}

export function Header() {
  const count = bagCount(useBag())
  const path = usePath()
  const [menu, setMenu] = useState(false)

  useEffect(() => setMenu(false), [path])

  return (
    <header className="header">
      <div className="header__bar container">
        <button className="icon-btn header__menu" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}>
          <MenuIcon />
        </button>
        <nav aria-label="Main" className="header__nav">
          <ul>
            <li><Link href="/" className={path === '/' ? 'is-current' : undefined}>Home</Link></li>
            <li><Link href="/shop" className={path === '/shop' ? 'is-current' : undefined}>Shop</Link></li>
            <CollectionsMenu />
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <Logo />
        <div className="header__icons">
          <button className="icon-btn" aria-label="Search"><SearchIcon /></button>
          <a href="#" className="icon-btn header__account" aria-label="Account"><UserIcon /></a>
          <button className="icon-btn bag-btn" aria-label={`Open bag, ${count} items`} onClick={openBag}>
            <BagIcon />
            {count > 0 && <span className="bag-btn__count">{count}</span>}
          </button>
        </div>
      </div>

      <div className={`mnav${menu ? ' is-open' : ''}`} aria-hidden={!menu}>
        <div className="mnav__backdrop" onClick={() => setMenu(false)} />
        <div className="mnav__panel">
          <button className="icon-btn mnav__close" aria-label="Close menu" onClick={() => setMenu(false)}>
            <CloseIcon />
          </button>
          <ul className="mnav__main">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><a href="#contact" onClick={() => setMenu(false)}>Contact</a></li>
          </ul>
          <div>
            <p className="display-italic mnav__label">Collections</p>
            <ul className="mnav__sub">
              {menuCollections.map((c) => (
                <li key={c.handle}><Link href={`/collections/${c.handle}`}>{c.title}</Link></li>
              ))}
            </ul>
          </div>
          <Socials />
        </div>
      </div>
    </header>
  )
}
