import { img } from '../asset'

export default function TextureStatement() {
  return (
    <section className="section texture">
      <p className="texture__line">
        Make you feel <img src={img('swatch-cream.png')} alt="" /> and appear
      </p>
      <p className="texture__line texture__line--italic">
        glowing <img src={img('swatch-white.png')} alt="" className="texture__wide" /> healthy{' '}
        <img src={img('swatch-oil.png')} alt="" /> and balanced
      </p>
    </section>
  )
}
