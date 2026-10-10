import { Link } from '../router'
import { img } from '../asset'

export default function Hero() {
  return (
    <section className="hero">
      <img className="hero__img" src={img('hero.webp')} alt="Man with curly hair using a jade face roller" />
      <div className="hero__content">
        <p className="hero__eyebrow">Men care starts here</p>
        <h1 className="hero__title">
          The ultimate
          <br />
          place for
          <br />
          men's beauty
        </h1>
        <div className="hero__actions">
          <a href="#featured" className="btn-square btn-square--solid">View more</a>
          <Link href="/collections/all" className="btn-square btn-square--outline">Collections</Link>
        </div>
      </div>
    </section>
  )
}
