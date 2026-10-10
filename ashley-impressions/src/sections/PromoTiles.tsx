import { Link } from '../router'
import { img } from '../asset'

export default function PromoTiles() {
  return (
    <section className="section promo">
      <div className="container container--narrow promo__grid">
        <Link href="/collections/all" className="promo__summer">
          <div className="promo__summer-media">
            <img src={img('promo-summer.jpg')} alt="Beach umbrellas against a blue sky" loading="lazy" />
            <span className="promo__mark" aria-hidden="true">A.</span>
          </div>
          <h3 className="promo__summer-title">Focus on Summer</h3>
          <span className="link-underline">Shop now</span>
        </Link>

        <div className="promo__feature">
          <img src={img('promo-resilient.jpg')} alt="Smiling woman with wet hair by the sea" loading="lazy" />
          <div className="promo__feature-body">
            <h3 className="promo__feature-title">For Naturally Resilient Skin</h3>
            <Link href="/collections/moisturizer" className="btn-pill btn-pill--light">Shop now</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
