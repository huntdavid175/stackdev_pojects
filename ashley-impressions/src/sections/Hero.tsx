import { Link } from '../router'
import { img } from '../asset'

export default function Hero() {
  return (
    <section className="hero">
      <img className="hero__img" src={img('hero.webp')} alt="Three women holding lip gloss and foundation in a warm studio" />
      <div className="hero__content">
        <p className="hero__eyebrow">Skincare from around the world, in Ghana</p>
        <h1 className="hero__title">
          The brands
          <br />
          your skin
          <br />
          loves
        </h1>
        <div className="hero__actions">
          <a href="#featured" className="btn-square btn-square--solid">Shop bestsellers</a>
          <Link href="/collections/all" className="btn-square btn-square--outline">Shop all</Link>
        </div>
      </div>
    </section>
  )
}
