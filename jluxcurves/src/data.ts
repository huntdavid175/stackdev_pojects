// `image` is the gallery photo shown when that colour is picked (if there is one).
export type Swatch = { name: string; color: string; image?: string }

type Kind = 'flare-set' | 'legging-set' | 'catsuit' | 'tracksuit' | 'jacket' | 'lounge-set'

export type Product = {
  id: string
  name: string
  price: number
  compareAt?: number // set = on sale (the card shows a Sale badge automatically)
  badge?: 'New' | 'Bestseller'
  soldOut?: boolean
  kind: Kind
  collection: string
  image: string // always a photo (cards, cart, thumbnails)
  hoverImage?: string
  gallery: string[] // photos and "*.mp4" clips, in display order
  swatches: Swatch[]
  sizes: string[]
}

const c = (name: string, color: string) => ({ name, color })
const black = c('Black', '#111')
const navy = c('Navy', '#2b3352')
const ivory = c('Ivory', '#efe9df')

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']
const at = (s: Swatch, image: string) => ({ ...s, image })

// The brand's own pieces, photographed and filmed by JLuxCurves. Names other than the Amy Set are placeholders.
export const products: Product[] = [
  {
    id: 'long-sleeve-flare-set', name: 'Long-Sleeve Flare Set', price: 76, badge: 'New', kind: 'flare-set', collection: 'Flare Sets',
    image: 'p-longsleeve-blush.webp',
    gallery: ['p-longsleeve-blush.webp', 'v-longsleeve-blush.mp4', 'group-garden.webp'],
    swatches: [at(c('Blush', '#efc6c4'), 'p-longsleeve-blush.webp')], sizes: SIZES,
  },
  {
    id: 'halter-flare-set', name: 'Halter Flare Set', price: 72, badge: 'Bestseller', kind: 'flare-set', collection: 'Flare Sets',
    image: 'p-halter-cream.webp', hoverImage: 'p-halter-mocha.webp',
    gallery: ['p-halter-cream.webp', 'v-halter-cream.mp4', 'p-halter-mocha.webp', 'v-garden-duo.mp4'],
    swatches: [at(c('Cream', '#ebe2cc'), 'p-halter-cream.webp'), at(c('Mocha', '#a9826a'), 'p-halter-mocha.webp')], sizes: SIZES,
  },
  {
    id: 'sculpt-contour-catsuit', name: 'Sculpt Contour Catsuit', price: 78, badge: 'New', kind: 'catsuit', collection: 'Catsuits',
    image: 'p-catsuit-1.webp', hoverImage: 'p-catsuit-2.webp',
    gallery: ['p-catsuit-1.webp', 'p-catsuit-2.webp', 'p-catsuit-3.webp'],
    swatches: [at(c('Stone', '#cdbfae'), 'p-catsuit-1.webp')], sizes: SIZES,
  },
  {
    id: 'amy-set', name: 'Amy Set', price: 85, badge: 'Bestseller', kind: 'legging-set', collection: 'Legging Sets',
    image: 'p-amy.webp',
    gallery: ['p-amy.webp'],
    swatches: [at(c('Wine', '#6e2233'), 'p-amy.webp')], sizes: SIZES,
  },
  {
    id: 'crop-tee-flare-set', name: 'Crop Tee Flare Set', price: 64, compareAt: 80, kind: 'flare-set', collection: 'Flare Sets',
    image: 'p-croptee-fuchsia.webp', hoverImage: 'p-croptee-trio.webp',
    gallery: ['p-croptee-fuchsia.webp', 'p-croptee-trio.webp'],
    swatches: [at(c('Fuchsia', '#df2378'), 'p-croptee-fuchsia.webp'), at(ivory, 'p-croptee-trio.webp'), at(navy, 'p-croptee-trio.webp')], sizes: SIZES,
  },
  {
    id: 'plum-tee-flare-set', name: 'Plum Tee Flare Set', price: 64, badge: 'New', kind: 'flare-set', collection: 'Flare Sets',
    image: 'p-plum-1.webp', hoverImage: 'p-plum-2.webp',
    gallery: ['p-plum-1.webp', 'v-plum-tee.mp4', 'p-plum-2.webp'],
    swatches: [at(c('Plum', '#6b2a7c'), 'p-plum-1.webp')], sizes: SIZES,
  },
  {
    id: 'everyday-tee-legging-set', name: 'Everyday Tee & Legging Set', price: 60, kind: 'legging-set', collection: 'Legging Sets',
    image: 'p-tee-petal.webp',
    gallery: ['p-tee-petal.webp', 'v-petal-tee.mp4'],
    swatches: [at(c('Petal', '#f2d8d5'), 'p-tee-petal.webp')], sizes: SIZES,
  },
  {
    id: 'cloud-zip-hoodie-set', name: 'Cloud Zip Hoodie Set', price: 88, kind: 'tracksuit', collection: 'Tracksuits',
    image: 'p-zip-hoodie.webp',
    gallery: ['p-zip-hoodie.webp'],
    swatches: [at(ivory, 'p-zip-hoodie.webp')], sizes: SIZES,
  },
  {
    id: 'stripe-track-set', name: 'Stripe Track Set', price: 82, kind: 'tracksuit', collection: 'Tracksuits',
    image: 'p-track-trio.webp',
    gallery: ['p-track-trio.webp'],
    swatches: [c('Lilac', '#c7a2cf'), black, c('Cocoa', '#6b4a3a')], sizes: SIZES,
  },
  {
    id: 'fleece-zip-jacket', name: 'Fleece Zip Jacket', price: 58, kind: 'jacket', collection: 'Jackets',
    image: 'p-fleece-trio.webp',
    gallery: ['p-fleece-trio.webp', 'v-fleece-trio.mp4', 'v-fleece-ivory.mp4'],
    swatches: [c('Sand', '#cbb59a'), navy, black, ivory], sizes: SIZES,
  },
  {
    id: 'lounge-tee-wide-pant-set', name: 'Lounge Tee & Wide Pant Set', price: 62, soldOut: true, kind: 'lounge-set', collection: 'Lounge Sets',
    image: 'p-lounge-black.webp',
    gallery: ['p-lounge-black.webp'],
    swatches: [at(black, 'p-lounge-black.webp')], sizes: SIZES,
  },
]

export const findProduct = (id: string) => products.find((p) => p.id === id)

// Where a colour's photo sits in the product gallery (-1 if that colour has none).
export const galleryIndex = (p: Product, swatch: number) => {
  const image = p.swatches[swatch]?.image
  return image ? p.gallery.indexOf(image) : -1
}

export const badgesOf = (p: Product) => [...(p.badge ? [p.badge] : []), ...(p.compareAt ? ['Sale'] : []), ...(p.soldOut ? ['Sold out'] : [])]

const byId = (ids: string[]) => ids.map((id) => findProduct(id)!)

export const latestArrivals = {
  'New arrivals': byId(['long-sleeve-flare-set', 'sculpt-contour-catsuit', 'plum-tee-flare-set', 'crop-tee-flare-set']),
  'Best sellers': byId(['halter-flare-set', 'amy-set', 'fleece-zip-jacket', 'everyday-tee-legging-set']),
}

export const mustHaves = byId(['sculpt-contour-catsuit', 'stripe-track-set', 'cloud-zip-hoodie-set', 'crop-tee-flare-set'])

// Product page rails
export const buyItWith = byId(['fleece-zip-jacket', 'everyday-tee-legging-set', 'crop-tee-flare-set', 'amy-set', 'cloud-zip-hoodie-set'])

export const alsoLike = (p: Product) => {
  const order = ['halter-flare-set', 'long-sleeve-flare-set', 'crop-tee-flare-set', 'plum-tee-flare-set', 'sculpt-contour-catsuit', 'amy-set', 'everyday-tee-legging-set', 'stripe-track-set', 'fleece-zip-jacket']
  return byId(order.filter((id) => id !== p.id))
}

const descriptions: Record<Kind, string> = {
  'flare-set':
    'A matching top and flare that hugs the waist, lifts the hips and flares out just right. Buttery-soft, squat-proof stretch that moves with every curve, from the gym floor to brunch and back.',
  'legging-set':
    'A sculpting top and high-waisted legging made to hold, smooth and celebrate your shape. Opaque, second-skin fabric with a waistband that stays put.',
  catsuit:
    'One piece, zero effort. Contour seams trace and define your curves while the long sleeves and high neck keep it sleek. Pair with trainers for the day or heels for the night.',
  tracksuit:
    'Our elevated lounge set: a relaxed top and wide-leg pant in soft, brushed fabric. Cosy enough for travel days, polished enough for everything else.',
  jacket:
    'A cropped fleece zip-up with a drawcord hem you can cinch to show off your waist. Throw it over any set for an instant finish.',
  'lounge-set':
    'A fitted tee and wide-leg pant for the days you want comfort without giving up the shape. Soft, breathable and made to be lived in.',
}

export const describe = (p: Product) => descriptions[p.kind]

export const sizeChart = [
  ['S', '4–6', '27–28"', '37–38"'],
  ['M', '8–10', '29–30"', '39–40"'],
  ['L', '12–14', '31–33"', '41–43"'],
  ['XL', '16–18', '34–36"', '44–46"'],
  ['XXL', '20–22', '37–40"', '47–50"'],
]

export const categories = [
  { title: 'Tops', image: 'cat-tops.webp' },
  { title: 'Bras', image: 'cat-bras.webp' },
  { title: 'Shorts', image: 'cat-shorts.webp' },
  { title: 'Swimwears', image: 'cat-swimwear.webp' },
  { title: 'Leggings', image: 'cat-leggings.webp' },
  { title: 'Accessories', image: 'cat-accessories.webp' },
]

// Home hero. `tone: 'light'` is for bright photos: dark menu text, dark wordmark set lower so it clears faces.
export const HERO = {
  image: 'hero-warm.webp',
  imagePortrait: 'hero-warm-portrait.webp', // phones and tablets: portrait crop with open wall above the models
  alt: 'Three women in JLuxCurves fleece zip jackets and wide-leg pants, posing in a sunlit cream studio',
  tone: 'light' as 'light' | 'dark',
  focusX: '42%', // horizontal crop point on wide screens: keeps the models clear of the menu
  focusXPhone: '50%', // horizontal crop point of the portrait photo
  eyebrow: 'New collection',
  title: ['The Lounge', 'Edit'],
  href: '/collections/lounge-edit',
}

export const handle = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/* ---------- Collections ---------- */

// Filter labels for the "Product type" facet.
export const typeLabel: Record<Kind, string> = {
  'flare-set': 'Flare sets',
  'legging-set': 'Legging sets',
  catsuit: 'Catsuits',
  tracksuit: 'Tracksuits',
  jacket: 'Jackets',
  'lounge-set': 'Lounge sets',
}

const DEFAULT_COPY = 'Sets, catsuits and loungewear made to hold, flatter and celebrate every curve.'
const named = (re: RegExp) => (p: Product) => re.test(p.name)
const kinds = (...k: Kind[]) => (p: Product) => k.includes(p.kind)
const none = () => false
const tops = named(/tee|halter|long-sleeve|jacket|hoodie|amy|catsuit/i)

const collectionRules: Record<string, { title?: string; copy?: string; match: (p: Product) => boolean }> = {
  all: { title: 'Shop All', match: () => true },
  tops: { match: tops },
  'active-tops': { match: tops },
  'four-way-tops': { match: tops },
  'reversible-tops': { match: tops },
  'one-shoulder-tops': { match: named(/halter/i) },
  bras: { copy: 'Our halter tops double as the perfect bra top.', match: named(/halter/i) },
  shorts: { copy: 'Biker shorts and sets are landing soon.', match: none },
  'biker-shorts': { copy: 'Biker shorts are landing soon.', match: none },
  swimwears: { copy: 'Swim is landing soon. Sign up below to hear first.', match: none },
  'swim-wears': { title: 'Swim Wears', copy: 'Swim is landing soon. Sign up below to hear first.', match: none },
  accessories: { copy: 'Caps, bags and the finishing touches, landing soon.', match: none },
  leggings: { match: kinds('legging-set', 'flare-set', 'catsuit') },
  flares: { match: kinds('flare-set') },
  joggers: { match: kinds('tracksuit') },
  'new-arrivals': { match: (p) => p.badge === 'New' || ['crop-tee-flare-set'].includes(p.id) },
  'best-sellers': { match: (p) => p.badge === 'Bestseller' || ['fleece-zip-jacket', 'everyday-tee-legging-set'].includes(p.id) },
  sale: { title: 'Sale', copy: 'Must-have styles at their best price, while stocks last.', match: (p) => !!p.compareAt },
  'iconic-prints': { title: 'Iconic Sets', match: kinds('flare-set', 'legging-set') },
  'better-basics': { match: kinds('legging-set', 'lounge-set', 'jacket') },
  'courtside-capsule': { match: kinds('flare-set') },
  'working-girl': { match: kinds('catsuit', 'legging-set', 'tracksuit') },
  classic: { match: kinds('flare-set', 'catsuit') },
  'back-in-stock': { match: kinds('tracksuit', 'jacket') },
  'lounge-edit': { title: 'The Lounge Edit', copy: 'Fleece zip-ups, track sets and wide-leg pants made for slow days and soft landings.', match: kinds('tracksuit', 'jacket', 'lounge-set') },
}

const titleCase = (h: string) => h.split('-').map((w) => w[0]?.toUpperCase() + w.slice(1)).join(' ')

/** Any /collections/<handle> resolves: known handles filter the catalogue, anything else shows everything. */
export function getCollection(h: string) {
  const rule = collectionRules[h]
  return {
    handle: h,
    title: rule?.title ?? titleCase(h),
    copy: rule?.copy ?? DEFAULT_COPY,
    products: products.filter(rule?.match ?? (() => true)),
  }
}

/* ---------- Money and cart settings ---------- */

export const money = (n: number) => `$${n.toFixed(2)}`

export const FREE_SHIPPING = 100
export const GIFT_WRAP = 1
// Codes the mockup's cart accepts (percent off). WELCOME matches the announcement bar.
export const DISCOUNTS: Record<string, number> = { WELCOME: 10 }
