// SuitUp's range, photographed and filmed by the brand. Prices in Ghana cedis; names and exact prices to confirm.

export type Kind = 'suit' | 'evening' | 'knit' | 'shirt' | 'trouser'
export type Color = { name: string; color: string; image?: string; soldOut?: boolean }

export type Product = {
  id: string
  name: string
  price: number
  compareAt?: number
  badges: string[] // shown as pills on the card; "on sale" is added automatically
  kind: Kind
  image: string // card photo
  listImage?: string // collection grid photo, when it differs from the card photo
  swatches: string[]
  extraSwatches?: number
  tags: string[] // collection membership beyond the kind (e.g. 'three-piece', 'double-breasted')
  colors?: Color[]
  gallery?: string[] // photos and "*.mp4" clips, in display order
  description?: string
}

const p = (x: Product) => x

export const products: Product[] = [
  /* ---------- Suits ---------- */
  p({
    id: 'forest-double-breasted-suit', name: 'Forest Double-Breasted Suit', price: 1050, badges: ['new'], kind: 'suit', tags: ['double-breasted'],
    image: 's-forest-db.webp', swatches: ['#3c4a3a'], gallery: ['s-forest-db.webp', 'v-forest-db.mp4'],
  }),
  p({
    id: 'espresso-double-breasted-suit', name: 'Espresso Double-Breasted Suit', price: 1050, badges: [], kind: 'suit', tags: ['double-breasted'],
    image: 's-espresso-db.webp', swatches: ['#3a2420'], gallery: ['s-espresso-db.webp', 'v-espresso-db.mp4'],
  }),
  p({
    id: 'ivory-double-breasted-suit', name: 'Ivory Double-Breasted Suit', price: 1150, badges: ['bestseller'], kind: 'suit', tags: ['double-breasted'],
    image: 's-ivory-db.webp', swatches: ['#e7dfcf'], gallery: ['s-ivory-db.webp', 'v-ivory-db.mp4'],
  }),
  p({
    id: 'midnight-chalk-stripe-suit', name: 'Midnight Chalk-Stripe Suit', price: 1150, badges: [], kind: 'suit', tags: ['double-breasted'],
    image: 's-midnight-chalk.webp', swatches: ['#24233a'], gallery: ['s-midnight-chalk.webp', 'v-midnight-chalk.mp4'],
  }),
  p({
    id: 'navy-double-breasted-suit', name: 'Navy Double-Breasted Suit', price: 1000, compareAt: 1150, badges: [], kind: 'suit', tags: ['double-breasted'],
    image: 's-navy-db.webp', swatches: ['#1d2740'], gallery: ['s-navy-db.webp', 'v-navy-db.mp4'],
  }),
  p({
    id: 'navy-pinstripe-suit', name: 'Navy Pinstripe Suit', price: 1200, badges: ['low stock'], kind: 'suit', tags: ['double-breasted'],
    image: 's-navy-pin-1.webp', swatches: ['#1f2742'], gallery: ['s-navy-pin-1.webp', 's-navy-pin-3.webp', 's-navy-pin-2.webp'],
  }),
  p({
    id: 'cream-wide-leg-suit', name: 'Cream Wide-Leg Suit', price: 1100, badges: [], kind: 'suit', tags: ['double-breasted'],
    image: 's-cream-wide-1.webp', swatches: ['#e9dfca'], gallery: ['s-cream-wide-1.webp', 's-cream-wide-2.webp'],
  }),
  p({
    id: 'black-three-piece-suit', name: 'Black Three-Piece Suit', price: 1200, badges: [], kind: 'suit', tags: ['three-piece'],
    image: 's-black-three.webp', swatches: ['#1c1c1c'], gallery: ['s-black-three.webp', 'v-black-three.mp4'],
  }),
  p({
    id: 'stone-three-piece-suit', name: 'Stone Three-Piece Suit', price: 1200, badges: ['organic'], kind: 'suit', tags: ['three-piece'],
    image: 's-stone-three.webp', swatches: ['#d9d2c4'], gallery: ['s-stone-three.webp', 'v-stone-three.mp4'],
  }),
  p({
    id: 'caramel-three-piece-suit', name: 'Caramel Three-Piece Suit', price: 1100, compareAt: 1300, badges: [], kind: 'suit', tags: ['three-piece'],
    image: 's-caramel-1.webp', swatches: ['#8a5a36'], gallery: ['s-caramel-1.webp', 's-caramel-2.webp'],
  }),

  /* ---------- Evening ---------- */
  p({
    id: 'ivory-double-breasted-tuxedo', name: 'Ivory Double-Breasted Tuxedo', price: 1350, badges: ['new'], kind: 'evening', tags: [],
    image: 'e-ivory-tux-2.webp', swatches: ['#f1ede4'], gallery: ['e-ivory-tux-2.webp', 'e-ivory-tux-3.webp', 'e-ivory-tux-1.webp', 'e-ivory-tux-4.webp'],
  }),
  p({
    id: 'velvet-shawl-tuxedo', name: 'Velvet Shawl Tuxedo', price: 1400, badges: [], kind: 'evening', tags: [],
    image: 'e-velvet-tux.webp', swatches: ['#141418'], gallery: ['e-velvet-tux.webp', 'v-velvet-tux.mp4'],
  }),
  p({
    id: 'plum-paisley-dinner-jacket', name: 'Plum Paisley Dinner Jacket', price: 950, badges: ['low stock'], kind: 'evening', tags: [],
    image: 'e-plum-2.webp', swatches: ['#4a2338'], gallery: ['e-plum-2.webp', 'v-plum.mp4', 'e-plum-1.webp', 'e-plum-3.webp'],
  }),
  p({
    id: 'emerald-jacquard-dinner-jacket', name: 'Emerald Jacquard Dinner Jacket', price: 900, compareAt: 1050, badges: [], kind: 'evening', tags: [],
    image: 'e-emerald.webp', swatches: ['#1e4a46'], gallery: ['e-emerald.webp', 'v-emerald.mp4'],
  }),
  p({
    id: 'bronze-brocade-dinner-jacket', name: 'Bronze Brocade Dinner Jacket', price: 950, badges: [], kind: 'evening', tags: [],
    image: 'e-bronze-1.webp', swatches: ['#6b4126'], gallery: ['e-bronze-1.webp', 'v-bronze.mp4', 'e-bronze-2.webp'],
  }),
  p({
    id: 'champagne-jacquard-dinner-jacket', name: 'Champagne Jacquard Dinner Jacket', price: 1000, badges: ['bestseller'], kind: 'evening', tags: [],
    image: 'e-champagne-2.webp', swatches: ['#e6d2a8'], gallery: ['e-champagne-2.webp', 'e-champagne-1.webp'],
  }),

  /* ---------- Knitwear ---------- */
  p({
    id: 'ribbed-quarter-zip-knit', name: 'Ribbed Quarter-Zip Knit', price: 450, badges: ['new'], kind: 'knit', tags: [],
    image: 'k-zip-rust.webp', swatches: ['#a2492e', '#5c1c26', '#b8a78f', '#1d2740'],
    gallery: ['k-zip-rust.webp', 'k-zip-rust-2.webp', 'k-zip-burgundy.webp', 'k-zip-burgundy-2.webp', 'k-zip-oat.webp', 'k-zip-navy.webp', 'k-zip-navy-2.webp'],
    colors: [
      { name: 'Rust', color: '#a2492e', image: 'k-zip-rust.webp' },
      { name: 'Burgundy', color: '#5c1c26', image: 'k-zip-burgundy.webp' },
      { name: 'Oat', color: '#b8a78f', image: 'k-zip-oat.webp' },
      { name: 'Navy', color: '#1d2740', image: 'k-zip-navy.webp' },
    ],
    description:
      'A chunky ribbed quarter-zip in a soft, warm wool blend. Wear it over a shirt and tie for the office, or on its own at the weekend. Regular fit with ribbed cuffs and hem.',
  }),

  /* ---------- Shirts ---------- */
  p({ id: 'classic-white-shirt', name: 'Classic White Shirt', price: 280, badges: ['bestseller'], kind: 'shirt', tags: [], image: 'sh-white.webp', swatches: ['#f4f4f2'] }),
  p({ id: 'white-french-cuff-shirt', name: 'White French-Cuff Shirt', price: 320, badges: [], kind: 'shirt', tags: [], image: 'sh-white-french.webp', swatches: ['#f4f4f2'] }),
  p({ id: 'sky-fine-stripe-shirt', name: 'Sky Fine-Stripe Shirt', price: 300, badges: [], kind: 'shirt', tags: [], image: 'sh-sky-fine.webp', swatches: ['#c6d4ec'] }),
  p({ id: 'pale-blue-stripe-shirt', name: 'Pale Blue Stripe Shirt', price: 300, badges: [], kind: 'shirt', tags: [], image: 'sh-pale-stripe.webp', swatches: ['#cfe0ee'] }),
  p({ id: 'blue-linen-shirt', name: 'Blue Linen Shirt', price: 350, badges: ['organic'], kind: 'shirt', tags: [], image: 'sh-blue-linen.webp', swatches: ['#4f78b8'] }),
  p({ id: 'sage-stripe-shirt', name: 'Sage Stripe Shirt', price: 300, compareAt: 360, badges: [], kind: 'shirt', tags: [], image: 'sh-sage-stripe.webp', swatches: ['#8fa79a'] }),
  p({ id: 'sage-bengal-stripe-shirt', name: 'Sage Bengal Stripe Shirt', price: 300, badges: [], kind: 'shirt', tags: [], image: 'sh-sage-bengal.webp', swatches: ['#a7b9a6'] }),
  p({ id: 'brown-bengal-stripe-shirt', name: 'Brown Bengal Stripe Shirt', price: 300, badges: [], kind: 'shirt', tags: [], image: 'sh-brown-bengal.webp', swatches: ['#8c5a44'] }),
  p({ id: 'taupe-stripe-shirt', name: 'Taupe Stripe Shirt', price: 300, badges: [], kind: 'shirt', tags: [], image: 'sh-taupe-stripe.webp', swatches: ['#b5ab9c'] }),
  p({
    id: 'contrast-collar-stripe-shirt', name: 'Contrast-Collar Stripe Shirt', price: 350, badges: ['new'], kind: 'shirt', tags: [],
    image: 'sh-blue-contrast.webp', swatches: ['#7c8fd8', '#3d55b8'], gallery: ['sh-blue-contrast.webp', 'sh-royal-contrast.webp'],
    colors: [
      { name: 'Periwinkle', color: '#7c8fd8', image: 'sh-blue-contrast.webp' },
      { name: 'Royal', color: '#3d55b8', image: 'sh-royal-contrast.webp' },
    ],
  }),

  /* ---------- Trousers ---------- */
  p({ id: 'cream-high-waisted-trouser', name: 'Cream High-Waisted Trouser', price: 450, badges: [], kind: 'trouser', tags: [], image: 't-cream-high.webp', swatches: ['#e5d8bd'] }),
  p({ id: 'caramel-tailored-trouser', name: 'Caramel Tailored Trouser', price: 480, badges: [], kind: 'trouser', tags: [], image: 's-caramel-2.webp', swatches: ['#8a5a36'] }),
]

export const badgesOf = (x: Product) => [...(x.compareAt ? ['on sale'] : []), ...x.badges]
export const findProduct = (id: string) => products.find((x) => x.id === id)
const byKind = (k: Kind) => products.filter((x) => x.kind === k)

/* ---------- Home page ---------- */

export const goodsTabs = [
  { label: 'Suits', products: byKind('suit') },
  { label: 'Shirts & knitwear', products: [...byKind('knit'), ...byKind('shirt').slice(0, 5)] },
  { label: 'On sale', products: products.filter((x) => x.compareAt), sale: true },
]

export const eveningEdit = byKind('evening')

export const collections = [
  { title: 'Suits', image: 's-ivory-db.webp' },
  { title: 'Three-Piece Suits', image: 's-stone-three.webp' },
  { title: 'Evening Wear', image: 'e-emerald.webp' },
  { title: 'Knitwear', image: 'k-zip-rust.webp' },
  { title: 'Shirts', image: 'sh-sage-stripe.webp' },
  { title: 'Trousers', image: 't-cream-high.webp' },
]

// Home hero: one static two-up image (no slideshow)
export const hero = {
  images: ['hero-champagne-l.webp', 'hero-champagne-r.webp'],
  title: 'Suit up, your way',
  copy: 'Visit the boutique for a fitting, or shop online with free alterations on every suit.',
  primary: { label: 'Shop suits', href: '/collections/suits' },
  secondary: { label: 'Shop evening', href: '/collections/evening-wear' },
}

export const announcements = ['Free alterations on every suit', 'Book a fitting at our boutique', 'Join our newsletter for 10% off']

// One boutique in Dansoman, Accra. Street details, phone and hours are placeholders to confirm with SuitUp.
const ADDRESS = ['Dansoman High Street', 'Dansoman, Accra', 'Greater Accra, Ghana']
export const MAP_QUERY = 'Dansoman, Accra, Ghana'

export const stores = [
  {
    name: 'SuitUp Boutique, Dansoman',
    address: ADDRESS,
    phone: '+233 24 000 0000',
    email: 'hello@suitup.store',
    hours: ['Monday - Saturday, 9:00 to 19:00', 'Sunday, 12:00 to 17:00'],
  },
  {
    name: 'Fittings & alterations',
    address: ADDRESS,
    phone: '+233 24 000 0000',
    email: 'fittings@suitup.store',
    hours: ['By appointment, Monday - Saturday', 'Free alterations on every suit', 'Allow 3 - 5 days for alterations'],
  },
  {
    name: 'Collections & returns',
    address: ADDRESS,
    phone: '+233 24 000 0000',
    email: 'hello@suitup.store',
    hours: ['Collect online orders in store', 'Returns within 30 days, unworn', 'Monday - Saturday, 9:00 to 19:00'],
  },
]

export const handle = (title: string) => title.toLowerCase().replace(/&/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
// Ghana cedis, e.g. GH₵1,050.00
export const money = (n: number) => `GH₵${n.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

/* ---------- Product page ---------- */

const kindCollection: Record<Kind, string> = {
  suit: 'Suits',
  evening: 'Evening Wear',
  knit: 'Knitwear',
  shirt: 'Shirts',
  trouser: 'Trousers',
}
export const collectionOf = (x: Product) => kindCollection[x.kind]

// single-colour products take their colour name from the product name ("Forest Double-Breasted Suit" -> "Forest")
const colourName = (x: Product, i: number) => (i === 0 ? x.name.split(' ')[0] : `Colour ${i + 1}`)
export const colorsOf = (x: Product): Color[] =>
  x.colors ?? x.swatches.map((c, i) => ({ name: colourName(x, i), color: c, image: i === 0 ? x.image : undefined }))

export const galleryOf = (x: Product) => x.gallery ?? [x.image]

const descriptions: Record<Kind, string> = {
  suit: 'Cut from a fine wool blend with a soft canvassed chest, peak lapels and a clean, structured shoulder. The trousers are finished with a sharp crease and an unfinished hem, so we can tailor the length to you. Free alterations on every suit.',
  evening:
    'An evening jacket made to be noticed: rich fabric, satin-faced lapels and a sharp, fitted cut. Pair with black tuxedo trousers and a bow tie. Free alterations included.',
  knit: 'A soft, warm knit with a regular fit and ribbed finish. Wear it over a shirt and tie for the office, or on its own at the weekend.',
  shirt:
    'A crisp, easy-iron cotton shirt with a structured collar and a tailored body that sits neatly under a jacket. Machine washable at 30°C.',
  trouser: 'High-waisted tailored trousers with pressed front creases and a clean, unfinished hem we can tailor to your length.',
}
export const descriptionOf = (x: Product) => x.description ?? descriptions[x.kind]

const sizesByKind: Record<Kind, string[]> = {
  suit: ['38R', '40R', '42R', '44R', '46R', '48R'],
  evening: ['38R', '40R', '42R', '44R', '46R', '48R'],
  knit: ['S', 'M', 'L', 'XL', 'XXL'],
  shirt: ['15', '15.5', '16', '16.5', '17', '17.5'],
  trouser: ['30', '32', '34', '36', '38', '40'],
}
export const sizesOf = (x: Product) => sizesByKind[x.kind]

const jacketChart = {
  head: ['Size', 'Chest', 'Waist', 'Drop'],
  rows: [['38R', '38"', '32"', '6"'], ['40R', '40"', '34"', '6"'], ['42R', '42"', '36"', '6"'], ['44R', '44"', '38"', '6"'], ['46R', '46"', '40"', '6"'], ['48R', '48"', '42"', '6"']],
  note: 'Jacket sizes are chest measurements; R = regular length. Every suit includes free alterations.',
}
const charts: Record<Kind, { head: string[]; rows: string[][]; note: string }> = {
  suit: jacketChart,
  evening: jacketChart,
  knit: {
    head: ['Size', 'Chest', 'Length', 'Sleeve'],
    rows: [['S', '38"', '27"', '33"'], ['M', '40"', '28"', '34"'], ['L', '42"', '29"', '35"'], ['XL', '44"', '30"', '35.5"'], ['XXL', '47"', '31"', '36"']],
    note: 'Regular fit. Between sizes? Take the larger one for a relaxed look.',
  },
  shirt: {
    head: ['Collar', 'Chest', 'Waist', 'Sleeve'],
    rows: [['15', '38"', '34"', '33"'], ['15.5', '40"', '36"', '34"'], ['16', '42"', '38"', '34.5"'], ['16.5', '44"', '40"', '35"'], ['17', '46"', '42"', '35.5"'], ['17.5', '48"', '44"', '36"']],
    note: 'Sizes are collar measurements in inches.',
  },
  trouser: {
    head: ['Waist', 'Hip', 'Inseam', 'Rise'],
    rows: [['30', '38"', '34"', '11.5"'], ['32', '40"', '34"', '11.5"'], ['34', '42"', '34"', '12"'], ['36', '44"', '34"', '12"'], ['38', '46"', '34"', '12.5"'], ['40', '48"', '34"', '12.5"']],
    note: 'Hems are left unfinished so we can tailor the length to you.',
  },
}
export const chartOf = (x: Product) => charts[x.kind]

const pairsFor: Record<Kind, string[]> = {
  suit: ['classic-white-shirt', 'sky-fine-stripe-shirt', 'white-french-cuff-shirt', 'ribbed-quarter-zip-knit'],
  evening: ['white-french-cuff-shirt', 'velvet-shawl-tuxedo', 'classic-white-shirt', 'cream-high-waisted-trouser'],
  knit: ['classic-white-shirt', 'cream-high-waisted-trouser', 'caramel-tailored-trouser', 'sky-fine-stripe-shirt'],
  shirt: ['ribbed-quarter-zip-knit', 'navy-pinstripe-suit', 'cream-high-waisted-trouser', 'espresso-double-breasted-suit'],
  trouser: ['contrast-collar-stripe-shirt', 'ribbed-quarter-zip-knit', 'classic-white-shirt', 'blue-linen-shirt'],
}
const byId = (ids: string[]) => ids.map((id) => findProduct(id)).filter((x): x is Product => !!x)
export const looksGoodWith = (x: Product) => byId(pairsFor[x.kind]).filter((y) => y.id !== x.id)
export const alsoLike = (x: Product) => products.filter((y) => y.kind === x.kind && y.id !== x.id).slice(0, 6)

export const FREE_SHIPPING = 1000 // GH₵

/* ---------- Collections ---------- */

const collectionRules: Record<string, { title: string; match: (x: Product) => boolean }> = {
  all: { title: 'All products', match: () => true },
  suits: { title: 'Suits', match: (x) => x.kind === 'suit' },
  'three-piece-suits': { title: 'Three-Piece Suits', match: (x) => x.tags.includes('three-piece') },
  'double-breasted': { title: 'Double-Breasted', match: (x) => x.tags.includes('double-breasted') },
  'evening-wear': { title: 'Evening Wear', match: (x) => x.kind === 'evening' },
  knitwear: { title: 'Knitwear', match: (x) => x.kind === 'knit' },
  shirts: { title: 'Shirts', match: (x) => x.kind === 'shirt' },
  trousers: { title: 'Trousers', match: (x) => x.kind === 'trouser' },
  sale: { title: 'Sale', match: (x) => !!x.compareAt },
  organic: { title: 'Organic', match: (x) => x.badges.includes('organic') },
}

export function getCollection(h: string) {
  const rule = collectionRules[h] ?? collectionRules.all
  return { handle: collectionRules[h] ? h : 'all', title: rule.title, products: products.filter(rule.match) }
}

/** Default variant used by quick-add buttons: first size and (for multi-colour products) first colour. */
export const defaultVariant = (x: Product) => (x.colors ? `${sizesOf(x)[0]} / ${x.colors[0].name}` : sizesOf(x)[0])
