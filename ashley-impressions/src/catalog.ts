// Mock catalog for the mockup. In Shopify this comes from collection.products + storefront filters.

export type ProductType = 'Serums' | 'Cleansers' | 'Toners' | 'Body & Hands' | 'Masks' | 'Moisturizer'
export type Badge = { label: string; tone: 'sale' | 'new' | 'best' }

export type Product = {
  id: string
  name: string
  img: string
  price: number
  compareAt?: number
  badge?: 'new' | 'best'
  type: ProductType
  sizes: string[]
  added: number // days ago, for "date" sorting
  sales: number // for "best selling"
}

export const SIZES = ['30ml', '45ml', '50ml', '75ml', '100ml']

const p = (
  id: string,
  name: string,
  img: string,
  price: number,
  type: ProductType,
  sizes: string[],
  extra: Partial<Product> = {},
): Product => ({ id, name, img, price, type, sizes, added: 30, sales: 10, ...extra })

export const products: Product[] = [
  p('power-couple-kit', 'Power couple kit', 'p-power-couple.jpg', 1200, 'Serums', ['30ml', '45ml'], { badge: 'best', sales: 98, added: 40 }),
  p('snow-mushroom-mask', 'Snow - mushroom day/night mask', 'p-snow-mask.jpg', 840, 'Masks', ['50ml', '75ml'], { sales: 41 }),
  p('natural-body-wash', 'Natural body wash', 'p-natural-wash.jpg', 2520, 'Body & Hands', ['75ml', '100ml'], { badge: 'new', added: 2 }),
  p('deep-clean-micellar-water', 'Deep clean micellar water', 'related-1.jpg', 1070, 'Cleansers', ['45ml', '75ml'], { compareAt: 1200, sales: 77 }),
  p('intense-repair-body-cream', 'Intense Repair Body Cream', 'product-4.jpg', 300, 'Body & Hands', ['50ml', '75ml'], { compareAt: 360, sales: 64 }),
  p('ultimate-facelift-day-cream', 'Ultimate Facelift Day Cream', 'p-sandalwood.jpg', 360, 'Moisturizer', ['45ml', '75ml'], { badge: 'best', sales: 91 }),
  p('smooth-whipped-body-treatment', 'Smooth whipped exfoliating body treatment', 'related-4.jpg', 600, 'Body & Hands', ['75ml'], { sales: 22 }),
  p('gentle-retinol-night-serum', 'Gentle retinol night serum', 'p-gentle.jpg', 600, 'Serums', ['30ml', '45ml'], { badge: 'new', added: 4 }),
  p('triple-vitamin-c-serum', 'Triple vitamin-c brightening serum', 'p-brightening.jpg', 720, 'Serums', ['30ml', '45ml', '50ml'], { sales: 55 }),
  p('avocado-hydrating-cleanser', 'Avocado hydrating cleanser', 'p-avocado-cleanser.jpg', 420, 'Cleansers', ['75ml', '100ml'], { sales: 30 }),
  p('deep-clean-kit', 'Deep clean kit', 'pdp-1.jpg', 1910, 'Cleansers', ['50ml', '75ml', '100ml'], { compareAt: 2280, sales: 70, added: 12 }),
  p('exfoliating-daily-cleanser', 'Exfoliating daily cleanser', 'related-2.jpg', 900, 'Cleansers', ['75ml'], { sales: 48 }),
  p('the-comfy-kit', 'The comfy kit', 'related-3.jpg', 1920, 'Body & Hands', ['75ml'], { sales: 35, added: 8 }),
  p('purifying-face-wash', 'Purifying face wash', 'product-1.jpg', 325, 'Cleansers', ['45ml', '75ml'], { compareAt: 360, sales: 60 }),
  p('avocado-rescue-moisturiser', 'Avocado rescue moisturiser', 'product-2.jpg', 360, 'Moisturizer', ['50ml'], { badge: 'new', added: 3 }),
  p('semina-cleansing-oil', 'Semina cleansing oil', 'product-3.jpg', 360, 'Cleansers', ['75ml', '100ml'], { badge: 'best', sales: 88 }),
  p('balancing-rose-toner', 'Balancing rose toner', 'related-2.jpg', 455, 'Toners', ['75ml', '100ml'], { sales: 18 }),
  p('pore-refining-toner', 'Pore refining toner', 'p-avocado-cleanser.jpg', 505, 'Toners', ['100ml'], { sales: 26, added: 15 }),
  p('amore-overnight-mask', 'Amore overnight mask', 'cat-serums.jpg', 660, 'Masks', ['50ml'], { sales: 33 }),
  p('mood-body-butter', 'Mood body butter', 'cat-body.jpg', 540, 'Body & Hands', ['75ml'], { sales: 21 }),
  p('blanca-hand-body-wash', 'Blanca hand & body wash', 'cat-moisturizer.jpg', 385, 'Body & Hands', ['75ml', '100ml'], { sales: 39 }),
  p('hyaluronic-sea-serum', 'Hyaluronic sea serum', 'p-gentle.jpg', 1560, 'Serums', ['30ml', '50ml'], { sales: 52 }),
  p('bio-retinol-mask', 'Bio-retinol mask', 'p-snow-mask.jpg', 780, 'Masks', ['50ml'], { sales: 29, added: 6 }),
  p('sandalwood-hand-cream', 'Sandalwood hand cream', 'p-sandalwood.jpg', 265, 'Body & Hands', ['30ml', '45ml'], { sales: 45 }),
]

export type Collection = { handle: string; title: string; description: string; banner: string; types: ProductType[] }

export const collections: Collection[] = [
  {
    handle: 'serums',
    title: 'Serums',
    description: 'Power up your routine with serums packed with potent ingredients for hydration, glow, and repair.',
    banner: 'banner-serums.jpg',
    types: ['Serums', 'Toners', 'Body & Hands', 'Moisturizer'],
  },
  {
    handle: 'cleansers',
    title: 'Cleansers',
    description: 'Gentle washes, oils and micellar waters that lift the day away without stripping your skin.',
    banner: 'bundle.jpg',
    types: ['Cleansers', 'Toners'],
  },
  {
    handle: 'toners',
    title: 'Toners',
    description: 'Balancing toners that refine pores and prep skin to drink in everything that follows.',
    banner: 'promo-summer.jpg',
    types: ['Toners', 'Serums'],
  },
  {
    handle: 'body-hands',
    title: 'Body & Hands',
    description: 'Rich creams, washes and butters for soft, comfortable skin from shoulders to fingertips.',
    banner: 'faq.jpg',
    types: ['Body & Hands', 'Moisturizer'],
  },
  {
    handle: 'masks',
    title: 'Masks',
    description: 'Weekly treatments that clarify, calm and restore — ten minutes well spent.',
    banner: 'collections.jpg',
    types: ['Masks', 'Serums'],
  },
  {
    handle: 'moisturizer',
    title: 'Moisturizer',
    description: 'Daily hydration for every skin type, from featherlight gels to cushioning creams.',
    banner: 'promo-resilient.jpg',
    types: ['Moisturizer', 'Body & Hands'],
  },
]

export const SHOP_ALL = {
  title: 'Shop All',
  description: 'Explore our full collection of beauty essentials, from skincare to body care and more.',
}

export const findCollection = (handle: string) => collections.find((c) => c.handle === handle)
export const collectionUrl = (handle: string) => `/collections/${handle}`
export const productsIn = (c: Collection) => products.filter((pr) => c.types.includes(pr.type))

export function badgeFor(pr: Product): Badge | undefined {
  if (pr.compareAt) return { label: `-${Math.floor((1 - pr.price / pr.compareAt) * 100)}%`, tone: 'sale' }
  if (pr.badge === 'new') return { label: 'New', tone: 'new' }
  if (pr.badge === 'best') return { label: 'Bestseller', tone: 'best' }
}

// ---- filtering & sorting ----

export type Filters = { types: ProductType[]; min: number; max: number | null; sizes: string[] }
export const emptyFilters: Filters = { types: [], min: 0, max: null, sizes: [] }

export const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'best', label: 'Best selling' },
  { id: 'az', label: 'Alphabetically, A-Z' },
  { id: 'za', label: 'Alphabetically, Z-A' },
  { id: 'price-asc', label: 'Price, low to high' },
  { id: 'price-desc', label: 'Price, high to low' },
  { id: 'new', label: 'Date, new to old' },
  { id: 'old', label: 'Date, old to new' },
] as const
export type SortId = (typeof SORTS)[number]['id']

export function applyFilters(list: Product[], f: Filters, exclude?: keyof Filters) {
  return list.filter(
    (pr) =>
      (exclude === 'types' || !f.types.length || f.types.includes(pr.type)) &&
      (exclude === 'sizes' || !f.sizes.length || pr.sizes.some((s) => f.sizes.includes(s))) &&
      pr.price >= f.min &&
      (f.max === null || pr.price <= f.max),
  )
}

export function sortProducts(list: Product[], sort: SortId) {
  const out = [...list]
  const by: Record<SortId, (a: Product, b: Product) => number> = {
    featured: () => 0,
    best: (a, b) => b.sales - a.sales,
    az: (a, b) => a.name.localeCompare(b.name),
    za: (a, b) => b.name.localeCompare(a.name),
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    new: (a, b) => a.added - b.added,
    old: (a, b) => b.added - a.added,
  }
  return out.sort(by[sort])
}

const LINKS: Record<string, string> = {
  Serums: 'serums',
  Cleansers: 'cleansers',
  Cleaners: 'cleansers',
  Toners: 'toners',
  'Body & Hands': 'body-hands',
  'Hands & Body': 'body-hands',
  'Body Care': 'body-hands',
  Masks: 'masks',
  Moisturizer: 'moisturizer',
}
/** URL for a menu / category label; anything without its own collection goes to Shop All. */
export const linkFor = (label: string) => collectionUrl(LINKS[label] ?? 'all')

export const money = (n: number) => `GH₵${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
