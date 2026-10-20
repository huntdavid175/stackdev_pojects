import { Announcement, Header } from './sections/Top'
import { Collections, EveningEdit, Goods, Hero, Intro, Newsletter, Promises, SaleBanner, Stores, Stories } from './sections/Home'
import Footer from './sections/Footer'
import ProductPage from './pages/ProductPage'
import CollectionPage from './pages/CollectionPage'
import CartDrawer from './components/CartDrawer'
import { findProduct, getCollection } from './data'
import { usePath } from './router'

function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Goods />
      <SaleBanner />
      <Promises />
      <Stories />
      <EveningEdit />
      <Collections />
      <Stores />
    </>
  )
}

function route(path: string) {
  if (path.startsWith('/products/')) {
    const product = findProduct(path.split('/')[2])
    // key resets size, colour and gallery when moving between products
    if (product) return <ProductPage key={product.id} product={product} />
  }
  if (path === '/collections' || path.startsWith('/collections/')) {
    const collection = getCollection(path.split('/')[2] || 'all')
    // key resets filters, sorting and paging when moving between collections
    return <CollectionPage key={collection.handle} collection={collection} />
  }
  // Content pages (FAQ, about…) come later; until then they show the home page.
  return <HomePage />
}

export default function App() {
  const path = usePath()
  return (
    <>
      <Announcement />
      <Header />
      <main>{route(path)}</main>
      <Newsletter />
      <Footer />
      <CartDrawer />
    </>
  )
}
