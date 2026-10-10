import { useSyncExternalStore } from 'react'

// Client-side cart for the mockup. In the Shopify build this maps onto the AJAX Cart API
// (/cart/add.js, /cart/change.js, /cart/update.js for note + attributes, discount via checkout).

export type CartItem = { name: string; img: string; price: number; variant?: string }
export type CartLine = CartItem & { id: string; qty: number }

type CartState = {
  lines: CartLine[]
  open: boolean
  giftWrap: boolean
  note: string
  discount: { code: string; pct: number } | null
}

export const FREE_SHIPPING_AT = 3000
export const GIFT_WRAP_PRICE = 10
const CODES: Record<string, number> = { WELCOME10: 10, ASHLEY15: 15 }
const STORAGE_KEY = 'ai-cart-ghs' // renamed when prices moved to cedis

const empty: CartState = { lines: [], open: false, giftWrap: false, note: '', discount: null }

function load(): CartState {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (saved && Array.isArray(saved.lines)) return { ...empty, ...saved, open: false }
  } catch {
    /* storage unavailable — start empty */
  }
  return empty
}

let state = load()
const listeners = new Set<() => void>()

function set(patch: Partial<CartState>) {
  state = { ...state, ...patch }
  try {
    const { open: _open, ...persist } = state
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persist))
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l())
}

export const useCart = () =>
  useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => state,
  )

const lineId = (item: CartItem) => `${item.name}__${item.variant ?? ''}`

export function addToCart(items: CartItem | CartItem[], { open = true } = {}) {
  let lines = state.lines
  for (const item of Array.isArray(items) ? items : [items]) {
    const id = lineId(item)
    const existing = lines.find((l) => l.id === id)
    lines = existing
      ? lines.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
      : [...lines, { ...item, id, qty: 1 }]
  }
  set({ lines, open: open || state.open })
}

export const setQty = (id: string, qty: number) =>
  set({ lines: qty <= 0 ? state.lines.filter((l) => l.id !== id) : state.lines.map((l) => (l.id === id ? { ...l, qty } : l)) })

export const removeLine = (id: string) => set({ lines: state.lines.filter((l) => l.id !== id) })
export const openCart = () => set({ open: true })
export const closeCart = () => set({ open: false })
export const setGiftWrap = (giftWrap: boolean) => set({ giftWrap })
export const setNote = (note: string) => set({ note })
export const clearDiscount = () => set({ discount: null })

export function applyDiscount(raw: string) {
  const code = raw.trim().toUpperCase()
  const pct = CODES[code]
  if (!pct) return false
  set({ discount: { code, pct } })
  return true
}

export function totals(s: CartState) {
  const count = s.lines.reduce((n, l) => n + l.qty, 0)
  const items = s.lines.reduce((n, l) => n + l.qty * l.price, 0)
  const discount = s.discount ? Math.round(items * s.discount.pct) / 100 : 0
  const wrap = s.giftWrap && count > 0 ? GIFT_WRAP_PRICE : 0
  return { count, items, discount, wrap, subtotal: items - discount + wrap }
}
