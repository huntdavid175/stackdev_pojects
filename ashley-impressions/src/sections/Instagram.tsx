import { img } from '../asset'

const left = ['ig-1', 'ig-2', 'ig-3', 'ig-4']
const right = ['ig-5', 'ig-6', 'ig-7', 'ig-8']

const Tile = ({ src }: { src: string }) => (
  <a href="#" className="ig__tile" aria-label="View post on Instagram">
    <img src={img(`${src}.jpg`)} alt="" loading="lazy" />
  </a>
)

export default function Instagram() {
  return (
    <section className="section ig">
      <div className="ig__grid">
        {left.map((s) => <Tile key={s} src={s} />)}
        <div className="ig__center">
          <p className="eyebrow">Follow us</p>
          <h2 className="ig__title">On Instagram</h2>
          <p className="ig__text">
            Tag <strong>@ashleysimpression</strong> in your Instagram photos for a chance to be featured here.
          </p>
          <a href="#" className="btn-pill btn-pill--dark">Follow us</a>
        </div>
        {right.map((s) => <Tile key={s} src={s} />)}
      </div>
    </section>
  )
}
