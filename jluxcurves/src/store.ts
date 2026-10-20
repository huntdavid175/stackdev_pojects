import { useSyncExternalStore } from 'react'

// Tiny shared stores for the mockup: the quick-view modal and the cart.
function createStore<T>(initial: T) {
  let state = initial
  const listeners = new Set<() => void>()
  return {
    get: () => state,
    set(next: T) {
      state = next
      listeners.forEach((l) => l())
    },
    subscribe(l: () => void) {
      listeners.add(l)
      return () => listeners.delete(l)
    },
  }
}

/* ---------- Quick view ---------- */

type QuickView = { productId: string; swatch: number } | null
const quickView = createStore<QuickView>(null)

export const useQuickView = () => useSyncExternalStore(quickView.subscribe, quickView.get)
export const openQuickView = (productId: string, swatch = 0) => quickView.set({ productId, swatch })
export const closeQuickView = () => quickView.set(null)

/* ---------- Cart ---------- */

export type CartLine = { productId: string; color: string; size: string; qty: number }

const lineKey = (l: CartLine) => `${l.productId}|${l.color}|${l.size}`

// The cart survives a refresh (per browser) so a prospect can click around freely.
const SAVED = 'jlux-cart'
function loadCart(): CartLine[] {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVED) ?? '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

const cart = createStore<CartLine[]>(loadCart())
cart.subscribe(() => {
  try {
    localStorage.setItem(SAVED, JSON.stringify(cart.get()))
  } catch {
    /* storage unavailable: the cart just won't persist */
  }
})

export const useCart = () => useSyncExternalStore(cart.subscribe, cart.get)
export const cartCount = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty, 0)

/** Adds the line (merging with an identical one) and opens the cart drawer. */
export function addToCart(line: CartLine) {
  const lines = cart.get()
  const same = (l: CartLine) => lineKey(l) === lineKey(line)
  cart.set(lines.some(same) ? lines.map((l) => (same(l) ? { ...l, qty: l.qty + line.qty } : l)) : [...lines, line])
  closeQuickView()
  openCart()
}

export function setLineQty(line: CartLine, qty: number) {
  cart.set(qty <= 0 ? cart.get().filter((l) => lineKey(l) !== lineKey(line)) : cart.get().map((l) => (lineKey(l) === lineKey(line) ? { ...l, qty } : l)))
}

export const removeLine = (line: CartLine) => setLineQty(line, 0)
export { lineKey }

/* ---------- Cart drawer ---------- */

const drawer = createStore(false)
export const useCartOpen = () => useSyncExternalStore(drawer.subscribe, drawer.get)
export const openCart = () => drawer.set(true)
export const closeCart = () => drawer.set(false)
