import { useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from 'react'

// Minimal pushState router — enough for a mockup without pulling in a routing library.
const subscribe = (cb: () => void) => {
  window.addEventListener('popstate', cb)
  return () => window.removeEventListener('popstate', cb)
}

// App routes are written without the base path ("/products/x"); the site itself may be served
// under a sub-path (e.g. /ashley-impressions/), so strip it on read and add it on write.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const withBase = (to: string) => BASE + to
const currentPath = () => window.location.pathname.slice(BASE.length) || '/'

export const usePath = () => useSyncExternalStore(subscribe, currentPath)

export function navigate(to: string) {
  if (to === currentPath()) return
  window.history.pushState(null, '', withBase(to))
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

export function Link({ href, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    navigate(href)
  }
  return <a href={withBase(href)} onClick={handle} {...rest} />
}

export const PRODUCT_URL = '/products/anua-heartleaf-cleansing-foam'
