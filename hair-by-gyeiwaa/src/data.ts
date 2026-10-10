export type ProductType = 'Bundles' | 'Wigs' | 'Frontals' | 'Closures' | 'Bundle deals'
export type Texture = 'Straight' | 'Loose wave' | 'Body wave' | 'Deep wave' | 'Curly' | 'Kinky curly'

export type Product = {
  id: string
  name: string
  type: ProductType
  texture: Texture
  img: string
  basePrice: number // price at the shortest length
  lengths: number[] // inches
  tag?: 'Bestseller' | 'New' | 'Sold out'
  sales: number // for "Best selling" sort
  added: number // days ago, for "Newest" sort
}

// Each step up in length adds this much to the price.
const STEP = 15

export const lengthPrice = (p: Product, length: number) => p.basePrice + p.lengths.indexOf(length) * STEP

export const money = (n: number) => `£${n.toFixed(2)}`

export const ALL_LENGTHS = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]
const L = (from: number, to: number) => ALL_LENGTHS.filter((l) => l >= from && l <= to)

// Where hair of a given length falls, for the length ruler.
export const LENGTH_LANDMARKS: { at: number; label: string }[] = [
  { at: 12, label: 'Chin' },
  { at: 16, label: 'Shoulders' },
  { at: 20, label: 'Bra strap' },
  { at: 24, label: 'Mid-back' },
  { at: 28, label: 'Waist' },
]

const p = (
  id: string,
  name: string,
  type: ProductType,
  texture: Texture,
  img: string,
  basePrice: number,
  lengths: number[],
  extra: Partial<Product> = {},
): Product => ({ id, name, type, texture, img, basePrice, lengths, sales: 20, added: 40, ...extra })

export const products: Product[] = [
  p('raw-cambodian-straight', 'Raw Cambodian Straight', 'Bundles', 'Straight', 'p-straight.jpg', 120, L(12, 30), { tag: 'Bestseller', sales: 96 }),
  p('raw-burmese-body-wave', 'Raw Burmese Body Wave', 'Bundles', 'Body wave', 'p-bodywave.jpg', 130, L(12, 30), { sales: 81 }),
  p('premium-613-blonde', 'Premium 613 Blonde Straight', 'Bundles', 'Straight', 'p-blonde.jpg', 140, L(14, 30), { tag: 'New', added: 3, sales: 44 }),
  p('raw-kinky-curly', 'Raw Kinky Curly', 'Bundles', 'Kinky curly', 'p-curly.jpg', 135, L(12, 26), { sales: 58 }),
  p('deep-wave-bundle', 'Raw Vietnamese Deep Wave', 'Bundles', 'Deep wave', 'p-brown.jpg', 145, L(12, 30), { sales: 49 }),
  p('honey-blonde-wave', 'Honey Blonde Loose Wave', 'Bundles', 'Loose wave', 'p-honey.jpg', 150, L(16, 30), { added: 9, sales: 37 }),
  p('silky-straight-bundle', 'Silky Straight Bundle Deal', 'Bundle deals', 'Straight', 'p-comb.jpg', 260, L(14, 24), { tag: 'Bestseller', sales: 88 }),
  p('body-wave-deal', 'Body Wave 3 Bundles + Closure', 'Bundle deals', 'Body wave', 'p-wave-back.jpg', 340, L(16, 26), { sales: 62 }),
  p('curly-deal', 'Curly 3 Bundles + Frontal', 'Bundle deals', 'Curly', 'p-curls-back.jpg', 365, L(14, 24), { added: 14, sales: 29 }),
  p('hd-lace-closure', '5x5 HD Lace Closure', 'Closures', 'Straight', 'p-closure.jpg', 95, L(12, 20), { tag: 'Sold out', sales: 71 }),
  p('body-wave-closure', '4x4 Body Wave Closure', 'Closures', 'Body wave', 'p-wave-tone.jpg', 85, L(12, 20), { sales: 40 }),
  p('kinky-closure', '5x5 Kinky Curly Closure', 'Closures', 'Kinky curly', 'p-afro.jpg', 99, L(12, 18), { added: 6, sales: 18 }),
  p('hd-lace-frontal', '13x4 HD Lace Frontal', 'Frontals', 'Body wave', 'p-bodywave.jpg', 125, L(14, 22), { sales: 66 }),
  p('straight-frontal', '13x6 Straight Frontal', 'Frontals', 'Straight', 'p-straight-back.jpg', 150, L(14, 24), { tag: 'New', added: 2, sales: 24 }),
  p('deep-wave-frontal', '13x4 Deep Wave Frontal', 'Frontals', 'Deep wave', 'p-brown-wave.jpg', 135, L(14, 22), { sales: 31 }),
  p('sleek-straight-wig', 'Sleek Straight HD Wig', 'Wigs', 'Straight', 'col-straight.jpg', 320, L(16, 30), { tag: 'Bestseller', sales: 90 }),
  p('glam-body-wave-wig', 'Glam Body Wave Wig', 'Wigs', 'Body wave', 'hero.jpg', 340, L(18, 30), { sales: 77 }),
  p('volume-curly-wig', 'Volume Curly Wig', 'Wigs', 'Curly', 'col-curly.jpg', 355, L(16, 26), { added: 5, sales: 52 }),
  p('loose-wave-wig', 'Loose Wave Glueless Wig', 'Wigs', 'Loose wave', 'col-bodywave.jpg', 330, L(18, 28), { tag: 'New', added: 1, sales: 21 }),
  p('kinky-straight-wig', 'Kinky Straight Wig', 'Wigs', 'Straight', 'about.jpg', 310, L(16, 26), { sales: 35 }),
  p('afro-kinky-wig', 'Afro Kinky Curly Wig', 'Wigs', 'Kinky curly', 'banner-slay.jpg', 290, L(10, 18), { sales: 27 }),
]

const byId = (ids: string[]) => ids.map((id) => products.find((pr) => pr.id === id)!)

export const bestSellers = byId(['raw-cambodian-straight', 'raw-burmese-body-wave', 'premium-613-blonde', 'raw-kinky-curly'])
export const luxuryBundles = byId(['deep-wave-bundle', 'silky-straight-bundle', 'honey-blonde-wave', 'hd-lace-closure', 'hd-lace-frontal'])

export type Collection = {
  handle: string
  title: string
  script: string // the flourish above the title
  description: string
  img: string
  match: (pr: Product) => boolean
}

export const collections: Collection[] = [
  { handle: 'bundles', title: 'Bundles', script: 'Raw & Virgin', description: 'Single-donor raw hair, sold by the bundle. Most full installs take three.', img: 'p-comb.jpg', match: (pr) => pr.type === 'Bundles' },
  { handle: 'wigs', title: 'Wigs', script: 'Ready to Slay', description: 'HD lace and glueless units, plucked and ready to wear out of the box.', img: 'col-straight.jpg', match: (pr) => pr.type === 'Wigs' },
  { handle: 'frontals', title: 'Frontals', script: 'Ear to Ear', description: 'HD lace frontals that melt into every skin tone for a natural hairline.', img: 'about.jpg', match: (pr) => pr.type === 'Frontals' },
  { handle: 'closures', title: 'Closures', script: 'The Finish', description: 'Lace closures to complete your install, with a pre-plucked parting.', img: 'p-closure.jpg', match: (pr) => pr.type === 'Closures' },
  { handle: 'bundle-deals', title: 'Bundle Deals', script: 'Save More', description: 'Bundles matched with a closure or frontal, priced together.', img: 'p-wave-back.jpg', match: (pr) => pr.type === 'Bundle deals' },
  { handle: 'straight', title: 'Straight', script: 'Sleek & Silky', description: 'Bone-straight bundles, frontals and wigs that hold a press and a curl.', img: 'col-straight.jpg', match: (pr) => pr.texture === 'Straight' },
  { handle: 'body-wave', title: 'Body Wave', script: 'Soft & Bouncy', description: 'Our most versatile texture: full, soft S-waves that wear straight or curled.', img: 'col-bodywave.jpg', match: (pr) => pr.texture === 'Body wave' || pr.texture === 'Loose wave' },
  { handle: 'curly', title: 'Curly', script: 'Define Me', description: 'Deep waves, curls and kinks that keep their pattern wash after wash.', img: 'col-curly.jpg', match: (pr) => ['Curly', 'Kinky curly', 'Deep wave'].includes(pr.texture) },
]

export const findCollection = (handle: string) => collections.find((c) => c.handle === handle)

export const typeCollections = collections.slice(0, 5) // product types, for the menu
export const textureCollections = collections.slice(5) // textures, for the homepage arches

export const testimonials = [
  {
    quote: "I've tried so many hair brands, but nothing compares to this. The quality is unmatched — silky, full, and blends seamlessly with my leave-out.",
    name: 'Jasmine K.',
  },
  {
    quote: 'From the moment I installed these bundles, I felt like a goddess. Soft, full, and no shedding. Absolutely obsessed!',
    name: 'Aaliyah M.',
  },
  {
    quote: "I've had my frontal for six months and it still looks brand new. Customer service helped me pick the perfect length. My go-to for luxury hair.",
    name: 'Naomi S.',
  },
]

export const SOCIAL_HANDLE = '@hairbygyeiwaa'
export const CONTACT_EMAIL = 'hello@hairbygyeiwaa.com'
export const FREE_DELIVERY = 150
