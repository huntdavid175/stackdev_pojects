import { Announcement, Header } from './sections/Top'
import {
  About,
  BestSellers,
  Collections,
  Footer,
  FreeDelivery,
  Hero,
  LuxuryBundles,
  Marquee,
  PayLater,
  Selfies,
  Testimonials,
  VipClub,
} from './sections/Home'
import ShopPage from './pages/ShopPage'
import CollectionPage from './pages/CollectionPage'
import ProductPage from './pages/ProductPage'
import { findCollection, products } from './data'
import { usePath } from './router'
import BagDrawer from './components/BagDrawer'

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={['Bundles', 'Wigs', 'Frontals', 'Closures']} />
      <Collections />
      <BestSellers />
      <About />
      <FreeDelivery />
      <LuxuryBundles />
      <PayLater />
      <Testimonials />
      <VipClub />
      <Selfies />
    </>
  )
}

function route(path: string) {
  if (path === '/shop') return <ShopPage />
  if (path.startsWith('/products/')) {
    const product = products.find((p) => p.id === path.split('/')[2])
    return product ? <ProductPage key={product.id} product={product} /> : <ShopPage />
  }
  if (path.startsWith('/collections/')) {
    const collection = findCollection(path.split('/')[2])
    // key resets filters when moving between collections
    return collection ? <CollectionPage key={collection.handle} collection={collection} /> : <ShopPage />
  }
  return <HomePage />
}

export default function App() {
  const path = usePath()
  return (
    <>
      <Announcement />
      <Header />
      <main>{route(path)}</main>
      <Footer />
      <BagDrawer />
    </>
  )
}
