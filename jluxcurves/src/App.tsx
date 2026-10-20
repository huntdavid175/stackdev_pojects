import { Announcement, Header } from './sections/Top'
import {
  Categories,
  Favourites,
  Hero,
  LatestArrivals,
  Lookbook,
  MustHaves,
  NewCollection,
  Offer,
  Press,
  Reviews,
  Spotlight,
} from './sections/Home'
import Footer from './sections/Footer'
import QuickView from './components/QuickView'
import CartDrawer from './components/CartDrawer'
import ProductPage from './pages/ProductPage'
import { findProduct, getCollection } from './data'
import CollectionPage from './pages/CollectionPage'
import { usePath } from './router'

function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <LatestArrivals />
      <Favourites />
      <Lookbook />
      <NewCollection />
      <Reviews />
      <Offer />
      <MustHaves />
      <Spotlight />
      <Press />
    </>
  )
}

function route(path: string) {
  if (path.startsWith('/products/')) {
    const product = findProduct(path.split('/')[2])
    // key resets colour, gallery and accordions when moving between products
    if (product) return <ProductPage key={product.id} product={product} />
  }
  if (path === '/collections' || path.startsWith('/collections/')) {
    const collection = getCollection(path.split('/')[2] || 'all')
    // key resets filters and sorting when moving between collections
    return <CollectionPage key={collection.handle} collection={collection} />
  }
  // Content pages (about, FAQs…) come later; until then they show the home page.
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
      <QuickView />
      <CartDrawer />
    </>
  )
}
