// Mock catalog for the mockup. In Shopify this comes from collection.products + storefront filters.

export type ProductType = 'Serums' | 'Cleansers' | 'Toners' | 'Body & Hands' | 'Masks' | 'Moisturizer' | 'Supplements'
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

export const SIZES = ['75ml', '89ml', '125ml', '150ml', '250ml', '280ml', '350ml', '500ml', '1000ml', '390 tablets']

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
  p('anua-heartleaf-cleansing-foam', 'Anua Heartleaf Quercetinol pore deep cleansing foam', 'products/anua-heartleaf-foam.webp', 250, 'Cleansers', ['150ml'], { badge: 'best', sales: 96 }),
  p('skin1004-centella-soothing-cream', 'Skin1004 Madagascar Centella soothing cream', 'products/centella-soothing-cream.webp', 290, 'Moisturizer', ['75ml'], { badge: 'new', added: 3, sales: 40 }),
  p('makari-toning-glycerin', 'Makari Extreme Argan & Carrot Oil toning glycerin', 'products/makari-toning-glycerin.webp', 800, 'Toners', ['500ml'], { sales: 58 }),
  p('makari-botanical-body-oil', 'Makari Extreme Argan & Carrot botanical body oil', 'products/makari-body-oil.webp', 400, 'Body & Hands', ['125ml'], { badge: 'best', sales: 88 }),
  p('hatomugi-uv-milky-gel', 'Hatomugi UV milky gel SPF50+', 'products/hatomugi-uv-gel.webp', 200, 'Moisturizer', ['250ml'], { sales: 64 }),
  p('advanced-korean-skin-body-oil', 'Advanced Korean Skin body oil', 'products/korean-body-oil.webp', 150, 'Body & Hands', ['280ml'], { badge: 'new', added: 2, sales: 52 }),
  p('veetgold-vitamin-c-body-oil', 'Veetgold Vitamin C body corrector oil', 'products/veetgold-vitamin-c-oil.webp', 170, 'Body & Hands', ['1000ml'], { sales: 77 }),
  p('bismid-clear-glow-lotion', 'Bismid Clear & Glow whitening lotion', 'products/bismid-whitening-lotion.webp', 200, 'Body & Hands', ['350ml'], { sales: 45 }),
  p('exfoliating-shower-gel', 'Turmeric & Carrot exfoliating shower gel', 'products/exfoliating-shower-gel.webp', 140, 'Cleansers', ['1000ml'], { sales: 70, added: 12 }),
  p('black-girl-sunscreen-kids', 'Black Girl Sunscreen Kids SPF 50', 'products/bgs-kids-sunscreen.webp', 220, 'Moisturizer', ['89ml'], { sales: 33, added: 8 }),
  p('youtheory-collagen-biotin', 'Youtheory Collagen + Biotin, 390 tablets', 'products/youtheory-collagen.webp', 480, 'Supplements', ['390 tablets'], { sales: 61 }),
]

export type Collection = { handle: string; title: string; description: string; banner: string; types: ProductType[] }

export const collections: Collection[] = [
  {
    handle: 'serums',
    title: 'Serums',
    description: 'Power up your routine with serums packed with potent ingredients for hydration, glow, and repair.',
    banner: 'banner-serums.webp',
    types: ['Serums', 'Toners', 'Body & Hands', 'Moisturizer'],
  },
  {
    handle: 'cleansers',
    title: 'Cleansers',
    description: 'Gentle washes, oils and micellar waters that lift the day away without stripping your skin.',
    banner: 'bundle.webp',
    types: ['Cleansers', 'Toners'],
  },
  {
    handle: 'toners',
    title: 'Toners',
    description: 'Balancing toners that refine pores and prep skin to drink in everything that follows.',
    banner: 'promo-summer.webp',
    types: ['Toners', 'Serums'],
  },
  {
    handle: 'body-hands',
    title: 'Body & Hands',
    description: 'Rich creams, washes and butters for soft, comfortable skin from shoulders to fingertips.',
    banner: 'faq.webp',
    types: ['Body & Hands', 'Moisturizer'],
  },
  {
    handle: 'masks',
    title: 'Masks',
    description: 'Weekly treatments that clarify, calm and restore — ten minutes well spent.',
    banner: 'collections.webp',
    types: ['Masks', 'Cleansers', 'Toners'],
  },
  {
    handle: 'moisturizer',
    title: 'Moisturizer',
    description: 'Daily hydration for every skin type, from featherlight gels to cushioning creams.',
    banner: 'promo-resilient.webp',
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
