import { useSyncExternalStore } from 'react'

// Client-side bag for the mockup. In Shopify this maps onto the AJAX Cart API (/cart/add.js, /cart/change.js).
export type BagLine = { key: string; id: string; name: string; img: string; length: number; price: number; qty: number }
type BagState = { lines: BagLine[]; open: boolean }

const STORAGE_KEY = 'hbg-bag'

function load(): BagState {
  try {
    const lines = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (Array.isArray(lines)) return { lines, open: false }
  } catch {
    /* storage unavailable: start empty */
  }
  return { lines: [], open: false }
}

let state = load()
const listeners = new Set<() => void>()

function set(patch: Partial<BagState>) {
  state = { ...state, ...patch }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines))
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l())
}

export const useBag = () =>
  useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => state,
  )

export function addToBag(item: Omit<BagLine, 'key' | 'qty'>, qty = 1) {
  const key = `${item.id}__${item.length}`
  const existing = state.lines.find((l) => l.key === key)
  const lines = existing
    ? state.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
    : [...state.lines, { ...item, key, qty }]
  set({ lines, open: true })
}

export const setQty = (key: string, qty: number) =>
  set({ lines: qty <= 0 ? state.lines.filter((l) => l.key !== key) : state.lines.map((l) => (l.key === key ? { ...l, qty } : l)) })

export const removeLine = (key: string) => set({ lines: state.lines.filter((l) => l.key !== key) })
export const openBag = () => set({ open: true })
export const closeBag = () => set({ open: false })

export const bagCount = (s: BagState) => s.lines.reduce((n, l) => n + l.qty, 0)
export const bagSubtotal = (s: BagState) => s.lines.reduce((n, l) => n + l.qty * l.price, 0)
