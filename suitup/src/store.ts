import { useSyncExternalStore } from 'react'

// Cart for the mockup: real line items, gift wrap, a note, and the drawer's open state.
export type CartLine = { key: string; productId: string; name: string; image: string; variant: string; price: number; qty: number }
type CartState = { lines: CartLine[]; giftWrap: boolean; note: string; open: boolean }

export const GIFT_WRAP_PRICE = 50 // GH₵

let state: CartState = { lines: [], giftWrap: false, note: '', open: false }
const listeners = new Set<() => void>()
const set = (patch: Partial<CartState>) => {
  state = { ...state, ...patch }
  listeners.forEach((l) => l())
}
const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

export const useCart = () => useSyncExternalStore(subscribe, () => state)

export const cartCount = (s: CartState) => s.lines.reduce((n, l) => n + l.qty, 0) + (s.giftWrap ? 1 : 0)
export const cartSubtotal = (s: CartState) => s.lines.reduce((n, l) => n + l.price * l.qty, 0) + (s.giftWrap ? GIFT_WRAP_PRICE : 0)

/** Adds a line (merging identical ones) and slides the cart drawer open. */
export function addToCart(item: Omit<CartLine, 'key' | 'qty'>, qty = 1) {
  const key = `${item.productId}|${item.variant}`
  const exists = state.lines.some((l) => l.key === key)
  set({
    lines: exists ? state.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l)) : [...state.lines, { ...item, key, qty }],
    open: true,
  })
}

export const setQty = (key: string, qty: number) =>
  set({ lines: qty <= 0 ? state.lines.filter((l) => l.key !== key) : state.lines.map((l) => (l.key === key ? { ...l, qty } : l)) })
export const removeLine = (key: string) => setQty(key, 0)
export const setGiftWrap = (giftWrap: boolean) => set({ giftWrap })
export const setNote = (note: string) => set({ note })
export const openCart = () => set({ open: true })
export const closeCart = () => set({ open: false })
