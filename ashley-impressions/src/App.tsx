import Header from './sections/Header'
import ProductPage from './pages/ProductPage'
import CollectionPage from './pages/CollectionPage'
import ShopAllPage from './pages/ShopAllPage'
import { findCollection } from './catalog'
import { usePath } from './router'
import CartDrawer from './components/CartDrawer'
import Hero from './sections/Hero'
import FeaturedProducts from './sections/FeaturedProducts'
import TextureStatement from './sections/TextureStatement'
import PromoTiles from './sections/PromoTiles'
import Collections from './sections/Collections'
import Categories from './sections/Categories'
import Marquee from './sections/Marquee'
import SaleBanner from './sections/SaleBanner'
import Bundle from './sections/Bundle'
import Faq from './sections/Faq'
import Instagram from './sections/Instagram'
import Newsletter from './sections/Newsletter'
import Footer from './sections/Footer'

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <TextureStatement />
      <PromoTiles />
      <Collections />
      <Categories />
      <Marquee />
      <SaleBanner />
      <Bundle />
      <Faq />
      <Instagram />
      <Newsletter />
    </>
  )
}

function route(path: string) {
  if (path.startsWith('/products/')) return <ProductPage />
  if (path.startsWith('/collections/')) {
    const handle = path.split('/')[2]
    // key resets filters when switching collections
    return findCollection(handle) ? <CollectionPage key={handle} handle={handle} /> : <ShopAllPage />
  }
  return <HomePage />
}

export default function App() {
  const path = usePath()
  return (
    <>
      <Header />
      <main>{route(path)}</main>
      <Footer />
      <CartDrawer />
    </>
  )
}
